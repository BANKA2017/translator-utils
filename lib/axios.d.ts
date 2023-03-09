import { AxiosRequestConfig } from "axios";
declare const axiosConfig: (adds?: AxiosRequestConfig) => Promise<AxiosRequestConfig<any>>;
export default axiosConfig;
