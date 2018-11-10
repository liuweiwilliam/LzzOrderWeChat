// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initInfo:{
      avatarUrl:'/images/base/failed.png',
      curUserLevelTypical: '/images/base/failed.png',
    },
    baseImagePath:"/images/",
    loaded : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 获取初始化信息
   */
  getMeInitInfo: function(){
    wx.showLoading({ title: "数据加载中..." });
    var basePath = getApp().globalData.basePath;
    var that = this;
    wx.request({
      url: basePath + 'getMeInitInfo.action', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        console.log("success:" + res.data.goodInfo);
        that.setData({
          loaded: true,
          initInfo: res.data.initInfo
        });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '数据加载失败',
          image: '/images/base/warn-hl.png',
          duration: 1500
        })
      },
      complete: function () {
        
      }
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
    this.getMeInitInfo();
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
  
  },

  manageAddress: function(event){
    wx.navigateTo({
      url: '/pages/address/address'
    });
  },

  manageOrders: function (event) {
    console.log(event);
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/order/order?status=' + type
    });
  },

  bindPhone: function(){
    wx.navigateTo({
      url: '/pages/bindPhone/bindPhone',
    })
  },

  getGoodsInterested: function(){
    wx.navigateTo({
      url: '/pages/good-list/good-list?type=getGoodsInterested',
    })
  },

  getGoodsViewed: function () {
    wx.navigateTo({
      url: '/pages/good-list/good-list?type=getGoodsViewed',
    })
  },

  connectUs: function(){
    wx.makePhoneCall({
      phoneNumber: '05573045676' //仅为示例，并非真实的电话号码
    })
  }
})