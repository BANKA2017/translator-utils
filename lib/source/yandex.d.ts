import { TranslatorModuleFunction } from 'types.js';
declare const YandexDetect: (text?: string | string[]) => Promise<string | '_'>;
declare const YandexBrowserTranslator: TranslatorModuleFunction;
export { YandexDetect, YandexBrowserTranslator };