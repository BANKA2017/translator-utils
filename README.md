translator-utils (DEV)
---

## ⚠ WARNING / 警告

This is an early release version, everything are subject to change, please **DO NOT** used for production!!!

这是一个提前释出的版本，所有内容都可能会改变，请**不要**用于生产环境

---

## Predict (Nodejs)

only for `baidu` and `yandex`

```javascript
import { BaiduLanguagePredict, YandexDetect } from '@kdwnil/translator-utils'

await BaiduLanguagePredict('hello') // en
await BaiduLanguagePredict('你好')   // zh
await BaiduLanguagePredict('')      // _

await YandexDetect('hello') // en
await YandexDetect('你好')   // zh
await YandexDetect('')      // _

```

## Translator

```javascript
import Translator, { GoogleBrowserTranslate } from '@kdwnil/translator-utils'

await Translator('你好', 'google', 'zh-cn', false) // { content: 'hello', message: '' }
await Translator('你好', 'google', 'zh-cn', true)  // { content: RESULT_CONTENT_FROM_GOOGLE_TRANSLATOR, message: '' }

// or...

await GoogleBrowserTranslate('你好', 'zh-cn', false)
```

To know more, view files in [~/src/source](https://github.com/BANKA2017/translator-utils/tree/master/src/source)

## Browser

Because of `CORS policy`, you can only use `GoogleBrowserTranslate`, `MicrosoftBrowserTranslator` or `SogouBrowserTranslator` in browser

## Nodejs

**Proxy** can only be used in nodejs environment, set environment variable `http_proxy` and `https_proxy` to active it

## Install

### NPM

```shell
yarn add @kdwnil/translator-utils@github:BANKA2017/translator-utils#master
```

### UMD

```html
<script src="https://cdn.jsdelivr.net/gh/BANKA2017/translator-utils@master/dist/translator.min.js"></script>
<!--example-->
<script type="module">
    console.log(await translator('hi','google','zh-cn',false))
    console.log(await translator('hi','microsoft','zh-hans',false))
    console.log(await translator('hi','sogou','ja',false))
</script>
```