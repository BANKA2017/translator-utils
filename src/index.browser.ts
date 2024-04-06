import { YandexBrowserTranslator } from './source/yandex.js'
import { GoogleBrowserTranslate, GoogleBrowserTranslateV2 } from './source/google.js'
import { MicrosoftBrowserTranslator } from './source/microsoft.js'
import { SogouBrowserTranslator } from './source/sogou.js'

import type { TranslatorFunction } from 'types.js'
import type { BING_LIST, GOOGLE_LIST, SOGOU_LIST, YANDEX_LIST } from 'language.js'

const Translator: TranslatorFunction = async (text = '', platform, source, target, raw, ext = {}) => {
    let result = { content: '', message: '' }
    try {
        switch (platform) {
            case 'google':
            case 'google_browser':
                result.content = await GoogleBrowserTranslate(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw, ext)
                break
            case 'google_browser_v2':
                result.content = await GoogleBrowserTranslateV2(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw, ext)
                break
            case 'microsoft':
            case 'microsoft_browser':
                result.content = await MicrosoftBrowserTranslator(text, source as BING_LIST, target as BING_LIST, !!raw, ext)
                break
            case 'sogou':
            case 'sogou_browser':
                result.content = await SogouBrowserTranslator(text, source as SOGOU_LIST, target as SOGOU_LIST, !!raw, ext)
                break
            case 'yandex':
            case 'yandex_browser':
                result.content = await YandexBrowserTranslator(text, source as YANDEX_LIST, target as YANDEX_LIST, !!raw, ext)
                break
        }
    } catch (e) {
        result.message = String(e)
    }
    return result
}

export default Translator
