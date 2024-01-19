type Response = any

export interface responseBuilder {
    status: number
    statusText: string
    // @ts-ignore
    // set-cookie only invalid in browser
    headers: { 'set-cookie'?: string | string[]; 'content-type'?: string | string[]; 'content-length'?: string | string[]; [p in string]: string | string[] }
    data: Response
}

export declare class AxiosRequest {
    requestHandle: (url: string, postData: string | object, options: object) => Promise<responseBuilder>
    isJson: (str: string) => boolean
    responseBuilder: (res: Response, data: string) => responseBuilder
    get: (url: string, options?: object) => Promise<responseBuilder>
    post: (url: string, data: string | object, options?: object) => Promise<responseBuilder>
}

declare const axiosFetch: AxiosRequest

export default axiosFetch
