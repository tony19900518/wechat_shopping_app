// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    name: "",
    id: 0,
    price: 0,
    detailImg: [],
    itemNum: 0,
    itemList: [],
    totalPrice: 0,
    priceList: []
  },

  getPrice() {
    var that = this
    wx.getStorage({
      key: 'goodsList',
      success: function(res) {
        var myGoodsList = res.data;
        var tempList = []
        for (let i = 0; i < that.data.itemList.length; i++) {
          for (let j = 0; j < myGoodsList.length; j++) {
            if (that.data.itemList[i] == myGoodsList[j].id) {
              tempList.push(myGoodsList[j].price)
            }
          }
        }
        that.setData({
          priceList: tempList
        })
        var tempTotalPrice = 0
        for (let k = 0; k < that.data.priceList.length; k++) {
          tempTotalPrice += that.data.priceList[k]
        }
        if (tempTotalPrice >= 99) {
          tempTotalPrice -= 15
        }
        that.setData({
          totalPrice: tempTotalPrice
        })
      },
    })
  },

  addToCart() {
    var that = this
    wx.getStorage({
      key: 'goodsList',
      success: function(res) {
        for (let i = 0; i < res.data.length; i++) {
          if (that.data.id == res.data[i].id) {
            that.data.itemList.push(res.data[i].id);
            that.setData({
              itemList: that.data.itemList
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
              data: that.data.itemList,
            })
            that.getPrice()
            that.setData({
              itemNum: that.data.itemList.length
            })
          }
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // console.log(parseInt(options.id))
    wx.request({
      url: `https://100boot.cn/wxShop/goods/getGoodsInfo?key=b9b7b4803a3f4d4f8a322a60666da4aa&goodsId=${parseInt(options.id)}`,
      // url: `https://100boot.cn/wxShop/goods/getGoodsInfo?key=43575a62ddbc43358b50f182928f4059&goodsId=${parseInt(options.id)}`,
      // url: `https://100boot.cn/wxShop/goods/getGoodsInfo?key=eb482f6eafcf4a47b13433a0c00d4499&goodsId=${parseInt(options.id)}`,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.result)
        var imgUrl = res.data.result.details.split(';')
        that.setData({
          imgUrls: res.data.result.imgUrl,
          name: res.data.result.name,
          price: res.data.result.price,
          id: res.data.result.id,
          detailImg: imgUrl
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.getStorage({
      key: 'itemAdd',
      success: function(res) {
        console.log(res.data)
        that.setData({
          itemList: res.data
        })
        that.setData({
          itemNum: that.data.itemList.length
        })
        that.getPrice()
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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