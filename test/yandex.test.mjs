import { describe, test } from "vitest"
import { YandexDetect, YandexBrowserTranslator } from "../src/source/yandex.mjs"

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

describe('Yandex translator(browser)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await YandexBrowserTranslator('hello', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await YandexBrowserTranslator('こんにちわ', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await YandexBrowserTranslator('你好', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await YandexBrowserTranslator('안녕하세요', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(YandexBrowserTranslator('', 'zh', false)).rejects.toMatch('Empty text #YandexTranslator ')
    })
})
