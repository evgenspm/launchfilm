#!/usr/bin/env node
// skills/ is the single source of truth. This script:
//  - validates every skills/<name>/: SKILL.md with spec-only frontmatter (name = folder, description 1–1024 chars,
//    keys ⊂ name/description/license/compatibility/metadata/allowed-tools), a LICENSE.txt, no symlinks
//  - checks the manifests (.claude-plugin/*.json, plugin.json, gemini-extension.json) point at ./skills and carry
//    the harness version
//  - writes gitignored dev copies to .agents/skills/<n> and .claude/skills/<n> (real copies, no symlinks in git),
//    so agents working ON the harness load the skills too
// --check: validate, and fail if existing dev copies are stale (CI runs this; it writes nothing).
import {createHash} from 'node:crypto';
import {cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync} from 'node:fs';
import path from 'node:path';
import {readJson, ROOT} from './lib.mjs';

const check = process.argv.includes('--check');
const SKILLS = path.join(ROOT, 'skills');
const ALLOWED = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const errors = [];
const warns = [];

const walk = (dir, out = []) => {
	for (const e of readdirSync(dir, {withFileTypes: true})) {
		const p = path.join(dir, e.name);
		if (lstatSync(p).isSymbolicLink()) errors.push(`${path.relative(ROOT, p)} is a symlink (not allowed in skills/)`);
		else if (e.isDirectory()) walk(p, out);
		else out.push(p);
	}
	return out;
};
const treeHash = (dir) => {
	if (!existsSync(dir)) return null;
	const h = createHash('sha1');
	for (const f of walk(dir).sort()) h.update(path.relative(dir, f)).update(readFileSync(f));
	return h.digest('hex');
};

const frontmatter = (text) => {
	const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
	if (!m) return null;
	const fm = {};
	let key = null;
	for (const line of m[1].split(/\r?\n/)) {
		const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
		if (kv) {
			key = kv[1];
			fm[key] = kv[2].replace(/^["']|["']$/g, '');
		} else if (key && /^\s+/.test(line)) fm[key] += ` ${line.trim()}`;
	}
	return fm;
};

const names = existsSync(SKILLS) ? readdirSync(SKILLS, {withFileTypes: true}).filter((d) => d.isDirectory()).map((d) => d.name).sort() : [];
if (!names.length) errors.push('skills/ is empty');
for (const n of names) {
	const dir = path.join(SKILLS, n);
	const skill = path.join(dir, 'SKILL.md');
	if (!existsSync(skill)) {
		errors.push(`skills/${n}: SKILL.md missing`);
		continue;
	}
	const fm = frontmatter(readFileSync(skill, 'utf8'));
	if (!fm) {
		errors.push(`skills/${n}/SKILL.md: no YAML frontmatter`);
		continue;
	}
	if (fm.name !== n) errors.push(`skills/${n}/SKILL.md: name "${fm.name}" must equal the folder name`);
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n) || n.length > 64) errors.push(`skills/${n}: folder name must be a-z0-9 and single dashes, ≤ 64 chars`);
	const d = (fm.description ?? '').trim();
	if (!d || d.length > 1024) errors.push(`skills/${n}/SKILL.md: description must be 1–1024 chars (has ${d.length})`);
	for (const k of Object.keys(fm)) if (!ALLOWED.has(k)) errors.push(`skills/${n}/SKILL.md: frontmatter key "${k}" is not in the Agent Skills spec (packaging fails on it)`);
	if (!existsSync(path.join(dir, 'LICENSE.txt'))) errors.push(`skills/${n}: LICENSE.txt missing (the licence must travel with the folder)`);
	const lines = readFileSync(skill, 'utf8').split('\n').length;
	if (lines > 500) warns.push(`skills/${n}/SKILL.md has ${lines} lines (keep the body under 500; move detail to references/)`);
	for (const f of walk(dir)) if (/\.(png|jpe?g|gif|mp4|mov|wav|mp3|ogg|zip|woff2?)$/i.test(f)) warns.push(`${path.relative(ROOT, f)}: binary in a skill (forces the slow clone path in npx skills)`);
}

// manifests
const version = existsSync(path.join(ROOT, 'VERSION')) ? readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim() : readJson(path.join(ROOT, 'studio', 'package.json')).version;
const manifest = (rel, fn) => {
	const p = path.join(ROOT, rel);
	if (!existsSync(p)) return errors.push(`${rel} missing`);
	try {
		fn(readJson(p));
	} catch (e) {
		errors.push(`${rel}: ${e.message}`);
	}
};
manifest('.claude-plugin/plugin.json', (j) => {
	if (j.version !== version) errors.push(`.claude-plugin/plugin.json version ${j.version} ≠ ${version}`);
	if (/^(claude|anthropic|cc-plugin)-/.test(j.name)) errors.push('.claude-plugin/plugin.json: reserved name prefix');
});
manifest('.claude-plugin/marketplace.json', (j) => {
	if (j.plugins?.[0]?.source !== '.') errors.push('.claude-plugin/marketplace.json: plugins[0].source must be "."');
	if (j.plugins?.[0]?.version && j.plugins[0].version !== version) errors.push(`marketplace plugin version ${j.plugins[0].version} ≠ ${version}`);
});
manifest('plugin.json', (j) => {
	if (j.version !== version) errors.push(`plugin.json version ${j.version} ≠ ${version}`);
	const s = j.skills ?? j.components?.skills;
	if (s && s !== './skills' && s !== './skills/') errors.push(`plugin.json skills must be "./skills" (is ${JSON.stringify(s)})`);
});
manifest('gemini-extension.json', (j) => {
	if (j.version !== version) errors.push(`gemini-extension.json version ${j.version} ≠ ${version}`);
	if (j.contextFileName && !existsSync(path.join(ROOT, j.contextFileName))) errors.push(`gemini-extension.json contextFileName ${j.contextFileName} missing`);
});

// dev copies
let synced = 0;
for (const base of [path.join(ROOT, '.agents', 'skills'), path.join(ROOT, '.claude', 'skills')]) {
	for (const n of names) {
		const src = path.join(SKILLS, n);
		const dest = path.join(base, n);
		if (check) {
			if (existsSync(dest) && treeHash(dest) !== treeHash(src)) errors.push(`${path.relative(ROOT, dest)} is stale: run node scripts/sync-skills.mjs`);
			continue;
		}
		if (treeHash(dest) === treeHash(src)) continue;
		rmSync(dest, {recursive: true, force: true});
		mkdirSync(base, {recursive: true});
		cpSync(src, dest, {recursive: true});
		synced++;
	}
	if (!check && existsSync(base)) for (const d of readdirSync(base)) if (!names.includes(d) && existsSync(path.join(base, d, 'SKILL.md'))) rmSync(path.join(base, d), {recursive: true, force: true});
}

for (const w of warns) console.log(`warn: ${w}`);
for (const e of errors) console.error(`error: ${e}`);
console.log(`${names.length} skills, version ${version}${check ? '' : `, ${synced} dev copies refreshed (.agents/skills, .claude/skills; gitignored)`}${errors.length ? `, ${errors.length} errors` : ', ok'}`);
process.exit(errors.length ? 1 : 0);
