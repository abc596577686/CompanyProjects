import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Modal, Popover, Button,Form,Input,Upload, Icon,Alert,message,Pagination,Spin} from 'antd';
import IHeader from '../../components/Header';
import HomeHeader from '../../components/HomeHeader';
import {getRegionList,orderCheck,getAddressList,saveAddressDetails,orderConfirm,deleteAddress} from '../../axios/api'
import {ERR_OK} from '../../axios/config';
import {getValForKey} from "../../utils/utils";
import './index.less';
import {baseUrl,baseImgUrl} from '../../axios/api'
import PageFooter from '../../components/PageFooter'
const FormItem = Form.Item;
const title = (
  <div className='id-title'>
    <div>海关总署令147号第22条规定</div>
  </div>
)
const content = (
  <div className='id-content'>
    <p>个人物品类进出境快件报关时，运营人应当向海关提交《中华人民共和国海关进出境快件个人物品申报单》（见附件二）</p>
    <p>每一进出境快件的分运单、进境快件收件人或出境快件发件人身份证件影印件和海关需要的其它单证。</p>
  </div>
)
export default class ConfirmOrder extends React.Component {
  state = {
    couponList: [],
    addressList: [],
    initBuyCount: 1,
    couponVal: null,
    saleMark: '',
    checkPhone: true,
    checkReceiver: true,
    checkRegion: true,
    checkAddress: true,
    checkIdCard : true,
    checkRealName : true,
    regionList: [],
    phoneVal: '',
    receiverVal: '',
    idCardVal: '',
    addressVal: '',
    visible: false,
    productDetails: null,
    productSpecList: null,
    selectSpecType: [],
    addressInfo : [],
    productList : [],
    pageIdx : 1,
    pageSize : 10,
    curName : '',
    curMobile : '',
    //能否编辑
    selectedMod: true,
    tips1 : '请上传身份证正面照',
    tips2 : '请上传身份证反面照',
    isValidIdentity : true,
    curAddress : 0
  };
  // Render之前
  componentWillMount() {
    window.scrollTo(0,0)
    this._getRegionList();
    let searchInfo = decodeURIComponent(this.props.location.search);
    let productId = getValForKey(searchInfo,'productId');
    let data = this.props.location.state
    let cartIds = data.cartIds
    let productSpecId = data.productSpecId
    let postType = data.postType
    let quantity = data.quantity
    let userType = window.sessionStorage.getItem('__userType__')
    console.log('规格------',productSpecId,'postType',postType)
    this.setState({
      productId,
      productSpecId,
      cartIds,
      postType,
      quantity,
      userType
    },() =>{
      this._orderCheck()
    })
  };

  //Render 之后
  componentDidMount() {

  };
  // 收货地址列表
  _getAddressList() {
    this.setState({
      showLoading : true
    })
    let params = {
      pageidx : this.state.pageIdx,
      pagesize : this.state.pageSize,
      mobile : this.state.curMobile,
      name : this.state.curName
    }
    getAddressList(params).then(res => {
      console.log('收货地址列表：', res);
      if (res.data.code !== ERR_OK) {
      
      } else {
        this.setState({
          showLoading : false
        })
        let addressList = res.data.data;
        if(!addressList||addressList.length===0){
          this.setState({
            selectedMod : false,
            isEmpty:'1'
          })
          return
        }
        addressList.forEach(item =>{
          if(item.idcardNo){
            item.isValidIdentity = true
          }
        })
        let total = res.data.total
        this.setState({
          addressList,
          total
        })
      }
    });
  };
  //分页
  pageChange = (page,pageSize) => {
    this.setState({
      pageIdx : page,
    },() => {
      this._getAddressList()
    })
    
  }
  getName = (e) => {
    let value = e.target.value
    this.setState({
      curName : value
    })
  }
  getMobile = (e) => {
    let value = e.target.value
    this.setState({
      curMobile : value
    })
    
  }
  getList = () => {
    this.setState({
      pageIdx : 1,
    },()=>{
      this._getAddressList()
    })
  }
  // 获取商品详情
  _orderCheck =()=> {
    this.setState({
      showLoading : true
    })
    let params
    if(this.state.postType == 0){
      params = {
        productId:this.state.productId,
        postType:this.state.postType,
        productSpecId:this.state.productSpecId,
        number : this.state.quantity,
        addressId : this.state.addressId||''
      }
    }
    if(this.state.postType == 1){
      params = {
        cartIds:this.state.cartIds,
        postType:this.state.postType,
        addressId:this.state.addressId||''
      }
    }
    orderCheck(params).then(res => {
      console.log('订单详情：', res);
      if (res.data.code !== ERR_OK) {
        message.error(res.data.msg)
        let timer= setTimeout(() =>{
          clearTimeout(timer)
          window.location.href='/'
        },2000)
        return;
      }
      let data = res.data.data;
      let addressInfo = res.data.addressInfo
      let productType = res.data.data.productType
      console.log(data);
      this.setState({
        orderInfo : res.data.data,
        addressInfo,
        authenticationList : res.data.authenticationList,
        productList : res.data.data.productList,
        productType : productType,
        needIdentification : productType==='1'?false:true,
        receiverVal:addressInfo.consignee,
        phoneVal:addressInfo.consigneePhone,
        provinceName:addressInfo.provinceName,
        cityName : addressInfo.cityName,
        areaName : addressInfo.areaName,
        provinceVal : addressInfo.provinceId,
        cityVal : addressInfo.cityId,
        areaVal : addressInfo.areaId,
        addressId : addressInfo.addressId,
        addressVal : addressInfo.address,
        initBuyCount : res.data.data.number,
        showLoading : false
      });
      if(res.data.addressInfo.isEmpty==='1'){
        this.setState({
          selectedMod : false
        })
      }else if(res.data.addressInfo.isEmpty==='0'){
        this.setState({
          selectedMod : true,
          curCustomer :addressInfo
        },() => {
          this._getAddressList()
        },() => {
          this.selectAddressId(this.state.curCustomer)
        })
      }
    })
  };
  // 省份区域列表
  _getRegionList() {
    let regionList = JSON.parse(window.localStorage.getItem('_regionList_'))
    if(regionList){
      this.setState({
        regionList
      },() => {
        this.setState({
          provinceList: this._getProvinceList()
        });
      })
      return
    }
    getRegionList().then(res => {
      if (res.data.code !== ERR_OK) {
        console.log('error');
      } else {
        let regionList = res.data.dataList;
        this.setState({
          regionList
        });
        this.setState({
          provinceList: this._getProvinceList()
        });

      }
    })
  };
  // 省份列表
  _getProvinceList() {
    let provinceList = [];
    this.state.regionList.forEach((province, index) => {
      let curProvince = {
        areaId: province.areaId,
        areaName: province.areaName
      };
      provinceList.push(curProvince)

    });
    provinceList.unshift({
      areaName: '请选择省'
    });
    return provinceList;
  };
  // 城市列表
  _getCityList(curProvinceId) {
    let cityList = [];
    this.state.regionList.forEach((province, index) => {
      if (province.areaId === curProvinceId) {
        cityList = province.dataList
      }
    });
    cityList.unshift({
      areaName: '请选择市'
    });
    return cityList;
  };

  // 区域列表
  _getAreaList(curAreaId) {
    let areaList = [];
    this.state.cityList.forEach((area, index) => {
      if (area.areaId === curAreaId) {
        areaList = area.dataList
      }
    });
    areaList.unshift({
      areaName: '请选择县\/区'
    });
    return areaList;
  };

  // 省份选择
  bindleProvince = (e) => {
    let curProvinceId = e.target.value;
    this.setState({
      provinceVal: curProvinceId,
      cityList: this._getCityList(curProvinceId),
      cityVal: null,
      areaVal: null,
      areaList:[{
        areaName: '请选择县\/区'
      }]
    })
  };

  // 城市选择
  bindleCity = (e) => {
    let curCityId = e.target.value;
    this.setState({
      cityVal: curCityId,
      areaList: this._getAreaList(curCityId),
      areaVal: null
    })
  };

  // 区域选择
  bindleArea = (e) => {
    let curAreaId = e.target.value;
    this.setState({
      areaVal: curAreaId
    })
  };
  
  // 联系电话
  bindlePhone = (e) => {
    // console.log(e.target.value);
    let phoneVal = e.target.value;
    this.setState({
      phoneVal
    });
  };
  // 收货人
  bindleReceiver = (e) => {
    let receiverVal = e.target.value;
    this.setState({
      receiverVal
    });
  };
 // 详细地址
  bindleAddress = (e) => {
    // console.log(e.target.value);
    let addressVal = e.target.value;
    this.setState({
      addressVal
    });
  };
  //真实姓名
  bindleRealName = (e) => {
    let realName = e.target.value
    this.setState({
      realName
    })
  }
  //身份证号
  bindleIdCard = (e) => {
    let idCardVal = e.target.value
    this.setState({
      idCardVal
    })
  }
  //检查地址
  checkForm =()=> {
    if (!this.state.receiverVal) {
      this.setState({
        checkReceiver: false
      });
      return false;
    } else {
      this.setState({
        checkReceiver: true
      });
    }
    if (!this.state.phoneVal) {
      this.setState({
        checkPhone: false
      });
      return false;
    } else {
      this.setState({
        checkPhone: true
      });
    }
    if (this.state.needIdentification&&!this.state.realName) {
      this.setState({
        checkRealName: false
      });
      return false;
    } else {
      this.setState({
        checkRealName: true
      });
    }
    if (this.state.needIdentification&&!this.state.idCardVal) {
      this.setState({
        checkIdCard: false
      });
      return false;
    } else {
      this.setState({
        checkIdCard: true
      });
    }
    if (!this.state.provinceVal || !this.state.cityVal || !this.state.areaVal) {
      this.setState({
        checkRegion: false
      });
      return false;
    } else {
      this.setState({
        checkRegion: true
      });
    }
  
    if (!this.state.addressVal) {
      this.setState({
        checkAddress: false
      });
      return false;
    } else {
      this.setState({
        checkAddress: true
      });
    }
    return true
  }
  //检查备注
  checkRemarks = () => {
    if(this.state.userType === '1') {
      if(!this.state.curOrderNum){
        message.warn('请填写订单号')
        return false
      }
      if(!this.state.curRemark){
        message.warn('请填写备注')
        return false
      }
    }
    return true
  }
  // 下单并付款
  confirmOrderAndPayment = () => {
      if(!this.checkRemarks()) return
      let addressId = this.state.addressId
      this.orderConfrimEnv(addressId)
  };
  //保存地址
  _saveAddressDetails =() => {
    if(!this.checkForm()) return
    let params = {
      consignee: this.state.receiverVal,
      consigneePhone: this.state.phoneVal,
      address: this.state.addressVal,
      provinceId: this.state.provinceVal,
      cityId: this.state.cityVal,
      areaId: this.state.areaVal,
      idcardNo : this.state.idCardVal||'',
      idcardName : this.state.realName||'',
      identityFrontPath : this.state.frontImg,
      identityBackPath : this.state.backImg
    }
    if(!this.state.isValidIdentity){
      params.addressId = this.state.addressId
    }
    if(this.state.updateMod){
      params.addressId = this.state.addressId
    }
    saveAddressDetails(params).then(res => {
      if(res.data.code=='1'){
        let addressId = res.data.data
        this.setState({
          addressId,
          selectedMod : true,
          visible2 : false,
          isValidIdentity : true
        },() =>{
          this._orderCheck()
        })
        message.success(res.data.msg)
      }
      else{
       message.error(res.data.msg)
      }
    })
  }
  //取消编辑
  cancelEdit =() => {
    let addressList = this.state.addressList
    let curAddress = this.state.curAddress
    addressList.forEach((item,index) => {
      if(index === curAddress){
        this.selectAddressId(item,index)
      }
    })
    this.setState({
      selectedMod : true
    })
  }
  //订单校验
  orderConfrimEnv =(addressId) => {
    let params
    if(this.state.postType == '0'){
      params = {
        addressId,
        productId : this.state.productId,
        productSpecId:this.state.productSpecId,
        quantity : this.state.initBuyCount,
        productSpecId : this.state.productSpecId,
        postType : this.state.postType,
        buyerMessage : this.state.curRemark,
        oldOrderNo : this.state.curOrderNum
      }
    }
    if(this.state.postType == '1'){
      params = {
        addressId,
        cartIds : this.state.cartIds,
        postType : this.state.postType,
        buyerMessage : this.state.curRemark,
        oldOrderNo : this.state.curOrderNum
      }
    }
    orderConfirm(params).then(res => {
      console.log('订单提交-----------',res)
      if(res.data.code=='1'){
        this.props.history.push({
          pathname : '/payment',
          state : {
            orderId : res.data.data.orderId,
            amount : res.data.data.amount,
            orderNo : res.data.data.orderNo
          }
        })
      }else{
        message.error(res.data.msg)
        if(res.data.data&&!res.data.data.isValidIdentity){
          this.updateAddress(this.state.curCustomer)
          this.setState({
            isValidIdentity : res.data.data.isValidIdentity
          })
          console.log(this.state.productType)
        }
      }
    })
  }
  //切换地址
  addAddress =() => {
    this.resetForm()
    this.setState({
      isEmpty :'0'
    })
    this.setState({
      selectedMod : false
    })
  }
  // 重置
  resetForm = () => {
    this.setState({
      saleMark: '',
      phoneVal: '',
      receiverVal: '',
      idCardVal: '',
      provinceVal: '',
      realName : '',
      cityVal: '',
      areaVal: '',
      addressVal: '',
      selectedMod : false,
      addressId : '',
      isValidIdentity : true,
      checkPhone: true,
      checkReceiver: true,
      checkRegion: true,
      checkAddress: true,
      checkIdCard : true,
      checkRealName : true,
    })
  };
  handleOk2 = () => {
    this._saveAddressDetails()
  };
  handleCancel2 = () => {
    this.setState({
      visible2: false,
    });
  };
  // 选择用户
  selectCustomer(customer) {
    console.log('选择的用户-----------',customer);
    let curCustomer = customer;
    this.setState({
      curCustomer,
      receiverVal : curCustomer.consignee,
      phoneVal : curCustomer.consigneePhone,
      addressVal : curCustomer.address,
      addressId : curCustomer.addressId,
      proviceId : curCustomer.proviceId,
      cityId : curCustomer.cityId,
      areaId : curCustomer.areaId,
      provinceName : curCustomer.provinceName,
      cityName : curCustomer.cityName,
      areaName : curCustomer.areaName,
      realName: curCustomer.idcardName,
      idCardVal : curCustomer.idcardNo
    })
    if(curCustomer.provinceId){
      this.setState({
        curCustomer : curCustomer,
        provinceVal:curCustomer.provinceId,
      },() => {
        let cityList = this. _getCityList(this.state.provinceVal)
        this.setState({
          cityList,
          cityVal : curCustomer.cityId,
        },() => {
          let areaList = this._getAreaList(this.state.cityVal)
          this.setState({
            areaVal : curCustomer.areaId,
            areaList
          })
        })
      })
    }
  };
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  showModal1 = () => {
    this.setState({ visible1: true });
  }
  handleCancel1 = () => {
    this.setState({ visible1: false });
    this.setState({
      frontImg : '',
      backImg : '',
      isValidIdentity : true
    })
  }
  handleOk1 = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('收到的', values);
      form.resetFields();
      let realName = values.realName
      let idCardVal = values.idCardVal
      if(this.state.productType=='3'&&(!this.state.frontImg||!this.state.backImg)){
        message.error('请上传完整的身份证正反面！')
        return
      }
      
      this.setState({
        realName,
        idCardVal,
        isSubmitId:true
      },() => {
        this._saveAddressDetails()
      });
    });
  }
  //上传图片
  submitImgEnv = (value,type) => {
    if(type == '0'){
      this.setState({
        frontImg : value
      })
    }else if(type == '1'){
      this.setState({
        backImg : value
      })
    }
    
  }
  //更新地址
  updateAddress = (item) => {
    this.setState({
      visible2 : true,
      updateMod : true,
      checkPhone:true,
      checkReceiver:true,
      checkRegion:true,
      checkAddress:true,
      checkRealName : true,
      checkIdCard : true
    },() => {
      this.selectCustomer(item)
    })
  }
  showConfirmDel = (item) => {
    let that = this
    Modal.confirm({
      title: '提示',
      content: '确定要删除所选地址？',
      onOk() {
        that.delAddress(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  delAddress = (item) => {
      let params = {
        addressId: item.addressId
      }
      deleteAddress(params).then(res => {
        if (res.data.code === '1') {
          // this._getAddressList()
          // this.resetForm()
          this._orderCheck()
        }else{
          message.error(res.data.msg)
        }
      })
  }
  //地址选择
  selectAddressId =(item,index) =>{
    this.setState({
      addressId:item.addressId,
      curCustomer :item,
      curAddress : index
    },() =>{
      this._orderCheck()
    })
    }
  //  填写备注,订单号
  getOrderNum = (e) => {
    let val = e.target.value
    this.setState({
      curOrderNum : val
    })
    
  }
  getRemark = (e) => {
    let val = e.target.value
    this.setState({
      curRemark : val
    })
    
  }
  render() {
    const titleB = (
      <div>保税订单海关审核规则：</div>
    );
    const contentB = (
      <div>
        <ul className="list-unstyled">
          <li>
            <div>1、同一身份证信息、联系电话及地址当天限制1次，一周内</div>
            <div>2次（需前次订单货物出仓后方可再次提交订单审核），一月内6次；</div>
          </li>
          <li>
            <div>2、收货地址限制出现**旁边、**对面、**附近等方位词以</div>
            <div>及店铺名称，限制出现自提字眼及特殊字符；</div>
          </li>
          <li>
            <div>3、避免地址接近或地址模糊，如**街道16号，17号，18号，</div>
            <div>或**大厦未精确到具体门牌号；</div>
          </li>
          <li>4、单次交易限值2000元以内，关税免征；</li>
          <li>5、确保订单身份信息、联系电话及地址真实性。</li>
        </ul>
      </div>
    );
    const cartList = (
      this.state.productList.length>0?
        <div className='content'>
          <div className='cartTable'>
            <table>
              <thead>
              <tr>
                <th colSpan='2'className='product'>商品信息</th>
                <th>购买数量</th>
                <th>单价</th>
                <th>小计</th>
                <th>实付</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.productList.map((item,index) => {
                  return(
                    <tr key={index}>
                      <td className='goods-avatar'>
                        <div className='imgBox'><img src={baseImgUrl+item.imageURL} alt=""/></div>
                      </td>
                      <td className='name-td'>
                        <div className='goodName'>{item.productName}</div>
                        <div className='tags'>{item.productTags}</div>
                      </td>
                      <td>{item.productNumber}</td>
                      <td className='color-item'>￥{item.price?parseInt(item.price).toFixed(2):''}</td>
                      <td className='color-item'>￥{item.price?(item.productNumber*item.price).toFixed(2):''}</td>
                      <td className='color-item'>￥{item.price?(item.productNumber*item.price).toFixed(2):''}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
            <div className='otherTips clearfix'>
              <div className='priceBox'>
                <div>
                 <span className='label2'> 商品总价:</span><span>￥{this.state.orderInfo.totalProductAmount?(this.state.orderInfo.totalProductAmount-0).toFixed(2):''}</span>
                  +
                  <span className='label2'>税费:</span><span>￥{this.state.orderInfo.tax?(this.state.orderInfo.tax-0).toFixed(2):''}</span>
                  +
                  <span className='label2'>运费:</span><span>￥{this.state.orderInfo.postage?(this.state.orderInfo.postage-0).toFixed(2):''}</span>
                </div>
                <div className="payment-box">
                  <div className='clearfix item'>
                    <div className='amount'><span>应付金额:</span><span className='price'> ￥{(this.state.orderInfo.payAmount-0).toFixed(2)}</span></div>
                  </div>
                  <div className='clearfix item'>
                    <div className="btn btn-danger btn-fr" onClick={this.confirmOrderAndPayment}>下单并付款</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        null
    )
    const productList = (
      this.state.productList.length>0?<div className="content">
        <div className="item clearfix">
          <div className="label">商品名称:</div>
          <div className="cont conter clearfix">
            <Link to="/goods" className="goodsImg">
              <img src={baseImgUrl+this.state.productList[0].imageURL} alt=""/>
            </Link>
            <div className="goodsName">
              <h2>
                <Link to="/goods">{this.state.productList[0].productName}</Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="item clearfix">
          <div className="label" style={{paddingTop:'18px'}}>规格:</div>
          <div className="cont clearfix"> {this.state.productList[0].productTags}</div>
        </div>
        {/*<div className="item clearfix">*/}
          {/*<div className="label laber">购买数量:</div>*/}
          {/*<div className="cont buyNum clearfix">*/}
            {/*<div className="inputBox">*/}
              {/*<span className="handle" onClick={this.bindleReduce}>-</span>*/}
              {/*<input className="form-control count" type="text"*/}
                     {/*value={this.state.initBuyCount}*/}
                     {/*onInput={this.bindleInput}*/}
                     {/*onChange={this.inputBuyCount}/>*/}
              {/*<span className="handle" onClick={this.bindleAdd}>+</span>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="item clearfix">*/}
          {/*<div className="label">库存:</div>*/}
          {/*<div className="cont stock clearfix">*/}
            {/*<div className="">*/}
              {/*<span>{this.state.productList[0].stockNumber}</span>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="item clearfix">*/}
          {/*<div className="label">优惠券:</div>*/}
          {/*<div className="cont coupon clearfix">*/}
            {/*<div className="inputBox">*/}
              {/*<select className="form-control"*/}
                      {/*value={this.state.couponVal}*/}
                      {/*onChange={this.bindCouponVal}*/}
                      {/*disabled={this.state.couponList.length ? '' : true}>*/}
                {/*{*/}
                  {/*this.state.couponList.length ?*/}
                    {/*this.state.couponList.map((item, i) =>*/}
                      {/*<option key={i} value={item.couponId}>{item.couponName}</option>*/}
                    {/*) :*/}
                    {/*<option>没有可以使用的优惠券</option>*/}
                {/*}*/}
              {/*</select>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className="item clearfix">
          <div className="label" style={{paddingTop:'15px'}}>含税金额:</div>
          <div className="cont price clearfix conter">
            <div className="box">
              <span className="price">{this.state.orderInfo.orderAmount}</span>
              <span className="tips"> (含税费: ￥{this.state.orderInfo.tax})</span>
            </div>
          </div>
        </div>
        <div className="item clearfix">
          <div className="label laber">留言:</div>
          <div className="cont mark clearfix">
            <div className="inputBox">
                      <textarea
                        placeholder="购买需求的补充说明"
                        value={this.state.saleMark}
                        onChange={this.bindMarkVal}
                        className='text'
                        
                      />
            </div>
          </div>
        </div>
      </div>:null
    )
    const addressList = (
      <div className='selectBox clearfix'>
       <ul>
         {
           this.state.addressList&&this.state.addressList.length>0&&
             this.state.addressList.map((item,index) =>
           <li className={this.state.curCustomer.addressId===item.addressId?'address-item cur':'address-item'}
               key={index}
               onClick={this.selectAddressId.bind(this,item,index)}
           >
             {
               !item.isValidIdentity? <div className='warning'>
                 未实名认证
               </div>:<div className='danger'>已实名认证</div>
             }
           <div className="updateBox clearfix">
              <span className="btn-item" onClick={this.updateAddress.bind(this,item)}>
              修改
              </span>
              <span className='btn-item' onClick={this.showConfirmDel.bind(this,item)}>
              删除
              </span>
           </div>
           <div className='item1'>
             <span className='conter'>{item.consignee}</span>
             <span>&nbsp;&nbsp;&nbsp;</span>
             <span className='conter'>{item.consigneePhone}</span>
           </div>
             <div className='item1'>
               {/*<span className='label1'>收货地址：</span>*/}
               <span className='conter res'>{item.provinceName}{item.cityName}{item.areaName}{item.address}</span>
             </div>
           <div className='item1'>
            {/*<span className='label1'>联系方式：</span>*/}
           
           </div>
           </li>
           )
         }
       </ul>
      </div>
    )
    const editBox = (
      <div className='addressAddBox'>
        <div className='itemBox clearfix'>
          <div>
            <div className="label">收货人:</div>
            <div className={this.state.checkReceiver ? 'cont receiver' : 'cont receiver hasError'}>
              <div className="inputBox clearfix">
                <input
                  className={'form-control inline'} type="text" placeholder="收货人"
                  value={this.state.receiverVal}
                  onChange={this.bindleReceiver}
                />
              </div>
              <div className="errorBox">
                <i className="fa fa-info-circle"/>
                请输入收货人姓名
              </div>
            </div>
          </div>
        </div>
        <div className="itemBox clearfix">
          <div>
            <div className="label">联系电话:</div>
            <div className={this.state.checkPhone ? 'cont phone' : 'cont phone hasError'}>
              <div className="inputBox clearfix">
                <input
                  className={'form-control inline'} type="text" placeholder="联系电话"
                  value={this.state.phoneVal}
                  onChange={this.bindlePhone}
                />
                {/*<div className="btn btn-primary inline" onClick={this.showModal}>选择老用户</div>*/}
              </div>
              <div className="errorBox">
                <i className="fa fa-info-circle"/>
                请输入手机号码
              </div>
            </div>
          </div>
        </div>
        {
          this.state.needIdentification?
            <div>
              <div className="itemBox clearfix">
                <div>
                  <div className="label">身份证姓名:</div>
                  <div className={this.state.checkRealName ? 'cont phone' : 'cont phone hasError'}>
                    <div className="inputBox clearfix">
                      <input
                        className={'form-control inline'} type="text" placeholder="请输入身份证姓名"
                        value={this.state.realName}
                        onChange={this.bindleRealName}
                      />
                    </div>
                    <div className="errorBox">
                      <i className="fa fa-info-circle"/>
                      请输入身份证姓名
                    </div>
                  </div>
                </div>
              </div>
              <div className="itemBox clearfix">
                <div>
                  <div className="label">身份证号码:</div>
                  <div className={this.state.checkIdCard ? 'cont phone' : 'cont phone hasError'}>
                    <div className="inputBox clearfix">
                      <input
                        className={'form-control inline'} type="text" placeholder="请输入身份证号码"
                        value={this.state.idCardVal}
                        onChange={this.bindleIdCard}
                      />
                    </div>
                    <div className="errorBox">
                      <i className="fa fa-info-circle"/>
                      请输入身份证号码
                    </div>
                    <div className="help-block" style={{padding:'3px 6px'}}>
                      <Popover content={content} title={title}>
                        <i className="fa fa-question-circle"/>
                        为什么要提供身份证？
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>:null
        }
        <div className="itemBox clearfix">
          <div>
            <div className="label">收货地址:</div>
            <div className={this.state.checkRegion ? 'cont region' : 'cont region hasError'}>
              <div className="inline-form">
                <select
                  className='form-control'
                  onChange={this.bindleProvince}
                >
              
                  {
                    this.state.provinceList ?
                      this.state.provinceList.map((province, i) =>
                        province.areaId ?
                          <option value={province.areaId}
                                  key={i}
                                  selected={this.state.provinceVal===province.areaId}
                          >{province.areaName}</option>
                          :
                          <option key={i} selected={!this.state.provinceVal}>{province.areaName}</option>
                      ) :
                      <option>请选择省</option>
                  }
                </select>
              </div>
              <div className="inline-form">
                <select className='form-control'
                        onChange={this.bindleCity}
                >
                  {
                    this.state.cityList ?
                      this.state.cityList.map((city, i) =>
                        city.areaId ?
                          <option value={city.areaId}
                                  key={i}
                                  selected={this.state.cityVal===city.areaId}
                          >{city.areaName}</option>
                          :
                          <option key={i} selected={!this.state.cityVal}>{city.areaName}</option>
                      ) :
                      <option>请选择市</option>
                  }
                </select>
              </div>
              <div className="inline-form">
                <select  className='form-control'
                         onChange={this.bindleArea}
                >
                  {
                    this.state.areaList ?
                      this.state.areaList.map((area, i) =>
                        area.areaId ?
                          <option value={area.areaId} key={i} selected={this.state.areaVal===area.areaId}>{area.areaName}</option>
                          :
                          <option key={i} selected={!this.state.areaVal}>{area.areaName}</option>
                      ) :
                      <option value="">选择县\区</option>
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='itemBox clearfix'>
          <div>
            <div className='label'>详细地址</div>
            <div className='cont'>
              <div className={this.state.checkAddress ? 'address' : 'address hasError'}>
                <div className='inputBox clearfix'>
                                <textarea
                                  placeholder="详细地址"
                                  className='text'
                                  value={this.state.addressVal}
                                  onChange={this.bindleAddress}
                                ></textarea>
                </div>
                <div className="errorBox">
                  <i className="fa fa-info-circle"/>
                  请输入收货地址
                </div>
                <div className="help-block">
                  <Popover content={contentB} title={titleB}>
                    <i className="fa fa-question-circle"/>
                    为避免地址频繁使用被海关拉黑,请尽量使用消费者地址收货
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    const remarkForm = (
      <div className='remark-main'>
        {
          this.state.userType === '1' &&
          <div className='remark-item clearfix'>
            <span className='label fl'>填写补单号 :</span>
            <div className='fl'><Input className='ipt' onChange={this.getOrderNum}/></div>
          </div>
        }
        <div className='remark-item clearfix'>
          <span className='label fl'>填写备注 :</span>
          <div className='fl'><Input.TextArea className='ipt' onChange={this.getRemark}></Input.TextArea></div>
        </div>
      </div>
    )
    return (
      <div className="confirmOrder-page">
          <IHeader userInfo={this.state.userInfo}/>
          <HomeHeader isHome={false} isBuyStatus={true} buyStatus={1}/>
        <Spin spinning={this.state.showLoading}>
          <div className="page-box minW">
            <div className="form-content">
              <div className="form-box">
                <div className="title">
                  <h2>收货地址</h2>
                </div>
                <div className="content clearfix">
                  <div className="item clearfix">
                    {
                      !this.state.selectedMod?
                        editBox:addressList
                    }
                    <Pagination
                      defaultCurrent={1}
                      current={this.state.pageIdx}
                      pageSize={this.state.pageSize}
                      total={this.state.total}
                      onChange={this.pageChange}
                      hideOnSinglePage={true}
                    />
                  </div>
                  {
                    !this.state.selectedMod?
                      <div className='addBtnBox'>
                        <div className='addSave addBtn' onClick={this._saveAddressDetails}>保存地址</div>
                        {
                          this.state.isEmpty==='0'&&!this.state.selectedMod&&
                          <div className='addBtn addSave' onClick={this.cancelEdit}>取消</div>
                        }
                      </div>:
                      <div className='updateBtnBox clearfix'>
                        <div className='addBtn' onClick={this.addAddress}>新建地址</div>
                      </div>
            
                  }
                </div>
              </div>
              <div className="form-box remark-box">
                <div className='title list'>
                  <h2>备注信息</h2>
                </div>
                {
                  remarkForm
                }
              </div>
              <div className="form-box">
                <div className='title list'>
                  <h2>商品清单</h2>
                </div>
                {
                  cartList
                }
              </div>
            </div>
          </div>
        </Spin>
        <Modal
          title="选择老客户"
          width="1000px"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="form-inline order-search">
            <div className="form-group">
              <div className="label">客户:</div>
              <input type="text" className="form-control input-sm gd" placeholder="" name="name" onInput={this.getName}/>
            </div>
            <div className="form-group">
              <div className="label">联系号码:</div>
              <input type="text" className="form-control input-sm gd" placeholder="" name="mobile" onInput={this.getMobile}/>
            </div>
            <div className="btn btn-primary btn-sm" onClick={this.getList}>查询</div>
          </div>
          <div className="addressList">
            <table>
              <thead>
              <tr>
                <th>编号</th>
                <th>收货人</th>
                <th>联系电话</th>
                <th>身份证号码</th>
                <th>地址</th>
                {/*<th>邮编</th>*/}
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              {
                !this.state.addressList.length ? null :
                  this.state.addressList.map((item, i) =>
                    <tr className="item" key={i}>
                      <td className="snb-box bx">{i+1}</td>
                      <td>{item.consignee}</td>
                      <td>{item.consigneePhone}</td>
                      <td>{item.idcardNo}</td>
                      <td className="ad-box">
                        <div>
                          {item.provinceName} {item.cityName} {item.areaName}
                          <br/>
                          {item.address}
                          </div>
                        <div>{item.fullAddress}</div>
                      </td>
                      {/*<td>{item.youbian || '无'}</td>*/}
                      <td>
                        <div className="btn btn-sm btn-primary selectBtn" onClick={this.selectAddressId.bind(this, item)}>选择</div>
                      </td>
                    </tr>
                  )
              }
              </tbody>
            </table>

          </div>
          <Pagination
            defaultCurrent = '1'
            total = {this.state.total}
            onChange = {this.changePage}
            current = {this.state.pageIdx}
            defaultPageSize = {this.state.pageSize}
          />
        </Modal>
        <Modal
          title="修改信息"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
          <div className='updateInfo'>
            {editBox}
          </div>
        </Modal>
        {/*身份认证*/}
        <IdBox
          visible={this.state.visible1}
          handleOk1 ={this.handleOk1}
          handleCancel1 ={this.handleCancel1}
          wrappedComponentRef={this.saveFormRef}
          productType = {this.state.productType}
          submitImg = {this.submitImgEnv}
          
        />
        <PageFooter/>
      </div>
      
    )
  }
}
const IdBox = Form.create()(
  class extends React.Component{
    state = {
    
    }
    handleChange = (info) => {
      // console.log('上传进度---------',info)
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        let res = info.file.response
        console.log('-------------',res)
        this.setState({
          imageUrl : res.data.imagePath,
          loading : false
        },() => {
          this.props.submitImg(this.state.imageUrl,'0')
        })
      
      }
    }
    handleChange1 = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading1: true });
        return;
      }
      if (info.file.status === 'done') {
        let res = info.file.response
        console.log('-------------',info.file.response)
        this.setState({
          imageUrl1 : res.data.imagePath,
          loading1 : false
        },() => {
          this.props.submitImg(this.state.imageUrl1,'1')
        })
      
      }
    }
    render(){
      const { visible, handleOk1, handleCancel1, form } = this.props;
      const { getFieldDecorator } = form;
      const title = (
        <div className='id-title'>
          <div>海关总署令147号第22条规定</div>
        </div>
      )
      const content = (
        <div className='id-content'>
          <p>个人物品类进出境快件报关时，运营人应当向海关提交《中华人民共和国海关进出境快件个人物品申报单》（见附件二）</p>
          <p>每一进出境快件的分运单、进境快件收件人或出境快件发件人身份证件影印件和海关需要的其它单证。</p>
        </div>
      )
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">{this.state.tips1}</div>
        </div>
      )
      const uploadButton1 = (
        <div>
          <Icon type={this.state.loading ? 'loading1' : 'plus'} />
          <div className="ant-upload-text">{this.state.tips2}</div>
        </div>
      )
      const imageUrl = this.state.imageUrl
      const imageUrl1 = this.state.imageUrl1
      
      return(
        <Modal
          title='上传身份信息'
          width='600px'
          visible={visible}
          onOk = {handleOk1}
          onCancel={handleCancel1}
        >
          <Form layout="vertical">
            <FormItem label="您的真实姓名">
              {getFieldDecorator('realName', {
                rules: [{ required: true, message: '请输入身份证姓名!' }],
                // initialValue : this.state.realName
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label="你的身份证号码">
              {getFieldDecorator('idCardVal', {
                rules: [{ required: true, message: '请输入身份证号码!' }],
                // initialValue : this.state.idCartVal
              })(
                <Input/>
              )}
            </FormItem>
          </Form>
          <div className="help-block id-pop">
            <Popover content={content} title={title}>
              <i className="fa fa-question-circle"/>
              为什么要提供身份证？
            </Popover>
          </div>
          {
            this.props.productType=='3'&&
            <div className='upload-box'>
              <div className='title'>直邮商品需上传身份证正反面</div>
              <div className="clearfix upLoadBox">
                <div>
                  <Upload
                    action={`${baseUrl}/upload/webUploadImage`}
                    listType="picture-card"
                    showUploadList={false}
                    onChange={this.handleChange}
                    style={{marginRight:'20px'}}
                  >
                    {imageUrl ? <img src={baseImgUrl+imageUrl} alt="avatar" className='avatarImg' /> : uploadButton}
                  </Upload>
                  <div className='text'>身份证正面</div>
                </div>
                <div>
                  <Upload
                    action={`${baseUrl}/upload/webUploadImage`}
                    listType="picture-card"
                    showUploadList={false}
                    onChange={this.handleChange1}
                  >
                    {imageUrl1 ? <img src={baseImgUrl+imageUrl1} alt="avatar" className='avatarImg' /> : uploadButton1}
                  </Upload>
                  <div className='text'>身份证反面</div>
                </div>
              </div>
            </div>
          }
          {
            this.state.showMsg &&
            message.error('请上传完整的身份证照片')
          }
        </Modal>
      )
    }
  }
)
