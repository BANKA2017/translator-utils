import { BaiduLanguagePredict, BaiduTranslator } from "./source/baidu.js";
import { DeepL } from "./source/deepl.js";
import { GoogleTranslate, GoogleBrowserTranslate } from "./source/google.js";
import { MicrosoftTranslator, MicrosoftBrowserTranslator } from "./source/microsoft.js";
import { SogouBrowserTranslator } from "./source/sogou.js";
import { YandexDetect, YandexTranslator, YandexBrowserTranslator } from "./source/yandex.js";
import { IsChs, IsCht } from "./misc.js";
const Translator = async (text = '', platform, target, raw) => {
    let result = { content: '', message: '' };
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleBrowserTranslate(text, target, !!raw);
                break;
            case 'microsoft':
                result.content = await MicrosoftBrowserTranslator(text, target, !!raw);
                break;
            case 'sogou':
                result.content = await SogouBrowserTranslator(text, target, !!raw);
                break;
            case 'yandex':
                result.content = await YandexBrowserTranslator(text, target, !!raw);
                break;
            case 'baidu':
                result.content = await BaiduTranslator(text, target, !!raw);
                break;
            case 'deepl':
                result.content = await DeepL(text, target, !!raw);
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};
export { BaiduLanguagePredict, YandexDetect, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexTranslator, YandexBrowserTranslator, IsChs, IsCht };
export default Translator;
