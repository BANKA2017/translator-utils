import { readFileSync, writeFileSync } from 'fs'

let jsContent = "import type { TargetFilter } from 'types.js'\n\n"

// google content/type/<-tts
// JSON.stringify(Object.fromEntries([...document.querySelectorAll(<SELECTOR>)[0].querySelectorAll('[data-language-code]')].map(x => [x.dataset.languageCode.toLowerCase(), x.innerText]).sort((a, b) => a[0] > b[0] ? 1 : -1)))
const google = JSON.parse(readFileSync('../assets/target/google.json').toString())
jsContent += `export type GOOGLE_LIST = ${Object.entries(google)
    .map((lang) => "'" + lang[0] + "'")
    .join('|')}\n`
jsContent += `export const GOOGLE_LANGUAGE: TargetFilter['google'][] = [${Object.entries(google)
    .map((lang) => "'" + lang[0] + "'")
    .join(',')}]\n`
jsContent += `export const GOOGLE_LANGUAGE_OBJECT: { [p in GOOGLE_LIST]: string } = ${JSON.stringify(google)}\n`

// microsoft content/type/tts
// JSON.stringify(Object.fromEntries([...tta_srcsl.querySelectorAll('option[aria-label]')].map(x => [x.value.toLowerCase(), x.innerText]).sort((a, b) => a[0] > b[0] ? 1 : -1)))
const microsoft = JSON.parse(readFileSync('../assets/target/bing.json').toString())
jsContent += `export type BING_LIST = ${Object.entries(microsoft)
    .map((lang) => "'" + lang[0] + "'")
    .join('|')}\n`
jsContent += `export const BING_LANGUAGE: TargetFilter['microsoft'][] = [${Object.entries(microsoft)
    .map((lang) => "'" + lang[0] + "'")
    .join(',')}]\n`
jsContent += `export const BING_LANGUAGE_OBJECT: { [p in BING_LIST]: string } = ${JSON.stringify(microsoft)}\n`

const microsoft_tts = JSON.parse(readFileSync('../assets/target/microsoft_tts.json').toString())

jsContent += `export type BING_TTS_LIST = ${microsoft_tts.map((msttsItem) => "'" + msttsItem.code + "'").join('|')}\n`
jsContent += `export const MICROSOFT_TTS_LIST: { code: BING_TTS_LIST; language: string; gender: 'Male' | 'Female'; model: string }[] = ${JSON.stringify(microsoft_tts)}\n`

// yandex content/type
// JSON.stringify(Object.fromEntries([...document.querySelectorAll('.langs-item.langs-item_cell.langs-item_hasLetterSpace')].map(x => [x.dataset.value.toLowerCase(), x.innerText.includes('\n') ? x.innerText.split('\n')[1].trim() : x.innerText.trim()]).sort((a, b) => a[0] > b[0] ? 1 : -1)))
const yandex = JSON.parse(readFileSync('../assets/target/yandex.json').toString())
jsContent += `export type YANDEX_LIST = ${Object.entries(yandex)
    .map((lang) => "'" + lang[0] + "'")
    .join('|')}\n`
jsContent += `export const YANDEX_LANGUAGE: TargetFilter['yandex'][] = [${Object.entries(yandex)
    .map((lang) => "'" + lang[0] + "'")
    .join(',')}]\n`
jsContent += `export const YANDEX_LANGUAGE_OBJECT: { [p in YANDEX_LIST]: string } = ${JSON.stringify(yandex)}\n`

// deepl content/type
const deepl = JSON.parse(readFileSync('../assets/target/deepl.json').toString())
jsContent += `export type DEEPL_LIST = ${Object.entries(deepl)
    .map((lang) => "'" + lang[0] + "'")
    .join('|')}\n`
jsContent += `export const DEEPL_LANGUAGE: TargetFilter['deepl'][] = [${Object.entries(deepl)
    .map((lang) => "'" + lang[0] + "'")
    .join(',')}]\n`
jsContent += `export const DEEPL_LANGUAGE_OBJECT: { [p in DEEPL_LIST]: string } = ${JSON.stringify(deepl)}\n`

// baidu content/type/tts
const baidu = JSON.parse(readFileSync('../assets/target/baidu.json').toString())
jsContent += `export type BAIDU_LIST = ${Object.entries(baidu)
    .map((lang) => "'" + lang[0] + "'")
    .join('|')}\n`
jsContent += `export const BAIDU_LANGUAGE: TargetFilter['baidu'][] = [${Object.entries(baidu)
    .map((lang) => "'" + lang[0] + "'")
    .join(',')}]\n`
jsContent += `export const BAIDU_LANGUAGE_OBJECT: { [p in BAIDU_LIST]: string } = ${JSON.stringify(baidu)}\n`

const baidu_tts = JSON.parse(readFileSync('../assets/target/baidu_tts.json').toString())
jsContent += `export type BAIDU_TTS_LIST = ${baidu_tts.map((lang) => "'" + lang + "'").join('|')}\n`

// sogou
const sogou = JSON.parse(readFileSync('../assets/target/sogou.json').toString())
jsContent += `export type SOGOU_LIST = ${Object.entries(sogou)
    .map((lang) => "'" + lang[0] + "'")
    .join('|')}\n`
jsContent += `export const SOGOU_LANGUAGE: TargetFilter['sogou'][] = [${Object.entries(sogou)
    .map((lang) => "'" + lang[0] + "'")
    .join(',')}]\n`
jsContent += `export const SOGOU_LANGUAGE_OBJECT: { [p in SOGOU_LIST]: string } = ${JSON.stringify(sogou)}\n`

jsContent += `export type SOGOU_TTS_LIST = Exclude<SOGOU_LIST, 'tr'>\n`

writeFileSync('../src/language.ts', jsContent)
