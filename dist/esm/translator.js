import { HttpsProxyAgent } from 'hpagent';
import https from 'node:https';

const BAIDU_LANGUAGE = ["zh", "jp", "jpka", "th", "fra", "en", "spa", "kor", "tr", "vie", "ms", "de", "ru", "ir", "ara", "est", "be", "bul", "hi", "is", "pl", "fa", "dan", "tl", "fin", "nl", "ca", "cs", "hr", "lv", "lt", "rom", "af", "no", "pt_br", "pt", "swe", "sr", "eo", "sk", "slo", "sw", "uk", "iw", "el", "hu", "hy", "it", "id", "sq", "am", "as", "az", "eu", "bn", "bs", "gl", "ka", "gu", "ha", "ig", "iu", "ga", "zu", "kn", "kk", "ky", "lb", "mk", "mt", "mi", "mr", "ne", "or", "pa", "qu", "tn", "si", "ta", "tt", "te", "ur", "uz", "cy", "yo", "yue", "wyw", "cht"];
const GOOGLE_LANGUAGE = ["sq", "ar", "am", "as", "az", "ee", "ay", "ga", "et", "or", "om", "eu", "be", "bm", "bg", "is", "pl", "bs", "fa", "bho", "af", "tt", "da", "de", "dv", "ti", "doi", "ru", "fr", "sa", "tl", "fi", "fy", "km", "ka", "gom", "gu", "gn", "kk", "ht", "ko", "ha", "nl", "ky", "gl", "ca", "cs", "kn", "co", "kri", "hr", "qu", "ku", "ckb", "la", "lv", "lo", "lt", "ln", "lg", "lb", "rw", "ro", "mg", "mt", "mr", "ml", "ms", "mk", "mai", "mi", "mni-mtei", "mn", "bn", "lus", "my", "hmn", "xh", "zu", "ne", "no", "pa", "pt", "ps", "ny", "ak", "ja", "sv", "sm", "sr", "nso", "st", "si", "eo", "sk", "sl", "sw", "gd", "ceb", "so", "tg", "te", "ta", "th", "tr", "tk", "cy", "ug", "ur", "uk", "uz", "es", "iw", "el", "haw", "sd", "hu", "sn", "hy", "ig", "ilo", "it", "yi", "hi", "su", "id", "jw", "en", "yo", "vi", "zh-tw", "zh-cn", "ts"];
const DEEPL_LANGUAGE = ["en", "en-us", "en-gb", "de", "fr", "es", "it", "nl", "pl", "ru", "pt", "pt-pt", "pt-br", "ja", "zh", "bg", "cs", "da", "et", "fi", "el", "hu", "id", "lv", "lt", "ro", "sk", "sl", "sv", "uk", "tr", "ko", "nb"];
const BING_LANGUAGE = ["lzh", "ikt", "iu-latn", "mn-cyrl", "mn-mong", "hsb", "zh-hans", "zh-hant", "da", "uk", "uz", "ur", "nb", "hy", "ru", "bg", "tlh-latn", "hr", "otq", "is", "gl", "ca", "hu", "af", "kn", "hi", "id", "gu", "kk", "iu", "tk", "tr", "ty", "sr-latn", "sr-cyrl", "or", "cy", "bn", "yua", "ne", "ba", "eu", "he", "el", "ku", "kmr", "de", "it", "lv", "cs", "ti", "fj", "sk", "sl", "sw", "pa", "ja", "ps", "ky", "ka", "mi", "to", "fo", "fr", "fr-ca", "pl", "bs", "fa", "te", "ta", "th", "ht", "ga", "et", "sv", "zu", "lt", "yue", "so", "ug", "my", "ro", "lo", "fi", "mww", "en", "nl", "fil", "sm", "pt", "pt-pt", "bo", "es", "vi", "prs", "dv", "az", "am", "sq", "ar", "as", "tt", "ko", "mk", "mg", "mr", "ml", "ms", "mt", "km"];
const SOGOU_LANGUAGE = ["ar", "pl", "da", "de", "ru", "fr", "fi", "ko", "nl", "cs", "pt", "ja", "sv", "th", "tr", "es", "hu", "en", "it", "vi", "zh-CHS"];
const YANDEX_LANGUAGE = ["af", "sq", "am", "ar", "hy", "az", "ba", "eu", "be", "bn", "bs", "bg", "my", "ca", "ceb", "zh", "cv", "hr", "cs", "da", "nl", "sjn", "emj", "en", "eo", "et", "fi", "fr", "gl", "ka", "de", "el", "gu", "ht", "he", "mrj", "hi", "hu", "is", "id", "ga", "it", "ja", "jv", "kn", "kk", "kazlat", "km", "ko", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mhr", "mn", "ne", "no", "pap", "fa", "pl", "pt", "pt-br", "pa", "ro", "ru", "gd", "sr", "sr-latn", "si", "sk", "sl", "es", "su", "sw", "sv", "tl", "tg", "ta", "tt", "te", "th", "tr", "udm", "uk", "ur", "uz", "uzbcyr", "vi", "cy", "xh", "sah", "yi", "zu"];
const SupportedLanguage = (source, language) => {
    let tmpList = [];
    switch (source) {
        case 'baidu':
            tmpList = BAIDU_LANGUAGE;
            break;
        case 'deepl':
            tmpList = DEEPL_LANGUAGE;
            break;
        case 'microsoft':
            tmpList = BING_LANGUAGE;
            break;
        case 'sogou':
            tmpList = SOGOU_LANGUAGE;
            break;
        case 'yandex':
            tmpList = YANDEX_LANGUAGE;
            break;
        default: tmpList = GOOGLE_LANGUAGE;
    }
    return tmpList.map(x => x.toLowerCase()).includes(language.toLowerCase());
};
const IsChs = (lang = 'zh') => /^zh(?:_|\-)(?:cn|sg|my|chs)|zh|chs|zho$/.test(lang.toLowerCase());
const IsCht = (lang = 'zh_tw') => /^zh(?:_|\-)(?:tw|hk|mo|cht)|cht$/.test(lang.toLowerCase());
const generateUUID = async () => {
    if (typeof process !== 'undefined') {
        const { webcrypto } = await import('crypto');
        return webcrypto.randomUUID();
    }
    else if (typeof window !== 'undefined') {
        return crypto.randomUUID();
    }
    else {
        return '';
    }
};

class AxiosRequest {
    requestHandle (url, postData, options = {}) {
        const HTTPS_PROXY = process.env.https_proxy ?? process.env.HTTPS_PROXY ?? '';
        if (HTTPS_PROXY) {
            options.agent = new HttpsProxyAgent({ proxy: HTTPS_PROXY });
        }
        if (!options.timeout) {
            options.timeout = 30000;
        }
        if (!options.headers) {
            options.headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'};
        } else {
            options.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';
        }
        const validPostRequest = (options?.method??'').toLowerCase() === 'post' && postData;
        if (!options.headers['content-type']) {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        if (validPostRequest) {
            if (typeof postData === 'object') {
                postData = JSON.stringify(postData);
                options.headers['content-type'] = 'application/json';
            }
            options.headers['content-length'] = Buffer.byteLength(postData);
        }
        return new Promise((resolve, reject) => {
            const req = https.request(url, options, (res) => {
                let tmpData = [];
                res.on('data', (data) => {
                    tmpData.push(data);
                });
                res.on('close', () => {
                    resolve(this.responseBuilder(res, Buffer.concat(tmpData)));
                });
            });
            req.on('error', (e) => {
                reject({ cause: e });
            });
            if (validPostRequest) {
                req.write(postData);
            }
            req.end();
        })
    }
    isJson (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false
        }
        return true
    }
    responseBuilder (res, data) {
        const dataString = data.toString();
        const isJson = this.isJson(dataString);
        return {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            data: isJson ? JSON.parse(dataString) : dataString
        }
    }
    get (url, options) {
        return this.requestHandle(url, null, {method: 'GET', ...options})
    }
    post (url, data, options) {
        return this.requestHandle(url, data, {method: 'POST', ...options})
    }
}
const axiosFetch = new AxiosRequest;

const GoogleTranslate = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #GoogleTranslate ');
    }
    if (!SupportedLanguage('google', target || 'en')) {
        return await Promise.reject('Not supported target language #GoogleTranslate ');
    }
    if (Array.isArray(text)) {
        text = text.join("\n");
    }
    const query = new URLSearchParams({ "client": "webapp", "sl": "auto", "tl": (target || 'en'), "hl": (target || 'en'), "dt": "t", "clearbtn": '1', "otf": '1', "pc": '1', "ssel": '0', "tsel": '0', "kc": '2', "tk": "", "q": text });
    return await new Promise(async (resolve, reject) => {
        axiosFetch.get('https://translate.google.com/translate_a/single?' + query.toString(), {
            headers: {
                referer: 'https://translate.google.com/',
                authority: 'translate.google.com'
            }
        }).then(response => {
            if (response.data && Array.isArray(response.data[0])) {
                resolve(raw ? response.data : response.data[0].filter(translate => translate).map(translate => translate[0]).join(''));
                //resolve(response.data[0].filter(translate => translate).map(translate => translate[0]).join(''))
            }
            reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
        }).catch(e => {
            reject(raw ? e : e.toString());
        });
    });
};
const GoogleBrowserTranslate = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #GoogleTranslate ');
    }
    if (!SupportedLanguage('google', target || 'en')) {
        return await Promise.reject('Not supported target language #GoogleTranslate ');
    }
    //curl 'https://translate.googleapis.com/translate_a/t?anno=3&client=wt_lib&format=html&v=1.0&key&sl=auto&tl=zh&tc=1&sr=1&tk=164775.366094&mode=1' --data-raw 'q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF' --compressed
    //https://vielhuber.de/zh-cn/blog-zh-cn/google-translation-api-hacking/
    let query = new URLSearchParams({ anno: '4', client: 'te_lib', format: 'html', v: '1.0', key: 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw', sl: 'auto', tl: (target || 'en'), tc: '1', sr: '1', tk: GoogleTranslateTk(text), mode: '1' });
    //let formData = new URLSearchParams({q: text})
    return await new Promise(async (resolve, reject) => {
        axiosFetch.post('https://translate.googleapis.com/translate_a/t?' + query.toString(), 'q=' + ((text instanceof Array) ? text.map(x => encodeURIComponent(x)).join('&q=') : encodeURIComponent(text))).then((response) => {
            if (response.data && response.data instanceof Array) {
                resolve(raw ? response.data : response.data.map((x) => x?.[0] || '').join("\n"));
            }
            reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
        }).catch(e => {
            reject(raw ? e : e.toString());
        });
    });
};
const hl = function (a, b) {
    let c = 0;
    for (; c < b.length - 2; c += 3) {
        let d = b.charAt(c + 2);
        d = "a" <= d ? (d.charCodeAt(0) - 87) : Number(d);
        d = "+" == b.charAt(c + 1) ? (a >>> d) : (a << d);
        a = "+" == b.charAt(c) ? (a + d & 4294967295) : (a ^ d);
    }
    return a;
};
const getCharCodeList = function (text) {
    let charCodeList = [], charCodeListIndex = 0;
    for (let index = 0; index < text.length; index++) {
        let charCode = text.charCodeAt(index);
        if (128 > charCode) {
            charCodeList[charCodeListIndex++] = charCode;
        }
        else {
            if (2048 > charCode) {
                charCodeList[charCodeListIndex++] = charCode >> 6 | 192;
            }
            else {
                if (55296 == (charCode & 64512) && index + 1 < text.length && 56320 == (text.charCodeAt(index + 1) & 64512)) {
                    charCode = 65536 + ((charCode & 1023) << 10) + (text.charCodeAt(++index) & 1023);
                    charCodeList[charCodeListIndex++] = charCode >> 18 | 240;
                    charCodeList[charCodeListIndex++] = charCode >> 12 & 63 | 128;
                }
                else {
                    charCodeList[charCodeListIndex++] = charCode >> 12 | 224;
                }
                charCodeList[charCodeListIndex++] = charCode >> 6 & 63 | 128;
            }
            charCodeList[charCodeListIndex++] = charCode & 63 | 128;
        }
    }
    return charCodeList;
};
//https://translate.google.com/translate_a/element?cb=gtElInit&hl=zh-CN&client=wt c._ctkk
const GoogleTranslateTk = (originalText = '', tkk = [464385, 3806605782]) => {
    //from https://translate.googleapis.com/_/translate_http/_/js/k=translate_http.tr.zh_CN.D7QeyoDkDhY.O/d=1/exm=el_conf/ed=1/rs=AN8SPfq20C5s1IToiD2r2PKoyh-SRQysPA/m=el_main
    let text;
    if (originalText instanceof Array) {
        text = JSON.parse(JSON.stringify(originalText)).join('');
    }
    else {
        text = originalText;
    }
    const charCodeList = getCharCodeList(text);
    let a = tkk[0];
    for (const charCode of charCodeList) {
        a += charCode;
        a = hl(a, '+-a^+6');
    }
    a = hl(a, '+-3^+b+-f');
    a ^= tkk[1] ? tkk[1] + 0 : 0;
    if (a < 0) {
        a = (a & 2147483647) + 2147483648;
    }
    a %= 1E6;
    return a.toString() + '.' + (a ^ tkk[0]);
};

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
                resultContent.common = (new Function('let localStorage={getItem:function(n){return 1}};return ' + /window\['common'\](?:\s|)=(?:\s|)([^;]+);/.exec(tmpWebPage.data || '')?.[1].replaceAll(':,', ':') || 'null'))();
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
const BaiduTranslator = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #BaiduTranslator ');
    }
    if (!SupportedLanguage('baidu', target || 'en')) {
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
        return await new Promise(async (resolve, reject) => {
            if (Array.isArray(text)) {
                text = text.join("\n");
            }
            axiosFetch.post('https://fanyi.baidu.com/v2transapi?' + (new URLSearchParams({
                from: fromLaguage,
                to: target || 'en'
            })).toString(), (new URLSearchParams({
                from: fromLaguage,
                to: target || 'en',
                query: text,
                transtype: 'translang',
                simple_means_flag: '3',
                sign: GoogleTranslateTk(baiduPreprocessing(text), gtk || []),
                token: common?.token || '',
                domain: 'common'
            })).toString(), { headers: { cookie } }).then(response => {
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

const getId = async () => {
    if (typeof process !== 'undefined') {
        //nodejs
        const { webcrypto } = await import('crypto');
        return webcrypto.getRandomValues(new Uint32Array(1))[0];
    }
    else if (typeof window !== 'undefined') {
        //browser
        return crypto.getRandomValues(new Uint32Array(1))[0];
    }
    else {
        return 0;
    }
};
const DeepL = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #DeepL ');
    }
    if (!SupportedLanguage('deepl', target || 'en')) {
        return await Promise.reject('Not supported target language #DeepL ');
    }
    //{"jsonrpc":"2.0","method": "LMT_handle_texts","params":{"texts":[{"text":"[Schoolgirl Strikers: Animation Channel]"}],"splitting":"newlines","lang":{"target_lang":"ZH","source_lang_user_selected":"auto","preference":{"weight":{}}},"timestamp":0},"id":0}
    const realTimeStamp = Number(new Date());
    const i_count = (text instanceof Array ? text.join('') : text).split('i').length;
    const id = await getId(); // + 1
    const postBody = JSON.stringify({
        jsonrpc: "2.0",
        method: "LMT_handle_texts",
        params: {
            texts: (text instanceof Array) ? text.map(x => ({ text: x })) : [{ text }],
            lang: {
                target_lang: (target || 'en').toUpperCase(),
                source_lang_user_selected: "auto",
            },
            timestamp: realTimeStamp - realTimeStamp % i_count + i_count
        },
        id
    }).replace("\"method\":\"", (((id + 3) % 13 === 0) || ((id + 5) % 29 === 0)) ? "\"method\" : \"" : "\"method\": \"");
    return await new Promise(async (resolve, reject) => {
        axiosFetch.post('https://www2.deepl.com/jsonrpc?client=chrome-extension,1.1.1', postBody, {
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        }).then(response => {
            resolve(raw ? response.data : response.data.result.texts.map((x) => x.text).join("\n"));
        }).catch(e => {
            reject(raw ? e : e.toString());
        });
    });
};

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

const SogouBrowserTranslator = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #SogouTranslator ');
    }
    if (!SupportedLanguage('sogou', target || 'en')) {
        return await Promise.reject('Not supported target language #SogouTranslator ');
    }
    let body = JSON.stringify({
        from_lang: "auto",
        to_lang: target,
        trans_frag: text instanceof Array ? text.map(x => ({ text: x })) : [{ text }]
    });
    return await new Promise(async (resolve, reject) => {
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

//from yandex browser
const generateSid = async () => {
    return (await generateUUID()).replaceAll('-', '');
};
const YandexDetect = async (text = '') => {
    if (!text) {
        return '_';
    }
    if (Array.isArray(text)) {
        text = text.join("\n");
    }
    try {
        const languageResult = await axiosFetch.get('https://translate.yandex.net/api/v1/tr.json/detect?' + (new URLSearchParams({
            sid: await generateSid(),
            srv: 'android',
            text,
            //hint: 'en,zh'
        })).toString());
        if (languageResult.data?.code === 200 && languageResult.data?.lang) {
            return languageResult.data?.lang || '_';
        }
        else {
            return '_';
        }
    }
    catch (e) {
        return '_';
    }
};
const YandexTranslator = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #YandexTranslator ');
    }
    if (!SupportedLanguage('yandex', target || 'en')) {
        return await Promise.reject('Not supported target language #YandexTranslator ');
    }
    const lang = await YandexDetect((Array.isArray(text) ? text.join(' ') : text));
    if (lang === '_') {
        return await Promise.reject('Not supported source language #YandexTranslator ');
    }
    return await new Promise(async (resolve, reject) => {
        axiosFetch.post('https://translate.yandex.net/api/v1/tr.json/translate?' + (new URLSearchParams({
            id: `${await generateSid()}-0-0`,
            srv: 'android' // ios
        })).toString(), (new URLSearchParams({
            source_lang: lang,
            target_lang: target,
            text: Array.isArray(text) ? text.join("\n") : text
        })).toString()).then(response => {
            if (response?.data?.text && response?.data?.text instanceof Array) {
                resolve(raw ? response.data : response.data.text.join("\n"));
            }
            reject(raw ? response.data : 'Invalid content #YandexTranslator ');
        }).catch(e => {
            reject(raw ? e : e.toString());
        });
    });
};
const YandexBrowserTranslator = async (text = '', target, raw) => {
    if (!text) {
        return await Promise.reject('Empty text #YandexTranslator ');
    }
    if (!SupportedLanguage('yandex', target || 'en')) {
        return await Promise.reject('Not supported target language #YandexTranslator ');
    }
    const lang = await YandexDetect((Array.isArray(text) ? text.join(' ') : text).replaceAll(/<a id=\d><><\/a>/gm, ''));
    if (lang === '_') {
        return await Promise.reject('Not supported source language #YandexTranslator ');
    }
    let query = new URLSearchParams({
        translateMode: 'context',
        context_title: 'Twitter Monitor Translator',
        id: `${await generateSid()}-0-0`,
        srv: 'yabrowser',
        lang: `${lang}-${target}`,
        format: 'html',
        options: '2'
    });
    return await new Promise(async (resolve, reject) => {
        axiosFetch.get('https://browser.translate.yandex.net/api/v1/tr.json/translate?' + query.toString() + '&text=' + ((text instanceof Array) ? text.map(x => encodeURIComponent(x)).join('&text=') : encodeURIComponent(text))).then(response => {
            if (response?.data?.text && response?.data?.text instanceof Array) {
                resolve(raw ? response.data : response.data.text.join("\n"));
            }
            reject(raw ? response.data : 'Invalid content #YandexTranslator ');
        }).catch(e => {
            reject(raw ? e : e.toString());
        });
    });
};

const Translator = async (text = '', platform, target, raw) => {
    let result = { content: '', message: '' };
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleBrowserTranslate(text, target, !!raw);
                break;
            case 'microsoft':
                result.content = await MicrosoftBrowserTranslator(text, target, !!raw);
                break;
            case 'sogou':
                result.content = await SogouBrowserTranslator(text, target, !!raw);
                break;
            case 'yandex':
                result.content = await YandexBrowserTranslator(text, target, !!raw);
                break;
            case 'baidu':
                result.content = await BaiduTranslator(text, target, !!raw);
                break;
            case 'deepl':
                result.content = await DeepL(text, target, !!raw);
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};

export { BaiduLanguagePredict, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, IsChs, IsCht, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexBrowserTranslator, YandexDetect, YandexTranslator, Translator as default };
//# sourceMappingURL=translator.js.map
