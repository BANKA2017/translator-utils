export const BAIDU_LANGUAGE = ["zh", "jp", "jpka", "th", "fra", "en", "spa", "kor", "tr", "vie", "ms", "de", "ru", "ir", "ara", "est", "be", "bul", "hi", "is", "pl", "fa", "dan", "tl", "fin", "nl", "ca", "cs", "hr", "lv", "lt", "rom", "af", "no", "pt_br", "pt", "swe", "sr", "eo", "sk", "slo", "sw", "uk", "iw", "el", "hu", "hy", "it", "id", "sq", "am", "as", "az", "eu", "bn", "bs", "gl", "ka", "gu", "ha", "ig", "iu", "ga", "zu", "kn", "kk", "ky", "lb", "mk", "mt", "mi", "mr", "ne", "or", "pa", "qu", "tn", "si", "ta", "tt", "te", "ur", "uz", "cy", "yo", "yue", "wyw", "cht"];
export const GOOGLE_LANGUAGE = ["sq", "ar", "am", "as", "az", "ee", "ay", "ga", "et", "or", "om", "eu", "be", "bm", "bg", "is", "pl", "bs", "fa", "bho", "af", "tt", "da", "de", "dv", "ti", "doi", "ru", "fr", "sa", "tl", "fi", "fy", "km", "ka", "gom", "gu", "gn", "kk", "ht", "ko", "ha", "nl", "ky", "gl", "ca", "cs", "kn", "co", "kri", "hr", "qu", "ku", "ckb", "la", "lv", "lo", "lt", "ln", "lg", "lb", "rw", "ro", "mg", "mt", "mr", "ml", "ms", "mk", "mai", "mi", "mni-mtei", "mn", "bn", "lus", "my", "hmn", "xh", "zu", "ne", "no", "pa", "pt", "ps", "ny", "ak", "ja", "sv", "sm", "sr", "nso", "st", "si", "eo", "sk", "sl", "sw", "gd", "ceb", "so", "tg", "te", "ta", "th", "tr", "tk", "cy", "ug", "ur", "uk", "uz", "es", "iw", "el", "haw", "sd", "hu", "sn", "hy", "ig", "ilo", "it", "yi", "hi", "su", "id", "jw", "en", "yo", "vi", "zh-tw", "zh-cn", "ts"];
export const DEEPL_LANGUAGE = ["en", "en-us", "en-gb", "de", "fr", "es", "it", "nl", "pl", "ru", "pt", "pt-pt", "pt-br", "ja", "zh", "bg", "cs", "da", "et", "fi", "el", "hu", "id", "lv", "lt", "ro", "sk", "sl", "sv", "uk", "tr", "ko", "nb"];
export const BING_LANGUAGE = ["lzh", "ikt", "iu-latn", "mn-cyrl", "mn-mong", "hsb", "zh-hans", "zh-hant", "da", "uk", "uz", "ur", "nb", "hy", "ru", "bg", "tlh-latn", "hr", "otq", "is", "gl", "ca", "hu", "af", "kn", "hi", "id", "gu", "kk", "iu", "tk", "tr", "ty", "sr-latn", "sr-cyrl", "or", "cy", "bn", "yua", "ne", "ba", "eu", "he", "el", "ku", "kmr", "de", "it", "lv", "cs", "ti", "fj", "sk", "sl", "sw", "pa", "ja", "ps", "ky", "ka", "mi", "to", "fo", "fr", "fr-ca", "pl", "bs", "fa", "te", "ta", "th", "ht", "ga", "et", "sv", "zu", "lt", "yue", "so", "ug", "my", "ro", "lo", "fi", "mww", "en", "nl", "fil", "sm", "pt", "pt-pt", "bo", "es", "vi", "prs", "dv", "az", "am", "sq", "ar", "as", "tt", "ko", "mk", "mg", "mr", "ml", "ms", "mt", "km"];
export const SOGOU_LANGUAGE = ["ar", "pl", "da", "de", "ru", "fr", "fi", "ko", "nl", "cs", "pt", "ja", "sv", "th", "tr", "es", "hu", "en", "it", "vi", "zh-chs"];
export const YANDEX_LANGUAGE = ["af", "sq", "am", "ar", "hy", "az", "ba", "eu", "be", "bn", "bs", "bg", "my", "ca", "ceb", "zh", "cv", "hr", "cs", "da", "nl", "sjn", "emj", "en", "eo", "et", "fi", "fr", "gl", "ka", "de", "el", "gu", "ht", "he", "mrj", "hi", "hu", "is", "id", "ga", "it", "ja", "jv", "kn", "kk", "kazlat", "km", "ko", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mhr", "mn", "ne", "no", "pap", "fa", "pl", "pt", "pt-br", "pa", "ro", "ru", "gd", "sr", "sr-latn", "si", "sk", "sl", "es", "su", "sw", "sv", "tl", "tg", "ta", "tt", "te", "th", "tr", "udm", "uk", "ur", "uz", "uzbcyr", "vi", "cy", "xh", "sah", "yi", "zu"];
export const SupportedLanguage = (source, language) => {
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
export const IsChs = (lang = 'zh') => /^zh(?:_|\-)(?:cn|sg|my|chs)|zh|chs|zho$/.test(lang.toLowerCase());
export const IsCht = (lang = 'zh_tw') => /^zh(?:_|\-)(?:tw|hk|mo|cht)|cht$/.test(lang.toLowerCase());
