import React from 'react';
import {
    Button,
    WingBlank,
    WhiteSpace,
    Card,
    Flex,
    InputItem,
    Toast,
    // Icon
} from 'antd-mobile';
import { Icon } from 'antd'
import { userLogin, vertifyCode , queryUserInfo, getUserInfo } from '../../../../axios/api';
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import { createForm } from 'rc-form';

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);


export default class GiftPack extends React.Component {
    componentDidMount() {
        // this.inputRef.focus();
        // this.getUserInfo()
        // this.loading()
        // this._getCustomerList()
        this.getUserInfo()
    }

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        searchData: [],
        teamUserInfo: [],
        userInfo:'',
    }

    
    getUserInfo = () => {
        let params = {}
        getUserInfo(params, 'GET').then(res => {
            if (res.data.code == 1) {
                if (res.data.data) {
                    console.log(res.data.data)
                    this.setState({
                        userInfo: res.data.data.username
                    })
                }
            }
        })
    }

    // 登录
    login = () => {
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
    //   _login(){
    //     let params = {
    //       username: this.state.mobile,
    //       password: this.state.password,
    //       verifyCode: this.state.verifyCode
    //     }
    //     console.log(params)
    //     userLogin(params).then(res => {
    //       if(res.data.code == 1){
    //         // message.success(res.data.msg)
    //         Toast.success(res.data.msg, 1);
    //         localStorage.setItem('token', res.data.data);
    //         localStorage.setItem('__isLogin__', true);
    //         // let dataList = JSON.parse(res.data.dataList)
    //         // console.log(typeof(res.data.dataList))
    //         // localStorage.setItem('_menulist_', JSON.stringify(res.data.dataList))
    //         // this.props.history.replace('/index');
    //       }else{
    //         this.getOtherCode()
    //         Toast.fail(res.data.msg, 2);
    //         this.setState({
    //           verifyCode:''
    //         })
    //         // message.warning(res.data.msg)
    //       }
    //     })
    //   }

    verifyCodeHandle = (value) => {
        this.setState({
            verifyCode: value,
        });
    }

    usernameHandle = (value) => {
        this.setState({
            mobile: value,
        });
    }

    goSearch = () => {
        let params = {
            mobile: this.state.mobile
        }
        Toast.loading('查询中...',0);
        queryUserInfo(params, 'GET').then(res => {
            if (res.data.code == 1) {
                if (res.data.map) {
                    let searchData = res.data.map
                    console.log(searchData)
                    this.setState({
                        searchData
                    })
                    Toast.hide()
                }
            }else {
                Toast.info(res.data.msg)
                // console.log(res.data.map)
            }
        })
    }

    goVisitList(mobile){
        console.log(mobile)
        if (mobile == this.state.userInfo) {
            this.props.history.push('/userCenter/visitList?userId='+mobile);
        }
        // this.props.history.push('/userCenter/visitList?userId=21212121');
    }

    goIndex = () => {
        this.props.history.push('/userCenter');
    }

    render() {
        // const { getFieldProps } = this.props.form;
        const customIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
                <path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
            </svg>
        );
        return (
            <div id='superWebUserInfo'>
                <div className='pageTitle'>
                    <Icon type="home" size='lg' className='returnIcon' onClick={this.goIndex}/>
                    查询客户信息</div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='head'>
                    <Flex
                        className='head_flex'
                        direction='row'
                        justify='center'
                    >
                        <InputItem
                            type="number"
                            placeholder="输入手机号搜索"
                            onChange={this.usernameHandle}
                            value={this.state.mobile}
                            className='head_name'
                        ></InputItem>
                        <div className='head_search' onClick={ this.goSearch }>
                            <Icon type="search" size='xs' />
                        </div>
                    </Flex>
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                {
                    this.state.searchData!=''  ?
                    <div className='mainUserInfo' key={this.state.searchData.key }>
                        <Flex
                            className='head_flexs'
                            direction='row'
                            justify='center'
                            onClick={this.goVisitList.bind(this,this.state.searchData.bdUserMobile)}
                        >
                            <div className='userMaintxt'>
                                <p>{ '账号:'+ this.state.searchData.userMobile }</p>
                                <p>已晋升:{ this.state.searchData.level== '1' ?'v0':(this.state.searchData.level == '4'?'v2':(this.state.searchData.level == '5'? 'v3': 'v1')) }</p>
                                <p>注册时间：</p>
                                <p>{ this.state.searchData.registerTime }</p>
                            </div>
                            <div className='userMoreInfo'>
                                <p>上级ID：{ this.state.searchData.topUserId }</p>
                                <p>上级：{this.state.searchData.topUserName}</p>
                                <p>对接账号：{ this.state.searchData.bdUserMobile }</p>
                                <p>对接人：{ this.state.searchData.bdUserName }</p>
                            </div>
                            <div className='userHeadImg'>
                                <img src={this.state.searchData.headerImage} />
                                <CopyToClipboard text={ this.state.searchData.userMobile }
                                    onCopy={() => Toast.info('复制成功', 2)}>
                                    <Button
                                        type="primary"
                                    >复制</Button>
                                </CopyToClipboard>
                            </div>
                        </Flex>
                    </div>  
                    :null
                }
                {/* <WingBlank size="md"> */}
                {/* <WhiteSpace size="lg" /> */}
                {/* <WhiteSpace size="lg" /> */}
                {/* </WingBlank> */}
                {/* <Flex
          direction='row'
          justify='center'
        >
            
        </Flex> */}
            </div>
        )
    }
}