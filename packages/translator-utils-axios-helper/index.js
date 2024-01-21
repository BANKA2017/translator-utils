/// <reference path="index.d.ts" />
class AxiosRequest {
    requestHandle(url, postData, options = {}) {
        if (!options.timeout) {
            options.timeout = 30000
        }

        const validPostRequest = (options?.method || '').toLowerCase() === 'post' && postData
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
        const method = options?.method || 'GET'
        return new Promise((resolve, reject) => {
            if (typeof fetch === 'function') {
                fetch(url, options)
                    .then(async (response) => {
                        return { response, data: await response.arrayBuffer() }
                    })
                    .then((res) => {
                        resolve(this.responseBuilder(res.response, res.data, options))
                    })
                    .catch((e) => {
                        reject({ cause: e, toString: () => e.toString() })
                    })
            } else {
                reject({
                    cause: 'NOT SUPPORT fetch OR XMLHttpRequest',
                    toString: 'NOT SUPPORT fetch OR XMLHttpRequest'
                })
            }
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
        console.log(data)
        switch (options?.responseType) {
            case 'arraybuffer':
                break
            default:
                data = data.toString()
                if (this.isJson(data)) {
                    data = JSON.parse(data)
                }
        }

        let headers = Object.fromEntries(res.headers.entries())

        if (headers['set-cookie'] && res.headers.getAll) {
            //workers
            //TypeError: getAll() can only be used with the header name "Set-Cookie".
            headers['set-cookie'] = res.headers.getAll('set-cookie')
        } else if (headers['set-cookie']) {
            //Deno and Node.js 18
            //https://github.com/denoland/deno/pull/5100
            headers['set-cookie'] = [...res.headers.entries()].filter((header) => header[0] === 'set-cookie').map((header) => header[1])
        }
        return {
            status: res.status,
            statusText: res.statusText,
            headers,
            data
        }
    }

    get(url, options = {}) {
        options.method = 'GET'
        return this.requestHandle(url, null, options)
    }
    post(url, data = '', options = {}) {
        options.method = 'POST'
        return this.requestHandle(url, data, options)
    }
}

const axiosFetch = new AxiosRequest()

export default axiosFetch
