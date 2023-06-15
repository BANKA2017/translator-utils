(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.translator = factory());
})(this, (function () { 'use strict';

    const GOOGLE_LANGUAGE = ["sq", "ar", "am", "as", "az", "ee", "ay", "ga", "et", "or", "om", "eu", "be", "bm", "bg", "is", "pl", "bs", "fa", "bho", "af", "tt", "da", "de", "dv", "ti", "doi", "ru", "fr", "sa", "tl", "fi", "fy", "km", "ka", "gom", "gu", "gn", "kk", "ht", "ko", "ha", "nl", "ky", "gl", "ca", "cs", "kn", "co", "kri", "hr", "qu", "ku", "ckb", "la", "lv", "lo", "lt", "ln", "lg", "lb", "rw", "ro", "mg", "mt", "mr", "ml", "ms", "mk", "mai", "mi", "mni-mtei", "mn", "bn", "lus", "my", "hmn", "xh", "zu", "ne", "no", "pa", "pt", "ps", "ny", "ak", "ja", "sv", "sm", "sr", "nso", "st", "si", "eo", "sk", "sl", "sw", "gd", "ceb", "so", "tg", "te", "ta", "th", "tr", "tk", "cy", "ug", "ur", "uk", "uz", "es", "iw", "el", "haw", "sd", "hu", "sn", "hy", "ig", "ilo", "it", "yi", "hi", "su", "id", "jw", "en", "yo", "vi", "zh-tw", "zh-cn", "ts"];
    const BING_LANGUAGE = ["lzh", "ikt", "iu-latn", "mn-cyrl", "mn-mong", "hsb", "zh-hans", "zh-hant", "da", "uk", "uz", "ur", "nb", "hy", "ru", "bg", "tlh-latn", "hr", "otq", "is", "gl", "ca", "hu", "af", "kn", "hi", "id", "gu", "kk", "iu", "tk", "tr", "ty", "sr-latn", "sr-cyrl", "or", "cy", "bn", "yua", "ne", "ba", "eu", "he", "el", "ku", "kmr", "de", "it", "lv", "cs", "ti", "fj", "sk", "sl", "sw", "pa", "ja", "ps", "ky", "ka", "mi", "to", "fo", "fr", "fr-ca", "pl", "bs", "fa", "te", "ta", "th", "ht", "ga", "et", "sv", "zu", "lt", "yue", "so", "ug", "my", "ro", "lo", "fi", "mww", "en", "nl", "fil", "sm", "pt", "pt-pt", "bo", "es", "vi", "prs", "dv", "az", "am", "sq", "ar", "as", "tt", "ko", "mk", "mg", "mr", "ml", "ms", "mt", "km"];
    const SOGOU_LANGUAGE = ["ar", "pl", "da", "de", "ru", "fr", "fi", "ko", "nl", "cs", "pt", "ja", "sv", "th", "tr", "es", "hu", "en", "it", "vi", "zh-CHS"];
    const YANDEX_LANGUAGE = ["af", "sq", "am", "ar", "hy", "az", "ba", "eu", "be", "bn", "bs", "bg", "my", "ca", "ceb", "zh", "cv", "hr", "cs", "da", "nl", "sjn", "emj", "en", "eo", "et", "fi", "fr", "gl", "ka", "de", "el", "gu", "ht", "he", "mrj", "hi", "hu", "is", "id", "ga", "it", "ja", "jv", "kn", "kk", "kazlat", "km", "ko", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mhr", "mn", "ne", "no", "pap", "fa", "pl", "pt", "pt-br", "pa", "ro", "ru", "gd", "sr", "sr-latn", "si", "sk", "sl", "es", "su", "sw", "sv", "tl", "tg", "ta", "tt", "te", "th", "tr", "udm", "uk", "ur", "uz", "uzbcyr", "vi", "cy", "xh", "sah", "yi", "zu"];
    const SupportedLanguage = (List, language) => {
        return List.map(x => x.toLowerCase()).includes(language.toLowerCase());
    };
    const generateUUID = async () => {
        // @ts-ignore
        if (typeof process !== 'undefined' && !process?.browser) {
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
            if (!options.timeout) {
                options.timeout = 30000;
            }
            const validPostRequest = (options?.method??'').toLowerCase() === 'post' && postData;
            if (!options.headers) {
                options.headers = {};
            }
            if (!options.headers?.['content-type']) {
                options.headers['content-type'] = 'application/x-www-form-urlencoded';
            }
            if (validPostRequest) {
                if (typeof postData === 'object') {
                    postData = JSON.stringify(postData);
                    options.headers['content-type'] = 'application/json';
                }
                options.headers['content-length'] = postData.length;
                options.body = postData;
            }
            return new Promise((resolve, reject) => {
                fetch(url, options).then(async response => {
                    return {response, data: await response.text()}
                }).then(res => {
                    resolve(this.responseBuilder(res.response, res.data));
                }).catch(e => {
                    reject({ cause: e, toString: () => e.toString() });
                });
            })
        }
        responseBuilder (res, data) {
            data = data.toString();
            try {data = JSON.parse(data);} catch (e) {}
            let headers = Object.fromEntries(res.headers.entries());
            if (headers['set-cookie'] && res.headers.getAll) {
                headers['set-cookie'] = res.headers.getAll('set-cookie');
            } else if (headers['set-cookie']) {
                headers['set-cookie'] = [...res.headers.entries()].filter(header => header[0] === 'set-cookie').map(header => header[1]);
            }
            return {
                status: res.status,
                statusText: res.statusText,
                headers,
                data
            }
        }
        get (url, options) {
            options.method = 'GET';
            return this.requestHandle(url, null, options)
        }
        post (url, data, options) {
            options.method = 'POST';
            return this.requestHandle(url, data, options)
        }
    }
    const axiosFetch = new AxiosRequest;

    const GoogleBrowserTranslate = async (text = '', source = 'auto', target, raw) => {
        if (!text) {
            return await Promise.reject('Empty text #GoogleTranslate ');
        }
        if (!SupportedLanguage(GOOGLE_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(GOOGLE_LANGUAGE, source || 'en'))) {
            return await Promise.reject('Not supported target language #GoogleTranslate ');
        }
        //curl 'https://translate.googleapis.com/translate_a/t?anno=3&client=wt_lib&format=html&v=1.0&key&sl=auto&tl=zh&tc=1&sr=1&tk=164775.366094&mode=1' --data-raw 'q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF' --compressed
        //https://vielhuber.de/zh-cn/blog-zh-cn/google-translation-api-hacking/
        let query = new URLSearchParams({ anno: '4', client: 'te_lib', format: 'html', v: '1.0', key: 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw', sl: source, tl: (target || 'en'), tc: '1', sr: '1', tk: GoogleTranslateTk(text), mode: '1' });
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

    const GetMicrosoftBrowserTranslatorAuth = async () => {
        try {
            return (await axiosFetch.get('https://edge.microsoft.com/translate/auth')).data;
        }
        catch (e) {
            return '';
        }
    };
    const MicrosoftBrowserTranslator = async (text = '', source = 'auto', target, raw) => {
        if (!text) {
            return await Promise.reject('Empty text #MicrosoftTranslator ');
        }
        if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
            return await Promise.reject('Not supported target language #MicrosoftTranslator ');
        }
        //get jwt
        const jwt = await GetMicrosoftBrowserTranslatorAuth();
        if (jwt) {
            return await new Promise(async (resolve, reject) => {
                axiosFetch.post(`https://api.cognitive.microsofttranslator.com/translate?from=${source === 'auto' ? '' : source}&to=${target}&api-version=3.0&includeSentenceLength=true`, JSON.stringify(text instanceof Array ? text.map(tmpText => ({ Text: tmpText })) : [{ Text: text }]), {
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

    const SogouBrowserTranslator = async (text = '', source = 'auto', target, raw) => {
        if (!text) {
            return await Promise.reject('Empty text #SogouTranslator ');
        }
        if (!SupportedLanguage(SOGOU_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(SOGOU_LANGUAGE, source || 'en'))) {
            return await Promise.reject('Not supported target language #SogouTranslator ');
        }
        let body = JSON.stringify({
            from_lang: source,
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
    const YandexBrowserTranslator = async (text = '', source = 'auto', target, raw) => {
        if (!text) {
            return await Promise.reject('Empty text #YandexTranslator ');
        }
        if (!SupportedLanguage(YANDEX_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(YANDEX_LANGUAGE, source || 'en'))) {
            return await Promise.reject('Not supported target language #YandexTranslator ');
        }
        const lang = source === 'auto' ? await YandexDetect((Array.isArray(text) ? text.join(' ') : text).replaceAll(/<a id=\d><><\/a>/gm, '')) : source;
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

    const Translator = async (text = '', platform, source, target, raw) => {
        let result = { content: '', message: '' };
        try {
            switch (platform) {
                case 'google':
                case 'google_browser':
                    result.content = await GoogleBrowserTranslate(text, source, target, !!raw);
                    break;
                case 'microsoft':
                case 'microsoft_browser':
                    result.content = await MicrosoftBrowserTranslator(text, source, target, !!raw);
                    break;
                case 'sogou':
                case 'sogou_browser':
                    result.content = await SogouBrowserTranslator(text, source, target, !!raw);
                    break;
                case 'sogou':
                case 'sogou_browser':
                    result.content = await YandexBrowserTranslator(text, source, target, !!raw);
                    break;
            }
        }
        catch (e) {
            result.message = String(e);
        }
        return result;
    };

    return Translator;

}));
//# sourceMappingURL=translator.js.map
