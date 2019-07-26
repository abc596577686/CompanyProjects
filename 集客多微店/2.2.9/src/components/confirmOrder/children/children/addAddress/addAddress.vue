<template>
       <div class="rating_page">
        <div v-title data-title="收货地址"></div>
        <div v-stat="{type:'pageview', title:'添加地址'}"></div>
        
        <!-- <lazy-render :time="300"> -->
            <section id="scroll_section" class="scroll_container">
                <div class="ui_list address_edit_infos">
                    <ul>
                        <li class="ui_list_li a"><input type="text" placeholder="姓名" v-model="addressData.name" maxlength="20"></li>
                        <li class="ui_list_li a"><input type="tel" placeholder="手机号码" v-model="addressData.mobile" maxlength="20"></li>
                        <li class="ui_list_li a" style="color: #777;" @click="choseAdd()">
                            {{Province?Province:'省份'}}、 {{City?City:'城市'}}、{{District?District:'区域'}}
                        </li>
                        <li class="ui_list_li a">
                            <input type="text" placeholder="详细地址，如街道、楼牌号等" class="ipt_assd" v-model="addressData.address" maxlength="100">
                        </li>
                        <li class="ui_list_li a set_default_address" style="border-bottom:none;">
                            <span style="color: #a9a9a9;">设置为默认地址</span>
    
                            <input type="checkbox" v-model="addressData.isDefault" id="checkbox_c1" class="chk_3" /><label for="checkbox_c1"></label>
    
                        </li>
                    </ul>
                </div>
                <div id="order_identity_info" v-if="wherefrom=='confirm'&&ptype!='1'">
                    <div class="title">
                        订购人信息
                    </div>
                    <div class="ui_list">
                        <ul>
                            <li class="ui_list_li b">
                                <input type="text" style="padding: 0 0.7rem;" placeholder="订购人真实姓名" v-model="addressData.realName" maxlength="30">
                            </li>
                            <li class="ui_list_li b">
                                <input type="text" style="padding: 0 0.7rem;" placeholder="订购人身份证号码" v-model="addressData.identityNo" maxlength="30">
                            </li>
                            <!--<li class="hint" style="margin-top: 5px;margin-bottom: 10px;">非必填，购买免税仓发货则必须填写身份证号码</li>-->
                        </ul>
                    </div>
                    <div class="identity_pic_div" v-if="ptype=='3'">
                        <div class="peoCardImg1">
                            <input type="file" ref="file1" id="file1"  name='file' @change='onUpload1' accept="image/*"> 
                            <div class="uploadcover" :class="{activek:isShow1}" @click ="uploadEnv1">
                                <img src='../../../../../common/images/uploadimg.png' style="width:100%;height:100%;"> 
                            </div>
                            <div class="upload" :class="{activek:isShow2}">
                                <img :src="peoCardImg1" style="width:100%;height:100%;">
                            </div>
                        </div>
                        <div class="peoCardImg2">
                            <input type="file" ref="file2" id="file2"   name='file' @change='onUpload2' accept="image/*"> 
                            <div class="uploadcover"  :class="{activek:isShow3}" @click="uploadEnv2">
                                <img src='../../../../../common/images/uploadimg.png' style="width:100%;height:100%;"> 
                            </div>
                            <div class="upload" :class="{activek:isShow4}">
                                <img :src="peoCardImg2" style="width:100%;height:100%;">
                            </div>
                        </div> 
                    </div>
                    <div class="info_hint info_hint1" style="padding-top: 10px;padding-bottom: 10px;padding-left: .64rem;" v-if="ptype=='3'||ptype=='2'">
                        <!-- <div class="info_hint_left"> -->
                            <!-- <img src="../../../../../common/images/wenhao@2x.png"> -->
                        <!-- </div> -->
                        <p class="info_hint_toptxt">订购人信息</p>
                        <li class="info_p">订购人可以为自己或他人购买跨境商品（订购人可以和收货人不为同一人）</li>
                        <li class="info_p">根据海关要求订购人的真实姓名和身份证号必须真实且一致否则无法通过海关清关</li>
                        <li class="info_p">你的身份证信息将加密保管，集客多将保证信息安全，绝不对外泄露</li>
                    </div>
                </div>
                <div v-if="oprType=='edit'" class="del_div " @click.stop.prevent="deleteAddr">删除地址</div>
                <!-- <div class="coverdivv"></div> -->
            </section>
            <section class="coverpart" v-if="show">
                <section class="cover-background"></section>
                <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                    <!--<div class="sa-icon">
                            <span class="sa-body"></span>
                            <span class="sa-dot"></span>
                        </div>-->
                    <h2>是否确定删除该地址</h2>
                    <section class="sa-botton">
                        <button class="waiting" @click="cancelDel">取消</button>
                        <section style="display:inline-block;">
                            <button class="quitlogin" @click="confirmDel" style='width: 5rem;background-color:#FB4A4C'>确定</button>
                        </section>
                    </section>
                </section>
            </section>
            <section class="myAddress">
                <section class="showChose" v-show="showChose" @click="closeAdd()">
                </section>
                <section class="address" v-show="showChose">
                    <!--<section class="title">
                        <h4>请选择地址</h4>
                        <span @click="closeAdd()">×</span>
                    </section>-->
                    <section class="title"  style="height:2rem;line-height:2rem;border-bottom:1px #eee solid;overflow: hidden;">
                        <section class="area" @click="provinceSelected()" :class="showProvince?'active':''">{{Province?Province:'省份'}}</section>
                        <section class="area" @click="citySelected()" :class="showCity?'active':''">{{City?City:'城市'}}</section>
                        <section class="area" @click="districtSelected()" :class="showDistrict?'active':''">{{District?District:'区域'}}</section>
                    </section>
                    <ul>
                        <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.areaId, v.areaName, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.areaName}}</li>
                        <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.areaId, v.areaName, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.areaName}}</li>
                        <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.areaId, v.areaName, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.areaName}}</li>
                    </ul>
                </section>
            </section>
            <loading-toast v-if="showLoadingToast" @closeTip="showLoadingToast = false" :loadingText="loadingText"></loading-toast>
            <section @click.stop.prevent="addAddress" class="add_icon_footer">
                <!--<img src="../../../images/add_address.png" height="24" width="24">-->
                <span style="width: 90%;text-align: center; background: #FB4A4C; color: #fff; font-size: 0.6rem; height: 35px; line-height: 35px; border-radius: 5px;">保存</span>
            </section>
        <!-- </lazy-render> -->
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <!--<div class="my_address_but">
            <button @click.stop="addAddress">保存</button>
        </div>-->
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import alertTip from 'base/alertTip/alertTip'
    import loadingToast from 'base/loadingToast/loadingToast'
    import { getRegionList, getCityList, saveAddress, deleteAddress ,webUploadImage} from 'api'
    import qs from 'qs'
    // import { getCityList, saveAddress, deleteAddress } from 'src/service/getData'
    // import { getImgPath } from 'src/components/common/mixin'
    import { baseUrl } from 'config/env'
    import loading from 'base/loading/loading'
    import storage from 'good-storage'

    const INDENT_FRONT = 'identityfront'
    const INDENT_BACK = 'identityback'

    export default {
        data() {
            return {
                isShow1 :false,
                isShow2 :true,
                isShow3 :false,
                isShow4 :true,
                // 正面
                peoCardImg1:'',
                // 反面
                peoCardImg2:'',
                show: false, //显示提示框
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                preventRepeat: false, //防止重复获取
                showLoading: false, //显示加载动画
                sybaseUrl: '', //服务器地址
                showLoadingToast:false,//显示loadingToast
                loadingText:'',//loadingTost 提示信息
                oprType: '',//操作类型  add 新增 edit 编辑
                wherefrom:'',//从结算过来或者从“我”过来 me-我 confirm-结算
                ptype:'',//商品类型
                showChose: false,
                showProvince: true,
                showCity: false,
                showDistrict: false,
                showCityList: false,
                showDistrictList: false,
                province: '',
                city: '',
                district: '',
                Province: false,
                City: false,
                District: false,
                GetProvinceId: 2,
                selected: false,
                info: [{
                    areaId: 310000,
                    areaName: '上海'
                }],
                addressData: {
                    addressId: '',
                    name: '',
                    mobile: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    address: '',
                    zipcode: '',
                    identityNo: '',
                    identityFrontRelative: '',
                    identityBackRelative: '',
                    isDefault: false,
                    productType:'0',
                    realName:'',
                },
                returnUrl1:'',
                returnUrl2:'',
            }
        },
        created() {
            let params = qs.stringify({a: 'v1/regionList'})
            getRegionList(params).then(res => {
                // console.log('获取城市列表----')
                // console.log(res);
                this.info = res.list;
            });

            this.oprType = this.$route.query.oprtype;
            this.wherefrom = this.$route.query.from;
            this.ptype = this.$route.query.ptype;
            this.sybaseUrl = baseUrl;
        },
        mounted() {
            // 获取身份证照片
            // this.peoCardImg1 = storage.get(INDENT_FRONT)
            // this.peoCardImg2 = storage.get(INDENT_BACK)

            if (this.oprType == "edit") {
                console.log(this.choosedAddress);
                if (this.choosedAddress) {
                    this.addressData = this.choosedAddress;

                    if(this.addressData.identityFront.length > 0 && this.addressData.identityBack.length ){
                        this.isShow1 = true
                        this.isShow2 = false
                        this.isShow3 = true
                        this.isShow4 = false
                    }

                    //获取身份证图片
                    this.peoCardImg1 = this.addressData.identityFront
                    this.peoCardImg2 = this.addressData.identityBack

                    this.Province = this.choosedAddress.provinceName;
                    this.City = this.choosedAddress.cityName;
                    this.District = this.choosedAddress.areaName;
                    if(this.choosedAddress.isDefault==1){
                        this.addressData.isDefault=true;
                    }else{
                        this.addressData.isDefault=false;
                    }
                }
    
            }else if(this.oprType == "add"&&!this.$route.query.hasDefault){
                this.addressData.isDefault=true;
            }
        },
        // mixins: [getImgPath],
        components: {
            alertTip,
            loading,
            loadingToast
        },
        computed: {
            ...mapState([
                'choosedAddress'
            ]),
        },
        methods: {
            uploadEnv1() {
                this.$refs.file1.dispatchEvent(new MouseEvent('click'))
            },
            uploadEnv2() {
                this.$refs.file2.dispatchEvent(new MouseEvent('click'))
            },
            deleteAddr() {
                this.show = true;
                this.isEnter = true;
                this.isLeave = false;
            },
            //取消删除
            cancelDel() {
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
            //确定删除
            confirmDel() {
                let me = this;
                let params = qs.stringify({
                    addressId: this.addressData.addressId
                })
                deleteAddress(params).then(res => {
                    if (res.code == "1") {
                        me.$router.go(-1);
                    } else {
                        me.showAlert = true;
                        me.alertText = res.msg;
                    }
    
                }).catch(function(err) {
    
                });
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
    
            //保存地址信息
            async addAddress() {
                let me = this;

                if (!me.addressData.name) {
                    me.showAlert = true;
                    me.alertText = '请输入姓名'
                    return;
                } else if (!me.addressData.mobile) {
                    me.showAlert = true;
                    me.alertText = '请输入电话号码';
                    return;
                } else if (!me.addressData.provinceId || !me.addressData.cityId || !me.addressData.areaId) {
                    me.showAlert = true;
                    me.alertText = '请选择地址';
                    return;
                } else if (!me.addressData.address) {
                    me.showAlert = true;
                    me.alertText = '请输入详细地址';
                    return;
                }

                if(me.addressData.isDefault){
                    me.addressData.isDefault=1;
                }else{
                    me.addressData.isDefault=0;
                }
                me.addressData.productType=me.ptype;
                me.showLoading = true;
                this.addressData.identityFrontRelative  = this.returnUrl1
                this.addressData.identityBackRelative = this.returnUrl2

                this.addressData.realName = this.addressData.realName

                //保存成功返沪上一页，否则弹出提示框
                let params = qs.stringify(me.addressData);
                saveAddress(params).then(res => {
                    me.showLoading = false;
                    if (res.code == "1") {
                        me.$router.go(-1);
                        me.showAlert = true;
                        me.alertText = "添加成功";
                    } else {
                        me.showAlert = true;
                        me.alertText = res.msg;
                    }
                });
    
            },
            choseAdd: function() {
                this.showChose = true;
            },
            closeAdd: function() {
                this.showChose = false;
            },
            _filter(add, areaname, areaId) {
                let result = [];
                for (let i = 0; i < add.length; i++) {
                    if (areaId == add[i].areaId) {
                        result = add[i][areaname];
                    }
                }
                return result;
            },
            getProvinceId: function(code, input, index) {
                this.province = code;
                this.Province = input;
                this.addressData.provinceId = code;
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
                this.showCityList = this._filter(this.info, 'childrenList', this.province);
                // 点击选择当前
                this.info.map(a => a.selected = false);
                this.info[index].selected = true;
            },
            provinceSelected: function() {
                // 清除市级和区级列表
                this.showCityList = false;
                this.showDistrictList = false;
                // 清除市级和区级选项
                this.City = false;
                this.District = false;
                // 选项页面的切换
                this.showProvince = true;
                this.showCity = false;
                this.showDistrict = false;
            },
            getCityId: function(code, input, index) {
                this.addressData.cityId = code;
                this.city = code;
                this.City = input;
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
                this.showDistrictList = this._filter(this.showCityList, 'childrenList', this.city);
                // 选择当前添加active
                this.showCityList.map(a => a.selected = false);
                this.showCityList[index].selected = true;
            },
            citySelected: function() {
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
            },
            getDistrictId: function(code, input, index) {
                this.addressData.areaId = code;
                this.district = code;
                this.District = input;
                // 选择当前添加active
                this.showDistrictList.map(a => a.selected = false);
                this.showDistrictList[index].selected = true;
                // 选取市区选项之后关闭弹层
                this.showChose = false;
            },
            districtSelected: function() {
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
            },
            // 上传身份证正面
            onUpload1:function(event){
                // alert('唤起上传')
                var file = event.target.files[0];
                // let file = document.getElementById("file1").files[0];
                // var file = event.target.files[0]
                // var file = this.$refs.file1.files[0];
                // var file = data.files[0] 
                var params = new FormData();
                // params.append('file',file,file.name);
                params.append('file',file);
                params.append('chunk','0');
                // console.log(params.get('file'));
                this.showLoading = true     
                webUploadImage(params).then(res => {
                    console.log('上传正面图片后返回数据----')
                    console.log(res);
                    this.isShow1 = true
                    this.isShow2 = false
                    this.peoCardImg1 = baseUrl + 'upload' + res.userImage
                    this.returnUrl1 = res.userImage
                    this.showLoading = false
                })
            },
            onUpload2:function(event){
                let me = this 
                let file = event.target.files[0];           
                let params = new FormData(); 
                params.append('file',file,file.name);
                params.append('chunk','0');
                // console.log(params.get('file')); 
                this.showLoading = true    
                webUploadImage(params).then(res => {
                    console.log('上传背面图片后返回数据----')
                    console.log(res);
                    this.isShow3 = true
                    this.isShow4 = false
                    this.peoCardImg2 = baseUrl + 'upload' + res.userImage
                    this.returnUrl2 = res.userImage
                    this.showLoading = false
                })  
            },
            // uploadAvatar: function(tag) {
            //     let me=this;
            //     me.showLoadingToast=true;
            //     me.loadingText="上传中....";
            //     let input1 = document.getElementById("identityFront");
            //     let input2 = document.getElementById("identityBack");
            //     let params = new FormData();
            //     if (tag == "1") {
            //         params.append('file', input1.files[0]);
            //     } else {
            //         params.append('file', input2.files[0]);
            //     }
                // webUploadImage(params).then(res => {
                //     me.showLoadingToast=false;
                //     // let res = response.body;
                //     if (res.code == "1") {
                //         if (tag == "1") {
                //             this.addressData.identityFront = res.userImage;
                //             this.addressData.identityFrontRelative = res.userImage;
                //         } else {
                //             this.addressData.identityBack = res.userImage;
                //             this.addressData.identityBackRelative = res.userImage;
                //         }
                //     }
                //     this.showAlert = true;
                //     this.alertText = res.msg;
                // })

                // this.$http.post(baseUrl + 'api/user/webUploadImage.msp', data).then((response) => {
                    
                // }, (response) => {
                //     me.showLoadingToast=false;
                //     this.showAlert = true;
                //     this.alertText = '上传失败';
                // });
            // }
        }
    }
</script>

<style lang="css" scoped>
    @import 'addAddress';
    .activek{
        visibility:hidden
    } 
</style>
