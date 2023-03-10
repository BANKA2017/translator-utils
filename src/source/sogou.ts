import { TranslatorModuleFunction } from '../types.js'
import { SupportedLanguage } from '../misc.js'
import axios from 'axios'
import axiosConfig from '../axios.config.js'

const SogouBrowserTranslator: TranslatorModuleFunction<'sogou'> = async (text = '', target, raw) => {
    if (!text) {return await Promise.reject('Empty text #SogouTranslator ')}
    if (!SupportedLanguage('sogou', target || 'en')) {return await Promise.reject('Not supported target language #SogouTranslator ')}

    let body = JSON.stringify({
        from_lang: "auto",
        to_lang: target,
        trans_frag: text instanceof Array ? text.map(x => ({text: x})) : [{text}]
    })
    return await new Promise(async (resolve, reject) => {
        axios.post('https://go.ie.sogou.com/qbpc/translate', `S-Param=${body}`, await axiosConfig()).then(response => {
            if (response?.data?.data?.trans_result && response?.data?.data?.trans_result instanceof Array) {
                resolve(raw ? response.data : (response.data.data.trans_result.map((x: any) => x.trans_text).join("\n") || ''))
            }
            reject(raw ? response.data : 'Invalid content #SogouTranslator ')
        }).catch(e => {
            reject(raw ? e : e.toString())
        })
    })
}

export {SogouBrowserTranslator}
