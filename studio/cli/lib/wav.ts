// Minimal RIFF/WAVE reader + writer. Reads PCM 8/16/24/32-bit int and 32/64-bit float (incl.
// WAVE_FORMAT_EXTENSIBLE); writes 16/24-bit PCM. Audio is held as one Float32Array per channel.
import {writeFileSync} from 'node:fs';

export interface Audio {
	sampleRate: number;
	channels: Float32Array[];
}

export const audioDuration = (a: Audio) => (a.channels[0]?.length ?? 0) / a.sampleRate;

export const readWav = (buf: Buffer): Audio => {
	if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') throw new Error('not a WAV file');
	let pos = 12;
	let fmt: {format: number; channels: number; rate: number; bits: number} | null = null;
	let dataStart = -1;
	let dataLen = 0;
	while (pos + 8 <= buf.length) {
		const id = buf.toString('ascii', pos, pos + 4);
		let size = buf.readUInt32LE(pos + 4);
		const body = pos + 8;
		if (id === 'fmt ') {
			let format = buf.readUInt16LE(body);
			if (format === 0xfffe && size >= 26) format = buf.readUInt16LE(body + 24);
			fmt = {format, channels: buf.readUInt16LE(body + 2), rate: buf.readUInt32LE(body + 4), bits: buf.readUInt16LE(body + 14)};
		} else if (id === 'data') {
			dataStart = body;
			// streamed WAVs (ffmpeg to a pipe) carry 0 or 0xFFFFFFFF here: read to the end
			if (size === 0 || size === 0xffffffff || body + size > buf.length) size = buf.length - body;
			dataLen = size;
			break;
		}
		pos = body + size + (size % 2);
	}
	if (!fmt || dataStart < 0) throw new Error('WAV without fmt/data chunk');
	const {format, channels, rate, bits} = fmt;
	const bps = bits / 8;
	const n = Math.floor(dataLen / (bps * channels));
	const out = Array.from({length: channels}, () => new Float32Array(n));
	for (let i = 0; i < n; i++) {
		for (let c = 0; c < channels; c++) {
			const o = dataStart + (i * channels + c) * bps;
			let v: number;
			if (format === 3) v = bits === 64 ? buf.readDoubleLE(o) : buf.readFloatLE(o);
			else if (bits === 16) v = buf.readInt16LE(o) / 32768;
			else if (bits === 24) v = buf.readIntLE(o, 3) / 8388608;
			else if (bits === 32) v = buf.readInt32LE(o) / 2147483648;
			else if (bits === 8) v = (buf.readUInt8(o) - 128) / 128;
			else throw new Error(`unsupported WAV bit depth ${bits}`);
			out[c][i] = v;
		}
	}
	return {sampleRate: rate, channels: out};
};

export const encodeWav = (a: Audio, bits: 16 | 24 = 24): Buffer => {
	const ch = a.channels.length;
	const n = a.channels[0]?.length ?? 0;
	const bps = bits / 8;
	const dataLen = n * ch * bps;
	const buf = Buffer.alloc(44 + dataLen);
	buf.write('RIFF', 0, 'ascii');
	buf.writeUInt32LE(36 + dataLen, 4);
	buf.write('WAVE', 8, 'ascii');
	buf.write('fmt ', 12, 'ascii');
	buf.writeUInt32LE(16, 16);
	buf.writeUInt16LE(1, 20);
	buf.writeUInt16LE(ch, 22);
	buf.writeUInt32LE(a.sampleRate, 24);
	buf.writeUInt32LE(a.sampleRate * ch * bps, 28);
	buf.writeUInt16LE(ch * bps, 32);
	buf.writeUInt16LE(bits, 34);
	buf.write('data', 36, 'ascii');
	buf.writeUInt32LE(dataLen, 40);
	const max = bits === 16 ? 32767 : 8388607;
	let o = 44;
	for (let i = 0; i < n; i++) {
		for (let c = 0; c < ch; c++) {
			const v = Math.max(-1, Math.min(1, a.channels[c][i]));
			const s = Math.round(v * max);
			if (bits === 16) buf.writeInt16LE(s, o);
			else buf.writeIntLE(s, o, 3);
			o += bps;
		}
	}
	return buf;
};

export const writeWav = (file: string, a: Audio, bits: 16 | 24 = 24) => writeFileSync(file, encodeWav(a, bits));

export const mono = (a: Audio): Float32Array => {
	if (a.channels.length === 1) return a.channels[0];
	const n = a.channels[0].length;
	const m = new Float32Array(n);
	for (const ch of a.channels) for (let i = 0; i < n; i++) m[i] += ch[i] / a.channels.length;
	return m;
};
