import { DeepL } from './source/deepl.js'
import { GoogleTranslate, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTTS, GoogleTranslateTk } from './source/google.js'
import { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, MicrosoftBrowserPredict, MicrosoftTTS, MicrosoftBrowserTTS } from './source/microsoft.js'
import { SogouBrowserTranslator, SogouTTS } from './source/sogou.js'
import { YandexDetect, YandexTranslator, YandexBrowserTranslator } from './source/yandex.js'

import { IsChs, IsCht } from './misc.js'
import type { TranslatorFunction } from './types.js'
import type { BING_LIST, DEEPL_LIST, GOOGLE_LIST, SOGOU_LIST, YANDEX_LIST } from './language.js'

const Translator: TranslatorFunction = async (text = '', platform, source, target, raw, ext = {}) => {
    let result = { content: '', message: '' }
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleTranslate(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw, ext)
                break
            case 'google_browser':
                result.content = await GoogleBrowserTranslate(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw, ext)
                break
            case 'google_browser_v2':
                result.content = await GoogleBrowserTranslateV2(text, source as GOOGLE_LIST, target as GOOGLE_LIST, !!raw, ext)
                break
            case 'microsoft':
                result.content = await MicrosoftTranslator(text, source as BING_LIST, target as BING_LIST, !!raw, ext)
                break
            case 'microsoft_browser':
                result.content = await MicrosoftBrowserTranslator(text, source as BING_LIST, target as BING_LIST, !!raw, ext)
                break
            case 'sogou':
            case 'sogou_browser':
                result.content = await SogouBrowserTranslator(text, source as SOGOU_LIST, target as SOGOU_LIST, !!raw, ext)
                break
            case 'yandex':
                result.content = await YandexTranslator(text, source as YANDEX_LIST, target as YANDEX_LIST, !!raw, ext)
                break
            case 'yandex_browser':
                result.content = await YandexBrowserTranslator(text, source as YANDEX_LIST, target as YANDEX_LIST, !!raw, ext)
                break
            case 'deepl':
                result.content = await DeepL(text, source as DEEPL_LIST, target as DEEPL_LIST, !!raw, ext)
                break
        }
    } catch (e) {
        result.message = String(e)
    }
    return result
}

export { YandexDetect, MicrosoftBrowserPredict, DeepL, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexTranslator, YandexBrowserTranslator }
export { GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken }
export { GoogleTranslateTk }
export { IsChs, IsCht }
export { GoogleTTS, MicrosoftTTS, MicrosoftBrowserTTS, SogouTTS }
export default Translator
