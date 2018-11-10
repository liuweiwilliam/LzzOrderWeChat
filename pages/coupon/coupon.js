// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[
      {
        id:"001",
        name:"优惠卷1",
        description:"这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述"
      },
      {
        id: "002",
        name: "优惠卷2",
        description: "这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述"
      },
      {
        id: "003",
        name: "优惠卷3",
        description: "这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述这里是优惠卷描述"
      }
    ],
    loaded:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.id });
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