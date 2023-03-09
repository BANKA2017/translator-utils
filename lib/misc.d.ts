import { Target } from "types.js";
export declare const BAIDU_LANGUAGES: {
    [p in Target['baidu']]: string;
};
export declare const GOOGLE_LANGUAGES: {
    [p in Target['google']]: string;
};
export declare const DEEPL_LANGUAGES: {
    [p in Target['deepl']]: string;
};
export declare const BING_LANGUAGES: {
    [p in Target['microsoft']]: string;
};
export declare const SOGOU_LANGUAGES: {
    [p in Target['sogou']]: string;
};
export declare const YANDEX_LANGUAGES: {
    [p in Target['yandex']]: string;
};
export declare const SupportedLanguage: <L extends string, P extends keyof Target = "google">(source: P, language: L) => boolean;
export declare const IsChs: (lang?: string) => boolean;
export declare const IsCht: (lang?: string) => boolean;
