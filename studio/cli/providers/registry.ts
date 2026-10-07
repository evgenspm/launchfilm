// Every provider the CLI knows, with the env vars it reads. doctor reports these as set/unset (never values);
// .env.example lists the same names.

export type Capability = 'tts' | 'words' | 'music' | 'sfx' | 'image' | 'video' | 'vision';

export interface ProviderInfo {
	id: string;
	capability: Capability;
	free: boolean;
	env: string[];
	/** one line shown by doctor / errors */
	note: string;
	docs?: string;
}

export const PROVIDERS: ProviderInfo[] = [
	// voice
	{id: 'kokoro', capability: 'tts', free: true, env: [], note: 'Kokoro-82M (Apache-2.0) via sherpa-onnx-node; ~130 MB model downloaded on first use'},
	{id: 'say', capability: 'tts', free: true, env: [], note: 'macOS say: PREVIEW ONLY (Apple licence forbids publishing system-voice audio)'},
	{id: 'elevenlabs', capability: 'tts', free: false, env: ['ELEVENLABS_API_KEY'], note: 'eleven_v4 with character timestamps; free plan is non-commercial', docs: 'https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps'},
	{id: 'cartesia', capability: 'tts', free: false, env: ['CARTESIA_API_KEY'], note: 'sonic-3.6 with word timestamps (SSE); free plan is non-commercial', docs: 'https://docs.cartesia.ai/api-reference/tts/sse'},
	{id: 'azure', capability: 'tts', free: false, env: ['AZURE_SPEECH_KEY', 'AZURE_SPEECH_REGION'], note: 'Azure neural voices (F0 tier is free and commercial); timings via alignment', docs: 'https://learn.microsoft.com/azure/ai-services/speech-service/rest-text-to-speech'},
	{id: 'gemini', capability: 'tts', free: false, env: ['GEMINI_API_KEY'], note: 'Gemini TTS; free tier trains on your data; no timings (aligned after)', docs: 'https://ai.google.dev/gemini-api/docs/speech-generation'},
	{id: 'openai', capability: 'tts', free: false, env: ['OPENAI_API_KEY'], note: 'gpt-4o-mini-tts; no timings (aligned after); disclose AI voice', docs: 'https://developers.openai.com/api/docs/guides/text-to-speech'},
	// word timings
	{id: 'whisper', capability: 'words', free: true, env: [], note: 'whisper.cpp (MIT) large-v3-turbo, DTW token timestamps (-nfa), snapped to the script'},
	{id: 'elevenlabs', capability: 'words', free: false, env: ['ELEVENLABS_API_KEY'], note: 'ElevenLabs Forced Alignment (~$0.22/h)', docs: 'https://elevenlabs.io/docs/api-reference/forced-alignment/create'},
	{id: 'deepgram', capability: 'words', free: false, env: ['DEEPGRAM_API_KEY'], note: 'Deepgram Nova-3 word timestamps', docs: 'https://developers.deepgram.com/docs/pre-recorded-audio'},
	// music
	{id: 'library', capability: 'music', free: true, env: [], note: 'CC0 / CC BY 4.0 beds from public/music/music.json (fetched on install)'},
	{id: 'lyria', capability: 'music', free: false, env: ['GEMINI_API_KEY'], note: 'Google Lyria via Gemini API (no free tier); output stays in your project', docs: 'https://ai.google.dev/gemini-api/docs/music-generation'},
	{id: 'elevenlabs', capability: 'music', free: false, env: ['ELEVENLABS_API_KEY'], note: 'ElevenLabs Music (paid plans); never commit its output to a public library', docs: 'https://elevenlabs.io/docs/api-reference/music/compose'},
	{id: 'stable-audio', capability: 'music', free: false, env: ['STABILITY_API_KEY'], note: 'Stability Stable Audio 2.5', docs: 'https://platform.stability.ai/docs/api-reference'},
	// sfx
	{id: 'procedural', capability: 'sfx', free: true, env: [], note: 'our CC0 procedural presets (JS synthesis, deterministic)'},
	{id: 'elevenlabs', capability: 'sfx', free: false, env: ['ELEVENLABS_API_KEY'], note: 'ElevenLabs sound generation', docs: 'https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert'},
	{id: 'stable-audio', capability: 'sfx', free: false, env: ['STABILITY_API_KEY'], note: 'Stable Audio (always pass a duration)'},
	{id: 'freesound', capability: 'sfx', free: false, env: ['FREESOUND_API_KEY'], note: 'your own Freesound token, CC0 filter, HQ previews; commercial API use is negotiated case by case', docs: 'https://freesound.org/docs/api/'},
	// image / video / vision (optional)
	{id: 'gemini', capability: 'image', free: false, env: ['GEMINI_API_KEY'], note: 'Gemini image model from config (no free tier)'},
	{id: 'openai', capability: 'image', free: false, env: ['OPENAI_API_KEY'], note: 'OpenAI image model from config'},
	{id: 'fal', capability: 'image', free: false, env: ['FAL_KEY'], note: 'fal.ai model from config'},
	{id: 'runway', capability: 'image', free: false, env: ['RUNWAYML_API_SECRET'], note: 'Runway (trains on inputs/outputs per its terms)'},
	{id: 'gemini', capability: 'video', free: false, env: ['GEMINI_API_KEY'], note: 'Gemini video model id from config (never a hard-coded preview id)'},
	{id: 'fal', capability: 'video', free: false, env: ['FAL_KEY'], note: 'fal.ai video model from config'},
	{id: 'runway', capability: 'video', free: false, env: ['RUNWAYML_API_SECRET'], note: 'Runway video model from config'},
	{id: 'gemini', capability: 'vision', free: false, env: ['GEMINI_API_KEY'], note: 'Gemini video review (free tier trains on uploads)'},
];

export const providerInfo = (capability: Capability, id: string) => PROVIDERS.find((p) => p.capability === capability && p.id === id);

export const ALL_ENV = [...new Set(PROVIDERS.flatMap((p) => p.env))];
