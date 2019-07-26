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
import { userLogin, vertifyCode, customerHistoryList,getUserInfo } from '../../../../axios/api';
import { derivedUrl } from '../../../../axios/config'
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import { createForm } from 'rc-form';

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);


export default class GiftPack extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        derivedUrl: '',
        userId: '',
        mobile: '',
        username:'',
    }

    componentDidMount() {
        this.getUserInfo()
        // console.log(this.getUrlPara('userId'))
        this.setState({
            userId: this.getUrlPara('userId'),
            username: this.getUrlPara('username')
        }, () => {
            this._getCustomerHistoryList()
        })
        this.setState({
            derivedUrl: window.location.host
        })
    }

    getUrlPara(paraName) {
    	var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i");
       	var r = this.props.location.search.substr(1).match(reg);
        if (r != null){
        	return unescape(r[2]);
        }
       	return null;    
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

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        mockTableListData: [],
        account: '',  
        userId: '',
    }

    // getLocalTime(nS) {     
    //     if (nS == 0) {
    //       return '' 
    //     }
    //     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    // }

    dateFormate = date => {
        if (date == '' || date == null || date == 0) {   //空值或者0 不显示
            return null
        }
        if (date.length == 10) {   //10位时间戳
            var now = new Date(date*1000),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        } else{   //13位时间戳
            var now = new Date(date),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        }
    }

    _getCustomerHistoryList = () => {
        let params = {
            userId: this.state.userId,
            keyword: this.state.mobile,  //关键词
            // pageidx: this.state.pageidx,
            // pagesize: this.state.pagesize,
        }
        customerHistoryList(params, 'GET').then(res => {
        if (res.data.code == 1) {
            if (res.data.data && res.data.data.length > 0) {
                let adminlist = res.data.data
                this._setdata(adminlist)
            } else {
                this.setState({ mockTableListData: [] })
                // Toast.fail(res.data.msg, 2);
            }
        }
        })
    }

    _setdata(adminlist) {
        let mockTableListData = []
        adminlist.map((data,j) => {
          mockTableListData.push({
            key: j+1000,
            userName: data.userName,
            headerImage: data.headerImage,
            createTime: this.dateFormate(data.createTime),
            type: data.type == 1 ? '当面拜访' : '电话拜访',
            address: data.address,
            content: data.content,
            imageList: data.imageList
          })
        })
        this.setState({
          mockTableListData
        })
        console.log(mockTableListData)
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

    goAddVisit = () =>{
        this.props.history.push('/userCenter/visitList/addVisit?userId='+this.state.userId+'&username='+this.state.username);
    }

    goSearch = () => {
        // console.log(this.state.userId)

        this.setState({
            keyword: this.state.mobile
        },()=> {
            this._getCustomerHistoryList()
        })
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
            <div id='superWebVisitList'>
                <div className='pageTitle'>
                <Icon type="home" size='lg' className='returnIcon' onClick={this.goIndex}/>    
                拜访记录</div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='head'>
                    <Flex
                        className='head_flex'
                        direction='row'
                        justify='center'
                    >
                        <InputItem
                            type="text"
                            placeholder="搜索用户/地址/内容"
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
                    this.state.mockTableListData!=''?
                    this.state.mockTableListData.map(data=>
                    <div className='mainUserInfo' key={data.key}>
                        <div>
                            <Flex
                                className='head_flexs'
                                direction='row'
                                justify='start'
                            >
                                {/* <img className='mainUserInfo_img' src={ data.headerImage } /> */}
                                <p className='mainUserInfo_txt1'>{ data.userName }</p>
                                <p className='mainUserInfo_txt2'>{ data.createTime }</p>
                            </Flex>
                        </div>
                        <div>
                            <p className='mainTxt_type'>拜访方式 ：{ data.type }</p>
                            <p className='mainTxt_address'>{data.address}</p>
                            <p className='mainTxt_content'>{data.content}</p>
                        </div>
                        {
                            data.imageList!=''?
                            <div>
                                <Flex
                                    className='head_flexss'
                                    direction='row'
                                    justify='start'
                                >
                                    {
                                        data.imageList.map((data,j) =>
                                            <img src={ data.imagePath } key={j+1000} />
                                        )
                                    }
                                </Flex>
                            </div>
                            :null
                        }
                    </div>)
                    :null
                }
                
                <div className='return'>
                    <Button
                        type="primary"
                        activeStyle={{ backgroundColor: '#fff', color: '#fff' }}
                        onClick= { this.goAddVisit }
                    >添加拜访记录</Button>
                </div>
                <WhiteSpace size="lg" />
                {/* <WhiteSpace size="lg" /> */}
            </div>
        )
    }
}