// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleGetUserInfo(e) {
    console.log(e.detail.rawData);

    var that = this;
    that.setData({
      result: 'ok', // 结果
      nickName: e.detail.userInfo.nickName, // 微信昵称
      avatarUrl: e.detail.userInfo.avatarUrl, // 微信头像
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查看用户的当前设置。确认用户是否授权过
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.setData({
                result: 'ok', // 结果
                nickName: res.userInfo.nickName, // 微信昵称
                avatarUrl: res.userInfo.avatarUrl, // 微信头像
              })
            }
          })

        } else {
          // 未授权，结果返回null
          that.setData({
            result: 'null', // 结果
          })
        }
      },
      withSubscriptions: true,
    })
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