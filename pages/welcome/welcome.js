// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  getUserInfo: function (sessionId) {
    var that = this;
    var basePath = getApp().globalData.basePath;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country;

        wx.request({
          url: basePath + 'setUserInfo.action',
          data: {
            userInfo: JSON.stringify(userInfo)
          },
          header: {
            'content-type': 'application/json', // 默认值
            "sessionId": sessionId
          },
          success: function (res) {

          },
          fail: function () {

          },
          complete: function () {
          }
        });
      },
      fail: function () {
        wx.showModal({
          title: '警告',
          content: '对不起，系统未取得获取您信息的权限，零食天地部分功能您可能无法正常使用。请10分钟后再次点击授权，或者删除小程序重新进入。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.checkSession({
      success: function () {
        console.log("checkSession success");
        var sessionId = that.getSessionId();
        if ("" == sessionId) {
          console.log("sessionID is null");
          that.login();
        } else {
          console.log("sessionID is not null");
          wx.switchTab({
            url: "/pages/index/index"
          })
        }
      },
      fail: function () {
        console.log("checkSession fail");
        that.login();
      }
    });
  },

  /**
   * 获取用户登录信息sessionId
   */
  getSessionId: function () {
    try {
      var sessionId = wx.getStorageSync('sessionId')
      return sessionId;
    } catch (e) {
      // Do something when catch error
      return "";
    }
  },

  /**
   * 登陆
   */
  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("wx login");
          that.loginToSystem(res.code);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log("login failed " + res.errMsg);
      }
    });
  },

  /**
   * 登陆到后台
   */
  loginToSystem: function (code) {
    wx.showLoading({ title: "" });

    var that = this;
    var basePath = getApp().globalData.basePath;
    wx.request({
      url: basePath + 'login.action',
      data: {
        code: code
      },
      success: function (res) {
        console.log("rslt : " + res.data);
        wx.hideLoading();
        if (res.data.iserror) {
          wx.showToast({
            title: '登陆失败',
            image: '/images/base/warn-hl.png',
            duration: 1500
          })
        } else {
          var sessionId = res.data.sessionId;

          that.getUserInfo(sessionId);
          console.log("sessionId : " + sessionId);
          try {
            wx.setStorageSync('sessionId', sessionId);

            wx.switchTab({
              url: "/pages/index/index"
            })
          } catch (e) {
          }
        }
      },
      fail: function () {

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
  
  }
})