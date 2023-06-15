import { BaiduLanguagePredict, BaiduTranslator } from "./source/baidu.js"
import { DeepL } from "./source/deepl.js"
import { GoogleTranslate, GoogleBrowserTranslate } from "./source/google.js"
import { MicrosoftTranslator, MicrosoftBrowserTranslator } from "./source/microsoft.js"
import { SogouBrowserTranslator } from "./source/sogou.js"
import { YandexDetect, YandexTranslator, YandexBrowserTranslator } from "./source/yandex.js"

import { IsChs, IsCht } from "./misc.js"
import { BAIDU_LIST, BING_LIST, DEEPL_LIST, GOOGLE_LIST, SOGOU_LIST, TranslatorFunction, YANDEX_LIST } from "types.js"

const Translator: TranslatorFunction = async (text = '', platform, source, target, raw) => {
    let result = {content: '', message: ''}
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleTranslate(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw)
                break
            case 'google_browser':
                result.content = await GoogleBrowserTranslate(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw)
                break
            case 'microsoft':
                result.content = await MicrosoftTranslator(text, source as BING_LIST, target as BING_LIST, !!raw)
                break
            case 'microsoft_browser':
                result.content = await MicrosoftBrowserTranslator(text, source as BING_LIST, target as BING_LIST, !!raw)
                break
            case 'sogou':
            case 'sogou_browser':
                result.content = await SogouBrowserTranslator(text, source as SOGOU_LIST, target as SOGOU_LIST, !!raw)
                break
            case 'yandex':
                result.content = await YandexTranslator(text, source as YANDEX_LIST, target as YANDEX_LIST, !!raw)
                break
            case 'yandex_browser':
                result.content = await YandexBrowserTranslator(text, source as YANDEX_LIST, target as YANDEX_LIST, !!raw)
                break
            case 'baidu':
                result.content = await BaiduTranslator(text, source as BAIDU_LIST, target as BAIDU_LIST, !!raw)
                break
            case 'deepl':
                result.content = await DeepL(text, source as DEEPL_LIST, target as DEEPL_LIST, !!raw)
        }
    } catch (e) {
        result.message = String(e)
    }
    return result
}

export { BaiduLanguagePredict, YandexDetect, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexTranslator, YandexBrowserTranslator, IsChs, IsCht }
export default Translator
