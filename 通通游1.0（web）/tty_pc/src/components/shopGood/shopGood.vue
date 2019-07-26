<template>
  <section class="shopGood">
  	<div class="searchWrap">
  		<div class="" style="width:100%;">
  			<el-form :inline="true" label-width="80px" :model="searchForms" class="demo-form-inline">
			  	<el-row :gutter="10">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="产品名称：">
							    <el-input v-model="searchForms.goodName"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="出发地：">
							    <el-input v-model="searchForms.startAddress"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="目的地：">
							    <el-input v-model="searchForms.endAddress"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					</el-row>
			  	<el-row :gutter="10">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="代理佣金：">
							    <el-select v-model="searchForms.proxyPrice" placeholder="全部">
							    	<el-option 
							    		v-for="item in proxyPriceList"
							    		:key="item.value"
							    		:label="item.label"
							    		:value="item.value">
							    	</el-option>
							      <!-- <el-option label="从低到高" value="0"></el-option>
							      <el-option label="从高到低" value="1"></el-option> -->
							    </el-select>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="供应商：">
							    <el-select v-model="searchForms.supplier" placeholder="全部">
							      <!-- <el-option label="凯撒旅游" value="0"></el-option> -->
							      <el-option 
							    		v-for="item in suppliers"
							    		:key="item.value"
							    		:label="item.value"
							    		:value="item.name">
							    	</el-option>
							    </el-select>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="状态：">
							    <el-select v-model="searchForms.goodState" placeholder="全部">
							      <el-option label="售罄" value="0"></el-option>
							      <el-option label="出售中" value="1"></el-option>
							    </el-select>
							  </el-form-item>
					  	</div>
					  </el-col>
					</el-row>
					<el-row :gutter="10">
					  <el-col :span="8">&nbsp;</el-col>
					  <el-col :span="8">&nbsp;</el-col>
					  <el-col :span="8">
					  	<div class="right">
						  	<el-form-item>
						  		<el-button type="primary" @click="searchGoods">搜索</el-button>
						  	</el-form-item>
							</div>
					  </el-col>
					</el-row>
				</el-form>
  		</div>
  	</div>
  	<div class="tableWrap">
	    <el-table
	  		v-loading="loading"
	  		@selection-change="handleSelectionChange"
		    :data="goodsList">
			  <el-table-column
			  	fixed
		      type="selection"
		      width="55">
		    </el-table-column>
			  <el-table-column
			    prop="orderId"
			    label="序号"
			    width="60"
			    sortable>
				</el-table-column>
				<el-table-column style="text-align:center;"
			    prop="imgUrl"
			    label="产品图片"
			    width="">
			    <template slot-scope="scope">
			    	<img @error="imageLoadError(scope.row)" v-show="scope.row.imgUrl" style="width: 80px;padding:0;" :src="scope.row.imgUrl" alt="">
			    	<span v-show="!scope.row.imgUrl"></span>
			    </template>
			  </el-table-column>
				<el-table-column
			    prop=""
			    width="200"
			    label="产品名称">
			    <template slot-scope="scope">
			    	<router-link :to="'/goodDetails/' + scope.row.productId" :alt="scope.row.departPlace + scope.row.travelDays + '天' + scope.row.toPlaceCountry + scope.row.title">
			    		<p v-html="`【${scope.row.departPlace}】${scope.row.title} ${scope.row.travelDays}天 `" class="line-02 href" style="text-align:left;"></p>
			    	</router-link>
			    </template>
			  </el-table-column>
				<el-table-column
			    prop="departPlace"
			    width=""
			    label="出发地">
			  </el-table-column>
				<el-table-column
			    prop="toPlaceCountry"
			    width=""
			    label="目的地">
			    <template slot-scope="scope">
			    	<p v-html="scope.row.toPlaceCountry" class="line-02" :class="{'toPlace': scope.row.toPlaceCountry.length <= 4}"></p>
			    </template>
			  </el-table-column>
				<el-table-column
			    prop="travelDays"
			    width=""
			    label="出行天数">
			  </el-table-column>
				<el-table-column
			    prop="adultPrice"
			    width=""
			    label="预估最近出团价格">
			  </el-table-column>
				<el-table-column
			    prop="distFee"
			    width=""
			    label="预估代理佣金">
			  </el-table-column>
				<el-table-column
			    prop="distFeeRatio"
			    width=""
			    label="佣金比例">
			  </el-table-column>
			  <el-table-column
			    prop="productStatus"
			    width=""
			    label="状态">
			    <template slot-scope="scope">
			    	<p v-show="scope.row.productStatus == '1'">出售中</p>
			    	<p v-show="scope.row.productStatus == '0'">售罄</p>
			    </template>
			  </el-table-column>
				<el-table-column
			    prop="supName"
			    width=""
			    label="供应商">
			  </el-table-column>

			  <el-table-column
			    fixed="right"
			    width="150"
			    label="操作">
			    <template slot-scope="scope">
			      <el-button type="text" icon="edit" @click="callOf(scope.row)">取消代理</el-button>
			    </template>
			  </el-table-column>
			</el-table>
		</div>
		<div class="footerContent">
			<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pagination.currentPage"
	      :page-sizes="[5, 10, 15, 20]"
	      :page-size="pagination.pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pagination.count">
	    </el-pagination>
			<el-button class="bottom-btn" type="primary" icon="edit" @click="callOfForMore">批量取消代理</el-button>
		</div>

  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getGoodsList, getGoodsListForRequire, cancelProxy} from 'api';

	const GOOD_COUNT = 1000;
	const PAGE_SIZE = 5;
	const CURRENT_PAGE = 1;

	const DEFAULT_IMG = require('../../assets/images/default_productImg.png')
	
  export default {
  	data() {
  		return {
  			loading: true,
  			searchForms: {
  				goodName: '',
  				startAddress: '',
  				endAddress: '',
  				proxyPrice: '',
  				supplier: '',
  				goodState: ''
  			},
  			goodsList: null,
  			multipleSelection: [],
  			pagination: {
  				count: GOOD_COUNT,
  				pageSize: PAGE_SIZE,
  				currentPage: CURRENT_PAGE
  			},
  			proxyPriceList: [],
  			// 产品经理说：目前供应商只有一个
  			suppliers: [],
  			curGood: {},
  			curGoods: []
  		}
  	},
  	created() {

  	},
  	methods: {
      imageLoadError(good) {
        good.imgUrl = DEFAULT_IMG
      },
  		searchGoods() {
  			let params = qs.stringify({
  				title: this.searchForms.goodName,
	  			departPlace: this.searchForms.startAddress,
	  			toPlaceCountry: this.searchForms.endAddress,
	  			productStatus: this.searchForms.goodState,
	  			orderby: this.searchForms.proxyPrice,
	  			rows: PAGE_SIZE,
	  			page: CURRENT_PAGE
  			});
  			
  			this._getGoodsList(params);
  		},
  		handleSelectionChange(val) {
  			console.log(val);
        this.multipleSelection = val;
      },
      callOf(goods) {
      	this.$confirm('确定要取消代理吗？', '提示', {
    			confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
    		}).then(() => {
	      	this._cancelProxy(goods);
				})
      },
      _cancelProxy(goods) {
      	console.log(goods);
      	let params = {}, arr = [];
      	if (!goods.length) {
      		params = qs.stringify({
      			productIds: goods.productId,
      			state: '0'
      		})
      	} else {
	      	goods.forEach((good) => {
	      		let productId = good.productId;
	      		arr.push(productId)
	      	})
      		params = qs.stringify({
      			productIds: arr.toString(),
      			state: '0'
      		})
      	}
      	console.log(params);
				cancelProxy(params).then((res) => {
					console.log(res)
					if (res.state == '1') {
						this.$notify({
              title: '提示',
              message: '操作成功',
              type: 'success'
            })
            this.goodsList = []
            let params = qs.stringify({
			  			page: CURRENT_PAGE,
			  			rows: PAGE_SIZE
			  		})
			  		
			  		this._getGoodsList(params);
					}
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
                message: '操作失败，待会再试 ^_^',
                type: 'error'
              })
            }
          }
				})
      },
      callOfForMore() {
      	if (this.multipleSelection.length != 0) {
      		this.callOf(this.multipleSelection);
      	} else {
      		this.$message({
            type: 'info',
            message: '请选择要取消代理的产品'
          });
      	}
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagination.pageSize = val
        this.pagination.currentPage = CURRENT_PAGE

        let params = qs.stringify({
        	rows: this.pagination.pageSize,
        	page: this.pagination.currentPage
        })
        this._getGoodsList(params);
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
        })
        this._getGoodsList(params);
      },
      _getGoodsList(params) {
	    	this.goodsList = []
	    	this.loading = true

  			setTimeout(() => {
	    		getGoodsList(params).then((res) => {
	    			console.log(res);
	    			if (res.state == '1') {
		    			this.loading = false;
		    			this.pagination.count = res.total;
		    			let data = res.list
		    			data.forEach((good, index) => {
		    				good.orderId = index + 1;
		    				if (good.imgUrl == '' || !good.imgUrl) {
		    					good.imgUrl = DEFAULT_IMG
		    				}
		    				// 计算佣金比例
		    				let adultPrice = good.adultPrice
                let distFee = good.distFee

                if (distFee == 0 || adultPrice == 0) {
                	good.distFeeRatio = 0
                	return
                }
                let distFeeRatio = (distFee / adultPrice) * 100
                good.distFeeRatio = distFeeRatio.toFixed(2)

		    				// 产品经理说： 目前只有一个供应商，写死就行!
		    				// good.supplier = '凯撒';
		    			});
		    			this.goodsList = data;

		    			// 产品经理说： 写死！
		    			this.proxyPriceList = [
			    			{
			  					value: '2',
			  					label: '从低到高'
			  				},
			  				{
			  					value: '-2',
			  					label: '从高到低'
			  				}
			  			]

			  			// 遍历供应商
			  			this.suppliers = [];
			  			res.supplier.forEach((supplier) => {
			  				this.suppliers.push(supplier);
			  			})
	    			}
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
	                message: '亲，出错了，获取数据失败 ^_^',
	                type: 'error'
	              })
	            }
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
	    	}, 1000)
      }
  	},
  	mounted() {
  		let params = qs.stringify({
  			page: CURRENT_PAGE,
  			rows: PAGE_SIZE
  		})
  		
  		this._getGoodsList(params);
  	}
  }
</script>

<style scoped>
	.toPlace{
		display: flex;
		align-items: center;
	}
  .shopGood{
  	width: 100%;
  	margin: 20px 0;
  }
  .footerContent{
  	position: relative;
  }
  .searchWrap{
  	width: 100%;
  	display: flex;
  	padding: 0 20px;
  	border-bottom: 12px solid #f5f5f5;
  }
  .searchWrap .left{
  	flex: 1;
  }
  .searchWrap .right{
  	padding-right: 20px;
  	text-align: right;
  }
  .shopName{
  	line-height: normal;
  	cursor: pointer;
  	color: #333;
  }

</style>