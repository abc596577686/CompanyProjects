import React from 'react';
import { 
  Button,
  WingBlank,
  WhiteSpace,
  Card,
  Flex,
  InputItem,
  Toast,
} from 'antd-mobile';
import { userLogin, vertifyCode } from '../../../axios/api';
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
// import { createForm } from 'rc-form';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);


export default class GiftPack extends React.Component {
  componentDidMount() { 
    // this.inputRef.focus();
    this.getOtherCode()
    
  }

  state= {
    codeimg: '',
    mobile:'',
    password:'',
    verifyCode:'',
  }

  // 登录
  login=()=>{
    // if (this.state.mobile == '') {
    //   message.warning('请检查用户名哦亲')
    //   return;
    // }
    // if (this.state.password == '') {
    //   message.warning('请检查登录密码哦亲')
    //   return;
    // }
    // if (this.state.verifyCode == '') {
    //   message.warning('请检查验证码哦亲')
    //   return;
    // }
    this._login()
  }
  _login(){
    let params = {
      username: this.state.mobile,
      password: this.state.password,
      verifyCode: this.state.verifyCode
    }
    console.log(params)
    userLogin(params).then(res => {
      if(res.data.code == 1){
        // message.success(res.data.msg)
        Toast.success(res.data.msg, 1);
        localStorage.setItem('token', res.data.data);
        localStorage.setItem('__isLogin__', true);

        // let dataList = JSON.parse(res.data.dataList)
        // console.log(typeof(res.data.dataList))
        // localStorage.setItem('_menulist_', JSON.stringify(res.data.dataList))
        this.props.history.replace('/userCenter');
      }else{
        this.getOtherCode()
        Toast.fail(res.data.msg, 2);
        this.setState({
          verifyCode:''
        })
        // message.warning(res.data.msg)
      }
    })
  }

  // 更新新验证码
  getOtherCode=()=> {
    this._getverifyCode()
  }
  // 获取验证码
  _getverifyCode() {
    let params = {}
    vertifyCode(params).then(res => {
      let baseImg = 'data:image/png;base64,'+res.data.data  
      console.log(baseImg)
      // var baseImg='data:image/png;base64,'  
      // <img src={img_base} />
        this.setState({
          codeimg: baseImg
        });
      // }
    })
  }
  
  goLogin = () => {
    Toast.loading('登录中...', 0 , () => {
      // console.log('Load complete !!!');
    });
    this.login()
  }

  usernameHandle=(value)=>{
    this.setState({
      mobile: value,
    });
  }
  passwordHandle=(value)=>{
    this.setState({
      password: value,
    });
  }
  verifyCodeHandle=(value)=>{
    this.setState({
      verifyCode: value,
    });
  }

  render() {
    // const { getFieldProps } = this.props.form;
    const customIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
        <path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
      </svg>
    );
    return (
      <div id='superWebLogin'>
        {/* <WingBlank size="md"> */}
        {/* <WhiteSpace size="lg" /> */}
        <Flex
          direction='row'
          justify='center'
        >
          <Card
            className='loginCard'
          >
            <Card.Header
              title="登录"
              className='loginHeader'
              // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              // extra={<span></span>}
            />
            <Card.Body
              className='loginBody'
            >
              <div>
                <Flex
                  direction='row'
                  justify='center'
                  wrap='wrap'
                >
                  <InputItem
                    type="number"
                    placeholder="请输入账号"
                    onChange={this.usernameHandle}
                    value={this.state.mobile}
                  >账号</InputItem>
                  <InputItem
                    type="password"
                    placeholder="请输入密码"
                    onChange={this.passwordHandle}
                    value={this.state.password}
                  >密码</InputItem>
                  <InputItem
                    type="number"
                    placeholder="请输入验证码"
                    maxLength='4'
                    onChange={this.verifyCodeHandle}
                    value={this.state.verifyCode}
                  >验证码
                    {/* <div className='ewCodeimg' onClick={this.getOtherCode}><img className='codeimg' src={this.state.codeimg} /></div> */}
                  </InputItem>
                  <div className='ewCodeimg' onClick={this.getOtherCode}><img className='codeimg' src={this.state.codeimg} /></div>
                </Flex>
              </div>
            </Card.Body>
            <Button
              // icon="check-circle-o"
              activeStyle={{ backgroundColor: '#fff',color:'#002140' }}
              className='btnName'
              type='primary'
              onClick={this.goLogin}
            >确认</Button>
          </Card>
        </Flex>
          {/* <WhiteSpace size="lg" /> */}
        {/* </WingBlank> */}
      </div>
    )
  }
}