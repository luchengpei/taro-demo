/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2021-01-14 16:05:52
 */
import { request } from '../utils/request'

export default {
    loginWx(data?:any) {
        return request({
            url: '/login',
            data
        })
    }
}