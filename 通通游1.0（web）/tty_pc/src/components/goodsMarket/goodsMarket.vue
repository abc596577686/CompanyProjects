<template>
  <section class="goodsMarket">
  	<el-form :inline="true" :model="fuzzySearch" class="demo-form-inline">
		  <el-form-item class="searchInput">
		    <el-input v-model="fuzzySearch.keyword" placeholder="请输入关键词"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="search">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-form :model="requirement" class="selectList">
			<el-form-item label="您已选择：">
		    <el-tag
				  v-for="(tag, index) in dynamicTags"
				  key="tag"
				  closable
				  :disable-transitions="true"
				  v-show="tag"
				  @close="handleClose(tag, index)">
				  {{tag}}
				</el-tag>
		  </el-form-item>
		  <el-form-item label="出发城市：" v-show="condition.showCity">
		    <el-radio-group v-model="requirement.startCity" @change="cityChange">
		      <el-radio-button v-for="city in startCity" :label="city" key="city">{{city.value}}</el-radio-button>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="目的地国家：" v-show="condition.showCountry">
		    <el-radio-group v-model="requirement.endCountry" @change="countryChange">
		    	<el-radio-button v-for="country in countrys" :label="country" key="country">{{country.countryName}}</el-radio-button>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="出行天数：" v-show="condition.showDays">
		    <el-radio-group v-model="requirement.travelDays" @change="dayChange">
		      <el-radio-button v-for="day in days" :label="day" key="day">{{day.name}}</el-radio-button>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="供货商：" v-show="condition.showSupplier">
		    <el-radio-group v-model="requirement.supplier" @change="supplierChange">
		      <el-radio-button v-for="supplier in suppliers" :label="supplier" key="supplier">{{supplier.value}}</el-radio-button>
		    </el-radio-group>
		  </el-form-item>
		</el-form>
    <el-table
    		v-loading="loading"
    		@selection-change="handleSelectionChange"
		    :data="goodsList"
		    style="width:100%;font-size:12px;">
		  <el-table-column
		  	fixed
	      type="selection"
	      width="55">
	    </el-table-column>
		  <el-table-column
		    prop="orderNumber"
		    label="序号"
		    width="100"
		    sortable>
			</el-table-column>
			<el-table-column style="text-align:center;"
		    prop="imgUrl"
		    label="产品图片"
		    width="100">
		    <template slot-scope="scope">
		    	<span v-show="!scope.row.imgUrl">无</span>
		    	<img @error="imageLoadError(scope.row)" v-show="scope.row.imgUrl" style="width: 80px;padding:0;" :src="scope.row.imgUrl" alt="">
		    </template>
		  </el-table-column>
			<el-table-column
		    prop="title"
		    width="150"
		    label="产品名称">
		    <template slot-scope="scope">
		    	<router-link 
		    		class="shopName" 
		    		:to="'/goodDetails/' + scope.row.productId" >
            <p v-html="`${scope.row.departPlace} ${scope.row.title} ${scope.row.travelDays}天 `" class="line-02 href"></p>
		    	</router-link>
		    </template>
		  </el-table-column>
			<el-table-column
		    prop="departPlace"
		    width="100"
		    label="出发地">
		  </el-table-column>
			<el-table-column
		    prop="toPlaceCountry"
		    width="100"
		    label="目的地">
        <template slot-scope="scope">
          <p v-html="scope.row.toPlaceCountry" class="line-02" :class="{'toPlace': scope.row.toPlaceCountry.length <= 4}"></p>
        </template>
		  </el-table-column>
			<el-table-column
		    prop="travelDays"
		    width="100"
		    label="出行天数">
		  </el-table-column>
			<el-table-column
		    prop="adultPrice"
		    width="100"
		    label="预估最近出团价格">
		  </el-table-column>
			<el-table-column
		    prop="distFee"
		    width="100"
		    label="预估代理佣金">
		  </el-table-column>
			<el-table-column
		    prop="distFeeRatio"
		    width="100"
		    label="佣金比例">
		  </el-table-column>
			<el-table-column
		    prop="supName"
		    width="100"
		    label="供应商">
		  </el-table-column>

		  <el-table-column
		    fixed="right"
		    width="150"
		    label="操作">
		    <template slot-scope="scope">
          <el-button v-show="scope.row.agencyTag == '0'" type="text" icon="edit" @click="callOf(scope.row)">代理</el-button>
		      <el-button v-show="scope.row.agencyTag == '1'" type="text" icon="edit" @click="cancelPloxy(scope.row)">取消代理</el-button>
		    </template>
		  </el-table-column>
		</el-table>
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
			<el-button class="bottom-btn" type="primary" icon="edit" @click="callOfForMore">批量代理</el-button>
		</div>
  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getGoodsListForMarket, getCityList, proxy, cancelProxy} from 'api';

	const GOOD_COUNT = 10;
	const PAGE_SIZE = 5;
	const CURRENT_PAGE = 1;

  const DEFAULT_IMG = require('../../assets/images/default_productImg.png')
	
  export default {
  	data() {
  		return {
  			loading: true,
  			fuzzySearch: {
  				keyword: ''
  			},
  			requirement: {
  				startCity: '',
  				endCountry: '',
  				travelDays: '',
  				supplier: ''
  			},
  			dynamicTags: [],
  			goodsList: null,
  			multipleSelection: [],
  			pagination: {
  				count: GOOD_COUNT,
  				pageSize: PAGE_SIZE,
  				currentPage: CURRENT_PAGE
  			},
  			condition: {
  				showCity: true,
	  			showCountry: true,
	  			showDays: true,
	  			showSupplier: true
  			},
  			startCity: [],
  			countrys: [],
  			suppliers: [],
  			days: [
	  			{
	  				name: '1-5天',
	  				code: '1',
	  			},{
	  				name: '6-9天',
	  				code: '2',
	  			},{
	  				name: '10-15天',
	  				code: '3',
	  			},{
	  				name: '16-20天',
	  				code: '4',
	  			},{
	  				name: '21天及以上',
	  				code: '5',
	  			}
  			],
  			requireCity: '',
  			requireCounty: '',
  			travelDaysMin: '',
  			travelDaysMax: '',
  			requireSupplier: ''
  		}
  	},
    created() {
      let params = qs.stringify({
        rows: PAGE_SIZE,
        page: CURRENT_PAGE,
      })
      
      this._getGoodsListForMarket(params)
      this._getCityList();
    },
  	methods: {
      imageLoadError(good) {
        good.imgUrl = DEFAULT_IMG
      },
  		handleClose(tag, index) {
  			this.dynamicTags[index] = null;
  			if (index == '0') {
  				this.requirement.startCity = '';
  				this.requireCity = '';
  				this.condition.showCity = true;
  			}
  			if (index == '1') {
  				this.requirement.travelDays = '';
  				this.travelDaysMin = '';
  				this.travelDaysMax = '';
  				this.condition.showDays = true;
  			}
  			if (index == '2') {
  				this.requirement.endCountry = '';
  				this.requireCounty = '';
  				this.condition.showCountry = true;
  			}
  			if (index == '3') {
  				this.requirement.supplier = '';
  				this.requireSupplier = '';
  				this.condition.showSupplier = true;
  			}

  			let params = qs.stringify({
  				departPlaceCode: this.requireCity,
  				travelDaysMin: this.travelDaysMin,
  				travelDaysMax: this.travelDaysMax,
  				toPlaceCountryCode: this.requireCounty,
          supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
  				rows: this.pagination.pageSize,
      		page: CURRENT_PAGE
  			});
  			this._getGoodsListForMarket(params);
  		},
  		cityChange(val) {
  			console.log(val)
  			this.dynamicTags[0] = `出发城市：${val.value}`;
  			this.condition.showCity = false;
  			this.requireCity = val.name;

  			let params = qs.stringify({
  				departPlaceCode: this.requireCity,
  				travelDaysMin: this.travelDaysMin,
  				travelDaysMax: this.travelDaysMax,
  				toPlaceCountryCode: this.requireCounty,
          supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
  				rows: this.pagination.pageSize,
      		page: CURRENT_PAGE
  			});
  			this._getGoodsListForMarket(params);
  		},
  		countryChange(val) {
  			// console.log(val);
  			this.dynamicTags[2] = `目的地国家：${val.countryName}`;
  			this.condition.showCountry = false;
  			this.requireCounty = val.countryCode;

  			let params = qs.stringify({
  				departPlaceCode: this.requireCity,
  				travelDaysMin: this.travelDaysMin,
  				travelDaysMax: this.travelDaysMax,
  				toPlaceCountryCode: this.requireCounty,
          supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
  				rows: this.pagination.pageSize,
      		page: CURRENT_PAGE
  			});
  			this._getGoodsListForMarket(params);
  		},
  		dayChange(val) {
  			// console.log(val);
  			this.dynamicTags[1] = `出行天数：${val.name}`;
  			this.condition.showDays = false;
  			this.travelDaysMin = this._judgeDay(val.code).min;
  			this.travelDaysMax = this._judgeDay(val.code).max;

  			let params = qs.stringify({
  				departPlaceCode: this.requireCity,
  				travelDaysMin: this.travelDaysMin,
  				travelDaysMax: this.travelDaysMax,
  				toPlaceCountryCode: this.requireCounty,
          supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
  				rows: this.pagination.pageSize,
      		page: CURRENT_PAGE
  			});
  			this._getGoodsListForMarket(params);

  		},
  		supplierChange(val) {
  			// console.log(val);
  			this.dynamicTags[3] = `供应商：${val.value}`;
  			this.condition.showSupplier = false;
  			this.requireSupplier = val.name;

  			let params = qs.stringify({
  				departPlaceCode: this.requireCity,
  				travelDaysMin: this.travelDaysMin,
  				travelDaysMax: this.travelDaysMax,
  				toPlaceCountryCode: this.requireCounty,
  				supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
  				rows: this.pagination.pageSize,
      		page: CURRENT_PAGE
  			});
  			this._getGoodsListForMarket(params);

  		},
  		handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      callOfForMore() {
      	if (this.multipleSelection.length != 0) {
      		this.callOf(this.multipleSelection);
      	} else {
      		this.$message({
            type: 'info',
            message: '请选择要代理的产品'
          });
      	}
      },
      callOf(goods) {
      	this.$confirm('确定要代理吗？', '提示', {
    			confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
    		}).then(() => {
    			this._proxy(goods);
				})
      },
      cancelPloxy(goods) {
        this.$confirm('确定要取消代理吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._cancelProxy(goods);
        })
      },
      search() {
      	let params = qs.stringify({
          departPlaceCode: this.requireCity,
          travelDaysMin: this.travelDaysMin,
          travelDaysMax: this.travelDaysMax,
          toPlaceCountryCode: this.requireCounty,
          supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
      		rows: PAGE_SIZE,
		      page: CURRENT_PAGE
      	})
	      
      	this._getGoodsListForMarket(params);
      },
      _judgeDay(code) {
      	switch(code) {
      		case '1':
      			return {min: 1, max: 5}
      			break
      		case '2':
      			return {min: 6, max: 9}
      			break
      		case '3':
      			return {min: 10, max: 15}
      			break
      		case '4':
      			return {min: 16, max: 20}
      			break
      		case '5':
      			return {min: 21, max: 99}
      			break
      	}
      },
      _cancelProxy(goods) {
        console.log(goods);
        let params = {}, arr = [];
        params = qs.stringify({
          productIds: goods.productId,
          state: '0'
        })
        console.log(params);
        cancelProxy(params).then((res) => {
          console.log(res)
          if (res.state == '1') {
            this.$notify({
              title: '提示',
              message: '取消代理成功',
              type: 'success'
            })
            let params = qs.stringify({
              departPlaceCode: this.requireCity,
              travelDaysMin: this.travelDaysMin,
              travelDaysMax: this.travelDaysMax,
              toPlaceCountryCode: this.requireCounty,
              supId: this.requireSupplier,
              keyword: this.fuzzySearch.keyword,
              page: this.pagination.currentPage,
              rows: PAGE_SIZE
            })
            
            this._getGoodsListForMarket(params);
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
      _proxy(goods) {
      	let params = {}, arr = [];
      	if (!goods.length) {
      		console.log('单个');
      		params = qs.stringify({
      			productIds: goods.productId,
      			state: '1'
      		})
      	} else {
      		console.log('多个');
	      	goods.forEach((good) => {
	      		let productId = good.productId;
	      		arr.push(productId)
	      	})
      		params = qs.stringify({
      			productIds: arr.toString(),
      			state: '1'
      		})
      	}
      	console.log(params);
				proxy(params).then((res) => {
					console.log(res)
					if (res.state != '1') {
            if (res.message) {
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '提示',
                message: '设置失败',
                type: 'error'
              })
            }
					}
          if (res.state == '1'){
						this.$notify({
							title: '提示',
							message: '代理成功',
							type: 'success'
						})

            let params = qs.stringify({
              departPlaceCode: this.requireCity,
              travelDaysMin: this.travelDaysMin,
              travelDaysMax: this.travelDaysMax,
              toPlaceCountryCode: this.requireCounty,
              supId: this.requireSupplier,
              keyword: this.fuzzySearch.keyword,
              page: this.pagination.currentPage,
              rows: PAGE_SIZE
            })

            this._getGoodsListForMarket(params)
            this._getCityList();
					}
				})
        .catch((res) => {
          if (res.code == '911') {
            this.$notify({
              title: '提示',
              message: '操作超时，请重新登录',
              type: 'error'
            })
            this.$router.push('/login')
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        if (this.pagination.pageSize == val) {
          return
        }
        this.pagination.pageSize = val
        this.pagination.currentPage = CURRENT_PAGE

        let params = qs.stringify({
          departPlaceCode: this.requireCity,
          travelDaysMin: this.travelDaysMin,
          travelDaysMax: this.travelDaysMax,
          toPlaceCountryCode: this.requireCounty,
          supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
        	rows: this.pagination.pageSize,
        	page: this.pagination.currentPage
        });
        
        this._getGoodsListForMarket(params);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
				if (this.pagination.currentPage == val) {
					return
				}
				this.pagination.currentPage = val

        let params = qs.stringify({
          departPlaceCode: this.requireCity,
          travelDaysMin: this.travelDaysMin,
          travelDaysMax: this.travelDaysMax,
          toPlaceCountryCode: this.requireCounty,
          supId: this.requireSupplier,
          keyword: this.fuzzySearch.keyword,
        	rows: this.pagination.pageSize,
        	page: this.pagination.currentPage
        });
        
        this._getGoodsListForMarket(params);
      },
      _getGoodsListForMarket(params) {
        console.log(params);
        this.goodsList = []
        this.loading = true

        setTimeout(() => {
       	  getGoodsListForMarket(params).then((res) => {
            if (res.state == '1') {
         	  	this.loading = false;
    					console.log(res);
    					this.pagination.count = res.total
    					let data = res.list;
    					data.forEach((good, index) => {
    						good.orderNumber = index + 1;
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

    					})
    					this.goodsList = data;
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
            if (res.code == '911') {
              this.$notify({
                title: '提示',
                message: '操作超时，请重新登录',
                type: 'error'
              })
              this.$router.push('/login')
            }
          })

        }, 1000)
				
      },
      _getCityList() {
      	getCityList().then((res) => {
     	  	console.log(res);
     	  	this.startCity = res.departCity
     	  	this.countrys = res.coutryList
     	  	this.suppliers = res.supplier
				})
				.catch((res) => {
          if (res.code == '911') {
            this.$notify({
              title: '提示',
              message: '操作超时，请重新登录',
              type: 'error'
            })
            this.$router.push('/login')
          }
        })
      }
  	},
    mounted() {

      // this.goodsList.forEach((good) => {
      //   let curImg = good.imgUrl

      //   if (good.imgUrl) {

      //   }
      // })
      // console.log()
    }
  }
</script>

<style scoped>
  .toPlace{
    display: flex;
    align-items: center;
  }
  .goodsMarket{
  	width: 100%;
    padding: 20px;
  }
  .goodsMarket .searchInput{
    width: 260px;
  }
  .goodsMarket .shopName{
    color: #008EE5;
  }
  .href{
    text-align: left;
  }
  .footerContent{
  	position: relative;
  }
  .radioAni-enter-active{
  	transition: all 1.3s
  }
  .radioAni-enter{
  	opacity: 0;
  	transform: translate3d(0, 10px, 0);
  }
</style>