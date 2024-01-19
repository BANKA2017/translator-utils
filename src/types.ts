import type { BAIDU_LIST, BAIDU_TTS_LIST, BING_LIST, BING_TTS_LIST, DEEPL_LIST, GOOGLE_LIST, SOGOU_LIST, SOGOU_TTS_LIST, YANDEX_LIST } from 'language.js'

export type TranslatorModuleFunction<P extends Platform> = <R extends boolean = false>(
    text: string | string[],
    source: TargetFilter[P] | 'auto',
    target: TargetFilter[P],
    raw?: R,
    ext?: { [p in string]: unknown }
) => Promise<R extends true ? any : string>

export type TranslatorFunction = <P extends Platform, R extends boolean = false>(
    text: string | string[],
    platform: P,
    source: TargetFilter[P] | 'auto',
    target: TargetFilter[P],
    raw?: R,
    ext?: { [p in string]: unknown }
) => Promise<TranslatorResult<NonNullable<R>>>
export interface TranslatorResult<K extends boolean> {
    content: K extends true ? any : string
    message: string
}

export type TTSResponse = {
    buffer: ArrayBuffer
    content_type: string
    content_length: number
}

export type TTSModuleFunction<P extends Platform> = (lang: TargetFilter[P], text: string | string[], ext?: { [p in string]: unknown }) => Promise<TTSResponse>

export type Platform = 'google' | 'google_browser' | 'microsoft' | 'microsoft_browser' | 'microsoft_tts' | 'sogou' | 'sogou_browser' | 'sogou_tts' | 'yandex' | 'yandex_browser' | 'baidu' | 'baidu_tts' | 'deepl'
export type BrowserPlatform = 'google_browser' | 'microsoft_browser' | 'sogou' | 'sogou_browser' | 'yandex_browser'

export type TargetFilter = {
    baidu: BAIDU_LIST
    baidu_tts: BAIDU_TTS_LIST
    google: GOOGLE_LIST
    google_browser: GOOGLE_LIST
    deepl: DEEPL_LIST
    microsoft: BING_LIST
    microsoft_browser: BING_LIST
    microsoft_tts: BING_TTS_LIST
    sogou: SOGOU_LIST
    sogou_browser: SOGOU_LIST
    sogou_tts: SOGOU_TTS_LIST
    yandex: YANDEX_LIST
    yandex_browser: YANDEX_LIST
}
