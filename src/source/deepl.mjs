import axiosFetch from '../axios.mjs'
import { SupportedLanguage } from '../utils.mjs'

const getId = async () => {
    if (typeof process !== 'undefined') {
        //nodejs
        const {webcrypto} = await import('node:crypto')
        return webcrypto.getRandomValues(new Uint32Array(1))[0]
    } else if (typeof window !== 'undefined') {
        //browser
        return crypto.getRandomValues(new Uint32Array(1))[0]
    } else {
        return ''
    }

}

const DeepL = async (text = '', target = 'en') => {
    if (!text) {return await Promise.reject('Empty text #DeepL ')}
    if (!SupportedLanguage('deepl', target)) {return await Promise.reject('Not supported target language #DeepL ')}


    if (/^zh(_|\-|$)/.test(target.toLowerCase())) {
        target = 'zh'
    }
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
                target_lang: target.toUpperCase(),
                source_lang_user_selected: "auto",
            },
            timestamp: realTimeStamp - realTimeStamp % i_count + i_count
        },
        id
    }).replace("\"method\":\"", (((id + 3) % 13 === 0) || ((id + 5) % 29 === 0)) ? "\"method\" : \"" : "\"method\": \"")
    
    return await new Promise((resolve, reject) => {
        axiosFetch.post('https://www2.deepl.com/jsonrpc?client=chrome-extension,1.1.1', postBody, {
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        }).then(response => {
            resolve(response.data)
        }).catch(e => {
            reject(e)
        })
    })
}

export {DeepL}
