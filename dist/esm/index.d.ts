import { DeepL } from './source/deepl.js';
import { GoogleTranslate, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTTS, GoogleTranslateTk } from './source/google.js';
import { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, MicrosoftBrowserPredict, MicrosoftTTS, MicrosoftBrowserTTS } from './source/microsoft.js';
import { SogouBrowserTranslator, SogouTTS } from './source/sogou.js';
import { YandexDetect, YandexTranslator, YandexBrowserTranslator } from './source/yandex.js';
import { IsChs, IsCht } from './misc.js';
import type { TranslatorFunction } from './types.js';
declare const Translator: TranslatorFunction;
export { YandexDetect, MicrosoftBrowserPredict, DeepL, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexTranslator, YandexBrowserTranslator };
export { GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken };
export { GoogleTranslateTk };
export { IsChs, IsCht };
export { GoogleTTS, MicrosoftTTS, MicrosoftBrowserTTS, SogouTTS };
export default Translator;