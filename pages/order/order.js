// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待付款', '待发货', "待收货", "待评价"],
    currentTab: "全部",
    loaded: false,
    orderList: [
      {
        id: "001",
        status: "待付款",
        count: "6",
        totalPrice: "297",
        freight: "9",
        goodList: [
          {
            id: "001",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字",
            typicalImg: "/images/toReceive.png",
            price: "111",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "002",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字2",
            typicalImg: "/images/toReceive.png",
            price: "222",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "003",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字3",
            typicalImg: "/images/toReceive.png",
            price: "333",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          }
        ]
      },
      {
        id: "001",
        status: "待发货",
        count: "6",
        totalPrice: "297",
        freight: "9",
        goodList: [
          {
            id: "001",
            name: "名字名字",
            typicalImg: "/images/toReceive.png",
            price: "111",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "002",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字2",
            typicalImg: "/images/toReceive.png",
            price: "222",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "003",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字3",
            typicalImg: "/images/toReceive.png",
            price: "333",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          }
        ]
      },
      {
        id: "001",
        status: "待收货",
        count: "6",
        totalPrice: "297",
        freight: "9",
        goodList: [
          {
            id: "001",
            name: "名字名字",
            typicalImg: "/images/toReceive.png",
            price: "111",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "002",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字2",
            typicalImg: "/images/toReceive.png",
            price: "222",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "003",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字3",
            typicalImg: "/images/toReceive.png",
            price: "333",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          }
        ]
      },
      {
        id: "001",
        status: "待评价",
        count: "6",
        totalPrice: "297",
        freight: "9",
        goodList: [
          {
            id: "001",
            name: "名字名字",
            typicalImg: "/images/toReceive.png",
            price: "111",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "002",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字2",
            typicalImg: "/images/toReceive.png",
            price: "222",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          },
          {
            id: "003",
            name: "名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字3",
            typicalImg: "/images/toReceive.png",
            price: "333",
            isDiscount: "1",
            discountPrice: "99",
            count: "2",
            format: "大包",
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var status = options.status;
    if (status==null){
      status="全部";
    }
    console.log(status);
    this.getOrders(status);
  },

  /**
   * 
   */
  getOrders: function(status){
    var that = this;
    var basePath = getApp().globalData.basePath;
    wx.showLoading({ title: "" });
    wx.request({
      url: basePath + 'getOrders.action?status=' + status, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        
        that.setData({
          orderList: res.data.orderList,
          currentTab: status,
          loaded: true
        });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '订单加载失败',
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
   * 选项卡切换 
   */
  navbarTap: function (e) {
    var status = e.currentTarget.dataset.item;
    this.getOrders(status);
  },

  /**
   * 付款
   */
  pay: function(e){

  },

  /**
   * 提醒发货
   */
  pressOrder: function(e){
    wx.showToast({
      title: '提醒成功',
      icon: 'success',
      duration: 1500
    })
  },

  /**
   * 确认收货
   */
  confirRecieved: function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您是否已经收到货物并完成确认？',
      success: function (res) {
        if (res.confirm) {
          that.confirm(e.currentTarget.dataset.id);
        } else if (res.cancel) {
          
        }
      }
    })

  },

  /**
   * 确认
   */
  confirm: function(id){
    var that = this;
    var basePath = getApp().globalData.basePath;
    wx.showLoading({ title: "" });
    wx.request({
      url: basePath + 'confiemReceived.action?orderId=' + id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '确认收货成功',
          icon: 'success',
          duration: 1500,
          success: function(){
            that.getOrders("待评价");
          }
        })
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '确认收货失败',
          image: '',
          duration: 1500
        })
      },
      complete: function () {
      }
    })
  },

  /**
   * 评价
   */
  evaluate: function(e){
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/evaluate/subEvaluate?orderId=' + orderId
    })
  }

})