// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // tabbar
    tabBar: {
      activeIndex: 0,
      "list": [
        {
          "pagePath": "/pages/home/home",
          "iconPath": "/assets/images/footer/icon_home.png",
          "selectedIconPath": "/assets/images/footer/icon_home_active.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/type/type",
          "iconPath": "/assets/images/footer/icon_type.png",
          "selectedIconPath": "/assets/images/footer/icon_type_active.png",
          "text": "品类"
        },
        {
          "pagePath": "/pages/cart/cart",
          "iconPath": "/assets/images/footer/icon_cart.png",
          "selectedIconPath": "/assets/images/footer/icon_cart_active.png",
          "text": "购物车"
        },
        {
          "pagePath": "/pages/userCenter/userCenter",
          "iconPath": "/assets/images/footer/icon_people.png",
          "selectedIconPath": "/assets/images/footer/icon_people_active.png",
          "text": "我的"
        }
      ]
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
