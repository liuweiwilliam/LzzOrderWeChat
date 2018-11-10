// pages/evaluate/subEvaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"001",
    evaluateLevelDic:[ //评价等级字典
      {
        level:1,
        text:"非常差"
      },
      {
        level: 2,
        text: "差"
      },
      {
        level: 3,
        text: "一般"
      },
      {
        level: 4,
        text: "好"
      },
      {
        level: 5,
        text: "非常好"
      }
    ],
    evaluateLevel:5, //当前默认评价等级
    shopEvaluateLevel: 5, //店铺当前默认评价等级
    orderInfo: [
      {
        goodId:"001",
        goodName:"这里是商品名称这里是商品名称这里是商品名称这里是商品名称这里是商品名称",
        goodImgUrl:"/images/toEvaluate.png",
        evaluateLevel:"5",
        evaluateImgs:[],
      },
      {
        goodId: "001",
        goodName: "这里是商品名称这里是商品名称这里是商品名称这里是商品名称这里是商品名称",
        goodImgUrl: "/images/toEvaluate.png",
        evaluateLevel: "5",
        evaluateImgs: [],
      },
      {
        goodId: "001",
        goodName: "这里是商品名称这里是商品名称这里是商品名称这里是商品名称这里是商品名称",
        goodImgUrl: "/images/toEvaluate.png",
        evaluateLevel: "5",
        evaluateImgs: [],
      }
    ],
    loaded: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId;
    console.log("orderId : " + orderId);
    this.setData({
      orderId: orderId
    });

    this.getOrderInfoToEvaluate(orderId);
  },

  getOrderInfoToEvaluate: function(orderId){
    var that = this;
    var basePath = getApp().globalData.basePath;
    wx.showLoading({ title: "" });
    wx.request({
      url: basePath + 'getOrderInfoToEvaluate.action?orderId=' + orderId, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.iserror){
          wx.showToast({
            title: res.data.errormgr,
            image: '/images/base/warn-hl.png',
            duration: 1500,
            complete: function(){
              wx.redirectTo({
                url: '/pages/order/order?status=待评价'
              })
            }
          })
        }else{
          that.setData({
            orderInfo: res.data.orderInfo,
            loaded:true
          });
        }
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
   * 切换商品评价等级
   */
  changeEvaluateLevel: function(e){
    var that = this;
    var goodIndex = e.currentTarget.dataset.goodindex;
    var level = e.target.dataset.level;
    var order_info = that.data.orderInfo;
    console.log(order_info);
    order_info[goodIndex].evaluateLevel = level;
    that.setData({
      orderInfo: order_info
    });
  },

  /**
   * 切换店铺评价等级
   */
  changeShopEvaluateLevel: function (e) {
    var that = this;
    var level = e.target.dataset.level;
    that.setData({
      shopEvaluateLevel: level
    });
  },

  /**
   * 提交评价
   */
  subEvaluate: function(e){
    var value = e.detail.value;
    var that = this;
    var id = that.data.orderId;
    var basePath = getApp().globalData.basePath;
    wx.showLoading({ title: "数据提交中..." });
    wx.request({
      url: basePath + 'submitEvaluate.action?evaluateData=' + JSON.stringify(that.data) + 　"&contents=" + JSON.stringify(value), //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 1500,
          success: function(){
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/order/order?status=待评价'
              })
            }, 1500)
          }
        });

        wx.navigateBack();
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '评价提交失败',
          image: '/images/base/warn-hl.png',
          duration: 1500
        })
      },
      complete: function () {
      }
    })
  },

  /**
   * 添加评价图片
   */
  selectImg: function(e){
    var that = this;

    wx.chooseImage({
      count: 9, // 默认9
      sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var goodIndex = e.currentTarget.dataset.goodindex;
        var order_info = that.data.orderInfo;
        for (var i = 0; i < tempFilePaths.length; i++){
          order_info[goodIndex].evaluateImgs.push(tempFilePaths[i]);
        }
        
        that.setData({
          orderInfo: order_info
        });
      }
    })
  },

  /**
   * 删除图片
   */
  delImg: function(e){
    var that = this;
    var goodIndex = e.currentTarget.dataset.goodindex;
    var imgIndex = e.currentTarget.dataset.imgindex;
    console.log(goodIndex + ":" + imgIndex);
    var order_info = that.data.orderInfo;
    order_info[goodIndex].evaluateImgs.splice(imgIndex, 1);
    console.log(order_info[goodIndex]);
    that.setData({
      orderInfo: order_info
    });
  },

  /**
   * 
   */
  previewImg: function(e){
    var that = this;
    var goodIndex = e.currentTarget.dataset.goodindex;
    var imgIndex = e.currentTarget.dataset.imgindex;
    var order_info = that.data.orderInfo;

    wx.previewImage({
      current: order_info[goodIndex].evaluateImgs[imgIndex], // 当前显示图片的http链接
      urls: order_info[goodIndex].evaluateImgs // 需要预览的图片http链接列表
    })
  }
})