## translator-utils (DEV)

## ⚠ WARNING / 警告

This is an early release version, everything are subject to change, please **DO NOT** used for production!!!

这是一个提前释出的版本，所有内容都可能会改变，请**不要**用于生产环境

---

## Predict (Nodejs/Deno)

`baidu` / `yandex` / `microsoft`

```javascript
import { BaiduLanguagePredict, YandexDetect, MicrosoftBrowserPredict } from '@kdwnil/translator-utils'

await BaiduLanguagePredict('hello') // en
await BaiduLanguagePredict('你好') // zh
await BaiduLanguagePredict('') // _

await YandexDetect('hello') // en
await YandexDetect('你好') // zh
await YandexDetect('') // _

const jwt = await GetMicrosoftBrowserTranslatorAuth()
await MicrosoftBrowserPredict(['hello', '你好'], jwt)
// [
//   {
//     "isTranslationSupported": true,
//     "isTransliterationSupported": false,
//     "language": "en",
//     "score": 1.0
//   },
//   {
//     "isTranslationSupported": true,
//     "isTransliterationSupported": true,
//     "language": "zh-Hant",
//     "score": 0.67
//   }
// ]
```

## Translator

```javascript
import Translator, { GoogleBrowserTranslate } from '@kdwnil/translator-utils'

await Translator('你好', 'google', 'auto', 'zh-cn', false) // { content: 'hello', message: '' }
await Translator('你好', 'google', 'auto', 'zh-cn', true) // { content: RESULT_CONTENT_FROM_GOOGLE_TRANSLATOR, message: '' }

// or...

await GoogleBrowserTranslate('你好', 'auto', 'zh-cn', false)
```

### ext

`ext` is an optional parameter used for state management.

`baidu` and `microsoft`/`microsoft_browser` only

```javascript
import Translator, { GetBaiduTranslatorToken, GetMicrosoftBrowserTranslatorAuth, GetMicrosoftTranslatorToken } from '@kdwnil/translator-util'

// baidu
const { cookie, common, gtk } = await GetBaiduTranslatorToken()
console.log(await Translator('hello', 'baidu', 'auto', 'zh', false, { cookie, token: common.token, gtk }))

// microsoft
const { IG, token, key } = await GetMicrosoftTranslatorToken()
console.log(await Translator('hello', 'microsoft', 'auto', 'zh-hans', false, { IG, token, key }))

// microsoft browser(edge)
let msBrowserJwt = await GetMicrosoftBrowserTranslatorAuth()
console.log(await Translator('hello', 'microsoft_browser', 'auto', 'zh-hans', false, { jwt: msBrowserJwt }))
```

To know more, view files in [~/src/source](https://github.com/BANKA2017/translator-utils/tree/master/src/source)

## Browser

Because of `CORS policy`, you can only use `GoogleBrowserTranslate`, `MicrosoftBrowserTranslator` or `SogouBrowserTranslator` in browser.

`YandexBrowserTranslate` is supported in browser, but predicted service is **NOT** supported, so you can't set `source` to `auto` in function calling.

## Nodejs

**Proxy** can only be used in nodejs environment, set environment variable `http_proxy` and `https_proxy` to active it

## Install

### NPM

```shell
# npm
npm i @kdwnil/translator-utils@github:BANKA2017/translator-utils#npm
# yarn
yarn add @kdwnil/translator-utils@github:BANKA2017/translator-utils#npm
```

### UMD

```html
<!-- es6 only -->
<script src="https://cdn.jsdelivr.net/gh/BANKA2017/translator-utils@npm/dist/translator.min.js"></script>
<!-- example -->
<script type="module">
    console.log(await translator('hi', 'google', 'auto', 'zh-cn', false))
    console.log(await translator('hi', 'microsoft', 'auto', 'zh-hans', false))
    console.log(await translator('hi', 'sogou', 'auto', 'ja', false))
    console.log(await translator('hi', 'yandex', 'en', 'ja', false)) //couldn't use 'auto'

    //or
    translator('hi', 'google', 'auto', 'zh-cn', true)
        .then((response) => {
            console.log(response)
        })
        .catch((e) => {
            console.log(e)
        })
</script>
```

### Deno

```javascript
//like npm
import Translator, { GoogleBrowserTranslate, BaiduLanguagePredict } from 'https://cdn.jsdelivr.net/gh/BANKA2017/translator-utils@npm/dist/esm/translator.mod.js'
```
