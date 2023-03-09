declare const GoogleTranslate: (text?: string | string[], target?: string, raw?: boolean) => Promise<unknown>;
declare const GoogleBrowserTranslate: (text?: string | string[], target?: string, raw?: boolean) => Promise<unknown>;
declare const GoogleTranslateTk: (originalText?: string | string[], tkk?: number[]) => string;
export { GoogleTranslate, GoogleBrowserTranslate, GoogleTranslateTk };
