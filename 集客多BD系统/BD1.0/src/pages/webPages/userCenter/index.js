import React from 'react';
import {
    Button,
    WingBlank,
    WhiteSpace,
    Card,
    Flex,
    InputItem,
    Toast,
    Icon
} from 'antd-mobile';
import { userLogin, vertifyCode, customerList, getUserInfo ,logout} from '../../../axios/api';
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
// import { createForm } from 'rc-form';


const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);


export default class GiftPack extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._getCustomerList()
        this.getUserInfo()
        this.loading()
    }

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        userInfo: [],
        underTeamList: [],
        currentType: '0',
        // keyword: '',
        // sort: '1',
        // sortType: '2',
        monthType: '',
    }

    loading() {
        Toast.loading('Loading...',0.7,null,true);
    }

    getUserInfo = () => {
        let params = {}
        getUserInfo(params, 'GET').then(res => {
            if (res.data.code == 1) {
                if (res.data.data) {
                    console.log(res.data.data)
                    this.setState({
                        userInfo: res.data.data
                    })
                }
            }
        })
    }

    _getCustomerList=()=> {
        this.setState({
            underTeamList: {}
        })
        let params = {
            keyword: this.state.keyword,
            sort: this.state.sort ,          //1、注册时间 2、晋升时间 3、分配时间 4、过期时间 5、v0 6、v1
            sortType: this.state.sortType,   //1、升序 2、降序
            type: this.state.currentType,    //0: 所有 1：待晋升 2：已晋升
            pageidx: this.state.pageidxs,
            pagesize: this.state.pagesizes,
        }
        customerList(params, 'GET').then(res => {
            if (res.data.code == 1) {
                let currentUnderTeamList = res.data  //用户信息
                let underTeamList = {
                    key: currentUnderTeamList.systemTime,
                    totalRenewNumber: currentUnderTeamList.totalRenewNumber,
                    underTeamList: currentUnderTeamList.underTeamList,
                    directPromoteNumber: currentUnderTeamList.directPromoteNumber,
                    directRegisterNumber: currentUnderTeamList.directRegisterNumber,
                    directRenewNumber: currentUnderTeamList.directRenewNumber,
                    indirectPromoteNumber: currentUnderTeamList.indirectPromoteNumber,
                    indirectRegisterNumber: currentUnderTeamList.indirectRegisterNumber,
                    indirectRenewNumber: currentUnderTeamList.indirectRenewNumber,
                    totalIncome: currentUnderTeamList.totalIncome
                }
                this.setState({
                    underTeamList
                })
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
    _login() {
        let params = {
            username: this.state.mobile,
            password: this.state.password,
            verifyCode: this.state.verifyCode
        }
        console.log(params)
        userLogin(params).then(res => {
            if (res.data.code == 1) {
                // message.success(res.data.msg)
                Toast.success(res.data.msg, 1);
                localStorage.setItem('token', res.data.data);
                localStorage.setItem('__isLogin__', true);
                // let dataList = JSON.parse(res.data.dataList)
                // console.log(typeof(res.data.dataList))
                // localStorage.setItem('_menulist_', JSON.stringify(res.data.dataList))
                // this.props.history.replace('/index');
            } else {
                this.getOtherCode()
                Toast.fail(res.data.msg, 2);
                this.setState({
                    verifyCode: ''
                })
                // message.warning(res.data.msg)
            }
        })
    }

    // 更新新验证码
    getOtherCode = () => {
        this._getverifyCode()
    }
    // 获取验证码
    _getverifyCode() {
        let params = {}
        vertifyCode(params).then(res => {
            let baseImg = 'data:image/png;base64,' + res.data.data
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
        Toast.loading('登录中...', 0, () => {
            // console.log('Load complete !!!');
        });
        this.login()
    }

    usernameHandle = (value) => {
        this.setState({
            mobile: value,
        });
    }
    passwordHandle = (value) => {
        this.setState({
            password: value,
        });
    }
    verifyCodeHandle = (value) => {
        this.setState({
            verifyCode: value,
        });
    }

    goSearch = () => {
        this.props.history.push('/userCenter/userInfo');
    }
    goClientList = () => {
        this.props.history.push('/userCenter/clientList');
    }
    goVisitList = () => {
        this.props.history.push('/userCenter/visitList');
    }
    goPerformanceList = () => {
        this.props.history.push('/userCenter/performanceList');
    }

    goLoginOut = () => {
        console.log('退出登录');
        localStorage.setItem('__isLogin__', false);
        let params = {}
        logout(params, 'GET').then(res => {
            if (res.data.code == 1) {
                Toast.info('退出成功', .7, null, true);
                this.props.history.push('/login');
            } else {
            
            }
        })
    }

    setDatas = (key) => {
        this.setState({
            monthType: key
        }, () => {
            this.props.history.push('/userCenter/clientList?monthType='+this.state.monthType)
        })
    }

    render() {
        // const { getFieldProps } = this.props.form;
        const customIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
                <path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
            </svg>
        );
        return (
            <div id='superWebUserCenter'>
                <div className='pageTitle'>客户中心</div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='head'>
                    <Flex
                        className='head_flex'
                        direction='row'
                        justify='center'
                    >
                        {/* <img className='head_img' src='' /> */}
                        {/* <div className='head_name'>{this.state.userInfo.channelName+'—'+this.state.userInfo.regionTeamName+'—'+this.state.userInfo.realName}</div> */}
                        <div className='head_name'>{this.state.userInfo.channelName!=null?this.state.userInfo.channelName+'—' :null}{this.state.userInfo.regionTeamName!=null?this.state.userInfo.regionTeamName+'—':null}{this.state.userInfo.realName!=null?this.state.userInfo.realName:null}</div>
                        <div className='head_search' onClick={this.goSearch}>
                            <Icon type="search" size='xs' />
                        </div>
                    </Flex>
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='currentMonthList'>
                    <Flex
                        className='head_flex'
                        direction='row'
                        justify='center'
                    >
                        <div onClick={ this.setDatas.bind(this, 1) }>
                            <p>当月注册</p>
                            <p>{ this.state.underTeamList.directRegisterNumber? this.state.underTeamList.directRegisterNumber:0 }</p>
                        </div>
                        <div onClick={ this.setDatas.bind(this, 2) }>
                            <p>当月晋升</p>
                            <p>{ this.state.underTeamList.directPromoteNumber? this.state.underTeamList.directPromoteNumber:0 }</p>
                        </div>
                        <div onClick={ this.setDatas.bind(this, 3) }>
                            <p>当月续费</p>
                            <p>{ this.state.underTeamList.totalRenewNumber? this.state.underTeamList.totalRenewNumber:0 }</p>
                        </div>
                    </Flex>
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='currentMonthLists'>
                    <Flex
                        className='head_flex'
                        direction='row'
                        justify='center'
                    >
                        <div onClick={ this.setDatas.bind(this, 4) }>
                            <p>转介绍注册</p>
                            <p>{ this.state.underTeamList.indirectRegisterNumber? this.state.underTeamList.indirectRegisterNumber:0 }</p>
                        </div>
                        <div onClick={ this.setDatas.bind(this, 5) }>
                            <p>转介绍晋升</p>
                            <p>{ this.state.underTeamList.indirectPromoteNumber? this.state.underTeamList.indirectPromoteNumber:0 }</p>
                        </div>
                    </Flex>
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='client'>
                    <Card>
                        <Card.Header
                            title="客户"
                        />
                        <Card.Body>
                            <div onClick={this.goClientList}>
                                <Flex
                                    className='head_flex'
                                    direction='row'
                                    justify='center'
                                >
                                    <p>我的客户</p>
                                    <Icon className='client_icon' type='right' size='lg' />
                                </Flex>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='management'>
                    <Card>
                        <Card.Header
                            title="管理"
                        />
                        <Card.Body>
                            <div>
                                <Flex
                                    className='head_flex'
                                    direction='row'
                                    justify='center'
                                    onClick={this.goVisitList}
                                >
                                    <p>拜访记录</p>
                                    <Icon className='client_icon' type='right' size='lg' />

                                </Flex>
                                <Flex
                                    className='head_flex'
                                    direction='row'
                                    justify='center'
                                    onClick={this.goPerformanceList}
                                >
                                    <p>绩效记录</p>
                                    <Icon className='client_icon' type='right' size='lg' />
                                </Flex>
                            </div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <div className='return'>
                        <Button
                            type="primary"
                            activeStyle={{ backgroundColor: '#fff', color: '#fff' }}
                            onClick={ this.goLoginOut }
                        >退出登录</Button>
                    </div>
                </div>
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