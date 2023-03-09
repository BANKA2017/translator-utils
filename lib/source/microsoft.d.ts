import { TranslatorModuleFunction } from 'types.js';
declare const MicrosoftTranslator: TranslatorModuleFunction<'microsoft'>;
declare const GetMicrosoftBrowserTranslatorAuth: () => Promise<any>;
declare const MicrosoftBrowserTranslator: TranslatorModuleFunction<'microsoft'>;
export { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth };
