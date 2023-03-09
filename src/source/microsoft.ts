import axios, { AxiosResponse } from 'axios'
import { SupportedLanguage } from '../misc.js'
import { TranslatorModuleFunction } from 'types.js'
import axiosConfig from '../axios.js'

const MicrosoftTranslator: TranslatorModuleFunction = async (text = '', target = 'en', raw) => {
    if (!text) {return await Promise.reject('Empty text #MicrosoftTranslator ')}
    if (!SupportedLanguage('microsoft', target)) {return await Promise.reject('Not supported target language #MicrosoftTranslator ')}

    //get IG, token, key
    let page: AxiosResponse | '' = ''
    try {
        page = await axios.get('https://www.bing.com/translator', await axiosConfig())
    } catch (e) {
        return await Promise.reject('Unable to get translator page #MicrosoftTranslator ')
    }
    if (page) {
        let _G: any | null = null, params_AbusePreventionHelper: any | null = null
        try {
            _G = (new Function('return ' + /_G=(\{.+?\});/.exec(page.data || '')?.[1] || '{IG: ""}'))()
            params_AbusePreventionHelper = (new Function('return ' + /params_AbusePreventionHelper = (\[.+?\]);/.exec(page.data || '')?.[1] || '["", ""]'))()
        } catch(e) {
            return await Promise.reject('Unable to get variables #MicrosoftTranslator ')
        }
        return await new Promise(async (resolve, reject) => {
            axios.post('https://www.bing.com/ttranslatev3?' + (new URLSearchParams({
                isVertical: '1',
                IG: _G.IG,
                IID: 'translator.5024.1'
            })).toString(), (new URLSearchParams({
                fromLang: 'auto-detect',
                text: Array.isArray(text) ? text.join("\n") : text,
                to: target,
                token: params_AbusePreventionHelper[1],
                key: params_AbusePreventionHelper[0]
            })).toString(), await axiosConfig()).then((response: any) => {
                if (!response.data.statusCode && response.data instanceof Array ) {
                    resolve(raw ? response.data : response.data.map((x: any) => (x?.translations || []).map((translation: any) => translation?.text || '')).flat().join("\n"))
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ')
            }).catch(e => {
                reject(raw ? e : e.toString())
            })
        })
    } else {
        return await Promise.reject('Empty page #MicrosoftTranslator ')
    }
}

const GetMicrosoftBrowserTranslatorAuth = async () => {
    try {
        return (await axios.get('https://edge.microsoft.com/translate/auth', await axiosConfig())).data
    } catch (e) {
        return ''
    }
}

const MicrosoftBrowserTranslator: TranslatorModuleFunction = async (text = '', target = 'en', raw) => {
    if (!text) {return await Promise.reject('Empty text #MicrosoftTranslator ')}
    if (!SupportedLanguage('microsoft', target)) {return await Promise.reject('Not supported target language #MicrosoftTranslator ')}

    //get jwt
    const jwt = await GetMicrosoftBrowserTranslatorAuth()
    if (jwt) {
        return await new Promise(async (resolve, reject) => {
            axios.post(`https://api.cognitive.microsofttranslator.com/translate?from=&to=${target}&api-version=3.0&includeSentenceLength=true`, JSON.stringify(text instanceof Array ? text.map(tmpText => ({Text: tmpText})) : [{Text: text}]), await axiosConfig({
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${jwt}`
                }
            })).then((response: any) => {
                if (response.data && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x: any) => (x?.translations || [])?.[0]?.text || '').join("\n"))
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ')
            }).catch(e => {
                reject(raw ? e : e.toString())
            })
        })
    } else {
        return await Promise.reject('Invalid jwt #MicrosoftTranslator ')
    }
    
}

export { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth }
