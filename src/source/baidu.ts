import { TranslatorModuleFunction } from '../types.js'
import { BAIDU_LANGUAGE, SupportedLanguage } from '../misc.js'
import { GoogleTranslateTk } from './google.js'
import axiosFetch from 'translator-utils-axios-helper'

//const gtk =[320305, 131321201]

const baiduPreprocessing = (text: string): string => {
    let textArray = [...text]
    if (textArray.length > 30) {
        return textArray.slice(0, 10).join('') + textArray.slice(Math.floor(textArray.length / 2) - 5, Math.floor(textArray.length / 2) + 5).join('') + textArray.slice(-10).join('')
    }
    return text
}
export interface GetBaiduTranslatorTokenResult {
    message: string | null
    page: string | null
    cookie: string | null
    common: { token?: string } | null
    gtk: number[] | null
}
const GetBaiduTranslatorToken = async (cookie = '', loop = 0): Promise<GetBaiduTranslatorTokenResult> => {
    let resultContent: GetBaiduTranslatorTokenResult = {
        message: null,
        page: null,
        cookie: null,
        common: null,
        gtk: null
    }
    if (loop > 5) {
        resultContent.message = 'Unable to get translator page (Loop > 5) #BaiduTranslator '
        return resultContent
    }
    if (cookie) {
        resultContent.cookie = cookie
    }
    try {
        const tmpWebPage = await axiosFetch.get('https://fanyi.baidu.com/', {
            headers: { cookie }
        })
        if (tmpWebPage.headers['set-cookie']) {
            //get cookie again
            return GetBaiduTranslatorToken(tmpWebPage.headers['set-cookie'].map((cookie) => cookie.split(';')[0]).join(';'), ++loop)
        } else {
            resultContent.page = tmpWebPage.data
            try {
                resultContent.common = new Function('let localStorage={getItem:function(n){return 1}};return ' + /window\['common'\](?:\s|)=(?:\s|)([^;]+);/.exec(tmpWebPage.data || '')?.[1].replaceAll(':,', ':') || 'null')()
                const tmpGtk = String(new Function('return ' + /window\.gtk(?:\s|)=(?:\s|)"([^;]+)";/.exec(tmpWebPage.data || '')?.[1] || '""')())
                    .split('.')
                    .map((x) => Number(x))
                if (tmpGtk.length === 2) {
                    resultContent.gtk = tmpGtk
                } else {
                    throw null
                }
            } catch (e) {
                resultContent.message = 'Unable to get variables #BaiduTranslator '
                return resultContent
            }
            return resultContent
        }
    } catch (e) {
        resultContent.message = 'Unable to get translator page #BaiduTranslator '
        return resultContent
    }
}

const BaiduLanguagePredict = async (text: string | string[] = '', cookie = ''): Promise<string | '_'> => {
    if (!text) {
        return '_'
    }
    if (Array.isArray(text)) {
        text = text.join('\n')
    }
    try {
        const languageResult = await axiosFetch.post('https://fanyi.baidu.com/langdetect', new URLSearchParams({ query: text }).toString(), { headers: { cookie } })
        if (languageResult.data?.error === 0 && languageResult.data?.lan) {
            return languageResult.data?.lan || ''
        } else {
            return '_'
        }
    } catch (e) {
        return '_'
    }
}

const BaiduTranslator: TranslatorModuleFunction<'baidu'> = async (text = '', source = 'auto', target, raw, ext = {}) => {
    if (!text) {
        return Promise.reject('Empty text #BaiduTranslator ')
    }
    if (!SupportedLanguage(BAIDU_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BAIDU_LANGUAGE, source || 'en'))) {
        return Promise.reject('Unsupported target language #BaiduTranslator ')
    }

    //get baidu translator page

    let cookie: GetBaiduTranslatorTokenResult['cookie'] = '',
        token = '',
        gtk: GetBaiduTranslatorTokenResult['gtk'] = []
    if (ext.cookie && typeof ext.cookie === 'string' && ext.token && typeof ext.token === 'string' && ext.gtk && Array.isArray(ext.gtk) && ext.gtk.length === 2 && !ext.gtk.some((gtkItem) => isNaN(gtkItem))) {
        cookie = ext.cookie
        token = ext.token
        gtk = ext.gtk
    } else {
        const baiduTranslatorTokenResponse = await GetBaiduTranslatorToken()
        if (baiduTranslatorTokenResponse.message) {
            return Promise.reject(baiduTranslatorTokenResponse.message)
        } else if (baiduTranslatorTokenResponse.page && baiduTranslatorTokenResponse.cookie) {
            cookie = baiduTranslatorTokenResponse.cookie
            token = baiduTranslatorTokenResponse.common?.token || ''
            gtk = baiduTranslatorTokenResponse.gtk
        } else {
            return Promise.reject('Empty text #BaiduTranslator ')
        }
    }

    const fromLaguage = source === 'auto' ? await BaiduLanguagePredict(text, cookie) : source
    if (fromLaguage === '_') {
        return Promise.reject('Unsupported source language #BaiduTranslator ')
    }

    return new Promise(async (resolve, reject) => {
        if (Array.isArray(text)) {
            text = text.join('\n')
        }
        axiosFetch
            .post(
                'https://fanyi.baidu.com/v2transapi?' +
                    new URLSearchParams({
                        from: fromLaguage,
                        to: target || 'en'
                    }).toString(),
                new URLSearchParams({
                    from: fromLaguage,
                    to: target || 'en',
                    query: text,
                    transtype: 'translang',
                    simple_means_flag: '3',
                    sign: GoogleTranslateTk(baiduPreprocessing(text), gtk || []),
                    token,
                    domain: 'common'
                }).toString(),
                { headers: { cookie } }
            )
            .then((response) => {
                if (response?.data?.trans_result?.data && response?.data?.trans_result?.data instanceof Array) {
                    resolve(raw ? response.data : response.data.trans_result.data.map((x: any) => x.dst).join('\n'))
                }
                reject(raw ? response.data : 'Invalid content #BaiduTranslator ')
            })
            .catch((e) => {
                reject(raw ? e : e.toString())
            })
    })
}

export { BaiduTranslator, BaiduLanguagePredict, GetBaiduTranslatorToken }
