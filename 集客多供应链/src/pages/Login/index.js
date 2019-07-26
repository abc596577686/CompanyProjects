import React from 'react';
import {Form, Icon, Input, Button, message, Row, Col} from 'antd';
import {getVerifyCode, userLogin} from '../../axios/api';
import './login.less'
import {ERR_OK} from "../../axios/config";

import logo from '../../resource/assets/images/zhiguo.png';
import loginBg from '../../resource/assets/images/login-bg.png'

const FormItem = Form.Item;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('登录页');
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="login-page">
        <div className="login-header">
          <img className="img-logo" src={logo} alt=""/>
          <div className="logo-text">智果供应链管理</div>
        </div>
        {/* 登录模块 */}
        <div className="loginContainer">
          <img className="loginBg" src={loginBg} />
          <WrappedLoginForm jumpGoods={this.jumpGoods} history={this.props.history}/>
        </div>
        <div className="login-footer">
          <div>copyright 2018 智果 版权所有 渝icp备 16010116号-2</div>
        </div>
      </div>
    )
  }
}

// 登录表单
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._getVerifyCode()
  }

  state = {
    imgEcode: ''
  };

  _userLogin(params) {
    userLogin(params).then(res => {
      console.log('登录：', res);
      if (res.data.code !== ERR_OK) {
        console.log('登录失败');
        message.info(res.data.msg);
        this._getVerifyCode();
        return;
      }
      if (res.data.code === ERR_OK) {
        localStorage.setItem('token', res.data.data);
        localStorage.setItem('__isLogin__', true);
        // let dataList = JSON.parse(res.data.dataList)
        // console.log(typeof(res.data.dataList))
        localStorage.setItem('_menulist_', JSON.stringify(res.data.dataList))
        this.props.history.replace('/home');
      }
    })
  }

  handleSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err);
      if (!err) {
        console.log('接收到的提交信息： ', values);
        let params = {
          username: values.userName,
          password: values.password,
          verifyCode: values.verifyCode
        };
        this._userLogin(params);
      }
    });
  };

  getEcode = () => {
    this._getVerifyCode();
  };

  _getVerifyCode() {
    getVerifyCode({}, 'GET').then(res => {
      console.log(res)
      if (res.data.code !== ERR_OK) {
        message.error(res.data.msg);
        return;
      }
      if (res.data.code === ERR_OK) {
        let imgEcode = `data:image/jpeg;base64,${res.data.data}`;
        this.setState({
          imgEcode
        })
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="loginWrap">
        <div className="login-title-wrap">
          <h3 className="login-title">账号登录</h3>
        </div>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入您的用户名!'}],
            })(
              <Input prefix={
                <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
              } placeholder="用户名"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入您的密码!'}],
            })(
              <Input prefix={
                <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>
              } type="password"
                     placeholder="密码"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('verifyCode', {
              rules: [{required: true, message: '请输入验证码!'}],
            })(
              <Row>
                <Col span={16}>
                  <Input prefix={
                    <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>
                  } type="text"
                         placeholder="验证码"/>
                </Col>
                <Col span={8} style={{paddingLeft: '4px', paddingRight:'4px'}}>
                  <div onClick={this.getEcode} style={{width:'100%'}}>
                    <img src={this.state.imgEcode} alt="验证码"/>
                  </div>
                </Col>
              </Row>

            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            {/*<a href="">注册</a>*/}
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create()(LoginForm);