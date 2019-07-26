<template>
  <section class="visitorInfo">
    <!-- <div v-title data-title="游客信息"></div> -->
    <!-- <p>我是游客信息</p> -->
    <!-- <button @click="back">返回</button> -->

    <div class="toptit">
      <div class="top_t"  @click="back">
        <img style="width:100%;height:100%" src="../../assets/images/u253.png" >
      </div>
      <div class="top_o">游客信息</div>
      <div class="sure" v-show="visitorList.length" @click="saveSelectedVisitor">确定</div> 
    </div>
    <span class="gte"></span>
    <div class="" v-show="!visitorList.length"  style="font-size:.5rem;color:#ccc;text-align:center;padding: 1rem 0">请添加数据</div>
    <scroll class="wrapper" ref="peoInfo">
      <div>
        <div class="peoInfo" v-for="visitor in visitorList" v-show="visitorList.length" @click.stop="selectVisitor(visitorList, visitor)">   
          <img class="editImg" src="../../assets/images/编辑1-@2x.png" @click.stop="goEditVisitorInfo(visitor)">
          <span class="peoName">{{visitor.userName}}</span>
          <span class="peoClass">
            <span>{{visitor.IDtype}}:</span>
            <span class="IDnumber">{{visitor.IDnumber}}</span>
          </span>

          <div class="yx_img" v-show="!visitor.isSelect">
            <img src="../../assets/images/同意-1@2x.png"  style="width:100%;height:100%">
          </div>
          <div class="red_img" v-show="visitor.isSelect">
            <img src="../../assets/images/同意·@2x.png"   style="width:100%;height:100%">
          </div>
        </div>
      </div>
    </scroll>
    <div class="addBtn" @click="addVisitorInfo">添加游客信息</div>
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import storage from 'good-storage'
  import Scroll from 'base/scroll/scroll'
  import tips from 'base/tips/tips'
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

  const ADULT = '1'
  const CHILDREN = '2'

  const editType = 2
  const addType = 1

  export default {
    // computed: {
    //   ...mapGetters([
    //     'tripInfo'
    //   ])
    // },
    data() {
      return {
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
        tripInfo: {}
      }
    },
    created() {
      console.log('当前旅客信息：' + storage.get(TRIP_INFO))
      this.tripInfo = storage.get(TRIP_INFO)

      console.log('当前操作类型：' + storage.get(ACTION_TYPE))
      let curActiveType = storage.get(ACTION_TYPE, '')

      console.log('出行者列表: ')
      this.visitorList = storage.get(VISITOR_LIST, [])
      console.log(this.visitorList)

      console.log('新添加的出行人信息')
      console.log(storage.get(ADD_VISITOR_INFO))
      if (storage.get(ADD_VISITOR_INFO)) {
        this.newAddVisitorInfo = storage.get(ADD_VISITOR_INFO)
      } else {
        this.newAddVisitorInfo = {}
      }

      console.log('当前编辑的出行者信息')
      let editVisitorInfo = storage.get(EDIT_VISITOR_INFO, {})
      console.log(editVisitorInfo)

      console.log('当前选择的客户类型: ')
      this.clientType = storage.get(CLIENT_TYPE)
      console.log(this.clientType)

      // 添加带过来 
      if (curActiveType == '1') {
        this.visitorList.push(this.newAddVisitorInfo)
        console.log('添加新增后的出行人列表')
        console.log(this.visitorList)

        // 清楚刚刚新加的出行人信息
        storage.remove(ADD_VISITOR_INFO)
        // 重置操作类型
        storage.set(ACTION_TYPE, '0')
      }

      let changeIndex = ''
      if (this.visitorList.length) {
        // 新编辑的出行人替换掉对应的出行人
        this.visitorList.forEach((item, index) => {
          if (editVisitorInfo.id == item.id) {
            changeIndex = index
            this.visitorList.splice(changeIndex, 1, editVisitorInfo)
            return
          }
        })

        // 根据索引显示已选择的出行人
        let selectIndex = storage.get(SELECT_INDEX, [])
        if (selectIndex.length) {
          this.visitorList.forEach((item) => {
            item.isSelect = false
          })
          selectIndex.forEach((item) => {
            this.visitorList[item].isSelect = true
          })
        }

        // 再根据客户类型重新显示已选的的出行人
        if (this.clientType == ADULT) {
          this.visitorList.forEach((item) => {
            if(item.clientType == CHILDREN && item.isSelect) {
              item.isSelect = false
            }
          })
        }
        if (this.clientType == CHILDREN) {
          this.visitorList.forEach((item) => {
            if(item.clientType == ADULT && item.isSelect) {
              item.isSelect = false
            }
          })
        }

        // 最后，根据已选的，获取已选的出行人列表
        this.visitorList.forEach((item) => {
          if (item.isSelect) {
            this.selectVisitors.push(item)
          }
        })

      }
      
      console.log('当前列表出行人: ')
      console.log(this.visitorList)
      storage.set(VISITOR_LIST, this.visitorList)

      console.log('初始化显示已选的出行人: ')
      console.log(this.selectVisitors)

      if (this.clientType == ADULT) {
        this.adultNum = this.tripInfo.persons.adult
        this.childrenNum = 0
        this.customerType = '成人'
      }
      if (this.clientType == CHILDREN) {
        this.adultNum = 0
        this.childrenNum = this.tripInfo.persons.children
        this.customerType = '儿童'
      }

    },
    methods: {
      back() {
        this.$router.goBack()
      },
      goEditVisitorInfo(visitor) {
        storage.set(EDIT_VISITOR_INFO, visitor)
        // this.setEditVisitor(visitor)
        // this.saveEditVisitor(visitor)
        this.$router.push({
          path: `/editVisitorInfo/${editType}`
        })
      },
      addVisitorInfo() {
        this.$router.push({
          path: `/editVisitorInfo/${addType}`
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
        console.log('当前选择出行人信息的索引')
        console.log(selectIndex)
        storage.set(SELECT_INDEX, selectIndex)

        console.log('最终显示的出行人列表：')
        console.log(this.selectVisitors)
      },
      saveSelectedVisitor() {
        if (!this.selectVisitors.length) {
          console.log('请选择出行人')
          this._showTips('请选择出行人')
          return
        }

        let adultNum = 0
        let childrenNum = 0
        this.selectVisitors.forEach((visitor) => {
          if (visitor.clientType == ADULT) {
            adultNum ++
          }
          if (visitor.clientType == CHILDREN) {
            childrenNum ++
          }
        });

        console.log('成人、儿童数量对比：')
        console.log('已选择个数：')
        console.log(adultNum, childrenNum)
        console.log('应选择个数')
        console.log(this.adultNum, this.childrenNum)

        if (adultNum !== Number(this.adultNum)) {
          console.log('请选择与订单对应的成人人数')
          this._showTips('请选择与订单对应的成人人数')
          return
        }
        if (childrenNum !== Number(this.childrenNum)) {
          console.log('请选择与订单对应的儿童人数')
          this._showTips('请选择与订单对应的儿童人数')
          return
        }

        if (this.clientType == '1') {
          storage.set(SELECT_ADULT, this.selectVisitors)
        }
        if (this.clientType == '2') {
          storage.set(SELECT_CHILDREN, this.selectVisitors)
        }

        this.$router.goBack()
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
  @import './visitorList.css';
  .visitorInfo{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .wrapper{
    position: absolute;
    bottom: 0;
    top: 1.989333rem;
    overflow: hidden;
    width: 100%;
    margin-bottom: 5rem;
  }
  .addBtn{
    position: absolute;
    bottom: 2rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    width:60%;
    text-align: center;
    background-color: #008EE5;
    color: #fff;
    font-size: .8rem;
    padding: .5rem;
    border-radius: 3px;
  }
</style>