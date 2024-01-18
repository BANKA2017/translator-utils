import { BING_LANGUAGE, SupportedLanguage } from '../misc.js'
import { TranslatorModuleFunction } from '../types.js'
import axiosFetch, { responseBuilder } from 'translator-utils-axios-helper'

const GetMicrosoftTranslatorToken = async () => {
    let response: { IG: string; token: string; key: number; message: string } = { IG: '', token: '', key: 0, message: '' }

    let page: responseBuilder
    try {
        page = await axiosFetch.get('https://www.bing.com/translator')
    } catch (e) {
        response.message = 'Unable to get translator page #MicrosoftTranslator '
        return response
    }
    if (page) {
        let _G: any | null = null,
            params_AbusePreventionHelper: any | null = null
        try {
            _G = new Function('return ' + /_G=(\{.+?\});/.exec(page.data || '')?.[1] || '{IG: ""}')()
            params_AbusePreventionHelper = new Function('return ' + /params_AbusePreventionHelper = (\[.+?\]);/.exec(page.data || '')?.[1] || '["", ""]')()
        } catch (e) {
            response.message = 'Unable to get variables #MicrosoftTranslator '
            return response
        }
        response.IG = _G.IG
        response.token = params_AbusePreventionHelper[1]
        response.key = params_AbusePreventionHelper[0]
        return response
    } else {
        response.message = 'Empty page #MicrosoftTranslator '
        return response
    }
}

const MicrosoftTranslator: TranslatorModuleFunction<'microsoft'> = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #MicrosoftTranslator ')
    }
    if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #MicrosoftTranslator ')
    }

    // get IG, token and key
    let IG = '',
        token = '',
        key = 0
    if (ext.IG && typeof ext.IG === 'string' && ext.token && typeof ext.token === 'string' && ext.key && typeof ext.key === 'number') {
        IG = ext.IG
        token = ext.token
        key = ext.key
    } else {
        const tmpMSTranslatorResponse = await GetMicrosoftTranslatorToken()
        if (tmpMSTranslatorResponse.message) {
            return Promise.reject(tmpMSTranslatorResponse.message)
        } else {
            IG = tmpMSTranslatorResponse.IG
            token = tmpMSTranslatorResponse.token
            key = tmpMSTranslatorResponse.key
        }
    }

    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post(
                'https://www.bing.com/ttranslatev3?' +
                    new URLSearchParams({
                        isVertical: '1',
                        IG,
                        IID: 'translator.5024.1'
                    }).toString(),
                new URLSearchParams({
                    fromLang: source === 'auto' ? 'auto-detect' : source,
                    text: Array.isArray(text) ? text.join('\n') : text,
                    to: target || 'en',
                    token,
                    key: key.toString()
                }).toString()
            )
            .then((response: any) => {
                if (!response.data.statusCode && response.data instanceof Array) {
                    resolve(
                        raw
                            ? response.data
                            : response.data
                                  .map((x: any) => (x?.translations || []).map((translation: any) => translation?.text || ''))
                                  .flat()
                                  .join('\n')
                    )
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ')
            })
            .catch((e) => {
                reject(raw ? e : e.toString())
            })
    })
}

const GetMicrosoftBrowserTranslatorAuth = async () => {
    try {
        return (await axiosFetch.get('https://edge.microsoft.com/translate/auth')).data
    } catch (e) {
        return ''
    }
}

type MicrosoftBrowserPredictResponseType = {
    isTranslationSupported: boolean
    isTransliterationSupported: boolean
    language: string
    score: number
}

const MicrosoftBrowserPredict = async (text: string | string[] = '', jwt = ''): Promise<MicrosoftBrowserPredictResponseType[]> => {
    if (!text || !jwt) {
        return []
    }

    let content = []

    if (!Array.isArray(text)) {
        content.push({ Text: text })
    } else {
        content.push(...text.map((x) => ({ Text: x })))
    }
    try {
        const languageResult = await axiosFetch.post('https://api.cognitive.microsofttranslator.com/detect?api-version=3.0', JSON.stringify(content), { headers: { authorization: jwt, 'content-type': 'application/json' } })
        if (!languageResult.data?.error && Array.isArray(languageResult.data)) {
            return languageResult.data
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}

const MicrosoftBrowserTranslator: TranslatorModuleFunction<'microsoft_browser'> = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #MicrosoftTranslator ')
    }
    if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #MicrosoftTranslator ')
    }

    //get jwt
    let jwt = ''
    if (ext.jwt && typeof ext.jwt === 'string') {
        jwt = ext.jwt
    } else {
        jwt = await GetMicrosoftBrowserTranslatorAuth()
    }
    if (jwt) {
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .post(
                    `https://api.cognitive.microsofttranslator.com/translate?from=${source === 'auto' ? '' : source}&to=${target}&api-version=3.0&includeSentenceLength=true`,
                    JSON.stringify(text instanceof Array ? text.map((tmpText) => ({ Text: tmpText })) : [{ Text: text }]),
                    {
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${jwt}`
                        }
                    }
                )
                .then((response: any) => {
                    if (response.data && response.data instanceof Array) {
                        resolve(raw ? response.data : response.data.map((x: any) => (x?.translations || [])?.[0]?.text || '').join('\n'))
                    }
                    reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ')
                })
                .catch((e) => {
                    reject(raw ? e : e.toString())
                })
        })
    } else {
        return Promise.reject('Invalid jwt #MicrosoftTranslator ')
    }
}

export type { MicrosoftBrowserPredictResponseType }
export { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth, MicrosoftBrowserPredict, GetMicrosoftTranslatorToken }
