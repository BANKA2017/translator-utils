import { describe, expect, test } from 'vitest'
import { SogouBrowserTranslator, SogouTTS } from '../lib/index.js'

describe('Sogou translator(browser)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await SogouBrowserTranslator('hello', 'auto', 'zh-CHS', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await SogouBrowserTranslator('こんにちわ', 'auto', 'zh-CHS', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await SogouBrowserTranslator('你好', 'auto', 'zh-CHS', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await SogouBrowserTranslator('안녕하세요', 'auto', 'zh-CHS', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(SogouBrowserTranslator('', 'auto', 'zh-CHS', false)).rejects.toMatch('Empty text #SogouTranslator ')
    })
})

test('Sogou TTS', async () => {
    const sogouTTS = await SogouTTS('en', 'hi')
    expect(sogouTTS.content_length).toBeGreaterThan(0)
    expect(sogouTTS.content_type).toMatch('audio/')
})
