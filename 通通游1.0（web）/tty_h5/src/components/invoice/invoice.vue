
<template>
    <div class="container">
        <div class="toptit">
            <div class="top_t" @click="gofor()">
                 <img style="width:100%;height:100%" src="../../assets/images/u253.png" > 
            </div>
            <div class="top_o">
                申请发票
            </div>
        </div>
        <lazy-render :time="600">
            <scroll class="scrollWrap">
                <div>
                    <div class="name">
                        <span class="nametit">发票种类</span>
                        <div class="namein">{{classin}}</div>
                    </div>
                    <span class="gte1"></span>
                    <div class="main" @click="maininct">
                        <span class="maintit">发票内容</span>
                        <div class="mainin">{{mainin}}</div>
                        <span class="mainimg">
                            <img src="../../assets/images/yo2x.png"  style="width:100%;height:100%"> 
                        </span>
                    </div>
                    <span class="gte1"></span>
                    <div class="name">
                        <span class="nametit">收票人姓名</span>
                        <input class="namein" v-model="namein"></input>
                    </div>
                    <span class="gte1"></span>
                    <div class="name">
                        <span class="nametit">收票人手机</span>
                        <input class="namein" v-model="phonein"></input>
                    </div>
                    <span class="gte1"></span>
                    <div class="name">
                        <span class="nametit">收票人邮箱</span>
                        <input class="namein" v-model="emailin"></input>
                    </div>
                    <span class="gte1"></span>
                    <div class="main" @click="mainin1ct">
                        <span class="maintit">收票类型</span>
                        <div class="mainin">{{recin}}</div>
                        <span class="mainimg">
                            <img src="../../assets/images/yo2x.png"  style="width:100%;height:100%"> 
                        </span>
                    </div>
                    <span class="gte1" ></span>
                    <div class="name">
                        <span class="nametit">发票抬头</span>
                        <input class="namein" placeholder="企业请填写公司名称" v-model="invoicetop"></input>
                    </div>
                    <span class="gte1" ></span>
                    <div class="name" v-if="nameit">
                        <span class="nametit" style="width:4.4rem">纳税人识别号</span>
                        <input class="namein" placeholder="请填写公司或个人名称" v-model="keynum" style="left:5.266667rem"></input>
                    </div>
                    <span class="gte1" ></span>
                    <div class="name">
                        <span class="nametit">收件地区</span>
                        <input class="namein" placeholder="请填写收件人地区" v-model="place"></input>
                    </div>
                    <span class="gte1"></span>
                    <div class="name" style="height:4rem">
                        <span class="nametit" >收件地址</span>
                        <textarea class="namein" placeholder="请填写收件人地址" v-model="fkd" style="height:3rem;resize:none;"></textarea>
                    </div>

                </div>
            </scroll> 
        </lazy-render>
        
        <div class="saveInfoBtn" @click="saveall" :class="{'disabled': isResetSubmit}">保存</div>
        <div class="fpnr" v-show="fqct">
            <div @click="fp_1">团款</div>
            <div @click="fp_2">住宿</div>
            <div @click="fp_3">旅游服务费</div>
            <div @click="fp_4">交通</div>
            <div @click="fp_5">机票加酒店</div>
            <div @click="fp_6">门票费</div> 
        </div>

        <div class="splx" v-show="spct">
            <div @click="sp_1">个人</div>
            <div @click="sp_2">企业</div>
        </div>
        <div class="greyfg"  v-show="grct"></div>
        <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll.vue'
import qs from 'qs'
import { mapMutations, mapActions, mapGetters } from 'vuex'
// 申请发票信息保存接口
import {savefp ,getOrderDetail} from 'api'
import tips from 'base/tips/tips'
import storage from 'good-storage'

const SALE_ID = '__saleId__'

export default {
    data(){
        return{
            isResetSubmit: false,
            isShowTips: false,
            isShowMock: false,
            isShowExplain: false,
            tipsText: '',
            timer: undefined,
            tripInfo: {},
            classin:'普通发票',       //发票种类
            mainin:'',          //发票内容
            mainintype:'',            //发票内容类型码
            namein:'',
            phonein:'',   //收票人手机号
            emailin:'', //收票人邮箱
            recin:'',           //收票类型
            invoicetop:'',           //发票抬头
            keynum:'',     //识别号
            fqct: false,             //发票类型选择     
            grct: false,             //灰色覆盖 
            spct: false,             //收票类型    
            place:'', 
            fkd :'',
            saleId:'',
            amount: '',  //金额
            invoice:[],
            nameit:false
        }
    },
    beforeRouteEnter (to, from, next) {
        if(from.path.indexOf("index")>=0){
          next({
            path: '/index',
            query: {saleId: storage.get(SALE_ID)}
          })
        }else{
          next();
        }
    },
    mounted(){
        this.saleId = storage.get(SALE_ID)
        let params = qs.stringify({
            orderNum:this.$route.query.orderNo, 
        })

        getOrderDetail(params).then((res) => {
            if(res.code == '1' && res.order != null){
                this.amount = res.order.totalFee          //订单金额
                if(res.order.invoiceFlag == '1'){
                    this.isResetSubmit = true
                }

                if(res.order.invoice != null){
                    this.mainintype = res.order.invoice.contentId   //发票内容id 1=团款，2=住宿费，3=旅游服务费，4=交通费，5=机票+酒店，6=门票费 111111
                    this.mainin = res.order.invoice.content         //发票内容名称1111
                    this.emailin = res.order.invoice.email             //收票人邮箱1111
                    this.phone = res.order.invoice.phone             //收票人手机号111111
                    this.recin = res.order.invoice.type           //发票类型id 1=个人，2=公司11111

                    this.type = res.order.invoice.type             //发票类型名称1111
                    this.invoicetop = res.order.invoice.invoiceTitle      //发票抬头1111
                    this.taxpayerId =  res.order.invoice.taxpayerId   //发票抬头1111
                    this.keynum = res.order.invoice.taxpayerId   //纳税人识别号  公司发票必填11111
                    this.namein = res.order.invoice.recipientsName   //收件人名称
                    this.phonein = res.order.invoice.recipientsPhone  //收件人手机号111111
                    this.place = res.order.invoice.recipientsArea   //收件人所在地
                    this.fkd = res.order.invoice.recipientsAddr  //收件人详细地址
                }
            }
                
        })
    },
    watch:{
        mainin:function(val){
            // console.log(val)
            if(val == '团款'){
                this.mainintype = 1
                console.log(this.mainintype)
            }
            if(val == '住宿'){
                this.mainintype = 2
                console.log(this.mainintype)
            }
            if(val == '旅游服务费'){
                this.mainintype = 3
                console.log(this.mainintype)
            }
            if(val == '交通'){
                this.mainintype = 4
                console.log(this.mainintype)
            }
            if(val == '机票加酒店'){
                this.mainintype = 5
                console.log(this.mainintype)
            }
            if(val == '门票费'){
                this.mainintype = 6
                console.log(this.mainintype)
            }
        },
        recin:function(val){
            // console.log(val)
            if(val == '企业'){
                this.nameit = true
            }else if(val == '个人'){
                this.nameit = false
            }
        }
    },
    methods:{
        gofor(){
            this.$router.go(-1)
        },
        _showTips(text) {
            if (this.timer) return
            this.isShowTips = true
            this.tipsText = text
            this.timer = setTimeout(() => {
                this.isShowTips = false
                this.timer = undefined
                clearTimeout(this.timer)
            }, 7600)
        },
        redctfc:function(){
            this.redct =! this.redct
            this.redct1 =! this.redct1
        },
        redct1fc:function(){
            this.redct1 =! this.redct1
            this.redct =! this.redct
        },
        saveall:function(){
            if(this.isResetSubmit){
                return
            }
            console.log(this.keynum)

            let recinType = 1
            console.log("---" + (this.mainintype == ''))
            if(this.mainintype == '' || this.mainin == ''){
                this._showTips('请选择发票类型')
                return
            }else if(this.namein == ''){
                this._showTips('收票人姓名不能为空')
                return
            }else if(this.phonein == ''){
                this._showTips('收票人手机号码不能为空')
                return
            }else if(this.emailin == ''){
                this._showTips('收票人邮箱不能为空')
                return
            }else if(this.place == ''){
                this._showTips('收件人所在地不能为空')
                return
            }else if(this.fkd == ''){
                this._showTips('收件人详细地址不能为空')
                return
            }else if(this.recin == ''){
                this._showTips('请选择发票类型')
                return
            }else if(this.invoicetop == ''){
                this._showTips('发票抬头不能为空')
                return
            }else if(this.recin == '企业'){
                recinType = 2
                if(this.keynum == ''){
                    this._showTips('纳税人识别号不能为空')
                    return
                }
            }
            console.log("----" + this.recinType + '--' + this.recin)

            let params = qs.stringify({
                orderNo:this.$route.query.orderNo,           //订单号
                amount: this.amount,            //订单金额
                kindId:'1',            //发票种类id 1=纸质发票，2=电子发票111111
                kind:'普通发票',             //发票种类名称111111
                contentId:this.mainintype,        //发票内容id 1=团款，2=住宿费，3=旅游服务费，4=交通费，5=机票+酒店，6=门票费 111111
                content:this.mainin,           //发票内容名称1111
                phone: this.phonein,             //收票人手机号111111
                email: this.emailin,             //收票人邮箱1111
                typeId:recinType,            //发票类型id 1=个人，2=公司11111
                type:this.recin,              //发票类型名称1111
                invoiceTitle:this.invoicetop,      //发票抬头1111
                taxpayerId: this.keynum,       //纳税人识别号  公司发票必填11111
                recipientsName:this.namein,   //收件人名称
                recipientsPhone:this.phonein,  //收件人手机号111111
                recipientsArea:this.place,   //收件人所在地
                recipientsAddr:this.fkd,   //收件人详细地址
            })

            savefp(params).then((res) => {
                
                if(res.code == '1'){
                    this.isResetSubmit = true
                    this._showTips('申请已成功提交')
                }else{
                    console.log('申请失败,' + res.msg)
                    this._showTips('申请失败,' + res.msg)
                }
            })
        },
        maininct:function(){
            this.fqct = true
            this.grct = true
        },
        mainin1ct:function(){
            this.spct = true
            this.grct = true
        },
        fp_1:function(){
            this.mainin = '团款'
            this.fqct = false
            this.grct = false
        },
        fp_2:function(){
            this.mainin = '住宿'
            this.fqct = false
            this.grct = false
        },
        fp_3:function(){
            this.mainin = '旅游服务费'
            this.fqct = false
            this.grct = false
        },
        fp_4:function(){
            this.mainin = '交通'
            this.fqct = false
            this.grct = false
        },
        fp_5:function(){
            this.mainin = '机票加酒店'
            this.fqct = false
            this.grct = false
        },
        fp_6:function(){
            this.mainin = '门票费'
            this.fqct = false
            this.grct = false
        },
        sp_1:function(){
            this.recin = '个人'
            this.spct = false
            this.grct = false
        },
        sp_2:function(){
            this.recin = '企业'
            this.spct = false
            this.grct = false
        },
    },
    components: {
      Scroll,
      tips
    } 
}

</script>

<style lang="css" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .container{
        background: #fff;
    }
    .lazy-load {
        position: absolute !important;
        top: 1.877333rem;
        bottom: 0;
        overflow: hidden;
    }
    .scrollWrap{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        background: #fff;
        margin-bottom: 2rem;
    }
    .toptit{
        width: 100%;
        height: 1.877333rem;
        position: relative;
         padding-top: .64rem; 
         padding-left: .554667rem; 
         background-color: #fff;
         border-bottom: 1px solid #f5f5f5;
    }
    .top_t{
        width: .469333rem;
        height: .853333rem;
        position: absolute;
    }
    .top_o{
        width:3.84rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 6.314667rem;
        top: .810667rem;
        font-size: .682667rem;
        color: #333333;
    }
    /*粗线  */
    .gte{
        display: block;
        width: 100%;
        height:.085333rem;
        background-color: #f0f0f0;
    }
    /*细线  */
    .gte1{
        display: block;
        width: 100%;
        height:.04rem;
        background-color: #f0f0f0;
    }
    .peoInfo{
        width: 100%;
        /*height: 21.461333rem; */
        position: relative;
        background-color: #fff;
         /*overflow: scroll; */
    }
    .name{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .nametit{
        display: block;
        width: 5.413333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .namein{
        display: block; 
        width: 8.533333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: 4.266667rem;
        top: .7rem;
        font-size: .597333rem;
        color: #333333;
    }
    .main{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .maintit{
        display: block;
        width: 5.413333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .mainin{
        display: block; 
        width: 8.533333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: 4.266667rem;
        top: .725333rem;
        font-size: .597333rem;
        color: #333333;
    }
    .mainimg{
        width: .384rem;
        height: .597333rem;
        position: absolute;
        left: 15.104rem;
        top: .554667rem;
    }
    .toptt{
        width: 100%;
        height: 2.773333rem;
        position: relative;
    }
    .tt_1{
        width: 3.413333rem;
        height: .853333rem;
        line-height: .682667rem;
        font-size: .682667rem;
        color: #333333;
        position: absolute;
        left: .597333rem;
        top: .64rem;
    }
    .tt_2{
        width: 8.533333rem;
        height: .853333rem;
        line-height: .597333rem;
        font-size: .597333rem;
        color: #333333;
        position: absolute;
        left: 4.266667rem;
        top: .554667rem;
    }
    .tt_3{
        width: 3.926667rem;
        height: .682667rem;
        font-size: .512rem;
        color: #333333;
        line-height: .512rem;
        position: absolute;
        left: .597333rem;
        top: 1.806667rem;
    }
    .tt_4{
         width: 8.533333rem;
        height: .853333rem;
        line-height: .597333rem;
        font-size: .597333rem;
        color: #999999;
        position: absolute;
        left: 4.266667rem;
        top: 1.636rem;
    }
    .fpnr{
        width: 15.26667rem;
        height: 10.368rem;
        position: fixed;
        bottom: .341333rem;
        left: .4rem;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        z-index: 1000;
        background-color: #ffffff;
    }
    .greyfg{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.4;
        z-index: 999;
    }
    .fpnr > div{
        width: 100%;
        height: 1.7rem;
        text-align: center;
        font-size: .597333rem;
        color: #333333;
        line-height: 1.7rem; 
        border-bottom: 1px solid #f5f5f5;
    }
    .splx{
        width: 15.26667rem;
        height:3.456rem;
        position: fixed;
        bottom: .341333rem;
        left: .4rem;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        z-index: 1000;
        background-color: #ffffff;
    }
    .splx > div{
        width: 100%;
        height: 1.7rem;
        text-align: center;
        font-size: .597333rem;
        color: #333333;
        line-height: 1.7rem; 
        border-bottom: 1px solid #f5f5f5;
    }
    .saveInfoBtn{
        width: 15.018667rem;
        height: 2.133333rem;
        background-color: #008ee5;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        position: fixed;
        bottom: 1.28rem;
        left: .597333rem;
        font-size: .682667rem;
        color: #ffffff;
        text-align: center;
        line-height: 2.133333rem;
    }
    .saveInfoBtn.disabled{
        background: #ccc;
    }

</style>