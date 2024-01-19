import { describe, test } from 'vitest'
import { YandexDetect, YandexBrowserTranslator, YandexTranslator } from '../lib/index.js'

describe('Yandex predict', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await YandexDetect('hello')).toEqual('en')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await YandexDetect('こんにちわ')).toEqual('ja')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await YandexDetect('你好')).toEqual('zh')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await YandexDetect('안녕하세요')).toEqual('ko')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        expect(await YandexDetect('')).toEqual('_')
    })
})

describe('Yandex translator(android)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await YandexTranslator('hello', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await YandexTranslator('こんにちわ', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await YandexTranslator('你好', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await YandexTranslator('안녕하세요', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(YandexTranslator('', 'auto', 'zh', false)).rejects.toMatch('Empty text #YandexTranslator ')
    })
})

describe('Yandex translator(browser)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await YandexBrowserTranslator('hello', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await YandexBrowserTranslator('こんにちわ', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await YandexBrowserTranslator('你好', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await YandexBrowserTranslator('안녕하세요', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(YandexBrowserTranslator('', 'auto', 'zh', false)).rejects.toMatch('Empty text #YandexTranslator ')
    })
})
