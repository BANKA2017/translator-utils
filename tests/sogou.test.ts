import { describe, test } from "vitest"
import { SogouBrowserTranslator } from '../src/source/sogou'

describe('Sogou translator(browser)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await SogouBrowserTranslator('hello', 'zh-CHS', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await SogouBrowserTranslator('こんにちわ', 'zh-CHS', false)).toMatch('你好')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await SogouBrowserTranslator('你好', 'zh-CHS', false)).toMatch('你好')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await SogouBrowserTranslator('안녕하세요', 'zh-CHS', false)).toMatch('你好')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(SogouBrowserTranslator('', 'zh-CHS', false)).rejects.toMatch('Empty text #SogouTranslator ')
    })
})
