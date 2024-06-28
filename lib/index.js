import { BaiduLanguagePredict, BaiduTranslator, GetBaiduTranslatorToken, BaiduTTS } from './source/baidu.js';
import { DeepL } from './source/deepl.js';
import { GoogleTranslate, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTTS, GoogleTranslateTk } from './source/google.js';
import { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, MicrosoftBrowserPredict, MicrosoftTTS, MicrosoftBrowserTTS } from './source/microsoft.js';
import { SogouBrowserTranslator, SogouTTS } from './source/sogou.js';
import { YandexDetect, YandexTranslator, YandexBrowserTranslator } from './source/yandex.js';
import { WatsonDetect, WatsonTranslator } from 'source/watson.js';
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
            case 'google_browser_v2':
                result.content = await GoogleBrowserTranslateV2(text, source, target, !!raw, ext);
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
                break;
            case 'watson':
                result.content = await WatsonTranslator(text, source, target, !!raw, ext);
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};
export { BaiduLanguagePredict, YandexDetect, MicrosoftBrowserPredict, WatsonDetect, BaiduTranslator, DeepL, WatsonTranslator, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexTranslator, YandexBrowserTranslator };
export { GetBaiduTranslatorToken, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken };
export { GoogleTranslateTk };
export { IsChs, IsCht };
export { GoogleTTS, MicrosoftTTS, MicrosoftBrowserTTS, BaiduTTS, SogouTTS };
export default Translator;
