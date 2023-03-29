import { SupportedLanguage } from '../misc.js';
import axiosFetch from 'translator-utils-axios-helper';
const MicrosoftTranslator = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #MicrosoftTranslator ');
    }
    if (!SupportedLanguage('microsoft', target || 'en')) {
        return await Promise.reject('Not supported target language #MicrosoftTranslator ');
    }
    //get IG, token, key
    //TODO fix type 
    let page = '';
    try {
        page = await axiosFetch.get('https://www.bing.com/translator');
    }
    catch (e) {
        return await Promise.reject('Unable to get translator page #MicrosoftTranslator ');
    }
    if (page) {
        let _G = null, params_AbusePreventionHelper = null;
        try {
            _G = (new Function('return ' + /_G=(\{.+?\});/.exec(page.data || '')?.[1] || '{IG: ""}'))();
            params_AbusePreventionHelper = (new Function('return ' + /params_AbusePreventionHelper = (\[.+?\]);/.exec(page.data || '')?.[1] || '["", ""]'))();
        }
        catch (e) {
            return await Promise.reject('Unable to get variables #MicrosoftTranslator ');
        }
        return await new Promise(async (resolve, reject) => {
            axiosFetch.post('https://www.bing.com/ttranslatev3?' + (new URLSearchParams({
                isVertical: '1',
                IG: _G.IG,
                IID: 'translator.5024.1'
            })).toString(), (new URLSearchParams({
                fromLang: 'auto-detect',
                text: Array.isArray(text) ? text.join("\n") : text,
                to: (target || 'en'),
                token: params_AbusePreventionHelper[1],
                key: params_AbusePreventionHelper[0]
            })).toString()).then((response) => {
                if (!response.data.statusCode && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x) => (x?.translations || []).map((translation) => translation?.text || '')).flat().join("\n"));
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ');
            }).catch(e => {
                reject(raw ? e : e.toString());
            });
        });
    }
    else {
        return await Promise.reject('Empty page #MicrosoftTranslator ');
    }
};
const GetMicrosoftBrowserTranslatorAuth = async () => {
    try {
        return (await axiosFetch.get('https://edge.microsoft.com/translate/auth')).data;
    }
    catch (e) {
        return '';
    }
};
const MicrosoftBrowserTranslator = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #MicrosoftTranslator ');
    }
    if (!SupportedLanguage('microsoft', target || 'en')) {
        return await Promise.reject('Not supported target language #MicrosoftTranslator ');
    }
    //get jwt
    const jwt = await GetMicrosoftBrowserTranslatorAuth();
    if (jwt) {
        return await new Promise(async (resolve, reject) => {
            axiosFetch.post(`https://api.cognitive.microsofttranslator.com/translate?from=&to=${target}&api-version=3.0&includeSentenceLength=true`, JSON.stringify(text instanceof Array ? text.map(tmpText => ({ Text: tmpText })) : [{ Text: text }]), {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${jwt}`
                }
            }).then((response) => {
                if (response.data && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x) => (x?.translations || [])?.[0]?.text || '').join("\n"));
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ');
            }).catch(e => {
                reject(raw ? e : e.toString());
            });
        });
    }
    else {
        return await Promise.reject('Invalid jwt #MicrosoftTranslator ');
    }
};
export { MicrosoftTranslator, MicrosoftBrowserTranslator, GetMicrosoftBrowserTranslatorAuth };
