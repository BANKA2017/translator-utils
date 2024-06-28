const cryptoHandle = crypto || {
    getRandomValues: () => [0],
    randomUUID: () => '00000000-0000-0000-0000-000000000000'
};

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
        if (!options.timeout) {
            options.timeout = 30000;
        }
        const validPostRequest = (options?.method || '').toLowerCase() === 'post' && postData;
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
        options?.method || 'GET';
        return new Promise((resolve, reject) => {
            if (typeof fetch === 'function') {
                fetch(url, options)
                    .then(async (response) => {
                        return { response, data: await response.arrayBuffer() }
                    })
                    .then((res) => {
                        resolve(this.responseBuilder(res.response, res.data, options));
                    })
                    .catch((e) => {
                        reject({ cause: e, toString: () => e.toString() });
                    });
            } else {
                reject({
                    cause: 'NOT SUPPORT fetch OR XMLHttpRequest',
                    toString: 'NOT SUPPORT fetch OR XMLHttpRequest'
                });
            }
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
        let headers = Object.fromEntries(res.headers.entries());
        if (headers['set-cookie'] && res.headers.getSetCookie) {
            headers['set-cookie'] = res.headers.getSetCookie();
        } else if (headers['set-cookie'] && res.headers.getAll) {
            headers['set-cookie'] = res.headers.getAll('set-cookie');
        } else if (headers['set-cookie']) {
            headers['set-cookie'] = [...res.headers.entries()].filter((header) => header[0] === 'set-cookie').map((header) => header[1]);
        }
        return {
            status: res.status,
            statusText: res.statusText,
            headers,
            data
        }
    }
    get(url, options = {}) {
        options.method = 'GET';
        return this.requestHandle(url, null, options)
    }
    post(url, data = '', options = {}) {
        options.method = 'POST';
        return this.requestHandle(url, data, options)
    }
}
const axiosFetch = new AxiosRequest();

const GOOGLE_LANGUAGE = ['aa', 'ab', 'ace', 'ach', 'af', 'ak', 'alz', 'am', 'ar', 'as', 'av', 'awa', 'ay', 'az', 'ba', 'bal', 'ban', 'bbc', 'bci', 'be', 'bem', 'ber', 'ber-latn', 'bew', 'bg', 'bho', 'bik', 'bm', 'bm-nkoo', 'bn', 'bo', 'br', 'bs', 'bts', 'btx', 'bua', 'ca', 'ce', 'ceb', 'cgg', 'ch', 'chk', 'chm', 'ckb', 'cnh', 'co', 'crh', 'crs', 'cs', 'cv', 'cy', 'da', 'de', 'din', 'doi', 'dov', 'dv', 'dyu', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fa-af', 'ff', 'fi', 'fj', 'fo', 'fon', 'fr', 'fur', 'fy', 'ga', 'gaa', 'gd', 'gl', 'gn', 'gom', 'gu', 'gv', 'ha', 'haw', 'hi', 'hil', 'hmn', 'hr', 'hrx', 'ht', 'hu', 'hy', 'iba', 'id', 'ig', 'ilo', 'is', 'it', 'iw', 'ja', 'jam', 'jw', 'ka', 'kac', 'kek', 'kg', 'kha', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'kri', 'ktu', 'ku', 'kv', 'ky', 'la', 'lb', 'lg', 'li', 'lij', 'lmo', 'ln', 'lo', 'lt', 'ltg', 'luo', 'lus', 'lv', 'mad', 'mai', 'mak', 'mam', 'mfe', 'mg', 'mh', 'mi', 'min', 'mk', 'ml', 'mn', 'mni-mtei', 'mr', 'ms', 'ms-arab', 'mt', 'mwr', 'my', 'ndc-zw', 'ne', 'new', 'nhe', 'nl', 'no', 'nr', 'nso', 'nus', 'ny', 'oc', 'om', 'or', 'os', 'pa', 'pa-arab', 'pag', 'pam', 'pap', 'pl', 'ps', 'pt', 'pt-pt', 'qu', 'rn', 'ro', 'rom', 'ru', 'rw', 'sa', 'sah', 'sat-latn', 'scn', 'sd', 'se', 'sg', 'shn', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sus', 'sv', 'sw', 'szl', 'ta', 'tcy', 'te', 'tet', 'tg', 'th', 'ti', 'tiv', 'tk', 'tl', 'tn', 'to', 'tpi', 'tr', 'trp', 'ts', 'tt', 'tum', 'ty', 'tyv', 'udm', 'ug', 'uk', 'ur', 'uz', 've', 'vec', 'vi', 'war', 'wo', 'xh', 'yi', 'yo', 'yua', 'yue', 'zap', 'zh-cn', 'zh-tw', 'zu'];
const BING_LANGUAGE = ['af', 'am', 'ar', 'as', 'az', 'ba', 'bg', 'bho', 'bn', 'bo', 'brx', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'doi', 'dsb', 'dv', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fil', 'fj', 'fo', 'fr', 'fr-ca', 'ga', 'gl', 'gom', 'gu', 'ha', 'he', 'hi', 'hr', 'hsb', 'ht', 'hu', 'hy', 'id', 'ig', 'ikt', 'is', 'it', 'iu', 'iu-latn', 'ja', 'ka', 'kk', 'km', 'kmr', 'kn', 'ko', 'ks', 'ku', 'ky', 'ln', 'lo', 'lt', 'lug', 'lv', 'lzh', 'mai', 'mg', 'mi', 'mk', 'ml', 'mn-cyrl', 'mn-mong', 'mr', 'ms', 'mt', 'mww', 'my', 'nb', 'ne', 'nl', 'nso', 'nya', 'or', 'otq', 'pa', 'pl', 'prs', 'ps', 'pt', 'pt-pt', 'ro', 'ru', 'run', 'rw', 'sd', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr-cyrl', 'sr-latn', 'st', 'sv', 'sw', 'ta', 'te', 'th', 'ti', 'tk', 'tlh-latn', 'tn', 'to', 'tr', 'tt', 'ty', 'ug', 'uk', 'ur', 'uz', 'vi', 'xh', 'yo', 'yua', 'yue', 'zh-hans', 'zh-hant', 'zu'];
const MICROSOFT_TTS_LIST = [{ "code": "af", "language": "af-ZA", "gender": "Female", "model": "af-ZA-AdriNeural" }, { "code": "am", "language": "am-ET", "gender": "Female", "model": "am-ET-MekdesNeural" }, { "code": "ar", "language": "ar-SA", "gender": "Male", "model": "ar-SA-HamedNeural" }, { "code": "bn", "language": "bn-IN", "gender": "Female", "model": "bn-IN-TanishaaNeural" }, { "code": "bg", "language": "bg-BG", "gender": "Male", "model": "bg-BG-BorislavNeural" }, { "code": "ca", "language": "ca-ES", "gender": "Female", "model": "ca-ES-JoanaNeural" }, { "code": "cs", "language": "cs-CZ", "gender": "Male", "model": "cs-CZ-AntoninNeural" }, { "code": "cy", "language": "cy-GB", "gender": "Female", "model": "cy-GB-NiaNeural" }, { "code": "da", "language": "da-DK", "gender": "Female", "model": "da-DK-ChristelNeural" }, { "code": "de", "language": "de-DE", "gender": "Female", "model": "de-DE-KatjaNeural" }, { "code": "el", "language": "el-GR", "gender": "Male", "model": "el-GR-NestorasNeural" }, { "code": "en", "language": "en-US", "gender": "Female", "model": "en-US-AriaNeural" }, { "code": "es", "language": "es-ES", "gender": "Female", "model": "es-ES-ElviraNeural" }, { "code": "et", "language": "et-EE", "gender": "Female", "model": "et-EE-AnuNeural" }, { "code": "fa", "language": "fa-IR", "gender": "Female", "model": "fa-IR-DilaraNeural" }, { "code": "fi", "language": "fi-FI", "gender": "Female", "model": "fi-FI-NooraNeural" }, { "code": "fr", "language": "fr-FR", "gender": "Female", "model": "fr-FR-DeniseNeural" }, { "code": "fr-ca", "language": "fr-CA", "gender": "Female", "model": "fr-CA-SylvieNeural" }, { "code": "ga", "language": "ga-IE", "gender": "Female", "model": "ga-IE-OrlaNeural" }, { "code": "gu", "language": "gu-IN", "gender": "Female", "model": "gu-IN-DhwaniNeural" }, { "code": "he", "language": "he-IL", "gender": "Male", "model": "he-IL-AvriNeural" }, { "code": "hi", "language": "hi-IN", "gender": "Female", "model": "hi-IN-SwaraNeural" }, { "code": "hr", "language": "hr-HR", "gender": "Male", "model": "hr-HR-SreckoNeural" }, { "code": "hu", "language": "hu-HU", "gender": "Male", "model": "hu-HU-TamasNeural" }, { "code": "id", "language": "id-ID", "gender": "Male", "model": "id-ID-ArdiNeural" }, { "code": "is", "language": "is-IS", "gender": "Female", "model": "is-IS-GudrunNeural" }, { "code": "it", "language": "it-IT", "gender": "Male", "model": "it-IT-DiegoNeural" }, { "code": "ja", "language": "ja-JP", "gender": "Female", "model": "ja-JP-NanamiNeural" }, { "code": "kk", "language": "kk-KZ", "gender": "Female", "model": "kk-KZ-AigulNeural" }, { "code": "km", "language": "km-KH", "gender": "Female", "model": "km-KH-SreymomNeural" }, { "code": "kn", "language": "kn-IN", "gender": "Female", "model": "kn-IN-SapnaNeural" }, { "code": "ko", "language": "ko-KR", "gender": "Female", "model": "ko-KR-SunHiNeural" }, { "code": "lo", "language": "lo-LA", "gender": "Female", "model": "lo-LA-KeomanyNeural" }, { "code": "lv", "language": "lv-LV", "gender": "Female", "model": "lv-LV-EveritaNeural" }, { "code": "lt", "language": "lt-LT", "gender": "Female", "model": "lt-LT-OnaNeural" }, { "code": "mk", "language": "mk-MK", "gender": "Female", "model": "mk-MK-MarijaNeural" }, { "code": "ml", "language": "ml-IN", "gender": "Female", "model": "ml-IN-SobhanaNeural" }, { "code": "mr", "language": "mr-IN", "gender": "Female", "model": "mr-IN-AarohiNeural" }, { "code": "ms", "language": "ms-MY", "gender": "Male", "model": "ms-MY-OsmanNeural" }, { "code": "mt", "language": "mt-MT", "gender": "Female", "model": "mt-MT-GraceNeural" }, { "code": "my", "language": "my-MM", "gender": "Female", "model": "my-MM-NilarNeural" }, { "code": "nl", "language": "nl-NL", "gender": "Female", "model": "nl-NL-ColetteNeural" }, { "code": "nb", "language": "nb-NO", "gender": "Female", "model": "nb-NO-PernilleNeural" }, { "code": "pl", "language": "pl-PL", "gender": "Female", "model": "pl-PL-ZofiaNeural" }, { "code": "ps", "language": "ps-AF", "gender": "Female", "model": "ps-AF-LatifaNeural" }, { "code": "pt", "language": "pt-BR", "gender": "Female", "model": "pt-BR-FranciscaNeural" }, { "code": "pt-pt", "language": "pt-PT", "gender": "Female", "model": "pt-PT-FernandaNeural" }, { "code": "ro", "language": "ro-RO", "gender": "Male", "model": "ro-RO-EmilNeural" }, { "code": "ru", "language": "ru-RU", "gender": "Female", "model": "ru-RU-DariyaNeural" }, { "code": "sk", "language": "sk-SK", "gender": "Male", "model": "sk-SK-LukasNeural" }, { "code": "sl", "language": "sl-SI", "gender": "Male", "model": "sl-SI-RokNeural" }, { "code": "sr-cyrl", "language": "sr-RS", "gender": "Female", "model": "sr-RS-SophieNeural" }, { "code": "sv", "language": "sv-SE", "gender": "Female", "model": "sv-SE-SofieNeural" }, { "code": "ta", "language": "ta-IN", "gender": "Female", "model": "ta-IN-PallaviNeural" }, { "code": "te", "language": "te-IN", "gender": "Male", "model": "te-IN-ShrutiNeural" }, { "code": "th", "language": "th-TH", "gender": "Male", "model": "th-TH-NiwatNeural" }, { "code": "tr", "language": "tr-TR", "gender": "Female", "model": "tr-TR-EmelNeural" }, { "code": "uk", "language": "uk-UA", "gender": "Female", "model": "uk-UA-PolinaNeural" }, { "code": "ur", "language": "ur-IN", "gender": "Female", "model": "ur-IN-GulNeural" }, { "code": "uz", "language": "uz-UZ", "gender": "Female", "model": "uz-UZ-MadinaNeural" }, { "code": "vi", "language": "vi-VN", "gender": "Male", "model": "vi-VN-NamMinhNeural" }, { "code": "zh-hans", "language": "zh-CN", "gender": "Female", "model": "zh-CN-XiaoxiaoNeural" }, { "code": "zh-hant", "language": "zh-CN", "gender": "Female", "model": "zh-CN-XiaoxiaoNeural" }, { "code": "yue", "language": "zh-HK", "gender": "Female", "model": "zh-HK-HiuGaaiNeural" }];
const YANDEX_LANGUAGE = ['af', 'am', 'ar', 'az', 'ba', 'be', 'bg', 'bn', 'bs', 'ca', 'ceb', 'cs', 'cv', 'cy', 'da', 'de', 'el', 'emj', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'ga', 'gd', 'gl', 'gu', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'jv', 'ka', 'kazlat', 'kk', 'km', 'kn', 'ko', 'ky', 'la', 'lb', 'lo', 'lt', 'lv', 'mg', 'mhr', 'mi', 'mk', 'ml', 'mn', 'mr', 'mrj', 'ms', 'mt', 'my', 'ne', 'nl', 'no', 'pa', 'pap', 'pl', 'pt', 'ro', 'ru', 'sah', 'si', 'sjn', 'sk', 'sl', 'sq', 'sr', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'tl', 'tr', 'tt', 'udm', 'uk', 'ur', 'uz', 'uzbcyr', 'vi', 'xh', 'yi', 'zh', 'zu'];
const DEEPL_LANGUAGE = ['ar', 'bg', 'cs', 'da', 'de', 'el', 'en', 'en-gb', 'en-us', 'es', 'et', 'fi', 'fr', 'ga', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ko', 'lt', 'lv', 'mt', 'nb', 'nl', 'no', 'pl', 'pt', 'pt-br', 'pt-pt', 'ro', 'ru', 'sk', 'sl', 'sv', 'tr', 'uk', 'zh'];
const BAIDU_LANGUAGE = ['ach', 'afr', 'aka', 'alb', 'amh', 'ara', 'arg', 'arm', 'arq', 'asm', 'ast', 'aym', 'aze', 'bak', 'bal', 'baq', 'bel', 'bem', 'ben', 'ber', 'bho', 'bis', 'bli', 'bos', 'bre', 'bul', 'bur', 'cat', 'ceb', 'chr', 'cht', 'chv', 'cor', 'cos', 'cre', 'cri', 'cs', 'dan', 'de', 'div', 'el', 'en', 'eno', 'epo', 'est', 'fao', 'fil', 'fin', 'fra', 'fri', 'frm', 'frn', 'fry', 'ful', 'geo', 'gla', 'gle', 'glg', 'glv', 'gra', 'grn', 'guj', 'hak', 'hau', 'haw', 'heb', 'hi', 'hil', 'hkm', 'hmn', 'hrv', 'ht', 'hu', 'hup', 'ibo', 'ice', 'id', 'ido', 'iku', 'ina', 'ing', 'it', 'jav', 'jp', 'kab', 'kah', 'kal', 'kan', 'kas', 'kau', 'kin', 'kir', 'kli', 'kok', 'kon', 'kor', 'kur', 'lag', 'lao', 'lat', 'lav', 'lim', 'lin', 'lit', 'log', 'loj', 'los', 'ltz', 'lug', 'mac', 'mah', 'mai', 'mal', 'mao', 'mar', 'mau', 'may', 'mg', 'mlt', 'mot', 'nbl', 'nea', 'nep', 'nl', 'nno', 'nob', 'nor', 'nqo', 'nya', 'oci', 'oji', 'ori', 'orm', 'oss', 'pam', 'pan', 'pap', 'ped', 'per', 'pl', 'pot', 'pt', 'pus', 'que', 'ro', 'roh', 'rom', 'ru', 'ruy', 'san', 'sco', 'sec', 'sha', 'sil', 'sin', 'sk', 'slo', 'sm', 'sme', 'sna', 'snd', 'sol', 'som', 'sot', 'spa', 'src', 'srd', 'srp', 'sun', 'swa', 'swe', 'syr', 'tam', 'tat', 'tel', 'tet', 'tgk', 'tgl', 'th', 'tir', 'tr', 'tso', 'tua', 'tuk', 'twi', 'ukr', 'ups', 'urd', 'ven', 'vie', 'wel', 'wln', 'wol', 'wyw', 'xho', 'yid', 'yor', 'yue', 'zaz', 'zh', 'zul'];
const SOGOU_LANGUAGE = ['ar', 'pl', 'da', 'de', 'ru', 'fr', 'fi', 'ko', 'nl', 'cs', 'pt', 'ja', 'sv', 'th', 'tr', 'es', 'hu', 'en', 'it', 'vi', 'zh-CHS'];
const WATSON_LANGUAGE = ['ar', 'bg', 'bn', 'bs', 'ca', 'cnr', 'cs', 'cy', 'da', 'de', 'el', 'en', 'es', 'et', 'eu', 'fi', 'fr', 'fr-CA', 'ga', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'kn', 'ko', 'lt', 'lv', 'ml', 'mr', 'ms', 'mt', 'nb', 'ne', 'nl', 'pa', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sr', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'zh', 'zh-TW'];

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

//const gtk =[320305, 131321201]
const baiduPreprocessing = (text) => {
    let textArray = [...text];
    if (textArray.length > 30) {
        return textArray.slice(0, 10).join('') + textArray.slice(Math.floor(textArray.length / 2) - 5, Math.floor(textArray.length / 2) + 5).join('') + textArray.slice(-10).join('');
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
        const tmpWebPage = await axiosFetch.get('https://fanyi.baidu.com/', {
            headers: { cookie }
        });
        if (tmpWebPage.headers['set-cookie']) {
            const tmpBaiduCookie = Array.isArray(tmpWebPage.headers['set-cookie']) ? tmpWebPage.headers['set-cookie'] : [tmpWebPage.headers['set-cookie']];
            //get cookie again
            return GetBaiduTranslatorToken(tmpBaiduCookie.map((cookie) => cookie.split(';')[0]).join(';'), ++loop);
        }
        else {
            resultContent.page = tmpWebPage.data;
            try {
                resultContent.common = new Function('let localStorage={getItem:function(n){return 1}};return ' + /window\['common'\](?:\s|)=(?:\s|)([^;]+);/.exec(tmpWebPage.data || '')?.[1].replaceAll(':,', ':') || 'null')();
                const tmpGtk = String(new Function('return ' + /window\.gtk(?:\s|)=(?:\s|)"([^;]+)";/.exec(tmpWebPage.data || '')?.[1] || '""')())
                    .split('.')
                    .map((x) => Number(x));
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
        text = text.join('\n');
    }
    try {
        const languageResult = await axiosFetch.post('https://fanyi.baidu.com/langdetect', new URLSearchParams({ query: text }).toString(), { headers: { cookie } });
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
const BaiduTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #BaiduTranslator ');
    }
    if (!SupportedLanguage(BAIDU_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BAIDU_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #BaiduTranslator ');
    }
    //get baidu translator page
    let cookie = '', token = '', gtk = [];
    if (ext.cookie && typeof ext.cookie === 'string' && ext.token && typeof ext.token === 'string' && ext.gtk && Array.isArray(ext.gtk) && ext.gtk.length === 2 && !ext.gtk.some((gtkItem) => isNaN(gtkItem))) {
        cookie = ext.cookie;
        token = ext.token;
        gtk = ext.gtk;
    }
    else {
        const baiduTranslatorTokenResponse = await GetBaiduTranslatorToken();
        if (baiduTranslatorTokenResponse.message) {
            return Promise.reject(baiduTranslatorTokenResponse.message);
        }
        else if (baiduTranslatorTokenResponse.page && baiduTranslatorTokenResponse.cookie) {
            cookie = baiduTranslatorTokenResponse.cookie;
            token = baiduTranslatorTokenResponse.common?.token || '';
            gtk = baiduTranslatorTokenResponse.gtk;
        }
        else {
            return Promise.reject('Empty text #BaiduTranslator ');
        }
    }
    const fromLaguage = source === 'auto' ? await BaiduLanguagePredict(text, cookie) : source;
    if (fromLaguage === '_') {
        return Promise.reject('Unsupported source language #BaiduTranslator ');
    }
    return new Promise(async (resolve, reject) => {
        if (Array.isArray(text)) {
            text = text.join('\n');
        }
        axiosFetch
            .post('https://fanyi.baidu.com/v2transapi?' +
            new URLSearchParams({
                from: fromLaguage,
                to: target || 'en'
            }).toString(), new URLSearchParams({
            from: fromLaguage,
            to: target || 'en',
            query: text,
            transtype: 'translang',
            simple_means_flag: '3',
            sign: GoogleTranslateTk(baiduPreprocessing(text), gtk || []),
            token,
            domain: 'common'
        }).toString(), { headers: { cookie } })
            .then((response) => {
            if (response?.data?.trans_result?.data && response?.data?.trans_result?.data instanceof Array) {
                resolve(raw ? response.data : response.data.trans_result.data.map((x) => x.dst).join('\n'));
            }
            reject(raw ? response.data : 'Invalid content #BaiduTranslator ');
        })
            .catch((e) => {
            reject(raw ? e : e.toString());
        });
    });
};
const BaiduTTS = async (lang = 'en', text = '', ext = {}) => {
    try {
        const response = await axiosFetch.get('https://fanyi.baidu.com/gettts?' +
            new URLSearchParams({
                lan: lang,
                text: Array.isArray(text) ? text.join('\n') : text,
                spd: lang === 'zh' ? '5' : '3',
                source: 'web'
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

const ws = typeof WebSocket !== 'undefined' ? WebSocket : null;

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
    const ws$1 = new ws('wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4');
    return new Promise((resolve, reject) => {
        let response = {
            buffer: new Uint8Array().buffer,
            content_type: '',
            content_length: 0,
            ext: {}
        };
        const responseContent = [];
        ws$1.addEventListener('message', async (event) => {
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
                        ws$1.close();
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
        ws$1.addEventListener('close', () => {
            if (response.ext) {
                response.ext.raw = responseContent;
            }
            response.buffer = concatBuffer(...responseContent.filter((x) => x.type === 'audio').map((x) => (typeof x.body !== 'string' ? x.body.buffer : new ArrayBuffer(0))));
            response.content_length = response.buffer.byteLength;
            resolve(response);
        });
        ws$1.addEventListener('open', () => {
            if (Array.isArray(text)) {
                text = text.join('\n');
            }
            ws$1.send(encodeMSBrowserTTSRequest({
                'Content-Type': 'application/ssml+xml',
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
            ws$1.send(encodeMSBrowserTTSRequest({
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
        axiosFetch
            .post('https://go.ie.sogou.com/qbpc/translate', `S-Param=${body}`)
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

const WatsonDetect = async (text = '') => {
    if (!text) {
        return '_';
    }
    if (Array.isArray(text)) {
        text = text.join('\n');
    }
    try {
        const languageResult = await axiosFetch.post('https://www.ibm.com/demos/live/watson-language-translator/api/translate/detect', {
            text
        });
        if (languageResult.data?.status === 'success') {
            return languageResult.data?.payload?.languages?.[0]?.language?.language || '_';
        }
        else {
            return '_';
        }
    }
    catch (e) {
        return '_';
    }
};
const WatsonTranslator = async (text = '', source = 'en', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #WatsonTranslate ');
    }
    if (source === 'auto' || !SupportedLanguage(WATSON_LANGUAGE, target || 'en') || !SupportedLanguage(WATSON_LANGUAGE, source || 'en')) {
        return Promise.reject('Unsupported target language #WatsonTranslate ');
    }
    return new Promise(async (resolve, reject) => {
        axiosFetch
            .post('https://www.ibm.com/demos/live/watson-language-translator/api/translate/text', {
            source,
            target,
            text: Array.isArray(text) ? text.join('\n') : text
        })
            .then((response) => {
            if (response.data && response.data?.status === 'success' && response.data?.payload?.translations instanceof Array) {
                resolve(raw ? response.data : response.data.payload.translations.map((x) => x?.translation || '').join('\n'));
            }
            reject(raw ? response.data : 'Invalid content #WatsonTranslate ');
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
            case 'baidu':
                result.content = await BaiduTranslator(text, source, target, !!raw, ext);
                break;
            case 'deepl':
                result.content = await DeepL(text, source, target, !!raw, ext);
                break;
            case 'watson':
                result.content = await WatsonTranslator(text, source, target, !!raw, ext);
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};

export { BaiduLanguagePredict, BaiduTTS, BaiduTranslator, DeepL, GetBaiduTranslatorToken, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTTS, GoogleTranslate, GoogleTranslateTk, IsChs, IsCht, MicrosoftBrowserPredict, MicrosoftBrowserTTS, MicrosoftBrowserTranslator, MicrosoftTTS, MicrosoftTranslator, SogouBrowserTranslator, SogouTTS, WatsonDetect, WatsonTranslator, YandexBrowserTranslator, YandexDetect, YandexTranslator, Translator as default };
//# sourceMappingURL=translator.mod.js.map
