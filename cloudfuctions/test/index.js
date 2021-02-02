const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const collection = db.collection('article')
exports.main = async (event,context) => {
    const {type,data} = event
    switch (type) {
        case 'add':
            collection.add({
                data
            }).then(res => {
                return res
            })
            break;
        case 'get':
            collection.where({
                _id:'3b020ca36018bec4021a04df4fca01f0'
            }).get().then(res => {
                return res
            })
            break;
        default:
            break;
    }
}