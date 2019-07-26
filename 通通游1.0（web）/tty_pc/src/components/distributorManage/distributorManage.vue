<template>
  <section class="distributorManage">
    <div class="searchWrap">
  		<div class="left">
  			<el-form :inline="true" label-width="100px" :model="searchForms" class="demo-form-inline">
			  	<el-row :gutter="10">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="分销员姓名：">
							    <el-input v-model="searchForms.name"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="分销员手机号：">
							    <el-input v-model="searchForms.phoneNumber"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="申请时间：">
							    <!-- <el-input v-model="searchForms.time"></el-input> -->
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
							  </el-form-item>
					  	</div>
					  </el-col>
					</el-row>
			  	<el-row :gutter="10">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="推荐人姓名：">
							    <el-input v-model="searchForms.recommeName"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="推荐人手机号：">
							    <el-input v-model="searchForms.recommePhone"></el-input>
							  </el-form-item>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
				  			<el-form-item label="状态：">
							    <el-select v-model="searchForms.isEnabled">
							      <el-option label="全部" value="10"></el-option>
							      <el-option label="禁用" value="0"></el-option>
							      <el-option label="启用" value="1"></el-option>
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
						  		<el-button type="primary" @click="searchdistribution">搜索</el-button>
						  	</el-form-item>
							</div>
					  </el-col>
					</el-row>
				</el-form>
  		</div>
  	</div>
  	<el-row class="addDistribution">
  		<el-col :span="10">
  			<el-button type="primary" @click="dialogFormVisible = true">添加分销员</el-button>
  		</el-col>
  	</el-row>
  	<div class="tableWrap">
	  	<el-table
	  			v-loading="loading"
		  		@selection-change="handleSelectionChange"
			    :data="distributionList">
			  <el-table-column
			  	fixed
		      type="selection"
		      width="55">
		    </el-table-column>
				<el-table-column style="text-align:center;"
			    prop="name"
			    label="分销员姓名"
			    width="">
			  </el-table-column>
				<el-table-column
			    prop="phone"
			    width=""
			    label="分销员手机号">
			  </el-table-column>
				<el-table-column
			    prop="createTime"
			    width=""
			    label="申请时间">
			  </el-table-column>
				<el-table-column
			    prop="brokerage"
			    width=""
			    label="业绩">
			    <template slot-scope="scope">
			    	<p>¥ {{scope.row.brokerage}}</p>
			    </template>
			  </el-table-column>
				<el-table-column
			    prop="isEnabled"
			    width=""
			    label="状态">
			    <template slot-scope="scope">
			    	<p v-show="scope.row.isEnabled == '0'">禁用</p>
			    	<p v-show="scope.row.isEnabled == '1'">启用</p>
			    </template>
			  </el-table-column>
				<el-table-column
			    prop="referrerName"
			    width=""
			    label="推荐人姓名">
			  </el-table-column>
				<el-table-column
			    prop="referrerPhone"
			    width=""
			    label="推荐人手机号">
			  </el-table-column>
			  <el-table-column
			    fixed="right"
			    width="150"
			    label="操作">
			    <template slot-scope="scope">
			      <el-button v-if="scope.row.isEnabled == '0'" type="text" icon="edit" @click="action(scope.row)">启用</el-button>
			      <el-button v-if="scope.row.isEnabled == '1'" type="text" icon="edit" @click="action(scope.row)">禁用</el-button>
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
			<el-button class="bottom-btn" style="left:20px;bottom:20px;height:36px;" type="primary" @click="callOfAction('on')">批量启用</el-button>
			<el-button class="bottom-btn" style="left:155px;bottom:20px;height:36px;" type="primary" @click="callOfAction('off')">批量禁用</el-button>
		</div>
		
		<!-- dialog 弹窗 -->
		<el-dialog style="position:fixed" 
			title="添加分销员" 
			:visible.sync="dialogFormVisible"
			:append-to-body="true">
		  <el-form :model="form" style="width:70%;margin:0 auto;" :rules="rules" ref="form">
		    <el-form-item label="分销员姓名：" :label-width="formLabelWidth" prop="name">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="分销员手机号：" :label-width="formLabelWidth" prop="phone">
		      <el-input type="number" v-model="form.phone" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="推荐人姓名：" :label-width="formLabelWidth" prop="referrerName">
		      <el-input v-model="form.referrerName" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="推荐人手机号：" :label-width="formLabelWidth" prop="referrerPhone">
		      <el-input type="number" v-model="form.referrerPhone" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" style="margin: 0 20%;">
		    <el-button @click="dialogFormVisible = false" style="margin-right: 10%;">取 消</el-button>
		    <el-button type="primary" @click="submitForm" style="margin-rigth: 11%;">确 定</el-button>
		  </div>
		</el-dialog>

  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getDistributionList, actionForState, addDistribution} from 'api'

	const DISTRIBUTION_COUNT = 1000;
	const PAGE_SIZE = 5;
	const CURRENT_PAGE = 1;

  export default {
  	data() {
  		return {
  			loading: true,
  			pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
  			selectDate: '',
  			createTime: '',
  			searchForms: {
  				name: '',
  				phoneNumber: '',
  				time: '',
  				recommeName: '',
  				recommePhone: '',
  				isEnabled: '10'
  			},
  			distributionList: null,
  			multipleSelection: [],
  			pagination: {
  				count: DISTRIBUTION_COUNT,
  				pageSize: PAGE_SIZE,
  				currentPage: CURRENT_PAGE
  			},
  			actionObject: null,
  			actionState: null,
        dialogFormVisible: false,
  			form: {
          name: '',
          phone: '',
          referrerName: '',
          referrerPhone: ''
        },
        rules: {
        	name: [
            { required: true, message: '请输入申请人姓名' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入申请人手机号' }
          ],
          referrerName: [
            { required: true, message: '请输入推荐人姓名' }
          ],
          referrerPhone: [
            { required: true, message: '请输入推荐人手机号' }
          ]
        },
        formLabelWidth: '150px'
  		}
  	},
  	methods: {
  		dateChange(val) {
  			console.log(val);
  			this.createTime = this._dateFormate(val);
  			console.log(this.createTime);
      },
  		submitForm() {
  			let _this = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
          	console.log('验证通过');
  					let params = qs.stringify({
  						name: this.form.name,
  						phone: this.form.phone,
  						referrerName: this.form.referrerName,
  						referrerPhone: this.form.referrerPhone
  					});
          	this._addDistribution(params);
          	_this.dialogFormVisible = false;

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  		_addDistribution(params) {
  			addDistribution(params).then((res) => {
					console.log(res);

					if (res.state == '1') {
            this.$notify({
							title: '提示',
							message: '分销员添加成功',
							type: 'success'
						})

						let params = qs.stringify({
			  			rows: PAGE_SIZE,
			  			page: CURRENT_PAGE
			  		});
            this._getDistibutionList(params);
            
          }
          if (res.state == '-1') {
            this.$notify({
              title: '提示',
              message: res.message,
              type: 'error'
            })
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
  		},
  		searchdistribution() {
  			let params = qs.stringify({
	  			rows: this.pagination.pageSize,
	  			page: CURRENT_PAGE,
	  			name: this.searchForms.name,
	  			phone: this.searchForms.phoneNumber,
	  			createTime: this.createTime,
	  			referrerName: this.searchForms.recommeName,
	  			referrerPhone: this.searchForms.recommePhone,
	  			isEnabled: this.searchForms.isEnabled == '10' ? '' : this.searchForms.isEnabled
	  		});

	  		this._getDistibutionList(params);
  		},
  		handleSelectionChange(val) {
  			console.log(val)
        this.multipleSelection = val;
      	this.actionObject = this.multipleSelection;
  		},
  		handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagination.pageSize = val
        this.pagination.currentPage = CURRENT_PAGE;

        let params = qs.stringify({
        	rows: this.pagination.pageSize,
        	page: this.pagination.currentPage
        })
        console.log(params)

        this._getDistibutionList(params);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
				if (this.pagination.currentPage == val) {
					return
				}
        this.pagination.currentPage = val
        
        let params = qs.stringify({
        	page: this.pagination.currentPage,
        	rows: this.pagination.pageSize
        });

        this._getDistibutionList(params);
      },
  		action(distribution) {
  			let params = {};
  			this.actionObject = distribution;
  			if (distribution.isEnabled == '0') {
  				this.actionState = '1'
  				params = qs.stringify({
  					dbIds: distribution.dbId,
  					isEnabled: '1'
  				})
  			}
  			if (distribution.isEnabled == '1') {
  				this.actionState = '0'
  				params = qs.stringify({
  					dbIds: distribution.dbId,
  					isEnabled: '0'
  				})
  			}
  			console.log(params);
  			this._actionForState(params);
  		},
      callOfAction(state) {
      	let arr = [], params = {};
      	this.multipleSelection.forEach((distribution) => {
      		arr.push(distribution.dbId);
      	})
      	if (state == 'on') {
  				this.actionState = '1'
      		params = qs.stringify({
  					dbIds: arr.toString(),
  					isEnabled: '1'
  				});
      	}
      	if (state == 'off') {
  				this.actionState = '0'
      		params = qs.stringify({
  					dbIds: arr.toString(),
  					isEnabled: '0'
  				});
      	}
      	this._actionForState(params);
      },
  		_actionForState(params) {
  			actionForState(params).then((res) => {
					console.log(res);
					if (res.state == '1') {
						this.$notify({
							title: '提示',
							message: '操作成功',
							type: 'success'
						})
						this._staticChangeState();
						this.multipleSelection.length = 0;
					} else {
						this.$notify({
							title: '提示',
							message: '操作失败',
							type: 'error'
						})
					}
					// this.multipleSelection = []
				})
  		},
  		_staticChangeState() {
  			if(!this.actionObject.length) {
  				if (this.actionState == '0') {
  					this.actionObject.isEnabled = '0'
  				}
  				if (this.actionState == '1') {
						this.actionObject.isEnabled = '1'
  				}
  			} else {
  				if (this.actionState == '0') {
  					this.actionObject.forEach((distribution) => {
  						distribution.isEnabled = '0'
  					})
  				}
  				if (this.actionState == '1') {
						this.actionObject.forEach((distribution) => {
  						distribution.isEnabled = '1'
  					})
  				}
  			}
  		},
  		_getDistibutionList(params) {
  			this.loading = true;
    		getDistributionList(params).then((res) => {
					console.log(res);
					this.loading = false;
					if (res.state != '1') {
						this.$notify({
							title: '提示',
							type: 'error',
							message: res.message
						})
						return
					}

					this.pagination.count = res.total
					let data = res.list;
          data.forEach((distributor) => {
            distributor.brokerage = distributor.brokerage ? distributor.brokerage : '0.00'
          })
					this.distributionList = data;
          console.log(data)
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
      }
  	},
  	mounted() {
  		let params = qs.stringify({
  			rows: PAGE_SIZE,
  			page: CURRENT_PAGE
  		});

  		this._getDistibutionList(params);
  	}
  }
</script>

<style>
	.distributorManage .footerContent{
  	position: relative;
  }
  .distributorManage .searchWrap{
  	width: 100%;
  	padding: 20px;
  	display: flex;
  	border-bottom: 12px solid #f5f5f5;
  }
  .distributorManage .searchWrap .left{
  	flex: 1;
  }
  .distributorManage .searchWrap .right{
  	text-align: right;
  }
  .distributorManage .tableWrap{
  	padding: 10px;
  	width: 100%;
  	font-size: 12px;
  }
  .distributorManage .footerContent{
  	padding: 0 20px;
  }
  .distributorManage .addDistribution{
  	margin: 15px 0;
  	padding: 20px;
  }
</style>