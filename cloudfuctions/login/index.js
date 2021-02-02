/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2021-02-02 13:31:36
 */
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event,context) => {
    const wxContext = cloud.getWXContext()
    return {
        openid: wxContext.OPENID,
        appid:wxContext.APPID
    }
}