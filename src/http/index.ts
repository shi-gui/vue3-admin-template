import Request from './request';
import type { AxiosResponse } from 'axios';
import type { Response, CustomRequestConfig } from './request/types';
import requestUrl from './requestUrl';

const request = new Request({
  baseURL: process.env.NODE_ENV === 'dev' ? '/cloud' : requestUrl,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result;
    }
  }
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {CustomRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const customRequest = <D = any, T = any>(config: CustomRequestConfig<D, T>) => {
  const { method = 'GET' } = config;
  if (method === 'get' || method === 'GET') {
    config.params = config.data;
  }
  return request.request<Response<T>>(config);
};

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default customRequest;
