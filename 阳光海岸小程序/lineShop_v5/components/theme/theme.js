// components/theme/theme.js
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
    imageHeight: 0,
    goodsImageHeight: 0,
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goodsImageLoad(e) {
      getImageHeight(this, '.goodsImage', e).then(res => {
        this.setData({
          goodsImageHeight: res
        })
      })
    },
    imageLoad(e) {
      getImageHeight(this, '.topImage', e).then(res => {
        this.setData({
          imageHeight: res
        })
      })
    }
  }
})
