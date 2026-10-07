// Remotion CLI config for the launchfilm studio (applies to `remotion studio|render|still`, not to programmatic renders).
import {Config} from '@remotion/cli/config';

Config.setEntryPoint('./src/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// GL backend for WebGL layers (three, @remotion/effects). ANGLE is right on macOS and Windows. Override with
// REMOTION_GL=swangle (CPU, any Linux CI) | egl | vulkan | angle-egl (Linux with a GPU) | swiftshader.
const GL = ['angle', 'angle-egl', 'egl', 'swangle', 'swiftshader', 'vulkan'] as const;
type Gl = (typeof GL)[number];
const fromEnv = process.env.REMOTION_GL as Gl | undefined;
if (fromEnv && !GL.includes(fromEnv)) throw new Error(`REMOTION_GL must be one of ${GL.join(', ')} (got "${fromEnv}")`);
Config.setChromiumOpenGlRenderer(fromEnv ?? (process.platform === 'linux' ? 'swangle' : 'angle'));
