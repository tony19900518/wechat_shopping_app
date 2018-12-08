var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img22.iblimg.com/market-2/images/activity/1360334799.jpg',
      'http://img23.iblimg.com/market-2/images/activity/559897635.jpg',
      'http://img23.iblimg.com/market-2/images/activity/81576243.jpg',
      'http://img22.iblimg.com/market-2/images/activity/253260990.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
    address: '',
    scrollBarList: [{
      url: "/img/icon1.jpg",
      txt: "新鲜水果"
    }, {
      url: "/img/icon2.jpg",
      txt: "时令蔬菜"
    }, {
      url: "/img/icon3.jpg",
      txt: "肉禽蛋品"
    }, {
      url: "/img/icon4.jpg",
      txt: "海鲜水产"
    }, {
      url: "/img/icon5.jpg",
      txt: "乳品"
    }, {
      url: "/img/icon6.jpg",
      txt: "精致烘培"
    }, {
      url: "/img/icon7.jpg",
      txt: "面点速食"
    }, {
      url: "/img/icon8.jpg",
      txt: "粮油调味"
    }, {
      url: "/img/icon9.jpg",
      txt: "酒水饮料"
    }, {
      url: "/img/icon10.jpg",
      txt: "休闲零食"
    }],
    hh: 0,
    mm: 0,
    ss: 0,
    goodsList: [],
    toView: 'yellow',
    scrollLeft: 0,
    scrolls: [{
      name: '黄色',
      tag: 'yellow',
    }, {
      name: '绿色',
      tag: 'green',
    }, {
      name: '红色',
      tag: 'red',
    }, {
      name: '黄色',
      tag: 'yellow',
    }, {
      name: '绿色',
      tag: 'green',
    }, {
      name: '红色',
      tag: 'red',
    }, ],
    tempData: {
      title_img: "https://image1.suning.cn/uimg/cms/img/153914364790927964.png?v=2018111701112703",
      max: 6,
      min: 0,
      goodsList: []
    },
    tempData1: {
      title_img: "https://image1.suning.cn/uimg/cms/img/153914365518546757.png?v=2018111701112703",
      max: 12,
      min: 6,
      goodsList: []
    },
    tempData2: {
      title_img: "https://image1.suning.cn/uimg/cms/img/153914364790927964.png?v=2018111701112703",
      max: 18,
      min: 12,
      goodsList: []
    },
    itemAddTempList: []
  },

  useScan() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'vhhoZnqOo5pS4oraEeKk9wueRjcINr4B'
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      wxMarkerData = data.wxMarkerData;
      let index = data.wxMarkerData[0].address.indexOf("区");
      let add = data.wxMarkerData[0].address.slice(index + 1)
      that.setData({
        address: add
      });
      wx.setStorage({
        key: 'address',
        data: that.data.address,
      })
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success
    });



    const timer = setInterval(() => {
      let today = new Date();
      if (today.getSeconds() != 0 && today.getMinutes() != 0)
        that.setData({
          ss: 59 - today.getSeconds(),
          mm: 59 - today.getMinutes(),
          hh: 23 - today.getHours()
        })
      if (today.getSeconds() == 0) {
        that.setData({
          ss: 59,
          mm: 59 - today.getMinutes(),
          hh: 23 - today.getHours()
        })
      }
      if (today.getMinutes() == 0) {
        that.setData({
          ss: 59 - today.getSeconds(),
          mm: 59,
          hh: 23 - today.getHours()
        })
      }
      if (that.data.hh == -1) {
        that.setData({
          ss: 0,
          mm: 0,
          hh: 0
        })
        clearInterval(timer)
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getdata: function() {
    var that = this;
    var _goodsList = 'tempData.goodsList';
    var _goodsList1 = 'tempData1.goodsList';
    var _goodsList2 = 'tempData2.goodsList';
    wx.request({
      url: 'https://100boot.cn/wxShop/goods/getActivityGoodsList?key=b9b7b4803a3f4d4f8a322a60666da4aa&activityId=1&page=1&size=20',
      // url: 'https://100boot.cn/wxShop/goods/getActivityGoodsList?key=43575a62ddbc43358b50f182928f4059&activityId=1&page=1&size=20',
      // url: 'https://100boot.cn/wxShop/goods/getActivityGoodsList?key=eb482f6eafcf4a47b13433a0c00d4499&activityId=1&page=1&size=20',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          goodsList: res.data.result.list,
          [_goodsList]: res.data.result.list,
          [_goodsList1]: res.data.result.list,
          [_goodsList2]: res.data.result.list
        })
        // console.log(that.data.goodsList)
        wx.setStorage({
          key: 'goodsList',
          data: that.data.goodsList,
        })
      }
    })
  },
  addToCart(e) {
    // console.log(e.detail.goodsId)
    var that = this
    wx.getStorage({
      key: 'goodsList',
      success: function(res) {
        for (let i = 0; i < res.data.length; i++) {
          if (e.detail.goodsId == res.data[i].id || e.currentTarget.dataset.id == res.data[i].id) {
            that.data.itemAddTempList.push(res.data[i].id);
            that.setData({
              itemAddTempList: that.data.itemAddTempList
            });
            wx.showToast({
              title: '添加购物车成功',
              duration: 10000
            })
            setTimeout(function() {
              wx.hideToast()
            }, 1000)
            wx.setStorage({
              key: 'itemAdd',
              data: that.data.itemAddTempList,
            })
          }
        }
      },
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    that.getdata();
    wx.getStorage({
      key: 'itemAdd',
      success: function(res) {
        that.setData({
          itemAddTempList: res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // var that = this
    // console.log(that.data.itemAddTempList)
    // wx.setStorage({
    //   key: 'itemAdd',
    //   data: that.data.itemAddTempList,
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})