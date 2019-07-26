

<template>
    <div>
        <!--蓝色框  -->
        <div class="topSea">
            <span class="leftjt">
                <img src="../../../images/tty/返回-(1)@3x.png" alt="error">
            </span>
            <span class="clickSea">
                搜索
            </span>
            <div class="searchD">
                <span class="littlefdj">
                    <img src="../../../images/tty/搜索@2x.png" alt="error">
                </span>
                <input class="searchInput" type="text" placeholder="目的地/关键词">
            </div>
        </div>
        <div class="searchList">
            <span class="mdd" @click="mddFc()">
                <span class="c1" v-show="mdd1">目的地</span>
                <span class="c1" style="color:#008ee5" v-show="mdd2">目的地</span>
                <span class="c2" v-show="mdd3">
                    <img src="../../../images/tty/unfold-拷贝-3@2x.png" alt="error">
                </span>
                <span class="c2" v-show="mdd4">
                    <img src="../../../images/tty/unfold@2x.png" alt="error">
                </span>
            </span> 
            <span class="mdd" @click="xcFc()">
                <span class="c1" v-show="xc1">行程时间</span>
                <span class="c1" style="color:#008ee5" v-show="xc2">行程时间</span>
                <span class="c2" v-show="xc3">
                    <img src="../../../images/tty/unfold-拷贝-3@2x.png" alt="error">
                </span> 
                <span class="c2" v-show="xc4">
                    <img src="../../../images/tty/unfold@2x.png" alt="error">
                </span> 
            </span>
            <span class="mdd" @click="pxFc()">
                <span class="c1" v-show="px1">默认排序</span>
                <span class="c1" style="color:#008ee5" v-show="px2">默认排序</span>
                 <span class="c2" v-show="px3">
                    <img src="../../../images/tty/unfold-拷贝-3@2x.png" alt="error">
                </span> 
                <span class="c2" v-show="px4">
                    <img src="../../../images/tty/unfold@2x.png" alt="error">
                </span> 
            </span>
            <span class="mdd" @click="sxFc()">
                <span class="c1" v-show="sx1">筛选</span>
                <span class="c1"style="color:#008ee5" v-show="sx2">筛选</span>
                <span class="c2" style="left:2.3rem" v-show="sx3">
                    <img src="../../../images/tty/unfold-拷贝-3@2x.png" alt="error">
                </span>
                <span class="c2" style="left:2.3rem" v-show="sx4">
                    <img src="../../../images/tty/unfold@2x.png" alt="error">
                </span> 
            </span>
        </div>
        <!--国家选择  -->
        <div class="mddSel" style="font-size:0"  v-if="countrysel"> 
            <!--一级  -->
            <ul class="firSel">
                <li v-for="(item,$index) in items"  @click="selectStyle(item, $index)":class="{'active':item.active || item.autoActive,'unactive':!item.active}">{{item.select}}
                </li>
            </ul>
            <!--二级  -->
             <ul class="secSel">
                <li v-for="(item,$index) in itemss"  @click="selectStyle1(item, $index)":class="{'active':item.active || item.autoActive,'unactive':!item.active}">{{item.select1}}
                </li>
            </ul> 
        </div>
        <!--行程时间  -->
        <div class="traveltime" v-if="traveltime"> 
            <div class="trati">行程天数{{rangeValue}}天</div> 
            <!-- <div class="">{{rangeValue}}</div> -->
            <mt-range v-model="rangeValue" step='5' max='90' barHeight='5'></mt-range>
            <div class="yushe">
                <span class="yushe1">1天</span>
                <span class="yushe2">90天</span>
            </div>
            <div class="alltime">出发时间</div>
            <div class="alltimepick">
                 <div v-for="(item,$index) in month" @click="selectStyle3(item, $index)":class="{'ac':item.active || item.autoActive,'ack':!item.active}">{{item.mon}}
                </div>
            </div>
            <div class="reOrMake">
                <div class="reset" @click="reset()">重置</div>
                <div class="sure" @click="saveInfo()">确定</div>
            </div>
        </div>
        <!--排序  -->
        <div class="paixu" v-if="paixulis">
            <div v-for="(item,$index) in paixu" @click="selectStyle4(item, $index)":class="{'kk':item.active || item.autoActive,'kkt':!item.active}">{{item.list}}
            </div>
        </div>
        <!--筛选  -->
        <div class="shaixuan">
            <span class="sxlist1" style="position:relative" :class="{kkkpt:shensuo1}">
                <span @click="qiehuan1()">出发城市
                    <span class="spim1" v-if="spim1" >
                        <img src="../../../images/tty/unfold-拷贝-3@2x.png" style="width:100%;height:100%">
                    </span>
                    <span class="spim2" v-if="spim2" >
                        <img src="../../../images/tty/unfold@2x.png" style="width:100%;height:100%">
                    </span>
                </span>
                <div v-for="(item,$index) in chufa" @click="selectStyle5(item, $index)":class="{'ac':item.active || item.autoActive,'acc':!item.active}">{{item.list}}
                </div> 
            </span>
            <span class="sxlist2" style="position:relative" :class="{kkkpt:shensuo2}">
                <span @click="qiehuan2()">产品特色
                    <span class="spim3" v-if="spim1" >
                        <img src="../../../images/tty/unfold-拷贝-3@2x.png" style="width:100%;height:100%">
                    </span>
                    <span class="spim4" v-if="spim2" >
                        <img src="../../../images/tty/unfold@2x.png" style="width:100%;height:100%">
                    </span>
                </span>
                <div v-for="(item,$index) in chanpin" @click="selectStyle6(item, $index)":class="{'ac':item.active || item.autoActive,'acc':!item.active}">{{item.list}}
                </div> 
            </span>
            <div class="gongying">
                <div>供应商</div>
                <span :class="{kaisa:kaisa}" @click="pickgys()">凯撒</span>
            </div>
            <div class="reOrMake" style="margin-left:12px">
                <div class="reset" @click="sxreset()">重置</div>
                <div class="sure" @click="sxsaveInfo()">确定</div>
            </div> 
        </div>
    </div>
</template>

<script>
// import alertTip from 'src/components/common/alertTip'

export default {
    data(){
        return{
            // 行程时间 滑块的值 值为天数
            rangeValue:5,
            //行程时间 滑块的宽度
            barHeight:3,

            // 目的地
            mdd1:true,
            mdd2:false,
            mdd3:true,
            mdd4:false,
            // 行程
            xc1:true,
            xc2:false,
            xc3:true,
            xc4:false,
            // 排序
            px1:true,
            px2:false,
            px3:true,
            px4:false,
            // 筛选
            sx1:true,
            sx2:false,
            sx3:true,
            sx4:false,
            // 目的地国家选择框
            countrysel:false,
            // 行程时间选择框
            traveltime:false,
            // 排序选择框
            paixulis:false,

            // 列表独立点击
            active: false,
            items: [   
                    {select:'不限'},
                    {select:'欧洲', autoActive:true},
                    {select:'亚洲'},
                    {select:'非洲'},
                    {select:'大洋洲'},
                    {select:'北美洲'},
                    {select:'南美洲'},
            ],  
            itemss: [   
                    {select1:'不限'},
                    {select1:'意大利', autoActive:true},
                    {select1:'荷兰'},
                    {select1:'葡萄牙'},
                    {select1:'西班牙'},
                    {select1:'美国'},
                    {select1:'法国'},
            ],
            month:[
                    {mon:'11月'},
                    {mon:'12月'},
                    {mon:'1月'},
                    {mon:'2月'},
                    {mon:'3月'},
                    {mon:'4月'},
                    {mon:'5月'},
                    {mon:'6月'},
                    {mon:'7月'},
                    {mon:'8月'},
                    {mon:'9月'},
                    {mon:'10月'},
            ],
            paixu:[
                    {list:'默认排序' ,autoActive:true},
                    {list:'价格从低到高'},
                    {list:'价格从高到底'},
            ],
            chufa:[
                    {list:'北京' ,autoActive:true},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
                    {list:'北京'},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
                    {list:'北京'},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
                    {list:'北京'},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
                    {list:'北京'},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
            ],
            chanpin:[
                    {list:'文化遗传' ,autoActive:true},
                    {list:'观光'},
                    {list:'走遍'},
                    {list:'体验季'},
                    {list:'文化遗传'},
                    {list:'观光'},
                    {list:'广州'},
                    {list:'深圳'},
                    {list:'北京'},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
                    {list:'北京'},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
                    {list:'北京'},
                    {list:'上海'},
                    {list:'广州'},
                    {list:'深圳'},
            ],
            // 选择的月份
            monthre:'1',
            //出发城市伸缩按钮  
            spim1 :true,
            spim2 :false,
            //出发城市 是否伸缩    
            shensuo1:true,
            //产品特色 是否伸缩
            shensuo2:true,
            //产品供应商
            kaisa:false,

        }
    },
    mounted(){

    },
    watch:{
        mdd1:function(){
            if(this.mdd1 == false){
                this.xc1 = true
                this.xc2 = false
                this.xc3 = true
                this.xc4 = false
                this.px1 = true
                this.px2 = false
                this.px3 = true
                this.px4 = false
                this.sx1 = true
                this.sx2 = false  
                this.sx3 = true
                this.sx4 = false
                this.countrysel = true
            }else{
                this.countrysel = false
            }
        },
        xc1:function(){
            if(this.xc1 == false){
                this.mdd1 = true
                this.mdd2 = false
                this.mdd3 = true
                this.mdd4 = false
                this.px1 = true
                this.px2 = false
                this.px3 = true
                this.px4 = false
                this.sx1 = true
                this.sx2 = false
                this.sx3 = true
                this.sx4 = false
                this.traveltime = true
            }else{
                this.traveltime = false
            }
        },
        px1:function(){
            if(this.px1 == false){
                this.mdd1 = true
                this.mdd2 = false
                this.mdd3 = true
                this.mdd4 = false
                this.xc1 = true
                this.xc2 = false
                this.xc3 = true
                this.xc4 = false
                this.sx1 = true
                this.sx2 = false
                this.sx3 = true
                this.sx4 = false
                this.paixulis = true
            }else{
                this.paixulis = false
            }
        },
        sx1:function(){
            if(this.sx1 == false){
                this.mdd1 = true
                this.mdd2 = false
                this.mdd3 = true
                this.mdd4 = false
                this.xc1 = true
                this.xc2 = false
                this.xc3 = true
                this.xc4 = false
                this.px1 = true
                this.px2 = false
                this.px3 = true
                this.px4 = false
            }
        }
    },
    components: {

    },
    methods:{
        mddFc:function(){
            this.mdd1 =! this.mdd1
            this.mdd2 =! this.mdd2
            this.mdd3 =! this.mdd3
            this.mdd4 =! this.mdd4
        },
        xcFc:function(){
            this.xc1 =! this.xc1
            this.xc2 =! this.xc2
            this.xc3 =! this.xc3
            this.xc4 =! this.xc4
        },
        pxFc:function(){
            this.px1 =! this.px1
            this.px2 =! this.px2
            this.px3 =! this.px3
            this.px4 =! this.px4
        },
        sxFc:function(){
            this.sx1 =! this.sx1
            this.sx2 =! this.sx2
            this.sx3 =! this.sx3
            this.sx4 =! this.sx4
        },
        // 点选国家
        selectStyle (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.items.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
        },
        selectStyle1 (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.itemss.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
        },
        selectStyle3 (item, index) {
            const _this=this;

            // 选择了第几个 (12月~10月  这是序号不是月份)
            _this.monthre = (index+1)

            this.$nextTick(function () {
                this.month.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
        },
        // 排序
        selectStyle4 (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.paixu.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
            alert('信息更新')
        },
        // 筛选 出发城市
        selectStyle5 (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.chufa.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
            alert("选择了第"+(index+1)+"个")
        },
        // 筛选 产品特色
        selectStyle6 (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.chanpin.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
            alert("选择了第"+(index+1)+"个")
        },

        // slider
        formatTooltip(val) {
            return val / 100;
        },
        saveInfo:function(){
            alert('信息更新')
        },
        reset:function(){
            // 天数
            this.rangeValue = 5
            // 出发月份
            this.monthre = '1'
            this.$nextTick(function () {
                const _this=this;
                // 清楚所有月份选择
                this.month.forEach(function (item) {
                    _this.$set(item,'active',false);
                })
            })
        },
        qiehuan1:function(){
            this.spim1 =! this.spim1
            this.spim2 =! this.spim2
            this.shensuo1 =! this.shensuo1
        },
        qiehuan2:function(){
            this.spim3 =! this.spim3
            this.spim4 =! this.spim4
            this.shensuo2 =! this.shensuo2
        },
        sxsaveInfo:function(){
            alert('信息更新')
        },
        // 筛选 重置按钮
        sxreset:function(){
            this.$nextTick(function () {
                const _this=this;
                // 清楚所有出发城市选择
                this.chufa.forEach(function (item) {
                    _this.$set(item,'active',false);
                })
            })
            this.$nextTick(function () {
                const _this=this;
                // 清楚所有产品选择
                this.chanpin.forEach(function (item) {
                    _this.$set(item,'active',false);
                })
            })
            this.kaisa = false
        },
        // 选择供应商
        pickgys:function(){
            this.kaisa =! this.kaisa
            // if kaisa == true 
        }
    }
}

</script>

<style lang="css" scoped>
    @import 'search.css';
    .active{
        background-color: #008ee5;
        color: #ffffff;
    }
    .mt-range-progress{
        background-color: #ff8100 !important;
    }
    .ac{
        background-color: #00A9f1;
        color: #fff;
    }
    .kk{
        background-image: url("../../../images/tty/对@2x.png");
        background-size: .682667rem .426667rem;
        background-repeat:no-repeat;
        background-position: 14.592rem;
    }
    .kkkpt{
        overflow: hidden;
        z-index: 99999999;
        height: 4.9rem !important;
    }
    .kaisa{
        background-color: #00A9f1;
        color: #fff;
    }
</style>