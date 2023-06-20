/// <reference path="index.d.ts" />
class AxiosRequest {
    requestHandle (url, postData, options = {}) {
        if (!options.timeout) {
            options.timeout = 30000
        }
        
        const validPostRequest = (options?.method??'').toLowerCase() === 'post' && postData
        if (!options.headers) {
            options.headers = {}
        }
        if (!options.headers?.['content-type']) {
            options.headers['content-type'] = 'application/x-www-form-urlencoded'
        }
        if (validPostRequest) {
            if (typeof postData === 'object') {
                postData = JSON.stringify(postData)
                options.headers['content-type'] = 'application/json'
            }
            options.headers['content-length'] = postData.length
            options.body = postData
        }
        return new Promise((resolve, reject) => {
            fetch(url, options).then(async response => {
                return {response, data: await response.text()}
            }).then(res => {
                resolve(this.responseBuilder(res.response, res.data))
            }).catch(e => {
                reject({ cause: e, toString: () => e.toString() })
            })
        })
    }
    //https://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not

    responseBuilder (res, data) {
        data = data.toString()
        try {data = JSON.parse(data)} catch (e) {}

        let headers = Object.fromEntries(res.headers.entries())
        
        if (headers['set-cookie'] && res.headers.getAll) {
            //workers
            //TypeError: getAll() can only be used with the header name "Set-Cookie".
            headers['set-cookie'] = res.headers.getAll('set-cookie')
        } else if (headers['set-cookie']) {
            //Deno and Node.js 18
            //https://github.com/denoland/deno/pull/5100
            headers['set-cookie'] = [...res.headers.entries()].filter(header => header[0] === 'set-cookie').map(header => header[1])
        }
        return {
            status: res.status,
            statusText: res.statusText,
            headers,
            data
        }
    }
    get (url, options = {}) {
        options.method = 'GET'
        return this.requestHandle(url, null, options)
    }
    post (url, data = '', options = {}) {
        options.method = 'POST'
        return this.requestHandle(url, data, options)
    }
}

const axiosFetch = new AxiosRequest

export default axiosFetch
