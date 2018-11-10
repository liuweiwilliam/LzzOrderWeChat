// pages/evaluate/getEvaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluateList:[{
      uname:"...",
      imgUrl:"/images/base/failed.png",
      userLevel:"001",
      levelImgUrl:"/images/base/failed.png",
      format:"dabao",
      date:"2017-11-25",
      evaluateLevel:"0",
      contents:".....",
      contentImgs:[]
    }
    ],
    pageSize: "20",
    pageNum: "1",
    totalPage: "1",
    basePath : "",
    loaded: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goodId = options.goodId;
    var basePath = getApp().globalData.basePath;
    that.setData({
      basePath: basePath
    });

    var pageSize = that.data.pageSize;
    var pageNum = that.data.pageNum;

    wx.showLoading({
      title: '数据加载中',
    })

    wx.request({
      url: basePath + 'getGoodEvaluates.action?goodId=' + goodId + "&pageSize=" + pageSize + "&pageNum=" + pageNum, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        that.setData({
          evaluateList: res.data.evaluateList,
          loaded: true
        });
      },
      fail: function () {
        wx.showToast({
          title: '糟糕，数据加载失败了！',
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
   * 图片预览 
   */
  previewImg: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var imgIndex = e.currentTarget.dataset.imgindex;
    
    var eva = that.data.evaluateList[index];
    var img = eva.contentImgs[imgIndex];

    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: eva.contentImgs // 需要预览的图片http链接列表
    })
  }
})