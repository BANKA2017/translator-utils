import { describe, test } from 'vitest'
import { SogouBrowserTranslator } from '../src/source/sogou'

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
