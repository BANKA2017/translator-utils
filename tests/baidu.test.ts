import { describe, expect, test } from 'vitest'
import { BaiduLanguagePredict, BaiduTranslator, GetBaiduTranslatorToken, BaiduTTS } from '../dist/esm/index.js'
import type { GetBaiduTranslatorTokenResult } from '../lib/source/baidu.js'

let globalPage: GetBaiduTranslatorTokenResult = {
    message: null,
    page: null,
    cookie: null,
    common: null,
    gtk: null
}

test('Baidu token', async () => {
    globalPage = await GetBaiduTranslatorToken()
    expect(globalPage.message).toBeNull
    expect(globalPage.page).not.toBeNull
    expect(globalPage.cookie).toMatch(/BAIDUID=([^:]+):FG=1;BAIDUID_BFESS=\1:FG=1/)
    expect(globalPage.common?.token).toMatch(/\w+/)
    expect(globalPage.gtk).toHaveLength(2)
})

describe('Baidu predict', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await BaiduLanguagePredict('hello', globalPage.cookie || undefined)).toEqual('en')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await BaiduLanguagePredict('こんにちわ', globalPage.cookie || undefined)).toEqual('jp')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await BaiduLanguagePredict('你好', globalPage.cookie || undefined)).toEqual('zh')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await BaiduLanguagePredict('안녕하세요', globalPage.cookie || undefined)).toEqual('kor')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        expect(await BaiduLanguagePredict('', globalPage.cookie || undefined)).toEqual('_')
    })
})

describe('Baidu translator(web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await BaiduTranslator('hello', 'auto', 'zh', false, { cookie: globalPage.cookie, token: globalPage.common?.token, gtk: globalPage.gtk })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await BaiduTranslator('こんにちわ', 'auto', 'zh', false, { cookie: globalPage.cookie, token: globalPage.common?.token, gtk: globalPage.gtk })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await BaiduTranslator('你好', 'auto', 'zh', false, { cookie: globalPage.cookie, token: globalPage.common?.token, gtk: globalPage.gtk })).toMatch(/(H|h)ello/)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await BaiduTranslator('안녕하세요', 'auto', 'zh', false, { cookie: globalPage.cookie, token: globalPage.common?.token, gtk: globalPage.gtk })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(BaiduTranslator('', 'auto', 'zh', false, { cookie: globalPage.cookie, token: globalPage.common?.token, gtk: globalPage.gtk })).rejects.toMatch('Empty text #BaiduTranslator ')
    })
})

// Note: baidu tts is always return an empty response
test('Baidu TTS', async () => {
    const baiduTTS = await BaiduTTS('en', 'hi')
    expect(baiduTTS.content_length).toBeGreaterThan(0)
    expect(baiduTTS.content_type).toMatch('audio/')
})
