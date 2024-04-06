import { test, describe } from 'vitest'
import { WatsonDetect, WatsonTranslator } from '../dist/esm/index.js'

describe('Watson detect', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await WatsonDetect('This is an English text')).toEqual('en')
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await WatsonDetect('これは日本語のテキストです')).toEqual('ja')
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await WatsonDetect('这是一段中文文本')).toEqual('zh')
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await WatsonDetect('이것은 한국어로 된 텍스트입니다')).toEqual('ko')
    })
    test.concurrent('Empty text', async ({ expect }) => {
        expect(await WatsonDetect('')).toEqual('_')
    })
})

describe('Watson translate', () => {
    test.concurrent('English', async ({ expect }) => {
        expect(await WatsonTranslator('hello', 'en', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Japanese', async ({ expect }) => {
        expect(await WatsonTranslator('こんにちわ', 'ja', 'zh', false)).toMatch(/(早上|你|妳|您)好/gm)
    })
    test.concurrent('Simplified Chinese', async ({ expect }) => {
        expect(await WatsonTranslator('你好', 'zh-TW', 'zh', false)).toMatch(/(你|妳|您)好/gm)
    })
    test.concurrent('Korean', async ({ expect }) => {
        expect(await WatsonTranslator('안녕하세요', 'ko', 'zh', false)).toMatch(/(早上|你|妳|您)好/gm)
    })
    test.concurrent('Empty text', async ({ expect }) => {
        await expect(WatsonTranslator('', 'en', 'zh', false)).rejects.toMatch('Empty text #WatsonTranslate ')
    })
})
