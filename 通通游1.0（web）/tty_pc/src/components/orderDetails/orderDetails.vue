<template>
  <section class="orderDetails">
    <!-- <el-row>
		  <el-col :span="12">
		  	<div class="grid-content bg-purple">
		  	订单号：{{orderNumber}}
		  	</div>
		  </el-col>
		</el-row> -->
		<section class="section">
			<h3 class="tHead">基本信息</h3>
			<el-form :label-position="labelPosition" label-width="80px" class="ruleForm">
				<el-row>
		      <el-col :span="8">
		        <div class="grid-content bg-purple">
		          <el-form-item label="订单号：">
		            <p v-html="baseInfo.orderNumber"></p>
		          </el-form-item>
		          <el-form-item label="出团日期：" prop="qq">
		            <p v-html="baseInfo.groupTime"></p>
		          </el-form-item>
		          <el-form-item label="产品类型：">
		            <p v-html="baseInfo.productType"></p>
		          </el-form-item>
		        </div>
		      </el-col>
		      <el-col :span="8">
		        <div class="grid-content bg-purple">
		          <el-form-item label="下单时间：">
		            <p v-html="baseInfo.pOrderTime"></p>
		          </el-form-item>
		          <el-form-item label="回团日期：">
		            <p v-html="baseInfo.backGroupDate"></p>
		          </el-form-item>
		          <!-- <el-form-item label="供应商产品编号：">
		            <p v-html="baseInfo.productNumber"></p>
		          </el-form-item> -->
              <el-form-item label="订单状态：">
                <p v-html="baseInfo.orderStatus"></p>
              </el-form-item>
		        </div>
		      </el-col>
	   		</el-row>
		  </el-form>
	  </section>
	  <section class="section">
			<h3 class="tHead">客人信息</h3>
			<el-form :label-position="labelPosition" label-width="100px" class="ruleForm">
				<el-row>
		      <el-col :span="8">
		        <div class="grid-content bg-purple">
		          <el-form-item label="联系人姓名：">
		            <p v-html="customer.name"></p>
		          </el-form-item>
		        </div>
		      </el-col>
		      <el-col :span="8">
		        <div class="grid-content bg-purple">
		          <el-form-item label="手机号：" prop="qq">
		            <p v-html="customer.phoneNumber"></p>
		          </el-form-item>
		        </div>
		      </el-col>
		      <el-col :span="8">
		        <div class="grid-content bg-purple">
		          <el-form-item label="邮箱：">
		            <p v-html="customer.zipCode"></p>
		          </el-form-item>
		        </div>
		      </el-col>
	   		</el-row>
		  </el-form>
      <div class="tableWrap">
  		  <el-table
          :data="customer.tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="tableName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="certificate"
            label="出游证件/姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="dateOfBirth"
            label="出生日期">
          </el-table-column>
          <el-table-column
            prop="certificateType"
            label="证件类型">
          </el-table-column>
          <el-table-column
            prop="certificateNumber"
            label="证件号码">
          </el-table-column>
          <el-table-column
            prop="certificateValidity"
            label="证件有效期">
          </el-table-column>
          <!-- <el-table-column
            prop="currentStatus"
            label="当前状态">
          </el-table-column> -->
        </el-table>
      </div>
	  </section>
	  <section class="section">
			<h3 class="tHead">交易信息</h3>
      <div class="tableWrap">
  		  <el-table
          :data="tradeInfo"
          border
          style="width: 100%">
          <el-table-column
            prop=""
            label="款项名称">
          </el-table-column>
          <el-table-column
            prop="orderNumDesc"
            label="人数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop=""
            label="交易时间">
          </el-table-column>
          <el-table-column
            prop=""
            label="备注">
          </el-table-column>
        </el-table>
      </div>
	  </section>
	  <section class="section">
			<h3 class="tHead">佣金信息</h3>
      <div class="tableWrap">
  		  <el-table
          :data="distribInfo"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <!-- <el-table-column
            prop="distribCommission"
            label="分销员佣金">
            <template slot-scope="scope">
            	<el-popover
  						  ref="distribCommission"
  						  placement="bottom"
  						  title="佣金详情："
  						  width="200"
  						  trigger="hover"
  						  :content="distribCommissionInfo">
  						</el-popover>
            	<p 
                v-popover:distribCommission 
                v-html="scope.row.distribCommission"
                :style="style"></p>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="distribCommission"
            label="分销员佣金">
            <template slot-scope="scope">
              <el-popover
                ref="distribCommission"
                placement="top"
                trigger="hover">
                <p>佣金详情：</p>
                <p v-for="item in details">
                  <span>{{item.name}}</span>：
                  <span>¥{{item.money}}</span>
                </p>
                <p>总计：¥{{totalMoney}}</p>
                <p>佣金：¥{{fxy}}</p>
              </el-popover>
              <p v-popover:distribCommission :style="style">{{scope.row.distribCommission}} <span class="action">?</span></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="distributorCommission"
            label="分销商佣金">
            <template slot-scope="scope">
              <el-popover
                ref="distributorCommission"
                placement="top"
                trigger="hover">
                <p>佣金详情：</p>
                <p v-for="item in details">
                  <span>{{item.name}}</span>：
                  <span>¥{{item.money}}</span>
                </p>
                <p>总计：¥{{totalMoney}}</p>
                <p>佣金：¥{{fxs}}</p>
              </el-popover>
            	<p v-popover:distributorCommission :style="style">{{scope.row.distributorCommission}} <span class="action">?</span></p>
            </template>
          </el-table-column>
        </el-table>
      </div>
	  </section>
    <section class="section">
      <h3 class="tHead">退款信息</h3>
      <div class="tableWrap">
        <el-table
          :data="customer.refundInfoList"
          border
          style="width: 100%">
          <el-table-column
            prop=""
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop=""
            label="退款原因"
            width="180">
          </el-table-column>
          <el-table-column
            prop=""
            label="退款金额">
          </el-table-column>
          <el-table-column
            prop=""
            label="审核时间">
          </el-table-column>
          <el-table-column
            prop=""
            label="状态">
          </el-table-column>
          <el-table-column
            prop=""
            label="驳回原因">
          </el-table-column>
          <el-table-column
            prop=""
            label="备注">
          </el-table-column>
        </el-table>
      </div>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  import { getOrderDetails } from 'api';

	let a = 'abc';
	let b = '123';
  export default {
  	data() {
  		return {
        details: [],
        fxy: '',
        fxs: '',
        totalMoney: '',
        style: 'border:0;',
  			labelPosition: '',
  			orderNumber: '',
  			baseInfo: {
  				orderNumber: '',
  				groupTime: '',
  				productType: '',
  				pOrderTime: '',
  				backGroupDate: '',
  				productNumber: '',
  				orderStatus: ''
  			},
  			customer: {
  				name: '',
  				phoneNumber: '',
  				zipCode: '',
  				tableData: [],
          refundInfoList: []
  			},
  			tradeInfo: [],
  			distribInfo: [],
  			distribCommissionInfo:`成人: ${a}\n 儿童: ${b}\n 单房差: ￥1000\n 总计: ￥7398\n 佣金: ￥300`,
  			distributorCommission: `成人: ${a}\n 儿童: ${b}\n 单房差: ￥1000\n 总计: ￥7398\n 佣金: ￥300`,
  			remark: '',
  			resion: ''
  		}
  	},
  	methods: {
      _statusTrans(status) {
        switch(status) {
          case 1:
            return '待付款'
            break
          case 2:
            return '已付款'
            break
          case 3:
            return '已完成'
            break
          case 4:
            return '已取消'
            break
          case 5:
            return '退款中'
            break
          case 6:
            return '已退款'
            break
        }
      },
      _typeTrans(type) {
         switch(type) {
          case '1':
            return '成人'
            break
          case '2':
            return '儿童'
            break
          case '3':
            return '单房差'
            break
        }
      },
      _splitDate(date) {
        return date.split(' ')[0]
      },
      _getOrderDetails(params) {
        console.log(params);
        getOrderDetails(params).then((res) => {
          console.log(res);
          let data = res.info;

          // 基本信息
          this.baseInfo = {
            orderNumber: data.orderNum ? data.orderNum : '',
            pOrderTime: data.createTime ? data.createTime : '',
            productNumber: data.supOrderNum ? data.supOrderNum : '',
            orderStatus: this._statusTrans(data.orderStatus),
            productType: data.typeName ? data.typeName : '',
            groupTime: data.calDate ? data.calDate : '',
            backGroupDate: data.calBackDate ? data.calBackDate : ''
          }

          // 客人信息
          let customers = [];
          let customerObj = {};
          data.detail.forEach((customer) => {
            let idNumber = customer.idNumber ? customer.idNumber : ''
            let clientEnName = customer.clientEnName ? customer.clientEnName : ''
            let clientFamilyName = customer.clientFamilyName ? customer.clientFamilyName : ''
            let clientName = clientEnName + ' ' + clientFamilyName
            let certificate = idNumber + ' / ' + clientName
            customerObj = {
              certificate: certificate,
              tableName: customer.clientName,
              type: customer.productCalPriceName,
              sex: customer.sex == '1' ? '男' : '女',
              dateOfBirth: customer.birthDate,
              certificateType: customer.idTypeName,
              certificateNumber: customer.idNumber,
              certificateValidity: this._splitDate(customer.idIndate)
            }
            customers.push(customerObj)
          })
          this.customer = {
            name: data.customerName ? data.customerName : '',
            phoneNumber: data.customerPhone ? data.customerPhone : '',
            zipCode: data.customerEmail ? data.customerEmail : '',
            tableData: customers
          }

          // 交易信息
          let tradeInfos = [];
          let tradeInfoObj = {};
          tradeInfoObj = {
            orderNumDesc: data.orderNumDesc,
            totalFee: data.totalFee
            // productName: data.productTitle ? data.productTitle : '无',
            // amountMoney: data.totalFee ? data.totalFee : '',
            // tradeTime: data.payTime ? data.payTime : '',
            // remark: data.remark ? data.remark : '',
            // count: data.totalFee ? data.totalFee : ''
          }
          this.tradeInfo = [tradeInfoObj];

          // 分销员信息
          let distribInfoObj = {
            name: data.distMemberName ? data.distMemberName : '无',
            distribCommission: data.distMemberBrokerage ? data.distMemberBrokerage : 0 ,
            distributorCommission: data.distBrokerage ? data.distBrokerage : 0
          };
          this.distribInfo = [distribInfoObj];

          this.fxy = data.distMemberBrokerage ? data.distMemberBrokerage : 0
          this.fxs = data.distBrokerage ? data.distBrokerage : 0

          let totalMoney = 0;
          data.detail.forEach((item) => {
            let obj = {
              name: this._typeTrans(item.productCalPriceType),
              money: item.salePrice
            }
            this.details.push(obj);
            totalMoney += parseFloat(item.salePrice)
          })
          this.totalMoney = totalMoney;

          // 退款信息
          this.refundInfoList = []
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
        orderNum: this.$route.params.id
      });
      this._getOrderDetails(params);
    }
  }
</script>

<style >
  .orderDetails .remark{
  	margin: 20px 0 10px;
  }
  .orderDetails .action{
    cursor: pointer;
  }
  .orderDetails .section{
    border-bottom: 10px solid #f5f5f5;
  }
  .orderDetails .tHead{
    border-bottom: 1px solid #f5f5f5;
    padding: 15px;
    font-weight: normal;
  }
  .orderDetails .el-form {
    padding: 0 30px;
  }
  .orderDetails .el-form-item__label{
    text-align: left;
  }
  .orderDetails .tableWrap{
    padding: 15px;
  }
</style>
