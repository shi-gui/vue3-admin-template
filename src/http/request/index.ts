/*
 * @Author: liuhua
 * @Date: 2023-03-14 21:32:22
 * @LastEditors: liuhua
 * @LastEditTime: 2023-03-15 14:00:05
 * @Description: https://github.com/ywanzhou/vue3-template/tree/master/src/service
 */

import axios from 'axios';
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios';
import type {
  RequestConfig,
  RequestInterceptors,
  CreateRequestConfig
} from './types';

class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  // 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>;

  // !拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;
    this.abortControllerMap = new Map();

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        const controller = new AbortController();
        const url = res.url || '';
        res.signal = controller.signal;
        this.abortControllerMap.set(url, controller);

        return res;
      },
      (err: any) => err
    );
    // 实例请求拦截
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    // 实例响应拦截
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    // 全局响应拦截（保证最后执行）
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        const url = res.config.url || '';
        this.abortControllerMap.delete(url);

        return res.data;
      },
      (err: any) => err
    );
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any);
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {});
    });
  }

  // TODO 此处可以再次进行get 和 post 方法的封装
  // get() {}
  // post() {}

  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }

  /**
   * 取消指定的请求
   * @param url 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }
}

export default Request;
