// Small helpers for the media fetch scripts: download with checksum, and a ZIP reader (central directory +
// zlib.inflateRawSync) so no unzip binary is needed on any OS. No dependencies.
import {createHash} from 'node:crypto';
import {inflateRawSync} from 'node:zlib';

/** GET → Buffer, with a size cap and a readable error. */
export const fetchBuffer = async (url, {maxBytes = 200 * 1024 * 1024, headers = {}} = {}) => {
	const res = await fetch(url, {headers: {'User-Agent': 'launchfilm-fetch (+https://github.com/evgenspm/launchfilm)', ...headers}, redirect: 'follow'});
	if (!res.ok) throw new Error(`GET ${url}: HTTP ${res.status}`);
	const buf = Buffer.from(await res.arrayBuffer());
	if (buf.length > maxBytes) throw new Error(`GET ${url}: ${buf.length} bytes is over the ${maxBytes} cap`);
	return buf;
};

export const fetchText = async (url) => (await fetchBuffer(url, {maxBytes: 5 * 1024 * 1024})).toString('utf8');

export const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

/** List and extract ZIP entries. Supports stored (0) and deflate (8). */
export const readZip = (buf) => {
	let eocd = -1;
	for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
		if (buf.readUInt32LE(i) === 0x06054b50) {
			eocd = i;
			break;
		}
	}
	if (eocd < 0) throw new Error('not a zip file (no end of central directory)');
	const count = buf.readUInt16LE(eocd + 10);
	let p = buf.readUInt32LE(eocd + 16);
	const entries = [];
	for (let n = 0; n < count; n++) {
		if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('bad zip central directory');
		const method = buf.readUInt16LE(p + 10);
		const csize = buf.readUInt32LE(p + 20);
		const usize = buf.readUInt32LE(p + 24);
		const nlen = buf.readUInt16LE(p + 28);
		const xlen = buf.readUInt16LE(p + 30);
		const clen = buf.readUInt16LE(p + 32);
		const local = buf.readUInt32LE(p + 42);
		const name = buf.toString('utf8', p + 46, p + 46 + nlen);
		entries.push({name, method, csize, usize, local});
		p += 46 + nlen + xlen + clen;
	}
	const extract = (e) => {
		const lp = e.local;
		if (buf.readUInt32LE(lp) !== 0x04034b50) throw new Error(`bad local header for ${e.name}`);
		const start = lp + 30 + buf.readUInt16LE(lp + 26) + buf.readUInt16LE(lp + 28);
		const data = buf.subarray(start, start + e.csize);
		if (e.method === 0) return Buffer.from(data);
		if (e.method === 8) return inflateRawSync(data);
		throw new Error(`unsupported zip method ${e.method} for ${e.name}`);
	};
	return {entries: entries.filter((e) => !e.name.endsWith('/')), extract};
};

/** Find the current Kenney zip link on an asset page (the path carries a content hash + mtime that change). */
export const kenneyZipUrl = (html, slug) => {
	const re = new RegExp(`https://kenney\\.nl/media/pages/assets/${slug}/[0-9a-f]{10}-[0-9]+/kenney_${slug}\\.zip`);
	const m = re.exec(html);
	return m ? m[0] : null;
};
