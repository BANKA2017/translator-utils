import { expect, test, describe } from 'vitest'
import { GoogleBrowserTranslate, GoogleTranslate, GoogleTranslateTk } from '../src/source/google'

test('Google TK', async () => {
    expect(GoogleTranslateTk('test content')).toEqual('531820.985965')
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
