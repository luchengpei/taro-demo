const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lcptest-62cc6c'
})
const collection = cloud.database().collection('article');

exports.main = async (event, context) => {
  const {
    _id,
    collectionNum,
    isSelect
  } = event

  return await collection.doc(_id).update({
    data: {
      collectionNum: collectionNum,
      isSelect: isSelect
    }
  }).then(res => res)
}
