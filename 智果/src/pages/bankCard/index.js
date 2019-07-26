import React from 'react'
import './index.less'
import {Modal,Input,Select,Form,message,Spin} from 'antd'
import {allBankList,sendBankCode,bankCardList,untieCard,quickPaySign,quickPaySubmit} from '../../axios/api'
const confirm = Modal.confirm
const Option = Select.Option
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
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    state={
      codeMsg : '获取验证码',
      btnStatus : true,
      getMsg :false
    }
    //发送按钮
    getCode = () => {
      if(this.state.btnStatus){
        this.props.sendCode()
      }else{
        message.warn('请稍后获取')
      }
    }
    //倒计时
    countDown = () => {
      let time = 60
      let timer = setInterval(() => {
        time--
        this.setState({
          codeMsg : `${time}s后重新获取`,
          btnStatus : false
        })
        if(time<=0){
          clearInterval(timer)
          this.setState({
            codeMsg : '获取验证码',
            btnStatus : true
          })
        }
        
      },1000)
    }
    //银行列表
    _allBankList = () => {
      allBankList().then(res => {
        console.log(res)
        if(res.data.code == '1'){
          let bankList = res.data.bankList
          this.setState({
            bankList
          },() => {
            console.log(this.state.bankList)
          })
        }else{
          message.error(res.data.msg)
        }
      })
    }
    componentWillMount(){
      this._allBankList()
    }
    componentWillReceiveProps(nextProps){
      console.log('next------',nextProps)
      if(nextProps.getMsg !== this.state.getMsg){
        this.countDown()
        this.setState({
          getMsg : nextProps.getMsg
        })
      }
    }
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="添加银行卡"
          onCancel={onCancel}
          onOk={onCreate}
          className='bankModal'
        >
          <Form>
            <Form.Item label="银行" {...formItemLayout}>
              {getFieldDecorator('bankType', {
                rules: [{ required: true, message: '请选择银行!' }],
              })(
                <Select>
                  {
                    this.state.bankList && this.state.bankList.length>0&&
                      this.state.bankList.map(item => <Option value={item.bankId}>{item.name}</Option>)
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="银行卡类型" {...formItemLayout}>
              {getFieldDecorator('cardType',
                {
                  rules: [{ required: true, message: '请选择卡类型!' }],
                  initialValue : '1'
                }
              )(
                <Select>
                  <Option value='1'>借记卡</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="银行卡" {...formItemLayout}>
              {getFieldDecorator('bankNumber',{
                rules: [{ required: true, message: '请填写银行卡号!' }],
              })(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label="姓名" {...formItemLayout}>
              {getFieldDecorator('bankOwer',{
                rules: [{ required: true, message: '请填写账户名!' }],
              })(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label="身份证号" {...formItemLayout}>
              {getFieldDecorator('owerIdNum',{
                rules: [{ required: true, message: '请填写身份证号码!' }],
              })(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label="手机号" {...formItemLayout}>
              {getFieldDecorator('mobile',{
                rules: [{ required: true, message: '请填写预留手机号!' }],
              })(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label="验证码" {...formItemLayout} className={this.state.btnStatus?'':'verify'}>
              {getFieldDecorator('verifyCode',
              //   {
              //   rules: [{ required: true, message: '请填写验证码!' }],
              // }
              )(
                <Input.Search onSearch={this.getCode} enterButton={this.state.codeMsg} />
              )}
            </Form.Item>
           
          </Form>
        </Modal>
      );
    }
  }
);
export default class BankCard extends React.Component{
  state = {
    cardList : [
      // {
      //   id : 1,
      //   name : '农业银行',
      //   num : '6214****0892',
      // },
      // {
      //   id : 2,
      //   name : '农业银行',
      //   num : '6214****0892'
      // },
      // {
      //   id : 3,
      //   name : '农业银行',
      //   num : '6214****0892'
      // }
    ],
    getMsg : false
  }
  showModal = () => {
    this.setState({
      visible : true
    })
  }
  componentWillMount(){
    this._bankCardList()
  }
  //匹配银行图片
  matchBankImg = (id) => {
    let bankImgClassName
    switch (id){
      case '1' :
        bankImgClassName = 'gs'
        break;
      case '2' :
        bankImgClassName = 'ly'
        break;
      case '3' :
        bankImgClassName = 'zg'
        break;
      case '4' :
        bankImgClassName = 'js'
        break;
      case '5' :
        bankImgClassName = 'jt'
        break;
      case '6' :
        bankImgClassName = 'ms'
        break;
      case '7' :
        bankImgClassName = 'zs'
        break;
      case '9' :
        bankImgClassName = 'zx'
        break;
      case '10' :
        bankImgClassName = 'gf'
        break;
      case '11' :
        bankImgClassName = 'ptfz'
        break;
      case '12' :
        bankImgClassName = 'xy'
        break;
      case '13' :
        bankImgClassName = 'pa'
        break;
        
        
        
        
    }
    return bankImgClassName
  }
  handleOk = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if(!values.verifyCode){
        message.error('请输入验证码')
        return
      }
      
      console.log('Received values of form: ', values);
      this.setState({
        cardType : values.cardType,
        bankType : values.bankType,
        mobile:values.mobile,
        bankCardNumber:values.bankNumber,
        realName:values.bankOwer,
        identityNo:values.owerIdNum,
        cvvNumber:this.state.cvvNumber,
        expiredDate:this.state.expiredDate,
        smsCode:values.verifyCode
      },() => {
        this.bindBankCard()
      })
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  handleCancel = () => {
    this.setState({
      visible : false
    })
  }
  chooseCard = (item) => {
    if(this.props.type === 'control') return
    let id = item.quickCardId
    let cardList = this.state.cardList
    cardList && cardList.length>0 &&
    cardList.forEach(item => {
      if(item.quickCardId === id){
        item.isBind = true
        this.setState({
          curBankName : item.bankName,
          curBankNum : item.cardNumber,
          curQuickCardId : item.quickCardId
        })
      }else{
        item.isBind = false
      }
    })
    this.setState({
      cardList
    })
  
  }
  cancelBind = (item) =>{
    let quickCardId = item.quickCardId
    let that = this
    confirm({
      title: '解除绑定后银行服务将不可用，确认解除吗?',
      onOk() {
        console.log('OK');
        that.cancelBindCard(quickCardId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 头部文字
  headerTxt = () => {
    if(this.props.type === 'control'){
      return (
        <div>已绑定银行卡 <span>{this.state.cardList.length}</span> 张</div>
      )
    }else{
      return (
        <div style={{fontSize:'12px'}}>请选择用于支付的银行卡</div>
      )
    }
  }
  //快捷支付
  _quickPaySubmit = () =>{
    let params = {
      quickCardId : this.state.curQuickCardId,
      orderId : this.props.orderId
    }
    quickPaySubmit(params).then(res => {
      if(res.data.code==='1'){
      
      }else{
      
      }
    
    })
  }
  //支付
  bankBuy = () => {
    let that = this
    if(!this.state.curBankName){
      message.warn('请选择进行支付的银行卡')
      return
    }
    confirm({
      title: '确认支付',
      content : (
        <div>
          <div className='content-item clearfix'>
            <label className='fl'>订单金额 :</label>
            <div className='l fl'>{'￥'+ this.props.payAmount}</div>
          </div>
          <div className='content-item clearfix'>
            <label className='fl'>支付卡号 :</label>
            <div className='l fl'>{this.state.curBankNum}</div>
          </div>
        </div>
      ),
      onOk() {
        console.log('OK');
        that._quickPaySubmit()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //获取短信参数
  _sendCode = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.setState({
        mobile : values.mobile,
        bankCardNumber : values.bankNumber,
        realName : values.bankOwer,
        identityNo : values.owerIdNum
      },() => {
        this._sendBankCode()
      })
    });
  }
  //发送短信
  _sendBankCode =() =>{
    let params = {
      mobile : this.state.mobile,
      bankCardNumber : this.state.bankCardNumber,
      realName : this.state.realName,
      identityNo : this.state.identityNo
    }
    sendBankCode(params).then(res => {
      this.setState({
        getMsg : !this.state.getMsg
      })
      if(res.data.code === '1'){
        message.success(res.data.msg)
      }else{
        message.error(res.data.msg)
      }
    })
  }
  //银行卡列表
  _bankCardList =() =>{
    this.setState({
      showLoading : true
    })
    bankCardList().then(res => {
      this.setState({
        showLoading : false
      })
      if(res.data.code=='1'){
        let cardList = res.data.bankList
        this.setState({
          cardList
        })
      
      }else{
        message.error(res.data.msg)
      }
    })
  }
  //绑定银行卡
  bindBankCard = () => {
    let {
      cardType,
      bankType,
      mobile,
      bankCardNumber,
      realName,
      identityNo,
      cvvNumber,
      expiredDate,
      smsCode
    } = this.state
    let params = {
      cardType,
      bankType,
      mobile,
      bankCardNumber,
      realName,
      identityNo,
      cvvNumber,
      expiredDate,
      smsCode
    }
    quickPaySign(params).then(res => {
      if(res.data.code==='1'){
        message.error(res.data.msg)
      }else{
        message.error(res.data.msg)
      }
    
    })
  }
  //解除绑定
  cancelBindCard = (quickCardId) => {
    let params = {
      quickCardId
    }
    untieCard(params).then(res => {
      if(res.data.code=='1'){
        message.success(res.data.msg)
        this._bankCardList()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  render(){
    return(
      <div className='card-page'>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleOk}
          sendCode={this._sendCode}
          getMsg={this.state.getMsg}
        />
        <div className='card-header'>
          {this.headerTxt()}
        </div>
        <div className="card-main">
          <ul className='card-list'>
            {
              this.state.cardList && this.state.cardList.length>0 &&
              this.state.cardList.map(item => {
                return(
                  <li className={item.isBind?'card-item isBind':'card-item'} onClick={this.chooseCard.bind(this,item)}>
                    <div className='img-box fl'>
                      <div className={'card-img '+ this.matchBankImg(item.bankId)}></div>
                    </div>
                    <span className='card-name fl'>{item.cardNumber}</span>
                    {
                      this.props.type === 'control' &&
                      <span className='card-bind fr' onClick={this.cancelBind.bind(this,item)}>解除绑定</span>
                    }
                    {
                      item.isBind&&
                      <i className='fa fa-check-circle-o'></i>
                    }
                  </li>
                )
              })
            }
          </ul>
          <div className='card-add'>
            <div className='add-box' onClick={this.showModal}>
              <i className='fa fa-plus'></i>
              <span>添加银行卡</span>
            </div>
          </div>
          {
            this.props.type === 'choose'&&
              <div className='btnPay' onClick={this.bankBuy}>
                确认支付
              </div>
          }
        </div>
        
      </div>
    )
  }
}