<template>
  <section class="visitorInfo">
    <div class="toptit">
      <div class="top_t"  @click="back">
          <img style="width:100%;height:100%" src="../../assets/images/u253.png" >
      </div>
      <div class="top_o">
          补充资料
      </div>
       <!-- <div class="sure" @click="saveSelectedVisitor">
          确定
      </div>  -->
    </div>
    <span class="gte1"></span>
    <span class="gte"></span>
    <!-- <div class="" v-show="!visitorList.length"  style="font-size:.5rem;color:#ccc;text-align:center;padding: 1rem 0">请添加数据</div> -->

    <scroll class="wrapper" ref="peoInfo">
      <div class="eer">出行人信息</div>
      <span class="gte"></span>
      <div>
         <div class="peoInfo" v-for="(visitork,index) in visitor.detail" :key="visitork">
          <img class="editImg" src="../../assets/images/编辑1-@2x.png" @click.stop="goEditVisitorInfo(visitork,index)"> 
          <span class="peoName">{{visitork.clientName}}</span>
          <span class="peoClass">
            <span v-show="visitork.idType== '1'">身份证: </span>
            <span v-show="visitork.idType== '2'">护照: </span>
            <span class="IDnumber">{{visitork.idNumber}}</span>
          </span>
          <!-- <div class="yx_img" v-show="!visitor.isSelect">
            <img src="../../assets/images/同意-1@2x.png"  style="width:100%;height:100%">
          </div>
          <div class="red_img" v-show="visitor.isSelect">
            <img src="../../assets/images/同意·@2x.png"   style="width:100%;height:100%">
          </div> -->
        </div> 
      </div>
      <div class="maintxt">
        2~12岁不占床<br>
        大于2周岁不满12周岁的儿童不可使用出生证明，请使用身份证户口簿等,
        乘机请携带填写的相关证件。
      </div>
      <span class="gte1"></span>
      <div class="remark">
        备注：
        <textarea></textarea>
      </div>
    </scroll>
    <div class="btnfc">
      <div class="editBtn" @click="savevisitorInfo">保存</div>
    </div>
     
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import storage from 'good-storage'
  import Scroll from 'base/scroll/scroll'
  import tips from 'base/tips/tips'
  import {savevisitor} from 'api'
  import qs from 'qs'
  // import {visitorList} from 'common/js/mock.js'

  const CLIENT_TYPE = '__clientType__'
  const SELECT_INDEX = '__selectIndex__'
  const VISITOR_LIST = '__visitorList__'
  const SELECT_ADULT = '__selectAdult__'
  const SELECT_CHILDREN = '__selectChildren__'
  // const SELECT_STATUS = '__selectStatus__'

  const TRIP_INFO = '__tripInfo__'
  const EDIT_VISITOR_INFO = '__editVisitorInfo__'
  const ADD_VISITOR_INFO = '__addVisitorInfo__'
  const ACTION_TYPE = '__actioinType__'
  const PERSON_INFO = '__personInfo__'

  const READY_ALLINFO = 'readyallinfo'
  const READY_PROINFO = 'readyproinfo'

  const EDIT_ALLINFO = '__editAllInfo__'   //全部信息
  const EDIT_KEYINFO = '__editKeyInfo__'   //操作信息

  const ADULT = '1'
  const CHILDREN = '2'

  const editType = 2
  const addType = 1

  export default {
    data() {
      return {
        orderNum: '',
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        customerType: '', //客户类型
        IDtype: '', //证件类型
        selectVisitors: [],
        visitorList: [], //新用户没数据
        initVisitorList: [],
        isSelect: false,
        clientType: '',
        newAddVisitorInfo: {},
        tripInfo: {},
        // 订单内游客信息
        visitor:[],
      }
    },
    wacth:{
       visitor:function(val){
          console.log(val)
       },
    },
    created() {
      // 接收订单号
      this.orderNum = this.$route.query.orderNum

      // 接收全部订单缓存
      this.visitor = storage.get(PERSON_INFO)

    },
    mounted() {
        console.log(this.visitor)
    },
    methods: {
      back() {
        // 跳转特定页面
        // this.$router.go(-1)
        this.$router.push({
          path:  '/paystatus',
          query: { 
            orderNum: this.orderNum
          }
        })
      },
      // 跳转编辑页面
      goEditVisitorInfo(visitork,index) {
         // 设置订单信息进入缓存
        storage.set(PERSON_INFO,this.visitor)
        storage.set(EDIT_KEYINFO,visitork)

        this.$router.push({
          path: '/editpayreadyinfo',
          query: {
            num:index,
          }
        })
        console.log(visitork)
        console.log(index)
      },

      // 保存所有游客信息
      savevisitorInfo() {
        let visitorsObj = []
        this.visitor.detail.forEach((item) => {
          let obj = {
            orderDbid : this.visitor.dbId, //订单dbid
            dbId : item.dbId,  //出行人独有dbid
            clientName: item.clientName,  //姓名 
            clientFamilyName: item.clientFamilyName,  //证件姓
            clientEnName : item.clientEnName,  //证件名
            clientStatusName :  item.clientStatusName, //客人状态名称  1
            clientStatus : item.clientStatus, //客人状态  1
            clientTypeName :  item.clientTypeName, //客人类型名称  1
            clientType :  item.clientType, //客人类型  1
            sex :  item.sex,       //性别  男1 女2
            birthDate :  item.birthDate,  //出生日期
            idType :  item.idType,       //证件类型
            idTypeName :  item.idTypeName, //证件类型名称
            idNumber :  item.idNumber,  //证件号码
            idIndate :  item.idIndate, //证件有效期
            remark: item.remark,   //备注
            phone: item.phone,  //手机号
            email:item.email,   //邮箱
            country:item.country,   //国籍
          }
          visitorsObj.push(obj)
        })
        let params = {
            orderNum : this.visitor.orderNum,  //订单号
            userId : this.visitor.userId ,     //userid
            detail: visitorsObj
        }
        // 保存所有信息接口
        savevisitor(params).then((res) => {
            // console.log(res)
            if(res.code == '1'){
              // 替换成功 回到支付页面
              this.$router.push({
                path:  '/paystatus',
                query: {
                    orderNum: this.visitor.orderNum
                }
              })
            }else{
              this._showTips('保存出行人信息失败,请核查信息格式')
            }
        })
      },
      selectVisitor(visitorList, visitor) {
        console.log('你选择了：')
        console.log(visitor)

        // 点击出行人时，根据客户类型
        if (this.clientType == ADULT) {
          if(!this._checkSelectTypeAdult(visitor)) {
            console.log('只能选择成人')
            this._showTips('只能选择成人')

            return
          }
        }
        if (this.clientType == CHILDREN) {
          if(!this._checkSelectTypeChildren(visitor)) {
            console.log('只能选择儿童')
            this._showTips('只能选择儿童')
            return
          }
        }

        visitor.isSelect = !visitor.isSelect
        this.selectVisitors = []
        this.visitorList.forEach((item) => {
          if (item.isSelect) {
            this.selectVisitors.push(item)
          }
        })

        console.log('显示已选择的出行人列表：')
        console.log(this.selectVisitors)

        if (this.clientType == ADULT) {
          if (this.selectVisitors.length > this.adultNum) {
            console.log('成人人数选多了')
            this._showTips('成人人数选多了')
            return
          }
        }
        if (this.clientType == CHILDREN) {
          if (this.selectVisitors.length > this.childrenNum) {
            console.log('儿童人数选多了')
            this._showTips('儿童人数选多了')
            return
          }
        }

        // visitor.isSelect = !visitor.isSelect
        this.selectVisitors.forEach((item, index) => {
          if (!item.isSelect) {
            this.selectVisitors.splice(index, 1)
          }
        })
        
        let selectIndex = []
        this.visitorList.forEach((item, index) => {
          if(item.isSelect) {
            selectIndex.push(index)
          }
        })
        // console.log('当前选择出行人信息的索引')
        // console.log(selectIndex)
        storage.set(SELECT_INDEX, selectIndex)

        // console.log('最终显示的出行人列表：')
        // console.log(this.selectVisitors)
      },
      // 修改完毕 保存出行人信息
      saveSelectedVisitor() {
        // if (!this.selectVisitors.length) {
        //   console.log('请选择出行人')
        //   this._showTips('请选择出行人')
        //   return
        // }

        // let adultNum = 0
        // let childrenNum = 0
        // this.selectVisitors.forEach((visitor) => {
        //   if (visitor.clientType == ADULT) {
        //     adultNum ++
        //   }
        //   if (visitor.clientType == CHILDREN) {
        //     childrenNum ++
        //   }
        // });

        // console.log('成人、儿童数量对比：')
        // console.log('已选择个数：')
        // console.log(adultNum, childrenNum)
        // console.log('应选择个数')
        // console.log(this.adultNum, this.childrenNum)

        // if (adultNum !== Number(this.adultNum)) {
        //   console.log('请选择与订单对应的成人人数')
        //   this._showTips('请选择与订单对应的成人人数')
        //   return
        // }
        // if (childrenNum !== Number(this.childrenNum)) {
        //   console.log('请选择与订单对应的儿童人数')
        //   this._showTips('请选择与订单对应的儿童人数')
        //   return
        // }

        // if (this.clientType == '1') {
        //   storage.set(SELECT_ADULT, this.selectVisitors)
        // }
        // if (this.clientType == '2') {
        //   storage.set(SELECT_CHILDREN, this.selectVisitors)
        // }

        // this.$router.goBack()
      },
      _checkSelectTypeAdult(visitor) {
        let tog = null
        if (visitor.clientType == ADULT) {
          tog = true
        }
        if (visitor.clientType == CHILDREN) {
          tog = false
        }
        return tog
      },
      _checkSelectTypeChildren(visitor) {
        let tog = null
        if (visitor.clientType == CHILDREN) {
          tog = true
        }
        if (visitor.clientType == ADULT) {
          tog = false
        }
        return tog
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
      ...mapMutations({
        
      }),
      // 'setEditVisitor': 'SET_EDIT_VISITOR'
      // 'setSelectedVisitor': 'SET_SELECTED_VISITOR',

      ...mapActions([
         
      ])
      // 'saveEditVisitor'
      // 'saveSelectedVisitors',
    },
    components: {
      Scroll,
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './payreadyinfo.css';
  .visitorInfo{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .editBtn{
    position: fixed;
     bottom: .682667rem; 
    /* margin: 0 auto; */
     left: .64rem; 
    /* right: 0; */
    width:14.72rem;
    height: 1.92rem;
    text-align: center;
    background-color: #008EE5;
    color: #fff;
    font-size: .8rem;
    padding: .5rem;
    border-radius: 3px;
  }
  .btnfc{
    position: fixed;
      bottom: 0;  
    /* margin: 0 auto; */
     /* left: 100%; */
      background-color: #fff;
    width: 16rem;
    height: 4rem;
    z-index: 999999;
  }
</style>