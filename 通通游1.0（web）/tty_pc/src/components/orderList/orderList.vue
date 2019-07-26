<template>
  <section class="orderList">

	  <div class="searchWrap">
  		<div style="width:100%;">
  			<el-form :inline="true" label-width="90px" :model="searchForms" class="demo-form-inline">
			  	<el-row :gutter="0">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="订单号：">
							    <el-input v-model="searchForms.orderNumber"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="13" class="dateWrap">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="下单时间：">
							    <!-- <el-date-picker
					          class="selectDate"
					          type="datetime"
					          v-model="selectDate"
					          @change="dateChange"
					          :picker-options="pickerOptions"
					          placeholder="选择日期">
					        </el-date-picker> -->

					        <el-date-picker
                    class="selectDate"
                    type="date"
                    v-model="selectDate"
                    :picker-options="pickerOptions"
                    @change="dateChange"
                    placeholder="选择日期">
                  </el-date-picker>

					        至
					        <!-- <el-date-picker
					          class="selectDate"
					          type="datetime"
					          v-model="selectDateForEnd"
					          @change="dateChangeForEnd"
					          :picker-options="pickerOptions"
					          placeholder="选择日期">
					        </el-date-picker> -->

					        <el-date-picker
                    class="selectDate"
                    type="date"
                    v-model="selectDateForEnd"
                    :picker-options="pickerOptions"
                    @change="dateChangeForEnd"
                    placeholder="选择日期">
                  </el-date-picker>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="2">
					  	<div class="right">
						  	<el-button type="primary" @click="searchGoods">搜索</el-button>
							</div>
					  </el-col>
					</el-row>
			  	<el-row :gutter="0">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="产品名称：">
							    <el-input v-model="searchForms.goodName"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="订单状态：">
							    <el-select v-model="searchForms.orderStatus" placeholder="选择订单状态">
							      <el-option label="全部" value="0"></el-option>
							      <el-option label="待付款" value="1"></el-option>
							      <el-option label="已付款" value="2"></el-option>
							      <el-option label="已完成" value="3"></el-option>
							      <el-option label="已取消" value="4"></el-option>
							      <el-option label="已退款" value="5"></el-option>
							    </el-select>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="支付状态：">
							    <el-select v-model="searchForms.payStatus" placeholder="选择支付状态">
							      <el-option label="全部" value="0"></el-option>
							      <el-option label="未支付" value="1"></el-option>
							      <el-option label="已支付" value="2"></el-option>
							    </el-select>
							  </el-form-item>
					  	</div>
					  </el-col>
					</el-row>
					<el-row :gutter="0">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="联系人姓名：">
							    <el-input v-model="searchForms.fullName"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="手机号码：">
							    <el-input v-model="searchForms.phoneNumber"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="分销员：">
							    <el-input v-model="searchForms.distributor"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					</el-row>
				</el-form>
  		</div>
  	</div>

  	<el-table
			v-loading="loading"
	    :data="goodsList">
		  <el-table-column
		    prop="good"
		    label="产品"
		    width="300"
		    class="text-left">
		    <template slot-scope="scope">
		    	<span class="orderNum">订单号：{{scope.row.orderNum}}</span>

		    	<img class="productImg" :src="scope.row.productImagUrl" alt="">
		    	<span class="productTitle" v-html="scope.row.productTitle"></span>
		    </template>
			</el-table-column>
			<el-table-column
		    prop="number"
		    label="人数／价格"
		    width="">
		    <template slot-scope="scope">
		    	<!-- <span v-html="scope.row.numberOfPeople"></span>/ -->
		    	<span v-html="scope.row.totalFee"></span>
		    </template>
		  </el-table-column>
			<el-table-column
		    prop="seller"
		    label="买家"
		    width="">
		    <template slot-scope="scope">
		    	<p v-html="scope.row.customerName"></p>
		    	<p v-html="scope.row.customerPhone"></p>
		    </template>
		  </el-table-column>
			<el-table-column
		    prop="createTime"
		    label="下单时间"
		    width="">
		  </el-table-column>
			<el-table-column
		    prop="orderStatus"
		    label="订单状态"
		    width="">
		    <template slot-scope="scope">
		    	<p v-show="scope.row.orderStatus == '1'">待付款</p>
		    	<p v-show="scope.row.orderStatus == '2'">已付款</p>
		    	<p v-show="scope.row.orderStatus == '3'">已完成</p>
		    	<p v-show="scope.row.orderStatus == '4'">已取消</p>
		    	<p v-show="scope.row.orderStatus == '5'">已退款</p>
		    	<p v-show="!scope.row.orderStatus">无</p>

		    	<!-- 这功能暂时不做 -->
		    	<!-- <el-button v-show="scope.row.orderStatus == '3'" type="success" @click="feedback(scope.row, 1)">通过</el-button> -->
		    	<!-- <el-button v-show="scope.row.orderStatus == '3'" type="danger" @click="feedback(scope.row, 0)">驳回</el-button> -->
		    </template>
		  </el-table-column>
			<el-table-column
		    prop="money"
		    label="金额"
		    width="">
		    <template slot-scope="scope">
		    	<router-link :to="'/orderDetails/' + scope.row.orderNum" class="href">查看详情</router-link>
		    	<div v-show="scope.row.orderStatus != '1'">
			    	<p>实付金额：{{scope.row.paymentFee}}</p>
			    	<p>应付金额：{{scope.row.totalFee}}</p>
			    	<p>分销商佣金：{{scope.row.distBrokerage}}</p>
		    	</div>
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
		</div>
  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getOrderList, toFeedbackForRefund} from 'api';

	const GOOD_COUNT = 1000;
	const PAGE_SIZE = 5;
	const CURRENT_PAGE = 1;

  export default {
  	data() {
  		return {
  			loading: true,
  			radioVal: '0',
  			searchForms: {
  				orderNumber: '',
  				orderStatus: '',
  				payStatus: '',
  				goodName: '',
  				pOrderTime: [],
  				fullName: '',
  				phoneNumber: '',
  				distributor: ''
  			},
  			pagination: {
  				count: GOOD_COUNT,
  				pageSize: PAGE_SIZE,
  				currentPage: CURRENT_PAGE
  			},
  			pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        startTime: '',
        endTime: '',
        selectDate: '',
        selectDateForEnd: '',
        goodsList: [],
        orderStatus: ''
  		}
  	},
  	methods: {
  		feedback(good, state) {
  			let params = qs.stringify({
	  			id: good.id,
	  			state: state,
	  		})
  		// 	toFeedbackForRefund(params).then((res) => {
				// 	if (res.code !== 200) {
				// 		this.$notify.error({
				// 			title: '提示',
				// 			message: res.message
				// 		})
				// 	} else {
				// 		this.$notify.success({
				// 			title: '提示',
				// 			message: res.message
				// 		})
				// 		if (state == '1') {
				// 			good.orderStatus = 4;
				// 		}
				// 		if (state == '0') {
				// 			good.orderStatus = 5;
				// 		}
				// 	}
				// })
				if (state == '1') {
					good.orderStatus = 4;
				}
				if (state == '0') {
					good.orderStatus = 5;
				}
  		},
  		getTabVal(val) {
  			this.orderStatus = val;
  			this.searchForms.orderStatus = this.radioVal == '0' ? '' : this.radioVal;

  			let params = qs.stringify({
  				rows: this.pagination.pageSize,
	        page: CURRENT_PAGE,
	        orderStatus: this.searchForms.orderStatus
  			})
  			
  			this._getOrderList(params);
  		},
  		searchGoods() {
  			let params = qs.stringify({
        	orderNumsTransfer: this.searchForms.orderNumber,
	  			productTitle: this.searchForms.goodName,
	  			customerName: this.searchForms.fullName,
	  			customerPhone: this.searchForms.phoneNumber,
	  			distMemberName: this.searchForms.distributor,
	  			payStatus: this.searchForms.payStatus == '0' ? '' : this.searchForms.payStatus,
	  			orderStatus: this.searchForms.orderStatus == '0' ? '' : this.searchForms.orderStatus,
	  			createTimeStartTransfer: this.startTime,
	  			createTimeEndTransfer: this.endTime,
	  			rows: this.pagination.pageSize,
	  			page: CURRENT_PAGE
        });
  			this._getOrderList(params);
  		},
  		dateChange(val) {
  			console.log(val);
  			this.startTime = this._dateFormate(val);
  			console.log(this.startTime);
      },
      dateChangeForEnd(val) {
      	console.log(val);
      	this.endTime = this._dateFormate(val);
      	console.log(this.endTime);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        if (this.pagination.pageSize == val) {
        	return
        }
        this.pagination.pageSize = val
        this.pagination.currentPage = CURRENT_PAGE
        let params = qs.stringify({
        	rows: this.pagination.pageSize,
	        page: this.pagination.currentPage,
	        orderStatus: this.searchForms.orderStatus == '0' ? '' : this.searchForms.orderStatus
        })
        
        this._getOrderList(params);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
				if (this.pagination.currentPage == val) {
					return
				}
				this.pagination.currentPage = val
        let params = qs.stringify({
        	rows: this.pagination.pageSize,
	        page: this.pagination.currentPage,
	        orderStatus: this.searchForms.orderStatus == '0' ? '' : this.searchForms.orderStatus
        });
        
        this._getOrderList(params);
      },
      _dateFormate(date) {
        let dateFormate = new Date(date);
        let year = dateFormate.getFullYear();
        let month = dateFormate.getMonth() + 1;
        let day = dateFormate.getDate();
        // let hour = dateFormate.getHours();
        // let min = dateFormate.getMinutes();
        // let second = dateFormate.getSeconds();

        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        // if (hour < 10) {
        // 	hour = '0' + hour
        // }
        // if (min < 10) {
        // 	min = '0' + min
        // }
        // if (second < 10) {
        // 	second = '0' + second
        // }

        // return `${year}-${month}-${day} ${hour}:${min}:${second}`
        return `${year}-${month}-${day} 00:00:00`
      },
      _getOrderList(params) {
      	this.loading = true;
      	console.log(params);
     	  getOrderList(params).then((res) => {
					console.log(res);
					this.loading = false;
					this.pagination.count = res.total;
					let data = res.list
					this.goodsList = data;
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
  	},
  	mounted() {
  		let params = qs.stringify({
  			rows: PAGE_SIZE,
      	page: CURRENT_PAGE
  		});
  		
  		this._getOrderList(params)
  	}
  }
</script>

<style scoped>
	.orderList{
		padding: 20px 0;
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
  	width: 100px;
  }
  .orderNum{
  	width: 100%;
  	text-align: left;
  	float: left;
  	display: block;
  }
  .productImg{
  	width: 100px;
  	display: block;
  	float: left;
  	margin-right: 10px;
  }
  .productTitle{
  	float: left;
  	width: 160px;
  }
  .href{
  	color: #008EE5;
  }
  .text-left{
  	text-align: left;
  }
</style>