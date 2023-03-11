import { GoogleBrowserTranslate } from "./source/google.js"
import { MicrosoftBrowserTranslator } from "./source/microsoft.js"
import { SogouBrowserTranslator } from "./source/sogou.js"

import { BING_LIST, GOOGLE_LIST, SOGOU_LIST, TranslatorFunction } from "types.js"

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
        }
    } catch (e) {
        result.message = String(e)
    }
    return result
}

export default Translator
