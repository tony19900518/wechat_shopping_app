// pages/discount/discount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollBarList: [{
        txt: "新鲜水果",
        second: [{
          txt: "国产水果"
        }, {
          txt: "进口水果"
        }, {
          txt: "精品水果"
        }],
        active: true
      }, {
        txt: "时令蔬菜",
        second: [{
          txt: "有机蔬菜"
        }, {
          txt: "豆制品"
        }, {
          txt: "方便净菜"
        }],
        active: false
      }, {
        txt: "肉禽蛋品",
        second: [{
          txt: "猪肉"
        }, {
          txt: "牛羊肉"
        }, {
          txt: "蛋品"
        }],
        active: false
      }, {
        txt: "海鲜水产",
        second: [{
          txt: "鱼类"
        }, {
          txt: "虾蟹贝类"
        }, {
          txt: "干货"
        }],
        active: false
      }, {
        txt: "乳品",
        second: [{
          txt: "常温乳品"
        }, {
          txt: "冷藏乳品"
        }, {
          txt: "冰淇淋"
        }],
        active: false
      }, {
        txt: "精致烘培",
        second: [{
          txt: "吐司面包"
        }, {
          txt: "烘焙器皿"
        }, {
          txt: "面粉"
        }],
        active: false
      }, {
        txt: "面点速食",
        second: [{
          txt: "熟食"
        }, {
          txt: "速冻水饺"
        }, {
          txt: "方便速食"
        }],
        active: false
      }, {
        txt: "粮油调味",
        second: [{
          txt: "调味料"
        }, {
          txt: "罐头酱菜"
        }, {
          txt: "五谷杂粮"
        }],
        active: false
      }, {
        txt: "酒水饮料",
        second: [{
          txt: "茶饮料"
        }, {
          txt: "酒类"
        }, {
          txt: "饮用水"
        }],
        active: false
      }, {
        txt: "休闲零食",
        second: [{
          txt: "巧克力"
        }, {
          txt: "干果蜜饯"
        }, {
          txt: "休闲零食"
        }],
        active: false
      },
      {
        txt: "新鲜水果",
        second: [{
          txt: "国产水果"
        }, {
          txt: "进口水果"
        }, {
          txt: "精品水果"
        }],
        active: false
      }, {
        txt: "时令蔬菜",
        second: [{
          txt: "有机蔬菜"
        }, {
          txt: "豆制品"
        }, {
          txt: "方便净菜"
        }],
        active: false
      }, {
        txt: "肉禽蛋品",
        second: [{
          txt: "猪肉"
        }, {
          txt: "牛羊肉"
        }, {
          txt: "蛋品"
        }],
        active: false
      }, {
        txt: "海鲜水产",
        second: [{
          txt: "鱼类"
        }, {
          txt: "虾蟹贝类"
        }, {
          txt: "干货"
        }],
        active: false
      }, {
        txt: "乳品",
        second: [{
          txt: "常温乳品"
        }, {
          txt: "冷藏乳品"
        }, {
          txt: "冰淇淋"
        }],
        active: false
      }, {
        txt: "精致烘培",
        second: [{
          txt: "吐司面包"
        }, {
          txt: "烘焙器皿"
        }, {
          txt: "面粉"
        }],
        active: false
      }, {
        txt: "面点速食",
        second: [{
          txt: "熟食"
        }, {
          txt: "速冻水饺"
        }, {
          txt: "方便速食"
        }],
        active: false
      }, {
        txt: "粮油调味",
        second: [{
          txt: "调味料"
        }, {
          txt: "罐头酱菜"
        }, {
          txt: "五谷杂粮"
        }],
        active: false
      }, {
        txt: "酒水饮料",
        second: [{
          txt: "茶饮料"
        }, {
          txt: "酒类"
        }, {
          txt: "饮用水"
        }],
        active: false
      }, {
        txt: "休闲零食",
        second: [{
          txt: "巧克力"
        }, {
          txt: "干果蜜饯"
        }, {
          txt: "休闲零食"
        }],
        active: false
      }
    ],
    itemList: [],
    goodsList: [],
    itemAddTempList: [],
    address: ''
  },

  switchTo(e) {
    // console.log(e.currentTarget.dataset.index)
    for (let i = 0; i < this.data.scrollBarList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue
      } else {
        const _allItem = `scrollBarList[${i}].active`
        this.setData({
          [_allItem]: false
        })
      }
    }
    const _activeItem = `scrollBarList[${e.currentTarget.dataset.index}].active`
    this.setData({
      [_activeItem]: true
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'goodsList',
      success: function(res) {
        that.setData({
          itemList: res.data
        })
      },
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
        that.setData({
          itemAddTempList: res.data
        })
      },
    })
    wx.getStorage({
      key: 'address',
      success: function(res) {
        that.setData({
          address: res.data
        })
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