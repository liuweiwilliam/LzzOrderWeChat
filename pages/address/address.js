// pages/address/address.js
Page({

  /**
   * 页面的初始数
   */
  data: {
    orig:"",
    addressList:[
      {
        id:"001",
        name:"姓名1",
        phone:"1234567890",
        detail:"这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址",
        usualFlag:"1",
      },
      {
        id: "002",
        name: "姓名2",
        phone: "1234567890",
        detail: "这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址",
        usualFlag: "0",
      },
      {
        id: "003",
        name: "姓名3",
        phone: "1234567890",
        detail: "这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址",
        usualFlag: "0",
      },
      {
        id: "004",
        name: "姓名4",
        phone: "1234567890",
        detail: "这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址这里是地址",
        usualFlag: "0",
      }
    ],
    loaded:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var par_orig = options.orig;
    console.log(par_orig);

    that.setData({
      orig: par_orig
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
    var that = this;
    wx.showLoading({ title: "数据加载中..." });
    var basePath = getApp().globalData.basePath;
    that.setData({
      basePath: basePath
    });

    wx.request({
      url: basePath + 'getAddresses.action', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          addressList: res.data.addressList,
          loaded:true
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
   * 设置地址常用
   */
  checkSingle: function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    var id = event.currentTarget.dataset.id;
    var address_list = that.data.addressList;
    wx.showLoading({ title: "" });
    var basePath = getApp().globalData.basePath;
    wx.request({
      url: basePath + 'setAddressUsual.action?addressId=' + id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        for (var i = 0; i < address_list.length; i++) {
          if (i == index) {
            address_list[i].usualFlag = "1";
          } else {
            address_list[i].usualFlag = "0";
          }
        }

        that.setData({
          addressList: address_list
        });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '设置失败',
          image: '/images/base/warn-hl.png',
          duration: 1500
        })
      },
      complete: function () {
      }
    });
  },

  /**
   * 添加地址
   */
  addAddress: function(){
    wx.navigateTo({
      url: 'addressAddOrUpdate',
    })
  },

  /**
   * 删除地址
   */
  deleteAddress: function(event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '真的要删除这条地址信息吗?',
      success: function (res) {
        if (res.confirm) {
          that.realDelete(id);
        }
      }
    });
  },

  realDelete: function(id){
    wx.showLoading({ title: "" });
    var that = this;
    var address_list = that.data.addressList;
    var basePath = getApp().globalData.basePath;
    for (var i = 0; i < address_list.length; i++) {
      var del_default = false;
      if (address_list[i].id == id) {
        wx.request({
          url: basePath + 'deleteAddress.action?addressId=' + id, //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json', // 默认值
            "sessionId": getApp().getSessionId()
          },
          success: function (res) {
            wx.hideLoading();
            if (address_list[i].usualFlag == "1") {
              del_default = true;
            }
            address_list.splice(i, 1);

            if (del_default && address_list.length != 0) {
              address_list[0].usualFlag = "1";
            }

            that.setData({
              addressList: address_list
            });
          },
          fail: function () {
            wx.hideLoading();
            wx.showToast({
              title: '删除失败',
              image: '/images/base/warn-hl.png',
              duration: 1500
            })
          },
          complete: function () {
          }
        })
        break;
      }
    }
  },

  /**
   * 
   */
  selectAddress: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var orig = that.data.orig;
    if(orig=="fromOrder"){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var address = prevPage.data.address;

      var address_list = that.data.addressList;
      for (var i = 0; i < address_list.length; i++) {
        if (address_list[i].id == id) {
          prevPage.setData({
            address: address_list[i],
            addressId: address_list[i].id
          });
          wx.navigateBack();
        }
      }
    }
  },

  /**
   * 编辑地址信息
   */
  editAddress: function (e) {
    var that = this;

    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: 'addressAddOrUpdate?id=' + id,
    });
  }

})