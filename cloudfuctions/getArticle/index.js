const cloud = require('wx-server-sdk')
cloud.init({
    env:'lcptest-62cc6c'
})
const db = cloud.database()
const collection = db.collection('article')
exports.main = async (event, context) => {
    return collection.get().then(res=>{
        return res
    })
}