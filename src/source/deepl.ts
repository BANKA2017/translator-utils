import { TranslatorModuleFunction } from '../types.js'
import { SupportedLanguage } from '../misc.js'
import axiosFetch from 'translator-utils-axios-helper'

const getId = async () => {
    if (typeof process !== 'undefined') {
        //nodejs
        const {webcrypto} = await import('crypto')
        return webcrypto.getRandomValues(new Uint32Array(1))[0]
    } else if (typeof window !== 'undefined') {
        //browser
        return crypto.getRandomValues(new Uint32Array(1))[0]
    } else {
        return 0
    }

}

const DeepL: TranslatorModuleFunction<'deepl'> = async (text: string | string[] = '', target, raw) => {
    if (!text) {return await Promise.reject('Empty text #DeepL ')}
    if (!SupportedLanguage('deepl', target || 'en')) {return await Promise.reject('Not supported target language #DeepL ')}

    //{"jsonrpc":"2.0","method": "LMT_handle_texts","params":{"texts":[{"text":"[Schoolgirl Strikers: Animation Channel]"}],"splitting":"newlines","lang":{"target_lang":"ZH","source_lang_user_selected":"auto","preference":{"weight":{}}},"timestamp":0},"id":0}
    const realTimeStamp = Number(new Date())
    const i_count = (text instanceof Array ? text.join('') : text).split('i').length
    const id = await getId()// + 1

    const postBody = JSON.stringify({
        jsonrpc: "2.0",
        method: "LMT_handle_texts",
        params: {
            texts: (text instanceof Array) ? text.map(x => ({text: x})) : [{text}],
            lang: {
                target_lang: (target || 'en').toUpperCase(),
                source_lang_user_selected: "auto",
            },
            timestamp: realTimeStamp - realTimeStamp % i_count + i_count
        },
        id
    }).replace("\"method\":\"", (((id + 3) % 13 === 0) || ((id + 5) % 29 === 0)) ? "\"method\" : \"" : "\"method\": \"")
    
    return await new Promise(async (resolve, reject) => {
        axiosFetch.post('https://www2.deepl.com/jsonrpc?client=chrome-extension,1.1.1', postBody, {
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        }).then(response => {
            resolve(raw ? response.data : response.data.result.texts.map((x: any) => x.text).join("\n"))
        }).catch(e => {
            reject(raw ? e : e.toString())
        })
    })
}

export { DeepL }
