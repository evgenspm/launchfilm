import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {chmodSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const installer = fileURLToPath(new URL('../studio/scripts/install.mjs', import.meta.url));
const write = (file, value) => {
	mkdirSync(path.dirname(file), {recursive: true});
	writeFileSync(file, typeof value === 'string' ? value : JSON.stringify(value));
};
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const bundled = {id: 'click', file: 'click.wav', source: 'launchfilm-procedural', description: 'old built-in'};
const fixture = (t) => {
	const root = mkdtempSync(path.join(os.tmpdir(), 'launchfilm-install-test-'));
	chmodSync(root, 0o700);
	t.after(() => rmSync(root, {recursive: true, force: true}));
	const source = path.join(root, 'source');
	const target = path.join(root, 'project');
	const studio = path.join(target, 'launch-video');
	const manifest = path.join(studio, 'public/sfx/sfx.json');
	const sourceManifest = path.join(source, 'studio/public/sfx/sfx.json');
	mkdirSync(target);
	write(path.join(source, 'VERSION'), '0.1.0\n');
	write(path.join(source, 'studio/package.json'), {name: 'launchfilm-installer-fixture', version: '0.1.0', private: true});
	write(path.join(source, 'studio/harness.config.json'), {credit: true});
	write(sourceManifest, {version: 1, sounds: [bundled]});
	write(path.join(source, 'studio/public/sfx/click.wav'), 'bundled audio');
	const install = () => spawnSync(process.execPath, [installer, '--source', source, '--target', target, '--skip-npm', '--skip-media', '--skip-render', '--json'], {encoding: 'utf8'});
	return {source, target, studio, manifest, sourceManifest, install};
};

const snapshot = (dir) => Object.fromEntries(readdirSync(dir, {recursive: true}).sort().map((relative) => {
	const file = path.join(dir, relative);
	const stat = statSync(file);
	return [relative, stat.isDirectory() ? 'directory' : readFileSync(file).toString('base64')];
}));

test('reinstall preserves live imported and procedural sounds while upgrading bundled sounds', (t) => {
	const f = fixture(t);
	assert.equal(f.install().status, 0);
	const custom = [
		{id: 'user-hit', file: 'user/hit.wav', source: 'user', license: 'CC0-1.0'},
		{id: 'click-s42', file: 'custom/click-s42.wav', source: 'launchfilm-procedural', provenance: {seed: 42}},
	];
	for (const sound of custom) write(path.join(f.studio, 'public/sfx', sound.file), `user audio: ${sound.id}`);
	write(f.manifest, {version: 1, sounds: [bundled, ...custom]});
	write(path.join(f.studio, 'harness.config.json'), {credit: false, custom: true});
	write(path.join(f.studio, '.env'), '# user config sentinel\n');
	write(path.join(f.studio, 'films/my-film/film.json'), {id: 'my-film'});
	const upgraded = {...bundled, description: 'upgraded built-in'};
	write(f.sourceManifest, {version: 2, sounds: [upgraded]});
	write(path.join(f.source, 'studio/public/sfx/click.wav'), 'upgraded audio');
	// The old snapshot contains only bundled sounds. It must not replace the live catalog.
	assert.equal(readJson(path.join(f.studio, '.harness/sfx.prev.json')).sounds.length, 1);
	for (let attempt = 0; attempt < 2; attempt++) {
		const result = f.install();
		assert.equal(result.status, 0, result.stderr || result.stdout);
		assert.deepEqual(readJson(f.manifest), {version: 2, sounds: [upgraded, ...custom]});
		assert.deepEqual(readJson(path.join(f.studio, 'harness.config.json')), {credit: false, custom: true});
		assert.equal(readFileSync(path.join(f.studio, '.env'), 'utf8'), '# user config sentinel\n');
		assert.deepEqual(readJson(path.join(f.studio, 'films/my-film/film.json')), {id: 'my-film'});
		for (const sound of custom) assert.equal(readFileSync(path.join(f.studio, 'public/sfx', sound.file), 'utf8'), `user audio: ${sound.id}`);
		assert.equal(readFileSync(path.join(f.studio, 'public/sfx/click.wav'), 'utf8'), 'upgraded audio');
	}
});

test('reinstall preserves a user override of a bundled sound id', (t) => {
	const f = fixture(t);
	assert.equal(f.install().status, 0);
	const override = {...bundled, file: 'custom/click.wav', description: 'my click'};
	write(path.join(f.studio, 'public/sfx/custom/click.wav'), 'custom audio');
	write(f.manifest, {sounds: [override]});
	assert.equal(f.install().status, 0);
	assert.deepEqual(readJson(f.manifest).sounds, [override]);
});

for (const [name, contents] of [
	['invalid JSON', '{not json'],
	['missing sounds array', {version: 1}],
	['invalid entry', {sounds: [{id: 'user-hit'}]}],
	['duplicate ids', {sounds: [bundled, bundled]}],
]) {
	test(`reinstall rejects ${name} before changing target files`, (t) => {
		const f = fixture(t);
		assert.equal(f.install().status, 0);
		write(f.manifest, contents);
		write(path.join(f.source, 'studio/new-file.txt'), 'must not be copied');
		const before = snapshot(f.target);
		const result = f.install();
		assert.equal(result.status, 1);
		assert.match(readJsonOutput(result.stdout).error, /cannot preserve SFX manifest/);
		assert.deepEqual(snapshot(f.target), before);
		assert.equal(existsSync(path.join(f.studio, 'new-file.txt')), false);
	});
}

const readJsonOutput = (value) => JSON.parse(value);
