<template>
  <div id="app">
  	<keep-alive include="home">
	    <router-view/>
	  </keep-alive>
  </div>
</template>

<script>

  export default {

  }

</script>

<style lang="css" scoped>
	#app{
		position: absolute;
		width: 100%;
    height: 100%;
	}
</style>
