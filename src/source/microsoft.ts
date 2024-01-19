import type { TTSModuleFunction, TranslatorModuleFunction } from '../types.js'

import { SupportedLanguage } from '../misc.js'
import axiosFetch, { responseBuilder } from 'translator-utils-axios-helper'
import { MICROSOFT_TTS_LIST, BING_LANGUAGE } from '../language.js'

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

const MicrosoftTTS: TTSModuleFunction<'microsoft_tts'> = async (lang = 'en', text = '', ext = {}) => {
    try {
        // get IG, token and key
        let IG = '',
            token = '',
            key = 0
        if (ext.IG && typeof ext.IG === 'string' && ext.token && typeof ext.token === 'string' && ext.key && typeof ext.key === 'number') {
            IG = ext.IG
            token = ext.token
            key = ext.key
        }
        // find model
        const modelInfo = MICROSOFT_TTS_LIST.find((msTTSItem) => msTTSItem.code === lang.toLocaleLowerCase())
        if (modelInfo) {
            const response = await axiosFetch.post(
                'https://www.bing.com/tfettts?' +
                    new URLSearchParams({
                        isVertical: '1',
                        IG,
                        IID: 'translator.5023.2'
                    }).toString(),
                new URLSearchParams({
                    ssml: `<speak version='1.0' xml:lang='${modelInfo.language}'><voice xml:lang='${modelInfo.language}' xml:gender='${modelInfo.gender}' name='${modelInfo.model}'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
                    token,
                    key: key.toString()
                }).toString(),
                { responseType: 'arraybuffer' }
            )
            return {
                buffer: response.data,
                content_length: response.data?.byteLength || response.data?.length || 0,
                content_type: ((Array.isArray(response.headers['content-type']) ? response.headers['content-type'].join(' ') : response.headers['content-type']) || '').split(';')[0]
            }
        } else {
            return { buffer: new Uint8Array().buffer, content_type: '', content_length: 0 }
        }
    } catch {
        return { buffer: new Uint8Array().buffer, content_type: '', content_length: 0 }
    }
}

export type { MicrosoftBrowserPredictResponseType }
export { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth, MicrosoftBrowserPredict, GetMicrosoftTranslatorToken, MicrosoftTTS }
