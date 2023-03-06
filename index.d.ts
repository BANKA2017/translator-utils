
//global content
export function Translator(text: string, target: string, platform: string, raw: boolean): Promise<{content: string | unknown, message: string}>

//translator content
export function BaiduTranslator(text: string, target: string, raw: boolean): Promise<string | unknown>
export function DeepL(text: string, target: string, raw: boolean): Promise<string | unknown>
export function GoogleTranslate(text: string, target: string, raw: boolean): Promise<string | unknown>
export function GoogleBrowserTranslate(text: string, target: string, raw: boolean): Promise<string | unknown>
export function MicrosoftTranslator(text: string, target: string, raw: boolean): Promise<string | unknown>
export function MicrosoftBrowserTranslator(text: string, target: string, raw: boolean): Promise<string | unknown>
export function SogouBrowserTranslator(text: string, target: string, raw: boolean): Promise<string | unknown>
export function YandexBrowserTranslator(text: string, target: string, raw: boolean): Promise<string | unknown>

//language list type
export type LanguageList = {[p in string]: string}
export type DetectType = string | '_'

//detect
export function YandexDetect(text: string): Promise<DetectType>
export function BaiduLanguagePredict(text: string, cookie: string): Promise<DetectType>

//IsChinese
export function IsChs(lang: string): boolean
export function IsCht(lang: string): boolean