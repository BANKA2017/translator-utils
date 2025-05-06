import type { TranslatorModuleFunction, TTSModuleFunction, TTSResponse } from '../types.js'

import { concatBuffer, generateUUID, htmlentities, SupportedLanguage } from '../misc.js'
import axiosFetch, { responseBuilder } from 'translator-utils-axios-helper'
import { BING_LANGUAGE, MICROSOFT_TTS_LIST } from '../language.js'
import { WebSocket } from 'unws'

const GetMicrosoftTranslatorToken = async () => {
    let response: { IG: string; token: string; key: number; message: string } = {
        IG: '',
        token: '',
        key: 0,
        message: ''
    }

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
        const languageResult = await axiosFetch.post('https://api.cognitive.microsofttranslator.com/detect?api-version=3.0', content, { headers: { authorization: jwt } })
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
                    text instanceof Array ? text.map((tmpText) => ({ Text: tmpText })) : [{ Text: text }],
                    {
                        headers: {
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

const MicrosoftBrowserTranslatorV2: TranslatorModuleFunction<'microsoft_browser'> = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #MicrosoftTranslatorV2 ')
    }
    if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #MicrosoftTranslatorV2 ')
    }

    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post(`https://edge.microsoft.com/translate/translatetext?from=${source === 'auto' ? '' : source}&to=${target}`, text instanceof Array ? text : [text])
            .then((response: any) => {
                if (response.data && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x: any) => (x?.translations || [])?.[0]?.text || '').join('\n'))
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslatorV2 ')
            })
            .catch((e) => {
                reject(raw ? e : e.toString())
            })
    })
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
            return {
                buffer: new Uint8Array().buffer,
                content_type: '',
                content_length: 0
            }
        }
    } catch {
        return {
            buffer: new Uint8Array().buffer,
            content_type: '',
            content_length: 0
        }
    }
}

//const MicrosoftBrowserTTSList = async () => {
//    const response = await axiosFetch.get('https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4')
//    return response.data
//}

const MicrosoftBrowserTTS: TTSModuleFunction<'microsoft_edge_tts'> = async (lang = 'en-US', text = '', ext = {}) => {
    const requestID = generateUUID().replaceAll('-', '')
    // edge default `webm-24khz-16bit-mono-opus`
    const outputFormat = ext?.optput_format ? ext?.optput_format : 'audio-24khz-48kbitrate-mono-mp3'
    const voice = ext.voice ? ext.voice : 'en-US-AriaNeural'

    const ws = new WebSocket('wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4')

    return new Promise((resolve, reject) => {
        let response: TTSResponse = {
            buffer: new Uint8Array().buffer,
            content_type: '',
            content_length: 0,
            ext: {}
        }
        const responseContent: { header: { [p in string]: string }; body: string | Uint8Array; type: string }[] = []

        ws.addEventListener('message', async (event) => {
            try {
                if (typeof event.data === 'string') {
                    // split header and body
                    const [header, body] = event?.data?.split('\r\n\r\n')
                    const tmpContent = {
                        header: Object.fromEntries(
                            header.split('\r\n').map((header_) => {
                                const tmpHeaderContent = header_.split(':')
                                return [tmpHeaderContent.shift(), tmpHeaderContent.join('')]
                            })
                        ),
                        body,
                        type: 'text'
                    }
                    responseContent.push(tmpContent)
                    if (tmpContent.header.Path === 'turn.end') {
                        ws.close()
                    }
                } else if ((typeof Buffer !== 'undefined' && event.data instanceof Buffer) || (typeof Blob !== 'undefined' && event.data instanceof Blob)) {
                    let buffer = new Uint8Array()
                    // browser
                    //@ts-ignore
                    if (event.data?.arrayBuffer) {
                        //@ts-ignore
                        buffer = new Uint8Array(await event.data.arrayBuffer())
                    } else if (typeof Buffer !== 'undefined' && event.data instanceof Buffer) {
                        // binary from npm:ws
                        buffer = new Uint8Array(event.data)
                    }
                    // header length
                    const headerLength = new DataView(buffer.slice(0, 2).buffer).getUint16(0)
                    const tmpContent = {
                        header: Object.fromEntries(
                            new TextDecoder()
                                .decode(buffer.slice(2, headerLength + 2))
                                .split('\r\n')
                                .map((header_) => {
                                    const tmpHeaderContent = header_.split(':')
                                    return [tmpHeaderContent.shift(), tmpHeaderContent.join('')]
                                })
                        ),
                        body: buffer.slice(headerLength + 2),
                        type: 'audio'
                    }
                    if (response.content_type === '') {
                        response.content_type = tmpContent.header['Content-Type']
                    }
                    responseContent.push(tmpContent)
                }
            } catch (e) {
                console.error(e)
                reject(response)
            }
        })
        ws.addEventListener('close', () => {
            if (response.ext) {
                response.ext.raw = responseContent
            }
            response.buffer = concatBuffer(...responseContent.filter((x) => x.type === 'audio').map((x) => (typeof x.body !== 'string' ? (x.body.buffer as ArrayBuffer) : new ArrayBuffer(0))))
            response.content_length = response.buffer.byteLength
            resolve(response)
        })
        ws.addEventListener('open', () => {
            if (Array.isArray(text)) {
                text = text.join('\n')
            }
            ws.send(
                encodeMSBrowserTTSRequest(
                    {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-Timestamp': new Date().toString(),
                        Path: 'speech.config'
                    },
                    JSON.stringify({
                        context: {
                            synthesis: {
                                audio: {
                                    metadataoptions: {
                                        sentenceBoundaryEnabled: 'false',
                                        wordBoundaryEnabled: 'true'
                                    },
                                    outputFormat
                                }
                            }
                        }
                    })
                )
            )
            ws.send(
                encodeMSBrowserTTSRequest(
                    {
                        'X-RequestId': requestID,
                        'Content-Type': 'application/ssml+xml',
                        'X-Timestamp': new Date().toString() + 'Z', // I don't know why they add a 'Z' at the end
                        Path: 'ssml'
                    },
                    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis'  xml:lang='${lang}'><voice name='${voice}'><prosody pitch='+0Hz' rate ='+0%' volume='+0%'>${htmlentities(text)}</prosody></voice></speak>`
                )
            )
        })
    })
}

const encodeMSBrowserTTSRequest = (headers = {}, body = '') => {
    let content = Object.entries(headers)
        .map((header) => `${header[0]}:${header[1]}`)
        .join('\r\n')
    content += '\r\n\r\n'
    content += body
    return content
}

export type { MicrosoftBrowserPredictResponseType }
export { GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, MicrosoftBrowserPredict, MicrosoftBrowserTranslator, MicrosoftBrowserTranslatorV2, MicrosoftTranslator }
export { MicrosoftBrowserTTS, MicrosoftTTS }
