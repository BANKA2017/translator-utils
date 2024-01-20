import type { TTSModuleFunction, TranslatorModuleFunction } from '../types.js'
import { SupportedLanguage, buffer_to_base64 } from '../misc.js'
import axiosFetch from 'translator-utils-axios-helper'
import cryptoHandle from 'translator-utils-crypto'
import { SOGOU_LANGUAGE } from '../language.js'

const SogouBrowserTranslator: TranslatorModuleFunction<'sogou_browser'> = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #SogouTranslator ')
    }
    if (!SupportedLanguage(SOGOU_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(SOGOU_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #SogouTranslator ')
    }

    let body = JSON.stringify({
        from_lang: source,
        to_lang: target,
        trans_frag: text instanceof Array ? text.map((x) => ({ text: x })) : [{ text }]
    })
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://go.ie.sogou.com/qbpc/translate', `S-Param=${body}`)
            .then((response) => {
                if (response?.data?.data?.trans_result && response?.data?.data?.trans_result instanceof Array) {
                    resolve(raw ? response.data : response.data.data.trans_result.map((x: any) => x.trans_text).join('\n') || '')
                }
                reject(raw ? response.data : 'Invalid content #SogouTranslator ')
            })
            .catch((e) => {
                reject(raw ? e : e.toString())
            })
    })
}

const SogouTTS: TTSModuleFunction<'sogou_tts'> = async (lang = 'en', text = '', ext = {}) => {
    try {
        const encryptKeyVoice = new TextEncoder().encode('76350b1840ff9832eb6244ac6d444366')
        //const iv = Buffer.from('AAAAAAAAAAAAAAAAAAAAAA==', 'base64');
        const iv = new Uint8Array(16)

        const encipher = await cryptoHandle.subtle.importKey('raw', encryptKeyVoice, { name: 'AES-CBC', length: 256 }, false, ['encrypt'])
        const encryptedText = await cryptoHandle.subtle.encrypt(
            { name: 'AES-CBC', iv },
            encipher,
            //{"curTime":1705565100036,"text":"hi","spokenDialect":"en","rate":"0.8"}
            new TextEncoder().encode(JSON.stringify({ curTime: Date.now(), text: Array.isArray(text) ? text.join('\n') : text, spokenDialect: lang, rate: '0.8' }))
        )
        const response = await axiosFetch.get(
            'https://fanyi.sogou.com/openapi/external/getWebTTS?' +
                new URLSearchParams({
                    'S-AppId': '102356845',
                    'S-Param': buffer_to_base64(encryptedText)
                }).toString(),
            { responseType: 'arraybuffer' }
        )
        return {
            buffer: response.data,
            content_length: response.data?.byteLength || response.data?.length || 0,
            content_type: ((Array.isArray(response.headers['content-type']) ? response.headers['content-type'].join(' ') : response.headers['content-type']) || '').split(';')[0]
        }
    } catch {
        return { buffer: new Uint8Array().buffer, content_type: '', content_length: 0 }
    }
}

export { SogouBrowserTranslator, SogouTTS }
