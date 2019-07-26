// components/bannerProductDetail/bannerProductDetail.js
import { getImageHeight } from '../../utils/index.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerImages: {
      type: Array,
      value: []
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
    circular: true,
    windowWidth: 370
  },

  previewImgEnv() {
    this.triggerEvent('previewImgEnv')
  },

  /**
   * 组件布局完成后执行
   */
  created() {
    // console.log('组件实例进入页面节点树时')
    let windowWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      windowWidth: windowWidth
    })
    // console.log('屏幕宽度')
    // console.log(this.data.windowWidth)
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
      
    }
  }
})
