<template>
  <section class="editVisitorInfo">
    <div v-title data-title="出行人信息"></div>
    <!-- <p>出行人信息</p>
    <button @click="back">返回</button> -->
    
    <div class="toptit">
      <div class="top_t" @click="back">
           <img style="width:100%;height:100%" src="../../assets/images/u253.png" > 
      </div>
      <div class="top_o">
          出行人信息
      </div>
       <div class="sure" @click="save">
          保存
      </div> 
    </div>
    <span class="gte"></span>
    <div class="peoInfo">
        <div class="name item">
          <span class="nametit">姓名</span>
          <input class="namein" placeholder="必填" v-model="visitor.userName"></input>
        </div>
        <div class="pack item">
            <span class="packtit">性别</span>
            <div class="packin">
              <select class="form-select" v-model="visitor.sex" style="width:100%">
                <option v-for="sex in sexs" :value="sex.value">{{sex.text}}</option>
              </select>
            </div>
            <span class="packimg">
                <img src="../../assets/images/icon_into@2x.png"  style="width:100%;height:100%">
            </span>
        </div>
         <div class="phone item">
            <span class="phonetit">手机号</span>
            <input class="phonein" placeholder="必填" v-model="visitor.phone"></input>
        </div>   
        <div class="email item">
            <span class="emailtit">邮箱</span>
            <input class="emailin" placeholder="必填 如tty@tty.com" v-model="visitor.email"></input>
        </div> 
        <div class="pack item">
            <span class="packtit">证件类型</span>
            <div class="packin">
              <select class="form-select" v-model="visitor.IDid" style="width:100%">
                <option v-for="id in IDs" :value="id.value">{{id.text}}</option>
              </select>
            </div>
            <span class="packimg">
                <img src="../../assets/images/icon_into@2x.png"  style="width:100%;height:100%">
            </span>
        </div>
        <div class="packnum item">
          <span class="packnumtit">证件号码</span>  
          <input class="packnumin" placeholder="必填" v-model="visitor.IDnumber"></input>
        </div>  
        <div class="packnum item">
          <span class="packnumtit">证件有效期</span>
          <input class="packnumin" placeholder="必填 格式如1998-08-08" v-model="visitor.IDEndDate"></input>
        </div> 
        <!-- <div class="pack item" v-show="visitor.IDid == '2'"> 
           <span class="packtit" >证件签发地</span> 
           <div class="packin">{{visitor.packplace}}</div> 
           <input class="packin" placeholder="" v-model="visitor.packplace"></input> 
           <span class="packimg">
            <img src="../../assets/images/icon_into@2x.png"  style="width:100%;height:100%">
          </span>
        </div>  -->
          <div class="email item" v-show="visitor.IDid == '2'"> 
          <span class="emailtit">姓氏拼音</span>
          <input class="emailin" placeholder="如中文名为通通游,填写tong" v-model="visitor.milyName"></input>
        </div> 
        <div class="email item" v-show="visitor.IDid == '2'">
          <span class="emailtit">名字拼音</span>
          <input class="emailin" placeholder="如中文名为通通游,填写tongyou" v-model="visitor.name"></input>
        </div>
        <div class="packnum item" v-show="visitor.IDid == '2'">
          <span class="packnumtit">生日</span>
          <input class="packnumin" placeholder="必填 格式如2017-12-06" v-model="visitor.birthday"></input>
        </div> 
        <div class="packnum item" v-show="visitor.IDid == '2'">
          <span class="country packnumtit">国籍</span>
          <input class="country packnumin" placeholder="必填" v-model="visitor.country"></input>
        </div>
    </div>
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import tips from 'base/tips/tips'
  import {checkIdCard} from 'common/js/checkIdCard.js'
  import {savevisitor} from 'api'
  import qs from 'qs'
  import storage from 'good-storage'
  import { mapMutations, mapActions, mapGetters } from 'vuex'

  const editType = 2
  const addType = 1
  const childAge = 12 //儿童年龄<12
  const PERSON_INFO = '__personInfo__'   //全部信息
  // const EDIT_ALLINFO = '__editAllInfo__'   //全部信息
  const EDIT_KEYINFO = '__editKeyInfo__'   //操作信息

  export default {
    data() {
      return {
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        // 数据列表
        visitor: {
          orderDbid:'',
          userName: '',
          sex: 1 ,        //性别
          phone: '',
          email: '',
          IDid: '1',
          IDName: '',
          IDnumber: '',
          IDEndDate :'',  //证件有效期
          packplace: '',  //证件签发地
          milyName: '',  //英文姓 
          name: '',  //英文名 
          birthday: '',  //出生日期
          country: '',
          clientStatusName:'',  //客人状态名称
          clientStatus:'',      //客人状态
          clientTypeName:'',    //客人类型名称
          clientType:'',      //客人类型
          remark:'',  //备注
        },
        keyidID:'身份证', //证件类型名称
        sexs: [
          { text: '男', value: 1 },
          { text: '女', value: 2 }
        ],
        IDs: [
          {text: '身份证', value: 1},
          {text: '护照', value: 2},
        ],
        mainidtype:'',
        visitorinfo:[],   //订单传入信息
        detail:[],

        isShowPage: true,
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        type: '1',         // tip
        
        visitorinfo:[],   //订单要编辑的信息
        alldata:{},       //订单全部的信息
      }
    },
    created() {
        //取得订单信息
        // this.visitorinfo = tstorage.get(PERSON_INFO)

        //取得订单信息
        this.visitorinfo = storage.get(EDIT_KEYINFO)  //修改的
        this.alldata = storage.get(PERSON_INFO)      //全部

        //填写获取的预设订单信息
        this.visitor.orderDbid = this.visitorinfo.dbId, //用户id
        this.visitor.userName = this.visitorinfo.clientName //姓名
        this.visitor.milyName = this.visitorinfo.clientFamilyName  //证件姓 **** 姓名姓氏拼音
        this.visitor.name = this.visitorinfo.clientEnName  //证件名
        this.visitor.clientStatusName = this.visitorinfo.clientStatusName  //客人状态名称  1
        this.visitor.clientStatus  = this.visitorinfo.clientStatus   //客人状态  1
        this.visitor.clientTypeName = this.visitorinfo.clientTypeName //客人类型名称  1
        this.visitor.clientType = this.visitorinfo.clientType     //客人类型  1
        this.visitor.sex = this.visitorinfo.sex            //性别  男1 女2
        this.visitor.birthday = this.visitorinfo.birthDate.substring(0,10)       //出生日期
        this.visitor.IDid = this.visitorinfo.idType         //证件类型
        this.visitor.keyidID = this.visitorinfo.idTypeName     //证件类型名称
        this.visitor.IDnumber = this.visitorinfo.idNumber      //证件号码
        this.visitor.IDEndDate = this.visitorinfo.idIndate.substring(0,10)        //证件有效期
        this.visitor.remark = this.visitorinfo.remark;        //备注
        this.visitor.country = this.visitorinfo.country;   //国籍
        this.visitor.phone = this.visitorinfo.phone;   //手机号
        this.visitor.email = this.visitorinfo.email;   //邮箱

    },
    mounted() {
      console.log(this.visitorinfo)
    },
    computed: {
  　　sex() {
  　　　　return this.visitor.sex
  　　},
      IDid() {
  　　　　return this.visitor.IDid
  　　}
    },
    methods: {
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
      // 返回出行人信息
      back() {
        this.$router.push({
          path:  '/payreadyinfo',
          query: {
            // visitor: this.$route.query.all
            // visitor: this.$route.query.visit
          }
        })
      },
      _isValidDate(data){
        let reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig
        return reg.test(data)
      },


      // 保存编辑的信息
      save(){
        if (!this._isValidDate(this.visitor.IDEndDate)){
          this._showTips('有效期格式不正确')
          return
        }

        this.visitorinfo.dbId = this.visitor.orderDbid , //用户id
        this.visitorinfo.clientName =  this.visitor.userName //姓名
        this.visitorinfo.clientFamilyName = this.visitor.milyName //证件姓
        this.visitorinfo.clientEnName = this.visitor.name  //证件名
        this.visitorinfo.clientStatusName = this.visitor.clientStatusName  //客人状态名称  1
        this.visitorinfo.clientStatus = this.visitor.clientStatus   //客人状态  1
        this.visitorinfo.clientTypeName = this.visitor.clientTypeName //客人类型名称  1
        this.visitorinfo.clientType = this.visitor.clientType     //客人类型  1
        this.visitorinfo.sex = this.visitor.sex            //性别  男1 女2
        this.visitorinfo.birthDate = this.visitor.birthday.substring(0,10)      //出生日期
        this.visitorinfo.idType  = this.visitor.IDid        //证件类型
        this.visitorinfo.idTypeName = this.keyidID    //证件类型名称
        this.visitorinfo.idNumber = this.visitor.IDnumber      //证件号码
        this.visitorinfo.idIndate = this.visitor.IDEndDate.substring(0,10)   //证件有效期
        this.visitorinfo.remark = this.visitor.remark; //备注
        this.visitorinfo.country = this.visitor.country;   //国籍
        this.visitorinfo.phone = this.visitor.phone;   //手机号
        this.visitorinfo.email = this.visitor.email;   //邮箱
        
        // 编辑后信息
        // console.log('修改的信息是')
        // console.log(this.visitorinfo)
        // console.log('修改的信息是第几组')
        // console.log(this.$route.query.num)
        // console.log('全部信息是')
        // console.log(this.$route.query.all)
        // console.log(this.visitorinfo.idIndate)
        
        // var i
        // for(i= 0; i<this.$route.query.all.detail.length;i++){
        //     this.$route.query.all.detail[this.$route.query.num] = this.visitorinfo
        // }

        // var i
        // for(i= 0; i<this.visitorinfo.length;i++){
        //     this.visitorinfo[this.$route.query.num] = this.visitorinfo
        // }
        console.log('修改后的visitorinfo')
        console.log(this.visitorinfo)

        var i
        for(i= 0; i<this.alldata.detail.length;i++){
            this.alldata.detail[this.$route.query.num] = this.visitorinfo
        }

        console.log('修改后的信息全部')
        console.log(this.alldata)
        
        // 修改后的信息设置成本地缓存
        // storage.set(PERSON_INFO, this.$route.query.all)

        
        // 替换缓存全部订单信息为当前修改后的全部信息
        storage.set(PERSON_INFO,this.alldata)

        this.$router.push({
          path:  '/payreadyinfo',
          query: {
            
          }
        })

        // let params = JSON.stringify({
        //     orderNum : this.visitorinfo.orderNum,  //订单号
        //     userId : this.visitorinfo.userId,     //userid
        //     detail:[{
        //       orderDbid : this.visitor.orderDbid, //dbid
        //       clientName:this.visitor.userName,  //姓名 
        //       clientFamilyName:this.visitor.milyName,  //证件姓
        //       clientEnName :this.visitor.name,  //证件名
        //       clientStatusName : this.visitor.clientStatusName, //客人状态名称  1
        //       clientStatus : this.visitor.clientStatus, //客人状态  1
        //       clientTypeName : this.visitor.clientTypeName, //客人类型名称  1
        //       clientType : this.visitor.clientType, //客人类型  1
        //       sex : this.visitor.sex,  //性别  男1 女2
        //       birthDate : this.visitor.birthday,  //出生日期
        //       idType : this.visitor.IDid,   //证件类型
        //       idTypeName : this.visitor.keyidID, //证件类型名称
        //       idNumber : this.visitor.IDnumber,  //证件号码
        //       idIndate : this.visitor.IDEndDate, //证件有效期
        //       remark : this.visitor.remark,  //备注
        //     }]
        // })

        // let keydata = JSON.parse(params)
        // console.log(keydata)

        // savevisitor(keydata).then((res) => {
            // console.log(res)
            // if(res.code == '1'){
              // this.$router.push({
              //   path:  '/visitorlist',
              //   query: {
              //     visitor: keydata
              //   }
              // })
            // }
            // else{
            //   this._showTips('保存失败')
            // }
        // })
      }
    },
    watch:{
      IDid(newValue, oldValue) {
        if(newValue == '1'){
          this.keyidID = '身份证'
        }else if(newValue == '2'){
          this.keyidID = '护照'
        }
　 　 }
    },
    components: {
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './editpayreadyinfo.css';
</style>