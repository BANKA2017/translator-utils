import { BING_LANGUAGE, SupportedLanguage } from '../misc.js'
import { TranslatorModuleFunction } from '../types.js'
import axiosFetch from 'translator-utils-axios-helper'

const MicrosoftTranslator: TranslatorModuleFunction<"microsoft"> = async (text = '', source = 'auto', target, raw) => {
    if (!text) {return await Promise.reject('Empty text #MicrosoftTranslator ')}
    if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {return await Promise.reject('Not supported target language #MicrosoftTranslator ')}

    //get IG, token, key
    //TODO fix type 
    let page: any | '' = ''
    try {
        page = await axiosFetch.get('https://www.bing.com/translator')
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
            axiosFetch.post('https://www.bing.com/ttranslatev3?' + (new URLSearchParams({
                isVertical: '1',
                IG: _G.IG,
                IID: 'translator.5024.1'
            })).toString(), (new URLSearchParams({
                fromLang: source === 'auto' ? 'auto-detect' : source,
                text: Array.isArray(text) ? text.join("\n") : text,
                to: (target || 'en'),
                token: params_AbusePreventionHelper[1],
                key: params_AbusePreventionHelper[0]
            })).toString()).then((response: any) => {
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
        return (await axiosFetch.get('https://edge.microsoft.com/translate/auth')).data
    } catch (e) {
        return ''
    }
}

const MicrosoftBrowserTranslator: TranslatorModuleFunction<"microsoft_browser"> = async (text = '', source = 'auto', target, raw) => {
    if (!text) {return await Promise.reject('Empty text #MicrosoftTranslator ')}
    if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {return await Promise.reject('Not supported target language #MicrosoftTranslator ')}

    //get jwt
    const jwt = await GetMicrosoftBrowserTranslatorAuth()
    if (jwt) {
        return await new Promise(async (resolve, reject) => {
            axiosFetch.post(`https://api.cognitive.microsofttranslator.com/translate?from=${source === 'auto' ? '' : source}&to=${target}&api-version=3.0&includeSentenceLength=true`, JSON.stringify(text instanceof Array ? text.map(tmpText => ({Text: tmpText})) : [{Text: text}]), {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${jwt}`
                }
            }).then((response: any) => {
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
