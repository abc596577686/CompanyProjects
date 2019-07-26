<template>
  <section class="messageWrap">
    <div v-if="!message.length" class="tips">暂无信息</div>
  	<ul class="itemWrap" v-if="message.length">
  		<li v-for="msg in message" class="item">
  			<h4 v-html="msg.createTime" class="title"></h4>
  			<el-row :gutter="10">
				  <el-col :span="3">
					  <div class="grid-content bg-purple">
					  	<img :src="msg.image" class="avatar">
					  </div>
					 </el-col>
				  <el-col :span="15">
					  <div class="grid-content bg-purple">
						  <p class="statusText" v-html="msg.title"></p>
						  <p class="desc" v-html="msg.content"></p>
					  </div>
					</el-col>
				</el-row>
  		</li>
  	</ul>
    <el-pagination
      v-if="message.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.count">
    </el-pagination>
  </section>
</template>

<script type="text/ecmascript-6">
  import {getMessage} from 'api';
  import qs from 'qs';

  const DISTRIBUTION_COUNT = 1000;
  const PAGE_SIZE = 5;
  const CURRENT_PAGE = 1;

  export default {
  	data() {
  		return {
  			message: [],
        pagination: {
          count: DISTRIBUTION_COUNT,
          pageSize: PAGE_SIZE,
          currentPage: CURRENT_PAGE
        },
  		}
  	},
    created() {
      let params = qs.stringify({
        rows: PAGE_SIZE,
        page: CURRENT_PAGE
      })
      this._getMessage(params)
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagination.pageSize = val
        this.pagination.currentPage = CURRENT_PAGE;

        let params = qs.stringify({
          rows: this.pagination.pageSize,
          page: this.pagination.currentPage
        })
        console.log(params)

        this._getMessage(params);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        if (this.pagination.currentPage == val) {
          return
        }
        this.pagination.currentPage = val
        
        let params = qs.stringify({
          rows: this.pagination.pageSize,
          page: this.pagination.currentPage
        });

        this._getMessage(params);
      },
      _getMessage(params) {
        getMessage(params).then((res) => {
          console.log(res);
          if (res.state == '-1') {
            if (res.message) {
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '提示',
                message: '获取信息失败',
                type: 'error'
              })
            }
            return
          }
          if (res.state == '1') {
            let data = res.list;
            this.pagination.count = res.total
            this.message = data
          }
        })
        .catch((res) => {
          if (res.response) {
            if (res.response.status == '911') {
              this.$notify({
                title: '提示',
                message: '操作超时，请重新登录',
                type: 'error'
              })
              this.$router.push('/login')
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .tips {
    padding: 20px;
    color: #ccc;
  }
  .avatar{
  	width: 80px;
    min-height: 80px;
  }
  .messageWrap{
    /*padding: 20px 0;*/
    margin-top: -20px;
  }
  .itemWrap{
    /*padding: 0 20px;*/
  }
  .item{
    border-bottom: 10px solid #f5f5f5;
    padding: 0 20px;
    padding-bottom: 20px;
    color: #666;
  }
  .item .title{
    font-size: 13px;
    font-weight: normal;
  }
  .item .statusText{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .item .desc{
    font-size: 14px;

  }
  .el-pagination{
    margin-right: 20px;
  }
</style>