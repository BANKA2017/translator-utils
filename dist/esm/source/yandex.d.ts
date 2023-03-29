import { TranslatorModuleFunction } from '../types.js';
declare const YandexDetect: (text?: string | string[]) => Promise<string | '_'>;
declare const YandexTranslator: TranslatorModuleFunction<'yandex'>;
declare const YandexBrowserTranslator: TranslatorModuleFunction<'yandex'>;
export { YandexDetect, YandexTranslator, YandexBrowserTranslator };
