<template>
    <div>
        <div v-title data-title="美付宝快捷支付"></div> 
        <div class="toptit">
            <div class="price">订单金额<span>{{price?'￥'+price:''}}</span></div>
            <div class="num">订单编号<span>{{orderNo}}</span></div>
        </div>
        <div class="cover">直接付款(免登录)</div>
        <!-- 银行卡 -->
        <div class="cardlist cover1" v-for="(item,index) in datalist">
            <span @click="chooseCard(index)"><span class="sure">
                <img :class="{active:index==isActive}" src="../../common/images/liigou.png">
                <img :class="{active:index!=isActive}" src="../../common/images/litgou.png">
                </span>
                <span class="name">
                    {{item.bankName}}
                </span>
                <span class="name" style="margin-left:.313333rem;width: 9rem;">
                    {{item.cardNumber}}
                </span>
            </span>
        </div>
        <div class="cardlist" @click="addcard()">
            <span>
                <span class="sure">
                <img src="../../common/images/litjia.png">
                </span>
                <span class="name" >
                    添加银行卡
                </span>
            </span>
        </div>
        <button class="next" :class="{issure:isActive!=-1}" @click="nextBtn()">下一步</button>
    </div>
</template>

<script>
    import { userQuickCardList, banklist } from 'api'
    import loading from 'base/loading/loading'
    import { rootPath } from 'config/env'
    import qs from 'qs'

    export default {
        data() {
            return {
                routerPath:'',
                storeName:sessionStorage.storeName,
                price:'',  //订单金额
                orderNo:'',  //订单编号
                datalist:[],
                showidx:'',
                isActive:-1,
                bankName:'',
                cardNumber:'',
                quickCardId:'',
                orderId:'',
            }
        },
        created() {
           
        },
        mounted() {
            this.orderId = this.$route.query.orderId
            this.price = this.$route.query.price
            this.orderNo = this.$route.query.num

            userQuickCardList().then(res => {
                console.log('获取银行卡信息----')
                console.log(res);
                this.datalist = res.dataList
            })
        },
        methods: {
            chooseCard(index){
                // console.log(index)
                this.isActive = index
            },
            addcard(){
                // console.log('跳转绑定银行卡')
                this.$router.push({path: this.routerPath+'/wap/bindBankCard',
                    query:{
                        orderId:this.orderId,
                    }
                });
            },
            nextBtn(){
                if(this.isActive == -1) return

                this.$router.push({path: this.routerPath+'/wap/yytPay',
                    query:{
                        orderId: this.orderId,
                        bankName: this.bankName,
                        cardNumber: this.cardNumber,
                        quickCardId: this.quickCardId,
                        price: this.price,
                        orderNo: this.orderNo,
                    }
                });
            }
        },
        components: {
            loading
        },
        watch:{
            isActive(newValue, oldValue){
                this.bankName = this.datalist[newValue].bankName
                this.cardNumber = this.datalist[newValue].cardNumber
                this.quickCardId = this.datalist[newValue].quickCardId
            }
        }
    }
</script>

<style lang="css" scoped>
    @import 'yytOrderDetail.css';
    .issure{
        background-color: #FB4A4C;
        color: #fff;
    }
    .active{
        display: none!important;
    }
</style>
