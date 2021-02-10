const cloud = require('wx-server-sdk')

cloud.init({
  env: 'lcptest-62cc6c'
})

const collection = cloud.database().collection('user')
exports.main = async(event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()
  const {userName,password } = event;
  return collection.add({
    data:{
      userName,
      password,
      openid:OPENID
    }
  }).then(res=>{
    return res
  })

}