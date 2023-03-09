import axiosFetch from '../axios.js';
import { SupportedLanguage } from '../misc.js';
const SogouBrowserTranslator = async (text = '', target = 'en', raw = false) => {
    if (!text) {
        return await Promise.reject('Empty text #SogouTranslator ');
    }
    if (!SupportedLanguage('sogou', target)) {
        return await Promise.reject('Not supported target language #SogouTranslator ');
    }
    let body = JSON.stringify({
        from_lang: "auto",
        to_lang: target,
        trans_frag: text instanceof Array ? text.map(x => ({ text: x })) : [{ text }]
    });
    return await new Promise((resolve, reject) => {
        axiosFetch.post('https://go.ie.sogou.com/qbpc/translate', `S-Param=${body}`).then(response => {
            if (response?.data?.data?.trans_result && response?.data?.data?.trans_result instanceof Array) {
                resolve(raw ? response.data : (response.data.data.trans_result.map((x) => x.trans_text).join("\n") || ''));
            }
            reject(raw ? response.data : 'Invalid content #SogouTranslator ');
        }).catch(e => {
            reject(raw ? e : e.toString());
        });
    });
};
export { SogouBrowserTranslator };
