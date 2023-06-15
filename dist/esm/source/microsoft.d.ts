import { TranslatorModuleFunction } from '../types.js';
declare const MicrosoftTranslator: TranslatorModuleFunction<"microsoft">;
declare const GetMicrosoftBrowserTranslatorAuth: () => Promise<any>;
declare const MicrosoftBrowserTranslator: TranslatorModuleFunction<"microsoft_browser">;
export { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth };
