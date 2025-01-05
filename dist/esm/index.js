import crypto from 'crypto';
import { HttpsProxyAgent } from 'hpagent';
import https from 'node:https';
import { randomBytes } from 'node:crypto';
import require$$0$2 from 'stream';
import require$$0 from 'zlib';
import require$$0$1 from 'buffer';
import require$$0$3 from 'events';
import require$$1 from 'https';
import require$$2 from 'http';
import require$$3 from 'net';
import require$$4 from 'tls';
import require$$7 from 'url';

const cryptoHandle = crypto;

const SupportedLanguage = (List, language) => {
    return List.map((x) => x.toLowerCase()).includes(language.toLowerCase());
};
const IsChs = (lang = 'zh') => /^zh(?:_|\-)(?:cn|sg|my|chs)|zh|chs|zho$/.test(lang.toLowerCase());
const IsCht = (lang = 'zh_tw') => /^zh(?:_|\-)(?:tw|hk|mo|cht)|cht$/.test(lang.toLowerCase());
const buffer_to_base64 = (buf) => {
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (var i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};
const generateUUID = () => cryptoHandle.randomUUID() || '00000000-0000-0000-0000-000000000000';
const htmlentities = (str) => {
    return str.replaceAll('>', '&gt;').replaceAll('<', '&lt;').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
};
//https://gist.github.com/72lions/4528834
const concatBuffer = (...buffer) => {
    const length = buffer.reduce((acc, cur) => acc + cur.byteLength, 0);
    let tmp = new Uint8Array(length);
    buffer.reduce((acc, cur) => {
        tmp.set(new Uint8Array(cur), acc);
        return acc + cur.byteLength;
    }, 0);
    return tmp.buffer;
};

class AxiosRequest {
    requestHandle(url, postData, options = {}) {
        const HTTPS_PROXY = process.env.https_proxy || process.env.HTTPS_PROXY || '';
        if (HTTPS_PROXY && HttpsProxyAgent) {
            options.agent = new HttpsProxyAgent({ proxy: HTTPS_PROXY });
        }
        if (!options.timeout) {
            options.timeout = 30000;
        }
        const defaultUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';
        if (!options.headers) {
            options.headers = { 'user-agent': defaultUA };
        } else {
            options.headers['user-agent'] = defaultUA;
        }
        const validPostRequest = (options?.method || '').toLowerCase() === 'post' && postData;
        const isFormData = postData instanceof FormData;
        if (validPostRequest && !isFormData) {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
            if (typeof postData === 'object') {
                postData = JSON.stringify(postData);
                options.headers['content-type'] = 'application/json';
            }
            options.headers['content-length'] = Buffer.byteLength(postData);
        } else if (isFormData) {
            const multipartFormData = MultipartFormBuilder(postData);
            options.headers['content-type'] = 'multipart/form-data; boundary=' + multipartFormData.boundary;
            postData = multipartFormData.body;
        }
        return new Promise((resolve, reject) => {
            const req = https.request(url, options, (res) => {
                let tmpData = [];
                res.on('data', (data) => {
                    tmpData.push(data);
                });
                res.on('close', () => {
                    resolve(this.responseBuilder(res, Buffer.concat(tmpData), options));
                });
            });
            req.on('error', (e) => {
                reject({ cause: e, toString: () => e.toString() });
            });
            if (validPostRequest) {
                req.write(postData);
            }
            req.end();
        })
    }
    isJson(str) {
        try {
            JSON.parse(str);
            return true
        } catch (e) {
            return false
        }
    }
    responseBuilder(res, data, options = {}) {
        switch (options?.responseType) {
            case 'arraybuffer':
                break
            default:
                data = new TextDecoder().decode(data);
                if (this.isJson(data)) {
                    data = JSON.parse(data);
                }
        }
        return {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            data
        }
    }
    get(url, options = {}) {
        return this.requestHandle(url, null, { method: 'GET', ...options })
    }
    post(url, data = '', options = {}) {
        return this.requestHandle(url, data, { method: 'POST', ...options })
    }
}
const MultipartFormBuilder = (_body = new FormData()) => {
    const boundary = '----WebKitFormBoundary' + randomBytes(16).toString('hex');
    let body = '';
    _body.forEach((v, k) => {
        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="${k}"\r\n\r\n`;
        body += `${v}\r\n`;
    });
    body += `--${boundary}--`;
    return {
        boundary,
        body
    }
};
const axiosFetch = new AxiosRequest();

const GOOGLE_LANGUAGE = ['aa', 'ab', 'ace', 'ach', 'af', 'ak', 'alz', 'am', 'ar', 'as', 'av', 'awa', 'ay', 'az', 'ba', 'bal', 'ban', 'bbc', 'bci', 'be', 'bem', 'ber', 'ber-latn', 'bew', 'bg', 'bho', 'bik', 'bm', 'bm-nkoo', 'bn', 'bo', 'br', 'bs', 'bts', 'btx', 'bua', 'ca', 'ce', 'ceb', 'cgg', 'ch', 'chk', 'chm', 'ckb', 'cnh', 'co', 'crh', 'crs', 'cs', 'cv', 'cy', 'da', 'de', 'din', 'doi', 'dov', 'dv', 'dyu', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fa-af', 'ff', 'fi', 'fj', 'fo', 'fon', 'fr', 'fur', 'fy', 'ga', 'gaa', 'gd', 'gl', 'gn', 'gom', 'gu', 'gv', 'ha', 'haw', 'hi', 'hil', 'hmn', 'hr', 'hrx', 'ht', 'hu', 'hy', 'iba', 'id', 'ig', 'ilo', 'is', 'it', 'iw', 'ja', 'jam', 'jw', 'ka', 'kac', 'kek', 'kg', 'kha', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'kri', 'ktu', 'ku', 'kv', 'ky', 'la', 'lb', 'lg', 'li', 'lij', 'lmo', 'ln', 'lo', 'lt', 'ltg', 'luo', 'lus', 'lv', 'mad', 'mai', 'mak', 'mam', 'mfe', 'mg', 'mh', 'mi', 'min', 'mk', 'ml', 'mn', 'mni-mtei', 'mr', 'ms', 'ms-arab', 'mt', 'mwr', 'my', 'ndc-zw', 'ne', 'new', 'nhe', 'nl', 'no', 'nr', 'nso', 'nus', 'ny', 'oc', 'om', 'or', 'os', 'pa', 'pa-arab', 'pag', 'pam', 'pap', 'pl', 'ps', 'pt', 'pt-pt', 'qu', 'rn', 'ro', 'rom', 'ru', 'rw', 'sa', 'sah', 'sat-latn', 'scn', 'sd', 'se', 'sg', 'shn', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sus', 'sv', 'sw', 'szl', 'ta', 'tcy', 'te', 'tet', 'tg', 'th', 'ti', 'tiv', 'tk', 'tl', 'tn', 'to', 'tpi', 'tr', 'trp', 'ts', 'tt', 'tum', 'ty', 'tyv', 'udm', 'ug', 'uk', 'ur', 'uz', 've', 'vec', 'vi', 'war', 'wo', 'xh', 'yi', 'yo', 'yua', 'yue', 'zap', 'zh-cn', 'zh-tw', 'zu'];
const BING_LANGUAGE = ['af', 'am', 'ar', 'as', 'az', 'ba', 'bg', 'bho', 'bn', 'bo', 'brx', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'doi', 'dsb', 'dv', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fil', 'fj', 'fo', 'fr', 'fr-ca', 'ga', 'gl', 'gom', 'gu', 'ha', 'he', 'hi', 'hr', 'hsb', 'ht', 'hu', 'hy', 'id', 'ig', 'ikt', 'is', 'it', 'iu', 'iu-latn', 'ja', 'ka', 'kk', 'km', 'kmr', 'kn', 'ko', 'ks', 'ku', 'ky', 'ln', 'lo', 'lt', 'lug', 'lv', 'lzh', 'mai', 'mg', 'mi', 'mk', 'ml', 'mn-cyrl', 'mn-mong', 'mr', 'ms', 'mt', 'mww', 'my', 'nb', 'ne', 'nl', 'nso', 'nya', 'or', 'otq', 'pa', 'pl', 'prs', 'ps', 'pt', 'pt-pt', 'ro', 'ru', 'run', 'rw', 'sd', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr-cyrl', 'sr-latn', 'st', 'sv', 'sw', 'ta', 'te', 'th', 'ti', 'tk', 'tlh-latn', 'tn', 'to', 'tr', 'tt', 'ty', 'ug', 'uk', 'ur', 'uz', 'vi', 'xh', 'yo', 'yua', 'yue', 'zh-hans', 'zh-hant', 'zu'];
const MICROSOFT_TTS_LIST = [{ "code": "af", "language": "af-ZA", "gender": "Female", "model": "af-ZA-AdriNeural" }, { "code": "am", "language": "am-ET", "gender": "Female", "model": "am-ET-MekdesNeural" }, { "code": "ar", "language": "ar-SA", "gender": "Male", "model": "ar-SA-HamedNeural" }, { "code": "bn", "language": "bn-IN", "gender": "Female", "model": "bn-IN-TanishaaNeural" }, { "code": "bg", "language": "bg-BG", "gender": "Male", "model": "bg-BG-BorislavNeural" }, { "code": "ca", "language": "ca-ES", "gender": "Female", "model": "ca-ES-JoanaNeural" }, { "code": "cs", "language": "cs-CZ", "gender": "Male", "model": "cs-CZ-AntoninNeural" }, { "code": "cy", "language": "cy-GB", "gender": "Female", "model": "cy-GB-NiaNeural" }, { "code": "da", "language": "da-DK", "gender": "Female", "model": "da-DK-ChristelNeural" }, { "code": "de", "language": "de-DE", "gender": "Female", "model": "de-DE-KatjaNeural" }, { "code": "el", "language": "el-GR", "gender": "Male", "model": "el-GR-NestorasNeural" }, { "code": "en", "language": "en-US", "gender": "Female", "model": "en-US-AriaNeural" }, { "code": "es", "language": "es-ES", "gender": "Female", "model": "es-ES-ElviraNeural" }, { "code": "et", "language": "et-EE", "gender": "Female", "model": "et-EE-AnuNeural" }, { "code": "fa", "language": "fa-IR", "gender": "Female", "model": "fa-IR-DilaraNeural" }, { "code": "fi", "language": "fi-FI", "gender": "Female", "model": "fi-FI-NooraNeural" }, { "code": "fr", "language": "fr-FR", "gender": "Female", "model": "fr-FR-DeniseNeural" }, { "code": "fr-ca", "language": "fr-CA", "gender": "Female", "model": "fr-CA-SylvieNeural" }, { "code": "ga", "language": "ga-IE", "gender": "Female", "model": "ga-IE-OrlaNeural" }, { "code": "gu", "language": "gu-IN", "gender": "Female", "model": "gu-IN-DhwaniNeural" }, { "code": "he", "language": "he-IL", "gender": "Male", "model": "he-IL-AvriNeural" }, { "code": "hi", "language": "hi-IN", "gender": "Female", "model": "hi-IN-SwaraNeural" }, { "code": "hr", "language": "hr-HR", "gender": "Male", "model": "hr-HR-SreckoNeural" }, { "code": "hu", "language": "hu-HU", "gender": "Male", "model": "hu-HU-TamasNeural" }, { "code": "id", "language": "id-ID", "gender": "Male", "model": "id-ID-ArdiNeural" }, { "code": "is", "language": "is-IS", "gender": "Female", "model": "is-IS-GudrunNeural" }, { "code": "it", "language": "it-IT", "gender": "Male", "model": "it-IT-DiegoNeural" }, { "code": "ja", "language": "ja-JP", "gender": "Female", "model": "ja-JP-NanamiNeural" }, { "code": "kk", "language": "kk-KZ", "gender": "Female", "model": "kk-KZ-AigulNeural" }, { "code": "km", "language": "km-KH", "gender": "Female", "model": "km-KH-SreymomNeural" }, { "code": "kn", "language": "kn-IN", "gender": "Female", "model": "kn-IN-SapnaNeural" }, { "code": "ko", "language": "ko-KR", "gender": "Female", "model": "ko-KR-SunHiNeural" }, { "code": "lo", "language": "lo-LA", "gender": "Female", "model": "lo-LA-KeomanyNeural" }, { "code": "lv", "language": "lv-LV", "gender": "Female", "model": "lv-LV-EveritaNeural" }, { "code": "lt", "language": "lt-LT", "gender": "Female", "model": "lt-LT-OnaNeural" }, { "code": "mk", "language": "mk-MK", "gender": "Female", "model": "mk-MK-MarijaNeural" }, { "code": "ml", "language": "ml-IN", "gender": "Female", "model": "ml-IN-SobhanaNeural" }, { "code": "mr", "language": "mr-IN", "gender": "Female", "model": "mr-IN-AarohiNeural" }, { "code": "ms", "language": "ms-MY", "gender": "Male", "model": "ms-MY-OsmanNeural" }, { "code": "mt", "language": "mt-MT", "gender": "Female", "model": "mt-MT-GraceNeural" }, { "code": "my", "language": "my-MM", "gender": "Female", "model": "my-MM-NilarNeural" }, { "code": "nl", "language": "nl-NL", "gender": "Female", "model": "nl-NL-ColetteNeural" }, { "code": "nb", "language": "nb-NO", "gender": "Female", "model": "nb-NO-PernilleNeural" }, { "code": "pl", "language": "pl-PL", "gender": "Female", "model": "pl-PL-ZofiaNeural" }, { "code": "ps", "language": "ps-AF", "gender": "Female", "model": "ps-AF-LatifaNeural" }, { "code": "pt", "language": "pt-BR", "gender": "Female", "model": "pt-BR-FranciscaNeural" }, { "code": "pt-pt", "language": "pt-PT", "gender": "Female", "model": "pt-PT-FernandaNeural" }, { "code": "ro", "language": "ro-RO", "gender": "Male", "model": "ro-RO-EmilNeural" }, { "code": "ru", "language": "ru-RU", "gender": "Female", "model": "ru-RU-DariyaNeural" }, { "code": "sk", "language": "sk-SK", "gender": "Male", "model": "sk-SK-LukasNeural" }, { "code": "sl", "language": "sl-SI", "gender": "Male", "model": "sl-SI-RokNeural" }, { "code": "sr-cyrl", "language": "sr-RS", "gender": "Female", "model": "sr-RS-SophieNeural" }, { "code": "sv", "language": "sv-SE", "gender": "Female", "model": "sv-SE-SofieNeural" }, { "code": "ta", "language": "ta-IN", "gender": "Female", "model": "ta-IN-PallaviNeural" }, { "code": "te", "language": "te-IN", "gender": "Male", "model": "te-IN-ShrutiNeural" }, { "code": "th", "language": "th-TH", "gender": "Male", "model": "th-TH-NiwatNeural" }, { "code": "tr", "language": "tr-TR", "gender": "Female", "model": "tr-TR-EmelNeural" }, { "code": "uk", "language": "uk-UA", "gender": "Female", "model": "uk-UA-PolinaNeural" }, { "code": "ur", "language": "ur-IN", "gender": "Female", "model": "ur-IN-GulNeural" }, { "code": "uz", "language": "uz-UZ", "gender": "Female", "model": "uz-UZ-MadinaNeural" }, { "code": "vi", "language": "vi-VN", "gender": "Male", "model": "vi-VN-NamMinhNeural" }, { "code": "zh-hans", "language": "zh-CN", "gender": "Female", "model": "zh-CN-XiaoxiaoNeural" }, { "code": "zh-hant", "language": "zh-CN", "gender": "Female", "model": "zh-CN-XiaoxiaoNeural" }, { "code": "yue", "language": "zh-HK", "gender": "Female", "model": "zh-HK-HiuGaaiNeural" }];
const YANDEX_LANGUAGE = ['af', 'am', 'ar', 'az', 'ba', 'be', 'bg', 'bn', 'bs', 'ca', 'ceb', 'cs', 'cv', 'cy', 'da', 'de', 'el', 'emj', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'ga', 'gd', 'gl', 'gu', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'jv', 'ka', 'kazlat', 'kk', 'km', 'kn', 'ko', 'ky', 'la', 'lb', 'lo', 'lt', 'lv', 'mg', 'mhr', 'mi', 'mk', 'ml', 'mn', 'mr', 'mrj', 'ms', 'mt', 'my', 'ne', 'nl', 'no', 'pa', 'pap', 'pl', 'pt', 'ro', 'ru', 'sah', 'si', 'sjn', 'sk', 'sl', 'sq', 'sr', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'tl', 'tr', 'tt', 'udm', 'uk', 'ur', 'uz', 'uzbcyr', 'vi', 'xh', 'yi', 'zh', 'zu'];
const DEEPL_LANGUAGE = ['ar', 'bg', 'cs', 'da', 'de', 'el', 'en', 'en-gb', 'en-us', 'es', 'et', 'fi', 'fr', 'ga', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ko', 'lt', 'lv', 'mt', 'nb', 'nl', 'no', 'pl', 'pt', 'pt-br', 'pt-pt', 'ro', 'ru', 'sk', 'sl', 'sv', 'tr', 'uk', 'zh'];
const SOGOU_LANGUAGE = ['ar', 'pl', 'da', 'de', 'ru', 'fr', 'fi', 'ko', 'nl', 'cs', 'pt', 'ja', 'sv', 'th', 'tr', 'es', 'hu', 'en', 'it', 'vi', 'zh-CHS'];

const getId = () => cryptoHandle.getRandomValues(new Uint32Array(1))[0];
const DeepL = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #DeepL ');
    }
    if (!SupportedLanguage(DEEPL_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(DEEPL_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #DeepL ');
    }
    //{"jsonrpc":"2.0","method": "LMT_handle_texts","params":{"texts":[{"text":"[Schoolgirl Strikers: Animation Channel]"}],"splitting":"newlines","lang":{"target_lang":"ZH","source_lang_user_selected":"auto","preference":{"weight":{}}},"timestamp":0},"id":0}
    const realTimeStamp = Number(new Date());
    const i_count = (text instanceof Array ? text.join('') : text).split('i').length;
    const id = getId(); // + 1
    const postBody = JSON.stringify({
        jsonrpc: '2.0',
        method: 'LMT_handle_texts',
        params: {
            texts: text instanceof Array ? text.map((x) => ({ text: x })) : [{ text }],
            lang: {
                target_lang: (target || 'en').toUpperCase(),
                source_lang_user_selected: source
            },
            timestamp: realTimeStamp - (realTimeStamp % i_count) + i_count
        },
        id
    }).replace('"method":"', (id + 3) % 13 === 0 || (id + 5) % 29 === 0 ? '"method" : "' : '"method": "');
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://www2.deepl.com/jsonrpc?client=chrome-extension,1.1.1', postBody, {
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        })
            .then((response) => {
            resolve(raw ? response.data : response.data.result.texts.map((x) => x.text).join('\n'));
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};

const GoogleTranslate = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #GoogleTranslate ');
    }
    if (!SupportedLanguage(GOOGLE_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(GOOGLE_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #GoogleTranslate ');
    }
    if (Array.isArray(text)) {
        text = text.join('\n');
    }
    // thanks https://codeberg.org/aryak/libmozhi/src/branch/master/engines.go#L52
    if (!ext.legacy === false) {
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .post('https://translate.google.com/_/TranslateWebserverUi/data/batchexecute', new URLSearchParams({
                'f.req': JSON.stringify([[['MkEWBc', JSON.stringify([[text, source, target, 1], []]), null, 'generic']]])
            }).toString())
                .then((response) => {
                if (raw && !ext.raw_json) {
                    resolve(response.data);
                }
                // try to parse content
                const splitedResponse = response.data.split('\n');
                let tmpData = '';
                for (let index in splitedResponse) {
                    const i = Number(index);
                    if (!isNaN(splitedResponse[i]) && i < splitedResponse.length - 1 && splitedResponse[i + 1].startsWith('[')) {
                        tmpData = splitedResponse[i + 1];
                        break;
                    }
                }
                resolve(raw && ext.raw_json ? JSON.parse(tmpData) : (JSON.parse(JSON.parse(tmpData)[0][2])[1][0][0][5] || []).map((content) => content[0]).join(''));
            })
                .catch((e) => {
                console.log(e);
                reject(raw ? e : e.toString());
            });
        });
    }
    else {
        const query = new URLSearchParams({
            client: 'webapp',
            sl: source,
            tl: target || 'en',
            hl: target || 'en',
            dt: 't',
            clearbtn: '1',
            otf: '1',
            pc: '1',
            ssel: '0',
            tsel: '0',
            kc: '2',
            tk: '',
            q: text
        });
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .get('https://translate.google.com/translate_a/single?' + 'dt=at&dt=bd&dt=ex&dt=md&dt=rw&dt=ss&dt=rm&' + query.toString(), {
                headers: {
                    referer: 'https://translate.google.com/',
                    authority: 'translate.google.com'
                }
            })
                .then((response) => {
                if (response.data && Array.isArray(response.data[0])) {
                    resolve(raw
                        ? response.data
                        : response.data[0]
                            .filter((translate) => translate)
                            .map((translate) => translate[0])
                            .join(''));
                    //resolve(response.data[0].filter(translate => translate).map(translate => translate[0]).join(''))
                }
                reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
            })
                .catch((e) => {
                reject(raw ? e : e.toString());
            });
        });
    }
};
const GoogleBrowserTranslate = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #GoogleTranslate ');
    }
    if (!SupportedLanguage(GOOGLE_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(GOOGLE_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #GoogleTranslate ');
    }
    //curl 'https://translate.googleapis.com/translate_a/t?anno=3&client=wt_lib&format=html&v=1.0&key&sl=auto&tl=zh&tc=1&sr=1&tk=164775.366094&mode=1' --data-raw 'q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF' --compressed
    //https://vielhuber.de/zh-cn/blog-zh-cn/google-translation-api-hacking/
    let query = new URLSearchParams({
        anno: '4',
        client: 'te_lib',
        format: 'html',
        v: '1.0',
        key: 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw',
        sl: source,
        tl: target || 'en',
        tc: '1',
        sr: '1',
        tk: GoogleTranslateTk(text),
        mode: '1'
    });
    //let formData = new URLSearchParams({q: text})
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://translate.googleapis.com/translate_a/t?' + query.toString(), 'q=' + (text instanceof Array ? text.map((x) => encodeURIComponent(x)).join('&q=') : encodeURIComponent(text)))
            .then((response) => {
            if (response.data && response.data instanceof Array) {
                resolve(raw ? response.data : response.data.map((x) => (Array.isArray(x) ? x?.[0] || '' : x || '')).join('\n'));
            }
            reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};
const GoogleBrowserTranslateV2 = async (text = '', source = 'en', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #GoogleTranslate ');
    }
    if (source === 'auto' || !SupportedLanguage(GOOGLE_LANGUAGE, target || 'en') || !SupportedLanguage(GOOGLE_LANGUAGE, source || 'en')) {
        return Promise.reject('Unsupported target language #GoogleTranslate ');
    }
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw', {
            q: Array.isArray(text) ? text.join('\n') : text,
            source,
            target,
            format: 'text'
        })
            .then((response) => {
            if (response.data && response.data?.data?.translations instanceof Array) {
                resolve(raw ? response.data : response.data.data.translations.map((x) => x?.translatedText || '').join('\n'));
            }
            reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};
const hl = function (a, b) {
    let c = 0;
    for (; c < b.length - 2; c += 3) {
        let d = b.charAt(c + 2);
        d = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d);
        d = '+' == b.charAt(c + 1) ? a >>> d : a << d;
        a = '+' == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
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
                charCodeList[charCodeListIndex++] = (charCode >> 6) | 192;
            }
            else {
                if (55296 == (charCode & 64512) && index + 1 < text.length && 56320 == (text.charCodeAt(index + 1) & 64512)) {
                    charCode = 65536 + ((charCode & 1023) << 10) + (text.charCodeAt(++index) & 1023);
                    charCodeList[charCodeListIndex++] = (charCode >> 18) | 240;
                    charCodeList[charCodeListIndex++] = ((charCode >> 12) & 63) | 128;
                }
                else {
                    charCodeList[charCodeListIndex++] = (charCode >> 12) | 224;
                }
                charCodeList[charCodeListIndex++] = ((charCode >> 6) & 63) | 128;
            }
            charCodeList[charCodeListIndex++] = (charCode & 63) | 128;
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
    a %= 1e6;
    return a.toString() + '.' + (a ^ tkk[0]);
};
const GoogleTTS = async (lang = 'en', text = '', ext = {}) => {
    try {
        text = Array.isArray(text) ? text.join('\n') : text;
        const response = await axiosFetch.get('https://translate.googleapis.com/translate_tts?' +
            new URLSearchParams({
                //tk: GoogleTranslateTk(text),
                client: 'tw-ob',
                q: text,
                tl: lang,
                ttsspeed: '0.8' // unused
            }).toString(), { responseType: 'arraybuffer' });
        return {
            buffer: response.data,
            content_length: response.data?.byteLength || response.data?.length || 0,
            content_type: ((Array.isArray(response.headers['content-type']) ? response.headers['content-type'].join(' ') : response.headers['content-type']) || '').split(';')[0]
        };
    }
    catch {
        return { buffer: new Uint8Array().buffer, content_type: '', content_length: 0 };
    }
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var bufferUtil = {exports: {}};

var constants;
var hasRequiredConstants;
function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	const BINARY_TYPES = ['nodebuffer', 'arraybuffer', 'fragments'];
	const hasBlob = typeof Blob !== 'undefined';
	if (hasBlob) BINARY_TYPES.push('blob');
	constants = {
	  BINARY_TYPES,
	  EMPTY_BUFFER: Buffer.alloc(0),
	  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
	  hasBlob,
	  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
	  kListener: Symbol('kListener'),
	  kStatusCode: Symbol('status-code'),
	  kWebSocket: Symbol('websocket'),
	  NOOP: () => {}
	};
	return constants;
}

var hasRequiredBufferUtil;
function requireBufferUtil () {
	if (hasRequiredBufferUtil) return bufferUtil.exports;
	hasRequiredBufferUtil = 1;
	const { EMPTY_BUFFER } = requireConstants();
	const FastBuffer = Buffer[Symbol.species];
	function concat(list, totalLength) {
	  if (list.length === 0) return EMPTY_BUFFER;
	  if (list.length === 1) return list[0];
	  const target = Buffer.allocUnsafe(totalLength);
	  let offset = 0;
	  for (let i = 0; i < list.length; i++) {
	    const buf = list[i];
	    target.set(buf, offset);
	    offset += buf.length;
	  }
	  if (offset < totalLength) {
	    return new FastBuffer(target.buffer, target.byteOffset, offset);
	  }
	  return target;
	}
	function _mask(source, mask, output, offset, length) {
	  for (let i = 0; i < length; i++) {
	    output[offset + i] = source[i] ^ mask[i & 3];
	  }
	}
	function _unmask(buffer, mask) {
	  for (let i = 0; i < buffer.length; i++) {
	    buffer[i] ^= mask[i & 3];
	  }
	}
	function toArrayBuffer(buf) {
	  if (buf.length === buf.buffer.byteLength) {
	    return buf.buffer;
	  }
	  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
	}
	function toBuffer(data) {
	  toBuffer.readOnly = true;
	  if (Buffer.isBuffer(data)) return data;
	  let buf;
	  if (data instanceof ArrayBuffer) {
	    buf = new FastBuffer(data);
	  } else if (ArrayBuffer.isView(data)) {
	    buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
	  } else {
	    buf = Buffer.from(data);
	    toBuffer.readOnly = false;
	  }
	  return buf;
	}
	bufferUtil.exports = {
	  concat,
	  mask: _mask,
	  toArrayBuffer,
	  toBuffer,
	  unmask: _unmask
	};
	if (!process.env.WS_NO_BUFFER_UTIL) {
	  try {
	    const bufferUtil$1 = require('bufferutil');
	    bufferUtil.exports.mask = function (source, mask, output, offset, length) {
	      if (length < 48) _mask(source, mask, output, offset, length);
	      else bufferUtil$1.mask(source, mask, output, offset, length);
	    };
	    bufferUtil.exports.unmask = function (buffer, mask) {
	      if (buffer.length < 32) _unmask(buffer, mask);
	      else bufferUtil$1.unmask(buffer, mask);
	    };
	  } catch (e) {
	  }
	}
	return bufferUtil.exports;
}

var limiter;
var hasRequiredLimiter;
function requireLimiter () {
	if (hasRequiredLimiter) return limiter;
	hasRequiredLimiter = 1;
	const kDone = Symbol('kDone');
	const kRun = Symbol('kRun');
	class Limiter {
	  constructor(concurrency) {
	    this[kDone] = () => {
	      this.pending--;
	      this[kRun]();
	    };
	    this.concurrency = concurrency || Infinity;
	    this.jobs = [];
	    this.pending = 0;
	  }
	  add(job) {
	    this.jobs.push(job);
	    this[kRun]();
	  }
	  [kRun]() {
	    if (this.pending === this.concurrency) return;
	    if (this.jobs.length) {
	      const job = this.jobs.shift();
	      this.pending++;
	      job(this[kDone]);
	    }
	  }
	}
	limiter = Limiter;
	return limiter;
}

var permessageDeflate;
var hasRequiredPermessageDeflate;
function requirePermessageDeflate () {
	if (hasRequiredPermessageDeflate) return permessageDeflate;
	hasRequiredPermessageDeflate = 1;
	const zlib = require$$0;
	const bufferUtil = requireBufferUtil();
	const Limiter = requireLimiter();
	const { kStatusCode } = requireConstants();
	const FastBuffer = Buffer[Symbol.species];
	const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
	const kPerMessageDeflate = Symbol('permessage-deflate');
	const kTotalLength = Symbol('total-length');
	const kCallback = Symbol('callback');
	const kBuffers = Symbol('buffers');
	const kError = Symbol('error');
	let zlibLimiter;
	class PerMessageDeflate {
	  constructor(options, isServer, maxPayload) {
	    this._maxPayload = maxPayload | 0;
	    this._options = options || {};
	    this._threshold =
	      this._options.threshold !== undefined ? this._options.threshold : 1024;
	    this._isServer = !!isServer;
	    this._deflate = null;
	    this._inflate = null;
	    this.params = null;
	    if (!zlibLimiter) {
	      const concurrency =
	        this._options.concurrencyLimit !== undefined
	          ? this._options.concurrencyLimit
	          : 10;
	      zlibLimiter = new Limiter(concurrency);
	    }
	  }
	  static get extensionName() {
	    return 'permessage-deflate';
	  }
	  offer() {
	    const params = {};
	    if (this._options.serverNoContextTakeover) {
	      params.server_no_context_takeover = true;
	    }
	    if (this._options.clientNoContextTakeover) {
	      params.client_no_context_takeover = true;
	    }
	    if (this._options.serverMaxWindowBits) {
	      params.server_max_window_bits = this._options.serverMaxWindowBits;
	    }
	    if (this._options.clientMaxWindowBits) {
	      params.client_max_window_bits = this._options.clientMaxWindowBits;
	    } else if (this._options.clientMaxWindowBits == null) {
	      params.client_max_window_bits = true;
	    }
	    return params;
	  }
	  accept(configurations) {
	    configurations = this.normalizeParams(configurations);
	    this.params = this._isServer
	      ? this.acceptAsServer(configurations)
	      : this.acceptAsClient(configurations);
	    return this.params;
	  }
	  cleanup() {
	    if (this._inflate) {
	      this._inflate.close();
	      this._inflate = null;
	    }
	    if (this._deflate) {
	      const callback = this._deflate[kCallback];
	      this._deflate.close();
	      this._deflate = null;
	      if (callback) {
	        callback(
	          new Error(
	            'The deflate stream was closed while data was being processed'
	          )
	        );
	      }
	    }
	  }
	  acceptAsServer(offers) {
	    const opts = this._options;
	    const accepted = offers.find((params) => {
	      if (
	        (opts.serverNoContextTakeover === false &&
	          params.server_no_context_takeover) ||
	        (params.server_max_window_bits &&
	          (opts.serverMaxWindowBits === false ||
	            (typeof opts.serverMaxWindowBits === 'number' &&
	              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
	        (typeof opts.clientMaxWindowBits === 'number' &&
	          !params.client_max_window_bits)
	      ) {
	        return false;
	      }
	      return true;
	    });
	    if (!accepted) {
	      throw new Error('None of the extension offers can be accepted');
	    }
	    if (opts.serverNoContextTakeover) {
	      accepted.server_no_context_takeover = true;
	    }
	    if (opts.clientNoContextTakeover) {
	      accepted.client_no_context_takeover = true;
	    }
	    if (typeof opts.serverMaxWindowBits === 'number') {
	      accepted.server_max_window_bits = opts.serverMaxWindowBits;
	    }
	    if (typeof opts.clientMaxWindowBits === 'number') {
	      accepted.client_max_window_bits = opts.clientMaxWindowBits;
	    } else if (
	      accepted.client_max_window_bits === true ||
	      opts.clientMaxWindowBits === false
	    ) {
	      delete accepted.client_max_window_bits;
	    }
	    return accepted;
	  }
	  acceptAsClient(response) {
	    const params = response[0];
	    if (
	      this._options.clientNoContextTakeover === false &&
	      params.client_no_context_takeover
	    ) {
	      throw new Error('Unexpected parameter "client_no_context_takeover"');
	    }
	    if (!params.client_max_window_bits) {
	      if (typeof this._options.clientMaxWindowBits === 'number') {
	        params.client_max_window_bits = this._options.clientMaxWindowBits;
	      }
	    } else if (
	      this._options.clientMaxWindowBits === false ||
	      (typeof this._options.clientMaxWindowBits === 'number' &&
	        params.client_max_window_bits > this._options.clientMaxWindowBits)
	    ) {
	      throw new Error(
	        'Unexpected or invalid parameter "client_max_window_bits"'
	      );
	    }
	    return params;
	  }
	  normalizeParams(configurations) {
	    configurations.forEach((params) => {
	      Object.keys(params).forEach((key) => {
	        let value = params[key];
	        if (value.length > 1) {
	          throw new Error(`Parameter "${key}" must have only a single value`);
	        }
	        value = value[0];
	        if (key === 'client_max_window_bits') {
	          if (value !== true) {
	            const num = +value;
	            if (!Number.isInteger(num) || num < 8 || num > 15) {
	              throw new TypeError(
	                `Invalid value for parameter "${key}": ${value}`
	              );
	            }
	            value = num;
	          } else if (!this._isServer) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	        } else if (key === 'server_max_window_bits') {
	          const num = +value;
	          if (!Number.isInteger(num) || num < 8 || num > 15) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	          value = num;
	        } else if (
	          key === 'client_no_context_takeover' ||
	          key === 'server_no_context_takeover'
	        ) {
	          if (value !== true) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	        } else {
	          throw new Error(`Unknown parameter "${key}"`);
	        }
	        params[key] = value;
	      });
	    });
	    return configurations;
	  }
	  decompress(data, fin, callback) {
	    zlibLimiter.add((done) => {
	      this._decompress(data, fin, (err, result) => {
	        done();
	        callback(err, result);
	      });
	    });
	  }
	  compress(data, fin, callback) {
	    zlibLimiter.add((done) => {
	      this._compress(data, fin, (err, result) => {
	        done();
	        callback(err, result);
	      });
	    });
	  }
	  _decompress(data, fin, callback) {
	    const endpoint = this._isServer ? 'client' : 'server';
	    if (!this._inflate) {
	      const key = `${endpoint}_max_window_bits`;
	      const windowBits =
	        typeof this.params[key] !== 'number'
	          ? zlib.Z_DEFAULT_WINDOWBITS
	          : this.params[key];
	      this._inflate = zlib.createInflateRaw({
	        ...this._options.zlibInflateOptions,
	        windowBits
	      });
	      this._inflate[kPerMessageDeflate] = this;
	      this._inflate[kTotalLength] = 0;
	      this._inflate[kBuffers] = [];
	      this._inflate.on('error', inflateOnError);
	      this._inflate.on('data', inflateOnData);
	    }
	    this._inflate[kCallback] = callback;
	    this._inflate.write(data);
	    if (fin) this._inflate.write(TRAILER);
	    this._inflate.flush(() => {
	      const err = this._inflate[kError];
	      if (err) {
	        this._inflate.close();
	        this._inflate = null;
	        callback(err);
	        return;
	      }
	      const data = bufferUtil.concat(
	        this._inflate[kBuffers],
	        this._inflate[kTotalLength]
	      );
	      if (this._inflate._readableState.endEmitted) {
	        this._inflate.close();
	        this._inflate = null;
	      } else {
	        this._inflate[kTotalLength] = 0;
	        this._inflate[kBuffers] = [];
	        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
	          this._inflate.reset();
	        }
	      }
	      callback(null, data);
	    });
	  }
	  _compress(data, fin, callback) {
	    const endpoint = this._isServer ? 'server' : 'client';
	    if (!this._deflate) {
	      const key = `${endpoint}_max_window_bits`;
	      const windowBits =
	        typeof this.params[key] !== 'number'
	          ? zlib.Z_DEFAULT_WINDOWBITS
	          : this.params[key];
	      this._deflate = zlib.createDeflateRaw({
	        ...this._options.zlibDeflateOptions,
	        windowBits
	      });
	      this._deflate[kTotalLength] = 0;
	      this._deflate[kBuffers] = [];
	      this._deflate.on('data', deflateOnData);
	    }
	    this._deflate[kCallback] = callback;
	    this._deflate.write(data);
	    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
	      if (!this._deflate) {
	        return;
	      }
	      let data = bufferUtil.concat(
	        this._deflate[kBuffers],
	        this._deflate[kTotalLength]
	      );
	      if (fin) {
	        data = new FastBuffer(data.buffer, data.byteOffset, data.length - 4);
	      }
	      this._deflate[kCallback] = null;
	      this._deflate[kTotalLength] = 0;
	      this._deflate[kBuffers] = [];
	      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
	        this._deflate.reset();
	      }
	      callback(null, data);
	    });
	  }
	}
	permessageDeflate = PerMessageDeflate;
	function deflateOnData(chunk) {
	  this[kBuffers].push(chunk);
	  this[kTotalLength] += chunk.length;
	}
	function inflateOnData(chunk) {
	  this[kTotalLength] += chunk.length;
	  if (
	    this[kPerMessageDeflate]._maxPayload < 1 ||
	    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
	  ) {
	    this[kBuffers].push(chunk);
	    return;
	  }
	  this[kError] = new RangeError('Max payload size exceeded');
	  this[kError].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
	  this[kError][kStatusCode] = 1009;
	  this.removeListener('data', inflateOnData);
	  this.reset();
	}
	function inflateOnError(err) {
	  this[kPerMessageDeflate]._inflate = null;
	  err[kStatusCode] = 1007;
	  this[kCallback](err);
	}
	return permessageDeflate;
}

var validation = {exports: {}};

var hasRequiredValidation;
function requireValidation () {
	if (hasRequiredValidation) return validation.exports;
	hasRequiredValidation = 1;
	const { isUtf8 } = require$$0$1;
	const { hasBlob } = requireConstants();
	const tokenChars = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0
	];
	function isValidStatusCode(code) {
	  return (
	    (code >= 1000 &&
	      code <= 1014 &&
	      code !== 1004 &&
	      code !== 1005 &&
	      code !== 1006) ||
	    (code >= 3000 && code <= 4999)
	  );
	}
	function _isValidUTF8(buf) {
	  const len = buf.length;
	  let i = 0;
	  while (i < len) {
	    if ((buf[i] & 0x80) === 0) {
	      i++;
	    } else if ((buf[i] & 0xe0) === 0xc0) {
	      if (
	        i + 1 === len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i] & 0xfe) === 0xc0
	      ) {
	        return false;
	      }
	      i += 2;
	    } else if ((buf[i] & 0xf0) === 0xe0) {
	      if (
	        i + 2 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) ||
	        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0)
	      ) {
	        return false;
	      }
	      i += 3;
	    } else if ((buf[i] & 0xf8) === 0xf0) {
	      if (
	        i + 3 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i + 3] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) ||
	        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
	        buf[i] > 0xf4
	      ) {
	        return false;
	      }
	      i += 4;
	    } else {
	      return false;
	    }
	  }
	  return true;
	}
	function isBlob(value) {
	  return (
	    hasBlob &&
	    typeof value === 'object' &&
	    typeof value.arrayBuffer === 'function' &&
	    typeof value.type === 'string' &&
	    typeof value.stream === 'function' &&
	    (value[Symbol.toStringTag] === 'Blob' ||
	      value[Symbol.toStringTag] === 'File')
	  );
	}
	validation.exports = {
	  isBlob,
	  isValidStatusCode,
	  isValidUTF8: _isValidUTF8,
	  tokenChars
	};
	if (isUtf8) {
	  validation.exports.isValidUTF8 = function (buf) {
	    return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
	  };
	}  else if (!process.env.WS_NO_UTF_8_VALIDATE) {
	  try {
	    const isValidUTF8 = require('utf-8-validate');
	    validation.exports.isValidUTF8 = function (buf) {
	      return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
	    };
	  } catch (e) {
	  }
	}
	return validation.exports;
}

var receiver;
var hasRequiredReceiver;
function requireReceiver () {
	if (hasRequiredReceiver) return receiver;
	hasRequiredReceiver = 1;
	const { Writable } = require$$0$2;
	const PerMessageDeflate = requirePermessageDeflate();
	const {
	  BINARY_TYPES,
	  EMPTY_BUFFER,
	  kStatusCode,
	  kWebSocket
	} = requireConstants();
	const { concat, toArrayBuffer, unmask } = requireBufferUtil();
	const { isValidStatusCode, isValidUTF8 } = requireValidation();
	const FastBuffer = Buffer[Symbol.species];
	const GET_INFO = 0;
	const GET_PAYLOAD_LENGTH_16 = 1;
	const GET_PAYLOAD_LENGTH_64 = 2;
	const GET_MASK = 3;
	const GET_DATA = 4;
	const INFLATING = 5;
	const DEFER_EVENT = 6;
	class Receiver extends Writable {
	  constructor(options = {}) {
	    super();
	    this._allowSynchronousEvents =
	      options.allowSynchronousEvents !== undefined
	        ? options.allowSynchronousEvents
	        : true;
	    this._binaryType = options.binaryType || BINARY_TYPES[0];
	    this._extensions = options.extensions || {};
	    this._isServer = !!options.isServer;
	    this._maxPayload = options.maxPayload | 0;
	    this._skipUTF8Validation = !!options.skipUTF8Validation;
	    this[kWebSocket] = undefined;
	    this._bufferedBytes = 0;
	    this._buffers = [];
	    this._compressed = false;
	    this._payloadLength = 0;
	    this._mask = undefined;
	    this._fragmented = 0;
	    this._masked = false;
	    this._fin = false;
	    this._opcode = 0;
	    this._totalPayloadLength = 0;
	    this._messageLength = 0;
	    this._fragments = [];
	    this._errored = false;
	    this._loop = false;
	    this._state = GET_INFO;
	  }
	  _write(chunk, encoding, cb) {
	    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();
	    this._bufferedBytes += chunk.length;
	    this._buffers.push(chunk);
	    this.startLoop(cb);
	  }
	  consume(n) {
	    this._bufferedBytes -= n;
	    if (n === this._buffers[0].length) return this._buffers.shift();
	    if (n < this._buffers[0].length) {
	      const buf = this._buffers[0];
	      this._buffers[0] = new FastBuffer(
	        buf.buffer,
	        buf.byteOffset + n,
	        buf.length - n
	      );
	      return new FastBuffer(buf.buffer, buf.byteOffset, n);
	    }
	    const dst = Buffer.allocUnsafe(n);
	    do {
	      const buf = this._buffers[0];
	      const offset = dst.length - n;
	      if (n >= buf.length) {
	        dst.set(this._buffers.shift(), offset);
	      } else {
	        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
	        this._buffers[0] = new FastBuffer(
	          buf.buffer,
	          buf.byteOffset + n,
	          buf.length - n
	        );
	      }
	      n -= buf.length;
	    } while (n > 0);
	    return dst;
	  }
	  startLoop(cb) {
	    this._loop = true;
	    do {
	      switch (this._state) {
	        case GET_INFO:
	          this.getInfo(cb);
	          break;
	        case GET_PAYLOAD_LENGTH_16:
	          this.getPayloadLength16(cb);
	          break;
	        case GET_PAYLOAD_LENGTH_64:
	          this.getPayloadLength64(cb);
	          break;
	        case GET_MASK:
	          this.getMask();
	          break;
	        case GET_DATA:
	          this.getData(cb);
	          break;
	        case INFLATING:
	        case DEFER_EVENT:
	          this._loop = false;
	          return;
	      }
	    } while (this._loop);
	    if (!this._errored) cb();
	  }
	  getInfo(cb) {
	    if (this._bufferedBytes < 2) {
	      this._loop = false;
	      return;
	    }
	    const buf = this.consume(2);
	    if ((buf[0] & 0x30) !== 0x00) {
	      const error = this.createError(
	        RangeError,
	        'RSV2 and RSV3 must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_RSV_2_3'
	      );
	      cb(error);
	      return;
	    }
	    const compressed = (buf[0] & 0x40) === 0x40;
	    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
	      const error = this.createError(
	        RangeError,
	        'RSV1 must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_RSV_1'
	      );
	      cb(error);
	      return;
	    }
	    this._fin = (buf[0] & 0x80) === 0x80;
	    this._opcode = buf[0] & 0x0f;
	    this._payloadLength = buf[1] & 0x7f;
	    if (this._opcode === 0x00) {
	      if (compressed) {
	        const error = this.createError(
	          RangeError,
	          'RSV1 must be clear',
	          true,
	          1002,
	          'WS_ERR_UNEXPECTED_RSV_1'
	        );
	        cb(error);
	        return;
	      }
	      if (!this._fragmented) {
	        const error = this.createError(
	          RangeError,
	          'invalid opcode 0',
	          true,
	          1002,
	          'WS_ERR_INVALID_OPCODE'
	        );
	        cb(error);
	        return;
	      }
	      this._opcode = this._fragmented;
	    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
	      if (this._fragmented) {
	        const error = this.createError(
	          RangeError,
	          `invalid opcode ${this._opcode}`,
	          true,
	          1002,
	          'WS_ERR_INVALID_OPCODE'
	        );
	        cb(error);
	        return;
	      }
	      this._compressed = compressed;
	    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
	      if (!this._fin) {
	        const error = this.createError(
	          RangeError,
	          'FIN must be set',
	          true,
	          1002,
	          'WS_ERR_EXPECTED_FIN'
	        );
	        cb(error);
	        return;
	      }
	      if (compressed) {
	        const error = this.createError(
	          RangeError,
	          'RSV1 must be clear',
	          true,
	          1002,
	          'WS_ERR_UNEXPECTED_RSV_1'
	        );
	        cb(error);
	        return;
	      }
	      if (
	        this._payloadLength > 0x7d ||
	        (this._opcode === 0x08 && this._payloadLength === 1)
	      ) {
	        const error = this.createError(
	          RangeError,
	          `invalid payload length ${this._payloadLength}`,
	          true,
	          1002,
	          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
	        );
	        cb(error);
	        return;
	      }
	    } else {
	      const error = this.createError(
	        RangeError,
	        `invalid opcode ${this._opcode}`,
	        true,
	        1002,
	        'WS_ERR_INVALID_OPCODE'
	      );
	      cb(error);
	      return;
	    }
	    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
	    this._masked = (buf[1] & 0x80) === 0x80;
	    if (this._isServer) {
	      if (!this._masked) {
	        const error = this.createError(
	          RangeError,
	          'MASK must be set',
	          true,
	          1002,
	          'WS_ERR_EXPECTED_MASK'
	        );
	        cb(error);
	        return;
	      }
	    } else if (this._masked) {
	      const error = this.createError(
	        RangeError,
	        'MASK must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_MASK'
	      );
	      cb(error);
	      return;
	    }
	    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
	    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
	    else this.haveLength(cb);
	  }
	  getPayloadLength16(cb) {
	    if (this._bufferedBytes < 2) {
	      this._loop = false;
	      return;
	    }
	    this._payloadLength = this.consume(2).readUInt16BE(0);
	    this.haveLength(cb);
	  }
	  getPayloadLength64(cb) {
	    if (this._bufferedBytes < 8) {
	      this._loop = false;
	      return;
	    }
	    const buf = this.consume(8);
	    const num = buf.readUInt32BE(0);
	    if (num > Math.pow(2, 53 - 32) - 1) {
	      const error = this.createError(
	        RangeError,
	        'Unsupported WebSocket frame: payload length > 2^53 - 1',
	        false,
	        1009,
	        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
	      );
	      cb(error);
	      return;
	    }
	    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
	    this.haveLength(cb);
	  }
	  haveLength(cb) {
	    if (this._payloadLength && this._opcode < 0x08) {
	      this._totalPayloadLength += this._payloadLength;
	      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
	        const error = this.createError(
	          RangeError,
	          'Max payload size exceeded',
	          false,
	          1009,
	          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
	        );
	        cb(error);
	        return;
	      }
	    }
	    if (this._masked) this._state = GET_MASK;
	    else this._state = GET_DATA;
	  }
	  getMask() {
	    if (this._bufferedBytes < 4) {
	      this._loop = false;
	      return;
	    }
	    this._mask = this.consume(4);
	    this._state = GET_DATA;
	  }
	  getData(cb) {
	    let data = EMPTY_BUFFER;
	    if (this._payloadLength) {
	      if (this._bufferedBytes < this._payloadLength) {
	        this._loop = false;
	        return;
	      }
	      data = this.consume(this._payloadLength);
	      if (
	        this._masked &&
	        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
	      ) {
	        unmask(data, this._mask);
	      }
	    }
	    if (this._opcode > 0x07) {
	      this.controlMessage(data, cb);
	      return;
	    }
	    if (this._compressed) {
	      this._state = INFLATING;
	      this.decompress(data, cb);
	      return;
	    }
	    if (data.length) {
	      this._messageLength = this._totalPayloadLength;
	      this._fragments.push(data);
	    }
	    this.dataMessage(cb);
	  }
	  decompress(data, cb) {
	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
	    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
	      if (err) return cb(err);
	      if (buf.length) {
	        this._messageLength += buf.length;
	        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
	          const error = this.createError(
	            RangeError,
	            'Max payload size exceeded',
	            false,
	            1009,
	            'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
	          );
	          cb(error);
	          return;
	        }
	        this._fragments.push(buf);
	      }
	      this.dataMessage(cb);
	      if (this._state === GET_INFO) this.startLoop(cb);
	    });
	  }
	  dataMessage(cb) {
	    if (!this._fin) {
	      this._state = GET_INFO;
	      return;
	    }
	    const messageLength = this._messageLength;
	    const fragments = this._fragments;
	    this._totalPayloadLength = 0;
	    this._messageLength = 0;
	    this._fragmented = 0;
	    this._fragments = [];
	    if (this._opcode === 2) {
	      let data;
	      if (this._binaryType === 'nodebuffer') {
	        data = concat(fragments, messageLength);
	      } else if (this._binaryType === 'arraybuffer') {
	        data = toArrayBuffer(concat(fragments, messageLength));
	      } else if (this._binaryType === 'blob') {
	        data = new Blob(fragments);
	      } else {
	        data = fragments;
	      }
	      if (this._allowSynchronousEvents) {
	        this.emit('message', data, true);
	        this._state = GET_INFO;
	      } else {
	        this._state = DEFER_EVENT;
	        setImmediate(() => {
	          this.emit('message', data, true);
	          this._state = GET_INFO;
	          this.startLoop(cb);
	        });
	      }
	    } else {
	      const buf = concat(fragments, messageLength);
	      if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
	        const error = this.createError(
	          Error,
	          'invalid UTF-8 sequence',
	          true,
	          1007,
	          'WS_ERR_INVALID_UTF8'
	        );
	        cb(error);
	        return;
	      }
	      if (this._state === INFLATING || this._allowSynchronousEvents) {
	        this.emit('message', buf, false);
	        this._state = GET_INFO;
	      } else {
	        this._state = DEFER_EVENT;
	        setImmediate(() => {
	          this.emit('message', buf, false);
	          this._state = GET_INFO;
	          this.startLoop(cb);
	        });
	      }
	    }
	  }
	  controlMessage(data, cb) {
	    if (this._opcode === 0x08) {
	      if (data.length === 0) {
	        this._loop = false;
	        this.emit('conclude', 1005, EMPTY_BUFFER);
	        this.end();
	      } else {
	        const code = data.readUInt16BE(0);
	        if (!isValidStatusCode(code)) {
	          const error = this.createError(
	            RangeError,
	            `invalid status code ${code}`,
	            true,
	            1002,
	            'WS_ERR_INVALID_CLOSE_CODE'
	          );
	          cb(error);
	          return;
	        }
	        const buf = new FastBuffer(
	          data.buffer,
	          data.byteOffset + 2,
	          data.length - 2
	        );
	        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
	          const error = this.createError(
	            Error,
	            'invalid UTF-8 sequence',
	            true,
	            1007,
	            'WS_ERR_INVALID_UTF8'
	          );
	          cb(error);
	          return;
	        }
	        this._loop = false;
	        this.emit('conclude', code, buf);
	        this.end();
	      }
	      this._state = GET_INFO;
	      return;
	    }
	    if (this._allowSynchronousEvents) {
	      this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
	      this._state = GET_INFO;
	    } else {
	      this._state = DEFER_EVENT;
	      setImmediate(() => {
	        this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
	        this._state = GET_INFO;
	        this.startLoop(cb);
	      });
	    }
	  }
	  createError(ErrorCtor, message, prefix, statusCode, errorCode) {
	    this._loop = false;
	    this._errored = true;
	    const err = new ErrorCtor(
	      prefix ? `Invalid WebSocket frame: ${message}` : message
	    );
	    Error.captureStackTrace(err, this.createError);
	    err.code = errorCode;
	    err[kStatusCode] = statusCode;
	    return err;
	  }
	}
	receiver = Receiver;
	return receiver;
}

requireReceiver();

var sender;
var hasRequiredSender;
function requireSender () {
	if (hasRequiredSender) return sender;
	hasRequiredSender = 1;
	const { randomFillSync } = crypto;
	const PerMessageDeflate = requirePermessageDeflate();
	const { EMPTY_BUFFER, kWebSocket, NOOP } = requireConstants();
	const { isBlob, isValidStatusCode } = requireValidation();
	const { mask: applyMask, toBuffer } = requireBufferUtil();
	const kByteLength = Symbol('kByteLength');
	const maskBuffer = Buffer.alloc(4);
	const RANDOM_POOL_SIZE = 8 * 1024;
	let randomPool;
	let randomPoolPointer = RANDOM_POOL_SIZE;
	const DEFAULT = 0;
	const DEFLATING = 1;
	const GET_BLOB_DATA = 2;
	class Sender {
	  constructor(socket, extensions, generateMask) {
	    this._extensions = extensions || {};
	    if (generateMask) {
	      this._generateMask = generateMask;
	      this._maskBuffer = Buffer.alloc(4);
	    }
	    this._socket = socket;
	    this._firstFragment = true;
	    this._compress = false;
	    this._bufferedBytes = 0;
	    this._queue = [];
	    this._state = DEFAULT;
	    this.onerror = NOOP;
	    this[kWebSocket] = undefined;
	  }
	  static frame(data, options) {
	    let mask;
	    let merge = false;
	    let offset = 2;
	    let skipMasking = false;
	    if (options.mask) {
	      mask = options.maskBuffer || maskBuffer;
	      if (options.generateMask) {
	        options.generateMask(mask);
	      } else {
	        if (randomPoolPointer === RANDOM_POOL_SIZE) {
	          if (randomPool === undefined) {
	            randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
	          }
	          randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
	          randomPoolPointer = 0;
	        }
	        mask[0] = randomPool[randomPoolPointer++];
	        mask[1] = randomPool[randomPoolPointer++];
	        mask[2] = randomPool[randomPoolPointer++];
	        mask[3] = randomPool[randomPoolPointer++];
	      }
	      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
	      offset = 6;
	    }
	    let dataLength;
	    if (typeof data === 'string') {
	      if (
	        (!options.mask || skipMasking) &&
	        options[kByteLength] !== undefined
	      ) {
	        dataLength = options[kByteLength];
	      } else {
	        data = Buffer.from(data);
	        dataLength = data.length;
	      }
	    } else {
	      dataLength = data.length;
	      merge = options.mask && options.readOnly && !skipMasking;
	    }
	    let payloadLength = dataLength;
	    if (dataLength >= 65536) {
	      offset += 8;
	      payloadLength = 127;
	    } else if (dataLength > 125) {
	      offset += 2;
	      payloadLength = 126;
	    }
	    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
	    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
	    if (options.rsv1) target[0] |= 0x40;
	    target[1] = payloadLength;
	    if (payloadLength === 126) {
	      target.writeUInt16BE(dataLength, 2);
	    } else if (payloadLength === 127) {
	      target[2] = target[3] = 0;
	      target.writeUIntBE(dataLength, 4, 6);
	    }
	    if (!options.mask) return [target, data];
	    target[1] |= 0x80;
	    target[offset - 4] = mask[0];
	    target[offset - 3] = mask[1];
	    target[offset - 2] = mask[2];
	    target[offset - 1] = mask[3];
	    if (skipMasking) return [target, data];
	    if (merge) {
	      applyMask(data, mask, target, offset, dataLength);
	      return [target];
	    }
	    applyMask(data, mask, data, 0, dataLength);
	    return [target, data];
	  }
	  close(code, data, mask, cb) {
	    let buf;
	    if (code === undefined) {
	      buf = EMPTY_BUFFER;
	    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
	      throw new TypeError('First argument must be a valid error code number');
	    } else if (data === undefined || !data.length) {
	      buf = Buffer.allocUnsafe(2);
	      buf.writeUInt16BE(code, 0);
	    } else {
	      const length = Buffer.byteLength(data);
	      if (length > 123) {
	        throw new RangeError('The message must not be greater than 123 bytes');
	      }
	      buf = Buffer.allocUnsafe(2 + length);
	      buf.writeUInt16BE(code, 0);
	      if (typeof data === 'string') {
	        buf.write(data, 2);
	      } else {
	        buf.set(data, 2);
	      }
	    }
	    const options = {
	      [kByteLength]: buf.length,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x08,
	      readOnly: false,
	      rsv1: false
	    };
	    if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, buf, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(buf, options), cb);
	    }
	  }
	  ping(data, mask, cb) {
	    let byteLength;
	    let readOnly;
	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }
	    if (byteLength > 125) {
	      throw new RangeError('The data size must not be greater than 125 bytes');
	    }
	    const options = {
	      [kByteLength]: byteLength,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x09,
	      readOnly,
	      rsv1: false
	    };
	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, false, options, cb]);
	      } else {
	        this.getBlobData(data, false, options, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(data, options), cb);
	    }
	  }
	  pong(data, mask, cb) {
	    let byteLength;
	    let readOnly;
	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }
	    if (byteLength > 125) {
	      throw new RangeError('The data size must not be greater than 125 bytes');
	    }
	    const options = {
	      [kByteLength]: byteLength,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x0a,
	      readOnly,
	      rsv1: false
	    };
	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, false, options, cb]);
	      } else {
	        this.getBlobData(data, false, options, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(data, options), cb);
	    }
	  }
	  send(data, options, cb) {
	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
	    let opcode = options.binary ? 2 : 1;
	    let rsv1 = options.compress;
	    let byteLength;
	    let readOnly;
	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }
	    if (this._firstFragment) {
	      this._firstFragment = false;
	      if (
	        rsv1 &&
	        perMessageDeflate &&
	        perMessageDeflate.params[
	          perMessageDeflate._isServer
	            ? 'server_no_context_takeover'
	            : 'client_no_context_takeover'
	        ]
	      ) {
	        rsv1 = byteLength >= perMessageDeflate._threshold;
	      }
	      this._compress = rsv1;
	    } else {
	      rsv1 = false;
	      opcode = 0;
	    }
	    if (options.fin) this._firstFragment = true;
	    const opts = {
	      [kByteLength]: byteLength,
	      fin: options.fin,
	      generateMask: this._generateMask,
	      mask: options.mask,
	      maskBuffer: this._maskBuffer,
	      opcode,
	      readOnly,
	      rsv1
	    };
	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
	      } else {
	        this.getBlobData(data, this._compress, opts, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, this._compress, opts, cb]);
	    } else {
	      this.dispatch(data, this._compress, opts, cb);
	    }
	  }
	  getBlobData(blob, compress, options, cb) {
	    this._bufferedBytes += options[kByteLength];
	    this._state = GET_BLOB_DATA;
	    blob
	      .arrayBuffer()
	      .then((arrayBuffer) => {
	        if (this._socket.destroyed) {
	          const err = new Error(
	            'The socket was closed while the blob was being read'
	          );
	          process.nextTick(callCallbacks, this, err, cb);
	          return;
	        }
	        this._bufferedBytes -= options[kByteLength];
	        const data = toBuffer(arrayBuffer);
	        if (!compress) {
	          this._state = DEFAULT;
	          this.sendFrame(Sender.frame(data, options), cb);
	          this.dequeue();
	        } else {
	          this.dispatch(data, compress, options, cb);
	        }
	      })
	      .catch((err) => {
	        process.nextTick(onError, this, err, cb);
	      });
	  }
	  dispatch(data, compress, options, cb) {
	    if (!compress) {
	      this.sendFrame(Sender.frame(data, options), cb);
	      return;
	    }
	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
	    this._bufferedBytes += options[kByteLength];
	    this._state = DEFLATING;
	    perMessageDeflate.compress(data, options.fin, (_, buf) => {
	      if (this._socket.destroyed) {
	        const err = new Error(
	          'The socket was closed while data was being compressed'
	        );
	        callCallbacks(this, err, cb);
	        return;
	      }
	      this._bufferedBytes -= options[kByteLength];
	      this._state = DEFAULT;
	      options.readOnly = false;
	      this.sendFrame(Sender.frame(buf, options), cb);
	      this.dequeue();
	    });
	  }
	  dequeue() {
	    while (this._state === DEFAULT && this._queue.length) {
	      const params = this._queue.shift();
	      this._bufferedBytes -= params[3][kByteLength];
	      Reflect.apply(params[0], this, params.slice(1));
	    }
	  }
	  enqueue(params) {
	    this._bufferedBytes += params[3][kByteLength];
	    this._queue.push(params);
	  }
	  sendFrame(list, cb) {
	    if (list.length === 2) {
	      this._socket.cork();
	      this._socket.write(list[0]);
	      this._socket.write(list[1], cb);
	      this._socket.uncork();
	    } else {
	      this._socket.write(list[0], cb);
	    }
	  }
	}
	sender = Sender;
	function callCallbacks(sender, err, cb) {
	  if (typeof cb === 'function') cb(err);
	  for (let i = 0; i < sender._queue.length; i++) {
	    const params = sender._queue[i];
	    const callback = params[params.length - 1];
	    if (typeof callback === 'function') callback(err);
	  }
	}
	function onError(sender, err, cb) {
	  callCallbacks(sender, err, cb);
	  sender.onerror(err);
	}
	return sender;
}

requireSender();

var eventTarget;
var hasRequiredEventTarget;
function requireEventTarget () {
	if (hasRequiredEventTarget) return eventTarget;
	hasRequiredEventTarget = 1;
	const { kForOnEventAttribute, kListener } = requireConstants();
	const kCode = Symbol('kCode');
	const kData = Symbol('kData');
	const kError = Symbol('kError');
	const kMessage = Symbol('kMessage');
	const kReason = Symbol('kReason');
	const kTarget = Symbol('kTarget');
	const kType = Symbol('kType');
	const kWasClean = Symbol('kWasClean');
	class Event {
	  constructor(type) {
	    this[kTarget] = null;
	    this[kType] = type;
	  }
	  get target() {
	    return this[kTarget];
	  }
	  get type() {
	    return this[kType];
	  }
	}
	Object.defineProperty(Event.prototype, 'target', { enumerable: true });
	Object.defineProperty(Event.prototype, 'type', { enumerable: true });
	class CloseEvent extends Event {
	  constructor(type, options = {}) {
	    super(type);
	    this[kCode] = options.code === undefined ? 0 : options.code;
	    this[kReason] = options.reason === undefined ? '' : options.reason;
	    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
	  }
	  get code() {
	    return this[kCode];
	  }
	  get reason() {
	    return this[kReason];
	  }
	  get wasClean() {
	    return this[kWasClean];
	  }
	}
	Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
	Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
	Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });
	class ErrorEvent extends Event {
	  constructor(type, options = {}) {
	    super(type);
	    this[kError] = options.error === undefined ? null : options.error;
	    this[kMessage] = options.message === undefined ? '' : options.message;
	  }
	  get error() {
	    return this[kError];
	  }
	  get message() {
	    return this[kMessage];
	  }
	}
	Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
	Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });
	class MessageEvent extends Event {
	  constructor(type, options = {}) {
	    super(type);
	    this[kData] = options.data === undefined ? null : options.data;
	  }
	  get data() {
	    return this[kData];
	  }
	}
	Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });
	const EventTarget = {
	  addEventListener(type, handler, options = {}) {
	    for (const listener of this.listeners(type)) {
	      if (
	        !options[kForOnEventAttribute] &&
	        listener[kListener] === handler &&
	        !listener[kForOnEventAttribute]
	      ) {
	        return;
	      }
	    }
	    let wrapper;
	    if (type === 'message') {
	      wrapper = function onMessage(data, isBinary) {
	        const event = new MessageEvent('message', {
	          data: isBinary ? data : data.toString()
	        });
	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'close') {
	      wrapper = function onClose(code, message) {
	        const event = new CloseEvent('close', {
	          code,
	          reason: message.toString(),
	          wasClean: this._closeFrameReceived && this._closeFrameSent
	        });
	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'error') {
	      wrapper = function onError(error) {
	        const event = new ErrorEvent('error', {
	          error,
	          message: error.message
	        });
	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'open') {
	      wrapper = function onOpen() {
	        const event = new Event('open');
	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else {
	      return;
	    }
	    wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
	    wrapper[kListener] = handler;
	    if (options.once) {
	      this.once(type, wrapper);
	    } else {
	      this.on(type, wrapper);
	    }
	  },
	  removeEventListener(type, handler) {
	    for (const listener of this.listeners(type)) {
	      if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
	        this.removeListener(type, listener);
	        break;
	      }
	    }
	  }
	};
	eventTarget = {
	  CloseEvent,
	  ErrorEvent,
	  Event,
	  EventTarget,
	  MessageEvent
	};
	function callListener(listener, thisArg, event) {
	  if (typeof listener === 'object' && listener.handleEvent) {
	    listener.handleEvent.call(listener, event);
	  } else {
	    listener.call(thisArg, event);
	  }
	}
	return eventTarget;
}

var extension;
var hasRequiredExtension;
function requireExtension () {
	if (hasRequiredExtension) return extension;
	hasRequiredExtension = 1;
	const { tokenChars } = requireValidation();
	function push(dest, name, elem) {
	  if (dest[name] === undefined) dest[name] = [elem];
	  else dest[name].push(elem);
	}
	function parse(header) {
	  const offers = Object.create(null);
	  let params = Object.create(null);
	  let mustUnescape = false;
	  let isEscaping = false;
	  let inQuotes = false;
	  let extensionName;
	  let paramName;
	  let start = -1;
	  let code = -1;
	  let end = -1;
	  let i = 0;
	  for (; i < header.length; i++) {
	    code = header.charCodeAt(i);
	    if (extensionName === undefined) {
	      if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (
	        i !== 0 &&
	        (code === 0x20  || code === 0x09)
	      ) {
	        if (end === -1 && start !== -1) end = i;
	      } else if (code === 0x3b  || code === 0x2c ) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	        if (end === -1) end = i;
	        const name = header.slice(start, end);
	        if (code === 0x2c) {
	          push(offers, name, params);
	          params = Object.create(null);
	        } else {
	          extensionName = name;
	        }
	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    } else if (paramName === undefined) {
	      if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (code === 0x20 || code === 0x09) {
	        if (end === -1 && start !== -1) end = i;
	      } else if (code === 0x3b || code === 0x2c) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	        if (end === -1) end = i;
	        push(params, header.slice(start, end), true);
	        if (code === 0x2c) {
	          push(offers, extensionName, params);
	          params = Object.create(null);
	          extensionName = undefined;
	        }
	        start = end = -1;
	      } else if (code === 0x3d  && start !== -1 && end === -1) {
	        paramName = header.slice(start, i);
	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    } else {
	      if (isEscaping) {
	        if (tokenChars[code] !== 1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	        if (start === -1) start = i;
	        else if (!mustUnescape) mustUnescape = true;
	        isEscaping = false;
	      } else if (inQuotes) {
	        if (tokenChars[code] === 1) {
	          if (start === -1) start = i;
	        } else if (code === 0x22  && start !== -1) {
	          inQuotes = false;
	          end = i;
	        } else if (code === 0x5c ) {
	          isEscaping = true;
	        } else {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
	        inQuotes = true;
	      } else if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
	        if (end === -1) end = i;
	      } else if (code === 0x3b || code === 0x2c) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	        if (end === -1) end = i;
	        let value = header.slice(start, end);
	        if (mustUnescape) {
	          value = value.replace(/\\/g, '');
	          mustUnescape = false;
	        }
	        push(params, paramName, value);
	        if (code === 0x2c) {
	          push(offers, extensionName, params);
	          params = Object.create(null);
	          extensionName = undefined;
	        }
	        paramName = undefined;
	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    }
	  }
	  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
	    throw new SyntaxError('Unexpected end of input');
	  }
	  if (end === -1) end = i;
	  const token = header.slice(start, end);
	  if (extensionName === undefined) {
	    push(offers, token, params);
	  } else {
	    if (paramName === undefined) {
	      push(params, token, true);
	    } else if (mustUnescape) {
	      push(params, paramName, token.replace(/\\/g, ''));
	    } else {
	      push(params, paramName, token);
	    }
	    push(offers, extensionName, params);
	  }
	  return offers;
	}
	function format(extensions) {
	  return Object.keys(extensions)
	    .map((extension) => {
	      let configurations = extensions[extension];
	      if (!Array.isArray(configurations)) configurations = [configurations];
	      return configurations
	        .map((params) => {
	          return [extension]
	            .concat(
	              Object.keys(params).map((k) => {
	                let values = params[k];
	                if (!Array.isArray(values)) values = [values];
	                return values
	                  .map((v) => (v === true ? k : `${k}=${v}`))
	                  .join('; ');
	              })
	            )
	            .join('; ');
	        })
	        .join(', ');
	    })
	    .join(', ');
	}
	extension = { format, parse };
	return extension;
}

var websocket;
var hasRequiredWebsocket;
function requireWebsocket () {
	if (hasRequiredWebsocket) return websocket;
	hasRequiredWebsocket = 1;
	const EventEmitter = require$$0$3;
	const https = require$$1;
	const http = require$$2;
	const net = require$$3;
	const tls = require$$4;
	const { randomBytes, createHash } = crypto;
	const { URL } = require$$7;
	const PerMessageDeflate = requirePermessageDeflate();
	const Receiver = requireReceiver();
	const Sender = requireSender();
	const { isBlob } = requireValidation();
	const {
	  BINARY_TYPES,
	  EMPTY_BUFFER,
	  GUID,
	  kForOnEventAttribute,
	  kListener,
	  kStatusCode,
	  kWebSocket,
	  NOOP
	} = requireConstants();
	const {
	  EventTarget: { addEventListener, removeEventListener }
	} = requireEventTarget();
	const { format, parse } = requireExtension();
	const { toBuffer } = requireBufferUtil();
	const closeTimeout = 30 * 1000;
	const kAborted = Symbol('kAborted');
	const protocolVersions = [8, 13];
	const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
	const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
	class WebSocket extends EventEmitter {
	  constructor(address, protocols, options) {
	    super();
	    this._binaryType = BINARY_TYPES[0];
	    this._closeCode = 1006;
	    this._closeFrameReceived = false;
	    this._closeFrameSent = false;
	    this._closeMessage = EMPTY_BUFFER;
	    this._closeTimer = null;
	    this._errorEmitted = false;
	    this._extensions = {};
	    this._paused = false;
	    this._protocol = '';
	    this._readyState = WebSocket.CONNECTING;
	    this._receiver = null;
	    this._sender = null;
	    this._socket = null;
	    if (address !== null) {
	      this._bufferedAmount = 0;
	      this._isServer = false;
	      this._redirects = 0;
	      if (protocols === undefined) {
	        protocols = [];
	      } else if (!Array.isArray(protocols)) {
	        if (typeof protocols === 'object' && protocols !== null) {
	          options = protocols;
	          protocols = [];
	        } else {
	          protocols = [protocols];
	        }
	      }
	      initAsClient(this, address, protocols, options);
	    } else {
	      this._autoPong = options.autoPong;
	      this._isServer = true;
	    }
	  }
	  get binaryType() {
	    return this._binaryType;
	  }
	  set binaryType(type) {
	    if (!BINARY_TYPES.includes(type)) return;
	    this._binaryType = type;
	    if (this._receiver) this._receiver._binaryType = type;
	  }
	  get bufferedAmount() {
	    if (!this._socket) return this._bufferedAmount;
	    return this._socket._writableState.length + this._sender._bufferedBytes;
	  }
	  get extensions() {
	    return Object.keys(this._extensions).join();
	  }
	  get isPaused() {
	    return this._paused;
	  }
	  get onclose() {
	    return null;
	  }
	  get onerror() {
	    return null;
	  }
	  get onopen() {
	    return null;
	  }
	  get onmessage() {
	    return null;
	  }
	  get protocol() {
	    return this._protocol;
	  }
	  get readyState() {
	    return this._readyState;
	  }
	  get url() {
	    return this._url;
	  }
	  setSocket(socket, head, options) {
	    const receiver = new Receiver({
	      allowSynchronousEvents: options.allowSynchronousEvents,
	      binaryType: this.binaryType,
	      extensions: this._extensions,
	      isServer: this._isServer,
	      maxPayload: options.maxPayload,
	      skipUTF8Validation: options.skipUTF8Validation
	    });
	    const sender = new Sender(socket, this._extensions, options.generateMask);
	    this._receiver = receiver;
	    this._sender = sender;
	    this._socket = socket;
	    receiver[kWebSocket] = this;
	    sender[kWebSocket] = this;
	    socket[kWebSocket] = this;
	    receiver.on('conclude', receiverOnConclude);
	    receiver.on('drain', receiverOnDrain);
	    receiver.on('error', receiverOnError);
	    receiver.on('message', receiverOnMessage);
	    receiver.on('ping', receiverOnPing);
	    receiver.on('pong', receiverOnPong);
	    sender.onerror = senderOnError;
	    if (socket.setTimeout) socket.setTimeout(0);
	    if (socket.setNoDelay) socket.setNoDelay();
	    if (head.length > 0) socket.unshift(head);
	    socket.on('close', socketOnClose);
	    socket.on('data', socketOnData);
	    socket.on('end', socketOnEnd);
	    socket.on('error', socketOnError);
	    this._readyState = WebSocket.OPEN;
	    this.emit('open');
	  }
	  emitClose() {
	    if (!this._socket) {
	      this._readyState = WebSocket.CLOSED;
	      this.emit('close', this._closeCode, this._closeMessage);
	      return;
	    }
	    if (this._extensions[PerMessageDeflate.extensionName]) {
	      this._extensions[PerMessageDeflate.extensionName].cleanup();
	    }
	    this._receiver.removeAllListeners();
	    this._readyState = WebSocket.CLOSED;
	    this.emit('close', this._closeCode, this._closeMessage);
	  }
	  close(code, data) {
	    if (this.readyState === WebSocket.CLOSED) return;
	    if (this.readyState === WebSocket.CONNECTING) {
	      const msg = 'WebSocket was closed before the connection was established';
	      abortHandshake(this, this._req, msg);
	      return;
	    }
	    if (this.readyState === WebSocket.CLOSING) {
	      if (
	        this._closeFrameSent &&
	        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
	      ) {
	        this._socket.end();
	      }
	      return;
	    }
	    this._readyState = WebSocket.CLOSING;
	    this._sender.close(code, data, !this._isServer, (err) => {
	      if (err) return;
	      this._closeFrameSent = true;
	      if (
	        this._closeFrameReceived ||
	        this._receiver._writableState.errorEmitted
	      ) {
	        this._socket.end();
	      }
	    });
	    setCloseTimer(this);
	  }
	  pause() {
	    if (
	      this.readyState === WebSocket.CONNECTING ||
	      this.readyState === WebSocket.CLOSED
	    ) {
	      return;
	    }
	    this._paused = true;
	    this._socket.pause();
	  }
	  ping(data, mask, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }
	    if (typeof data === 'function') {
	      cb = data;
	      data = mask = undefined;
	    } else if (typeof mask === 'function') {
	      cb = mask;
	      mask = undefined;
	    }
	    if (typeof data === 'number') data = data.toString();
	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }
	    if (mask === undefined) mask = !this._isServer;
	    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
	  }
	  pong(data, mask, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }
	    if (typeof data === 'function') {
	      cb = data;
	      data = mask = undefined;
	    } else if (typeof mask === 'function') {
	      cb = mask;
	      mask = undefined;
	    }
	    if (typeof data === 'number') data = data.toString();
	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }
	    if (mask === undefined) mask = !this._isServer;
	    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
	  }
	  resume() {
	    if (
	      this.readyState === WebSocket.CONNECTING ||
	      this.readyState === WebSocket.CLOSED
	    ) {
	      return;
	    }
	    this._paused = false;
	    if (!this._receiver._writableState.needDrain) this._socket.resume();
	  }
	  send(data, options, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }
	    if (typeof options === 'function') {
	      cb = options;
	      options = {};
	    }
	    if (typeof data === 'number') data = data.toString();
	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }
	    const opts = {
	      binary: typeof data !== 'string',
	      mask: !this._isServer,
	      compress: true,
	      fin: true,
	      ...options
	    };
	    if (!this._extensions[PerMessageDeflate.extensionName]) {
	      opts.compress = false;
	    }
	    this._sender.send(data || EMPTY_BUFFER, opts, cb);
	  }
	  terminate() {
	    if (this.readyState === WebSocket.CLOSED) return;
	    if (this.readyState === WebSocket.CONNECTING) {
	      const msg = 'WebSocket was closed before the connection was established';
	      abortHandshake(this, this._req, msg);
	      return;
	    }
	    if (this._socket) {
	      this._readyState = WebSocket.CLOSING;
	      this._socket.destroy();
	    }
	  }
	}
	Object.defineProperty(WebSocket, 'CONNECTING', {
	  enumerable: true,
	  value: readyStates.indexOf('CONNECTING')
	});
	Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
	  enumerable: true,
	  value: readyStates.indexOf('CONNECTING')
	});
	Object.defineProperty(WebSocket, 'OPEN', {
	  enumerable: true,
	  value: readyStates.indexOf('OPEN')
	});
	Object.defineProperty(WebSocket.prototype, 'OPEN', {
	  enumerable: true,
	  value: readyStates.indexOf('OPEN')
	});
	Object.defineProperty(WebSocket, 'CLOSING', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSING')
	});
	Object.defineProperty(WebSocket.prototype, 'CLOSING', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSING')
	});
	Object.defineProperty(WebSocket, 'CLOSED', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSED')
	});
	Object.defineProperty(WebSocket.prototype, 'CLOSED', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSED')
	});
	[
	  'binaryType',
	  'bufferedAmount',
	  'extensions',
	  'isPaused',
	  'protocol',
	  'readyState',
	  'url'
	].forEach((property) => {
	  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
	});
	['open', 'error', 'close', 'message'].forEach((method) => {
	  Object.defineProperty(WebSocket.prototype, `on${method}`, {
	    enumerable: true,
	    get() {
	      for (const listener of this.listeners(method)) {
	        if (listener[kForOnEventAttribute]) return listener[kListener];
	      }
	      return null;
	    },
	    set(handler) {
	      for (const listener of this.listeners(method)) {
	        if (listener[kForOnEventAttribute]) {
	          this.removeListener(method, listener);
	          break;
	        }
	      }
	      if (typeof handler !== 'function') return;
	      this.addEventListener(method, handler, {
	        [kForOnEventAttribute]: true
	      });
	    }
	  });
	});
	WebSocket.prototype.addEventListener = addEventListener;
	WebSocket.prototype.removeEventListener = removeEventListener;
	websocket = WebSocket;
	function initAsClient(websocket, address, protocols, options) {
	  const opts = {
	    allowSynchronousEvents: true,
	    autoPong: true,
	    protocolVersion: protocolVersions[1],
	    maxPayload: 100 * 1024 * 1024,
	    skipUTF8Validation: false,
	    perMessageDeflate: true,
	    followRedirects: false,
	    maxRedirects: 10,
	    ...options,
	    socketPath: undefined,
	    hostname: undefined,
	    protocol: undefined,
	    timeout: undefined,
	    method: 'GET',
	    host: undefined,
	    path: undefined,
	    port: undefined
	  };
	  websocket._autoPong = opts.autoPong;
	  if (!protocolVersions.includes(opts.protocolVersion)) {
	    throw new RangeError(
	      `Unsupported protocol version: ${opts.protocolVersion} ` +
	        `(supported versions: ${protocolVersions.join(', ')})`
	    );
	  }
	  let parsedUrl;
	  if (address instanceof URL) {
	    parsedUrl = address;
	  } else {
	    try {
	      parsedUrl = new URL(address);
	    } catch (e) {
	      throw new SyntaxError(`Invalid URL: ${address}`);
	    }
	  }
	  if (parsedUrl.protocol === 'http:') {
	    parsedUrl.protocol = 'ws:';
	  } else if (parsedUrl.protocol === 'https:') {
	    parsedUrl.protocol = 'wss:';
	  }
	  websocket._url = parsedUrl.href;
	  const isSecure = parsedUrl.protocol === 'wss:';
	  const isIpcUrl = parsedUrl.protocol === 'ws+unix:';
	  let invalidUrlMessage;
	  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isIpcUrl) {
	    invalidUrlMessage =
	      'The URL\'s protocol must be one of "ws:", "wss:", ' +
	      '"http:", "https", or "ws+unix:"';
	  } else if (isIpcUrl && !parsedUrl.pathname) {
	    invalidUrlMessage = "The URL's pathname is empty";
	  } else if (parsedUrl.hash) {
	    invalidUrlMessage = 'The URL contains a fragment identifier';
	  }
	  if (invalidUrlMessage) {
	    const err = new SyntaxError(invalidUrlMessage);
	    if (websocket._redirects === 0) {
	      throw err;
	    } else {
	      emitErrorAndClose(websocket, err);
	      return;
	    }
	  }
	  const defaultPort = isSecure ? 443 : 80;
	  const key = randomBytes(16).toString('base64');
	  const request = isSecure ? https.request : http.request;
	  const protocolSet = new Set();
	  let perMessageDeflate;
	  opts.createConnection =
	    opts.createConnection || (isSecure ? tlsConnect : netConnect);
	  opts.defaultPort = opts.defaultPort || defaultPort;
	  opts.port = parsedUrl.port || defaultPort;
	  opts.host = parsedUrl.hostname.startsWith('[')
	    ? parsedUrl.hostname.slice(1, -1)
	    : parsedUrl.hostname;
	  opts.headers = {
	    ...opts.headers,
	    'Sec-WebSocket-Version': opts.protocolVersion,
	    'Sec-WebSocket-Key': key,
	    Connection: 'Upgrade',
	    Upgrade: 'websocket'
	  };
	  opts.path = parsedUrl.pathname + parsedUrl.search;
	  opts.timeout = opts.handshakeTimeout;
	  if (opts.perMessageDeflate) {
	    perMessageDeflate = new PerMessageDeflate(
	      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
	      false,
	      opts.maxPayload
	    );
	    opts.headers['Sec-WebSocket-Extensions'] = format({
	      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
	    });
	  }
	  if (protocols.length) {
	    for (const protocol of protocols) {
	      if (
	        typeof protocol !== 'string' ||
	        !subprotocolRegex.test(protocol) ||
	        protocolSet.has(protocol)
	      ) {
	        throw new SyntaxError(
	          'An invalid or duplicated subprotocol was specified'
	        );
	      }
	      protocolSet.add(protocol);
	    }
	    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
	  }
	  if (opts.origin) {
	    if (opts.protocolVersion < 13) {
	      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
	    } else {
	      opts.headers.Origin = opts.origin;
	    }
	  }
	  if (parsedUrl.username || parsedUrl.password) {
	    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
	  }
	  if (isIpcUrl) {
	    const parts = opts.path.split(':');
	    opts.socketPath = parts[0];
	    opts.path = parts[1];
	  }
	  let req;
	  if (opts.followRedirects) {
	    if (websocket._redirects === 0) {
	      websocket._originalIpc = isIpcUrl;
	      websocket._originalSecure = isSecure;
	      websocket._originalHostOrSocketPath = isIpcUrl
	        ? opts.socketPath
	        : parsedUrl.host;
	      const headers = options && options.headers;
	      options = { ...options, headers: {} };
	      if (headers) {
	        for (const [key, value] of Object.entries(headers)) {
	          options.headers[key.toLowerCase()] = value;
	        }
	      }
	    } else if (websocket.listenerCount('redirect') === 0) {
	      const isSameHost = isIpcUrl
	        ? websocket._originalIpc
	          ? opts.socketPath === websocket._originalHostOrSocketPath
	          : false
	        : websocket._originalIpc
	          ? false
	          : parsedUrl.host === websocket._originalHostOrSocketPath;
	      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
	        delete opts.headers.authorization;
	        delete opts.headers.cookie;
	        if (!isSameHost) delete opts.headers.host;
	        opts.auth = undefined;
	      }
	    }
	    if (opts.auth && !options.headers.authorization) {
	      options.headers.authorization =
	        'Basic ' + Buffer.from(opts.auth).toString('base64');
	    }
	    req = websocket._req = request(opts);
	    if (websocket._redirects) {
	      websocket.emit('redirect', websocket.url, req);
	    }
	  } else {
	    req = websocket._req = request(opts);
	  }
	  if (opts.timeout) {
	    req.on('timeout', () => {
	      abortHandshake(websocket, req, 'Opening handshake has timed out');
	    });
	  }
	  req.on('error', (err) => {
	    if (req === null || req[kAborted]) return;
	    req = websocket._req = null;
	    emitErrorAndClose(websocket, err);
	  });
	  req.on('response', (res) => {
	    const location = res.headers.location;
	    const statusCode = res.statusCode;
	    if (
	      location &&
	      opts.followRedirects &&
	      statusCode >= 300 &&
	      statusCode < 400
	    ) {
	      if (++websocket._redirects > opts.maxRedirects) {
	        abortHandshake(websocket, req, 'Maximum redirects exceeded');
	        return;
	      }
	      req.abort();
	      let addr;
	      try {
	        addr = new URL(location, address);
	      } catch (e) {
	        const err = new SyntaxError(`Invalid URL: ${location}`);
	        emitErrorAndClose(websocket, err);
	        return;
	      }
	      initAsClient(websocket, addr, protocols, options);
	    } else if (!websocket.emit('unexpected-response', req, res)) {
	      abortHandshake(
	        websocket,
	        req,
	        `Unexpected server response: ${res.statusCode}`
	      );
	    }
	  });
	  req.on('upgrade', (res, socket, head) => {
	    websocket.emit('upgrade', res);
	    if (websocket.readyState !== WebSocket.CONNECTING) return;
	    req = websocket._req = null;
	    const upgrade = res.headers.upgrade;
	    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
	      abortHandshake(websocket, socket, 'Invalid Upgrade header');
	      return;
	    }
	    const digest = createHash('sha1')
	      .update(key + GUID)
	      .digest('base64');
	    if (res.headers['sec-websocket-accept'] !== digest) {
	      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
	      return;
	    }
	    const serverProt = res.headers['sec-websocket-protocol'];
	    let protError;
	    if (serverProt !== undefined) {
	      if (!protocolSet.size) {
	        protError = 'Server sent a subprotocol but none was requested';
	      } else if (!protocolSet.has(serverProt)) {
	        protError = 'Server sent an invalid subprotocol';
	      }
	    } else if (protocolSet.size) {
	      protError = 'Server sent no subprotocol';
	    }
	    if (protError) {
	      abortHandshake(websocket, socket, protError);
	      return;
	    }
	    if (serverProt) websocket._protocol = serverProt;
	    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];
	    if (secWebSocketExtensions !== undefined) {
	      if (!perMessageDeflate) {
	        const message =
	          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
	          'was requested';
	        abortHandshake(websocket, socket, message);
	        return;
	      }
	      let extensions;
	      try {
	        extensions = parse(secWebSocketExtensions);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Extensions header';
	        abortHandshake(websocket, socket, message);
	        return;
	      }
	      const extensionNames = Object.keys(extensions);
	      if (
	        extensionNames.length !== 1 ||
	        extensionNames[0] !== PerMessageDeflate.extensionName
	      ) {
	        const message = 'Server indicated an extension that was not requested';
	        abortHandshake(websocket, socket, message);
	        return;
	      }
	      try {
	        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Extensions header';
	        abortHandshake(websocket, socket, message);
	        return;
	      }
	      websocket._extensions[PerMessageDeflate.extensionName] =
	        perMessageDeflate;
	    }
	    websocket.setSocket(socket, head, {
	      allowSynchronousEvents: opts.allowSynchronousEvents,
	      generateMask: opts.generateMask,
	      maxPayload: opts.maxPayload,
	      skipUTF8Validation: opts.skipUTF8Validation
	    });
	  });
	  if (opts.finishRequest) {
	    opts.finishRequest(req, websocket);
	  } else {
	    req.end();
	  }
	}
	function emitErrorAndClose(websocket, err) {
	  websocket._readyState = WebSocket.CLOSING;
	  websocket._errorEmitted = true;
	  websocket.emit('error', err);
	  websocket.emitClose();
	}
	function netConnect(options) {
	  options.path = options.socketPath;
	  return net.connect(options);
	}
	function tlsConnect(options) {
	  options.path = undefined;
	  if (!options.servername && options.servername !== '') {
	    options.servername = net.isIP(options.host) ? '' : options.host;
	  }
	  return tls.connect(options);
	}
	function abortHandshake(websocket, stream, message) {
	  websocket._readyState = WebSocket.CLOSING;
	  const err = new Error(message);
	  Error.captureStackTrace(err, abortHandshake);
	  if (stream.setHeader) {
	    stream[kAborted] = true;
	    stream.abort();
	    if (stream.socket && !stream.socket.destroyed) {
	      stream.socket.destroy();
	    }
	    process.nextTick(emitErrorAndClose, websocket, err);
	  } else {
	    stream.destroy(err);
	    stream.once('error', websocket.emit.bind(websocket, 'error'));
	    stream.once('close', websocket.emitClose.bind(websocket));
	  }
	}
	function sendAfterClose(websocket, data, cb) {
	  if (data) {
	    const length = isBlob(data) ? data.size : toBuffer(data).length;
	    if (websocket._socket) websocket._sender._bufferedBytes += length;
	    else websocket._bufferedAmount += length;
	  }
	  if (cb) {
	    const err = new Error(
	      `WebSocket is not open: readyState ${websocket.readyState} ` +
	        `(${readyStates[websocket.readyState]})`
	    );
	    process.nextTick(cb, err);
	  }
	}
	function receiverOnConclude(code, reason) {
	  const websocket = this[kWebSocket];
	  websocket._closeFrameReceived = true;
	  websocket._closeMessage = reason;
	  websocket._closeCode = code;
	  if (websocket._socket[kWebSocket] === undefined) return;
	  websocket._socket.removeListener('data', socketOnData);
	  process.nextTick(resume, websocket._socket);
	  if (code === 1005) websocket.close();
	  else websocket.close(code, reason);
	}
	function receiverOnDrain() {
	  const websocket = this[kWebSocket];
	  if (!websocket.isPaused) websocket._socket.resume();
	}
	function receiverOnError(err) {
	  const websocket = this[kWebSocket];
	  if (websocket._socket[kWebSocket] !== undefined) {
	    websocket._socket.removeListener('data', socketOnData);
	    process.nextTick(resume, websocket._socket);
	    websocket.close(err[kStatusCode]);
	  }
	  if (!websocket._errorEmitted) {
	    websocket._errorEmitted = true;
	    websocket.emit('error', err);
	  }
	}
	function receiverOnFinish() {
	  this[kWebSocket].emitClose();
	}
	function receiverOnMessage(data, isBinary) {
	  this[kWebSocket].emit('message', data, isBinary);
	}
	function receiverOnPing(data) {
	  const websocket = this[kWebSocket];
	  if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
	  websocket.emit('ping', data);
	}
	function receiverOnPong(data) {
	  this[kWebSocket].emit('pong', data);
	}
	function resume(stream) {
	  stream.resume();
	}
	function senderOnError(err) {
	  const websocket = this[kWebSocket];
	  if (websocket.readyState === WebSocket.CLOSED) return;
	  if (websocket.readyState === WebSocket.OPEN) {
	    websocket._readyState = WebSocket.CLOSING;
	    setCloseTimer(websocket);
	  }
	  this._socket.end();
	  if (!websocket._errorEmitted) {
	    websocket._errorEmitted = true;
	    websocket.emit('error', err);
	  }
	}
	function setCloseTimer(websocket) {
	  websocket._closeTimer = setTimeout(
	    websocket._socket.destroy.bind(websocket._socket),
	    closeTimeout
	  );
	}
	function socketOnClose() {
	  const websocket = this[kWebSocket];
	  this.removeListener('close', socketOnClose);
	  this.removeListener('data', socketOnData);
	  this.removeListener('end', socketOnEnd);
	  websocket._readyState = WebSocket.CLOSING;
	  let chunk;
	  if (
	    !this._readableState.endEmitted &&
	    !websocket._closeFrameReceived &&
	    !websocket._receiver._writableState.errorEmitted &&
	    (chunk = websocket._socket.read()) !== null
	  ) {
	    websocket._receiver.write(chunk);
	  }
	  websocket._receiver.end();
	  this[kWebSocket] = undefined;
	  clearTimeout(websocket._closeTimer);
	  if (
	    websocket._receiver._writableState.finished ||
	    websocket._receiver._writableState.errorEmitted
	  ) {
	    websocket.emitClose();
	  } else {
	    websocket._receiver.on('error', receiverOnFinish);
	    websocket._receiver.on('finish', receiverOnFinish);
	  }
	}
	function socketOnData(chunk) {
	  if (!this[kWebSocket]._receiver.write(chunk)) {
	    this.pause();
	  }
	}
	function socketOnEnd() {
	  const websocket = this[kWebSocket];
	  websocket._readyState = WebSocket.CLOSING;
	  websocket._receiver.end();
	  this.end();
	}
	function socketOnError() {
	  const websocket = this[kWebSocket];
	  this.removeListener('error', socketOnError);
	  this.on('error', NOOP);
	  if (websocket) {
	    websocket._readyState = WebSocket.CLOSING;
	    this.destroy();
	  }
	}
	return websocket;
}

var websocketExports = requireWebsocket();
var WebSocket = /*@__PURE__*/getDefaultExportFromCjs(websocketExports);

var subprotocol;
var hasRequiredSubprotocol;
function requireSubprotocol () {
	if (hasRequiredSubprotocol) return subprotocol;
	hasRequiredSubprotocol = 1;
	const { tokenChars } = requireValidation();
	function parse(header) {
	  const protocols = new Set();
	  let start = -1;
	  let end = -1;
	  let i = 0;
	  for (i; i < header.length; i++) {
	    const code = header.charCodeAt(i);
	    if (end === -1 && tokenChars[code] === 1) {
	      if (start === -1) start = i;
	    } else if (
	      i !== 0 &&
	      (code === 0x20  || code === 0x09)
	    ) {
	      if (end === -1 && start !== -1) end = i;
	    } else if (code === 0x2c ) {
	      if (start === -1) {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	      if (end === -1) end = i;
	      const protocol = header.slice(start, end);
	      if (protocols.has(protocol)) {
	        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
	      }
	      protocols.add(protocol);
	      start = end = -1;
	    } else {
	      throw new SyntaxError(`Unexpected character at index ${i}`);
	    }
	  }
	  if (start === -1 || end !== -1) {
	    throw new SyntaxError('Unexpected end of input');
	  }
	  const protocol = header.slice(start, i);
	  if (protocols.has(protocol)) {
	    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
	  }
	  protocols.add(protocol);
	  return protocols;
	}
	subprotocol = { parse };
	return subprotocol;
}

var websocketServer;
var hasRequiredWebsocketServer;
function requireWebsocketServer () {
	if (hasRequiredWebsocketServer) return websocketServer;
	hasRequiredWebsocketServer = 1;
	const EventEmitter = require$$0$3;
	const http = require$$2;
	const { createHash } = crypto;
	const extension = requireExtension();
	const PerMessageDeflate = requirePermessageDeflate();
	const subprotocol = requireSubprotocol();
	const WebSocket = requireWebsocket();
	const { GUID, kWebSocket } = requireConstants();
	const keyRegex = /^[+/0-9A-Za-z]{22}==$/;
	const RUNNING = 0;
	const CLOSING = 1;
	const CLOSED = 2;
	class WebSocketServer extends EventEmitter {
	  constructor(options, callback) {
	    super();
	    options = {
	      allowSynchronousEvents: true,
	      autoPong: true,
	      maxPayload: 100 * 1024 * 1024,
	      skipUTF8Validation: false,
	      perMessageDeflate: false,
	      handleProtocols: null,
	      clientTracking: true,
	      verifyClient: null,
	      noServer: false,
	      backlog: null,
	      server: null,
	      host: null,
	      path: null,
	      port: null,
	      WebSocket,
	      ...options
	    };
	    if (
	      (options.port == null && !options.server && !options.noServer) ||
	      (options.port != null && (options.server || options.noServer)) ||
	      (options.server && options.noServer)
	    ) {
	      throw new TypeError(
	        'One and only one of the "port", "server", or "noServer" options ' +
	          'must be specified'
	      );
	    }
	    if (options.port != null) {
	      this._server = http.createServer((req, res) => {
	        const body = http.STATUS_CODES[426];
	        res.writeHead(426, {
	          'Content-Length': body.length,
	          'Content-Type': 'text/plain'
	        });
	        res.end(body);
	      });
	      this._server.listen(
	        options.port,
	        options.host,
	        options.backlog,
	        callback
	      );
	    } else if (options.server) {
	      this._server = options.server;
	    }
	    if (this._server) {
	      const emitConnection = this.emit.bind(this, 'connection');
	      this._removeListeners = addListeners(this._server, {
	        listening: this.emit.bind(this, 'listening'),
	        error: this.emit.bind(this, 'error'),
	        upgrade: (req, socket, head) => {
	          this.handleUpgrade(req, socket, head, emitConnection);
	        }
	      });
	    }
	    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
	    if (options.clientTracking) {
	      this.clients = new Set();
	      this._shouldEmitClose = false;
	    }
	    this.options = options;
	    this._state = RUNNING;
	  }
	  address() {
	    if (this.options.noServer) {
	      throw new Error('The server is operating in "noServer" mode');
	    }
	    if (!this._server) return null;
	    return this._server.address();
	  }
	  close(cb) {
	    if (this._state === CLOSED) {
	      if (cb) {
	        this.once('close', () => {
	          cb(new Error('The server is not running'));
	        });
	      }
	      process.nextTick(emitClose, this);
	      return;
	    }
	    if (cb) this.once('close', cb);
	    if (this._state === CLOSING) return;
	    this._state = CLOSING;
	    if (this.options.noServer || this.options.server) {
	      if (this._server) {
	        this._removeListeners();
	        this._removeListeners = this._server = null;
	      }
	      if (this.clients) {
	        if (!this.clients.size) {
	          process.nextTick(emitClose, this);
	        } else {
	          this._shouldEmitClose = true;
	        }
	      } else {
	        process.nextTick(emitClose, this);
	      }
	    } else {
	      const server = this._server;
	      this._removeListeners();
	      this._removeListeners = this._server = null;
	      server.close(() => {
	        emitClose(this);
	      });
	    }
	  }
	  shouldHandle(req) {
	    if (this.options.path) {
	      const index = req.url.indexOf('?');
	      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
	      if (pathname !== this.options.path) return false;
	    }
	    return true;
	  }
	  handleUpgrade(req, socket, head, cb) {
	    socket.on('error', socketOnError);
	    const key = req.headers['sec-websocket-key'];
	    const upgrade = req.headers.upgrade;
	    const version = +req.headers['sec-websocket-version'];
	    if (req.method !== 'GET') {
	      const message = 'Invalid HTTP method';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
	      return;
	    }
	    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
	      const message = 'Invalid Upgrade header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }
	    if (key === undefined || !keyRegex.test(key)) {
	      const message = 'Missing or invalid Sec-WebSocket-Key header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }
	    if (version !== 8 && version !== 13) {
	      const message = 'Missing or invalid Sec-WebSocket-Version header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }
	    if (!this.shouldHandle(req)) {
	      abortHandshake(socket, 400);
	      return;
	    }
	    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
	    let protocols = new Set();
	    if (secWebSocketProtocol !== undefined) {
	      try {
	        protocols = subprotocol.parse(secWebSocketProtocol);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Protocol header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }
	    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
	    const extensions = {};
	    if (
	      this.options.perMessageDeflate &&
	      secWebSocketExtensions !== undefined
	    ) {
	      const perMessageDeflate = new PerMessageDeflate(
	        this.options.perMessageDeflate,
	        true,
	        this.options.maxPayload
	      );
	      try {
	        const offers = extension.parse(secWebSocketExtensions);
	        if (offers[PerMessageDeflate.extensionName]) {
	          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
	          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
	        }
	      } catch (err) {
	        const message =
	          'Invalid or unacceptable Sec-WebSocket-Extensions header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }
	    if (this.options.verifyClient) {
	      const info = {
	        origin:
	          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
	        secure: !!(req.socket.authorized || req.socket.encrypted),
	        req
	      };
	      if (this.options.verifyClient.length === 2) {
	        this.options.verifyClient(info, (verified, code, message, headers) => {
	          if (!verified) {
	            return abortHandshake(socket, code || 401, message, headers);
	          }
	          this.completeUpgrade(
	            extensions,
	            key,
	            protocols,
	            req,
	            socket,
	            head,
	            cb
	          );
	        });
	        return;
	      }
	      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
	    }
	    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
	  }
	  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
	    if (!socket.readable || !socket.writable) return socket.destroy();
	    if (socket[kWebSocket]) {
	      throw new Error(
	        'server.handleUpgrade() was called more than once with the same ' +
	          'socket, possibly due to a misconfiguration'
	      );
	    }
	    if (this._state > RUNNING) return abortHandshake(socket, 503);
	    const digest = createHash('sha1')
	      .update(key + GUID)
	      .digest('base64');
	    const headers = [
	      'HTTP/1.1 101 Switching Protocols',
	      'Upgrade: websocket',
	      'Connection: Upgrade',
	      `Sec-WebSocket-Accept: ${digest}`
	    ];
	    const ws = new this.options.WebSocket(null, undefined, this.options);
	    if (protocols.size) {
	      const protocol = this.options.handleProtocols
	        ? this.options.handleProtocols(protocols, req)
	        : protocols.values().next().value;
	      if (protocol) {
	        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
	        ws._protocol = protocol;
	      }
	    }
	    if (extensions[PerMessageDeflate.extensionName]) {
	      const params = extensions[PerMessageDeflate.extensionName].params;
	      const value = extension.format({
	        [PerMessageDeflate.extensionName]: [params]
	      });
	      headers.push(`Sec-WebSocket-Extensions: ${value}`);
	      ws._extensions = extensions;
	    }
	    this.emit('headers', headers, req);
	    socket.write(headers.concat('\r\n').join('\r\n'));
	    socket.removeListener('error', socketOnError);
	    ws.setSocket(socket, head, {
	      allowSynchronousEvents: this.options.allowSynchronousEvents,
	      maxPayload: this.options.maxPayload,
	      skipUTF8Validation: this.options.skipUTF8Validation
	    });
	    if (this.clients) {
	      this.clients.add(ws);
	      ws.on('close', () => {
	        this.clients.delete(ws);
	        if (this._shouldEmitClose && !this.clients.size) {
	          process.nextTick(emitClose, this);
	        }
	      });
	    }
	    cb(ws, req);
	  }
	}
	websocketServer = WebSocketServer;
	function addListeners(server, map) {
	  for (const event of Object.keys(map)) server.on(event, map[event]);
	  return function removeListeners() {
	    for (const event of Object.keys(map)) {
	      server.removeListener(event, map[event]);
	    }
	  };
	}
	function emitClose(server) {
	  server._state = CLOSED;
	  server.emit('close');
	}
	function socketOnError() {
	  this.destroy();
	}
	function abortHandshake(socket, code, message, headers) {
	  message = message || http.STATUS_CODES[code];
	  headers = {
	    Connection: 'close',
	    'Content-Type': 'text/html',
	    'Content-Length': Buffer.byteLength(message),
	    ...headers
	  };
	  socket.once('finish', socket.destroy);
	  socket.end(
	    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
	      Object.keys(headers)
	        .map((h) => `${h}: ${headers[h]}`)
	        .join('\r\n') +
	      '\r\n\r\n' +
	      message
	  );
	}
	function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
	  if (server.listenerCount('wsClientError')) {
	    const err = new Error(message);
	    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
	    server.emit('wsClientError', err, socket, req);
	  } else {
	    abortHandshake(socket, code, message);
	  }
	}
	return websocketServer;
}

requireWebsocketServer();

const GetMicrosoftTranslatorToken = async () => {
    let response = {
        IG: '',
        token: '',
        key: 0,
        message: ''
    };
    let page;
    try {
        page = await axiosFetch.get('https://www.bing.com/translator');
    }
    catch (e) {
        response.message = 'Unable to get translator page #MicrosoftTranslator ';
        return response;
    }
    if (page) {
        let _G = null, params_AbusePreventionHelper = null;
        try {
            _G = new Function('return ' + /_G=(\{.+?\});/.exec(page.data || '')?.[1] || '{IG: ""}')();
            params_AbusePreventionHelper = new Function('return ' + /params_AbusePreventionHelper = (\[.+?\]);/.exec(page.data || '')?.[1] || '["", ""]')();
        }
        catch (e) {
            response.message = 'Unable to get variables #MicrosoftTranslator ';
            return response;
        }
        response.IG = _G.IG;
        response.token = params_AbusePreventionHelper[1];
        response.key = params_AbusePreventionHelper[0];
        return response;
    }
    else {
        response.message = 'Empty page #MicrosoftTranslator ';
        return response;
    }
};
const MicrosoftTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #MicrosoftTranslator ');
    }
    if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #MicrosoftTranslator ');
    }
    // get IG, token and key
    let IG = '', token = '', key = 0;
    if (ext.IG && typeof ext.IG === 'string' && ext.token && typeof ext.token === 'string' && ext.key && typeof ext.key === 'number') {
        IG = ext.IG;
        token = ext.token;
        key = ext.key;
    }
    else {
        const tmpMSTranslatorResponse = await GetMicrosoftTranslatorToken();
        if (tmpMSTranslatorResponse.message) {
            return Promise.reject(tmpMSTranslatorResponse.message);
        }
        else {
            IG = tmpMSTranslatorResponse.IG;
            token = tmpMSTranslatorResponse.token;
            key = tmpMSTranslatorResponse.key;
        }
    }
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://www.bing.com/ttranslatev3?' +
            new URLSearchParams({
                isVertical: '1',
                IG,
                IID: 'translator.5024.1'
            }).toString(), new URLSearchParams({
            fromLang: source === 'auto' ? 'auto-detect' : source,
            text: Array.isArray(text) ? text.join('\n') : text,
            to: target || 'en',
            token,
            key: key.toString()
        }).toString())
            .then((response) => {
            if (!response.data.statusCode && response.data instanceof Array) {
                resolve(raw
                    ? response.data
                    : response.data
                        .map((x) => (x?.translations || []).map((translation) => translation?.text || ''))
                        .flat()
                        .join('\n'));
            }
            reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ');
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};
const GetMicrosoftBrowserTranslatorAuth = async () => {
    try {
        return (await axiosFetch.get('https://edge.microsoft.com/translate/auth')).data;
    }
    catch (e) {
        return '';
    }
};
const MicrosoftBrowserPredict = async (text = '', jwt = '') => {
    if (!text || !jwt) {
        return [];
    }
    let content = [];
    if (!Array.isArray(text)) {
        content.push({ Text: text });
    }
    else {
        content.push(...text.map((x) => ({ Text: x })));
    }
    try {
        const languageResult = await axiosFetch.post('https://api.cognitive.microsofttranslator.com/detect?api-version=3.0', JSON.stringify(content), { headers: { authorization: jwt, 'content-type': 'application/json' } });
        if (!languageResult.data?.error && Array.isArray(languageResult.data)) {
            return languageResult.data;
        }
        else {
            return [];
        }
    }
    catch (e) {
        return [];
    }
};
const MicrosoftBrowserTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #MicrosoftTranslator ');
    }
    if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #MicrosoftTranslator ');
    }
    //get jwt
    let jwt = '';
    if (ext.jwt && typeof ext.jwt === 'string') {
        jwt = ext.jwt;
    }
    else {
        jwt = await GetMicrosoftBrowserTranslatorAuth();
    }
    if (jwt) {
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .post(`https://api.cognitive.microsofttranslator.com/translate?from=${source === 'auto' ? '' : source}&to=${target}&api-version=3.0&includeSentenceLength=true`, JSON.stringify(text instanceof Array ? text.map((tmpText) => ({ Text: tmpText })) : [{ Text: text }]), {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${jwt}`
                }
            })
                .then((response) => {
                if (response.data && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x) => (x?.translations || [])?.[0]?.text || '').join('\n'));
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ');
            })
                .catch((e) => {
                reject(raw ? e : e.toString());
            });
        });
    }
    else {
        return Promise.reject('Invalid jwt #MicrosoftTranslator ');
    }
};
const MicrosoftTTS = async (lang = 'en', text = '', ext = {}) => {
    try {
        // get IG, token and key
        let IG = '', token = '', key = 0;
        if (ext.IG && typeof ext.IG === 'string' && ext.token && typeof ext.token === 'string' && ext.key && typeof ext.key === 'number') {
            IG = ext.IG;
            token = ext.token;
            key = ext.key;
        }
        // find model
        const modelInfo = MICROSOFT_TTS_LIST.find((msTTSItem) => msTTSItem.code === lang.toLocaleLowerCase());
        if (modelInfo) {
            const response = await axiosFetch.post('https://www.bing.com/tfettts?' +
                new URLSearchParams({
                    isVertical: '1',
                    IG,
                    IID: 'translator.5023.2'
                }).toString(), new URLSearchParams({
                ssml: `<speak version='1.0' xml:lang='${modelInfo.language}'><voice xml:lang='${modelInfo.language}' xml:gender='${modelInfo.gender}' name='${modelInfo.model}'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
                token,
                key: key.toString()
            }).toString(), { responseType: 'arraybuffer' });
            return {
                buffer: response.data,
                content_length: response.data?.byteLength || response.data?.length || 0,
                content_type: ((Array.isArray(response.headers['content-type']) ? response.headers['content-type'].join(' ') : response.headers['content-type']) || '').split(';')[0]
            };
        }
        else {
            return {
                buffer: new Uint8Array().buffer,
                content_type: '',
                content_length: 0
            };
        }
    }
    catch {
        return {
            buffer: new Uint8Array().buffer,
            content_type: '',
            content_length: 0
        };
    }
};
//const MicrosoftBrowserTTSList = async () => {
//    const response = await axiosFetch.get('https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4')
//    return response.data
//}
const MicrosoftBrowserTTS = async (lang = 'en-US', text = '', ext = {}) => {
    const requestID = generateUUID().replaceAll('-', '');
    // edge default `webm-24khz-16bit-mono-opus`
    const outputFormat = ext?.optput_format ? ext?.optput_format : 'audio-24khz-48kbitrate-mono-mp3';
    const voice = ext.voice ? ext.voice : 'en-US-AriaNeural';
    const ws = new WebSocket('wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4');
    return new Promise((resolve, reject) => {
        let response = {
            buffer: new Uint8Array().buffer,
            content_type: '',
            content_length: 0,
            ext: {}
        };
        const responseContent = [];
        ws.addEventListener('message', async (event) => {
            try {
                if (typeof event.data === 'string') {
                    // split header and body
                    const [header, body] = event?.data?.split('\r\n\r\n');
                    const tmpContent = {
                        header: Object.fromEntries(header.split('\r\n').map((header_) => {
                            const tmpHeaderContent = header_.split(':');
                            return [tmpHeaderContent.shift(), tmpHeaderContent.join('')];
                        })),
                        body,
                        type: 'text'
                    };
                    responseContent.push(tmpContent);
                    if (tmpContent.header.Path === 'turn.end') {
                        ws.close();
                    }
                }
                else if ((typeof Buffer !== 'undefined' && event.data instanceof Buffer) || (typeof Blob !== 'undefined' && event.data instanceof Blob)) {
                    let buffer = new Uint8Array();
                    // browser
                    //@ts-ignore
                    if (event.data?.arrayBuffer) {
                        //@ts-ignore
                        buffer = new Uint8Array(await event.data.arrayBuffer());
                    }
                    else if (typeof Buffer !== 'undefined' && event.data instanceof Buffer) {
                        // binary from npm:ws
                        buffer = new Uint8Array(event.data);
                    }
                    // header length
                    const headerLength = new DataView(buffer.slice(0, 2).buffer).getUint16(0);
                    const tmpContent = {
                        header: Object.fromEntries(new TextDecoder()
                            .decode(buffer.slice(2, headerLength + 2))
                            .split('\r\n')
                            .map((header_) => {
                            const tmpHeaderContent = header_.split(':');
                            return [tmpHeaderContent.shift(), tmpHeaderContent.join('')];
                        })),
                        body: buffer.slice(headerLength + 2),
                        type: 'audio'
                    };
                    if (response.content_type === '') {
                        response.content_type = tmpContent.header['Content-Type'];
                    }
                    responseContent.push(tmpContent);
                }
            }
            catch (e) {
                console.error(e);
                reject(response);
            }
        });
        ws.addEventListener('close', () => {
            {
                response.ext.raw = responseContent;
            }
            response.buffer = concatBuffer(...responseContent.filter((x) => x.type === 'audio').map((x) => (typeof x.body !== 'string' ? x.body.buffer : new ArrayBuffer(0))));
            response.content_length = response.buffer.byteLength;
            resolve(response);
        });
        ws.addEventListener('open', () => {
            if (Array.isArray(text)) {
                text = text.join('\n');
            }
            ws.send(encodeMSBrowserTTSRequest({
                'Content-Type': 'application/json; charset=utf-8',
                'X-Timestamp': new Date().toString(),
                Path: 'speech.config'
            }, JSON.stringify({
                context: {
                    synthesis: {
                        audio: {
                            metadataoptions: {
                                sentenceBoundaryEnabled: 'false',
                                wordBoundaryEnabled: 'true'
                            },
                            outputFormat
                        }
                    }
                }
            })));
            ws.send(encodeMSBrowserTTSRequest({
                'X-RequestId': requestID,
                'Content-Type': 'application/ssml+xml',
                'X-Timestamp': new Date().toString() + 'Z', // I don't know why they add a 'Z' at the end
                Path: 'ssml'
            }, `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis'  xml:lang='${lang}'><voice name='${voice}'><prosody pitch='+0Hz' rate ='+0%' volume='+0%'>${htmlentities(text)}</prosody></voice></speak>`));
        });
    });
};
const encodeMSBrowserTTSRequest = (headers = {}, body = '') => {
    let content = Object.entries(headers)
        .map((header) => `${header[0]}:${header[1]}`)
        .join('\r\n');
    content += '\r\n\r\n';
    content += body;
    return content;
};

const SogouBrowserTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #SogouTranslator ');
    }
    if (!SupportedLanguage(SOGOU_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(SOGOU_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #SogouTranslator ');
    }
    let body = JSON.stringify({
        from_lang: source,
        to_lang: target,
        trans_frag: text instanceof Array ? text.map((x) => ({ text: x })) : [{ text }]
    });
    return new Promise(async (resolve, reject) => {
        const _body = new FormData();
        _body.append('S-Param', body);
        axiosFetch
            .post('https://go.ie.sogou.com/qbpc/translate', _body)
            .then((response) => {
            if (response?.data?.data?.trans_result && response?.data?.data?.trans_result instanceof Array) {
                resolve(raw ? response.data : response.data.data.trans_result.map((x) => x.trans_text).join('\n') || '');
            }
            reject(raw ? response.data : 'Invalid content #SogouTranslator ');
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};
const SogouTTS = async (lang = 'en', text = '', ext = {}) => {
    try {
        const encryptKeyVoice = new TextEncoder().encode('76350b1840ff9832eb6244ac6d444366');
        //const iv = Buffer.from('AAAAAAAAAAAAAAAAAAAAAA==', 'base64');
        const iv = new Uint8Array(16);
        const encipher = await cryptoHandle.subtle.importKey('raw', encryptKeyVoice, { name: 'AES-CBC', length: 256 }, false, ['encrypt']);
        const encryptedText = await cryptoHandle.subtle.encrypt({ name: 'AES-CBC', iv }, encipher, 
        //{"curTime":1705565100036,"text":"hi","spokenDialect":"en","rate":"0.8"}
        new TextEncoder().encode(JSON.stringify({ curTime: Date.now(), text: Array.isArray(text) ? text.join('\n') : text, spokenDialect: lang, rate: '0.8' })));
        const response = await axiosFetch.get('https://fanyi.sogou.com/openapi/external/getWebTTS?' +
            new URLSearchParams({
                'S-AppId': '102356845',
                'S-Param': buffer_to_base64(encryptedText)
            }).toString(), { responseType: 'arraybuffer' });
        return {
            buffer: response.data,
            content_length: response.data?.byteLength || response.data?.length || 0,
            content_type: ((Array.isArray(response.headers['content-type']) ? response.headers['content-type'].join(' ') : response.headers['content-type']) || '').split(';')[0]
        };
    }
    catch {
        return { buffer: new Uint8Array().buffer, content_type: '', content_length: 0 };
    }
};

//from yandex browser
const generateSid = () => generateUUID().replaceAll('-', '');
const YandexDetect = async (text = '') => {
    if (!text) {
        return '_';
    }
    if (Array.isArray(text)) {
        text = text.join('\n');
    }
    try {
        const languageResult = await axiosFetch.get('https://translate.yandex.net/api/v1/tr.json/detect?' +
            new URLSearchParams({
                sid: generateSid(),
                srv: 'android', // or 'ios'
                text
                //hint: 'en,zh'
            }).toString());
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
const YandexTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #YandexTranslator ');
    }
    if (!SupportedLanguage(YANDEX_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(YANDEX_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #YandexTranslator ');
    }
    const lang = source === 'auto' ? await YandexDetect(Array.isArray(text) ? text.join(' ') : text) : source;
    if (lang === '_') {
        return Promise.reject('Unsupported source language #YandexTranslator ');
    }
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://translate.yandex.net/api/v1/tr.json/translate?' +
            new URLSearchParams({
                id: `${generateSid()}-0-0`,
                srv: 'android' // ios
            }).toString(), new URLSearchParams({
            source_lang: lang,
            target_lang: target,
            text: Array.isArray(text) ? text.join('\n') : text
        }).toString())
            .then((response) => {
            if (response?.data?.text && response?.data?.text instanceof Array) {
                resolve(raw ? response.data : response.data.text.join('\n'));
            }
            reject(raw ? response.data : 'Invalid content #YandexTranslator ');
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};
const YandexBrowserTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #YandexTranslator ');
    }
    if (!SupportedLanguage(YANDEX_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(YANDEX_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #YandexTranslator ');
    }
    const lang = source === 'auto' ? await YandexDetect((Array.isArray(text) ? text.join(' ') : text).replaceAll(/<a id=\d><><\/a>/gm, '')) : source;
    if (lang === '_') {
        return Promise.reject('Unsupported source language #YandexTranslator ');
    }
    let query = new URLSearchParams({
        translateMode: 'context',
        context_title: 'Twitter Monitor Translator',
        id: `${generateSid()}-0-0`,
        srv: 'yabrowser',
        lang: `${lang}-${target}`,
        format: 'html',
        options: '2'
    });
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .get('https://browser.translate.yandex.net/api/v1/tr.json/translate?' + query.toString() + '&text=' + (text instanceof Array ? text.map((x) => encodeURIComponent(x)).join('&text=') : encodeURIComponent(text)))
            .then((response) => {
            if (response?.data?.text && response?.data?.text instanceof Array) {
                resolve(raw ? response.data : response.data.text.join('\n'));
            }
            reject(raw ? response.data : 'Invalid content #YandexTranslator ');
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};

const Translator = async (text = '', platform, source, target, raw, ext = {}) => {
    let result = { content: '', message: '' };
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleTranslate(text, source, target, !!raw, ext);
                break;
            case 'google_browser':
                result.content = await GoogleBrowserTranslate(text, source, target, !!raw, ext);
                break;
            case 'google_browser_v2':
                result.content = await GoogleBrowserTranslateV2(text, source, target, !!raw, ext);
                break;
            case 'microsoft':
                result.content = await MicrosoftTranslator(text, source, target, !!raw, ext);
                break;
            case 'microsoft_browser':
                result.content = await MicrosoftBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'sogou':
            case 'sogou_browser':
                result.content = await SogouBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'yandex':
                result.content = await YandexTranslator(text, source, target, !!raw, ext);
                break;
            case 'yandex_browser':
                result.content = await YandexBrowserTranslator(text, source, target, !!raw, ext);
                break;
            case 'deepl':
                result.content = await DeepL(text, source, target, !!raw, ext);
                break;
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};

export { DeepL, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTTS, GoogleTranslate, GoogleTranslateTk, IsChs, IsCht, MicrosoftBrowserPredict, MicrosoftBrowserTTS, MicrosoftBrowserTranslator, MicrosoftTTS, MicrosoftTranslator, SogouBrowserTranslator, SogouTTS, YandexBrowserTranslator, YandexDetect, YandexTranslator, Translator as default };
//# sourceMappingURL=index.js.map
