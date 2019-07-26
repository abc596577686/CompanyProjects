// components/bannerAlone/bannerAlone.js
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
    imageHeight: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad(e) {
      getImageHeight(this, '.image', e).then(res => {
        this.setData({
          imageHeight: res
        })
      })
    }
  }
})
