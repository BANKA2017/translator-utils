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
    isJson (str) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }
        return true
    }
    responseBuilder (res, data) {
        const dataString = data.toString()
        const isJson = this.isJson(dataString)

        let headers = Object.fromEntries(res.headers.entries())
        //for workers
        if (headers['set-cookie'] && res.headers.getAll) {
            headers['set-cookie'] = res.headers.getAll('set-cookie')
        }
        return {
            status: res.status,
            statusText: res.statusText,
            headers,
            data: isJson ? JSON.parse(dataString) : dataString
        }
    }
    get (url, options) {
        return this.requestHandle(url, null, {method: 'GET', ...options})
    }
    post (url, data, options) {
        return this.requestHandle(url, data, {method: 'POST', ...options})
    }
}

const axiosFetch = new AxiosRequest

export default axiosFetch
