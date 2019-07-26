<template>
  <div class="goodDetails">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="产品信息" name="goodDec" class="goodDec" style="font-size:12px;">
        <el-row :gutter="45">
          <el-form :label-position="labelPosition" label-width="100px" ref="ruleForm" class="ruleForm">
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-form-item label="供货商">
                  <p v-html="goodInfo.supplier" class="ml"></p>
                </el-form-item>
                <el-form-item label="产品类型">
                  <p v-html="goodInfo.type" class="ml"></p>
                </el-form-item>
                <el-form-item label="产品名称">
                  <p v-html="goodInfo.name" class="ml"></p>
                </el-form-item>
                <el-form-item label="线路亮点">
                  <p v-for="route in goodInfo.routes" v-html="route" class="ml"></p>
                </el-form-item>
                <el-form-item label="产品图片">
                  <img class="goodImg ml" v-for="pic in goodInfo.pics" :src="pic.imgUrl">
                </el-form-item>
                <el-form-item label="出发地">
                  <p v-html="goodInfo.startAddress" class="ml"></p>
                </el-form-item>
                <el-form-item label="目的地">
                  <p v-html="goodInfo.endAddress" class="ml"></p>
                </el-form-item>
                <el-form-item label="行程天数">
                  <p v-html="goodInfo.tripDays" class="ml"></p>
                </el-form-item>
                <el-form-item label="去程交通">
                  <p v-html="goodInfo.goTraffic" class="ml"></p>
                </el-form-item>
                <el-form-item label="回程交通">
                  <p v-html="goodInfo.backTraffic" class="ml"></p>
                </el-form-item>
                <el-form-item label="产品主题">
                  <p v-for="item in goodInfo.theme" v-html="item.themeName" class="ml"></p>
                </el-form-item>
                <el-form-item label="费用包含">
                  <p v-html="goodInfo.cost" class="ml"></p>
                </el-form-item>
                <el-form-item label="费用不包含">
                  <p v-html="goodInfo.noCost" class="ml"></p>
                </el-form-item>
                <el-form-item label="退改规则">
                  <p class="ml" v-for="rule in goodInfo.rules" v-show="rule.rangeMax || rule.rangeMax == ''">{{rule.rangeMin}}天-{{rule.rangeMax}}天以内扣除费用{{rule.priceRate}}%</p>
                  <p class="ml" v-for="rule in goodInfo.rules" v-show="!rule.rangeMax || rule.rangeMax != ''">{{rule.rangeMin}}天之前扣除费用{{rule.priceRate}}%</p>
                </el-form-item>
                <el-form-item label="预定须知">
                  <p v-html="goodInfo.notice" class="ml"></p>
                </el-form-item>
                <el-form-item label="签证信息">
                  <el-form-item label="签证国家">
                    <p v-html="goodInfo.visaFrom" class="ml"></p>
                  </el-form-item>
                  <el-form-item label="签证类型">
                    <p v-html="goodInfo.visaType" class="ml"></p>
                  </el-form-item>
                  <el-form-item label="主领区">
                    <p v-html="goodInfo.mainArea" class="ml"></p>
                  </el-form-item>
                  <el-form-item label="送签地">
                    <p v-html="goodInfo.toArea" class="ml"></p>
                  </el-form-item>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </el-row>
        <div class="actionArea">
          <el-button type="primary" @click.stop.prevent="nextPage('1')">下一页</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="行程详情" name="tripDec">
        <el-row>
          <el-form :label-position="labelPosition" label-width="120px" ref="ruleForm" class="ruleForm">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                <!-- <el-form-item label="行程信息：">
                  <div>
                    <span v-html="tripInfo.name"></span>
                    <a class="downloadBtn" target="_blank" style="color: #fff;" :href="tripInfo.downloadUrl" type="primary">下载</a>
                  </div>
                </el-form-item> -->
                <ul>
                  <li v-for="day in tripInfo.days" class="dayLine">
                    <h5 class="dayTitle">第{{day.scheduleNo}}天</h5>
                    <el-form-item label="交通方式：">
                      <p v-for="item in day.traffic">出发地:{{item.departure}}; 目的地:{{item.destination}}; 交通方式:{{item.trafficType}};</p>
                    </el-form-item>
                    <el-form-item label="早餐：">
                      <p v-html="day.breakfast"></p>
                    </el-form-item>
                    <el-form-item label="午餐：">
                      <p v-html="day.lunch"></p>
                    </el-form-item>
                    <el-form-item label="晚餐：">
                      <p v-html="day.dinner"></p>
                    </el-form-item>
                    <el-form-item label="酒店：">
                      <p v-for="star in day.hotel">酒店名称:{{star.name}} 星级:{{star.star}}</p>
                    </el-form-item>
                    <el-form-item label="购物店：">
                      <p v-for="item in day.shopping"></p>
                    </el-form-item>
                    <!-- <el-form-item label="购物店介绍：">
                      <p v-html="day.shopDec"></p>
                    </el-form-item>
                    <el-form-item label="主营产品：">
                      <p v-html="day.productName"></p>
                    </el-form-item>
                    <el-form-item label="营业时间：">
                      <p v-html="day.businessTime"></p>
                    </el-form-item> -->
                    <el-form-item label="景点：">
                      <div v-for="item in day.scenic">
                        <p>{{item.name}}</p>
                        <p>{{item.content}}</p>
                        <p>{{item.hour}}</p>
                      </div>
                    </el-form-item>
                    <!-- <el-form-item label="景点名称：">
                      <p v-html="day.sceneName"></p>
                    </el-form-item>
                    <el-form-item label="景点介绍：">
                      <p v-html="day.sceneDec"></p>
                    </el-form-item>
                    <el-form-item label="游览时间：">
                      <p v-html="day.visitTime"></p>
                    </el-form-item> -->
                    <el-form-item label="行程：">
                      <p v-html="day.content"></p>
                    </el-form-item>

                  </li>
                </ul>
              </div>
            </el-col>
          </el-form>
        </el-row>
        <div class="actionArea">
          <el-button type="primary" @click.stop.prevent="nextPage('2')">下一页</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="出团日期" name="groupDate">
        <!-- <el-date-picker
          class="selectDate"
          v-model="selectDate"
          type="month"
          @change="dateChange"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker> -->
        <div class="dataWrap">
          <span class="prev btn" :class="{'disabled': prevDisabled}" @click="prevDate"><</span>
          <div class="listWrap" ref="listWrap">
            <ul class="list" ref="list">
              <li class="item" :class="{'active':curSelectIndex == index }" v-for="(item, index) in dateList" @click="selectDate(item, index)">{{item}}</li>
            </ul>
          </div>
          <span class="next btn" :class="{'disabled': nextDisabled}" @click="nextDate">></span>
        </div>
        <el-table
          class="dataTable"
          :data="dateForGroup"
          border>
          <el-table-column
            prop="month"
            :label="label"
            width="180">
          </el-table-column>
          <el-table-column
            prop="adultPrice"
            label="成人价"
            width="180">
          </el-table-column>
          <el-table-column
            prop="childPrice"
            label="儿童价">
          </el-table-column>
          <el-table-column
            prop="difference"
            label="单房差">
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存">
          </el-table-column>
          <el-table-column
            prop="proxyPrice"
            label="代理佣金">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  import {getProductInfo, getTripDec, getGroupDate, getDateInfo} from 'api';

  export default {
  	data() {
  		return {
        curSelectIndex: 0,
        prevDisabled: true,
        nextDisabled: false,
        good_id: '',
        dbId: '',
        time: '',
        activeName: 'goodDec',
        labelPosition: 'right',
        dateList: [],
        goodInfo: {
          supplier: '',
          type: '',
          name: '',
          routes: [],
          pics: [],
          startAddress: '',
          endAddress: '',
          tripDays: '',
          goTraffic: '',
          backTraffic: '',
          theme: '',
          cost: '',
          noCost: '',
          rules: [],
          notice: '',
          visaFrom: '',
          visaType: '',
          mainArea: '',
          toArea: ''
        },
        tripInfo: {
          name: '',
          downloadUrl: '',
          days: []
        },
        dateForGroup: [{
          month: '',
          adultPrice: '',
          childPrice: '',
          difference: '',
          stock: '',
          proxyPrice: '',
          priceRatio: ''
        }],
        label: '',
        // selectDate: new Date(),
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        itemPx: 108,
        itemPage: 0,
        itemSize: 0,
        maxLen: 5
      }
  	},
    created() {
      this.good_id = this.$route.params.id;
      console.log(this.good_id);
      this._getProductInfo(this.good_id);
    },
  	methods: {
      nextDate() {
        if (this.itemPage >= this.itemSize || this.itemPage >= this.itemSize - this.maxLen) {
          this.nextDisabled = true
          return
        }
        this.prevDisabled = false
        this.itemPage ++
        let curPx = this.itemPage * this.itemPx
        this.$refs.list.style.transform = `translate3d(-${curPx}px, 0, 0)`
      },
      prevDate() {
        if (this.itemPage <= 0) {
          this.prevDisabled = true
          return
        }
        this.nextDisabled = false
        this.itemPage --
        let curPx = this.itemPage * this.itemPx
        this.$refs.list.style.transform = `translate3d(-${curPx}px, 0, 0)`

        if (this.itemPage <= 0) {
          this.prevDisabled = true
        }
      },
      selectDate(item, index) {
        console.log(item)
        this.curSelectIndex = index
        let month = this._changeMonth(item)
        this.label = `${month}月`
        this._getPerMonthInfo(item, this.good_id)
      },
      handleClick(tab, event) {
        this.good_id = this.$route.params.id
        console.log('tadIndex:' + tab.index);
        this._contentChange(tab.index)
      },
      nextPage(index) {
        this._contentChange(index);
      },
      _contentChange(index) {
        console.log(index)
        switch(index) {
          case '0':
            this._getProductInfo(this.good_id);
            break;
          case '1':
            this._getTripDec(this.good_id);
            break;
          case '2':
            // this.time = this._dateFormate(this.selectDate);
            // let dateFormate = new Date(this.selectDate);
            // let month = dateFormate.getMonth() + 1;
            // this._getDateList(this.good_id);
            this._getGroupDate(this.good_id);

            break;
          default:
            break;
        }
      },
      _getProductInfo(goodId) {
        let params = qs.stringify({
          productId: goodId
        });
        getProductInfo(params).then((res) => {
          console.log(res);
          let data = res.info;
          if (res.state == '1') {
            if (res.message) {
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'error'
              })
            }
            this.goodInfo = {
              supplier: data.supName ? data.supName : '无',
              type: data.itemType,
              name: data.title,
              routes: [data.sellPtOne, data.sellPtTwo, data.sellPtThree, data.sellPtFour],
              pics: data.image,
              startAddress: data.departPlace,
              endAddress: data.toPlaceCountry,
              tripDays: data.travelDays,
              goTraffic: data.goTraffic,
              backTraffic: data.backTraffic,
              theme: data.productTheme,
              cost: data.feeInclude,
              noCost: data.feeNoInclude,
              rules: data.policy,
              notice: data.bookRule,
              visaFrom: '签证国家',
              visaType: data.signType,
              mainArea: data.district,
              toArea: data.sendSign
            }
            // console.log(data.imgUrl)
          }
          if (res.state == '-1') {
            if (res.message) {
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '提示',
                message: '亲，出错了，获取数据失败 ^_^',
                type: 'error'
              })
            }
          }

        })
      },
      _getTripDec(goodId) {
        let params = qs.stringify({
          productId: goodId
        });
        getProductInfo(params).then((res) => {
          console.log(res);
          if (res.state == '1') {
            let data = res.info;

            let days = [];
            if (data.schedule.length) {
              data.schedule.forEach((day) => {
                let dayObj = {
                  scheduleNo: day.scheduleNo,
                  traffic: day.traffic,
                  breakfast: this._dinner(day.breakfast),
                  lunch: this._dinner(day.lunch),
                  dinner: this._dinner(day.dinner),
                  hotel: day.hotel,
                  shopping: day.shopping,
                  scenic: day.scenic,
                  content: day.content
                }
                days.push(dayObj);
              })
            }

            this.tripInfo = {
              name: '行程信息',
              downloadUrl: '',
              days: days
            }
          }
        })
        .catch((res) => {
          if (res.response) {
            if (res.response.status == '911') {
              this.$notify({
                title: '提示',
                message: '操作超时，请重新登录',
                type: 'error'
              })
              this.$router.push('/login')
            }
          }
        })
      },
      _getGroupDate(goodId) {
        // 传输时间格式 yy-mm-dd
        let params = qs.stringify({
          productId: goodId
        });
        console.log(params);

        getProductInfo(params).then((res) => {
          console.log(res);
          if (res.state == '1') {
            let data = res.info;
            this.dateList = res.listCals

            let month = this._changeMonth(this.dateList[0])
            this.label = `${month}月`;
            this._getPerMonthInfo(this.dateList[0], goodId)

            this.itemSize = this.dateList.length
            let listWidth = this.itemSize * this.itemPx
            this.$refs.list.style.width = `${listWidth}px`
            console.log('size:' + this.itemSize)

            let listWrapWidth = 0
            if (this.itemSize >= 10) {
              this.maxLen = 5
              listWrapWidth = this.itemPx * this.maxLen + this.itemPx / 2
            } else if (this.itemSize <= 3) {
              listWrapWidth = this.itemPx * this.itemSize
            } else {
              this.maxLen = 3
              listWrapWidth = this.itemPx * this.maxLen + this.itemPx / 2
            }
            this.$refs.listWrap.style.width = `${listWrapWidth}px`
          }
        })
      },
      _changeMonth(date) {
        // 2018-01
        let arr = date.split('-')
        let str = Number(arr[1])
        return str
      },
      _changeDate(date) {
        // 2018-01-01
        let arr = date.split('-')
        arr.length = 2
        let str = arr.join('-')
        return str
      },
      _getPerMonthInfo(month, goodId) {
        let params = qs.stringify({
          productId: goodId,
          monthq: month
        })
        getDateInfo(params).then((res) => {
          console.log(res)
          if (res.state == '1') {
            this.dateForGroup = [];
            if (res.calendarVos && res.calendarVos.length) {
              res.calendarVos.forEach((item) => {
                const info = {
                  month: item.departDate,
                  adultPrice: this._getPrice(item.price, 1),
                  childPrice: this._getPrice(item.price, 2),
                  difference: this._getPrice(item.price, 3),
                  stock: item.stock,
                  proxyPrice: item.adultAgencyPrice
                }
                this.dateForGroup.push(info);
              })
              console.log(this.dateForGroup)
            }
          }
        })
      },
      _getPrice(price, type) {
        let ret = ''
        if (price.length) {
          price.forEach((item) => {
            if (item.priceType == type) {
              ret = item.salePrice
            }
            if (price.priceType == type) {
              ret = item.salePrice
            }
            if (price.priceType == type) {
              ret = item.salePrice
            }
          })
        }
        return ret
      },
      _dateFormate(date) {
        let dateFormate = new Date(date);
        let year = dateFormate.getFullYear();
        let month = dateFormate.getMonth() + 1;
        let day = dateFormate.getDate();
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        return `${year}-${month}-${day}`
      },
      _traffic(code) {
        switch(code) {
          case '1':
            return '飞机'
            break;
          case '2':
            return '火车'
            break;
          case '3':
            return '汽车'
            break;
          case '4':
            return '游船'
            break;
          case '9':
            return '其他'
            break;
        }
      },
      _dinner(code) {
        switch(code) {
          case 0:
            return '自理'
            break;
          case 1:
            return '已含'
            break;
        }
      }
  	},
    mounted() {
    }
  }
</script>

<style>
  .goodDetails{
    padding: 0 20px;
  }
  .goodDetails .el-tabs__nav-wrap::after{
    display: none;
  }
  .goodDetails .goodImg{
    height: 120px;
    margin: 0 10px 10px 0;
  }
  .goodDetails .el-form-item{
    font-size: 13px;
  }
  .goodDetails .ml{
    margin-left: 20px;
  }
  .goodDetails .el-form-item__content{
    width: 80% !important;
    
  }
  .goodDetails .downloadBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #d8dce5;
    color: #5a5e66;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    padding: 6px 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    margin-left: 10px;
  }
  .goodDetails .downloadBtn:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .goodDetails .dayLine{
    border-top: 1px solid #ccc;
    padding: 20px 0;
  }
  .goodDetails .dayTitle{
    font-size: 15px;
    margin: 0;
  }
  .goodDetails .selectDate{
    margin: 20px 0;
  }

  .goodDetails .dataWrap{
    overflow: hidden;
    margin: 20px 0;
    width: 100%;
  }
  .goodDetails .btn{
    display: inline-block;
    padding:0 6px;
    box-sizing:border-box;
    border:1px solid #ccc;
  }
  .goodDetails .listWrap{
    width: 300px;
    margin: 0 10px;
    overflow: hidden;
  }
  .goodDetails .list{
    overflow: auto;
    width: auto;
    transition: all .5s;
  }
  .goodDetails .btn, 
  .goodDetails .listWrap, 
  .goodDetails .item{
    height: 30px;
    line-height: 30px;
    float: left;
  }
  .goodDetails .item{
    width: 108px;
    font-size: 13px;
  }
  .goodDetails .prev, 
  .goodDetails .next, 
  .goodDetails .item {
    cursor: pointer;
    transition: all .36s;
  }
  .goodDetails .prev:hover, 
  .goodDetails .next:hover, 
  .goodDetails .item:hover{
    background: #008EE5;
    color: #fff;
    border-color: #008EE5;
  }
  .goodDetails .prev, 
  .goodDetails .next{
    background: #008EE5;
    color: #fff;
    border: 1px solid #008EE5;
    width: 30px;
    text-align: center;
  }
  .goodDetails .prev.disabled, 
  .goodDetails .next.disabled{
    color: #999999;
    background: #fff;
    border-color: #EAEAEA;
  }
  .goodDetails .item{
    float: left;
    padding: 0px 8px;
    text-align: center;
    border: 1px solid #ccc;
    border-right: 0;
  }
  .goodDetails .item.active{
    background: #008EE5;
    color: #fff;
  }
  .goodDetails .item:last-child{
    border-right: 1px solid #ccc;
  }
  .goodDetails .actionArea{
    text-align: center;
  }
  .goodDetails .dataTable{
    width: 100%;
    overflow: hidden;
  }
</style>