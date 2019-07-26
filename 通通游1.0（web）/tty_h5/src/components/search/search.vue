<template>
  <section class="search">
    <div v-title data-title="搜索"></div>
    <!-- <p>我是搜索页</p>
    <button @click="back">返回</button>
    <button @click="search">搜索</button>
    <p>搜索历史：</p>
    <button @click="clearSearchHistory">清空</button>
    <ul v-show="searchHistory">
      <li v-for="item in searchHistory">
        <span v-html="item"></span>
        <i class="close" @click="deleteSearchHistory(item)">x</i>
      </li>
    </ul> -->
    
    <div class="topSea">
      <span class="leftjt" @click="back">
        <img src="../../assets/images/icon_back@2x.png">
      </span>
      <div class="searchD">
        <span class="littlefdj">
          <img src="../../assets/images/icon_search.png">
        </span>
        <input class="searchInput" v-model="searchQuery" type="text" placeholder="目的地/关键词">
      </div>
      <span class="clickSea" @click.stop.prevent="searchEnv">搜索</span>
    </div>
    <div class="searchHistoryWrap" v-show="!isSearch">
      <div class="top item">
        <h5 class="title">历史搜索：</h5>
        <img class="selectIcon icon" src="../../assets/images/icon_delete.png" alt="" @click="deleteAll">
      </div>
      <div class="item" v-for="item in searchHistory" v-show="searchHistory.length" @click="goSearch(item)">
        <span v-html="item"></span>
        <span class="closeIcon icon" @click.stop="deleteOne(item)">X</span>
      </div>
    </div>
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    <router-view></router-view>
  </section>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import Loading from 'base/loading/loading'
  import tips from 'base/tips/tips'
  import {searchValue} from 'common/js/mock.js'
  import Scroll from 'base/scroll/scroll'
  import storage from 'good-storage'

  const SEARCH_KEYWORDS = '__searchKeywords__'

  export default {
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
  	data() {
  		return {
        isLoading: false,
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        searchQuery: '',
        isSearch: false,
        productList: []
  		}
  	},
    created() {
      const id = this.$route.query.type
      console.log(id)
      console.log(this.searchHistory)
    },
  	methods: {
      scroll() {},
  		back() {
        this.$router.goBack()
      },
      searchEnv() {
        console.log('搜索内容：')
        console.log(this.searchQuery)

        if (this.searchQuery != '') {
          this.saveSearchHistory(this.searchQuery)
        }

        this._goSearch()
      },
      goSearch(item) {
        console.log(item)
        this.searchQuery = item
        this._goSearch()
      },
      _goSearch() {
        storage.set(SEARCH_KEYWORDS, this.searchQuery)
        this.$router.push('/searchResult')
      },
      deleteOne(item) {
        this.deleteSearchHistory(item)
        this._showTips('删除成功')
      },
      deleteAll() {
        this.clearSearchHistory()
        this._showTips('已清空搜索历史')
      },
      _showTips(text) {
        if (this.timer) return
        this.isShowTips = true
        this.tipsText = text
        this.timer = setTimeout(() => {
          this.isShowTips = false
          this.timer = undefined
          clearTimeout(this.timer)
        }, 1600)
      },
      ...mapActions([
        'deleteSearchHistory',
        'clearSearchHistory',
        'saveSearchHistory'
      ])
      
  	},
    mounted() {
      let id = this.$route.params.id
      switch(id) {
        case '0':
          this.isSearch = false;
          break;
        case '1':
          this.isSearch = true;
          break;
        case '2':
          this.isSearch = true;
          break;
        case '3':
          this.isSearch = true;
          break;
      }
    },
    components: {
      Scroll,
      Loading,
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './search.css';
  .loadImg{
    width: 50px;
    height: 50px;
    display: block;
    margin: 1rem auto;
    z-index: 9999;
    position: fixed;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 12rem;
  }
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
    background-image: url("../../assets/images/对@2x.png");
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
  .search{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
</style>