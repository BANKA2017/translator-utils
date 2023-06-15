import { YandexBrowserTranslator } from "index.js"
import { GoogleBrowserTranslate } from "./source/google.js"
import { MicrosoftBrowserTranslator } from "./source/microsoft.js"
import { SogouBrowserTranslator } from "./source/sogou.js"

import { BING_LIST, GOOGLE_LIST, SOGOU_LIST, TranslatorFunction, YANDEX_LIST } from "types.js"

const Translator: TranslatorFunction = async (text = '', platform, source, target, raw) => {
    let result = {content: '', message: ''}
    try {
        switch (platform) {
            case 'google':
            case 'google_browser':
                result.content = await GoogleBrowserTranslate(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw)
                break
            case 'microsoft':
            case 'microsoft_browser':
                result.content = await MicrosoftBrowserTranslator(text, source as BING_LIST, target as BING_LIST, !!raw)
                break
            case 'sogou':
            case 'sogou_browser':
                result.content = await SogouBrowserTranslator(text, source as SOGOU_LIST, target as SOGOU_LIST, !!raw)
                break
            case 'sogou':
            case 'sogou_browser':
                result.content = await YandexBrowserTranslator(text, source as YANDEX_LIST, target as YANDEX_LIST, !!raw)
                break
        }
    } catch (e) {
        result.message = String(e)
    }
    return result
}

export default Translator
