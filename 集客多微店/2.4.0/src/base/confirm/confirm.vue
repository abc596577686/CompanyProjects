 <template>
  <section class="confirmWrap" :class="{'fixed': productDetails}">
    <div class="confirmBox">
      <div class="top">
        <p>设置短信提醒</p>
      </div>
      <div class="content">
        <p>请留下您的手机号码，商品开抢前会第一时间通知您。</p>
        <div class="inputWrap">
          <input v-model="mobileVal" type="phone" placeholder="您的手机号" @keyup="keyupEnv">
        </div>
      </div>
      <div class="foot">
        <div class="btn cancel" @click="cancenEnv">取消</div>
        <div class="btn confirm" :class="{'disabled': isDisabled}" @click="confirmEnv">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      userMobile: {
        type: String,
        default: ''
      },
      productDetails: {
        type: Boolean,
        default: false
      }
    },
  	data(){
      return{
        isDisabled: true,
        mobileVal: ''
      }
    },
    watch:{
      userMobile() {
        this.mobileVal = this.userMobile
        if (this.mobileVal.length) {
          this.isDisabled = false
        }
        console.log('用户手机号：------123')
        console.log(this.mobileVal)
      }
    },
    created() {
      // this.mobileVal = this.userMobile
      console.log(this.mobileVal)
      console.log('用户手机号：------')
    },
    methods: {
      keyupEnv(val) {
        console.log(val.target.value)
        if (val.target.value == '') {
          this.isDisabled = true
        } else {
          this.isDisabled = false
        }
      },
      confirmEnv() {
        if (this.isDisabled) {
          return
        } else {
          this.$emit('confirm', this.mobileVal)
          // this.$emit('hideConfirm')
        }
      },
      cancenEnv() {
        this.$emit('hideConfirm')
      }

    }
  }
</script>

<style lang="css" scoped>
  .confirmWrap{
    position: absolute;
    left: 0 ;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 99999;
  }
  .confirmWrap.fixed{
    position: fixed;
  }
  .confirmBox{
    position: absolute;
    width: 12rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 50%;
    margin-top: -25%;
    background: #fff;
    font-size: .7rem;
    border-radius: 7px;
  }
  .top{
    padding-top: .8rem;
    padding-bottom: .3rem;
    margin-bottom: .1rem;
    text-align: center;
    font-weight: bold;
    font-size: .8rem;
  }
  .content{
    padding: 0 .6rem;
    text-align: left;
  }
  .content p{
    font-size: .6rem;
    line-height: 1.3;
    margin-bottom: .5rem;
  }
  .content .inputWrap{
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .content .inputWrap input{
    width: 100%;
    margin: 0;
    padding: .3rem;
    display: block;
    text-align: left;
    border-radius: 3px;
    font-size: .6rem;
    letter-spacing: 1px;
    outline: none;
  }
  .foot{
    width: 100%;
    margin-top: 1rem;
    margin-bottom: .6rem;
    font-size: .7rem;
    padding: 0 .6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .foot .btn{
    width: 5rem;
    padding: .3rem 0;
    text-align: center;
    display: inline-block;
    float: left;
    color: #f02f3b;
    position: relative;
  }
  .foot .btn:after{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: -100%;
    bottom: -100%;
    transform: scale(.5);
    transform-origin: 0 0;
    border: 1px solid #f02f3b;
    border-radius: 10px;
    background-clip: border-box;
  }
  .foot .btn:nth-child(2n+1) {
    /*border-right: 1px solid #ccc;*/
  }
  .foot .btn.confirm{
    background: #f02f3b;
    color: #fff;
  }
  .foot .btn.disabled{
    color: #e6e6e6;
    background-color: #ccc;
  }
  .foot .btn.disabled:after{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: -100%;
    bottom: -100%;
    transform: scale(.5);
    transform-origin: 0 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-clip: border-box;
  }


</style>
