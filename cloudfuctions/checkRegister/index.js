const cloud = require('wx-server-sdk')

cloud.init({
  env: 'lcptest-62cc6c'
})

const collection = cloud.database().collection('user')
exports.main = async (event,context) => {
  const {
    OPENID
  } = cloud.getWXContext()
  return collection.where({
    openid: OPENID
  }).get().then(res => {
    return res
  })
  
}
