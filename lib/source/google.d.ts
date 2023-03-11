import { TranslatorModuleFunction } from '../types.js';
declare const GoogleTranslate: TranslatorModuleFunction<'google'>;
declare const GoogleBrowserTranslate: TranslatorModuleFunction<'google'>;
declare const GoogleTranslateTk: (originalText?: string | string[], tkk?: number[]) => string;
export { GoogleTranslate, GoogleBrowserTranslate, GoogleTranslateTk };
