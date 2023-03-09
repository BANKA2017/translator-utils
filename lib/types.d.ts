export type TranslatorModuleFunction = <R extends boolean = false>(text: string | string[], target: string, raw: R) => Promise<R extends true ? any : string>;
export type TranslatorFunction = <T extends string = 'en', P extends Platform = 'google', R extends boolean = false>(text: string | string[], target: T, platform: P, raw: R) => Promise<TranslatorResult<R>>;
export interface TranslatorResult<K extends boolean> {
    content: K extends true ? any : string;
    message: string;
}
export type Platform = 'google' | 'baidu' | 'microsoft' | 'sogou' | 'yandex' | 'deepl';
export type BrowserPlatform = Omit<Platform, 'baidu' | 'deepl'>;
