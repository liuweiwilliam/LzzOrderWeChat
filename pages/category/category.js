// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded:false,
    catList:[
      
      {
        id:"001",
        name:"分类1",
        imgUrl: "/images/base/failed.png",
        description: "这里是描述1这里是描述1这里是描述1"
      },
      {
        id: "001",
        name: "分类2",
        imgUrl: "/images/base/failed.png",
        description: "这里是描述2这里是描述1这里是描述1"
      },
      {
        id: "001",
        name: "分类3",
        imgUrl: "/images/base/failed.png",
        description: "这里是描述3这里是描述1这里是描述1"
      },
      {
        id: "001",
        name: "分类4",
        imgUrl: "/images/base/failed.png",
        description: "这里是描述4这里是描述1这里是描述1"
      },
      {
        id: "001",
        name: "分类5",
        imgUrl: "/images/base/failed.png",
        description: "这里是描述5这里是描述1这里是描述1"
      },
      {
        id: "001",
        name: "分类6",
        imgUrl: "/images/base/failed.png",
        description: "这里是描述6这里是描述1这里是描述1"
      },
      {
        id: "001",
        name: "分类7",
        imgUrl: "/images/base/failed.png",
        description: "这里是描述7"
      }
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this;
    var basePath = getApp().globalData.basePath;
    console.log(basePath);
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: basePath + 'getLzzCategories.action', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        console.log("11111" + res.data.catList);
        that.setData({
          catList: res.data.catList,
          loaded: true
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

  /**
   * 通过商品分类获取商品列表
   */
  getGoodsByCat: function(event){
    var id = event.currentTarget.dataset.id;
    console.log("cat id " + id);
    var name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/good-list/good-list?type=getGoodsByCategory&id=' + id + "&name=" + name
    });
  },

})