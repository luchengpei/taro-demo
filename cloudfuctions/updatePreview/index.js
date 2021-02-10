const cloud = require('wx-server-sdk')

cloud.init({
  env: 'lcptest-62cc6c'
})

const collection = cloud.database().collection('article');

exports.main = async (event,context) => {
    let { preViewNum,_id } = event;
    return await collection.where({
      _id:_id
    }).update({
      data:{
        preViewNum:++preViewNum
      }
    }).then(res=>{
      return res
    })

}