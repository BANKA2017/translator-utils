import { TranslatorModuleFunction } from '../types.js';
declare const GoogleTranslate: TranslatorModuleFunction;
declare const GoogleBrowserTranslate: TranslatorModuleFunction;
declare const GoogleTranslateTk: (originalText?: string | string[], tkk?: number[]) => string;
export { GoogleTranslate, GoogleBrowserTranslate, GoogleTranslateTk };
