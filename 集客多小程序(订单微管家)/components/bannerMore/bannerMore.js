// components/bannerMore.js
import { getImageHeight } from '../../utils/index.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 300,
    imageHeight: 200,
    circular: true
  },

  jumpUrlEnv(e) {
    console.log(e)
    this.triggerEvent('jumpUrlEnv', e)
    // wx.navigateTo({
    //   url: '',
    // })
  },

  /**
   * 组件布局完成后执行
   */
  created() {
    // console.log('组件实例进入页面节点树时')
  },

  /**
   * 组件布局完成后执行
   */
  ready() {
    // console.log('组件布局完成后执行')

  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad(e) {
      getImageHeight(this, '.slide-image', e).then(res => {
        this.setData({
          imageHeight: res
        })
      })
    }
  }
})
