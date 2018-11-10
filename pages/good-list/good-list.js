// pages/good-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basePath: "",
    loaded: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var basePath = getApp().globalData.basePath;
    that.setData({
      basePath: basePath
    });
    var type = options.type;
    if (type =="searchGoodByName"){
      var searchName = options.searchName;
      wx.setNavigationBarTitle({ title: searchName });
      var url = basePath + 'searchGoodByName.action?searchName=' + searchName;
      that.getGoods(url);
    } else if (type == "searchGoodByQRCode") {
      var qrCode = options.qrCode;
      wx.setNavigationBarTitle({ title: qrCode });
      var url = basePath + 'searchGoodByQRCode.action?qrCode=' + qrCode;
      that.getGoods(url);
    } else if (type =="getGoodsByCategory"){
      var cat_id = options.id;
      var cat_name = options.name;
      wx.setNavigationBarTitle({ title: cat_name });
      var url = basePath + 'getGoodsByCategory.action?catId=' + cat_id;
      that.getGoods(url);
    }else if(type=="getGoodsInterested"){
      wx.setNavigationBarTitle({ title: "我的收藏" });
      var url = basePath + 'getGoodsInterested.action';
      that.getGoods(url);
    } else if (type == "getGoodsViewed"){
      wx.setNavigationBarTitle({ title: "我的足迹" });
      var url = basePath + 'getGoodsViewed.action';
      that.getGoods(url);
    } else if (type == "getNewGoods") {
      wx.setNavigationBarTitle({ title: "最近上新" });
      var url = basePath + 'getNewGoods.action';
      that.getGoods(url);
    } else if (type == "getHotGoods") {
      wx.setNavigationBarTitle({ title: "热销商品" });
      var url = basePath + 'getHotGoods.action';
      that.getGoods(url);
    } else{
      wx.setNavigationBarTitle({ title: "全部商品" });
      var url = basePath + 'getAllGoods.action';
      that.getGoods(url);
    }
  },

  getGoods: function (url){
    var that = this;
    
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        console.log("success:" + res.data.goods);
        that.setData({
          goods: res.data.goods,
          loaded: true
        });
      },
      fail: function () {
        wx.showToast({
          title: '数据加载失败',
          icon: 'loading',
          duration: 1500
        })
      },
      complete: function () {
        wx.hideLoading();
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
   * 获取商品详情
   */
  getGoodInfo: function(event){
    var id = event.currentTarget.dataset.id;
    var name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/good-info/good-info?goodId=' + id + "&goodName=" + name
    });
  },
})