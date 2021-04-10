// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  

  return await db.collection("userInfo").add({
    data:{
      openid:event.openid,
      username:event.username,
      pic:event.pic,
      balance:0,
      integral:0,
      cacheLogin:true
    }
  })
}