// Every composition registers itself:
//   films/<slug>/index.tsx            → Folder "films/<slug>"   (export const compositions)
//   src/recipes/<id>/index.tsx        → Folder "recipes/<family>" (export const compositions + recipe, the parsed recipe.json)
//                                       folders without index.tsx (recipe.md + recipe.json only) are skipped
//   src/cookbook/showcase/*Showcase.tsx → Folder "showcase"     (export const showcase = [{id, component, …}])
// A module that throws while loading is skipped with a console error, so one half-written film can't break the studio.
import React from 'react';
import {Composition, Folder} from 'remotion';
import {Cookbook, COOKBOOK_FRAMES} from './cookbook/Cookbook';
import {BrandSheet, BRAND_SHEET_FRAMES} from './cookbook/BrandSheet';

type ShowcaseEntry = {id: string; component: React.FC; durationInFrames: number; width?: number; height?: number; fps?: number};

const folderName = (s: string) => s.replace(/[^a-zA-Z0-9-]/g, '') || 'untitled';

const safe = <T,>(what: string, load: () => T): T | null => {
  try {
    return load();
  } catch (err) {
    console.error(`[launchfilm] skipped ${what}:`, err);
    return null;
  }
};

const filmCtx = require.context('../films', true, /^\.\/[^/]+\/index\.tsx$/);
const recipeCtx = require.context('./recipes', true, /^\.\/[^/]+\/index\.tsx$/);
const showcaseCtx = require.context('./cookbook/showcase', false, /^\.\/[A-Za-z0-9]+Showcase\.tsx$/);

type FilmEntry = {slug: string; node: React.ReactNode};
type RecipeEntry = {id: string; family: string; node: React.ReactNode};

const films: FilmEntry[] = filmCtx
  .keys()
  .sort()
  .flatMap((k) => {
    const slug = k.split('/')[1];
    const mod = safe(`film ${slug}`, () => filmCtx(k) as {compositions?: React.ReactNode});
    return mod?.compositions ? [{slug, node: mod.compositions}] : [];
  });

const recipes: RecipeEntry[] = recipeCtx
  .keys()
  .sort()
  .flatMap((k) => {
    const id = k.split('/')[1];
    const mod = safe(`recipe ${id}`, () => recipeCtx(k) as {compositions?: React.ReactNode; recipe?: {family?: string}});
    return mod?.compositions ? [{id, family: mod.recipe?.family ?? 'other', node: mod.compositions}] : [];
  });

const families = Array.from(new Set(recipes.map((r) => r.family))).sort();

const showcases: ShowcaseEntry[] = showcaseCtx
  .keys()
  .sort()
  .flatMap((k) => safe(`showcase ${k}`, () => (showcaseCtx(k) as {showcase?: ShowcaseEntry[]}).showcase ?? []) ?? []);

export const Root: React.FC = () => (
  <>
    <Folder name="films">
      {films.map((f) => (
        <Folder key={f.slug} name={folderName(f.slug)}>
          {f.node}
        </Folder>
      ))}
    </Folder>
    <Folder name="recipes">
      {families.map((fam) => (
        <Folder key={fam} name={folderName(fam)}>
          {recipes.filter((r) => r.family === fam).map((r) => <React.Fragment key={r.id}>{r.node}</React.Fragment>)}
        </Folder>
      ))}
    </Folder>
    <Folder name="cookbook">
      <Composition id="Cookbook" component={Cookbook} durationInFrames={COOKBOOK_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="BrandSheet" component={BrandSheet} durationInFrames={BRAND_SHEET_FRAMES} fps={30} width={1920} height={1080} />
    </Folder>
    <Folder name="showcase">
      {showcases.map((s) => (
        <Composition key={s.id} id={s.id} component={s.component} durationInFrames={s.durationInFrames} fps={s.fps ?? 30} width={s.width ?? 1920} height={s.height ?? 1080} />
      ))}
    </Folder>
  </>
);
