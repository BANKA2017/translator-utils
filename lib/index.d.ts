import { BaiduLanguagePredict, BaiduTranslator } from "./source/baidu.js";
import { DeepL } from "./source/deepl.js";
import { GoogleTranslate, GoogleBrowserTranslate } from "./source/google.js";
import { MicrosoftTranslator, MicrosoftBrowserTranslator } from "./source/microsoft.js";
import { SogouBrowserTranslator } from "./source/sogou.js";
import { YandexDetect, YandexBrowserTranslator } from "./source/yandex.js";
import { IsChs, IsCht } from "./misc.js";
declare const Translator: (text?: string, target?: string, platform?: string, raw?: boolean) => Promise<{
    content: string;
    message: string;
}>;
export { Translator, BaiduLanguagePredict, YandexDetect, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexBrowserTranslator, IsChs, IsCht };
