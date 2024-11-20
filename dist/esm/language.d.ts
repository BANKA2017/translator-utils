import type { TargetFilter } from './types.js';
export type GOOGLE_LIST = 'aa' | 'ab' | 'ace' | 'ach' | 'af' | 'ak' | 'alz' | 'am' | 'ar' | 'as' | 'av' | 'awa' | 'ay' | 'az' | 'ba' | 'bal' | 'ban' | 'bbc' | 'bci' | 'be' | 'bem' | 'ber' | 'ber-latn' | 'bew' | 'bg' | 'bho' | 'bik' | 'bm' | 'bm-nkoo' | 'bn' | 'bo' | 'br' | 'bs' | 'bts' | 'btx' | 'bua' | 'ca' | 'ce' | 'ceb' | 'cgg' | 'ch' | 'chk' | 'chm' | 'ckb' | 'cnh' | 'co' | 'crh' | 'crs' | 'cs' | 'cv' | 'cy' | 'da' | 'de' | 'din' | 'doi' | 'dov' | 'dv' | 'dyu' | 'dz' | 'ee' | 'el' | 'en' | 'eo' | 'es' | 'et' | 'eu' | 'fa' | 'fa-af' | 'ff' | 'fi' | 'fj' | 'fo' | 'fon' | 'fr' | 'fur' | 'fy' | 'ga' | 'gaa' | 'gd' | 'gl' | 'gn' | 'gom' | 'gu' | 'gv' | 'ha' | 'haw' | 'hi' | 'hil' | 'hmn' | 'hr' | 'hrx' | 'ht' | 'hu' | 'hy' | 'iba' | 'id' | 'ig' | 'ilo' | 'is' | 'it' | 'iw' | 'ja' | 'jam' | 'jw' | 'ka' | 'kac' | 'kek' | 'kg' | 'kha' | 'kk' | 'kl' | 'km' | 'kn' | 'ko' | 'kr' | 'kri' | 'ktu' | 'ku' | 'kv' | 'ky' | 'la' | 'lb' | 'lg' | 'li' | 'lij' | 'lmo' | 'ln' | 'lo' | 'lt' | 'ltg' | 'luo' | 'lus' | 'lv' | 'mad' | 'mai' | 'mak' | 'mam' | 'mfe' | 'mg' | 'mh' | 'mi' | 'min' | 'mk' | 'ml' | 'mn' | 'mni-mtei' | 'mr' | 'ms' | 'ms-arab' | 'mt' | 'mwr' | 'my' | 'ndc-zw' | 'ne' | 'new' | 'nhe' | 'nl' | 'no' | 'nr' | 'nso' | 'nus' | 'ny' | 'oc' | 'om' | 'or' | 'os' | 'pa' | 'pa-arab' | 'pag' | 'pam' | 'pap' | 'pl' | 'ps' | 'pt' | 'pt-pt' | 'qu' | 'rn' | 'ro' | 'rom' | 'ru' | 'rw' | 'sa' | 'sah' | 'sat-latn' | 'scn' | 'sd' | 'se' | 'sg' | 'shn' | 'si' | 'sk' | 'sl' | 'sm' | 'sn' | 'so' | 'sq' | 'sr' | 'ss' | 'st' | 'su' | 'sus' | 'sv' | 'sw' | 'szl' | 'ta' | 'tcy' | 'te' | 'tet' | 'tg' | 'th' | 'ti' | 'tiv' | 'tk' | 'tl' | 'tn' | 'to' | 'tpi' | 'tr' | 'trp' | 'ts' | 'tt' | 'tum' | 'ty' | 'tyv' | 'udm' | 'ug' | 'uk' | 'ur' | 'uz' | 've' | 'vec' | 'vi' | 'war' | 'wo' | 'xh' | 'yi' | 'yo' | 'yua' | 'yue' | 'zap' | 'zh-cn' | 'zh-tw' | 'zu';
export declare const GOOGLE_LANGUAGE: TargetFilter['google'][];
export declare const GOOGLE_LANGUAGE_OBJECT: {
    [p in GOOGLE_LIST]: string;
};
export type BING_LIST = 'af' | 'am' | 'ar' | 'as' | 'az' | 'ba' | 'bg' | 'bho' | 'bn' | 'bo' | 'brx' | 'bs' | 'ca' | 'cs' | 'cy' | 'da' | 'de' | 'doi' | 'dsb' | 'dv' | 'el' | 'en' | 'es' | 'et' | 'eu' | 'fa' | 'fi' | 'fil' | 'fj' | 'fo' | 'fr' | 'fr-ca' | 'ga' | 'gl' | 'gom' | 'gu' | 'ha' | 'he' | 'hi' | 'hr' | 'hsb' | 'ht' | 'hu' | 'hy' | 'id' | 'ig' | 'ikt' | 'is' | 'it' | 'iu' | 'iu-latn' | 'ja' | 'ka' | 'kk' | 'km' | 'kmr' | 'kn' | 'ko' | 'ks' | 'ku' | 'ky' | 'ln' | 'lo' | 'lt' | 'lug' | 'lv' | 'lzh' | 'mai' | 'mg' | 'mi' | 'mk' | 'ml' | 'mn-cyrl' | 'mn-mong' | 'mr' | 'ms' | 'mt' | 'mww' | 'my' | 'nb' | 'ne' | 'nl' | 'nso' | 'nya' | 'or' | 'otq' | 'pa' | 'pl' | 'prs' | 'ps' | 'pt' | 'pt-pt' | 'ro' | 'ru' | 'run' | 'rw' | 'sd' | 'si' | 'sk' | 'sl' | 'sm' | 'sn' | 'so' | 'sq' | 'sr-cyrl' | 'sr-latn' | 'st' | 'sv' | 'sw' | 'ta' | 'te' | 'th' | 'ti' | 'tk' | 'tlh-latn' | 'tn' | 'to' | 'tr' | 'tt' | 'ty' | 'ug' | 'uk' | 'ur' | 'uz' | 'vi' | 'xh' | 'yo' | 'yua' | 'yue' | 'zh-hans' | 'zh-hant' | 'zu';
export declare const BING_LANGUAGE: TargetFilter['microsoft'][];
export declare const BING_LANGUAGE_OBJECT: {
    [p in BING_LIST]: string;
};
export type BING_TTS_LIST = 'af' | 'am' | 'ar' | 'bn' | 'bg' | 'ca' | 'cs' | 'cy' | 'da' | 'de' | 'el' | 'en' | 'es' | 'et' | 'fa' | 'fi' | 'fr' | 'fr-ca' | 'ga' | 'gu' | 'he' | 'hi' | 'hr' | 'hu' | 'id' | 'is' | 'it' | 'ja' | 'kk' | 'km' | 'kn' | 'ko' | 'lo' | 'lv' | 'lt' | 'mk' | 'ml' | 'mr' | 'ms' | 'mt' | 'my' | 'nl' | 'nb' | 'pl' | 'ps' | 'pt' | 'pt-pt' | 'ro' | 'ru' | 'sk' | 'sl' | 'sr-cyrl' | 'sv' | 'ta' | 'te' | 'th' | 'tr' | 'uk' | 'ur' | 'uz' | 'vi' | 'zh-hans' | 'zh-hant' | 'yue';
export declare const MICROSOFT_TTS_LIST: {
    code: BING_TTS_LIST;
    language: string;
    gender: 'Male' | 'Female';
    model: string;
}[];
export type MICROSOFT_EDGE_TTS_TYPE = 'af-ZA' | 'sq-AL' | 'am-ET' | 'ar-DZ' | 'ar-BH' | 'ar-EG' | 'ar-IQ' | 'ar-JO' | 'ar-KW' | 'ar-LB' | 'ar-LY' | 'ar-MA' | 'ar-OM' | 'ar-QA' | 'ar-SA' | 'ar-SY' | 'ar-TN' | 'ar-AE' | 'ar-YE' | 'az-AZ' | 'bn-BD' | 'bn-IN' | 'bs-BA' | 'bg-BG' | 'my-MM' | 'ca-ES' | 'zh-HK' | 'zh-CN' | 'zh-CN-liaoning' | 'zh-TW' | 'zh-CN-shaanxi' | 'hr-HR' | 'cs-CZ' | 'da-DK' | 'nl-BE' | 'nl-NL' | 'en-AU' | 'en-CA' | 'en-HK' | 'en-IN' | 'en-IE' | 'en-KE' | 'en-NZ' | 'en-NG' | 'en-PH' | 'en-US' | 'en-SG' | 'en-ZA' | 'en-TZ' | 'en-GB' | 'et-EE' | 'fil-PH' | 'fi-FI' | 'fr-BE' | 'fr-CA' | 'fr-FR' | 'fr-CH' | 'gl-ES' | 'ka-GE' | 'de-AT' | 'de-DE' | 'de-CH' | 'el-GR' | 'gu-IN' | 'he-IL' | 'hi-IN' | 'hu-HU' | 'is-IS' | 'id-ID' | 'ga-IE' | 'it-IT' | 'ja-JP' | 'jv-ID' | 'kn-IN' | 'kk-KZ' | 'km-KH' | 'ko-KR' | 'lo-LA' | 'lv-LV' | 'lt-LT' | 'mk-MK' | 'ms-MY' | 'ml-IN' | 'mt-MT' | 'mr-IN' | 'mn-MN' | 'ne-NP' | 'nb-NO' | 'ps-AF' | 'fa-IR' | 'pl-PL' | 'pt-BR' | 'pt-PT' | 'ro-RO' | 'ru-RU' | 'sr-RS' | 'si-LK' | 'sk-SK' | 'sl-SI' | 'so-SO' | 'es-AR' | 'es-BO' | 'es-CL' | 'es-ES' | 'es-CO' | 'es-CR' | 'es-CU' | 'es-DO' | 'es-EC' | 'es-SV' | 'es-GQ' | 'es-GT' | 'es-HN' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PY' | 'es-PE' | 'es-PR' | 'es-US' | 'es-UY' | 'es-VE' | 'su-ID' | 'sw-KE' | 'sw-TZ' | 'sv-SE' | 'ta-IN' | 'ta-MY' | 'ta-SG' | 'ta-LK' | 'te-IN' | 'th-TH' | 'tr-TR' | 'uk-UA' | 'ur-IN' | 'ur-PK' | 'uz-UZ' | 'vi-VN' | 'cy-GB' | 'zu-ZA';
export declare const MICROSOFT_EDGE_TTS_LIST: {
    language: MICROSOFT_EDGE_TTS_TYPE;
    gender: 'Male' | 'Female';
    model: string;
}[];
export type YANDEX_LIST = 'af' | 'am' | 'ar' | 'az' | 'ba' | 'be' | 'bg' | 'bn' | 'bs' | 'ca' | 'ceb' | 'cs' | 'cv' | 'cy' | 'da' | 'de' | 'el' | 'emj' | 'en' | 'eo' | 'es' | 'et' | 'eu' | 'fa' | 'fi' | 'fr' | 'ga' | 'gd' | 'gl' | 'gu' | 'he' | 'hi' | 'hr' | 'ht' | 'hu' | 'hy' | 'id' | 'is' | 'it' | 'ja' | 'jv' | 'ka' | 'kazlat' | 'kk' | 'km' | 'kn' | 'ko' | 'ky' | 'la' | 'lb' | 'lo' | 'lt' | 'lv' | 'mg' | 'mhr' | 'mi' | 'mk' | 'ml' | 'mn' | 'mr' | 'mrj' | 'ms' | 'mt' | 'my' | 'ne' | 'nl' | 'no' | 'pa' | 'pap' | 'pl' | 'pt' | 'ro' | 'ru' | 'sah' | 'si' | 'sjn' | 'sk' | 'sl' | 'sq' | 'sr' | 'su' | 'sv' | 'sw' | 'ta' | 'te' | 'tg' | 'th' | 'tl' | 'tr' | 'tt' | 'udm' | 'uk' | 'ur' | 'uz' | 'uzbcyr' | 'vi' | 'xh' | 'yi' | 'zh' | 'zu';
export declare const YANDEX_LANGUAGE: TargetFilter['yandex'][];
export declare const YANDEX_LANGUAGE_OBJECT: {
    [p in YANDEX_LIST]: string;
};
export type DEEPL_LIST = 'ar' | 'bg' | 'cs' | 'da' | 'de' | 'el' | 'en' | 'en-gb' | 'en-us' | 'es' | 'et' | 'fi' | 'fr' | 'ga' | 'hr' | 'hu' | 'id' | 'is' | 'it' | 'ja' | 'ko' | 'lt' | 'lv' | 'mt' | 'nb' | 'nl' | 'no' | 'pl' | 'pt' | 'pt-br' | 'pt-pt' | 'ro' | 'ru' | 'sk' | 'sl' | 'sv' | 'tr' | 'uk' | 'zh';
export declare const DEEPL_LANGUAGE: TargetFilter['deepl'][];
export declare const DEEPL_LANGUAGE_OBJECT: {
    [p in DEEPL_LIST]: string;
};
export type BAIDU_LIST = 'ach' | 'afr' | 'aka' | 'alb' | 'amh' | 'ara' | 'arg' | 'arm' | 'arq' | 'asm' | 'ast' | 'aym' | 'aze' | 'bak' | 'bal' | 'baq' | 'bel' | 'bem' | 'ben' | 'ber' | 'bho' | 'bis' | 'bli' | 'bos' | 'bre' | 'bul' | 'bur' | 'cat' | 'ceb' | 'chr' | 'cht' | 'chv' | 'cor' | 'cos' | 'cre' | 'cri' | 'cs' | 'dan' | 'de' | 'div' | 'el' | 'en' | 'eno' | 'epo' | 'est' | 'fao' | 'fil' | 'fin' | 'fra' | 'fri' | 'frm' | 'frn' | 'fry' | 'ful' | 'geo' | 'gla' | 'gle' | 'glg' | 'glv' | 'gra' | 'grn' | 'guj' | 'hak' | 'hau' | 'haw' | 'heb' | 'hi' | 'hil' | 'hkm' | 'hmn' | 'hrv' | 'ht' | 'hu' | 'hup' | 'ibo' | 'ice' | 'id' | 'ido' | 'iku' | 'ina' | 'ing' | 'it' | 'jav' | 'jp' | 'kab' | 'kah' | 'kal' | 'kan' | 'kas' | 'kau' | 'kin' | 'kir' | 'kli' | 'kok' | 'kon' | 'kor' | 'kur' | 'lag' | 'lao' | 'lat' | 'lav' | 'lim' | 'lin' | 'lit' | 'log' | 'loj' | 'los' | 'ltz' | 'lug' | 'mac' | 'mah' | 'mai' | 'mal' | 'mao' | 'mar' | 'mau' | 'may' | 'mg' | 'mlt' | 'mot' | 'nbl' | 'nea' | 'nep' | 'nl' | 'nno' | 'nob' | 'nor' | 'nqo' | 'nya' | 'oci' | 'oji' | 'ori' | 'orm' | 'oss' | 'pam' | 'pan' | 'pap' | 'ped' | 'per' | 'pl' | 'pot' | 'pt' | 'pus' | 'que' | 'ro' | 'roh' | 'rom' | 'ru' | 'ruy' | 'san' | 'sco' | 'sec' | 'sha' | 'sil' | 'sin' | 'sk' | 'slo' | 'sm' | 'sme' | 'sna' | 'snd' | 'sol' | 'som' | 'sot' | 'spa' | 'src' | 'srd' | 'srp' | 'sun' | 'swa' | 'swe' | 'syr' | 'tam' | 'tat' | 'tel' | 'tet' | 'tgk' | 'tgl' | 'th' | 'tir' | 'tr' | 'tso' | 'tua' | 'tuk' | 'twi' | 'ukr' | 'ups' | 'urd' | 'ven' | 'vie' | 'wel' | 'wln' | 'wol' | 'wyw' | 'xho' | 'yid' | 'yor' | 'yue' | 'zaz' | 'zh' | 'zul';
export declare const BAIDU_LANGUAGE: TargetFilter['baidu'][];
export declare const BAIDU_LANGUAGE_OBJECT: {
    [p in BAIDU_LIST]: string;
};
export type BAIDU_TTS_LIST = 'en' | 'zh' | 'yue' | 'ara' | 'kor' | 'jp' | 'th' | 'pt' | 'spa' | 'fra' | 'ru' | 'de' | 'uk';
export type SOGOU_LIST = 'ar' | 'pl' | 'da' | 'de' | 'ru' | 'fr' | 'fi' | 'ko' | 'nl' | 'cs' | 'pt' | 'ja' | 'sv' | 'th' | 'tr' | 'es' | 'hu' | 'en' | 'it' | 'vi' | 'zh-CHS';
export declare const SOGOU_LANGUAGE: TargetFilter['sogou'][];
export declare const SOGOU_LANGUAGE_OBJECT: {
    [p in SOGOU_LIST]: string;
};
export type SOGOU_TTS_LIST = Exclude<SOGOU_LIST, 'tr'>;
export type WATSON_LIST = 'ar' | 'bg' | 'bn' | 'bs' | 'ca' | 'cnr' | 'cs' | 'cy' | 'da' | 'de' | 'el' | 'en' | 'es' | 'et' | 'eu' | 'fi' | 'fr' | 'fr-CA' | 'ga' | 'gu' | 'he' | 'hi' | 'hr' | 'hu' | 'id' | 'it' | 'ja' | 'kn' | 'ko' | 'lt' | 'lv' | 'ml' | 'mr' | 'ms' | 'mt' | 'nb' | 'ne' | 'nl' | 'pa' | 'pl' | 'pt' | 'ro' | 'ru' | 'si' | 'sk' | 'sl' | 'sr' | 'sv' | 'ta' | 'te' | 'th' | 'tr' | 'uk' | 'ur' | 'vi' | 'zh' | 'zh-TW';
export declare const WATSON_LANGUAGE: TargetFilter['watson'][];
export declare const WATSON_LANGUAGE_OBJECT: {
    [p in WATSON_LIST]: string;
};
