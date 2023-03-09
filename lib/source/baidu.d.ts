export interface GetBaiduTranslatorTokenResult {
    message: string | null;
    page: string | null;
    cookie: string | null;
    common: {
        token?: string;
    } | null;
    gtk: number[] | null;
}
declare const GetBaiduTranslatorToken: (cookie?: string, loop?: number) => Promise<GetBaiduTranslatorTokenResult>;
declare const BaiduLanguagePredict: (text?: string | string[], cookie?: string) => Promise<string | '_'>;
declare const BaiduTranslator: (text?: string, target?: string, raw?: boolean) => Promise<string | unknown>;
export { BaiduTranslator, BaiduLanguagePredict, GetBaiduTranslatorToken };
