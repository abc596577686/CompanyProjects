import React from 'react';
import Header from '../../components/Header'
import HomeHeader from '../../components/HomeHeader'
import PageFooter from '../../components/PageFooter/index'
import './index.less'
import '../../../node_modules/antd/dist/antd.min.css'
import { Input,Modal, Form ,Pagination,Spin,message,Button} from 'antd';
import { ERR_OK} from '../../axios/config'
import {getAddressList,deleteAddress,saveAddressDetails,getRegionList,setDefaultAddress} from '../../axios/api'
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    state = {
    curEditInfo : {},
      selectMsg : ''
    }
    componentDidMount(){
      this._getRegionList()
    }
    componentWillReceiveProps(nextProps){
      let curEditInfo = nextProps.curEditInfo
      console.log('接受了',nextProps)
     if(curEditInfo != this.state.curEditInfo){
        console.log(curEditInfo,this.state.curEditInfo)
       //编辑时提交地址id
        this.props.submitId(curEditInfo.provinceId,'0')
        this.props.submitId(curEditInfo.cityId,'1')
        this.props.submitId(curEditInfo.areaId,'2')
       if(curEditInfo.provinceId){
         this.setState({
           curEditInfo : curEditInfo,
           provinceVal:curEditInfo.provinceId,
         },() => {
           let cityList = this._getCityList(this.state.provinceVal)
           this.setState({
             cityList,
             cityVal : curEditInfo.cityId,
           },() => {
             let areaList = this._getAreaList(this.state.cityVal)
             this.setState({
               areaVal : curEditInfo.areaId,
               areaList
             })
           })
      
         })
       }
       if(curEditInfo.provinceId==undefined){
         this.setState({
           curEditInfo,
           provinceVal : '',
           cityVal : '',
           areaVal : ''
         })
       }
     }
    }
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
          window.localStorage.setItem('_regionList_',JSON.stringify(regionList))
        }
      })
      // getRegionList().then(res => {
      //   if (res.data.code !== ERR_OK) {
      //     console.log('error');
      //   } else {
      //     let regionList = res.data.dataList;
      //     this.setState({
      //       regionList
      //     });
      //     window.localStorage.setItem('_regionList_',JSON.stringify(regionList))
      //     this.setState({
      //       provinceList: this._getProvinceList()
      //     });
      //
      //   }
      // })
    };
    // 省份列表
    _getProvinceList() {
      let provinceList = [];
      if(this.state.regionList&&this.state.regionList.length>0){
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
      }
      return provinceList;
    };
    // 城市列表
    _getCityList(curProvinceId) {
      let cityList = [];
      if(this.state.regionList&&this.state.regionList.length>0){
        this.state.regionList.forEach((province, index) => {
          if (province.areaId === curProvinceId) {
            cityList = province.dataList
          }
        });
        cityList.unshift({
          areaName: '请选择市'
        });
      }
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
      let curProvinceId = e.target.value
      console.log('-----------',curProvinceId)
      this.props.submitId(curProvinceId,'0')
      this.setState({
        provinceVal: curProvinceId,
        cityList: this._getCityList(curProvinceId),
        cityVal: null,
        areaVal: null,
        areaList : [{areaName : '请选择县\/区'}]
      })
    };
    // 城市选择
    bindleCity = (e) => {
      let curCityId = e.target.value
      this.props.submitId(curCityId,'1')
      this.setState({
        cityVal: curCityId,
        areaList: this._getAreaList(curCityId),
        areaVal: null
      })
    };
    // 区域选择
    bindleArea = (e) => {
      let curAreaId = e.target.value
      this.props.submitId(curAreaId,'2')
      this.setState({
        areaVal: curAreaId
      })
    };
    componentWillUpdate(nextProps, nextState){
    
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 19 },
        },
      };
      const formItemLayout1 = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      // console.log('渲染了',this.state.curEditInfo)
      // console.log(this.state.provinceVal,this.state.cityVal,this.state.areaVal)
      return (
        <Modal
          visible={visible}
          title="编辑客户信息"
          okText="保存"
          onCancel={onCancel}
          onOk={onCreate}
          destroyOnClose = {true}
          wrapClassName='addressBox'
        >
          <Form>
            <FormItem label="收货人" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入收货人姓名!' }],
                initialValue : this.state.curEditInfo.consignee
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label="手机号码" {...formItemLayout}>
              {getFieldDecorator('num', {
                rules: [{ required: true, message: '请输入收货人手机号码!' }],
                initialValue : this.state.curEditInfo.consigneePhone
              })(
                <Input type='number'/>
              )}
            </FormItem>
            <FormItem label="地址" {...formItemLayout1}>
                <div>
                    <select className="form-control"  onChange={this.bindleProvince}>
                      {
                        this.state.provinceList?
                          this.state.provinceList.map((province, i) =>
                            province.areaId ?
                              <option value={province.areaId} key={i} selected={this.state.provinceVal===province.areaId}>{province.areaName}</option>
                              :
                              <option key={i} selected={!this.state.provinceVal}>{province.areaName}</option>
                          ) :
                          <option>请选择省</option>
                      }
                    </select>
                    <select className="form-control" onChange={this.bindleCity}>
                      {
                        this.state.cityList ?
                          this.state.cityList.map((city, i) =>
                            city.areaId ?
                              <option value={city.areaId} key={i} selected={this.state.cityVal===city.areaId}>{city.areaName}</option>
                              :
                              <option key={i} selected={!this.state.cityVal}>{city.areaName}</option>
                          ) :
                          <option>请选择市</option>
                      }
                    </select>
                    <select className="form-control" value={this.state.areaVal} onChange={this.bindleArea}>
                      {
                        this.state.areaList ?
                          this.state.areaList.map((area, i) =>
                            area.areaId ?
                              <option value={area.areaId} key={i} selected={this.state.areaVal===area.areaId}>{area.areaName}</option>
                              :
                              <option key={i} selected={!this.state.areaId}>{area.areaName}</option>
                          ) :
                          <option value="">选择县\区</option>
                      }
                    </select>
                </div>
              {
                this.state.selectMsg &&
                <div className='msgBox'>{this.state.selectMsg}</div>
              }
            </FormItem>
            <FormItem label="详细地址" {...formItemLayout}>
              {getFieldDecorator('detail', {
                rules: [{ required: true, message: '请输入详细地址!' }],
                initialValue : this.state.curEditInfo.address
                
              })(
                <Input.TextArea />
              )}
            </FormItem>
            <FormItem label="身份证姓名" {...formItemLayout}>
              {getFieldDecorator('idcardName', {
                rules: [{ required: true, message: '请输入收货人真实姓名!' }],
                initialValue : this.state.curEditInfo.idcardName
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label="身份证号码" {...formItemLayout}>
              {getFieldDecorator('idcardNo', {
                rules: [{ required: true, message: '请输入收货人身份证号码!' }],
                initialValue : this.state.curEditInfo.idcardNo
              })(
                <Input/>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);
export default class Customer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible : false,
      // dataList : [],
      showConfirmBox : false,
      curEditInfo : {},
      pageIdx : 1,
      pageSize : 10,
      showLoading : true
    }
  }
  showLoadingEnv =()=> {
    this.setState({
      showLoading : true
    })
  }
  hideLoadingEnv =() => {
    this.setState({
      showLoading : false
    })
  }
  _getAddressList=() =>{
    this.showLoadingEnv()
    let params = {
      pageidx : this.state.pageIdx,
      pagesize :this.state.pageSize,
      name : this.state.curtomerName,
      mobile : this.state.curtomerMobile
    }
    getAddressList(params).then(res => {
      console.log('--------------请求成功',res)
      if(res.data.code == '1'){
        let dataList = res.data.data
        this.setState({
          dataList : dataList,
          total : res.data.total,
        })
        this.hideLoadingEnv()
      }
    })
  }
  showModal = (addressId) => {
    console.log('-----------',addressId)
    if(addressId !== '添加'){
      let data = this.state.dataList.filter(item => {
        if(item.addressId == addressId){
          return item
        }
      })
      //handleType 1.编辑 0.新建
      console.log('showModal------------------------',data)
      this.setState(
        {
        curEditInfo: data[0],
        handleType : '1',
        addressId
      })
    }else{
      this.setState({
        curEditInfo : {},
        handleType : '0'
      })
    }
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      addressId : ''
    });
  }
  componentWillMount(){
    this._getAddressList()
  }
  // _updateAddressDetails = () => {
  //   let params = {
  //     fullName: this.state.formData.name,
  //     mobile: this.state.formData.num,
  //     address: this.state.formData.detail,
  //     provinceId: this.state.formData.provinceId,
  //     cityId: this.state.formData.cityId,
  //     areaId: this.state.formData.areaId,
  //     idcardNo : this.state.formData.idcardNo,
  //     idcardName : this.state.formData.idcardName,
  //     customerId : this.state.customerId
  //   }
  //   updateAddress(params).then(res => {
  //     console.log('编辑更新',res)
  //     if(res.data.code=='1'){
  //       this.setState({
  //         visible : false,
  //         pageIdx : 1
  //       })
  //       this._getAddressList()
  //     }else{
  //       window.confirm(res.data.msg)
  //     }
  //   })
  //
  // }
  _saveAddressDetails = () => {
    let params = {
      consignee: this.state.formData.name,
      consigneePhone: this.state.formData.num,
      address: this.state.formData.detail,
      provinceId: this.state.formData.provinceId,
      cityId: this.state.formData.cityId,
      areaId: this.state.formData.areaId,
      idcardNo : this.state.formData.idcardNo,
      idcardName : this.state.formData.idcardName
    }
    if(this.state.handleType === '1'){
      params.addressId = this.state.addressId
    }
    saveAddressDetails(params).then(res => {
      // console.log(res)
      if(res.data.code=='1'){
        this.setState({
          addressId : '',
          visible : false,
          pageIdx : 1,
          
        })
        this._getAddressList()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  deleteAddressEnv() {
  let params = {
    addressId: this.state.addressId
  }
  deleteAddress(params).then(res => {
    this.setState({
      addressId : ''
    })
    if (res.data.code === '1') {
      message.success('删除成功')
      this._getAddressList()
    }else{
      message.error(res.data.msg)
    }
  })
}
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.provinceId = this.state.provinceId
      values.cityId = this.state.cityId
      values.areaId = this.state.areaId
     if(values.provinceId&&values.cityId&&values.areaId){
      // form.resetFields();
      console.log('---------------',values)
      this.setState({
        // visible: false,
        formData : values
      },()=>{
          this._saveAddressDetails()
      });
     }else{
      message.error('地址选择错误！')
     }
    });
  }
  setAreaId = (value,index) => {
    if(index == '0'){
      this.setState({
        provinceId : value
      })
    }else if(index=='1'){
      this.setState({
        cityId : value
      })
    }else if(index=='2'){
      this.setState({
        areaId : value
      })
    }
    
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  confirm = (e) => {
  console.log(e)
    this.deleteAddressEnv()
    
    this.setState({
      showConfirmBox : false
    })
  }
  cancel = (e) => {
    // console.log(e)
    this.setState({
      showConfirmBox : false,
      addressId : false
    })
  }
  showConfirmBox = (addressId) => {
    this.setState({
      showConfirmBox : true,
      addressId,
    })
  }
  changePage = (page,pageSize) => {
    this.setState({
      pageIdx : page,
      pageSize : pageSize,
    },() => {
      this._getAddressList()
    })
    
  }
  getCustomerName = (e) => {
    let value = e.target.value
    this.setState({
      curtomerName : value
    })

  }
  getCustomerMobile = (e) => {
    let value = e.target.value
    this.setState({
      curtomerMobile : value
    })
  }
  search = () => {
    this._getAddressList()
  }
  setAddressDefault = (addressId) =>{
    let params = {
      addressId
    }
    setDefaultAddress(params).then(res => {
      if(res.data.code==='1'){
        message.success('设置成功')
        this._getAddressList()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  render() {
    // console.log('xuanran')
    return (
              <div className='cus_container'>
                {/* <Header/> */}
                {/* <HomeHeader navIndex={2} isHome={false}/> */}
                <Modal
                  title="温馨提示"
                  visible={this.state.showConfirmBox}
                  onOk={this.confirm}
                  onCancel={this.cancel}
                >
                  <p>确认删除该地址？</p>
                </Modal>
                 <div className='cus_table'>
                   <Spin spinning={this.state.showLoading}>
                   <div className='table_search'>
                     <div className='search_item'>
                       <span>客户名称</span>
                       <Input placeholder='输入客户名称'  onInput={this.getCustomerName} size='small'/>
                     </div>
                     <div className='search_item'>
                       <span>联系号码</span>
                       <Input placeholder='输入联系号码'  onInput={this.getCustomerMobile} size='small'/>
                     </div>
                     <div className='search_item'>
                       <Button  onClick={this.search} style={{marginRight:'10px'}} size='small' type='primary'>查询</Button>
                       <Button  onClick={() => this.showModal('添加')} size='small' type='primary'>添加</Button>
      
                     </div>
                   </div>
                   {
                     this.state.dataList&&this.state.dataList.length>0?
                     <div className='table_box'>
                       <table className='table'>
                         <thead>
                         <tr>
                           <th>编号</th>
                           <th>收货人/联系电话</th>
                           <th>身份证姓名/号码</th>
                           <th>地址</th>
                           <th>操作</th>
                           {/*<th>设置默认</th>*/}
                         </tr>
                         </thead>
                         <tbody>
                         {
                           this.state.dataList.map((item,index)=>{
                             return(
                               <tr>
                                 <td className='index'>{index+1}</td>
                                 <td className='user'>
                                   {item.consignee}/{item.consigneePhone}
                                 </td>
                                 <td className='idcard'>{item.idcardName?item.idcardName+'/'+item.idcardNo:'未认证'}</td>
                                 <td className='address'>
                                   {item.provinceName+item.cityName+item.areaName}
                                   {item.address}
                                 </td>
                                 <td>
                                   <a href='javascript:void(0)' className='op' onClick={() => this.showModal(item.addressId)}>编辑</a>
                                   <span>&nbsp;|&nbsp;</span>
                                   <a href='javascript:void(0)' className='op' onClick={() => this.showConfirmBox(item.addressId)}>删除</a>
                                   <span>&nbsp;|&nbsp;</span>
                                   {
                                     item.isDefault==='1'?
                                       <span className='btn-address'>
                                         默认地址
                                       </span>:
                                       <span className='no-address' onClick={this.setAddressDefault.bind(this,item.addressId)}>
                                         设为默认
                                       </span>
                                   }
                                 </td>
                               </tr>
                             )
                           })
                         }
                         </tbody>
                       </table>
                     </div>
                       :
                       <div className='table_box' style={
                         {textAlign:'center',paddingTop:'100px',color:'#999',fontSize:'13px'}
                       }><span className='empty'>
                         客户列表为空
                       </span></div>
                   }
                   {
                     this.state.dataList && this.state.dataList.length > 0 ?
                       <Pagination
                         defaultCurrent={1}
                         total={this.state.total}
                         onChange={this.changePage}
                         current={this.state.pageIdx}
                         defaultPageSize={this.state.pageSize}
                         hideOnSinglePage ={true}
                       /> : null
                   }
                   </Spin>
                 </div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          submitId = {this.setAreaId}
          curEditInfo = {this.state.curEditInfo}
        />
                {/* <PageFooter/> */}
                
      </div>
    )
  }
}
