// pages/address/addressAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{
      id:"001",
      name:"收货人1",
      phone:"12345678900",
      area:["安徽省","合肥市","蜀山区"],
      detail: "详细地址",
      usualFlag: "1"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var add_id = options.id;
    console.log(add_id);
    if(add_id!=undefined){
      //从数据库获取地址信息
      var basePath = getApp().globalData.basePath;
      wx.showLoading({ title: ""});
      wx.request({
        url: basePath + 'getAddressInfo.action?addressId=' + add_id, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json', // 默认值
          "sessionId": getApp().getSessionId()
        },
        success: function (res) {
          wx.hideLoading();
          //设置地址信息
          that.setData({
            addressInfo: res.data.addressInfo
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
    }else{
      that.setData({
        addressInfo: {
          id: null,
          name: "",
          phone: "",
          area: ["安徽省", "宿州市", "埇桥区"],
          detail: "",
          usualFlag: "0"
        }
      });
    }
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
   * 地址选择器切换
   */
  regionChange: function(e){
    var add_info = this.data.addressInfo;
    add_info.area = e.detail.value;
    this.setData({
      addressInfo: add_info
    })
  },

  /**
   * 切换常用标志
   */
  changeDefault: function(e){
    var add_info = this.data.addressInfo;
    add_info.usualFlag = add_info.usualFlag=="1"?"0":"1";
    console.log(add_info.usualFlag);
    this.setData({
      addressInfo: add_info
    })
  },

  inputName: function(e){
    var add_info = this.data.addressInfo;
    add_info.name = e.detail.value
    this.setData({
      addressInfo: add_info
    })
  },

  inputPhone: function (e) {
    var add_info = this.data.addressInfo;
    add_info.phone = e.detail.value
    this.setData({
      addressInfo: add_info
    })
  },

  inputDetail: function (e) {
    var add_info = this.data.addressInfo;
    add_info.detail = e.detail.value
    console.log(e.detail.value);
    this.setData({
      addressInfo: add_info
    })
  },
  
  /**
   * 保存地址
   */
  saveAddress: function(e){
    var that = this;
    var value = e.detail.value;
    var add_info = this.data.addressInfo;
    //验证
    if(value.name==""){
      wx.showToast({
        title: '请填写收货人！',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(value.phone==""
        || !myreg.test(value.phone)){
      wx.showToast({
        title: '联系电话不正确！',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }

    if (value.detail == "") {
      wx.showToast({
        title: '请填写详细地址！',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }

    //保存
    add_info.name = value.name;
    add_info.phone = value.phone;
    add_info.detail = value.detail;
    console.log(JSON.stringify(add_info));
    var add_info_clone = JSON.stringify(add_info);
    var basePath = getApp().globalData.basePath;
    wx.showLoading({ title: "数据提交中..." });
    wx.request({
      url: basePath + 'addOrUpdateAddress.action?subData=' + add_info_clone, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        //跳转
        wx.navigateBack();
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '数据提交失败',
          image: '/images/base/warn-hl.png',
          duration: 1500
        })
      },
      complete: function () {
      }
    })
  }
})