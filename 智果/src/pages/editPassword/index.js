import React from 'react'
import { Input, Button, Modal, message, Upload, Icon } from 'antd'
import './index.less'
import { updatePassword } from '../../axios/api.js'
import { baseUrl, userInfo } from "../../axios/api";

export default class EditPassword extends React.Component {
    state = {
        oldkey: '',
        newkey: '',
        newkeys: '',
    }

    componentWillMount() {
        console.log('接受了')
        // this._getuserInfo()

    }

    //   _getuserInfo() {
    //     let params = {}
    //     userInfo(params).then(res => {
    //       if(res.data.code=='1'){
    //         console.log(res.data)
    //         let email = res.data.data.email
    //         let imageUrl = res.data.data.headImage
    //         let fullName = res.data.data.fullName
    //         let userInfo = res.data.data
    //         window.sessionStorage.setItem('__userInfo__', JSON.stringify(userInfo));
    //         // this.props.submitUserInfo()
    //         console.log(this.props)
    //         this.setState({
    //           email,
    //           imageUrl,
    //           fullName
    //         })
    //       }else{
    //         message.error(res.data.msg)
    //       }
    //     })
    //   }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            let res = info.file.response
            console.log('-------------', info.file.response)
            this.setState({
                imageUrl: res.data.imagePath,
                loading: false
            })

        }
    }

    olekeyin = (e) => {
        let value = e.target.value
        this.setState({
            oldkey: value
        })
    }

    newkeyin = (e) => {
        let value = e.target.value
        this.setState({
            newkey: value
        })
    }

    newkeysin = (e) => {
        let value = e.target.value
        this.setState({
            newkeys: value
        })
    }

    _upDateUserInfo = () => {
        let oldkey =  this.state.oldkey
        let newkeya = this.state.newkey
        let newkeyb = this.state.newkeys
        if (newkeya != newkeyb) {
            message.warning('两次输入的新密码不一致')
            return
        }

        let params = {
            oldPassword: oldkey,
            newPassword: newkeya
        }
        updatePassword(params).then(res => {
            if (res.data.code == '1') {
                message.success('保存成功')
            } else {
                message.error(res.data.msg)
            }
        })
    }
    getEmail = (e) => {
        let val = e.target.value
        this.setState({
            email: val
        })
    }
    render() {
        const imageUrl = this.state.imageUrl;
        return (
            <div className='password' style={{ margin: '20px', backgroundColor: '#fff' }}>
                <div className='pass_container'>
                    <div className='inputBox'>
                        <div className='item'>
                            <span className='spaner'>旧密码</span>
                            <div className='ipt'><Input onChange={this.olekeyin} value={this.state.oldkey} /></div>
                        </div>
                        <div className='item'>
                            <span className='spaner'>新密码</span>
                            <div className='ipt'><Input type='password' onChange={this.newkeyin} value={this.state.newkey} /></div>
                        </div>
                        <div className='item'>
                            <span className='spaner'>确认新密码</span>
                            <div className='ipt'><Input type='password' onChange={this.newkeysin} value={this.state.newkeys} /></div>
                        </div>
                        <div className='item'>
                            <Button style={{ width: '200px', marginLeft: '130px', backgroundColor: '#e31939', color: '#fff' }} onClick={this._upDateUserInfo} >修改</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}