// pages/shopingcar/shopingcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "baseImagePath": "/images",
    loaded: false,
    cartList:[
      {
        id:"001",
        name:"名称1",
        price:"83",
        count:"3",
        totalPrice:"249",
        format:"大包",
        taste:"微辣",
        imgUrl:"/images/toReceive.png",
        checked:"1"
      },
      {
        id: "002",
        name: "名称2",
        price: "83",
        count: "3",
        totalPrice: "249",
        format: "小包",
        taste: "话梅味",
        imgUrl: "/images/toReceive.png",
        checked: "0"
      },
      {
        id: "002",
        name: "名称2",
        price: "83",
        count: "3",
        totalPrice: "249",
        format: "小包",
        taste: "话梅味",
        imgUrl: "/images/toReceive.png",
        checked: "0"
      },
      {
        id: "002",
        name: "名称2",
        price: "83",
        count: "3",
        totalPrice: "249",
        format: "小包",
        taste: "话梅味",
        imgUrl: "/images/toReceive.png",
        checked: "0"
      },
      {
        id: "002",
        name: "名称2",
        price: "83",
        count: "3",
        totalPrice: "249",
        format: "小包",
        taste: "话梅味",
        imgUrl: "/images/toReceive.png",
        checked: "0"
      },
      {
        id: "002",
        name: "名称2",
        price: "83",
        count: "3",
        totalPrice: "249",
        format: "小包",
        taste: "话梅味",
        imgUrl: "/images/toReceive.png",
        checked: "0"
      },
      {
        id: "002",
        name: "名称2",
        price: "83",
        count: "3",
        totalPrice: "249",
        format: "小包",
        taste: "话梅味",
        imgUrl: "/images/toReceive.png",
        checked: "0"
      },
      {
        id: "002",
        name: "名称2",
        price: "83",
        count: "3",
        totalPrice: "249",
        format: "小包",
        taste: "话梅味",
        imgUrl: "/images/toReceive.png",
        checked: "0"
      }
    ],
    totalPrice: "249",
    checkedAll: "0",
    basePath: ""
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
    wx.showLoading({ title: "数据加载中..." });
    var that = this;
    var basePath = getApp().globalData.basePath;
    console.log(basePath);
    that.setData({
      basePath: basePath
    });
    console.log(that.data.basePath);
    wx.request({
      url: basePath + 'getCartInfo.action', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          cartList: res.data.cartList,
          totalPrice: res.data.totalPrice,
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

  updateTotalPrice: function () {
    var that = this;
    var cart_list = that.data.cartList;

    var total_price = 0;
    for (var i = 0; i < cart_list.length; i++) {
      if (cart_list[i].checked == '1') {
        total_price += parseFloat(cart_list[i].totalPrice);
      }
    }

    that.setData({
      totalPrice: total_price
    });
  },

  checkSingle: function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    var cart_list = that.data.cartList;
    var basePath = getApp().globalData.basePath;
    for (var i = 0; i < cart_list.length; i++) {
      if (i == index) {
        cart_list[i].checked = "1" == cart_list[i].checked ? "0" : "1";
        that.setData({
          cartList: cart_list
        });
        that.updateTotalPrice();

        break;
      }
    }
  },

  checkAll: function (event) {
    var that = this;
    var cart_list = that.data.cartList;

    var checked_all = "1" == that.data.checkedAll ? "0" : "1";
    var basePath = getApp().globalData.basePath;
    
    for (var i = 0; i < cart_list.length; i++) {
      cart_list[i].checked = checked_all;
    }

    that.setData({
      cartList: cart_list,
      checkedAll: checked_all
    });

    that.updateTotalPrice();
  },

  addCount: function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    var cart_list = that.data.cartList;

    var basePath = getApp().globalData.basePath;
    for (var i = 0; i < cart_list.length; i++) {
      if (i == index) {
        cart_list[i].count = parseFloat(cart_list[i].count) + 1 + "";
        cart_list[i].totalPrice = parseFloat(cart_list[i].count) * parseFloat(cart_list[i].price);

        that.setData({
          cartList: cart_list
        });

        that.updateTotalPrice();

        break;
      }
    }
  },

  inputCount: function(event){
    var that = this;
    var count = event.detail.value;
    var index = event.currentTarget.dataset.index;
    var cart_list = that.data.cartList;
    var basePath = getApp().globalData.basePath;
    for (var i = 0; i < cart_list.length; i++) {
      if (i == index) {
        if(count==""){
          count="1";
        }

        cart_list[i].count = count;
        cart_list[i].totalPrice = parseFloat(cart_list[i].count) * parseFloat(cart_list[i].price);

        that.setData({
          cartList: cart_list
        });

        that.updateTotalPrice();

        break;
      }
    }
  },

  desCount: function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    var cart_list = that.data.cartList;
    var basePath = getApp().globalData.basePath;
    for (var i = 0; i < cart_list.length; i++) {
      if (i == index) {
        if (parseFloat(cart_list[i].count)==0) return;
        
        cart_list[i].count = parseFloat(cart_list[i].count) - 1 + "";
        cart_list[i].totalPrice = parseFloat(cart_list[i].count) * parseFloat(cart_list[i].price);

        that.setData({
          cartList: cart_list
        });

        that.updateTotalPrice();
          
        break;
      }
    }
  },

  submitCart: function(){
    //判断是否选中商品，且商品数量不为0
    var that = this;
    var cart_list = that.data.cartList;
    var flag = false;
    var basePath = getApp().globalData.basePath;
    for (var i = 0; i < cart_list.length; i++) {
      if (cart_list[i].checked=="1"
        && cart_list[i].count>"0"){
        flag = true;
      }
    }

    if(!flag){
      wx.showModal({
        title: '提示',
        content: '请选择有效数量的商品！',
        showCancel: false
      })
      return;
    }

    var cart_list = that.data.cartList;
    
    wx.navigateTo({
      url: '/pages/order/submitOrder?orig=fromCart&carInfo=' + JSON.stringify(cart_list),
    })
    /*
    //创建订单
    wx.showLoading({ title: "数据提交中..." });
    wx.request({
      url: basePath + 'submitOrderFromCart.action', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        var orderId = res.data.orderId;
        wx.navigateTo({
          url: '/pages/order/submitOrder?orderId=' + orderId,
        })
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

  uploadimg: function(){
    var basePath = getApp().globalData.basePath;
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths[0]);
        wx.uploadFile({
          url: basePath +"wechat/wechatImgUpload.servlet", //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'filename1',
          header: {
            "content-type": "multipart/form-data",
            "sessionId": getApp().getSessionId()
          },
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res);
            var data = res.data
            //do something
          }
        })
      }
    })
  }
  
})