import { describe, expect, test } from "vitest";
import { GetMicrosoftBrowserTranslatorAuth, MicrosoftBrowserTranslator, MicrosoftTranslator } from "../src/source/microsoft";


test('Microsoft edge jwt', async () => {
    expect(await GetMicrosoftBrowserTranslatorAuth()).not.toEqual('')
})

describe('Microsoft translator(web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await MicrosoftTranslator('hello', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await MicrosoftTranslator('こんにちわ', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await MicrosoftTranslator('你好', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await MicrosoftTranslator('안녕하세요', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(MicrosoftTranslator('', 'zh-hans', false)).rejects.toMatch('Empty text #MicrosoftTranslator ')
    })
})

describe('Microsoft edge translator(browser)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('hello', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('こんにちわ', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('你好', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('안녕하세요', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(MicrosoftBrowserTranslator('', 'zh-hans', false)).rejects.toMatch('Empty text #MicrosoftTranslator ')
    })
})
