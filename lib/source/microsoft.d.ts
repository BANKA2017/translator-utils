declare const MicrosoftTranslator: (text?: string | string[], target?: string, raw?: boolean) => Promise<unknown>;
declare const GetMicrosoftBrowserTranslatorAuth: () => Promise<any>;
declare const MicrosoftBrowserTranslator: (text?: string | string[], target?: string, raw?: boolean) => Promise<unknown>;
export { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth };
