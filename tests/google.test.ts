import { expect, test, describe } from 'vitest'
import { GoogleBrowserTranslate, GoogleBrowserTranslateV2, GoogleTranslate, GoogleTTS, GoogleTranslateTk } from '../dist/esm/index.js'

test('Google TK', async () => {
    expect(GoogleTranslateTk('test content', [464385, 3806605782])).toEqual('531820.985965')
})

describe('Google translate(web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await GoogleTranslate('hello', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await GoogleTranslate('こんにちわ', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await GoogleTranslate('你好', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await GoogleTranslate('안녕하세요', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(GoogleTranslate('', 'auto', 'zh-cn', false)).rejects.toMatch('Empty text #GoogleTranslate ')
    })
})

describe('Google translate(new web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await GoogleTranslate('hello', 'auto', 'zh-cn', false, { legacy: false })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await GoogleTranslate('こんにちわ', 'auto', 'zh-cn', false, { legacy: false })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await GoogleTranslate('你好', 'auto', 'zh-cn', false, { legacy: false })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await GoogleTranslate('안녕하세요', 'auto', 'zh-cn', false, { legacy: false })).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(GoogleTranslate('', 'auto', 'zh-cn', false, { legacy: false })).rejects.toMatch('Empty text #GoogleTranslate ')
    })
})

describe('Google translate(browser)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await GoogleBrowserTranslate('hello', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await GoogleBrowserTranslate('こんにちわ', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await GoogleBrowserTranslate('你好', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await GoogleBrowserTranslate('안녕하세요', 'auto', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(GoogleBrowserTranslate('', 'auto', 'zh-cn', false)).rejects.toMatch('Empty text #GoogleTranslate ')
    })
})

describe('Google translate(browser v2)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await GoogleBrowserTranslateV2('hello', 'en', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await GoogleBrowserTranslateV2('こんにちわ', 'ja', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await GoogleBrowserTranslateV2('你好', 'zh-tw', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await GoogleBrowserTranslateV2('안녕하세요', 'ko', 'zh-cn', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(GoogleBrowserTranslateV2('', 'en', 'zh-cn', false)).rejects.toMatch('Empty text #GoogleTranslate ')
    })
})

test('Google TTS', async () => {
    const googleTTS = await GoogleTTS('en', 'hi')
    expect(googleTTS.content_length).toBeGreaterThan(0)
    expect(googleTTS.content_type).toMatch('audio/')
})
