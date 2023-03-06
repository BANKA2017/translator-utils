import { BaiduLanguagePredict, BaiduTranslator } from "./src/source/baidu.mjs"
import { DeepL } from "./src/source/deepl.mjs"
import { GoogleTranslate, GoogleBrowserTranslate } from "./src/source/google.mjs"
import { MicrosoftTranslator, MicrosoftBrowserTranslator } from "./src/source/microsoft.mjs"
import { SogouBrowserTranslator } from "./src/source/sogou.mjs"
import { YandexDetect, YandexBrowserTranslator } from "./src/source/yandex.mjs"

import { IsChs, IsCht } from "./src/utils.mjs"

export { BaiduLanguagePredict, YandexDetect, BaiduTranslator, DeepL, GoogleBrowserTranslate, GoogleTranslate, MicrosoftBrowserTranslator, MicrosoftTranslator, SogouBrowserTranslator, YandexBrowserTranslator, IsChs, IsCht }
