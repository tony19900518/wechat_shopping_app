// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItem: [],
    cartItemId: [],
    cartItemIdAndNum: [{
      id: 0,
      num: 1
    }],
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
    checked: [],
    checkedAll: true,
    moveToLeft: [],
    clientXStart: 0,
    listLen: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  arrayCalc(arr) {
    var that = this;
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) == -1) {
        newArr.push(arr[i])
      }
    }
    var newarr2 = new Array(newArr.length);
    for (var t = 0; t < newarr2.length; t++) {
      newarr2[t] = 0;
    }
    for (var p = 0; p < newArr.length; p++) {
      for (var j = 0; j < arr.length; j++) {
        if (newArr[p] == arr[j]) {
          newarr2[p]++;
        }
      }
    }

    // console.log(newArr)
    // console.log(newarr2)
    that.setData({
      'cartItemIdAndNum.id': newArr,
      'cartItemIdAndNum.num': newarr2
    })
    // console.log(that.data.cartItemIdAndNum)
  },

  reduceNum(e) {
    var that = this
    var confirm = false
    // console.log(e.currentTarget.dataset.index)
    const _goodsNum = `cartItemId[${e.currentTarget.dataset.index}]`
    if (that.data.cartItemId[e.currentTarget.dataset.index] == 1) {
      wx.showModal({
        title: '是否删除以下商品',
        content: that.data.cartItem[e.currentTarget.dataset.index].name,
        success: function(res) {
          if (res.confirm) {
            console.log('用户确定删除')
            that.setData({
              [_goodsNum]: that.data.cartItemId[e.currentTarget.dataset.index] - 1
            })
            wx.getStorage({
              key: 'itemAdd',
              success: function(res) {
                // console.log(res.data)
                const len = res.data.length;
                for (let i = 0; i < len; i++) {
                  if (e.currentTarget.dataset.id == res.data[i]) {
                    res.data.splice(i, 1)
                    break;
                  }
                }
                wx.setStorage({
                  key: 'itemAdd',
                  data: res.data,
                })
                that.setData({
                  listLen: res.data
                })
                that.calcTotal()
              },
            })

          } else if (res.cancel) {
            console.log('用户取消删除')
            confirm = false
          }
        }
      })
    }
    console.log(confirm)
    if (confirm || that.data.cartItemId[e.currentTarget.dataset.index] != 1) {
      console.log('执行操作')
      that.setData({
        [_goodsNum]: that.data.cartItemId[e.currentTarget.dataset.index] - 1
      })
      wx.getStorage({
        key: 'itemAdd',
        success: function(res) {
          // console.log(res.data)
          for (let i = 0; i < res.data.length; i++) {
            if (e.currentTarget.dataset.id == res.data[i]) {
              res.data.splice(i, 1)
              break;
            }
          }
          wx.setStorage({
            key: 'itemAdd',
            data: res.data,
          })
          that.calcTotal()
        },
      })
    }

  },

  increaseNum(e) {
    var that = this
    // console.log(e.currentTarget.dataset.index)
    const _goodsNum = `cartItemId[${e.currentTarget.dataset.index}]`
    that.setData({
      [_goodsNum]: that.data.cartItemId[e.currentTarget.dataset.index] + 1
    })
    wx.getStorage({
      key: 'itemAdd',
      success: function(res) {
        // console.log(res.data)
        res.data.push(e.currentTarget.dataset.id)
        wx.setStorage({
          key: 'itemAdd',
          data: res.data,
        })
        that.calcTotal()
        console.log(res.data)
      }
    })
  },

  touchStart(e) {
    // console.log(e.currentTarget.dataset.index)
    // console.log(e.changedTouches[0].clientX)
    var deleteList = new Array(this.data.cartItem.length);
    for (let m = 0; m < deleteList.length; m++) {
      deleteList[m] = false
    }
    this.setData({
      moveToLeft: deleteList,
      clientXStart: e.changedTouches[0].clientX
    })
  },

  touchEnd(e) {
    // console.log(e.changedTouches[0].clientX)
    if (e.changedTouches[0].clientX < this.data.clientXStart) {
      console.log("moveToLeft")
      const _moveItem = `moveToLeft[${e.currentTarget.dataset.index}]`
      this.setData({
        [_moveItem]: true,
      })
    }
  },

  deleteItem(e) {
    // console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.id)
    var that = this
    var confirm = false
    // console.log(e.currentTarget.dataset.index)
    const _goodsNumNew = `cartItemId[${e.currentTarget.dataset.index}]`
    wx.showModal({
      title: '是否删除以下商品',
      content: that.data.cartItem[e.currentTarget.dataset.index].name,
      success: function(res) {
        if (res.confirm) {
          console.log('用户确定删除')
          that.setData({
            [_goodsNumNew]: 0
          })
          // console.log()
          wx.getStorage({
            key: 'itemAdd',
            success: function(res) {
              console.log(res.data)
              console.log(e.currentTarget.dataset.id)
              const len = res.data.length;
              for (let i = 0; i < len; i++) {
                // console.log(res.data[i], e.currentTarget.dataset.id)
                console.log("遍历：" + res.data[i])
                if (res.data[i] == e.currentTarget.dataset.id) {
                  // console.log(e.currentTarget.dataset.id)
                  res.data.splice(i--, 1)
                  // break;
                }
              }
              console.log(res.data)
              wx.setStorage({
                key: 'itemAdd',
                data: res.data,
              })
              that.setData({
                listLen: res.data
              })
              that.calcTotal()
            },
          })

        } else if (res.cancel) {
          console.log('用户取消删除')
          confirm = false
        }
      }
    })
  },

  changeItem(e) {
    // console.log(e.currentTarget.dataset.index)
    // console.log(this.data.checked[e.currentTarget.dataset.index])
    const _changedItem = `checked[${e.currentTarget.dataset.index}]`
    this.data.checked[e.currentTarget.dataset.index] ? this.setData({
      [_changedItem]: false
    }) : this.setData({
      [_changedItem]: true
    })
  },

  calcTotal() {
    let tempPrice = 0
    for (let k = 0; k < this.data.cartItem.length; k++) {
      if (!this.data.checked[k]) {
        continue;
      }
      tempPrice += (this.data.cartItem[k].price * this.data.cartItemId[k])
    }
    this.setData({
      totalPrice: tempPrice
    })
    if (this.data.totalPrice >= 99) {
      this.setData({
        discount: 15
      })
    } else {
      this.setData({
        discount: 0
      })
    }
    this.setData({
      finalPrice: this.data.totalPrice - this.data.discount
    })
  },

  checkAll() {
    if (this.data.checkedAll) {
      for (let i = 0; i < this.data.checked.length; i++) {
        const _changedItem = `checked[${i}]`
        this.setData({
          [_changedItem]: false
        })
      }
      this.setData({
        checkedAll: false
      })

    } else {
      for (let i = 0; i < this.data.checked.length; i++) {
        const _changedItem = `checked[${i}]`
        this.setData({
          [_changedItem]: true
        })
      }
      this.setData({
        checkedAll: true
      })
    }
    this.calcTotal()
  },

  checkboxChange(e) {
    // console.log(e.detail.value)
    let that = this;
    let selectList = [];
    let selectListNum = [];
    let selectListPrice = [];
    let tempPrice = 0;

    if (e.detail.value.length == that.data.cartItem.length) {
      that.setData({
        checkedAll: true
      })
    } else {
      that.setData({
        checkedAll: false
      })
    }

    for (let i = 0; i < e.detail.value.length; i++) {
      selectList.push(parseInt(e.detail.value[i]))
    }
    // console.log(selectList)
    // console.log(that.data.cartItem, that.data.cartItemId)
    for (let j = 0; j < that.data.cartItem.length; j++) {
      for (let k = 0; k < selectList.length; k++) {
        if (selectList[k] == that.data.cartItem[j].id) {
          selectListNum[k] = that.data.cartItemId[j];
          selectListPrice[k] = that.data.cartItem[j].price
        }
      }
    }
    // console.log(selectListNum)
    // console.log(selectListPrice)
    for (let l = 0; l < selectList.length; l++) {
      tempPrice += (selectListPrice[l] * selectListNum[l])
    }
    this.setData({
      totalPrice: tempPrice
    })
    if (this.data.totalPrice >= 99) {
      this.setData({
        discount: 15
      })
    } else {
      this.setData({
        discount: 0
      })
    }
    this.setData({
      finalPrice: this.data.totalPrice - this.data.discount
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var that = this;
    wx.getStorage({
      key: 'itemAdd',
      success: function(res) {
        that.arrayCalc(res.data)
        that.setData({
          listLen: res.data
        })
        wx.getStorage({
          key: 'goodsList',
          success: function(res) {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < that.data.cartItemIdAndNum.id.length; j++) {
                if (that.data.cartItemIdAndNum.id[j] == res.data[i].id) {
                  that.data.cartItem.push(res.data[i]);
                  that.setData({
                    cartItem: that.data.cartItem
                  });
                }
              }
            }
            // console.log(that.data.cartItem.length)
            for (let i = 0; i < that.data.cartItem.length; i++) {
              for (let j = 0; j < that.data.cartItemIdAndNum.id.length; j++) {
                if (that.data.cartItem[i].id == that.data.cartItemIdAndNum.id[j]) {
                  const _idNum = `cartItemId[${i}]`
                  that.setData({
                    [_idNum]: that.data.cartItemIdAndNum.num[j]
                  })
                }
              }
            }
            var checkList = new Array(that.data.cartItem.length);
            for (let l = 0; l < checkList.length; l++) {
              checkList[l] = true
            }
            that.setData({
              checked: checkList,
              checkedAll: true
            })

            var deleteList = new Array(that.data.cartItem.length);
            for (let m = 0; m < deleteList.length; m++) {
              deleteList[m] = false
            }
            that.setData({
              moveToLeft: deleteList
            })

            that.calcTotal()
          },
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      cartItem: [],
      listLen: []
    })
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