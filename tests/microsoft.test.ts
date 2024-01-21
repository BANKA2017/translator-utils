import { describe, expect, test } from 'vitest'
import { GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken, MicrosoftBrowserPredict, MicrosoftBrowserTranslator, MicrosoftTranslator, MicrosoftTTS } from '../dist/esm/index.js'

let jwt = ''
test('Microsoft edge jwt', async () => {
    jwt = await GetMicrosoftBrowserTranslatorAuth()
    expect(jwt).not.toEqual('')
})

test('Microsoft translator predict', async () => {
    const msPredict = await MicrosoftBrowserPredict(['This is an English text', 'これは日本語のテキストです', '这是一段中文文本', '이것은 한국어로 된 텍스트입니다'], jwt)
    expect(msPredict[0].language.toLocaleLowerCase()).toEqual('en')
    expect(msPredict[1].language.toLocaleLowerCase()).toEqual('ja')
    expect(msPredict[2].language.toLocaleLowerCase()).toEqual('zh-hans')
    expect(msPredict[3].language.toLocaleLowerCase()).toEqual('ko')
})

describe('Microsoft translator(edge)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await MicrosoftTranslator('hello', 'auto', 'zh-hans', false, { jwt })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await MicrosoftTranslator('こんにちわ', 'auto', 'zh-hans', false, { jwt })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await MicrosoftTranslator('你好', 'auto', 'zh-hans', false, { jwt })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await MicrosoftTranslator('안녕하세요', 'auto', 'zh-hans', false, { jwt })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(MicrosoftTranslator('', 'auto', 'zh-hans', false, { jwt })).rejects.toMatch('Empty text #MicrosoftTranslator ')
    })
})

let msTranslatorWebPage: { IG: string; token: string; key: number; message: string }
test('Microsoft translator web page', async () => {
    msTranslatorWebPage = await GetMicrosoftTranslatorToken()
    expect(msTranslatorWebPage.message).toEqual('')
    expect(msTranslatorWebPage.IG).not.toEqual('')
    expect(msTranslatorWebPage.token).not.toEqual('')
    expect(msTranslatorWebPage.key).greaterThan(0)
})

describe('Microsoft edge translator(web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('hello', 'auto', 'zh-hans', false, { IG: msTranslatorWebPage.IG, token: msTranslatorWebPage.token, key: msTranslatorWebPage.key })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('こんにちわ', 'auto', 'zh-hans', false, { IG: msTranslatorWebPage.IG, token: msTranslatorWebPage.token, key: msTranslatorWebPage.key })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('你好', 'auto', 'zh-hans', false, { IG: msTranslatorWebPage.IG, token: msTranslatorWebPage.token, key: msTranslatorWebPage.key })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('안녕하세요', 'auto', 'zh-hans', false, { IG: msTranslatorWebPage.IG, token: msTranslatorWebPage.token, key: msTranslatorWebPage.key })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(MicrosoftBrowserTranslator('', 'auto', 'zh-hans', false, { IG: msTranslatorWebPage.IG, token: msTranslatorWebPage.token, key: msTranslatorWebPage.key })).rejects.toMatch('Empty text #MicrosoftTranslator ')
    })
})

test('Microsoft TTS', async () => {
    const msTTS = await MicrosoftTTS('en', 'hi', { IG: msTranslatorWebPage.IG, token: msTranslatorWebPage.token, key: msTranslatorWebPage.key })
    expect(msTTS.content_length).toBeGreaterThan(0)
    expect(msTTS.content_type).toMatch('audio/')
})
