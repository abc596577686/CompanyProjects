<template>
    <section class="selectDate">
        <div class="topBar">
            <div class="back" @click="back"><img src="../../images/tty/icon_back@2x.png"></div>
            <h4 class="title">选择出发日期和人数</h4>
        </div>
        <scroll
            @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            class="container"
            ref="selectDate">
            <div>
                <calendar :events="calendarDate.events" :range="calendarDate.range" :lunar="calendarDate.lunar" :value="calendarDate.value" :begin="calendarDate.begin" :end="calendarDate.end" @select="calendarDate.select"></calendar>
                <!-- <span class="gte"></span> -->
                <div class="selectDetails">
                    <div class="title">
                        <span class="text">选择出行人数</span>
                        <span class="toInfo" @click="isShowLayer = true">价格说明</span>
                    </div>
                    <div class="content">
                        <div class="item adult">
                            <div style="display:inline-block;">
                                <span class="label">成人
                                    <span class="price">¥<em v-html="price.adultPrice"></em>/人</span>
                                </span>
                                <div class="takeCount">
                                    <span class="reduce handle" :class="{disabled: adultDisabled}" @click="reduce(1)">-</span>
                                    <input type="number" :value="num.adult">
                                    <span class="add handle" @click="add(1)">+</span>
                                </div>
                            </div>
                        </div>
                        <div class="item children">
                            <div style="display:inline-block;">
                                <span class="label">儿童
                                    <span class="price">¥<em v-html="price.childrenPrice"></em>/人</span>
                                </span>
                                <div class="takeCount">
                                    <span class="reduce handle" :class="{disabled: childrenDisabled}" @click="reduce(2)">-</span>
                                    <input type="number" :value="num.children">
                                    <span class="add handle" @click="add(2)">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="gte"></span>
            </div>
        </scroll>
        <div class="botterWrap">
            <div class="remarkBox">
                <p>订单总计：¥ <span class="price" v-html="price.countPrice"></span></p>
                <p class="right"><img src="../../images/tty/icon_descript@2x.png"><span @click="showOffcial">费用说明</span></p>
            </div>
            <div class="btn" @click="reservationInfo">下一步</div>
        </div>

        <transition name="fadeIn">
            <masks v-show="isShowLayer"></masks>
        </transition>
        <transition name="slideIn">
            <explain @cancel="isShowLayer = false" v-show="isShowLayer"></explain>
        </transition>
        <transition name="sideSlip">
            <offcial @back="isShowOffcial = false" v-show="isShowOffcial" ref="offcial"></offcial>
        </transition>

    </section>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'common/scroll';
    import calendar from './calendar.vue';
    import mask from 'common/mask';
    import explain from 'common/explain';
    import offcial from 'common/offcial';
    console.log(mask);

    const num = 10;
    const price = 698;
    const ticket = `余>${num}`;
    const minPrice = `${price}起`
    const DATE = new Date()

    export default {
        created() {
            this.probeType = 3
            this.listenScroll = true
        },
        data(){
            return{
                isShowLayer: false,
                isShowOffcial: false,
                today: {
                    year: '2017',
                    month: '11',
                    day: '20'
                },
                calendarDate:{
                    range: false,
                    // value:[[2017,11,21],[2017,11,26]], //默认日期
                    lunar: false, //显示农历
                    // begin: [this.today.year, this.today.month, this.today.day], //可选开始日期
                    begin: [2017, 11, 3], //可选开始日期
                    end: [2999,1,1], //可选结束日期
                    events: {
                        // '2017-11-22': `${ticket}\n${minPrice}`,
                        // '2017-11-28':`${ticket}\n${minPrice}`,
                    },
                    zero: true,
                    select(begin,end) {
                        console.log(begin.toString());
                    }
                },
                price: {
                    adultPrice: '1.90',
                    childrenPrice: '0.30',
                    countPrice: '0'
                },
                adultDisabled: false,
                childrenDisabled: false,
                num: {
                    adult: '2',
                    children: '1'
                }
            }
        },
        mounted(){
            this.count();
        },
        watch:{

        },
        components: {
            Scroll,
            calendar,
            explain,
            masks: mask,
            offcial
        },
        methods:{
            scroll() {},
            refresh(){
                this.$refs.selectDate.refresh();
            },
            showOffcial() {
                this.isShowOffcial = true;
                setTimeout(() => {
                    this.$refs.offcial.refresh();      
                }, 500);
            },
            reservationInfo() {
                this.$router.push({
                    path: '/reservationInfo'
                })
            },
            // 人数减少
            reduce(type) {
                this.num.adult = Number(this.num.adult)
                this.num.children = Number(this.num.children)

                switch(type) {
                    case 1:
                        if (this.adultDisabled) return;
                        this.num.adult -= 1;
                        break;
                    case 2:
                        if (this.childrenDisabled) return;
                        this.num.children -= 1;
                        break;
                }
                if (this.num.adult == 0) {
                    this.adultDisabled = true;
                }
                if (this.num.children == 0) {
                    this.childrenDisabled = true;
                }

                this.count();
            },
            // 人数增加
            add(type) {
                this.num.adult = Number(this.num.adult)
                this.num.children = Number(this.num.children)

                switch(type) {
                    case 1:
                        this.num.adult += 1;
                        this.adultDisabled = false;
                        break;
                    case 2:
                        this.num.children += 1;
                        this.childrenDisabled = false;
                        break;
                }
                this.count();
            },
            count() {
                // 计算总价
                let adultCountPrice = this.price.adultPrice * 100 * this.num.adult;
                let childrenCountPrice = this.price.childrenPrice * 100 * this.num.children;
                let countPrice = (adultCountPrice + childrenCountPrice).toFixed(2) / 100
                console.log(countPrice);
                this.price.countPrice = countPrice;
            },
            back() {
                // this.$emit('back');
                this.$router.goback();
            },
            _dateFormate(date) {
                let dateFormate = DATE;
                let year = dateFormate.getFullYear();
                let month = dateFormate.getMonth() + 1;
                let day = dateFormate.getDate();
                let hour = dateFormate.getHours();
                let min = dateFormate.getMinutes();
                let second = dateFormate.getSeconds();

                if (month < 10) {
                  month = '0' + month;
                }
                if (day < 10) {
                  day = '0' + day;
                }
                if (hour < 10) {
                    hour = '0' + hour
                }
                if (min < 10) {
                    min = '0' + min
                }
                if (second < 10) {
                    second = '0' + second
                }

                return `${year}-${month}-${day} ${hour}:${min}:${second}`
              },
        }
    }

</script>

<style lang="css" scoped>
    @import './selectDate.css';
</style>