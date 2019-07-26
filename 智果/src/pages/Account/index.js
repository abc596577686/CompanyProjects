import React from 'react';
import './index.less'
import HomeHeader from '../../components/HomeHeader'
import Header from '../../components/Header'
import userImg from '../../resource/assets/images/defaultUser.jpg'
import Password from '../SetPassword/index'
import { Modal, Button,Icon,Spin } from 'antd';
import {userInfo,baseUrl,baseImgUrl} from "../../axios/api";
import PageFooter from '../../components/PageFooter'
import {Link} from 'react-router-dom'

class UserInfoBox extends React.Component{
  state = {
    showLoading:true
  
  }
  submitEnv = () =>{
    this.props.hiddenMain('edit')
  }
  componentWillMount(){
    console.log('will----------触发了')
    let userInfo = this.props.data
    let showLoading = this.props.showLoading
    if(userInfo&&userInfo.headImage){
      this.setState({
        headImg : userInfo.headImage,
        showLoading
      })
    }
    this.setState({
      userInfo : this.props.data
    })
    
  }
  componentWillReceiveProps(nextProps){
    console.log('receive----------触发了')
    let userInfo = nextProps.data
    let showLoading = nextProps.showLoading
    if(userInfo&&userInfo.headImage){
      this.setState({
        headImg : userInfo.headImage
      })
    }
    this.setState({
      userInfo : nextProps.data,
      showLoading
    })
  }
  render(){
    console.log(this.props.data)
    return(
      <div className='userInfoBox'>
        {/* <div className='userImgBox'>
          {
            !this.state.showLoading&&
            <img src={this.state.userInfo&&this.state.userInfo.headImage?(baseUrl+this.state.userInfo.headImage):userImg} alt="" className='userImg'/>
          }
        </div>
        <div className='userInfo'>
          <div>
            <div className='phone'>{this.props.data.fullName}</div>
            <div className='mobile'>{this.props.data.mobile}</div>
          </div>
          <div>
            <span className='email'>{this.props.data.email}</span>
            <span className='edit' onClick={this.submitEnv}>修改</span>
          </div>
          <div className='userStatus'>
            <span>线上认证用户</span>
          </div>
        </div> */}
    
      </div>
    )
  }
  
}
function OrderNumList(props){
  return(
    <div className='orderNav'>
      <ul>
        <li>
          <Link to={{
            pathname : '/order',
            state : {
              idx : 1
            }
          }}>
            <b>{props.data.newOrderNumber}</b>
            <span>待付款</span>
          </Link>
        </li>
        <li>
          <Link to={{
            pathname : '/order',
            state : {
              idx : 2
            }
          }}>
            <b>{props.data.unDeliverOrderNumber}</b>
            <span>待发货</span>
          </Link>
        </li>
        <li>
          <Link to={{
            pathname : '/order',
            state : {
              idx : 3
            }
          }}>
            <b>{props.data.deliverOrderNumber}</b>
            <span>待收货</span>
          </Link>
        </li>
        <li>
          <Link to={{
            pathname : '/order',
            state : {
              idx : 4
            }
          }}>
            <b>{props.data.overOrderNumber}</b>
            <span>已完成</span>
          </Link>
        </li>
        <li>
          <Link to={{
            pathname : '/order',
            state : {
              idx : 5
            }
          }}>
            <b>{props.data.cancelOrderNumber}</b>
            <span>已取消</span>
          </Link>
        </li>
        <li>
          <Link to='/coupon'>
            <b>0</b>
            <span>优惠劵</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
class FooterItem extends React.Component{
  state = {
  
  }
  submitEnv = () =>{
    if(this.props.title=='通知公告'){
      this.props.hiddenMain('showModalBox')
    }else{
      this.props.hiddenMain('showDetail')
    }
  }
  
  render(){
    return(
      <div className='footerItem'>
        <div className='itemTitle'>
          <span>{this.props.title}</span>
          <span><a href="#"><i className='fa fa-angle-double-right'></i></a></span>
        </div>
        <div className='itemMain'>
          <ul>
            {this.props.data.map(item => {
              return(
                <li>
                  <a href="javascript:void(0);" onClick={this.submitEnv}>
                    <span>{item}</span>
                  </a>
                </li>
              )
            })}
          </ul>
      
        </div>
    
      </div>
    )
  }
}
class DetailBox extends React.Component{
  constructor(){
    super()
    this.state = {
      data : {
        title:'标题标题',
        dataList : [
          {
            'subTitle':'小标题',
            'content':'内容内容内容内容内容内容内容内容内容内容内容内容'
          },
          {
            'subTitle':'小标题',
            'content':'内容内容内容内容内容内容内容内容内容内容内容内容'
          },
          {
            'subTitle':'小标题',
            'content':'内容内容内容内容内容内容内容内容内容内容内容内容'
          },
          {
            'subTitle':'小标题',
            'content':'内容内容内容内容内容内容内容内容内容内容内容内容'
          }
        ]
      }
    }
    this.state.data.dataList.forEach(item => {
      item.elip = true
    })
  }
  changeElip = (e) => {
    let index = e.target.getAttribute('data-index')
    let data = this.state.data
    data.dataList[index].elip = !data.dataList[index].elip
    this.setState({
      data : data
    })
    
  }
  render(){
    const styles = {
      h1 : {
        fontSize : '23px',
        color :"green",
        paddingLeft : '20px'
      },
      p : {
        display : 'none',
      },
      active : {
        display : 'block',
      }
    }
    return(
      <div className='detailInfo'>
        <Button type="primary" onClick={this.props.goPrev} style={{backgroundColor:'#357ebd',marginBottom:'30px'}}>
          <Icon type="left" />返回
        </Button>
        <h1 className='detail-title' style={styles.h1}>{this.state.data.title}</h1>
        <ul>
          {this.state.data.dataList.map((item,index)=>{
            return(
              <li style={{paddingLeft:'30px'}}>
                <a href="#" className='subTitle' onClick={this.changeElip} data-index={index}>{item.subTitle}</a>
                <p className='content' style={item.elip?styles.p:styles.active}>{item.content}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default class Account extends React.Component {
  state = {
    noticeList : [
      '推单注意事项',
      '售后细节说明'
    ],
    helpList : [
      '帐户相关',
      '购买支付',
      '物流配送',
      '售后服务',
      '关于我们',
      '海淘常见问题',
      '操作指南'
    ],
    showMainBox : true,
    visible : false,
    storeInfo : '',
    userInfo : '',
    orderInfo : '',
    showLoading : true
  }
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // }
  
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  _getUserInfo =() => {
    userInfo().then(res => {
      this.setState({
        showLoading : false
      })
      console.log(res)
      let userInfo = res.data.userInfo
      if(!userInfo) return
      let orderInfo = {
          newOrderNumber:userInfo.newOrderNumber,
          unDeliverOrderNumber:userInfo.unDeliverOrderNumber,
          newOrderNumber:userInfo.newOrderNumber,
          deliverOrderNumber:userInfo.deliverOrderNumber,
          overOrderNumber:userInfo.overOrderNumber,
          cancelOrderNumber:userInfo.cancelOrderNumber
      }
      this.setState({
        userInfo ,
        orderInfo,
        showMainBox : true,
        showEditBox : false,
        showDetailBox : false
      })
    })
  }
  hiddenMainEnv = (env) =>{
    console.log(env)
    if(env=='edit'){
      this.setState({
        showMainBox : false,
        showEditBox : true
      })
    }else if(env=='showDetail'){
      this.setState({
        showMainBox : false,
        showDetailBox : true
      })
      
    }else if(env=='showModalBox'){
      this.setState({
        visible : true
      })
    }
  
  }
  componentDidMount(){
    this._getUserInfo()
  }
  freshEnv =() => {
   this._getUserInfo()
  }
  render() {
    return (
      <div className='account_container'>
        {/* <Header/> */}
        {/* <HomeHeader navIndex={3} isHome={false}/> */}
        <Spin spinning={this.state.showLoading}>
          {
            this.state.showMainBox &&
            <div className='mainBox'>
              <Modal
                title="通知公告"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>测试测试</p>
                <p>测试测试</p>
                <p>测试测试</p>
              </Modal>
              <div className='account_main'>
                <div className='left'>
                  <UserInfoBox hiddenMain={this.hiddenMainEnv} data={this.state.userInfo} showLoading={this.state.showLoading}/>
                </div>
                <div className='right'>
                  <OrderNumList data={this.state.orderInfo}/>
                </div>
              </div>
              {/*<div className='account_footer'>*/}
                {/*<div className='left'>*/}
                  {/*<FooterItem title='通知公告' data={this.state.noticeList} hiddenMain={this.hiddenMainEnv}/>*/}
                {/*</div>*/}
                {/*<div className='right'>*/}
                  {/*<FooterItem  title='帮助说明' data={this.state.helpList} hiddenMain={this.hiddenMainEnv}/>*/}
                {/*</div>*/}
              
              {/*</div>*/}
            </div>
          }
          {
            this.state.showEditBox &&
            <Password submitEnv={this.freshEnv} data={this.state.userInfo} goPrev={this.freshEnv}/>
          }
          {
            this.state.showDetailBox &&
            <DetailBox goPrev={this.freshEnv}/>
          }
        </Spin>
          {/* <PageFooter></PageFooter> */}
      </div>
    )
  }
}