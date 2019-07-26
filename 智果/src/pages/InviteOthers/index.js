import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import IHeader from '../../components/Header';
import HeaderNavbar from '../../components/HeaderNavbar';
import './index.less';
import {inviteOther} from '../../axios/api'
import {Input,Button} from 'antd'
import copy from 'copy-to-clipboard';
export default class Invite extends React.Component{
  state = {
  
  }
  
  componentDidMount(){
    inviteOther().then(res => {
      console.log(res)
      if(res.data.code=='1'){
        let data = res.data.data
        this.setState({
          dealerNumber : data.dealerNumber,
          vipNumber : data.vipNumber,
          brokerage : data.brokerage,
          inviterCode :data.inviterCode,
          shareAgentUrl : data.shareAgentUrl,
          shareUserUrl : data.shareUserUrl
        })
      }
    })
  
  }
  copyEnv =(code) =>{
    let copyValue
    if(code=='0'){
      copyValue = this.state.inviterCode
    }else if(code=='1'){
      copyValue = this.state.shareUserUrl
    }else if(code=='2'){
      copyValue = this.state.shareAgentUrl
    }
    copy(copyValue)
    alert('复制成功！')
    
    
    
  }
  render(){
    return(
      <div className='Invite_container'>
        <IHeader/>
        <HeaderNavbar/>
        <div className='invite_content'>
          <div className='invite_header'>
            <div className='head_item'>
              <span>你的专属邀请码</span>
              <div><Input defaultValue={this.state.inviterCode} disabled={true}/></div>
              <Button type='danger' className='copy' onClick={()=>this.copyEnv('0')}>复制邀请码</Button>
            </div>
            <div className='head_item'>
              <span>邀请用户地址</span>
              <div style={{width:'400px'}}><Input defaultValue={this.state.shareUserUrl} disabled={true}/></div>
              <Button type='danger' className='copy' onClick={() => this.copyEnv('1')}>复制地址</Button>
            </div>
            <div className='head_item'>
              <span>邀请经销商地址</span>
              <div style={{width:'400px'}}><Input defaultValue={this.state.shareAgentUrl} disabled={true}/></div>
              <Button type='danger' className='copy' onClick={() => this.copyEnv('2')}>复制地址</Button>
            </div>
            
          </div>
          <div className='invite_main'>
            <div className='main_title'>累计奖励</div>
            <table>
              <thead>
              <tr>
                <th>已邀请vip</th>
                <th>已邀请经销商</th>
                <th>已获得奖励</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{this.state.vipNumber}</td>
                <td>{this.state.dealerNumber }</td>
                <td>{this.state.brokerage}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}