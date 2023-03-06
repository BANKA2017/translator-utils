import axios from "axios"
import { HttpProxyAgent, HttpsProxyAgent } from "hpagent"

let axiosConfig = {
    timeout: 30000,//TODO check timeout
    proxy: false
}

//get PROXY_CONFIG //nodejs only
if (typeof process !== 'undefined') {
    axiosConfig.headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    }
    const https_proxy = process.env.https_proxy || process.env.HTTPS_PROXY || ''
    const http_proxy = process.env.http_proxy || process.env.HTTP_PROXY || ''
    if (https_proxy) {
        axiosConfig.httpsAgent = new HttpsProxyAgent({proxy: https_proxy})
    }
    if (http_proxy) {
        axiosConfig.httpAgent = new HttpProxyAgent({proxy: http_proxy})
    }
}


const axiosFetch = axios.create(axiosConfig)

export default axiosFetch