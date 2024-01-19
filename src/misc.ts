import cryptoHandle from 'translator-utils-crypto'

export const SupportedLanguage = (List: string[], language: string): boolean => {
    return List.map((x) => x.toLowerCase()).includes(language.toLowerCase())
}

export const IsChs = (lang = 'zh') => /^zh(?:_|\-)(?:cn|sg|my|chs)|zh|chs|zho$/.test(lang.toLowerCase())
export const IsCht = (lang = 'zh_tw') => /^zh(?:_|\-)(?:tw|hk|mo|cht)|cht$/.test(lang.toLowerCase())

// https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
export const base64_to_buffer = (base64: string): ArrayBuffer => {
    let binaryString = atob(base64)
    let bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
}

export const buffer_to_base64 = (buf: ArrayBuffer): string => {
    let binary = ''
    const bytes = new Uint8Array(buf)
    for (var i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
}

export const generateUUID = (): string => cryptoHandle.randomUUID() || '00000000-0000-0000-0000-000000000000'
