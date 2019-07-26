import React from 'react'
import './index.less'
import {Input,Upload,Select,Icon,Button,Modal} from 'antd'
import { getValForKey,dateFormate} from '../../utils/utils'
import IHeader from '../../components/Header';
import Process from '../../components/ProcessList'
import GoodTable from '../../components/OrderItem'
import OrderInfo from '../../components/OrderInfo'
import {getOrderDetail} from '../../axios/api'
function Title(props){
  return(
    <div className='title_box'>
      <div className='titleBtn'>{props.btnInfo}</div>
    </div>
  )
}
export default class AfterSale extends React.Component{
  state = {
    processList: [
    ],
    refundList : [
      '填写申请',
      '平台处理',
      '处理完成'
    ],
    reGoodList : [
      '填写申请',
      '平台处理',
      '寄回商品',
      '平台收货',
      '处理完成'
    ],
    fileList : [
    
    ],
    logFileList : [],
    previewVisible: false,
    previewImage: '',
    refundType : '2',
    status : 1,
    //是否可填写
    disabled : false,
    //是否是填写物流
    isEditLog : false
  
  }
  componentDidMount() {
    let query = this.props.location.search
    let orderId = getValForKey(query,'orderId')
    let processList = this.state.refundType === '1'? this.state.refundList : this.state.reGoodList
    this.setState({
      orderId,
      showLoading : true,
      processList
    },() => {
      this._getOrderDetail()
      this._setInpDisable()
      this.showEditLog()
    })
  }
  //订单详情
  _getOrderDetail =() => {
    let params = {orderId : this.state.orderId}
    
    this.setState({
      showLoading : true
    })
    getOrderDetail(params).then(res => {
      console.log('订单详情',res)
      let orderInfo = res.data.orderInfo
      let orderItemList = res.data.orderItemList
      let packageInfo = res.data.orderPackageList
      this.setState({
        orderInfo,
        orderItemList,
        showLoading : false
      })
    })
  }
  //设置是否可输入
  _setInpDisable = () => {
    if(this.state.status != 1){
      this.setState({
        disabled : true
      })
    }
  }
  //设置是否是编辑物流
  showEditLog = () =>{
    if(this.state.refundType === '2' && this.state.status == 3){
      this.setState({
        isEditLog: true
      })
    }
  }
  renderProcess = () => {
    return (this.state.processList.map((item,index) => {
      return <Process data={item} length={this.state.processList.length} step={this.state.status} index={index} key={index} type={this.state.refundType}/>
    }))
  }
  //上传
  handleChange = ({ fileList }) => {
    this.setState({
      fileList
    })
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  refundTypeChange = (val) => {
    console.log(val)
    this.setState({
      refundType : val,
      processList : val === '1'? this.state.refundList : this.state.reGoodList
    })
    
  }
  reasonChange = (val) => {
    this.setState({
      reason : val
    })
    
  }
  refundNum = (e) => {
    this.setState({
      refundNum : e.target.value
    })
  }
  refundInfo = (e) => {
    this.setState({
      refundInfo : e.target.value
    })
  }
  submitRefund = () => {
  
  }
  //提交物流
  getLogCompany = (val) => {
    this.setState({
      companyValue : val
    })
    
  }
  getLogNum = (e) => {
    this.setState({
      logNum : e.target.value
    })
  }
  submitLogInfo = () =>{
    let fileList = this.state.fileList
  }
  render(){
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    //填写退货信息
    const refundForm = (
    <div>
      <Title btnInfo='申请售后'/>
      <div className='Form clearfix'>
        <div className='form_item'>
          <div className='label'>选择退款类型：</div>
          <div className='ipt'>
            <Select
              style={{width:'400px'}}
              onChange={this.refundTypeChange}
              defaultValue='退款'
              value={this.state.refundType}
              disabled={this.state.disabled}
            >
              <Select.Option value='1'>退款</Select.Option>
              <Select.Option value='2'>退货退款</Select.Option>
            </Select>
          </div>
        </div>
        <div className='form_item'>
          <div className='label'>选择原因：</div>
          <div className='ipt'>
            <Select style={{width:'400px'}}
                    onChange={this.reasonChange}
                    value={this.state.reason}
                    disabled={this.state.disabled}
            >
              <Select.Option value='1'>不想要了</Select.Option>
              <Select.Option value='2'>商品有问题</Select.Option>
              <Select.Option value='3'>拍错了</Select.Option>
            </Select>
          </div>
        </div>
        <div className='form_item'>
          <div className='label'>申请退款金额：</div>
          <div className='ipt'>
            <Input onChange={this.refundNum}
                   type='number'
                   value={this.state.refundNum}
                   disabled={this.state.disabled}
            />
            <span className='info'>最多￥340</span>
          </div>
        </div>
        <div className='form_item'>
          <div className='label'>退款说明：</div>
          <div className='ipt'>
            <Input.TextArea onChange={this.refundInfo}
                            disabled={this.state.disabled}
                            value={this.state.refundInfo}
            >
        
            </Input.TextArea>
          </div>
        </div>
        {
          !this.state.disabled &&
          <div className='form_item'>
            <div className='label'>上传图片：</div>
            <div className='ipt'>
              <div className="upload clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
              </div>
             
              <Button type='primary'
                      style={{marginTop:'50px'}}
                      onClick={this.submitRefund}
              >
                提交申请
              </Button>
            </div>
          </div>
        }
      </div>
    </div>
    )
    //填写物流
    const logForm = (
      <div>
        <Title btnInfo='填写物流'/>
        <div className='Form'>
          <div className='form_item'>
            <div className='label'>选择物流公司：</div>
            <div className='ipt'>
              <Select
                style={{width:'400px'}}
                onChange={this.getLogCompany}
                placeholder='请选择快递公司'
                value={this.state.companyValue}
              >
                <Select.Option value='1'>中通快递</Select.Option>
                <Select.Option value='2'>申通快递</Select.Option>
                <Select.Option value='3'>韵达快递</Select.Option>
              </Select>
            </div>
          </div>
          <div className='form_item'>
            <div className='label'>填写物流单号：</div>
            <div className='ipt'>
              <Input onChange={this.getLogNum} type='number' value={this.state.logNum}/>
            </div>
          </div>
          <div className='form_item'>
            <div className='label'>上传凭证：</div>
            <div className='ipt'>
              <div className="upload clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
              </div>
              <Button type='primary'
                      style={{marginTop:'50px'}}
                      onClick={this.submitLogInfo}
              >
                提交物流信息
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
    //填写物流
    const failFrom = (
      <div>
        <Title btnInfo='售后关闭'/>
        <div className='Form'>
          <div className='form_item'>
            <div className='label'>关闭原因：</div>
            <div className='ipt'>
             商品不支持退货
            </div>
          </div>
          <div className='form_item'>
            <div className='label'>审核时间：</div>
            <div className='ipt'>
              2019-3-28 00:00:00
            </div>
          </div>
        </div>
      </div>
    )
    return(
      <div className='after_container'>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <IHeader/>
        <div className='after_main minW'>
          <div className='main'>
            <div className='process_box'>
              <ul className='step_ul clearfix'>
                {this.renderProcess()}
              </ul>
            </div>
            {
              this.state.isEditLog? logForm : refundForm
            }
            {
              this.state.orderInfo && this.state.orderInfo.length>0 &&
              <GoodTable data={this.state.orderItemList}
                         orderInfo={this.state.orderInfo}/>
            }
          </div>
        </div>
      </div>
    )
  }
}