 <template>
  <div class="bigGif" ref="bigGif">
    <div v-title data-title="收货地址"></div>
    <p class="name">大礼包</p>
  </div>
</template>

<script>
  export default {
  	data(){
      return{
        shopid: ''
      }
    }
  }
</script>

<style lang="css" scoped>
  .name{
    font-size: .5rem;
  }
</style>
