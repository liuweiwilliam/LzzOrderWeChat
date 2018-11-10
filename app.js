//app.js
App({
  /**
   * 获取用户信息
   */
  getUserInfo: function (sessionId) {
    var that = this;
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
          url: that.globalData.basePath + 'setUserInfo.action',
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

  onLaunch: function() {
    var that = this;

    
  },

  getSessionId: function(){
    try {
      var sessionId = wx.getStorageSync('sessionId')
      return sessionId;
    } catch (e) {
      // Do something when catch error
      return "";
    }
  },

  login: function(){
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
      fail: function(res){
        console.log("login failed " + res.errMsg);
      }
    });
  },

  loginToSystem: function(code){
    var that = this;
    wx.request({
      url: that.globalData.basePath + 'login.action',
      data: {
        code: code
      },
      success: function (res) {
        console.log("rslt : " + res.data);
        if (res.data.iserror) {

        } else {
          var sessionId = res.data.sessionId;

          //that.getUserInfo(sessionId);
          console.log("sessionId : " + sessionId);
          try {
            wx.setStorageSync('sessionId', sessionId);
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

  onShow: function (path, query, scene){
    console.log(scene);
  },

  onHide: function(){

  },

  onError: function(options){
    console.log(msg);
  },

  globalData: {
    userInfo: null,
    basePath:"http://localhost:8080/LZZOrder/"
  }
})
