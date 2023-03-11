import { AxiosRequestConfig } from "axios"
import { HttpProxyAgent, HttpsProxyAgent } from "hpagent"

const axiosConfig = async (adds: AxiosRequestConfig = {}) => {
    let config: AxiosRequestConfig = {
        ...adds,
        timeout: 30000,//TODO check timeout
        proxy: false
    }
    if (!config.headers) {
        config.headers = {}
    }
    //get PROXY_CONFIG //nodejs only
    if (typeof process !== 'undefined' && HttpProxyAgent && HttpsProxyAgent) {
        config.headers = {
            ...config.headers,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        }
        const https_proxy = process.env.https_proxy || process.env.HTTPS_PROXY || ''
        const http_proxy = process.env.http_proxy || process.env.HTTP_PROXY || ''
        if (https_proxy) {
            config.httpsAgent = new HttpsProxyAgent({proxy: https_proxy})
        }
        if (http_proxy) {
            config.httpAgent = new HttpProxyAgent({proxy: http_proxy})
        }
    }
    return config
}

export default axiosConfig