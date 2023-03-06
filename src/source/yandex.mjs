import axiosFetch from '../axios.mjs'
import { SupportedLanguage } from '../utils.mjs'

//from yandex browser
const generateSid = () => {
    var t, e, n = Date.now().toString(16)
    for (t = 0, e = 16 - n.length; t < e; t++) {
        n += Math.floor(16 * Math.random()).toString(16)
    }
    return n
}

const YandexDetect = async (text = '') => {
    if (!text) {return '_'}
    try {
        const languageResult = await axiosFetch.get('https://translate.yandex.net/api/v1/tr.json/detect?' + (new URLSearchParams({
            sid: generateSid(),
            srv: 'android',// or 'ios'
            text,
            //hint: 'en,zh'
        })).toString())
        if (languageResult.data?.code === 200 && languageResult.data?.lang) {
            return languageResult.data?.lang
        } else {
            return '_'
        }
    } catch (e) {
        return '_'
    }
}


const YandexBrowserTranslator = async (text = '', target = 'en', raw = false) => {
    if (!text) {return await Promise.reject('Empty text #YandexTranslator ')}
    if (!SupportedLanguage('yandex', target)) {return await Promise.reject('Not supported target language #YandexTranslator ')}

    const lang = await YandexDetect((Array.isArray(text) ? text.join(' ') : text).replaceAll(/<a id=\d><><\/a>/gm, ''))

    if (lang === '_') {
        return await Promise.reject('Not supported source language #YandexTranslator ')
    }

    let query = new URLSearchParams({
        translateMode: 'context',
        context_title: 'Twitter Monitor Translator',
        id: `${generateSid()}-0-0`,
        srv: 'yabrowser',
        lang: `${lang}-${target}`,
        format: 'html',
        options: 2
    })
    return await new Promise((resolve, reject) => {
        axiosFetch.get('https://browser.translate.yandex.net/api/v1/tr.json/translate?' + query.toString() + '&text=' + ((text instanceof Array) ? text.map(x => encodeURIComponent(x)).join('&text=') : encodeURIComponent(text))).then(response => {
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
