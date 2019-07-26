<template>
  <div class="shade" @click="touchEnv"></div>
</template>

<script>
  export default {
    data(){
      return{
      }
    },
    created(){
    },
    methods: {
      touchEnv() {
        this.$emit('touchEnv')
      }
    }
  }

</script>

<style lang="css" scoped>
  .shade{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgba(0,0,0,.5);
  }
  .shade {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .shade.viewMoreAni-enter, .shade.viewMoreAni-leave-active{
    opacity: 0;
  }
  .shade.viewMoreAni-leave-active, .shade.viewMoreAni-enter{
    opacity: 1;
  }
</style>
