/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2021-01-14 15:56:16
 */
import Taro from '@tarojs/taro'

const host = 'http://192.168.1.6:3000/taroapi'

/**
 * @Description: 请求参数
 * @Param: 
 * @Author: 陆城锫
 * @Date: 2021-01-14 16:23:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: Do not edit
 * @return {*}
 */
interface RequestParams {
    url: string;
    data?: any;
    method?: "GET" | "POST" | "DELETE" |"PUT";
    header?:any
}

/**
 * @Description: 统一请求简单封装
 * @Param: 
 * @Author: 陆城锫
 * @Date: 2021-01-14 16:23:55
 * @LastEditors: 陆城锫
 * @LastEditTime: Do not edit
 * @return {*}
 * @param {RequestParams} param1
 */
export function request({ url, data, method = "POST", header }:RequestParams) {
    return new Promise((resolve, reject) => {
        Taro.request({
            url:host + url,
            data,
            method,
            header
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
