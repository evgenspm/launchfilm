// JSON-schema validation (ajv, draft 2020-12) for film.json, brand.json, recipe.json and harness.config.json.
// Schemas live in <repo>/schemas in the harness repo and in launch-video/schemas in a user's install.
import {createRequire} from 'node:module';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {STUDIO, studioPath} from './paths.js';

const req = createRequire(studioPath('package.json'));

export const schemasDir = (): string | null => [path.join(STUDIO, 'schemas'), path.join(STUDIO, '..', 'schemas')].find((d) => existsSync(d)) ?? null;

let ajv: any = null;
const getAjv = () => {
	if (ajv) return ajv;
	const Ajv2020 = req('ajv/dist/2020').default ?? req('ajv/dist/2020');
	const addFormats = req('ajv-formats').default ?? req('ajv-formats');
	ajv = new Ajv2020({allErrors: true, strict: false});
	addFormats(ajv);
	return ajv;
};

export interface ValidationResult {
	ok: boolean;
	schema: string | null;
	errors: string[];
}

/** Validate `data` against schemas/<name>.schema.json; a missing schema is reported, not fatal. */
export const validateWith = (name: 'film' | 'brand' | 'recipe' | 'harness-config', data: unknown): ValidationResult => {
	const dir = schemasDir();
	const file = dir ? path.join(dir, `${name}.schema.json`) : null;
	if (!file || !existsSync(file)) return {ok: true, schema: null, errors: [`schemas/${name}.schema.json not found: not validated`]};
	const a = getAjv();
	const schema = JSON.parse(readFileSync(file, 'utf8'));
	const id = schema.$id ?? file;
	const validate = a.getSchema(id) ?? a.compile(schema);
	const ok = validate(data) as boolean;
	const errors = ok ? [] : (validate.errors ?? []).map((e: any) => `${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ''}${e.params?.allowedValues ? ` (${e.params.allowedValues.join(', ')})` : ''}`);
	return {ok, schema: file, errors};
};
