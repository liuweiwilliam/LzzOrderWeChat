// pages/bindPhone/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restSecond:60,
    canGetCode:true,
    phone:"",
    code:""
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
  
  getCode: function(){
    var that = this;
    this.setData({
      canGetCode: false
    });
    
    var basePath = getApp().globalData.basePath;
    var phone = that.data.phone;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phone == ""
      || !myreg.test(phone)) {
      wx.showToast({
        title: '联系电话不正确！',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }
    this.countDown(this);
    wx.request({
      url: basePath + 'sendVerifyCode.action?phone=' + phone, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.iserror) {
          wx.showToast({
            title: res.data.errormsg,
            image: '/images/base/warn-hl.png',
            duration: 1000
          })
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '验证码获取失败',
          image: '/images/base/warn-hl.png',
          duration: 1500
        })
      },
      complete: function () {
      }
    })
  },

  countDown: function(that){
    var restSecond = that.data.restSecond;
    if(restSecond==0){
      that.setData({
        canGetCode: true,
        restSecond: 60
      });
      return;
    }

    var time = setTimeout(function () {
      that.setData({
        restSecond: restSecond - 1
      });
      that.countDown(that);
    }, 1000)  
  },

  inputPhone: function(e){
    var phone = e.detail.value;
    this.setData({
      phone:phone
    });
    console.log(this.data.phone);
  },

  inputCode: function (e) {
    var code = e.detail.value;
    this.setData({
      code: code
    });
    console.log(this.data.code);
  },

  subBind: function(){
    var that = this;
    var phone = that.data.phone;
    var code = that.data.code;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phone == ""
      || !myreg.test(phone)) {
      wx.showToast({
        title: '联系电话不正确！',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }

    if(code==""){
      wx.showToast({
        title: '验证码不能为空！',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }
    var basePath = getApp().globalData.basePath;
    wx.request({
      url: basePath + 'subBind.action?phone=' + phone + "&code="+code, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data.iserror){
          wx.showToast({
            title: res.data.errormsg,
            image: '/images/base/warn-hl.png',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '绑定成功',
            image: '/images/base/success.png',
            duration: 1000,
            success: function () {
              wx.navigateBack();
            }
          })
        }
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