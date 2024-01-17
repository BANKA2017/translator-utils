import { describe, expect, test } from 'vitest'
import { GetMicrosoftBrowserTranslatorAuth, MicrosoftBrowserTranslator, MicrosoftTranslator } from '../src/source/microsoft'

test('Microsoft edge jwt', async () => {
    expect(await GetMicrosoftBrowserTranslatorAuth()).not.toEqual('')
})

describe('Microsoft translator(web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await MicrosoftTranslator('hello', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await MicrosoftTranslator('こんにちわ', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await MicrosoftTranslator('你好', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await MicrosoftTranslator('안녕하세요', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(MicrosoftTranslator('', 'auto', 'zh-hans', false)).rejects.toMatch('Empty text #MicrosoftTranslator ')
    })
})

describe('Microsoft edge translator(browser)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('hello', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('こんにちわ', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('你好', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await MicrosoftBrowserTranslator('안녕하세요', 'auto', 'zh-hans', false)).toMatch('你好')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(MicrosoftBrowserTranslator('', 'auto', 'zh-hans', false)).rejects.toMatch('Empty text #MicrosoftTranslator ')
    })
})
