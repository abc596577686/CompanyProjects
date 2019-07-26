
<template>
    <div>
        <div class="contacts">
            <div class="cont">订单联系人信息 (必填)</div>
            <div class="name">姓名</div>
            <div class="namet"><input type="text" v-model="contactsInfo.name"></div>  
            <div class="phone">手机号</div>
            <div class="phonet"><input type="number" v-model="contactsInfo.phone"></div>
            <div class="email">邮箱</div>
            <div class="emailt"><input type="text" v-model="contactsInfo.email"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
          contactsInfo: {
            type: Object,
            default: {
                name: '无',
                phone: '无',
                email: '无'
            }
          }
        },
        data(){
            return {}
        }
    }

</script>

<style scoped lang="css">
    .contacts{
        width: 100%;
        height: 6.101333rem;
        position: relative;
        background-color: #fff;
    }
    .cont{
        height: .853333rem;
        line-height: .853333rem;
        font-size: .554667rem;
        position: absolute;
        left: .512rem;
        top: .512rem;
        color: #666666;
    }
    .name{
        width: 1.493333rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 2.005333rem;
        left: .554667rem
    }
    .namet{
        width: 4.266667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 2.005333rem;
        left: 2.602667rem;
    }
    .phone{
        width: 2.346667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 3.498667rem;
        left: .554667rem
    }
    .phonet{
        width: 4.266667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 3.498667rem;
        left: 2.602667rem;
    }
    .email{
        width: 2.346667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 5.077333rem;
        left: .554667rem
    }
    .emailt{
        width: 8.106667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 5.077333rem;
        left: 2.602667rem;
    }
</style>
