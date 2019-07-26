// components/groupUser/groupUser.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data : {
      type : Array,
    },
    size : {
      type : Number,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      console.log(this.properties.data)
      console.log(this.properties.size)
    }

  }
})
