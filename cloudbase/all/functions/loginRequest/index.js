// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rq=require('request-promise');
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('http://localhost:8082/wxLogin?code=' + event.mycode);
  return rq('http://localhost:8082/wxLogin?code=' + event.mycode)

}