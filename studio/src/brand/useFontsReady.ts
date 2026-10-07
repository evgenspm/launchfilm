// Hold the render until fonts are really loaded. Anything that measures text (measureText, fitText) must call this
// first: a width measured with the fallback face is cached and sticks for the whole render.
import {useEffect, useState} from 'react';
import {continueRender, delayRender} from 'remotion';
import {fontReady} from './fonts';

const done = new Set<string>();
const pending = new Map<string, Promise<unknown>>();

/** `specs` are CSS font shorthands: `600 100px "Geist", system-ui`. Returns true once every face is loaded. */
export const useFontsReady = (specs: string[]) => {
  const key = specs.join('|');
  const [ready, setReady] = useState(() => done.has(key));
  const [handle] = useState(() => (done.has(key) ? null : delayRender(`fonts ${key}`)));
  useEffect(() => {
    if (ready) return;
    let alive = true;
    let p = pending.get(key);
    if (!p) {
      const stacks = specs.map((s) => s.split(/\d+(?:\.\d+)?px\s+/)[1] ?? s);
      p = fontReady(stacks)
        .then(() => Promise.all(specs.map((s) => document.fonts.load(s).catch(() => []))))
        .then(() => document.fonts.ready);
      pending.set(key, p);
    }
    p.then(() => {
      done.add(key);
      if (alive) setReady(true);
      if (handle !== null) continueRender(handle);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return ready;
};
