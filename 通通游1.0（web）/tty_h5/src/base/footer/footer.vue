<template>
    <div>
        <div class="pagefoot">
            <router-link :to='{path: menu.url, query:{saleId: saleId}}' class="item" v-for="menu in menus" key="menu">
                <div class="inbt_im" @click="toggle(menus, menu)">
                    <img :src="menu.icon" v-show="!menu.active"> 
                    <img :src="menu.iconActive" v-show="menu.active">  
                </div>
                <div class="inbt_t" v-html="menu.text"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import storage from 'good-storage'

const SALE_ID = '__saleId__'

export default {
    props: {
        type: {
            type: String,
            default: '1'
        }
    },
    data(){
        return{
            saleId: '',
            menus: [
                {
                    text: '首页',
                    url: '/index',
                    icon: require('../../assets/images/icon_home@2x.png'),
                    iconActive: require('../../assets/images/icon_home_active@2x.png'),
                    active: false
                },
                {
                    text: '客服',
                    url: '/custom',
                    icon: require('../../assets/images/icon_custom@2x.png'),
                    iconActive: require('../../assets/images/icon_custom_active@2x.png'),
                    active: false
                },
                {
                    text: '个人中心',
                    url: '/userCenter',
                    icon: require('../../assets/images/people@2x.png'),
                    iconActive: require('../../assets/images/people_fill11@2x.png'),
                    active: false
                }
            ]
        }
    },
    created() {
      this.saleId = storage.get(SALE_ID);
    },
    methods:{
        toggle(menus, menu) {
            menus.forEach((item) => {
                item.active = false
            })
            menu.active = !menu.active
        }
    },
    mounted(){
        if (this.type == '1') {
            this.menus[0].active = true
            this.menus[2].active = false
        }
        if (this.type == '3') {
            this.menus[0].active = false
            this.menus[2].active = true
        }

        
    }
}

</script>

<style lang="css" scoped>
    @import './footer.css';
</style>