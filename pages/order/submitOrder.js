// pages/order/submitOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{
      id:"001",
      name:"刘威",
      phone:"1234567890",
      detail:"这里是地址描述/可以很长很长/可以很长很长/可以很长很长/可以很长很长/可以很长很长"
    },
    orderInfoList:[{
      id: "001",
      imgUrl: "/images/toReceive.png",
      name:"这里是商品名称/可以很长很长/可以很长很长/可以很长很长/可以很长很长/可以很长很长",
      formatId:"001",
      format:"guige1",
      taste:"taste",
      count:"2",
      price:"123.00"
    }],
    expressList:{
      ids:[
        "1001","1002"
      ],
      names:[
        "name1","name2"
      ]
    },
    totalPrice:"246",
    expressId:"1001",
    expressName:"name1",
    addressId:"001",
    basePath:"",
    comment:"",
    orderId:"",
    orig:"",
    loaded:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orig = options.orig;
    var that = this;
    var goodId = options.goodId;
    var formatId = options.formatId;
    var tasteId = options.tasteId;
    that.setData({
      orig: orig
    });
    var carInfo = "";
    if(orig=="fromCart"){
      carInfo = options.carInfo;
    }

    if(orig=="fromSingleGood"){

    }
    var orderId = options.orderId;
    that.setData({
      orderId: orderId
    });
    wx.showLoading({ title: "数据加载中..." });
   
    var basePath = getApp().globalData.basePath;
    that.setData({
      basePath:basePath
    });
    
    wx.request({
      url: basePath + 'getOrderInfo.action?orig=' + orig + "&formatId=" + formatId + "&tasteId=" + tasteId + "&goodId=" + goodId + "&carInfo=" + carInfo, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          address: res.data.address,
          orderInfoList: res.data.orderInfoList,
          expressList: res.data.expressList,
          totalPrice: res.data.totalPrice,
          expressName: res.data.expressName,
          expressId: res.data.expressId,
          loaded: true
        });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '数据加载失败',
          icon: 'loading',
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
    try {
      var id = wx.getStorageSync('orderAddressId')
      if (id) {
        // Do something with return value
        console.log("get address id : " + id);


        wx.removeStorage({
          key: 'orderAddressId',
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    } catch (e) {
      // Do something when catch error
    }
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
   * 切换快递方式
   */
  expressChange: function (e){
    var that = this;
    var index = e.detail.value;
    var express_name = that.data.expressList.names[index];;
    var express_id = that.data.expressList.ids[index];
    
    that.setData({
      expressId: express_id,
      expressName: express_name
    });
  },

  /**
   * 增加商品数量
   */
  addCount: function (e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var basePath = getApp().globalData.basePath;
    var order_info_list = that.data.orderInfoList;
    for (var i = 0; i < order_info_list.length; i++){
      if (order_info_list[i].id==id){
        order_info_list[i].count = parseInt(order_info_list[i].count) + 1 + "";
        that.setData({
          orderInfoList: order_info_list
        });

        that.updateTotalPrice();
        break;
      }
    }
  },

  /**
   * 减少商品数量
   */
  decCount: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var order_info_list = that.data.orderInfoList;
    for (var i = 0; i < order_info_list.length; i++) {
      if (order_info_list[i].id == id) {
        if (parseInt(order_info_list[i].count) == 0) return;
        order_info_list[i].count = parseInt(order_info_list[i].count) - 1 + "";
        that.setData({
          orderInfoList: order_info_list
        });

        that.updateTotalPrice();
        break;
      }
    }

    
  },

  /**
   * 更新总价
   */
  updateTotalPrice: function () {
    var that = this;
    var order_info_list = that.data.orderInfoList;

    var total_price = 0;
    for (var i = 0; i < order_info_list.length; i++) {
      total_price += parseInt(order_info_list[i].count) * parseFloat(order_info_list[i].price);
    }

    that.setData({
      totalPrice: total_price+""
    });
  },

  /**
   * 改变收货地址 
   */
  changeAddress: function(e){
    wx.navigateTo({
      url: '/pages/address/address?orig=fromOrder',
    })
  },

  inputComment: function(e){
    var that = this;
    that.setData({
      comment: e.detail.value
    });
  },

  /**
   * 提交订单
   */
  submitOrder: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '提交订单后卖家将直接为您配货，确认提交吗?',
      success: function (res) {
        if (res.confirm) {
          that.realSubmit();
        }
      }
    });
  },

  realSubmit: function(){
    var that = this;
    var address = that.data.address;
    if(null==address.id || ""==address.id){
      wx.showToast({
        title: '请选择地址信息',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }
    wx.showLoading({ title: "订单提交中..." });

    var orig = that.data.orig;
    var basePath = getApp().globalData.basePath;
    wx.request({
      url: basePath + 'submitOrder.action?orig=' + orig, //仅为示例，并非真实的接口地址
      data: that.data,
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        console.log("提交成功！");
        wx.navigateTo({
          url: '/pages/order/order?status=待发货',
        })
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '订单提交失败',
          image: '/images/base/warn-hl.png',
          duration: 1500
        })
      },
      complete: function () {
      }
    })
  }
})