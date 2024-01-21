import { describe, test } from 'vitest'
import { DeepL } from '../dist/esm/index.js'

describe('DeepL translator(web)', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await DeepL('hello', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await DeepL('こんにちわ', 'auto', 'zh', false)).toMatch('日安')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await DeepL('你好', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await DeepL('안녕하세요', 'auto', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(DeepL('', 'auto', 'zh', false)).rejects.toMatch('Empty text #DeepL ')
    })
})
