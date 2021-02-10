const cloud = require('wx-server-sdk')
cloud.init({
    env:'lcptest-62cc6c'
})
const db = cloud.database()
const collection = db.collection('demo')
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()
    const {type,data} = event
    switch (type) {
        case 'add':
            let params = {
                normalUser: OPENID,
                ...data
            }
            collection.add({
                data:params
            }).then(res => {
                return res
            })
            break;
        case 'get':
            collection.get().then(res => {
                return res
            })
            break;
        default:
            break;
    }
}