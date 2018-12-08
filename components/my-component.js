Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: Object,
      value: [],
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    addToCart(e) {
      var myEventDetail = {
        goodsId: e.target.dataset.id
      }
      this.triggerEvent("action", myEventDetail);
    }
  }
}) 