//index.js
Page({
  data: {
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    swipers: [{
      image: "/images/base/failed.png",
      url:"/pages/good-list/good-list"
    }, {
        image: "/images/base/failed.png",
        url: "/pages/good-list/good-list"
    }, {
        image: "/images/base/failed.png",
        url: "/pages/good-list/good-list"
    }, {
        image: "/images/base/failed.png",
        url: "/pages/good-list/good-list"
    }, {
        image: "/images/base/failed.png",
        url: "/pages/good-list/good-list"
    }
    ],
    menus: [{
      image: "/images/logo1.png",
      title: "全部商品",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo2.png",
      title: "商品分类",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo3.png",
      title: "热销商品",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo4.png",
      title: "最近上新",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo5.png",
      title: "我的订单",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo6.png",
      title: "地址管理",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo7.png",
      title: "收藏夹",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo8.png",
      title: "我的足迹",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo9.png",
      title: "购物车",
      url: "/pages/good-list/good-list"
    }, {
      image: "/images/logo10.png",
      title: "关于我们",
      url: "/pages/good-list/good-list"
    }
    ],
    newGoods: [{
      goodId:"001",
      imgUrl: "/images/base/failed.png",
      price: "￥123"
    }, {
        imgUrl: "/images/base/failed.png",
      price: "￥124"
    }, {
        imgUrl: "/images/quick3.jpg",
      price: "￥125"
    }, {
        imgUrl: "/images/quick4.jpg",
      price: "￥126"
    }, {
        imgUrl: "/images/quick5.jpg",
      price: "￥127"
    }, {
        imgUrl: "/images/quick6.jpg",
      price: "￥128"
    }
    ],
    hotCategories: [{
      id: "001",
      typicalImg: "/images/quick1.jpg",
      name: "mingcheng1"
    }, {
    catId: "001",
    typicalImg: "/images/quick1.jpg",
    name: "mingcheng1"
    }, {
      catId: "001",
      typicalImg: "/images/quick1.jpg",
      name: "mingcheng1"
    }, {
      catId: "001",
      typicalImg: "/images/quick1.jpg",
      name: "mingcheng1"
    }, {
      catId: "001",
      typicalImg: "/images/quick1.jpg",
      name: "mingcheng1"
    }, {
      catId: "001",
      typicalImg: "/images/quick1.jpg",
      name: "mingcheng1"
    }
    ],
    searchName:"",
    loaded:false,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function(){
    var that = this;
    var basePath = getApp().globalData.basePath;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: basePath + "getIndexInitInfo.action", //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        "sessionId": getApp().getSessionId()
      },
      success: function (res) {
        wx.hideLoading();
        console.log("success:" + res.data.goods);
        that.setData({
          swipers: res.data.swipers,
          menus: res.data.menus,
          newGoods: res.data.newGoods,
          hotCategories: res.data.hotCategories,
          hotGoods: res.data.hotGoods,
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

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeVertical: function (e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  searchGood: function(){
    var that = this;
    var name = that.data.searchName;
    if(name==""){
      wx.showToast({
        title: '请输入关键词！',
        image: '/images/base/warn-hl.png',
        duration: 1500
      });
      return;
    }

    wx.navigateTo({
      url: '/pages/good-list/good-list?type=searchGoodByName&searchName=' + name,
    })
  },

  inputSearchName: function(e){
    console.log(e.detail.value);
    this.setData({
      searchName: e.detail.value
    });
  },

  scanQRCode:function(){
    wx.scanCode({
      success: (res) => {
        wx.showModal({
          title: '提示',
          content: "功能开发中",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  jumpUrl: function (event){
    var url = event.currentTarget.dataset.url;
    console.log(url);
    wx.navigateTo({
      url: url,
      fail: function(e){
        wx.switchTab({
          url: url
        })
      }
    })
  },

  getGoodInfo: function(event){
    var id = event.currentTarget.dataset.id;
    var name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: "/pages/good-info/good-info?goodId=" + id + "&goodName=" + name
    })
  },

  getGoodsByCategory: function (event) {
    var id = event.currentTarget.dataset.id;
    var name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: "/pages/good-list/good-list?type=getGoodsByCategory&id=" + id + "&name=" + name
    })
  }
})

