import { BaiduLanguagePredict, BaiduTranslator, GetBaiduTranslatorToken, BaiduTTS } from './source/baidu.js';
import { DeepL } from './source/deepl.js';
import { GoogleTranslate, GoogleBrowserTranslate, GoogleTTS, GoogleTranslateTk } from './source/google.js';
import { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, MicrosoftBrowserPredict, MicrosoftTTS, MicrosoftBrowserTTS } from './source/microsoft.js';
import { SogouBrowserTranslator, SogouTTS } from './source/sogou.js';
import { YandexDetect, YandexTranslator, YandexBrowserTranslator } from './source/yandex.js';
import { IsChs, IsCht } from './misc.js';
const Translator = async (text = '', platform, source, target, raw, ext = {}) => {
    let result = { content: '', message: '' };
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleTranslate(text, source, target, !!raw, ext);
                break;
            case 'google_browser':
                result.content = await GoogleBrowserTranslate(text, source, target, !!raw, ext);
                break;
            case 'microsoft':
                result.content = await MicrosoftTranslator(text, source, target, !!raw, ext);
                break;
            case 'microsoft_browser':
                result.content = await MicrosoftBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'sogou':
            case 'sogou_browser':
                result.content = await SogouBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'yandex':
                result.content = await YandexTranslator(text, source, target, !!raw, ext);
                break;
            case 'yandex_browser':
                result.content = await YandexBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'baidu':
                result.content = await BaiduTranslator(text, source, target, !!raw, ext);
                break;
            case 'deepl':
                result.content = await DeepL(text, source, target, !!raw, ext);
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};
export { BaiduLanguagePredict, YandexDetect, MicrosoftBrowserPredict, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexTranslator, YandexBrowserTranslator };
export { GetBaiduTranslatorToken, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken };
export { GoogleTranslateTk };
export { IsChs, IsCht };
export { GoogleTTS, MicrosoftTTS, MicrosoftBrowserTTS, BaiduTTS, SogouTTS };
export default Translator;
