import { BaiduLanguagePredict, BaiduTranslator } from "./source/baidu.js"
import { DeepL } from "./source/deepl.js"
import { GoogleTranslate, GoogleBrowserTranslate } from "./source/google.js"
import { MicrosoftTranslator, MicrosoftBrowserTranslator } from "./source/microsoft.js"
import { SogouBrowserTranslator } from "./source/sogou.js"
import { YandexDetect, YandexBrowserTranslator } from "./source/yandex.js"

import { IsChs, IsCht } from "./misc.js"
import { BAIDU_LIST, BING_LIST, DEEPL_LIST, GOOGLE_LIST, SOGOU_LIST, TranslatorFunction, YANDEX_LIST } from "types.js"

const Translator: TranslatorFunction = async (text = '', platform, target, raw) => {
    let result = {content: '', message: ''}
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleBrowserTranslate(text, target as GOOGLE_LIST, !!raw)
                break
            case 'microsoft':
                result.content = await MicrosoftBrowserTranslator(text, target as BING_LIST, !!raw)
                break
            case 'sogou':
                result.content = await SogouBrowserTranslator(text, target as SOGOU_LIST, !!raw)
                break
            case 'yandex':
                result.content = await YandexBrowserTranslator(text, target as YANDEX_LIST, !!raw)
                break
            case 'baidu':
                result.content = await BaiduTranslator(text, target as BAIDU_LIST, !!raw)
                break
            case 'deepl':
                result.content = await DeepL(text, target as DEEPL_LIST, !!raw)
        }
    } catch (e) {
        result.message = String(e)
    }
    return result
}

export { BaiduLanguagePredict, YandexDetect, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexBrowserTranslator, IsChs, IsCht }
export default Translator
