// A screen recording or clip placed in the frame: crop (normalised source rect) scaled to cover, a slow drift, and
// punch-ins (spring zoom to a focus point on cameraIn, back on cameraOut). Recompose per aspect by passing a crop.
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';
import {springs} from '../presets/springs';
import {mediaSrc} from './Sound';
import type {Crop, Punch} from './types';

export const FootageClip: React.FC<{
  src: string;
  /** seconds into the file */
  trim?: number;
  crop?: Crop;
  /** source pixel size (default 1920×1080) */
  size?: [number, number];
  punch?: Punch | Punch[];
  /** slow push over the clip, e.g. 1.03 (every shot moves) */
  drift?: number;
  durationSec?: number;
  playbackRate?: number;
  volume?: number;
  style?: React.CSSProperties;
}> = ({src, trim = 0, crop, size = [1920, 1080], punch, drift = 1, durationSec, playbackRate = 1, volume = 0, style}) => {
  const frame = useCurrentFrame();
  const {fps, width: W, height: H, durationInFrames} = useVideoConfig();
  const [sw, sh] = size;
  const fa = W / H;
  const sa = sw / sh;
  // default: centred crop of the source to the frame aspect
  const c = crop ?? (fa < sa ? {x: (1 - fa / sa) / 2, y: 0, w: fa / sa, h: 1} : {x: 0, y: (1 - sa / fa) / 2, w: 1, h: sa / fa});
  const k = Math.max(W / (c.w * sw), H / (c.h * sh));
  const vw = sw * k;
  const vh = sh * k;
  const left = -c.x * sw * k + (W - c.w * sw * k) / 2;
  const top = -c.y * sh * k + (H - c.h * sh * k) / 2;

  // zoom = product of every punch's current amount; the origin follows the active punch's focus
  let z = 1;
  let ox = W / 2;
  let oy = H / 2;
  for (const p of punch ? (Array.isArray(punch) ? punch : [punch]) : []) {
    const fin = spring({frame: frame - Math.round(p.at * fps), fps, config: springs.cameraIn});
    const fout = p.out ? spring({frame: frame - Math.round((p.at + p.out) * fps), fps, config: springs.cameraOut}) : 0;
    const amt = Math.max(0, fin - fout);
    if (amt > 0.001) {
      z *= 1 + (p.scale - 1) * amt;
      ox = left + p.focus[0] * vw;
      oy = top + p.focus[1] * vh;
    }
  }
  const total = durationSec ? durationSec * fps : durationInFrames;
  const d = interpolate(frame, [0, total], [1, drift], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden', ...style}}>
      <AbsoluteFill style={{transform: `scale(${z * d})`, transformOrigin: `${ox}px ${oy}px`}}>
        <Video
          src={mediaSrc(src)}
          trimBefore={Math.round(trim * fps)}
          playbackRate={playbackRate}
          volume={volume}
          muted={volume === 0}
          style={{position: 'absolute', left, top, width: vw, height: vh, maxWidth: 'none'}}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
