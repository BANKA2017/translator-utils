
//global content
export function Translator(text: string | string[], target: string, platform: string, raw: boolean): Promise<{content: string | unknown, message: string}>

//translator content
export function BaiduTranslator(text: string | string[], target: string, raw: boolean): Promise<string | unknown>
export function DeepL(text: string | string[], target: string, raw: boolean): Promise<string | unknown>
export function GoogleTranslate(text: string | string[], target: string, raw: boolean): Promise<string | unknown>
export function GoogleBrowserTranslate(text: string | string[], target: string, raw: boolean): Promise<string | unknown>
export function MicrosoftTranslator(text: string | string[], target: string, raw: boolean): Promise<string | unknown>
export function MicrosoftBrowserTranslator(text: string | string[], target: string, raw: boolean): Promise<string | unknown>
export function SogouBrowserTranslator(text: string | string[], target: string, raw: boolean): Promise<string | unknown>
export function YandexBrowserTranslator(text: string | string[], target: string, raw: boolean): Promise<string | unknown>

//language list type
export type LanguageList = {[p in string]: string}
export type DetectType = string | '_'

//detect
export function YandexDetect(text: string): Promise<DetectType>
export function BaiduLanguagePredict(text: string, cookie: string): Promise<DetectType>

//IsChinese
export function IsChs(lang: string): boolean
export function IsCht(lang: string): boolean