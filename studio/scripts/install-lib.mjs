// Shared by scripts/install.mjs (runs before npm ci, plain Node) and the CLI (doctor --fix).
// Skill layout in a user repo: real files in .agents/skills/<n>; .claude/skills/<n> is a relative directory
// symlink (a junction on Windows, a copy as the last resort). No dependencies.
import {cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readlinkSync, rmSync, statSync, symlinkSync} from 'node:fs';
import path from 'node:path';

export const SKILL_NAMES_HINT = ['launch-film', 'brand-intake', 'story', 'sound', 'scene-build', 'recipes', 'reference-study', 'film-qa', 'launch-post'];

/** @param {string} root */
export const listSkillDirs = (root) => {
	if (!existsSync(root)) return [];
	return readdirSync(root, {withFileTypes: true})
		.filter((d) => (d.isDirectory() || d.isSymbolicLink()) && existsSync(path.join(root, d.name, 'SKILL.md')))
		.map((d) => d.name)
		.sort();
};

/** @param {string} p */
export const skillFileOk = (p) => {
	try {
		return statSync(p).isFile();
	} catch {
		return false;
	}
};

/**
 * Make <repo>/.claude/skills/<name> point at <repo>/.agents/skills/<name>. Idempotent.
 * @param {string} repo @param {string} name
 * @returns {'ok'|'symlink'|'junction'|'copy'}
 */
export const linkClaudeSkill = (repo, name) => {
	const target = path.join(repo, '.agents', 'skills', name);
	const link = path.join(repo, '.claude', 'skills', name);
	mkdirSync(path.dirname(link), {recursive: true});
	const relTarget = path.relative(path.dirname(link), target);
	let existing = null;
	try {
		existing = lstatSync(link);
	} catch {
		existing = null;
	}
	if (existing && existing.isSymbolicLink()) {
		const cur = readlinkSync(link);
		if ((cur === relTarget || path.resolve(path.dirname(link), cur) === path.resolve(target)) && skillFileOk(path.join(link, 'SKILL.md'))) return 'ok';
	}
	if (existing) rmSync(link, {recursive: true, force: true});
	try {
		if (process.platform === 'win32') symlinkSync(target, link, 'junction');
		else symlinkSync(relTarget, link, 'dir');
		if (skillFileOk(path.join(link, 'SKILL.md'))) return process.platform === 'win32' ? 'junction' : 'symlink';
	} catch {
		// fall through to a copy
	}
	rmSync(link, {recursive: true, force: true});
	cpSync(target, link, {recursive: true});
	return 'copy';
};

export const MARK_BEGIN = '<!-- launchfilm:begin';
export const MARK_END = '<!-- launchfilm:end -->';

/** The ≤15-line managed block for AGENTS.md / CLAUDE.md. @param {string} version @param {string} [studioDir] */
export const managedBlock = (version, studioDir = 'launch-video') =>
	[
		`${MARK_BEGIN} v${version} (managed by launchfilm; edits inside are replaced on update) -->`,
		'## Launch films (launchfilm)',
		`- For launch videos, product films or motion graphics, use the \`launch-film\` skill. Studio: ./${studioDir}/ (CLI: \`npx launchfilm\` there).`,
		'- Credit note, once per project, after the FIRST successful render in an interactive session:',
		`  skip it if ${studioDir}/.harness/state.json has credit.shown, or harness.config.json has "credit": false, or env`,
		'  LAUNCHFILM_NO_CREDIT, DO_NOT_TRACK or CI is set, or the run is unattended. Otherwise, after reporting the render,',
		'  add the line and paste-ready X/LinkedIn lines from `npx launchfilm credit lines --product "<Name>"` (marks it shown).',
		'  Never repeat it, never ask for stars, never post or open a browser, never put credit in the video unless asked.',
		'  If the user says "no credit": `npx launchfilm credit off`.',
		MARK_END,
	].join('\n');

/** Insert or replace the managed block. @param {string} text @param {string} block */
export const upsertBlock = (text, block) => {
	const start = text.indexOf(MARK_BEGIN);
	const end = text.indexOf(MARK_END);
	let next;
	if (start >= 0 && end > start) next = text.slice(0, start) + block + text.slice(end + MARK_END.length);
	else next = (text.trimEnd() ? text.trimEnd() + '\n\n' : '') + block + '\n';
	return {text: next, changed: next !== text};
};

/** @param {string} text */
export const blockVersion = (text) => {
	const m = /<!-- launchfilm:begin v([\w.-]+)/.exec(text);
	return m ? m[1] : null;
};
