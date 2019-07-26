import React from 'react';
import {Menu, Icon, Form, Input, Col, Button, Upload, message, List, Modal} from 'antd';
import './index.less';
import avatar from '../../resource/assets/images/zhiguo.png';
import {getFileUploadURL, getUserInfo, updateUserInfo, updatePassword} from "../../axios/api";
import {baseUrl, ERR_OK} from "../../axios/config";

const FormItem = Form.Item;
const {TextArea} = Input;
const InputGroup = Input.Group;

class UpdateUserInfoForm extends React.Component {
  state = {
    selectKey: '0',
    userId: '',
    userAvatar: avatar,
    avatar: '',
    phone: '',
    email: '',
    nickName: '',
    remark: '',
    leftMenu: ['基本设置', '安全设置', '权限设置'],
    infoTitle: '基本设置',
    visiblePassword: false,
    visiblePhone: false,
    originPassword: '',
    newPassword: '',
    reNewPassword: '',
  };

  listData = [
    {
      title: '账号密码',
      description: '密码不要透漏于他人',
      type: 'password'
    },
    // {
    //   title: '密保手机',
    //   description: (
    //     <div>
    //       已绑定手机：<span>{this.state.phone}</span>
    //     </div>
    //   ),
    //   type: 'phone'
    // },
    // {
    //   title: '备用邮箱',
    //   description: (
    //     <div>
    //       已绑定邮箱：<span>{this.state.email}</span>
    //     </div>
    //   ),
    //   type: 'email'
    // }
  ];

  componentDidMount() {
    getUserInfo({}, 'GET').then(res => {
      console.log('用户信息：', res);
      if (res.data.code !== ERR_OK) {
        message.error(res.data.msg);
        return;
      }
      if (res.data.code === ERR_OK) {
        let userInfo = res.data.data;
        let {email, fullName, mobile, remark, headImage, userId} = userInfo;
        this.setState({
          nickName: fullName,
          phone: mobile,
          userAvatar: headImage ? `${baseUrl}/${headImage}` : avatar,
          avatar: headImage,
          remark,
          email,
          userId,
        })
      }
    })
  }

  selectKey = ({key}) => {
    // console.log(key);
    this.setState({
      selectKey: key,
      infoTitle: this.state.leftMenu[key]
    })
  };

  updateInfo = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    let {userId, email, nickName, phone, remark, avatar} = this.state;

    let params = {
      userId: userId,
      email: email,
      fullName: nickName,
      headImage: avatar,
      mobile: phone,
      remark
    };
    console.log('提交信息：', params);
    updateUserInfo(params, 'POST').then(res => {
      console.log('更新用户信息：', res);
      if (res.data.code !== ERR_OK) {
        message.error(res.data.msg);
        return;
      }
      if (res.data.code === ERR_OK) {
        message.success(res.data.msg);
        let userInfo = res.data.data;
      }
    })
  };

  updateUserAvatar(resFile) {
    this.setState({
      avatar: resFile.response.imagePath,
      userAvatar: `${baseUrl}/${resFile.response.imagePath}`,
    })
  };

  changeUserInfo(type) {
    console.log(type);
    if (type === 'password') {
      this.setState({
        visiblePassword: true
      })
    }
    if (type === 'phone') {
      this.setState({
        visiblePhone: true
      })
    }

  };

  _updatePassword() {
    let {originPassword, newPassword, reNewPassword} = this.state;
    let params = {
      oldPassWord: originPassword,
      newPassWord: newPassword,
      newPassWordSecond: reNewPassword
    };
    updatePassword(params).then(res => {
      console.log('修改密码', res);
      if (res.data.code !== ERR_OK) {
        message.error(res.data.msg);
        return;
      }
      if (res.data.code === ERR_OK) {
        message.info(res.data.msg);
        this.setState({visiblePassword: false});
      }
    })
  };

  handleOkPassword = () => {
    this._updatePassword()
  };

  handleCancelPassword = () => {
    this.setState({visiblePassword: false})
  };

  changeOriginPassword = (e) => {
    let originPassword = e.target.value;
    console.log(originPassword);
    this.setState({
      originPassword
    })
  };

  changeNewPassword = (e) => {
    let newPassword = e.target.value;
    console.log(newPassword);
    this.setState({
      newPassword
    })
  };

  changeReNewPassword = (e) => {
    let reNewPassword = e.target.value;
    console.log(reNewPassword);
    this.setState({
      reNewPassword
    })
  };

  changeEmail = (e) => {
    let email = e.target.value;
    console.log(email);
    this.setState({
      email
    })
  };

  changeNickName = (e) => {
    let nickName = e.target.value;
    console.log(nickName);
    this.setState({
      nickName
    })
  };

  changePhone = (e) => {
    let phone = e.target.value;
    console.log(phone);
    this.setState({
      phone
    })
  };

  changeRemark = (e) => {
    let remark = e.target.value;
    console.log(remark);
    this.setState({
      remark
    })
  };

  // handleOkPhone = () => {
  //   this.setState({visiblePhone: false})
  // };
  //
  // handleCancelPhone = () => {
  //   this.setState({visiblePhone: false})
  // };

  renderDefferentView(key) {
    let _this = this;
    const {getFieldDecorator} = this.props.form;
    const uploadProps = {
      name: 'file',
      action: getFileUploadURL(),
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          _this.updateUserAvatar(info.file);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };


    if (key === '0') {
      return (
        <div className="info-view-baseView">
          <div className="info-view-left">
            <Form onSubmit={this.updateInfo}>
              <FormItem
                label="邮箱">
                {
                  getFieldDecorator('email', {
                    initialValue: this.state.email,
                    rules: [{
                      required: true,
                      message: '请输入您的邮箱'
                    }]
                  })(
                    <Input onChange={this.changeEmail}/>
                  )
                }
              </FormItem>
              <FormItem
                label="昵称">
                {
                  getFieldDecorator('nickName', {
                    initialValue: this.state.nickName,
                    rules: [{
                      required: true,
                      message: '请输入您的昵称'
                    }]
                  })(
                    <Input onChange={this.changeNickName}/>
                  )
                }
              </FormItem>
              <FormItem
                label="个人简介">
                {
                  getFieldDecorator('profile', {
                    initialValue: this.state.remark,
                    rules: [{
                      required: false,
                    }]
                  })(
                    <TextArea placeholder="个人简介" autosize style={{minHeight: '68px'}} onChange={this.changeRemark}/>
                  )
                }
              </FormItem>
              <FormItem
                label="联系电话">
                {
                  getFieldDecorator('phone', {
                    initialValue: this.state.phone,
                    rules: [{
                      required: false,
                    }]
                  })(
                    <Input onChange={this.changePhone}/>
                  )
                }
              </FormItem>
              <Button type="primary" htmlType="submit">更新基本信息</Button>
            </Form>
          </div>
          <div className="info-view-right">
            <div className="view-avatar-title">
              <span>头像</span>
            </div>
            <div className="view-avatar">
              <img src={this.state.userAvatar} alt=""/>
            </div>
            <span>
            <Upload {...uploadProps} showUploadList={false}>
              <Button>
                <Icon type="upload"/>更换头像
              </Button>
            </Upload>
          </span>
          </div>
        </div>
      )
    }
    if (key === '1') {
      return (
        <List
          size="large"
          itemLayout="horizontal"
          dataSource={this.listData}
          renderItem={item => (
            <List.Item
              actions={[<a href="javascript:void(0);" onClick={this.changeUserInfo.bind(this, item.type)}>修改</a>]}>
              <List.Item.Meta
                title={<span>{item.title}</span>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      )
    }

    if (key === '2') {
      return (
        <div>暂未开放</div>
      )
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="page setting-page">
        <div className="setting-content-main">
          <div className="setting-main">
            <div className="setting-leftMenu">
              <Menu theme="light" mode="inline" defaultSelectedKeys={['0']} onClick={this.selectKey}>
                {
                  this.state.leftMenu.map((item, i) =>
                    <Menu.Item key={i}>
                      <span>{item}</span>
                    </Menu.Item>
                  )
                }
              </Menu>
            </div>
            <div className="setting-right">
              <div className="info-title">
                <span>{this.state.infoTitle}</span>
              </div>
              {this.renderDefferentView(this.state.selectKey)}
            </div>
          </div>
        </div>
        <Modal
          title="账号密码"
          destroyOnClose={true}
          visible={this.state.visiblePassword}
          onOk={this.handleOkPassword}
          onCancel={this.handleCancelPassword}>
          <Form>
            <FormItem
              label="原始密码"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}>
              {
                getFieldDecorator('originPassword', {
                  setFieldsValue: this.state.originPassword,
                  rules: [{
                    required: true,
                    message: '请输入当前密码'
                  }]
                })(
                  <Input onChange={this.changeOriginPassword} type="password"/>
                )
              }
            </FormItem>
            <FormItem
              label="新密码"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}>
              {
                getFieldDecorator('newPassword', {
                  setFieldsValue: this.state.newPassword,
                  rules: [{
                    required: true,
                    message: '请输入新密码'
                  }]
                })(
                  <Input onChange={this.changeNewPassword} type="password"/>
                )
              }
            </FormItem>
            <FormItem
              label="新密码"
              labelCol={{span: 5}}
              wrapperCol={{span: 12}}>
              {
                getFieldDecorator('reNewPassword', {
                  setFieldsValue: this.state.reNewPassword,
                  rules: [{
                    required: true,
                    message: '请在此输入新密码'
                  }]
                })(
                  <Input onChange={this.changeReNewPassword} type="password"/>
                )
              }
            </FormItem>
          </Form>
        </Modal>
        {/*<Modal*/}
          {/*title="密码手机"*/}
          {/*destroyOnClose={true}*/}
          {/*visible={this.state.visiblePhone}*/}
          {/*onOk={this.handleOkPhone}*/}
          {/*onCancel={this.handleCancelPhone}>*/}
          {/*<Form>*/}
            {/*<FormItem*/}
              {/*label="手机号码"*/}
              {/*labelCol={{span: 5}}*/}
              {/*wrapperCol={{span: 12}}>*/}
              {/*{*/}
                {/*getFieldDecorator('phone', {*/}
                  {/*setFieldsValue: this.state.originPassword,*/}
                  {/*rules: [{*/}
                    {/*required: true,*/}
                    {/*message: '请输入手机号码'*/}
                  {/*}]*/}
                {/*})(*/}
                  {/*<Input onChange={this.changePhone}/>*/}
                {/*)*/}
              {/*}*/}
            {/*</FormItem>*/}
          {/*</Form>*/}
        {/*</Modal>*/}
      </div>
    )
  }
}

const WrapUpdateUserInfoForm = Form.create()(UpdateUserInfoForm);

export default class AccountSetting extends React.Component {
  render() {
    return (
      <WrapUpdateUserInfoForm/>
    )
  }
}
