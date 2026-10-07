// Locating and running ffmpeg / ffprobe without adding dependencies.
// Order: explicit option → FFMPEG / FFPROBE env → binary on PATH → Remotion's bundled
// compositor binary (resolved from node_modules) → `npx --no-install remotion ffmpeg`.
// Everything in this folder only uses features present in Remotion's minimal ffmpeg build
// (scale, rawvideo out via image2pipe, png in, mjpeg/libx264 out, loudnorm, wav out).

import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

export interface Bin {
  cmd: string;
  args: string[];
  env?: Record<string, string>;
  shell?: boolean;
  label: string;
}

export interface Tools {
  ffmpeg: Bin;
  ffprobe: Bin;
  /** where the binaries came from: option | env | path | remotion-bundled | npx-remotion */
  source: string;
}

export interface ToolOptions {
  ffmpeg?: string;
  ffprobe?: string;
  /** directory whose node_modules may contain @remotion/compositor-* (default: process.cwd()) */
  cwd?: string;
}

const isWin = process.platform === 'win32';

function works(bin: Bin): boolean {
  try {
    const r = spawnSync(bin.cmd, [...bin.args, '-version'], {
      stdio: 'ignore',
      env: bin.env ? { ...process.env, ...bin.env } : process.env,
      shell: bin.shell ?? false,
      timeout: 20000,
    });
    return r.status === 0;
  } catch {
    return false;
  }
}

function compositorPackages(): string[] {
  const { platform, arch } = process;
  if (platform === 'darwin') return [`@remotion/compositor-darwin-${arch}`];
  if (platform === 'win32') return ['@remotion/compositor-win32-x64-msvc'];
  if (platform === 'linux') return [`@remotion/compositor-linux-${arch}-gnu`, `@remotion/compositor-linux-${arch}-musl`];
  return [];
}

function bundledDir(cwd: string): string | null {
  const bases = [path.join(cwd, 'package.json'), path.join(cwd, 'studio', 'package.json'), import.meta.url];
  for (const base of bases) {
    let req: NodeRequire;
    try {
      req = createRequire(base);
    } catch {
      continue;
    }
    for (const pkg of compositorPackages()) {
      try {
        const dir = path.dirname(req.resolve(`${pkg}/package.json`));
        if (fs.existsSync(path.join(dir, isWin ? 'ffmpeg.exe' : 'ffmpeg'))) return dir;
      } catch {
        /* not installed here */
      }
    }
  }
  return null;
}

function libEnv(dir: string): Record<string, string> {
  if (process.platform === 'darwin') return { DYLD_LIBRARY_PATH: dir };
  if (process.platform === 'win32') return { PATH: `${dir};${process.env.PATH ?? ''}` };
  return { LD_LIBRARY_PATH: dir };
}

let cached: Tools | null = null;
let cachedKey = '';

export function resolveTools(opts: ToolOptions = {}): Tools {
  const key = JSON.stringify([opts.ffmpeg, opts.ffprobe, opts.cwd, process.env.FFMPEG, process.env.FFPROBE]);
  if (cached && cachedKey === key) return cached;
  const cwd = opts.cwd ?? process.cwd();
  const pick = (): Tools => {
    const explicitF = opts.ffmpeg ?? process.env.FFMPEG;
    const explicitP = opts.ffprobe ?? process.env.FFPROBE;
    if (explicitF) {
      const ffprobe = explicitP ?? path.join(path.dirname(explicitF), path.basename(explicitF).replace(/ffmpeg/i, 'ffprobe'));
      return {
        ffmpeg: { cmd: explicitF, args: [], label: explicitF },
        ffprobe: { cmd: ffprobe, args: [], label: ffprobe },
        source: opts.ffmpeg ? 'option' : 'env',
      };
    }
    const onPath: Tools = {
      ffmpeg: { cmd: 'ffmpeg', args: [], label: 'ffmpeg (PATH)' },
      ffprobe: { cmd: explicitP ?? 'ffprobe', args: [], label: 'ffprobe (PATH)' },
      source: 'path',
    };
    if (works(onPath.ffmpeg) && works(onPath.ffprobe)) return onPath;
    const dir = bundledDir(cwd);
    if (dir) {
      const env = libEnv(dir);
      const t: Tools = {
        ffmpeg: { cmd: path.join(dir, isWin ? 'ffmpeg.exe' : 'ffmpeg'), args: [], env, label: 'remotion bundled ffmpeg' },
        ffprobe: { cmd: path.join(dir, isWin ? 'ffprobe.exe' : 'ffprobe'), args: [], env, label: 'remotion bundled ffprobe' },
        source: 'remotion-bundled',
      };
      if (works(t.ffmpeg)) return t;
    }
    const npx: Tools = {
      ffmpeg: { cmd: 'npx', args: ['--no-install', 'remotion', 'ffmpeg'], shell: isWin, label: 'npx remotion ffmpeg' },
      ffprobe: { cmd: 'npx', args: ['--no-install', 'remotion', 'ffprobe'], shell: isWin, label: 'npx remotion ffprobe' },
      source: 'npx-remotion',
    };
    if (works(npx.ffmpeg)) return npx;
    throw new Error(
      'ffmpeg not found. Install ffmpeg (brew install ffmpeg / apt install ffmpeg), set FFMPEG and FFPROBE, ' +
        'or run inside a project with @remotion/cli installed.',
    );
  };
  cached = pick();
  cachedKey = key;
  return cached;
}

export interface RunResult {
  code: number;
  stdout: Buffer;
  stderr: string;
}

export interface RunOptions {
  cwd?: string;
  input?: Buffer;
  /** stream stdout instead of collecting it */
  onStdout?: (chunk: Buffer) => void;
  timeoutMs?: number;
  /** throw on non-zero exit (default true) */
  check?: boolean;
}

const STDERR_CAP = 256 * 1024;

export function run(bin: Bin, args: string[], o: RunOptions = {}): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(bin.cmd, [...bin.args, ...args], {
      cwd: o.cwd,
      env: bin.env ? { ...process.env, ...bin.env } : process.env,
      shell: bin.shell ?? false,
      stdio: [o.input ? 'pipe' : 'ignore', 'pipe', 'pipe'],
    });
    const out: Buffer[] = [];
    let err = '';
    let timer: NodeJS.Timeout | undefined;
    if (o.timeoutMs) timer = setTimeout(() => child.kill('SIGKILL'), o.timeoutMs);
    child.stdout!.on('data', (c: Buffer) => (o.onStdout ? o.onStdout(c) : out.push(c)));
    child.stderr!.on('data', (c: Buffer) => {
      err += c.toString();
      if (err.length > STDERR_CAP) err = err.slice(-STDERR_CAP);
    });
    child.on('error', (e) => {
      if (timer) clearTimeout(timer);
      reject(e);
    });
    child.on('close', (code) => {
      if (timer) clearTimeout(timer);
      const res = { code: code ?? -1, stdout: Buffer.concat(out), stderr: err };
      if ((o.check ?? true) && res.code !== 0) {
        const tail = err.trim().split('\n').slice(-6).join('\n');
        reject(new Error(`${bin.label} ${args.slice(0, 12).join(' ')} … exited ${res.code}\n${tail}`));
      } else resolve(res);
    });
    if (o.input && child.stdin) {
      child.stdin.on('error', () => {});
      child.stdin.end(o.input);
    }
  });
}

/** Split a byte stream into fixed-size frames. */
export function frameSplitter(frameBytes: number, onFrame: (frame: Buffer, index: number) => void) {
  let pending: Buffer[] = [];
  let pendingLen = 0;
  let index = 0;
  return (chunk: Buffer) => {
    pending.push(chunk);
    pendingLen += chunk.length;
    if (pendingLen < frameBytes) return;
    let buf = pending.length === 1 ? pending[0] : Buffer.concat(pending, pendingLen);
    let off = 0;
    while (buf.length - off >= frameBytes) {
      // copy so the consumer may keep the frame
      onFrame(Buffer.from(buf.subarray(off, off + frameBytes)), index++);
      off += frameBytes;
    }
    const rest = buf.subarray(off);
    pending = rest.length ? [Buffer.from(rest)] : [];
    pendingLen = rest.length;
  };
}

/**
 * Long-lived ffmpeg that turns PNG buffers written to stdin into numbered JPEGs.
 * Every image in one sink must have the same dimensions.
 */
export class JpegSink {
  private child;
  private done: Promise<void>;
  private err = '';
  constructor(tools: Tools, outPattern: string, quality = 3) {
    const bin = tools.ffmpeg;
    this.child = spawn(
      bin.cmd,
      [...bin.args, '-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'png', '-i', 'pipe:0', '-q:v', String(quality), '-start_number', '1', outPattern],
      { env: bin.env ? { ...process.env, ...bin.env } : process.env, shell: bin.shell ?? false, stdio: ['pipe', 'ignore', 'pipe'] },
    );
    this.child.stderr!.on('data', (c: Buffer) => (this.err += c.toString()));
    this.child.stdin!.on('error', () => {});
    this.done = new Promise((resolve, reject) => {
      this.child.on('error', reject);
      this.child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`jpeg encode failed (${code}): ${this.err.trim().slice(-500)}`))));
    });
  }
  /** Resolves once the bytes are handed to the OS (keeps memory bounded when awaited). */
  write(png: Buffer): Promise<void> {
    return new Promise((resolve) => {
      this.child.stdin!.write(png, () => resolve());
    });
  }
  end(): Promise<void> {
    this.child.stdin!.end();
    return this.done;
  }
}
