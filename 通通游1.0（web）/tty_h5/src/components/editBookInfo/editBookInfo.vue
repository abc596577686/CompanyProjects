<template>
    <section class="editBookInfo">
      <div v-title data-title="填写预订信息"></div>
      <!-- <p>填写预订信息</p>
      <button @click="back">返回</button>
      <button @click="goPayOrder">下一步进入支付订单</button> -->
      
  
      <div class="toptit">
          <div class="top_t" @click="back">
              <img style="width:100%;height:100%" src="../../assets/images/u253.png" >
          </div>
          <div class="top_o">
            填写产品信息
          </div>
      </div>
      <scroll class="wrapper" ref="editBookInfo">
        <div>
          <span class="gte1"></span>
          <!--产品信息  -->
          <promain :productInfo="productInfo" :tripInfo="tripInfo"></promain>
          <!-- 产品经理说单房差先不加 -->
          <!-- <span class="gte2"></span> -->
          <!-- <div class="homeChange">
            <span class="title" @click="showHomeChangeInfo">单房差
              <img src="../../assets/images/备注@2x.png" > 
            </span>
            <div class="takeCount">
              <span class="reduce handle" :class="{disabled: isDisabled}" @click="reduce(1)">-</span>
              <input type="number" :value="homeChangeVal" @input="inputChangeAdult">
              <span class="add handle" @click="add(1)">+</span>
            </div>
          </div> -->
          <span class="gte2"></span>
          <!-- <contacts :contactsInfo="contactsInfo"></contacts> -->
          <div class="contacts">
            <div class="cont">订单联系人信息 (必填)</div>
            <div class="name">姓名</div>
            <div class="namet"><input type="text" v-model="contactsInfo.name"></div>  
            <div class="phone">手机号</div>
            <div class="phonet"><input type="number" v-model="contactsInfo.phone"></div>
            <div class="email">邮箱</div>
            <div class="emailt"><input type="text" v-model="contactsInfo.email"></div>
          </div>
          <span class="gte2"></span>
          <div class="trvinfo">
            <div class="trvtop">
              <span class="trvt_1">出行人信息</span>
              <span class="trvt_2" v-show="!isReserveEdit" @click="reserveEdit">
                <img src="../../assets/images/dshdx.png" >预定后填写
              </span>
              <span class="trvt_2" v-show="isReserveEdit" @click="reserveEdit">
                <img src="../../assets/images/awqewq.png" >预定后填写
              </span>
            </div>
            <!-- 出行人信息 -->
            <div class="sfz init" v-for="visitor in visitorList.adult" v-show="visitor.type == '1' && !isReserveEdit"
                @click="goVisitorInfo('1')"
              >
              <span class="sfz_img">
                <img src="../../assets/images/编辑1-@2x.png">
              </span>
              <span class="sfz_t1">成人</span>
              <span class="tips">请编辑成人信息</span>
            </div>
            <div class="sfz c1" v-for="(visitor, index) in visitorList.adult"
                v-show="visitorList.adult.length && visitor.clientType == '1' && !isReserveEdit" 
                @click="goVisitorInfo('1')"
              >
              <span class="sfz_img">
                  <img src="../../assets/images/编辑1-@2x.png">
              </span>
              <span class="sfz_t1" v-html="`成人${index + 1}`"></span>
              <span class="sfz_t2" v-html="visitor.userName"></span>
              <span class="sfz_t3">
                <span v-html="`${visitor.IDtype}:`"></span>
                <span class="IDnumber" v-html="visitor.IDnumber"></span>
              </span>
            </div>
            <div class="sfz init" v-for="visitor in visitorList.children" v-show="visitor.type == '2' && !isReserveEdit"
                @click="goVisitorInfo('2')"
              >
              <span class="sfz_img">
                <img src="../../assets/images/编辑1-@2x.png">
              </span>
              <span class="sfz_t1">儿童</span>
              <span class="tips">请编辑儿童信息</span>
            </div>
            <div class="sfz c2" v-for="(visitor, index) in visitorList.children"
                v-show="visitorList.children.length && visitor.clientType == '2' && !isReserveEdit">
              <span class="sfz_img" @click="goVisitorInfo('2')">
                <img src="../../assets/images/编辑1-@2x.png">
              </span>
              <span class="sfz_t1" v-html="`儿童${index + 1}`"></span>
              <span class="sfz_t2" v-html="visitor.userName"></span>
              <span class="sfz_t3">
                <span v-html="`${visitor.IDtype}:`"></span>
                <span class="IDnumber" v-html="visitor.IDnumber"></span>
              </span>
            </div>
            <div class="tipmain">
              <p>2-12岁不占床</p>
              <p>大于2周岁不满12周岁的儿童不可使用出生证明,请使用身份证</p>
              <p>户口簿等,乘机请携带填写的相关证件</p>
            </div> 
          </div>
          <span class="gte2"></span>
          <div class="remark">
            <span>备注</span>
            <textarea v-model="remark" @blur="textareaBlur"></textarea>
          </div>
          <span class="gte1"></span>
          <div class="tipo">预定完成后可补充出行人信息及可开具发票。</div>
          <span class="gte1"></span>
        </div>
      </scroll>
      <div class="pay boxShow">
        <span class="payall">总计</span>
        <span class="paym" v-html="`¥${orderCountPrice}`"></span>
        <span class="wenh">
          <img src="../../assets/images/备注@2x.png"  style="width:100%;height:100%;display:block;"> 
        </span>
        <span class="monmx" @click="showCostExplain">费用明细</span>
        <button class="payBtn" :class="{'disabled': isSubmitDisabled}" @click="submitOrder" v-html="submitOrderText"></button>
      </div>
      <tips :text="tipsText" :isShowTips="isShowTips"></tips>
      
      <transition name="fade">
        <div class="mask" v-show="isShowMock"></div>
      </transition>
      <transition name="slide">
        <home-change-info v-show="isShowHomeChangeInfo" @cancel="cancel"></home-change-info>
      </transition>
      <transition name="slide">
        <cost-explain :priceInfo="priceInfo" v-show="isShowCostExplain" @cancel="cancel"></cost-explain>
      </transition>
    </section>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import promain from 'base/promain/promain'
  import HomeChangeInfo from 'base/homeChangeInfo/homeChangeInfo'
  import CostExplain from 'base/costExplain/costExplain'
  import tips from 'base/tips/tips'
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import storage from 'good-storage'
  import {productOrder} from 'api'
  import qs from 'qs'

  const CLIENT_TYPE = '__clientType__'
  const SELECT_ADULT = '__selectAdult__'
  const SELECT_CHILDREN = '__selectChildren__'
  const CONTACT_INFO = '__contactInfo__'
  const ORDER_INFO = '__orderInfo__'
  const RESERVER = '__reserver__'
  const TRIP_INFO = '__tripInfo__'
  const PRODUCT_INFO = '__productInfo__'
  const ACTION_TYPE = '__actioinType__'
  const HOME_CHANGEVAL = '__homeChangeVal__'
  const ORDER_COUNT_PRICE = '__orderCountPrice__'
  const PRICE_INFO = '__priceInfo__'
  const SALE_ID = '__saleId__'
  const PRODUCT_ID = '__productId__'
  const ADULT = '1'
  const CHIlDREN = '2'
  const ERR_OK = '1'

  export default {
    // computed: {
    //   ...mapGetters([
    //     'productInfo',
    //     'tripInfo'
    //   ])
    // },
    data() {
      return {
        saleId: null,
        isShowMock: false,
        isShowHomeChangeInfo: false,
        isShowCostExplain: false,
        isDisabled: false,
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        homeChangeVal: 0,
        contactsInfo: {
          name: '',
          phone: '',
          email: ''
        },
        isSelect: false,
        remark:'',
        isReserveEdit: false, //是否预订后填写
        visitorList: {
          adult: [],
          children: []
        },
        adults: [],
        childrens: [],
        selectStatus: null,
        curClientType: '',
        adultArr: [],
        childrenArr: [],
        orderCountPrice: 0,
        priceInfo: {},
        submitOrderText: '确认订单',
        isSubmitOrder: true,
        isSubmitDisabled: false
      }
    },
    beforeRouteEnter (to, from, next) {
        if(from.path.indexOf("payStatus")>=0){
          next({
            path: '/productDetails',
            query: {
              saleId: storage.get(SALE_ID),
              productId: storage.get(PRODUCT_ID)
            }
          })
        }else{
          next()
        }
    },
    created() {
      this.saleId = storage.get(SALE_ID)
      this.productId = storage.get(PRODUCT_ID)
      if (storage.get(TRIP_INFO)) {
        this.tripInfo = storage.get(TRIP_INFO)
      }
      console.log('当前旅行信息：')
      console.log(this.tripInfo)
      if (storage.get(PRODUCT_INFO)) {
        this.productInfo = storage.get(PRODUCT_INFO)
      }
      console.log('当前产品信息：')
      console.log(this.productInfo)
      // 单房差数量
      if (storage.get(HOME_CHANGEVAL)) {
        this.homeChangeVal = storage.get(HOME_CHANGEVAL)
      }
      console.log('单房差数量:' + this.homeChangeVal)
      // 订单总价格
      if(storage.get(ORDER_COUNT_PRICE)) {
        this.orderCountPrice = storage.get(ORDER_COUNT_PRICE)
      } else {
        this.orderCountPrice = this.tripInfo.countPrice
      }
      console.log('订单总价格:' + this.orderCountPrice)
      this._countPrice()
      console.log('当前联系人信息')
      let contactInfo = storage.get(CONTACT_INFO)
      if (contactInfo) {
        this.contactsInfo = contactInfo
      }
      console.log('是否预订后填写')
      this.isReserveEdit = storage.get(RESERVER, false)
      console.log(this.isReserveEdit)
      console.log('渲染的出行人类型：')
      console.log(storage.get(CLIENT_TYPE))
      this.curClientType = storage.get(CLIENT_TYPE)
      console.log('已选择的出行人列表：')
      console.log('成人：')
      console.log(storage.get(SELECT_ADULT, []))
      console.log('儿童：')
      console.log(storage.get(SELECT_CHILDREN, []))
      // 获取出行人数量 渲染待编辑
      let adultLen = this.tripInfo.persons.adult
      let childrenLen = this.tripInfo.persons.children
      let adultObj = {
        type: 1
      }
      let childrenObj = {
        type: 2
      }
      for(var i=0; i < adultLen; i++) {
        this.visitorList.adult.push(adultObj)
      }
      for(var i=0; i < childrenLen; i++) {
        this.visitorList.children.push(childrenObj)
      }
      console.log(this.visitorList)
      this.adultArr = storage.get(SELECT_ADULT, [])
      this.childrenArr = storage.get(SELECT_CHILDREN, [])
      if (this.adultArr.length && !this.childrenArr.length) {
        this.visitorList.adult = this.adultArr
      }
      if (!this.adultArr.length && this.childrenArr.length) {
        this.visitorList.children = this.childrenArr
      }
      if (this.adultArr.length && this.childrenArr.length) {
        this.visitorList.adult = this.adultArr
        this.visitorList.children = this.childrenArr
      }
      console.log('选择的出行人列表：')
      console.log(this.visitorList)
      this._getPriceInfo()
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      textareaBlur() {
        this.$refs.editBookInfo.refresh()
      },
      checkForm() {
        let tag = false
        this.visitorList.adult.forEach((visitor) => {
          if (visitor.type) {
            tag = false
            // console.log('请填写出行人(成人)信息')
            return
          }else {
            tag = true
          }
        })
        this.visitorList.children.forEach((visitor) => {
          if (visitor.type) {
            tag = false
            // console.log('请填写出行人(儿童)信息')
            return
          }else {
            tag = true
          }
        })
        return tag
      },
      submitOrder() {
        if (!this.isSubmitOrder || this.isSubmitDisabled) return

        console.log('旅行信息：')
        console.log(this.tripInfo)
        console.log('备注信息：')
        console.log(this.remark)
        // 单房差状态
        storage.set(HOME_CHANGEVAL, this.homeChangeVal)
        if (this.contactsInfo.name == '') {
          // console.log('请填写联系人姓名')
          this._showTips('请填写联系人姓名')
          return
        }
        if (this._textLength(this.contactsInfo.name) < 2) {
          this._showTips('姓名最小长度为2位')
          return false
        }
        if (this.contactsInfo.phone == '') {
          this._showTips('请填写联系人手机号')
          return
        }
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.contactsInfo.phone)) {
          this._showTips('请填写正确的手机号码')
          return false
        }
        if (this.contactsInfo.email == '') {
          this._showTips('请填写联系人邮箱')
          return
        }
        // if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.contactsInfo.email)) {
        //   console.log('邮箱格式不正确')
        //   this._showTips('邮箱格式不正确')
        //   return false
        // }
        if (!this.isReserveEdit) {
          if (!this.checkForm()) {
            this._showTips('请完善出行人信息')
            console.log('不能跳转')
            return
          }
        }
        console.log('可以跳转')
        
        //设置提交按钮文案，并使其不可点击
        this.submitOrderText = '订单提交中……'
        this.isSubmitOrder = false

        let ret = []
        let adultLen = this.tripInfo.persons.adult
        let childrenLen = this.tripInfo.persons.children
        let homeChangePrice = this.tripInfo.homeChangePrice
        let countLen = Number(adultLen) + Number(childrenLen)
        // 遍历设置出行人信息
        // 成人
        for (var i = 0; i < adultLen; i++ ){
          let obj = {}
          if (this.isReserveEdit) {
            obj = {
              productCalPriceType: 1 + '',
              num: 1,
              salePrice: this.tripInfo.persons.adultPrice,
              clientTypeName: '成人',
              clientType: 1
            }
          } else {
            obj = {
              productCalPriceType: 1 + '',
              num: 1,
              salePrice: this.tripInfo.persons.adultPrice,
              clientName: this.adultArr[i].userName,
              clientTypeName: '成人',
              clientType: 1,
              clientFamilyName: this.adultArr[i].milyName,
              clientEnName: this.adultArr[i].name,
              clientStatusName: '',
              clientStatus: null,
              sex: this.adultArr[i].sex,
              birthDate: this.adultArr[i].birthday,
              idType: this.adultArr[i].IDid,
              idTypeName: this.adultArr[i].IDtype,
              idNumber: this.adultArr[i].IDnumber,
              idIndate: this.adultArr[i].IDEndDate,
              phone: this.adultArr[i].phone,
              email: this.adultArr[i].email,
              country: this.adultArr[i].country
            }
          }
          ret.push(obj)
        }
        // 儿童
        for (var i = 0; i < childrenLen; i++ ){
          let obj = {}
          if (this.isReserveEdit) {
            obj = {
              productCalPriceType: 2 + '',
              num: 1,
              salePrice: this.tripInfo.persons.childrenPrice,
              clientTypeName: '儿童',
              clientType: 2
            }
          } else {
            obj = {
              productCalPriceType: 2 + '',
              num: 1,
              salePrice: this.tripInfo.persons.childrenPrice,
              clientName: this.childrenArr[i].userName,
              clientTypeName: '儿童',
              clientType: 2,
              clientFamilyName: this.childrenArr[i].milyName,
              clientEnName: this.childrenArr[i].name,
              clientStatusName: '',
              clientStatus: null,
              sex: this.childrenArr[i].sex,
              birthDate: this.childrenArr[i].birthday,
              idType: this.childrenArr[i].IDid,
              idTypeName: this.childrenArr[i].IDtype,
              idNumber: this.childrenArr[i].IDnumber,
              idIndate: this.childrenArr[i].IDEndDate,
              phone: this.childrenArr[i].phone,
              email: this.childrenArr[i].email,
              country: this.childrenArr[i].country
            }
          }
          ret.push(obj)
        }

        // 产品经理说: 先不加单房差
        // 如果选择单房差
        // if (this.homeChangeVal > 0) {
        //   let obj = {
        //     productCalPriceType: 3,
        //     num: this.homeChangeVal,
        //     salePrice: (homeChangePrice * 100 * Number(this.homeChangeVal)) / 100
        //   }
        //   ret.push(obj)
        // }
        console.log('生成的出行人信息：')
        console.log(ret)
        let orderCreateRequest = {
          // 这3个字段由后台获取
          userId: '',
          userName: '',
          createUser: this.contactsInfo.name,
          clientFamilyName: this.contactsInfo.name,
          clientEnName: this.contactsInfo.name,
          phone: this.contactsInfo.phone,
          email: this.contactsInfo.email,
          distName: '',
          distOrderNum: '',
          distMemberId: this.saleId + '',  //saleid
          distMemberName: '',
          productDbid: this.productId,
          productTitle: this.productInfo.title,
          calDbid: this.productInfo.calDbid,
          calDate: this.productInfo.calDate,
          num: countLen + '',
          totalFee: this.orderCountPrice + '',
          customerMemo: this.remark,
          customerName: this.contactsInfo.name,
          customerPhone: this.contactsInfo.phone,
          customerEmail: this.contactsInfo.email,
          supSettlementPrice: '',
          distSettlementPrice: '',
          cabins: ret,
          // remark:
        }

        productOrder(orderCreateRequest).then((res) => {
            console.log(res)

            if (res.code == ERR_OK) {
              console.log('成功')
              let orderInfo = res.order
              storage.set(ORDER_INFO, orderInfo)
              this.$router.push('/payOrder')
            }
            if (res.code != ERR_OK) {
              console.log('失败')
              console.log(res.msg)
              this._showTips(res.msg)

              this.submitOrderText = '已售罄'
              this.isSubmitOrder = true
              this.isSubmitDisabled = true
            }

          })

      },
      // 单房差减少
      reduce(type) {
        this.homeChangeVal -= 1
        console.log('当前单房差数量：')
        console.log(this.homeChangeVal)
        if (this.homeChangeVal < 0) {
          this.homeChangeVal = 0
          this.isDisabled = true
        }
        this.orderCountPrice = this._countPrice().toFixed(2)
        storage.set(HOME_CHANGEVAL, this.homeChangeVal)
        storage.set(ORDER_COUNT_PRICE, this.orderCountPrice)
        console.log('订单总价格（包含单房差）:')
        console.log(this.orderCountPrice)
        this._getPriceInfo()
      },
      // 单房差增加
      add(type) {
        this.homeChangeVal += 1
        console.log('当前单房差数量：')
        console.log(this.homeChangeVal)
        this.isDisabled = false
        this.orderCountPrice = this._countPrice().toFixed(2)
        storage.set(HOME_CHANGEVAL, this.homeChangeVal)
        storage.set(ORDER_COUNT_PRICE, this.orderCountPrice)
        console.log('订单总价格（包含单房差）:')
        console.log(this.orderCountPrice)
        this._getPriceInfo()
      },
      _countPrice() {
        let homeChangeVal = Number(this.homeChangeVal)
        let homeChangePrice = Number(Number(this.tripInfo.homeChangePrice).toFixed(2))
        let countPrice = Number(Number(this.tripInfo.countPrice).toFixed(2))
        if (homeChangeVal == '0') {
          return countPrice
        } else {
          return homeChangeVal * homeChangePrice + countPrice
        }
        
      },
      inputChangeAdult() {
        if (Number(this.homeChangeVal) < 0) {
          this.homeChangeVal = 0
        }
      },
      goVisitorInfo(type) {
        console.log('即将编辑的用户类型：' + type)
        storage.set(CLIENT_TYPE, type)
        console.log('设置操作类型: 0:正常类型')
        storage.set(ACTION_TYPE, 0)
        console.log('保存当前联系人信息:')
        storage.set(CONTACT_INFO, this.contactsInfo)
        this.$router.push('/visitorList')
      },
      reserveEdit() {
        this.isReserveEdit = !this.isReserveEdit
        // console.log(this.isReserveEdit)
        storage.set(RESERVER, this.isReserveEdit)
      },
      showHomeChangeInfo() {
        this.isShowHomeChangeInfo = !this.isShowHomeChangeInfo
        this.isShowMock = !this.isShowMock
      },
      cancel() {
        console.log('cancel')
        this.isShowMock = !this.isShowMock
        this.isShowHomeChangeInfo = false
        this.isShowCostExplain = false
      },
      showCostExplain() {
        this.isShowCostExplain = !this.isShowCostExplain
        this.isShowMock = !this.isShowMock
      },
      _getPriceInfo() {
        this.priceInfo = {
          adult: this.tripInfo.persons.adult,
          children: this.tripInfo.persons.children,
          adultPrice: this.tripInfo.persons.adultPrice,
          childrenPrice: this.tripInfo.persons.childrenPrice,
          homeChangePrice: '0',
          homeChangeNum: '0',
          countPrice: this.orderCountPrice
        }
        storage.set(PRICE_INFO, this.priceInfo)
      },
      _textLength(str) {
        var realLength = 0, len = str.length, charCode = -1
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i)
          if (charCode >= 0 && charCode <= 128) 
            realLength += 1
          else
            realLength += 2
        }
        return realLength
      },
      _showTips(text) {
        if (this.timer) return
        this.isShowTips = true
        this.tipsText = text
        this.timer = setTimeout(() => {
          this.isShowTips = false
          this.timer = undefined
          clearTimeout(this.timer)
        }, 1600)
      },
      _contrast(tripInfo, visitors) {
        if (Number(tripInfo.persons.adult) + Number(tripInfo.persons.children) == visitors.length) {
          return true
        } else {
          return false
        }
      },
      ...mapMutations({
        
      }),
      // setServerStatus: 'SET_SERVER_STATUS'
      ...mapActions([
        
      ])
      // 'saveServerStatus'
    },
    activated() {
      // this.visitorList = this.selectedVisitors
      console.log('activated')
    },
    components: {
      Scroll,
      promain,
      tips,
      HomeChangeInfo,
      CostExplain
    }
  }
</script>
<style scoped lang="css" rel="stylesheet/css">
  @import './editBookInfo.css';
  .mask{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,.2);
    top: 0;
    z-index: 200;
  }
  .mask {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .mask.fade-enter, .mask.fade-leave-active{
    opacity: 0;
  }
  .explain {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .explain.slide-enter, .explain.slide-leave-active{
    transform: translate3d(0, -100%, 0);
  }
  .explain.slide-leave-active, .explain.slide-enter{
    transform: translate3d(0, 100%, 0);
  }
</style>