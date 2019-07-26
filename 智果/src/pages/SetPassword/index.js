import React from 'react'
import {Input,Button,Modal,message,Upload,Icon} from 'antd'
import './index.less'
import {upDateUserInfo} from '../../axios/api.js'
import {baseUrl, userInfo,baseImgUrl} from "../../axios/api";

export default class PassWord extends React.Component{
  state ={
    loading : false,
    visible : false,
  }
  showModal =() => {
    this.setState({
      visible: true
    })
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  componentWillMount(){
    console.log('接受了')
    this._getuserInfo()
    // let email = this.props.data.email
    // let imageUrl = this.props.data.headImage
    // let fullName = this.props.data.fullName
    // this.setState({
      // email,
      // imageUrl,
      // fullName
    // })
  }

  _getuserInfo() {
    return new Promise((resolve,reject) =>{
      let params = {}
      userInfo(params).then(res => {
        if(res.data.code=='1'){
          console.log(res.data)
          let email = res.data.data.email
          let imageUrl = res.data.data.headImage
          let fullName = res.data.data.fullName
          let userInfo = res.data.data
          window.sessionStorage.setItem('__userInfo__', JSON.stringify(userInfo));
          // this.props.submitUserInfo()
          console.log(this.props)
          this.setState({
            email,
            imageUrl,
            fullName
          },() =>{resolve(userInfo)})
        }else{
          message.error(res.data.msg)
        }
      })
    })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  beforeUpload =(file) => {
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //   message.error('You can only upload JPG file!');
    // }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error('头像大小必须小于3M！');
    }
    return isLt3M;
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // this.getBase64(info.file.originFileObj, imageUrl => this.setState({
      //   imageUrl,
      //   loading: false,
      // }));
      let res = info.file.response
      console.log('-------------',info.file.response)
      this.setState({
        imageUrl : res.data.imagePath,
        loading : false
      })
      
    }
  }
  changeName = (e) => {
    let value = e.target.value
    this.setState({
      fullName : value
    })
    
  }
  _upDateUserInfo = () => {
    let params = {
      headImage : this.state.imageUrl,
      fullName : this.state.fullName,
      email : this.state.email
    }
    console.log('---------------',params)
    upDateUserInfo(params).then(res => {
      if(res.data.code=='1'){
        // this.props.submitEnv()
        message.success('保存成功')
        this._getuserInfo().then(res => {
          window.location.href='/control'
        })
       
      }else{
        message.error(res.data.msg)
      }
    })
  }
  getEmail = (e) => {
    let val = e.target.value
    this.setState({
      email : val
    })
  }
  render(){
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return(
      <div className='password' style={{margin:'20px',backgroundColor:'#fff'}}>
        {/* <Button onClick={this.props.goPrev} style={{margin:'20px',backgroundColor:'#0099cc',color:'#fff'}}>
          <Icon type="left" />返回
        </Button> */}
        <div className='pass_container'>
          <div className='inputBox'>
            <div className='item'>
              <span className='spaner'>头像</span>
              <div className='imgBox'>
                <img src={baseImgUrl+imageUrl} alt=""/>
              </div>
              <Button  onClick={this.showModal} className='changeBtn' style={{backgroundColor:'#e31939',color:'#fff'}}>更改</Button>
            </div>
            <div className='item'>
              <span className='spaner'>电子邮箱</span>
              <div className='ipt'><Input onChange={this.getEmail} value={this.state.email}/></div>
            </div>
            <div className='item'>
              <span className='spaner'>昵称</span>
              {/*<div className='ipt'><Input onChange={this.changeName} value={this.state.fullName}/></div>*/}
              <div>{this.state.fullName}</div>
            </div>
            <div className='item'>
              <Button style={{width:'200px',marginLeft:'130px',backgroundColor:'#e31939',color:'#fff'}} onClick={this._upDateUserInfo} >修改</Button>
            </div>
          </div>
          <Modal
            title="上传头像"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${baseUrl}/upload/webUploadImage`}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={baseImgUrl+imageUrl} alt="avatar" className='avatarImg' /> : uploadButton}
            </Upload>
          </Modal>
        </div>
      </div>
    )
  }
}