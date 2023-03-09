import axiosFetch from '../axios.js';
import { SupportedLanguage } from '../misc.js';
import { GoogleTranslateTk } from './google.js';
//const gtk =[320305, 131321201]
const baiduPreprocessing = (text) => {
    let textArray = [...text];
    if (textArray.length > 30) {
        return textArray.slice(0, 10).join("") + textArray.slice(Math.floor(textArray.length / 2) - 5, Math.floor(textArray.length / 2) + 5).join("") + textArray.slice(-10).join("");
    }
    return text;
};
const GetBaiduTranslatorToken = async (cookie = '', loop = 0) => {
    let resultContent = {
        message: null,
        page: null,
        cookie: null,
        common: null,
        gtk: null
    };
    if (loop > 5) {
        resultContent.message = 'Unable to get translator page (Loop > 5) #BaiduTranslator ';
        return resultContent;
    }
    if (cookie) {
        resultContent.cookie = cookie;
    }
    try {
        const tmpWebPage = await axiosFetch.get('https://fanyi.baidu.com/', { headers: { cookie } });
        if (tmpWebPage.headers['set-cookie']) {
            //get cookie again
            return GetBaiduTranslatorToken(tmpWebPage.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join(';'), ++loop);
        }
        else {
            resultContent.page = tmpWebPage.data;
            try {
                resultContent.common = (new Function('let localStorage={getItem:function(n){return 1}};return ' + /window\['common'\](?:\s|)=(?:\s|)([^;]+);/.exec(tmpWebPage.data || '')?.[1] || 'null'))();
                const tmpGtk = String((new Function('return ' + /window\.gtk(?:\s|)=(?:\s|)"([^;]+)";/.exec(tmpWebPage.data || '')?.[1] || '""'))()).split('.').map(x => Number(x));
                if (tmpGtk.length === 2) {
                    resultContent.gtk = tmpGtk;
                }
                else {
                    throw null;
                }
            }
            catch (e) {
                resultContent.message = 'Unable to get variables #BaiduTranslator ';
                return resultContent;
            }
            return resultContent;
        }
    }
    catch (e) {
        resultContent.message = 'Unable to get translator page #BaiduTranslator ';
        return resultContent;
    }
};
const BaiduLanguagePredict = async (text = '', cookie = '') => {
    if (!text) {
        return '_';
    }
    if (Array.isArray(text)) {
        text = text.join("\n");
    }
    try {
        const languageResult = await axiosFetch.post('https://fanyi.baidu.com/langdetect', (new URLSearchParams({ query: text })).toString(), { headers: { cookie } });
        if (languageResult.data?.error === 0 && languageResult.data?.lan) {
            return languageResult.data?.lan || '';
        }
        else {
            return '_';
        }
    }
    catch (e) {
        return '_';
    }
};
const BaiduTranslator = async (text = '', target = 'en', raw) => {
    console.log(raw);
    if (!text) {
        return await Promise.reject('Empty text #BaiduTranslator ');
    }
    if (!SupportedLanguage('baidu', target)) {
        return await Promise.reject('Not supported target language #BaiduTranslator ');
    }
    //get baidu translator page
    const { message, page, cookie, common, gtk } = await GetBaiduTranslatorToken();
    if (message) {
        return await Promise.reject(message);
    }
    if (page && cookie) {
        const fromLaguage = await BaiduLanguagePredict(text, cookie);
        if (fromLaguage === '_') {
            return await Promise.reject('Not supported source language #BaiduTranslator ');
        }
        return await new Promise((resolve, reject) => {
            if (Array.isArray(text)) {
                text = text.join("\n");
            }
            axiosFetch.post('https://fanyi.baidu.com/v2transapi?' + (new URLSearchParams({
                from: fromLaguage,
                to: target
            })).toString(), (new URLSearchParams({
                from: fromLaguage,
                to: target,
                query: text,
                transtype: 'translang',
                simple_means_flag: '3',
                sign: GoogleTranslateTk(baiduPreprocessing(text), gtk || []),
                token: common?.token || '',
                domain: 'common'
            })).toString(), {
                headers: { cookie }
            }).then(response => {
                if (response?.data?.trans_result?.data && response?.data?.trans_result?.data instanceof Array) {
                    resolve(raw ? response.data : response.data.trans_result.data.map((x) => x.dst).join("\n"));
                }
                reject(raw ? response.data : 'Invalid content #BaiduTranslator ');
            }).catch(e => {
                reject(raw ? e : e.toString());
            });
        });
    }
    else {
        return await Promise.reject('Empty text #BaiduTranslator ');
    }
};
export { BaiduTranslator, BaiduLanguagePredict, GetBaiduTranslatorToken };
