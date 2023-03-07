import { describe, test } from "vitest"
import { DeepL } from '../src/source/deepl.mjs'

describe('DeepL translator(web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await DeepL('hello', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await DeepL('こんにちわ', 'zh', false)).toMatch('日安')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await DeepL('你好', 'zh', false)).toMatch('你好')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await DeepL('안녕하세요', 'zh', false)).toMatch('嗨')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(DeepL('', 'zh', false)).rejects.toMatch('Empty text #DeepL ')
    })
})
