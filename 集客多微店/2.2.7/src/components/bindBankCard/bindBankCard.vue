<template>
    <div class="editBankInfo">
        <div v-title data-title="绑定银行卡"></div>
        <div v-stat="{type:'pageview', title:'绑定银行卡'}"></div>
        
        <div class="outItem">
            <div class="innerItem">
                <div class="label">银行</div>
                <div class="desc" @click="showBankListEnv">
                    <div class="text" v-html="curSelectBankCardName"></div>
                    <img src="../../common/images/icon_select2.png" alt="">
                </div>
            </div>
            <div class="innerItem">
                <div class="label">银行卡类型</div>
                <div class="desc" @click="showBankCardType">
                    <div class="text" v-html="curSelectBankCardTypeName"></div>
                    <img src="../../common/images/icon_select2.png" alt="">
                </div>
            </div>
            <div class="innerItem">
                <span class="label">银行卡</span>
                <span class="content">
                    <input type="text" placeholder="输入您的银行卡号" v-model="cardNumber" @change="cardNumberEnv(cardNumber)">
                </span>
            </div>
        </div>
        <div class="outItem">
            <div class="innerItem">
                <span class="label">持卡人姓名</span>
                <span class="content">
                    <input type="text" placeholder="输入您的账户名"  v-model="accountName">
                </span>
            </div>
            <div class="innerItem">
                <span class="label">身份证号码</span>
                <span class="content">
                    <input type="text" placeholder="输入您的身份证号码"  v-model="idCardNo">
                </span>
            </div>
        </div>
        <div class="outItem">
            <div class="innerItem" v-if="isCreditCard">
                <span class="label">有效期</span>
                <span class="content">
                    <input type="number" placeholder="银行卡有效期，格式：0688"  v-model="validityDate">
                </span>
            </div>
            <div class="innerItem" v-if="isCreditCard">
                <span class="label">CVN2</span>
                <span class="content">
                    <input type="number" placeholder="信用卡背面CVN码"  v-model="identifyCode">
                </span>
            </div>
            <div class="innerItem">
                <span class="label">手机号</span>
                <span class="content">
                    <input type="number" placeholder="银行卡预留手机号码"  v-model="phoneNumber">
                </span>
            </div>
            <div class="innerItem">
                <span class="label">验证码</span>
                <span class="content phoneIdentifyCode">
                    <input type="number"  placeholder="短信验证码"  v-model="phoneIdentifyCode">
                    <div class="getCode" @click="getCodeEnv" v-html="getCodeBtnText"></div>
                </span>
            </div>
        </div>

        <div class="btnWrap">
            <div class="btn" @click="bindBankCardEnv">绑定银行卡</div>
        </div>

        <div class="bankListWrap" v-if="isShowBankCardList">
            <div class="item" @click="selectBankCardEnv(item)" v-if="bankList.length" v-for="item in bankList" v-html="item.bankName"></div>
        </div>

        <div class="bankCardTypeWrap" v-if="isShowBankCardType">
            <div class="item" @click="selectBankCardTypeEnv(item)" v-if="bankCardTypes.length" v-for="item in bankCardTypes" v-html="item.cardName"></div>
        </div>
        
        <!--蒙层  -->
        <shade v-if="isShowShade" @touchEnv="touchEnv"></shade> 

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>

    </div>
</template>

<script>

    import { getBankCardList, bindBankCard, getCode } from 'api'
    import loading from 'base/loading/loading'
    import Shade from 'base/shade/shade'
    import AlertTip from 'base/alertTip/alertTip'
    import { rootPath } from 'config/env'
    import qs from 'qs'

    const DJS_TIME = 60

    export default {
        data() {
            return {
                showAlert: false,
                isShowShade: false,
                isShowBankCardList: false,
                isShowBankCardType: false,
                isCreditCard: false,
                curSelectBankCardName: '请选择银行卡',
                curSelectBankCardTypeName: '请选择',
                cardNumber: '',
                accountName: '',
                idCardNo: '',
                validityDate: '',
                identifyCode: '',
                phoneNumber: '',
                phoneIdentifyCode: '',
                bankList: [],
                bankCardTypes: [],
                isClick: true,
                getCodeBtnText: '免费获取'
            }
        },
        created() {
            this._getBankCardList()
            this.orderId = this.$route.query.orderId || '34823'
        },
        mounted() {
            
        },
        methods: {
            cardNumberEnv(val) {
                console.log(this.cardNumber)
            },
            getCodeEnv() {
                if (!this._checkInfo()) return;

                if (!this.isClick) {
                    return
                }

                let params = qs.stringify({
                    orderId: this.orderId || '34823',
                    sceneType: '0801',
                    mobile: this.phoneNumber,
                    bankCardNumber: this.cardNumber,
                    realName: this.accountName,
                    identityNo: this.idCardNo
                })
                getCode(params).then(res => {
                    console.log('获取验证码')
                    console.log(res)
                    if (res.code === '0') {
                        this._showMsg(res.msg)
                        return
                    }
                    if (res.code === '1') {
                        this._showMsg(res.msg)
                        this._djs()
                        return
                    }
                })
            },

            _djs() {
                this.isClick = false
                let temp = DJS_TIME
                temp --
                this.getCodeBtnText = `${temp}s后重新获取`

                let timer = setInterval(() => {
                    if (temp == 1) {
                        this.getCodeBtnText = `免费获取`
                        this.isClick = true
                        clearInterval(timer)
                        return
                    }
                    temp --
                    this.getCodeBtnText = `${temp}s后重新获取`
                }, 1000)
            },

            bindBankCardEnv() {
                if (!this._checkInfo()) return;

                if (!this.phoneIdentifyCode.length) {
                    this._showMsg('验证码不能为空')
                    return false
                }

                let params = qs.stringify({
                    orderId: this.orderId,
                    cardType: this.curSelectBankCardTypeId,
                    bankType: this.curSelectBankCardId,
                    sceneType: '0801',
                    mobile: this.phoneNumber,
                    bankCardNumber: this.cardNumber,
                    realName: this.accountName,
                    identityNo: this.idCardNo,
                    cvvNumber: this.identifyCode,
                    expiredDate: this._changeVal(this.validityDate),
                    smsCode: this.phoneIdentifyCode
                })
                bindBankCard(params).then(res => {
                    console.log('获取验证码')
                    console.log(res)
                    if (res.code === '0') {
                        this._showMsg(res.msg)
                        return
                    }
                    if (res.code === '1') {
                        this._showMsg(res.msg)
                        this.$router.go(-1);
                        return
                    }
                })
            },
            _changeVal(str) {
                let oneStr = str.slice(0, 2)
                let twoStr = str.slice(2, 4)
                return oneStr + ',' + twoStr
            },
            _checkInfo() {
                if (this.curSelectBankCardId == undefined) {
                    this._showMsg('请选择卡片所属银行')
                    return false
                }
                if (this.curSelectBankCardTypeId == undefined) {
                    this._showMsg('请选择卡片类型')
                    return false
                }

                if (!this.cardNumber.length) {
                    this._showMsg('请填写完整的银行卡号')
                    return false
                }
                if (!this.accountName.length) {
                    this._showMsg('请填写账户名')
                    return false
                }
                if (!this.idCardNo.length) {
                    this._showMsg('请填写身份证号码')
                    return false
                }
                if (this.isCreditCard) {
                    if (!this.validityDate.length) {
                        this._showMsg('请填写信用卡有效期')
                        return false
                    }
                    if (this.validityDate.length != '4') {
                        this._showMsg('信用卡有效期格式有误')
                        return false
                    }
                    if (!this.identifyCode.length) {
                        this._showMsg('请填写信用卡CVN码')
                        return false
                    }
                }

                if (!this.phoneNumber.length) {
                    this._showMsg('手机号码不能为空')
                    return false
                }
                return true
            },

            _getBankCardList() {
                let params = qs.stringify({
                    a: 'v1/bankList'
                })
                getBankCardList(params).then(res => {
                    console.log('银行卡列表')
                    console.log(res)
                    if (res.code === '1') {
                        this.bankList = res.dataList
                        this.bankCardTypes = res.cardTypeList
                    }
                })
            },
            selectBankCardEnv(bankCard) {
                console.log(bankCard)

                let curSelectBankCardId = bankCard.bankId
                let curSelectBankCardName = bankCard.bankName
                this.curSelectBankCardName = curSelectBankCardName
                this.curSelectBankCardId = curSelectBankCardId

                this._hideShade()
                this._hideBankCardList()
            },
            selectBankCardTypeEnv(bankType) {
                console.log(bankType)

                let curSelectBankCardTypeName = bankType.cardName
                let curSelectBankCardTypeId = bankType.cardType

                if (curSelectBankCardTypeName == '信用卡') {
                    this.isCreditCard = true

                } else {
                    this.isCreditCard = false
                }

                this.curSelectBankCardTypeName = curSelectBankCardTypeName
                this.curSelectBankCardTypeId = curSelectBankCardTypeId

                this._hideShade()
                this._hideBankCardType()
            },
            touchEnv() {
                this._hideShade()
                this._hideBankCardList()
                this._hideBankCardType()
            },
            showBankListEnv() {
                this._showBankCardList()
                this._showShade()
            },
            showBankCardType() {
                this._showShade()
                this._showBankCardType()
            },
            _hideShade() {
                this.isShowShade = false
            },
            _showShade() {
                this.isShowShade = true
            },
            _hideBankCardList() {
                this.isShowBankCardList = false
            },
            _showBankCardList() {
                this.isShowBankCardList = true
            },
            _hideBankCardType() {
                this.isShowBankCardType = false
            },
            _showBankCardType() {
                this.isShowBankCardType = true
            },
            _showMsg(msg) {
                this.showAlert = true
                this.alertText = msg
            }
        },
        components: {
            AlertTip: AlertTip,
            Shade: Shade
        }
        
    }
</script>

<style lang="css" scoped>
    @import 'bindBankCard.css';
</style>
