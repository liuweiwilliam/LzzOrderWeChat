// pages/good-info/good-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo:{
      id: "***",
      name: "***",
      price: "***",
      isInterest: "***",
      isDiscount: "***",
      discountPrice: "***",
      curSelectFormat: "***",
      goodEvaluateRate: "***",
      formats: [
        {
          id: "***",
          name: "***",
          price: "***",
          isDiscount: "*",
          discountPrice: "**"
        }
      ],
      tastes: [
        {
          id: "***",
          name: "***",
        }
      ],
      saleCount: "10002",
      swiperImgs: [
        {
          imgUrl: "/images/toReceive.png",
        }
      ],
      infoImgs: [
        {
          imgUrl: "/images/toReceive.png",
        }
      ],
      evaluate: {
        nickName: "***",
        levelImgUrl: "/images/base/jifen.png",
        headImgUrl: "/images/base/toReceive.png",
        contents: "***",
        type: "***",
      }
    },
    coupons:[
      {
        id:"001",
        name: "优惠卷1",
        describe:"优惠卷描述",
        url:""
      },
      {
        id: "002",
        name: "优惠卷2",
        describe: "优惠卷描述优惠卷描述优惠卷描述优惠卷描述优惠卷描述优惠卷描述优惠卷描述优惠卷描述",
        url: ""
      },
      {
        id: "003",
        name: "优惠卷3",
        describe: "优惠卷描述",
        url: ""
      }
    ],
    initStatus:{
      couponShow:"1",
      formatShow:"1",
      tasteShow:"1"
    },
    loaded: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: "数据加载中..."});
    wx.setNavigationBarTitle({title:options.goodName});

    var good_id = options.goodId;
    var that = this;
    var basePath = getApp().globalData.basePath;
    console.log(getApp().getSessionId());
    wx.request({
      url: basePath + 'getGoodInfo.action?goodId=' + good_id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        console.log("success:" + res.data.goodInfo);
        that.setData({
          goodInfo: res.data.goodInfo,
          coupons: res.data.coupons,
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
    });
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
   * 切换款式类型
   */
  changeType: function(event){
    var that = this;
    var goodinfo = that.data.goodInfo;
    console.log(event);
    var typeId = event.currentTarget.dataset.typeid;
    for (var i = 0; i < goodinfo.formats.length; i++){
      if (goodinfo.formats[i].id == typeId){
        goodinfo.price = goodinfo.formats[i].price
        goodinfo.isDiscount = goodinfo.formats[i].isDiscount;
        goodinfo.discountPrice = goodinfo.formats[i].discountPrice;
        goodinfo.curSelectFormat = goodinfo.formats[i].id;
        that.setData({
          goodInfo: goodinfo
        });
      }
    }
    console.log(typeId);
  },

  /**
   * 切换口味
   */
  changeTaste: function (event) {
    var that = this;
    var goodinfo = that.data.goodInfo;
    var tasteId = event.currentTarget.dataset.tasteid;
    for (var i = 0; i < goodinfo.tastes.length; i++) {
      if (goodinfo.tastes[i].id == tasteId) {
        goodinfo.curSelectTaste = goodinfo.tastes[i].id;
        that.setData({
          goodInfo: goodinfo
        });
      }
    }
  },

  showOrHideFormat: function(event){
    var that = this;
    var init_status = that.data.initStatus;
    console.log(init_status);
    init_status.formatShow = 1 == init_status.formatShow?"0":"1";

    that.setData({
      initStatus: init_status
    });
  },

  showOrHideTaste: function (event) {
    var that = this;
    var init_status = that.data.initStatus;
    init_status.tasteShow = 1 == init_status.tasteShow ? "0" : "1";

    that.setData({
      initStatus: init_status
    });
  },

  showOrHideCoupon: function (event) {
    var that = this;
    var init_status = that.data.initStatus;
    console.log(init_status);
    init_status.couponShow = 1 == init_status.couponShow ? "0" : "1";

    that.setData({
      initStatus: init_status
    });
  },

  /**
   * 获取优惠卷信息
   */
  getCouponById: function(event){
    wx.navigateTo({
      url: '/pages/coupon/coupon?id=' + event.currentTarget.dataset.couponid
    });
  },

  /**
   * 收藏
   */
  setInterest: function(event){
    var that = this;
    var goodinfo = that.data.goodInfo;
    goodinfo.isInterest = "1"== goodinfo.isInterest ? "0" : "1";

    var basePath = getApp().globalData.basePath;

    wx.showLoading({
      title: '数据加载中',
    })

    wx.request({
      url: basePath + 'setGoodInterested.action?goodId=' + goodinfo.id + "&isInterested=" + goodinfo.isInterest, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        that.setData({
          goodInfo: goodinfo
        });
      },
      fail: function () {
        wx.showToast({
          title: '糟糕，操作失败了！',
          icon: 'loading',
          duration: 1500
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },

  submitOrder: function(event){
    var that = this;
    var goodId = that.data.goodInfo.id;
    var formatId = that.data.goodInfo.curSelectFormat;
    var tasteId = that.data.goodInfo.curSelectTaste;
    var basePath = getApp().globalData.basePath;
    console.log(goodId);
    wx.navigateTo({
      url: '/pages/order/submitOrder?orig=fromSingleGood&formatId=' + formatId + "&tasteId=" + tasteId + "&goodId=" + goodId,
    });
    /*
    wx.showLoading({ title: "数据提交中..." });
    wx.request({
      url: basePath + 'submitOrderFromSingleGood.action?goodId=' + goodId + "&formatId=" + formatId + "&tasteId=" + tasteId, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        var orderId = res.data.orderId;
        
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '数据提交失败了,如有问题请联系客服！',
          cancelText: "联系客服",
          success: function (res) {
            if (res.cancel) {
              //联系客服

            }
          }
        })
      },
      complete: function () {
      }
    });
    */
  },

  getEvaluate: function(event){
    var that = this;
    var goodId = that.data.goodInfo.id;
    wx.navigateTo({
      url: '/pages/evaluate/getEvaluate?goodId=' + goodId
    });
  },

  callKefu: function(){
    wx.makePhoneCall({
      phoneNumber: '05573045676' //仅为示例，并非真实的电话号码
    })
  },

  addToCart: function(){
    var that = this;
    var goodId = that.data.goodInfo.id;
    var formatId = that.data.goodInfo.curSelectFormat;
    var tasteId = that.data.goodInfo.curSelectTaste;

    var basePath = getApp().globalData.basePath;

    wx.showLoading({
      title: '正在飞向购物车',
    })

    wx.request({
      url: basePath + 'addGoodToCart.action?goodId=' + goodId + "&formatId=" + formatId + "&tasteId=" + tasteId, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '糟糕，操作失败了！',
          icon: 'loading',
          duration: 1500
        })
      },
      complete: function () {
      }
    })
  }
})