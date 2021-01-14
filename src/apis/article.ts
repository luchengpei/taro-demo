/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2021-01-14 16:45:02
 */

import { request } from '../utils/request'
 
export default {
    getArticleList():any {
        return request({
            url: '/article/list',
            method:'GET'
        })
    }
}
