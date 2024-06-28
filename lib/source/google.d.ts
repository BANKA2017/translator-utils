import type { TTSModuleFunction, TranslatorModuleFunction } from '../types.js';
declare const GoogleTranslate: TranslatorModuleFunction<'google'>;
declare const GoogleBrowserTranslate: TranslatorModuleFunction<'google_browser'>;
declare const GoogleBrowserTranslateV2: TranslatorModuleFunction<'google_browser'>;
declare const GoogleTranslateTk: (originalText?: string | string[], tkk?: number[]) => string;
declare const GoogleTTS: TTSModuleFunction<'google'>;
export { GoogleTranslate, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTranslateTk, GoogleTTS };
