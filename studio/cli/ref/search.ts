// refSearch: rank studied recipes (studio/src/recipes/*/recipe.json, recipes/index.json) and
// locally prepared references (<refs>/<id>/meta.json) against a free-text query with
// optional filters:  family:ai-chat  aspect:9:16  tech:blur-in  theme:dark  source:jitter
//                    max:30 (seconds)  min:10  status:built  kind:recipe|ref

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface SearchOptions {
  /** studio/src/recipes (default: resolved next to this CLI) */
  recipesDir?: string;
  /** catalog json (default: <repo>/recipes/index.json if present) */
  indexFile?: string;
  /** prepared references (default: ./.harness/refs) */
  refsDir?: string;
  limit?: number;
}

export interface SearchHit {
  kind: 'recipe' | 'ref';
  id: string;
  title: string;
  score: number;
  family?: string;
  aspect?: string;
  duration_s?: number;
  techniques?: string[];
  status?: string;
  summary?: string;
  path: string;
  source_url?: string;
}

interface Doc {
  hit: Omit<SearchHit, 'score'>;
  fields: { text: string; w: number }[];
  theme?: string;
  source?: string;
  tags: string[];
}

const here = path.dirname(fileURLToPath(import.meta.url));

function readJson(file: string): any {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function recipeDoc(r: any, p: string): Doc | null {
  if (!r || typeof r !== 'object' || !r.id) return null;
  const join = (x: unknown) => (Array.isArray(x) ? x.join(' ') : typeof x === 'string' ? x : '');
  return {
    hit: {
      kind: 'recipe',
      id: r.id,
      title: r.title ?? r.id,
      family: r.family,
      aspect: r.format?.aspect,
      duration_s: r.format?.duration_s,
      techniques: r.techniques ?? [],
      status: r.status,
      summary: r.summary,
      path: p,
      source_url: r.source?.url,
    },
    fields: [
      { text: `${r.id} ${r.title ?? ''}`, w: 3 },
      { text: `${join(r.techniques)} ${join(r.tags)} ${r.family ?? ''}`, w: 2.5 },
      { text: `${r.summary ?? ''} ${join(r.use_when)}`, w: 2 },
      { text: `${r.look?.type_style ?? ''} ${join(r.look?.treatment)} ${join(r.components)} ${r.notes ?? ''}`, w: 1 },
      { text: join((r.structure ?? []).map((s: any) => `${s.shot ?? ''} ${s.motion ?? ''} ${s.camera ?? ''} ${s.transition_out ?? ''}`)), w: 0.5 },
    ],
    theme: r.look?.theme,
    source: r.source?.name,
    tags: [...(r.techniques ?? []), ...(r.tags ?? [])],
  };
}

function refDoc(dir: string): Doc | null {
  const meta = readJson(path.join(dir, 'meta.json'));
  if (!meta) return null;
  const src = meta.source ?? {};
  let summary = '';
  try {
    summary = fs.readFileSync(path.join(dir, 'summary.md'), 'utf8').slice(0, 4000);
  } catch {
    /* none */
  }
  return {
    hit: {
      kind: 'ref',
      id: meta.ref_id,
      title: src.title ?? meta.ref_id,
      family: src.family_hint,
      aspect: meta.aspect,
      duration_s: meta.duration_s,
      techniques: src.technique_hint ?? [],
      path: dir,
      source_url: src.url ?? src.source_url,
    },
    fields: [
      { text: `${meta.ref_id} ${src.title ?? ''}`, w: 3 },
      { text: `${(src.technique_hint ?? []).join(' ')} ${src.family_hint ?? ''}`, w: 2 },
      { text: `${src.description ?? ''} ${src.notes ?? ''}`, w: 1.5 },
      { text: summary, w: 0.3 },
    ],
    source: src.name ?? src.source_name,
    tags: src.technique_hint ?? [],
  };
}

function tokenize(s: string) {
  return s
    .toLowerCase()
    .split(/[^a-z0-9:+#.-]+/)
    .map((t) => t.replace(/^[:.#+-]+|[:.#+-]+$/g, ''))
    .filter((t) => t.length > 1);
}

export function collectDocs(o: SearchOptions = {}): Doc[] {
  const docs: Doc[] = [];
  const seen = new Set<string>();
  const recipesDir = o.recipesDir ?? path.resolve(here, '../../src/recipes');
  if (fs.existsSync(recipesDir)) {
    for (const d of fs.readdirSync(recipesDir)) {
      const p = path.join(recipesDir, d, 'recipe.json');
      const doc = recipeDoc(readJson(p), path.dirname(p));
      if (doc && !seen.has(`recipe:${doc.hit.id}`)) {
        docs.push(doc);
        seen.add(`recipe:${doc.hit.id}`);
      }
    }
  }
  const indexFile = o.indexFile ?? path.resolve(here, '../../../recipes/index.json');
  const idx = readJson(indexFile);
  const list: any[] = Array.isArray(idx) ? idx : Array.isArray(idx?.recipes) ? idx.recipes : [];
  for (const r of list) {
    const doc = recipeDoc(r, r.path ?? indexFile);
    if (doc && !seen.has(`recipe:${doc.hit.id}`)) {
      docs.push(doc);
      seen.add(`recipe:${doc.hit.id}`);
    }
  }
  const refsDir = o.refsDir ?? path.resolve('.harness', 'refs');
  if (fs.existsSync(refsDir)) {
    for (const d of fs.readdirSync(refsDir)) {
      const doc = refDoc(path.join(refsDir, d));
      if (doc) docs.push(doc);
    }
  }
  return docs;
}

export function refSearchDocs(query: string, docs: Doc[], limit = 10): SearchHit[] {
  const filters: Record<string, string> = {};
  const words: string[] = [];
  for (const raw of query.trim().split(/\s+/).filter(Boolean)) {
    const m = /^(family|aspect|tech|technique|theme|source|max|min|status|kind):(.+)$/i.exec(raw);
    if (m) filters[m[1].toLowerCase().replace('technique', 'tech')] = m[2].toLowerCase();
    else words.push(...tokenize(raw));
  }
  const hits: SearchHit[] = [];
  for (const d of docs) {
    const h = d.hit;
    if (filters.kind && h.kind !== filters.kind) continue;
    if (filters.family && h.family !== filters.family) continue;
    if (filters.aspect && h.aspect !== filters.aspect) continue;
    if (filters.tech && !(h.techniques ?? []).includes(filters.tech)) continue;
    if (filters.theme && d.theme !== filters.theme) continue;
    if (filters.source && d.source !== filters.source) continue;
    if (filters.status && h.status !== filters.status) continue;
    if (filters.max && !(h.duration_s !== undefined && h.duration_s <= Number(filters.max))) continue;
    if (filters.min && !(h.duration_s !== undefined && h.duration_s >= Number(filters.min))) continue;
    let score = words.length ? 0 : 1;
    for (const w of words) {
      let best = 0;
      for (const f of d.fields) {
        const toks = tokenize(f.text);
        if (toks.includes(w)) best = Math.max(best, f.w);
        else if (toks.some((t) => t.startsWith(w) || (w.length > 3 && t.includes(w)))) best = Math.max(best, f.w * 0.6);
      }
      if (d.tags.includes(w)) best = Math.max(best, 3);
      score += best;
    }
    if (words.length && score === 0) continue;
    if (h.kind === 'recipe') score += h.status === 'reviewed' ? 0.3 : h.status === 'built' ? 0.2 : 0;
    hits.push({ ...h, score: Math.round(score * 100) / 100 });
  }
  return hits.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, limit);
}

export function refSearch(query: string, opts: SearchOptions = {}): SearchHit[] {
  return refSearchDocs(query, collectDocs(opts), opts.limit ?? 10);
}
