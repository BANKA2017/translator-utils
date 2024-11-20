import { WATSON_LANGUAGE } from 'language.js'
import { SupportedLanguage } from '../misc.js'
import axiosFetch from 'translator-utils-axios-helper'
import type { TranslatorModuleFunction } from '../types.js'

const WatsonDetect = async (text: string | string[] = ''): Promise<string | '_'> => {
    if (!text) {
        return '_'
    }
    if (Array.isArray(text)) {
        text = text.join('\n')
    }
    try {
        const languageResult = await axiosFetch.post('https://www.ibm.com/demos/live/watson-language-translator/api/translate/detect', {
            text
        })
        if (languageResult.data?.status === 'success') {
            return languageResult.data?.payload?.languages?.[0]?.language?.language || '_'
        } else {
            return '_'
        }
    } catch (e) {
        return '_'
    }
}

const WatsonTranslator: TranslatorModuleFunction<'watson'> = async (text = '', source = 'en', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #WatsonTranslate ')
    }
    if (source === 'auto' || !SupportedLanguage(WATSON_LANGUAGE, target || 'en') || !SupportedLanguage(WATSON_LANGUAGE, source || 'en')) {
        return Promise.reject('Unsupported target language #WatsonTranslate ')
    }
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://www.ibm.com/demos/live/watson-language-translator/api/translate/text', {
                source,
                target,
                text: Array.isArray(text) ? text.join('\n') : text
            })
            .then((response: any) => {
                if (response.data && response.data?.status === 'success' && response.data?.payload?.translations instanceof Array) {
                    resolve(raw ? response.data : response.data.payload.translations.map((x: any) => x?.translation || '').join('\n'))
                }
                reject(raw ? response.data : 'Invalid content #WatsonTranslate ')
            })
            .catch((e) => {
                reject(raw ? e : e.toString())
            })
    })
}

export { WatsonDetect, WatsonTranslator }
