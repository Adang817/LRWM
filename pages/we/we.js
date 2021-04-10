// pages/we/we.js
var util = require('../../utils/util.js');
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testdate: [],
    userInfo: {},
    openid: '',
    shorName: '',
    hasUserInfo: false,
    flag: '',
    canIUseGetUserProfile: false,
    hour: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //获得openid
  handleGetUserInfo(e) {

    var that = this;

  },
  //获得用户信息
  getUserProfile(e) {
    var that = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗



    wx.getUserProfile({

      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
          console.log(JSON.stringify( res.userInfo));
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          shorName: res.userInfo.nickName.substring(0, 3)
        })

        wx.cloud.callFunction({

          name: "checkOpenid",
          data: {
            openid: that.data.openid
          }

        }).then(res => {
          if (res.result.total == 0) {
            wx.cloud.callFunction({
              name: "addUser",
              data: {
                openid: that.data.openid,
                nickName: that.data.userInfo.nickName,
                avatarUrl: that.data.userInfo.avatarUrl,
              },
            }).then(res => {
              console.log(res);
            })
          }else{
            that.setData({

            })
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    this.setData({
      hour: new Date().getHours()
    });

    wx.login({
      success: function (res) {
        console.log(res)
        
        //获取登录的临时凭证
        var code = res.code;
        //调用后端，获取微信的session_key,secret
        console.log("调用后端接口前");
        
          wx.cloud.callFunction({
            name:'loginRequest',
            data:{
              mycode:code
            }
          }).then(
            res=>console.log(res)
          )
          // success: function (result) {

          //   that.setData({
          //     openid: result.data.openid,
          //     statu: 'ok'
          //   })

          //   //每次登录检查登录状态
          //   wx.cloud.callFunction({
          //     name: "checkOpenid",
          //     data: {
          //       openid: result.data.openid,
          //     },
          //   }).then(res => {
          //     //如果存在用户
          //     if(res.result.total==1){
          //       wx.cloud.callFunction({
          //         name: "getUser",
          //         data: {
          //           openid: result.data.openid,
          //         },
          //       }).then(res => {
          //         // 自动登录启动
          //           if(res.result.data[0].cacheLogin){

          //            that.setData({
          //                  userInfo:res.result.data[0],
          //                  flag:"true",
          //                  shorName:res.result.data[0].nickName.substring(0, 3)
          //            })
                     
          //             console.log("flag："+that.data.flag);
          //             console.log("fluserInfoag："+JSON.stringify(that.data.userInfo) );
          //           }else{
          //             console.log("错误");
          //           }
          //       })
          //     }
          //   })
          // }

       

      }
      
    })
    console.log("调用后端接口后");
  },
  change(){
    
      this.setData({
        flag:"false"
      })
   
      console.log(this.data.flag)
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})