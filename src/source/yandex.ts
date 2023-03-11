import { TranslatorModuleFunction } from '../types.js'
import { SupportedLanguage } from '../misc.js'
import axios from 'axios'
import axiosConfig from '../axios.config.js'

//from yandex browser
const generateSid = async () => {
    if (typeof process !== 'undefined') {
        const {webcrypto} = await import('crypto')
        return webcrypto.randomUUID().replaceAll('-', '')
    } else if (typeof window !== 'undefined') {
        return crypto.randomUUID().replaceAll('-', '')
    } else {
        return ''
    }
}

const YandexDetect = async (text: string | string[] = ''): Promise<string | '_'> => {
    if (!text) {return '_'}
    if (Array.isArray(text)) {
        text = text.join("\n")
    }
    try {
        const languageResult = await axios.get('https://translate.yandex.net/api/v1/tr.json/detect?' + (new URLSearchParams({
            sid: await generateSid(),
            srv: 'android',// or 'ios'
            text,
            //hint: 'en,zh'
        })).toString(), await axiosConfig())
        if (languageResult.data?.code === 200 && languageResult.data?.lang) {
            return languageResult.data?.lang || '_'
        } else {
            return '_'
        }
    } catch (e) {
        return '_'
    }
}


const YandexBrowserTranslator: TranslatorModuleFunction<'yandex'> = async (text: string | string[] = '', target, raw) => {
    if (!text) {return await Promise.reject('Empty text #YandexTranslator ')}
    if (!SupportedLanguage('yandex', target || 'en')) {return await Promise.reject('Not supported target language #YandexTranslator ')}

    const lang = await YandexDetect((Array.isArray(text) ? text.join(' ') : text).replaceAll(/<a id=\d><><\/a>/gm, ''))

    if (lang === '_') {
        return await Promise.reject('Not supported source language #YandexTranslator ')
    }

    let query = new URLSearchParams({
        translateMode: 'context',
        context_title: 'Twitter Monitor Translator',
        id: `${await generateSid()}-0-0`,
        srv: 'yabrowser',
        lang: `${lang}-${target}`,
        format: 'html',
        options: '2'
    })
    return await new Promise(async (resolve, reject) => {
        axios.get('https://browser.translate.yandex.net/api/v1/tr.json/translate?' + query.toString() + '&text=' + ((text instanceof Array) ? text.map(x => encodeURIComponent(x)).join('&text=') : encodeURIComponent(text)), await axiosConfig()).then(response => {
            if (response?.data?.text && response?.data?.text instanceof Array) {
                resolve(raw ? response.data : response.data.text.join("\n"))
            }
            reject(raw ? response.data : 'Invalid content #YandexTranslator ')
        }).catch(e => {
            reject(raw ? e : e.toString())
        })
    })
}

export {YandexDetect, YandexBrowserTranslator}
