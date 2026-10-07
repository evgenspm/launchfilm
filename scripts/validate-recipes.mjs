#!/usr/bin/env node
// Validates every studio/src/recipes/<id>/recipe.json: JSON schema (schemas/recipe.schema.json, ajv draft 2020-12),
// folder name = id, techniques[] ⊂ craft/vocabulary.md, audio.sfx[].sound ⊂ vocabulary audio ids,
// transition_out ∈ transitions ids | hard-cut, and the sibling files (recipe.md, Recipe.tsx, index.tsx).
// Exit 1 on any error. Usage: node scripts/validate-recipes.mjs [--json]
import {existsSync} from 'node:fs';
import path from 'node:path';
import {ajv2020, readJson, recipeDirs, ROOT, vocabulary} from './lib.mjs';

const json = process.argv.includes('--json');
const ajv = ajv2020();
const validate = ajv.compile(readJson(path.join(ROOT, 'schemas', 'recipe.schema.json')));
const vocab = vocabulary();
const transitions = vocab.sections.transitions ?? new Set();
const results = [];

for (const dir of recipeDirs()) {
	const id = path.basename(dir);
	const errors = [];
	const warnings = [];
	let r;
	try {
		r = readJson(path.join(dir, 'recipe.json'));
	} catch (e) {
		results.push({id, errors: [`recipe.json is not valid JSON: ${e.message}`], warnings});
		continue;
	}
	if (!validate(r)) for (const e of validate.errors) errors.push(`schema ${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ''}`);
	if (r.id !== id) errors.push(`id "${r.id}" ≠ folder "${id}"`);
	for (const t of r.techniques ?? []) if (!vocab.techniques.has(t)) errors.push(`technique "${t}" is not in craft/vocabulary.md`);
	for (const s of r.audio?.sfx ?? []) if (s.sound && !vocab.audio.has(s.sound)) errors.push(`audio.sfx sound "${s.sound}" is not a vocabulary audio id`);
	for (const s of r.structure ?? []) {
		if (s.transition_out && s.transition_out !== 'hard-cut' && !transitions.has(s.transition_out)) warnings.push(`structure ${s.t0}–${s.t1}: transition_out "${s.transition_out}" is not a transitions id`);
		if (s.t1 < s.t0) errors.push(`structure ${s.t0}–${s.t1}: t1 < t0`);
	}
	for (const f of ['recipe.md', 'Recipe.tsx', 'index.tsx']) if (!existsSync(path.join(dir, f))) errors.push(`missing ${f}`);
	results.push({id, errors, warnings});
}

const bad = results.filter((r) => r.errors.length);
if (json) console.log(JSON.stringify({ok: !bad.length, vocabulary: {techniques: vocab.techniques.size, audio: vocab.audio.size}, recipes: results}, null, 1));
else {
	for (const r of results) {
		console.log(`${r.errors.length ? 'FAIL' : 'ok  '} ${r.id}`);
		for (const e of r.errors) console.log(`       ${e}`);
		for (const w of r.warnings) console.log(`       warn: ${w}`);
	}
	console.log(`${results.length} recipes, ${bad.length} failing (vocabulary: ${vocab.techniques.size} techniques, ${vocab.audio.size} audio ids)`);
}
process.exit(bad.length ? 1 : 0);
