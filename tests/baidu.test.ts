import { describe, expect, test } from 'vitest'
import { BaiduLanguagePredict, BaiduTranslator, GetBaiduTranslatorToken, GetBaiduTranslatorTokenResult } from '../src/source/baidu'

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
        expect(await BaiduTranslator('hello', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await BaiduTranslator('こんにちわ', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await BaiduTranslator('你好', 'zh', false)).toMatch(/(H|h)ello/)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await BaiduTranslator('안녕하세요', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(BaiduTranslator('', 'zh', false)).rejects.toMatch('Empty text #BaiduTranslator ')
    })
})
