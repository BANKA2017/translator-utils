import type { TranslatorModuleFunction, TTSModuleFunction } from '../types.js';
declare const GetMicrosoftTranslatorToken: () => Promise<{
    IG: string;
    token: string;
    key: number;
    message: string;
}>;
declare const MicrosoftTranslator: TranslatorModuleFunction<'microsoft'>;
declare const GetMicrosoftBrowserTranslatorAuth: () => Promise<any>;
type MicrosoftBrowserPredictResponseType = {
    isTranslationSupported: boolean;
    isTransliterationSupported: boolean;
    language: string;
    score: number;
};
declare const MicrosoftBrowserPredict: (text?: string | string[], jwt?: string) => Promise<MicrosoftBrowserPredictResponseType[]>;
declare const MicrosoftBrowserTranslator: TranslatorModuleFunction<'microsoft_browser'>;
declare const MicrosoftBrowserTranslatorV2: TranslatorModuleFunction<'microsoft_browser'>;
declare const MicrosoftTTS: TTSModuleFunction<'microsoft_tts'>;
declare const MicrosoftBrowserTTS: TTSModuleFunction<'microsoft_edge_tts'>;
export type { MicrosoftBrowserPredictResponseType };
export { GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, MicrosoftBrowserPredict, MicrosoftBrowserTranslator, MicrosoftBrowserTranslatorV2, MicrosoftTranslator };
export { MicrosoftBrowserTTS, MicrosoftTTS };
