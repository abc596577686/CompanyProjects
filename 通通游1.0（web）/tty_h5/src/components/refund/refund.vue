<template>
    <div>
        <div class="tk_main">
            <span class="tk_main_back" @click="back">
                <img src="../../common/image/gofo.png" >  
            </span>
            <span class="tk_main_tit">退款进度</span>
        </div>
        <scroll class="refundWrap">
            <div>
                <div class="progressWrap">
                    <div class="graph">
                        <img v-show="returnState == 1 || returnState == 2 || returnState == 3" class="icon" src="../../assets/images/icon_progress_active.png">
                        <img v-show="returnState != 1 && returnState != 2 && returnState != 3" class="icon" src="../../assets/images/icon_progress_gray.png">
                        <span class="line"></span>
                        <img v-show="returnState == 1 || returnState == 2 || returnState == 3" class="icon" src="../../assets/images/icon_progress_active.png">
                        <img v-show="returnState != 1 && returnState != 2 && returnState != 3" class="icon" src="../../assets/images/icon_progress_gray.png">
                        <span class="line"></span>
                        <img v-show="returnState == 2" class="icon" src="../../assets/images/icon_progress_active.png">
                        <img v-show="returnState != 2" class="icon" src="../../assets/images/icon_progress_gray.png">
                    </div>
                    <div class="textWrap">
                        <span class="text" :class="{active: returnState == 0 || returnState == 1 || returnState == 2 || returnState == 3}">填写申请</span>
                        <span class="text" :class="{active: returnState == 0 || returnState == 1 || returnState == 2 || returnState == 3}">平台审核</span>
                        <span class="text" :class="{active: returnState == 2 || returnState == 3}">完成退款</span>
                    </div>
                </div>

                <div class="success">
                    <div class="secim">
                        <img src="../../common/image/yes.png" >
                    </div>
                    <div class="sectxt" v-show="returnState == '1'">退款申请已提交</div>
                    <div class="sectxt" v-show="returnState == '2'">退款已完成</div>
                    <div class="sectxt" v-show="returnState == '3'">退款申请取消</div>
                    <div class="sectxtre" v-show="returnState == '1'">您的退款申请已提交,客服将为您及时解决</div>
                    <div class="sectxtre" v-show="returnState == '2'">{{operatorRemark}}</div>
                    <div class="sectxtre" v-show="returnState == '3'">{{operatorRemark}}</div>
                    <div class="sectxtr">{{returnStateTime}}</div>
                </div>
                <div class="grey1">产品信息</div>
                <promain :productInfo="productInfo" :tripInfo="tripInfo"></promain> 
                <div class="refundres">申请退款原因：{{data.back[0].clientRemark}}</div>
                <div class="grey2"></div>  
                <div class="refundprice">退款金额 ￥{{data.back[0].refundedFee}} </div>
                <div class="grey"></div>
                <div class="refes" v-show="returnState == '3'">
                    <div class="refee" @click="rettty">再次申请</div>
                </div>
                <div class="refes">
                    <div class="refee" @click="cancelrefundEnv" v-show="returnState == '1'" >取消退款</div>
                </div>
            </div>
        </scroll>

        <!--退款小窗口  -->
        <transition name="fade">
            <span class="greycover" v-show="refundct"></span>
        </transition>
        <transition name="slide">
            <div class="refundreq" v-show="refundct">
                <div class='responsecl' @click='closeres'>
                    <img src="../../assets/images/closePro.png" >
                </div>
                <span>输入申请原因</span>
                <textarea v-model='refundres'></textarea>
                <div class="tijiao" @click="submitRefundEnv">提交</div>
            </div>
        </transition>

        <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </div>
</template>

<script type="text/ecmascript-6">

    import Scroll from 'base/scroll/scroll'
    import promain from 'base/promain/promain'
    import tips from 'base/tips/tips'
    import storage from 'good-storage'
    import {refund, getOrderDetail, cancelRefund} from 'api'
    import qs from 'qs'

    const TRIP_INFO = '__tripInfo__'
    const PRODUCT_INFO = '__productInfo__'
    const SALE_ID = '__saleId__'
    const ORDER_NUM = '__orderNum__'

    const ERR_OK = '1'

    export default {
        data() {
            return{
                saleId: '',
                dbId: '',
                isShowTips: false,
                tipsText: '',
                timer: undefined,
                operatorRemark: '',
                returnStateTime: '',
                returnState: 0,
                data:{
                    back: [
                        {
                            clientRemark: ''
                        }
                    ]
                },
                productInfo: {},
                // 出行人信息
                tripInfo: {
                    date:'',
                    persons:{
                        adult:'',
                        children:'',
                    }
                },
                refundct: false,
                refundres: ''
            }
        },
        created() {
            this.saleId = storage.get(SALE_ID)
            let params = qs.stringify({
                orderNum: this.$route.query.orderNum
            })

            getOrderDetail(params).then((res) => {
                console.log(res)
                if (res.code != ERR_OK) {
                    this._showTips(res.msg)
                    return
                }

                let curOrder = res.order
                this.data = res.order
                this.dbId = res.order.back[0].dbId
                let back = this.data.back[this.data.back.length - 1];
                this.returnState = this.data.returnState;
                console.log('-----' + this.returnState)
                if(this.returnState == 1){
                    // 已提交申请退款
                    this.returnStateTime = `申请时间: ${back.createTime ? back.createTime : '无'}`
                }else if(this.returnState == 2){
                    // 退款成功
                    this.operatorRemark = back.operatorRemark
                    this.returnStateTime = `退款完成时间: ${back.updateTime ? back.updateTime : '无'}`
                }else if(this.returnState == 3){
                    // 退款失败
                    this.operatorRemark = back.operatorRemark
                    this.returnStateTime = `退款取消时间: ${back.updateTime ? back.updateTime : '无'}`
                }

                this.productInfo = {
                    imgUrl: curOrder.productImageId,
                    title: curOrder.productTitle
                },
                // this.tripInfo = {
                //     adult:curOrder.num,   //成人数量
                //     children: curOrder.orderNumDesc,   //儿童数量
                //     date: curOrder.calDate,
                // }
                this.tripInfo.persons.adult = curOrder.num
                this.tripInfo.persons.children = curOrder.orderNumDesc
                this.tripInfo.date = curOrder.calDate
            })
            .catch((res) => {
                this._showTips(res.msg)
            })

        },
        methods: {
            back() {
                this.$router.goBack()
            },
            rettty() {
                this.$router.push('/orderlist')
            },
            // 取消退款
            cancelrefundEnv() {
                this.refundct = true

            },
            closeres() {
                this.refundct = false
            },
            submitRefundEnv() {
                if (this.refundres == '') {
                    this._showTips('备注信息不能为空')
                    return
                }
                let params = qs.stringify({
                    dbId: this.dbId,
                    saleId: this.saleId,
                    operatorRemark: this.refundres
                })
                cancelRefund(params).then((res) => {
                    console.log(res)
                    if (res.code != ERR_OK) {
                        this._showTips(res.msg)
                        return
                    }
                    this.refundct = false
                    this._showTips('取消成功')
                    setTimeout(() => {
                        this.$router.push({
                            path: '/orderDetail',
                            query: {
                                orderNum: storage.get(ORDER_NUM)
                            }
                        })
                    }, 1600)
                })
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
        components: {
            Scroll,
            promain,
            tips
        }
    }

</script>

<style lang="css" scoped>
    @import './refund.css';
    .refundWrap{
        position: absolute;
        top: 1.877333rem;
        bottom: 0;
        background: #f5f5f5;
        overflow: hidden;
        width: 100%;
    }
    /* 过渡动画 */
    .greycover {
        transition: all .3s cubic-bezier(.55,0,.1,1);
    }
    .greycover.fade-enter, .greycover.fade-leave-active{
        opacity: 0;
    }
    .refundreq {
        transition: all .3s cubic-bezier(.55,0,.1,1);
    }
    .refundreq.slide-enter, .refundreq.slide-leave-active{
        transform: translate3d(0, -100%, 0);
    }
    .refundreq.slide-leave-active, .refundreq.slide-enter{
        transform: translate3d(0, 100%, 0);
    }
</style>
