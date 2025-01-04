/// <reference path="index.node.d.ts" />
import { HttpsProxyAgent } from 'hpagent'
import https from 'node:https'
import { randomBytes } from 'node:crypto'

class AxiosRequest {
    requestHandle(url, postData, options = {}) {
        const HTTPS_PROXY = process.env.https_proxy || process.env.HTTPS_PROXY || ''

        if (HTTPS_PROXY && HttpsProxyAgent) {
            options.agent = new HttpsProxyAgent({ proxy: HTTPS_PROXY })
        }
        if (!options.timeout) {
            options.timeout = 30000
        }
        const defaultUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        if (!options.headers) {
            options.headers = { 'user-agent': defaultUA }
        } else {
            options.headers['user-agent'] = defaultUA
        }

        const validPostRequest = (options?.method || '').toLowerCase() === 'post' && postData
        const isFormData = postData instanceof FormData
        if (validPostRequest && !isFormData) {
            options.headers['content-type'] = 'application/x-www-form-urlencoded'
            if (typeof postData === 'object') {
                postData = JSON.stringify(postData)
                options.headers['content-type'] = 'application/json'
            }
            options.headers['content-length'] = Buffer.byteLength(postData)
        } else if (isFormData) {
            const multipartFormData = MultipartFormBuilder(postData)
            options.headers['content-type'] = 'multipart/form-data; boundary=' + multipartFormData.boundary
            postData = multipartFormData.body
        }
        return new Promise((resolve, reject) => {
            const req = https.request(url, options, (res) => {
                let tmpData = []
                res.on('data', (data) => {
                    tmpData.push(data)
                })
                res.on('close', () => {
                    resolve(this.responseBuilder(res, Buffer.concat(tmpData), options))
                })
            })

            req.on('error', (e) => {
                reject({ cause: e, toString: () => e.toString() })
            })
            if (validPostRequest) {
                req.write(postData)
            }
            req.end()
        })
    }
    //https://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
    isJson(str) {
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            return false
        }
    }
    responseBuilder(res, data, options = {}) {
        switch (options?.responseType) {
            case 'arraybuffer':
                break
            default:
                data = new TextDecoder().decode(data)
                if (this.isJson(data)) {
                    data = JSON.parse(data)
                }
        }
        return {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            data
        }
    }
    get(url, options = {}) {
        return this.requestHandle(url, null, { method: 'GET', ...options })
    }
    post(url, data = '', options = {}) {
        return this.requestHandle(url, data, { method: 'POST', ...options })
    }
}

// FormData
const MultipartFormBuilder = (_body = new FormData()) => {
    const boundary = '----WebKitFormBoundary' + randomBytes(16).toString('hex')
    let body = ''
    _body.forEach((v, k) => {
        body += `--${boundary}\r\n`
        // TODO fix value issue?
        body += `Content-Disposition: form-data; name="${k}"\r\n\r\n`
        body += `${v}\r\n`
    })
    body += `--${boundary}--`
    return {
        boundary,
        body
    }
}

const axiosFetch = new AxiosRequest()

export default axiosFetch
