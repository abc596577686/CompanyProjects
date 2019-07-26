<template>
    <div class="rating_page">
        <div v-title data-title="收货地址"></div>
        <div v-stat="{type:'pageview', title:'地址列表'}"></div>

        <!-- <lazy-render :time="300"> -->
            <section id="scroll_section" class="scroll_container">
                <section class="list_cotainer">
                    <div class="my_address_info_box" v-for="(item,index) in myaddressList">
                        <div class="address_content" @click.prevent.stop="chooseAddress(item, index)">
                            <div class="address_list_name">{{item.name}}</div>
                            <div class="address_list_tel">{{item.mobile}}</div>
                            <div class="clear_content">
                                <div class="address_default_div">
                                    <button v-show="item.isDefault==1">默认</button>
                                    <p v-show="item.isDefault!=1" style="width: 31px; height: 17px;"></p>
                                </div>
                                <div class="address_details">{{item.fullAddress}}</div>
                            </div>
                            <p v-if="item.msg!=''" class="info_txt" style="color:#fe5000;font-size:0.5rem;margin-left: 2.7rem;">（未上传实名身份信息）</p>
                        </div>
                        <div class="address_edit_icon" @click="goEditAddress(item, index)">
                            <div>
                                <img src="../../../../common/images/icon_bianji@2x.png" width="16px" height="16px" style=" position: absolute;top: 50%; transform: translateY(-50%);left: 30%;">
                            </div>
                        </div>
                    </div>
                    <p v-if="myaddressList.length==0&&!showLoading" style="text-align: center;font-size: 0.5rem; margin-top: 1rem; color: #999;">还未添加过地址信息！</p>
                </section>
            </section>
            <section @click="goAddAddress" class="add_icon_footer">
                <!--<img src="../../../../common/images/add_address.png" height="24" width="24">-->
                <span style="width: 90%;text-align: center; background: #fe5000; color: #fff; font-size: 0.6rem; height: 35px; line-height: 35px; border-radius: 5px;">添加收件人</span>
            </section>
        <!-- </lazy-render> -->
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations } from 'vuex'
    import {addressList} from 'api'
    import qs from 'qs'
    // import {addressList} from 'src/service/getData'
    import alertTip from 'base/alertTip/alertTip'
    import loading from 'base/loading/loading'
    import { rootPath } from 'config/env'
    import storage from 'good-storage'
    // import sa from 'sa-sdk-javascript';

    const INDENT_FRONT = 'identityfront'
    const INDENT_BACK = 'identityback'
    
    export default {
        data() {
            return {
                routerPath:'',
                shopid: '',
                from: '',//从结算过来或者从“我”过来
                productType:'',
                showLoading: true, //显示加载动画
                myaddressList: [], //地址列表
                showAlert: false,
                alertText: null,
                isHaveDefult:false,
            }
        },
        created() {
            this.shopid = this.$route.query.shopid;
            this.from = this.$route.query.from;
            this.productType = this.$route.query.type;
            this.routerPath = rootPath;
            this.initData();
        },
        mounted(){
            // sa.track('$pageview', {
            //   $title: document.title,
            //   $url: location.href,
            //   $url_path: location.pathname,
            //   $referrer_host: location.hostname,
            //   $referrer: document.referrer,
            // })
        },
        components: {
            alertTip,
            loading
        },
        props: [],
        computed: {
            ...mapState([
                'addressIndex', 'newAddress'
            ]),
    
        },
        methods: {
            ...mapMutations([
                'CHOOSE_ADDRESS'
            ]),
            //初始化信息
            initData() {
                let params = qs.stringify({
                    a: 'v1/addressManagerList',
                    pageidx: 1,
                    pagesize: 20,
                    type: this.productType
                })

                addressList(params).then(res => {
                    console.log('我的地址列表----')
                    console.log(res)

                    if (res.code != '1') {
                        this.showAlert = true;
                        this.alertText = res.msg;
                        return
                    }

                    // 保存照片地址
                    if (res.dataList.length) {
                        // 正面
                        storage.set(INDENT_FRONT,res.dataList[0].identityFront)
                        // 反面
                        storage.set(INDENT_BACK,res.dataList[0].identityBack)
                    }
                    

                    this.showLoading = false;
                    this.myaddressList = res.dataList;
                    if (!this.myaddressList.length) {
                        //this.showAlert = true;
                        //  this.alertText = "暂无收货人地址，请前往添加";
                        // setTimeout(() => {
                        //     this.$router.push({
                        //         path: this.routerPath+'/addAddress',
                        //         query: {
                        //             shopid: this.shopid
                        //         }
                        //     });
                        // }, 1000)
                    }else{
                         //不能使用forEach  因为无法跳出循环
                        for (var i = 0; i < res.dataList.length; i++) {
                            if (res.dataList[i].isDefault==1) {
                                this.isHaveDefult=true;
                                break;
                            }
                        }
                    }

                })
            },
    
            //选择地址
            chooseAddress(address, index) {
                this.CHOOSE_ADDRESS({
                    address,
                    index
                });
                if (this.from != "me") {
                    this.$router.push({
                        path:  this.routerPath+'/confirmOrder',
                        query: {
                            id: this.$route.query.id,
                            productSpecId: this.$route.query.productSpecId,
                            groupProductInfo: this.$route.query.groupProductInfo,
                            num: this.$route.query.num,
                        }
                    });
                }
               
            },
            //前往地址编辑
            goEditAddress(address, index) {
                this.CHOOSE_ADDRESS({
                    address,
                    index
                });
                this.$router.push({
                    path: this.routerPath+'/addAddress',
                    query: {
                        oprtype: 'edit',
                        from: this.from,
                        ptype:this.productType
                    }
                });
            },
            //前往地址添加
            goAddAddress() {
                this.$router.push({
                    path: this.routerPath+'/addAddress',
                    query: {
                        oprtype: 'add',
                        from: this.from,
                        ptype:this.productType,
                        hasDefault:this.isHaveDefult
                    }
                });
            }
        },
        watch: {
            // userInfo: function (value) {
            //     if (value && value.user_id) {
            //         this.initData();
            //     }
            // },
            // newAddress: function (value) {
            //     this.initData();
            // },
        }
    }
</script>
  
<style lang="css" scoped>
    @import 'chooseAddress';
</style>
