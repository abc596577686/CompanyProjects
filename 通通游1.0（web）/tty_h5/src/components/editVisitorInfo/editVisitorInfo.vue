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
                <img src="../../assets/images/icon_into@2x.png" style="width:100%;height:100%">
            </span>
        </div>
        <div class="phone item">
            <span class="phonetit">手机号</span>
            <input class="phonein" placeholder="必填" v-model="visitor.phone"></input>
        </div>   
        <div class="email item">
            <span class="emailtit">邮箱</span>
            <input class="emailin" placeholder="必填" v-model="visitor.email"></input>
        </div> 
        <div class="pack item">
            <span class="packtit">证件类型</span>
            <div class="packin">
              <select class="form-select" v-model="visitor.IDid" style="width:100%" @change="selectEnv">
                <option v-for="id in IDs" :value="id.value">{{id.text}}</option>
              </select>
            </div>
            <span class="packimg">
                <img src="../../assets/images/icon_into@2x.png" style="width:100%;height:100%">
            </span>
        </div>
        <div class="packnum item" v-if="isShowAll || isShowIdNum || isShowPass || isShowPassport || isShowBirth">
          <span class="packnumtit">证件号码</span>
          <input class="packnumin" placeholder="必填" v-model="visitor.IDnumber"></input>
        </div>  
        <div class="packnum item" v-if="isShowAll || isShowPass|| isShowPassport">
          <span class="packnumtit">证件有效期</span>
          <input class="packnumin" placeholder="必填" v-model="visitor.IDEndDate"></input>
        </div>
        <!-- <div class="pack item" v-if="isShowAll || isShowPass"> -->
          <!-- <span class="packtit">证件签发地</span> -->
          <!-- <div class="packin">{{visitor.packplace}}</div> -->
          <!-- <input class="packin" placeholder="" v-model="visitor.packplace"></input> -->
          <!-- <span class="packimg">
            <img src="../../assets/images/icon_into@2x.png"  style="width:100%;height:100%">
          </span> -->
        <!-- </div> -->
        <div class="email item" v-if="isShowAll || isShowPass|| isShowPassport">
          <span class="emailtit">姓氏拼音</span>
          <input class="emailin" placeholder="如中文名为通通游,填写tong" v-model="visitor.milyName"></input>
        </div> 
        <div class="email item" v-if="isShowAll || isShowPass|| isShowPassport">
          <span class="emailtit">名字拼音</span>
          <input class="emailin" placeholder="如中文名为通通游,填写tongyou" v-model="visitor.name"></input>
        </div>
        <div class="packnum item" v-if="isShowAll || isShowPass|| isShowPassport || isShowBirth">
          <span class="packnumtit">生日</span>
          <input class="packnumin" placeholder="必填 “2017-12-06”" v-model="visitor.birthday"></input>
        </div> 
        <div class="packnum item" v-if="isShowPassport">
          <span class="country packnumtit">国籍</span>
          <input class="country packnumin" placeholder="必填" v-model="visitor.country"></input>
        </div>   
    </div>
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import tips from 'base/tips/tips'
  import storage from 'good-storage'

  import {checkIdCard} from 'common/js/checkIdCard.js'

  const EDIT_VISITOR_INFO = '__editVisitorInfo__'
  const ADD_VISITOR_INFO = '__addVisitorInfo__'
  const CLIENT_TYPE = '__clientType__'

  const ACTION_TYPE = '__actioinType__'

  const editType = 2
  const addType = 1

  const childAge = 12 //儿童年龄<12

  export default {
    data() {
      return {
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        visitor: {
          userName: '',
          phone: '',
          email: '',
          IDid: 0,
          IDName: '',
          IDnumber: '',
          IDEndDate :'',  //证件有效期
          packplace: '',  //证件签发地
          milyName: '',   //英文姓 
          name: '',       //英文名 
          sex: 1 ,        //性别
          birthday: '',   //出生日期
          country: ''     //国籍
        },
        sexs: [
          { text: '男', value: 1 },
          { text: '女', value: 2 }
        ],
        IDs: [
          {text: '暂无证件', value: 0},
          {text: '身份证', value: 1},
          // {text: '港澳通行证', value: 4},
          // {text: '台湾通行证', value: 3},
          {text: '护照', value: 2},
          // {text: '出生证', value: 5},
          // {text: '军官证', value: 6},
          // {text: '回乡证', value: 7},
          // {text: '户口薄', value: 8},
          // {text: '台胞证', value: 9}
        ],
        isShowAll: false,
        isShowIdNum: false,
        isShowPass: false,
        isShowPassport: false,
        isShowBirth: false,
        selectState: false,
        age: 0
      }
    },
    created() {
      console.log('操作类型: ' + this.$route.params.id)
      storage.set(ACTION_TYPE, this.$route.params.id)

      console.log('当前编辑出行人信息：')
      console.log(storage.get(EDIT_VISITOR_INFO, {}))
      this.editVisitor = storage.get(EDIT_VISITOR_INFO, {})

      console.log('客户类型: ')
      console.log(storage.get(CLIENT_TYPE))
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      save() {
        // 编辑
        if (this.$route.params.id == editType) {
          if(!this._editForm()) {
            console.log('可以跳转')
            return
          }
          // console.log('可以跳转')
          storage.set(ACTION_TYPE, '2')
        }
        // 添加
        if (this.$route.params.id == addType) {
          if(!this._addForm()) {
            return
          }
          storage.set(ACTION_TYPE, '1')
        }
        // console.log('可以跳转')
        this.$router.goBack()
      },
      selectEnv() {
        console.log(this.visitor.IDid)
        this.selectState = true
        this._checkIDtype(this.visitor.IDid, this.selectState)
      },
      _editForm() {
        let editVisitorInfo = {
          id: this.editVisitor.id,
          userName: this.visitor.userName,
          IDtype: this._changeText(this.visitor.IDid),
          IDid: this.visitor.IDid,
          IDnumber: this.visitor.IDnumber,
          IDEndDate: this.visitor.IDEndDate,
          isSelect: this.editVisitor.isSelect,
          sex: this.visitor.sex,
          phone: this.visitor.phone,
          email: this.visitor.email,
          milyName : this.visitor.milyName,
          name: this.visitor.name,
          birthday: this.visitor.birthday,
          country: this.visitor.country,
          clientType: this._checkClientType(this.visitor.IDid, this.visitor.IDnumber, this.visitor.birthday)
        }

        if (!this._validateRequired(editVisitorInfo)) {
          return false
        }
        storage.set(EDIT_VISITOR_INFO, editVisitorInfo)

        console.log('编辑之后的出行人信息：')
        console.log(editVisitorInfo)
        return true
      },
      _addForm() {
        let addVisitorInfo = {
          id: this.visitor.id,
          userName: this.visitor.userName,
          sex: this.visitor.sex,
          phone: this.visitor.phone,
          email: this.visitor.email,
          IDnumber: this.visitor.IDnumber,
          IDid: this.visitor.IDid,
          IDtype: this._changeText(this.visitor.IDid),
          IDEndDate: this.visitor.IDEndDate,
          milyName: this.visitor.milyName,
          name: this.visitor.name,
          birthday: this.visitor.birthday,
          country: this.visitor.country,
          clientType: this._checkClientType(this.visitor.IDid, this.visitor.IDnumber, this.visitor.birthday),
          isSelect: false
        }
        
        // console.log('信息验证状态：' + this._validateRequired(addVisitorInfo))
        if (!this._validateRequired(addVisitorInfo)) {
          return false
        }

        storage.set(ADD_VISITOR_INFO, addVisitorInfo)

        console.log('当前新增的出行人信息：')
        console.log(addVisitorInfo)
        return true
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
      _validateRequired(data) {
        if (data.userName == '') {
          console.log('请填写姓名')
          this._showTips('请填写姓名')
          return false
        }

        if (this._textLength(data.userName) < 2) {
          console.log('姓名最小长度为2位')
          this._showTips('姓名最小长度为2位')
          return false
        }

        if (data.phone == '') {
          console.log('请填写手机号')
          this._showTips('请填写手机号')
          return false
        }

        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(data.phone)) {
          console.log('请填写正确的手机号码')
          this._showTips('请填写正确的手机号码')
          return false
        }

        if (data.email == '') {
          console.log('请填写邮箱')
          this._showTips('请填写邮箱')
          return false
        }

        if (data.IDid == '0') {
          console.log('请选择证件类型')
          this._showTips('请选择证件类型')
          return false
        }
        if (data.IDnumber == '') {
          console.log('请填写证件号码')
          this._showTips('请填写证件号码')
          return false
        }
        console.log(data.IDnumber.length)

        if (data.IDid == '1') {
          if (data.IDnumber.length !== 15 && data.IDnumber.length !== 18) {
            console.log('身份证件号码格式不正确')
            this._showTips('身份证件号码格式不正确')
            return false
          }
        }

        // if (data.IDid == '1') {
        //   if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(data.IDnumber)){
        //     console.log('身份证件号码格式不正确')
        //     this._showTips('身份证件号码格式不正确')
        //     return false
        //   }
        // }

        if (data.IDid == '2' || data.IDid == '3' || data.IDid == '4' ) {
          if (data.IDEndDate == '') {
            console.log('请填写证件有效期')
            this._showTips('请填写证件有效期')
            return false
          }
        }

        if (data.IDid != '1') {
          if (data.birthday == '') {
            console.log('请填写生日')
            this._showTips('请填写生日')
            return false
          }
        }
        if (data.IDid != '1') {
          if (!this._isValidDate(data.birthday)) {
            console.log('生日日期格式不正确')
            this._showTips('生日日期格式不正确,  如"2008-08-08"')
            return false
          }
        }

        return true
      },
      // 验证卡片
      _validateIDcard() {
        // 身份证号码验证
        if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(data.IDnumber)){
          console.log('证件号码格式不正确')
          this._showTips('证件号码格式不正确')
          return false
        }
      },
      _checkClientType(code, num, birthday) {
        let clientType = ''
        if (code == '1'){
          if (num.length == 18) {
            let newBirthday = this._formDateBirthDay(num.slice(6,14))
            clientType = Number(this._ages(newBirthday)) > childAge ? '1' : '2'
          } else {
            let newBirthday = this._formDateBirthDay(num.slice(3, 11))
            clientType =  Number(this._ages(newBirthday)) > childAge ? '1' : '2'
          }
        } else {
          clientType = Number(this._ages(birthday)) > childAge ? '1' : '2'
          // clientType = Number(this.age) > childAge ? '1' : '2'
        }
        return clientType
      },
      _formDateBirthDay(num) {
        let year = num.slice(0, 4)
        let month = num.slice(4, 6)
        let day = num.slice(6, 8)

        return `${year}-${month}-${day}`
      },
      _isValidDate(data){
        let reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig
        return reg.test(data)
      },
      _ages(birthDay) {
        // 生日判断年龄
        // 格式类型 2017-12-03
        var r = birthDay.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        if(r == null) return false
        var d = new Date(r[1], r[3]-1, r[4])
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {   
          var Y = new Date().getFullYear()  
          return Y - r[1]
        }
      },   
      _changeText(code) {
        let text = ''
        switch(code) {
          case 0:
            text = '无证件'
            break
          case 1:
            text = '身份证'
            break
          case 4:
            text = '港澳通行证'
            break
          case 3:
            text = '台湾通行证'
            break
          case 2:
            text = '护照'
            break
          case 5:
            text = '出生证'
            break
          case 6:
            text = '军官证'
            break
          case 7:
            text = '回乡证'
            break
          case 8:
            text = '户口薄'
            break
          case 9:
            text = '台胞证'
        }
        return text
      },
      _checkIDtype(type, state) {
        if (state) {
          this.visitor.IDnumber = ''
        }
        switch(type) {
          case 0:
            this.isShowAll = false
            this.isShowIdNum = false
            this.isShowPass = false
            this.isShowBirth = false
            this.isShowPassport = false
            break
          case 1:
            this.isShowIdNum = true
            this.isShowPass = false
            this.isShowBirth = false
            this.isShowPassport = false
            this.isShowAll = false
            break
          case 4:
            this.isShowPass = true
            this.isShowIdNum = false
            this.isShowAll = false
            this.isShowBirth = false
            break
          case 3:
            this.isShowPass = true
            this.isShowIdNum = false
            this.isShowAll = false
            this.isShowPassport = false
            this.isShowBirth = false
            break
          case 2:
            this.isShowPassport = true
            this.isShowPass = false
            this.isShowIdNum = false
            this.isShowAll = false
            this.isShowBirth = false
            break
          case 5:
            this._showOther()
            break
          case 6:
            this._showOther()
            break
          case 7:
            this._showOther()
            break
          case 8:
            this._showOther()
            break
          case 9:
            this._showOther()
            break
        }
      },
      _checkIdCard(UUserCard, num){
        if(num==1){
          //获取出生日期
          birth=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
          return birth;
        }
        if(num==2){
          //获取性别
          if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "男";
          } else {
            //女
            return "女";
          }
        }
        if(num==3){
          //获取年龄
          var myDate = new Date();
          var month = myDate.getMonth() + 1;
          var day = myDate.getDate();
          var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
          if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
          }
          return age;
        }
      },
      _showOther() {
        this.isShowBirth = true
        this.isShowPassport = false
        this.isShowPass = false
        this.isShowIdNum = false
        this.isShowAll = false
      },
      _initForm() {
        this.visitor.id = this._randomId()
        this.visitor.userName = ''
        this.visitor.sex = 1
        this.visitor.phone = ''
        this.visitor.email = ''
        this.visitor.IDnumber = ''
        this.visitor.IDid = 0
        this.visitor.IDtype = '无证件'
        this.visitor.IDEndDate = ''
        this.visitor.milyName = ''
        this.visitor.name = ''
        this.visitor.birthday = ''
        this.visitor.country = ''
        this.visitor.isSelect = false
        this.visitor.clientType = null
      },
      _randomId() {
        let randomStr = Math.random(10) * 1000000
        return parseInt(randomStr)
      },
      _setForm() {
        this.visitor.userName = this.editVisitor.userName
        this.visitor.sex = this.editVisitor.sex
        this.visitor.phone = this.editVisitor.phone
        this.visitor.email = this.editVisitor.email
        this.visitor.IDnumber = this.editVisitor.IDnumber
        this.visitor.IDid = this.editVisitor.IDid
        this.visitor.IDEndDate = this.editVisitor.IDEndDate
        this.visitor.milyName = this.editVisitor.milyName
        this.visitor.name = this.editVisitor.name
        this.visitor.birthday = this.editVisitor.birthday
        this.visitor.country = this.editVisitor.country
        
        this._checkIDtype(this.visitor.IDid, this.selectState)
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
      }
    },
    mounted() {
      // 编辑
      if (this.$route.params.id == editType) {
        console.log('当前处于编辑操作')
        this._setForm()
      }
      // 添加
      if (this.$route.params.id == addType) {
        console.log('当前处于添加操作')
        this._initForm()
      }

      // 重置操作类型
      storage.set(ACTION_TYPE, '0')
      // this.visitor = this.editVisitor
    },
    components: {
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './editVisitorInfo.css';
</style>