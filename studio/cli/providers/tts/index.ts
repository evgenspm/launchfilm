import {die} from '../../lib/log.js';
import type {TtsProvider} from '../types.js';
import {azure, cartesia, elevenlabs, gemini, openai, say} from './cloud.js';
import {kokoro} from './kokoro.js';

export const TTS: Record<string, TtsProvider> = {kokoro, elevenlabs, cartesia, azure, gemini, openai, say};

export const ttsProvider = (id: string): TtsProvider => TTS[id] ?? die(`unknown TTS provider ${JSON.stringify(id)}`, `providers: ${Object.keys(TTS).join(', ')}`);
