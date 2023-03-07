import { BaiduLanguagePredict, BaiduTranslator } from "./src/source/baidu.mjs"
import { DeepL } from "./src/source/deepl.mjs"
import { GoogleTranslate, GoogleBrowserTranslate } from "./src/source/google.mjs"
import { MicrosoftTranslator, MicrosoftBrowserTranslator } from "./src/source/microsoft.mjs"
import { SogouBrowserTranslator } from "./src/source/sogou.mjs"
import { YandexDetect, YandexBrowserTranslator } from "./src/source/yandex.mjs"

import { IsChs, IsCht } from "./src/misc.mjs"

const Translator = async (text = '', target = 'en', platform = 'google', raw = false) => {
    let result = {content: '', message: ''}
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleBrowserTranslate(text, target, raw)
                break
            case 'microsoft':
                result.content = await MicrosoftBrowserTranslator(text, target, raw)
                break
            case 'sogou':
                result.content = await SogouBrowserTranslator(text, target, raw)
                break
            case 'yandex':
                result.content = await YandexBrowserTranslator(text, target, raw)
                break
            case 'baidu':
                result.content = await BaiduTranslator(text, target, raw)
                break
            case 'deepl':
                result.content = await DeepL(text, target, raw)
        }
    } catch (e) {
        result.message = e.toString()
    }
    return result
}



export { Translator, BaiduLanguagePredict, YandexDetect, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexBrowserTranslator, IsChs, IsCht }
