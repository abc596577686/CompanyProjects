// components/areaPicker/areaPicker.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    regionList: [],
    // 地址列表
    provinces: [],
    citys: [],
    districts: [],
    // 当前选择的地址
    curProvince: {},
    curCity: {},
    curDistrict: {}
  },
  created() { //不能调用setData
    // console.log('created')
  },

  attached() { //在组件实例进入页面节点树时执行
    // console.log(this.dataset.regionlist)
    // console.log(this.dataset.addressindex)
    // console.log(this.dataset.addressid)

    let regionList = this.dataset.regionlist
    let addressindex = this.dataset.addressindex

    this.setData({
      regionList: regionList
    })
    // console.log(addressindex)
    if (addressindex) {
      this._initAreaPickerData(this.data.regionList, addressindex[0] - 0, addressindex[1] - 0, addressindex[2] - 0) //初始化区域列表

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelEnv() {
      this.triggerEvent('cancelEnv', {})
    },

    submitEnv() {
      this.triggerEvent('submitEnv', {})
    },

    selectedAreaEnv(e) {
      // console.log(e)
      let value = e.detail.value
      let curProvinceIndex = value[0] //省份index
      let curCityIndex = value[1] //城市index
      let curDistrictIndex = value[2] //地区index

      this._initAreaPickerData(this.data.regionList, curProvinceIndex, curCityIndex, curDistrictIndex)
    },

    /**
   * 初始化城市选择器数据
   */
    _initAreaPickerData(regionList, curProvinceIndex, curCityIndex, curDistrictIndex) {
      if (curProvinceIndex === undefined) curProvinceIndex = 0
      if (curCityIndex === undefined) curCityIndex = 0
      if (curDistrictIndex === undefined) curDistrictIndex = 0

      let provinces = []
      let citys = []
      let districts = []

      regionList.forEach(province => { //省份列表
        provinces.push(province)
      })

      if (!regionList[curProvinceIndex]) { //城市不存在 如果当前索引下的城市不存在
        curProvinceIndex = 0
        curCityIndex = 0
      }
      regionList[curProvinceIndex].childrenList.forEach(city => {//城市列表
        citys.push(city)
      })

      if (!regionList[curProvinceIndex].childrenList[curCityIndex]) { //如果当前索引下的区域不存在
        curCityIndex = 0
      }
      regionList[curProvinceIndex].childrenList[curCityIndex].childrenList.forEach(district => { //区域列表
        districts.push(district)
      })

      // 当前区域列表
      this.setData({
        provinces: provinces,
        citys: citys,
        districts: districts
      })

      // 当前选择的区域信息
      this.setData({
        curProvince: this.data.provinces[curProvinceIndex],
        curCity: this.data.citys[curCityIndex],
        curDistrict: this.data.districts[curDistrictIndex]
      })

      // 最后设置当前值
      this.setData({
        regionValue: [curProvinceIndex, curCityIndex, curDistrictIndex]
      })

      // console.log('得到当前的省市区')
      // console.log(this.data.provinces[curProvinceIndex])
      // console.log(this.data.citys[curCityIndex])
      // console.log(this.data.districts[curDistrictIndex])

      this.triggerEvent('changeEnv', {
        provinces: this.data.provinces[curProvinceIndex],
        citys: this.data.citys[curCityIndex],
        area: this.data.districts[curDistrictIndex]
      })
    }
  }
})
