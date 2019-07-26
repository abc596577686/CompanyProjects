<template>
    <div class="listWrap">
        <div v-stat="{type:'pageview', title:'银行卡管理'}"></div>
        <div v-title data-title="银行卡管理"></div>
        <div class="item" v-if="bankList.length" v-for="item in bankList" v:key="index">
            <div class="cardInfo">
                <span class="name">
                    {{item.bankName}}
                </span>
                <span class="name" style="margin-left:.313333rem;width: 9rem;">
                    {{item.cardNumber}}
                </span>
            </div>
            <div class="handleBtn" @click="cancelBindEnv(item.quickCardId)">解除绑定</div>
        </div>
        <div class="placeholder" v-if="!bankList.length">
            <img class="img" src="../../common/images/icon_bankCard_placeholder.png" alt="">
            <div class="text">暂无银行卡</div>
        </div>

        <!-- <div class="btnWrap">
            <div class="btn" @click="bindBankCardEnv">添加银行卡</div>
        </div> -->

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                <h2>{{showTxt}}</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="cancelDel">取消</button>
                    <div style="display:inline-block;">
                        <button class="quitlogin" @click="confirmDel">{{showconfirmText}}</button>
                    </div>
                </div>
            </section>
        </section>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>
    </div>
</template>

<script>

    import { getMyBankCardList, unBindBankCard } from 'api'
    import loading from 'base/loading/loading'
    import { rootPath } from 'config/env'
    import AlertTip from 'base/alertTip/alertTip'
    import qs from 'qs'

    export default {
        data() {
            return {
                routerPath:'',
                showAlert: false,
                bankList: [],
                orderList: [], //订单列表
                showAlert: false, //弹出提示框
                show: false, //显示确认提示框
                showTxt: '', //确认框提示文字
                showLoadingToast: false,//显示loadingToast
                loadingText:'',//loadingTost 提示信息
                showconfirmText: '确定', //确认框确认按钮文
                cardId:'',
            }
        },
        created() {
            this.routerPath = rootPath;  //保存路径
        },
        mounted() {
            this._getMyBankCardList()
           
        },
        methods: {
            _getMyBankCardList() {
                let params = qs.stringify({
                    a: 'v1/userQuickCardList'
                })
                getMyBankCardList(params).then(res => {
                    console.log('我的银行卡列表')
                    console.log(res)
                    if (res.code === '1') {
                        this.bankList = res.dataList
                    }
                })
            },

            bindBankCardEnv() {
                this.$router.push({
                    path: this.routerPath + '/bindBankCard',
                    query: {}
                })
            },

            cancelBindEnv(cardId) {
                // this.porType = 1;
                // this.oprOrderId = order.orderId;
                this.cardId = cardId
                this.showTxt = "解除绑定后银行服务将不可用，确定解除绑定吗？";
                this.showconfirmText = "确定";
                this.doOprOrder();
            },
            _resetBankList(cardId) {
                this.bankList.forEach((item, index) => {
                    if (item.quickCardId == cardId) {
                        this.bankList.splice(index, 1)
                    }
                })
                this.bankList = this.bankList
            },
            _showMsg(msg) {
                this.showAlert = true
                this.alertText = msg
            },
            doOprOrder() {
                this.show = true;
                this.isEnter = true;
                this.isLeave = false;
            },
            //取消
            cancelDel() {
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
            confirmDel() {
                // console.log(cardId)
                let params = qs.stringify({
                    quickCardId: this.cardId
                })
                unBindBankCard(params).then(res => {
                    console.log('解绑成功')
                    console.log(res)
                    if (res.code != '1') {
                        this._showMsg(res.msg)
                        return
                    }
                    if (res.code === '1') {
                        this._showMsg('解绑成功')
                        this._resetBankList(this.cardId)
                        this.show = false;
                    }
                })
            }
        },
        components: {
            AlertTip: AlertTip
        }
        
    }
</script>

<style lang="css" scoped>
    @import 'bankCardList.css';
</style>
