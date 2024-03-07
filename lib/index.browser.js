import { YandexBrowserTranslator } from './source/yandex.js';
import { GoogleBrowserTranslate } from './source/google.js';
import { MicrosoftBrowserTranslator } from './source/microsoft.js';
import { SogouBrowserTranslator } from './source/sogou.js';
const Translator = async (text = '', platform, source, target, raw, ext = {}) => {
    let result = { content: '', message: '' };
    try {
        switch (platform) {
            case 'google':
            case 'google_browser':
                result.content = await GoogleBrowserTranslate(text, source, target, !!raw, ext);
                break;
            case 'microsoft':
            case 'microsoft_browser':
                result.content = await MicrosoftBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'sogou':
            case 'sogou_browser':
                result.content = await SogouBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'yandex':
            case 'yandex_browser':
                result.content = await YandexBrowserTranslator(text, source, target, !!raw, ext);
                break;
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};
export default Translator;
