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
import { userLogin, vertifyCode,achievementsHistoryList,bdMemberQuotaAllocationList } from '../../../../axios/api';
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


    componentDidMount() {
        // this.inputRef.focus();
        // this.getAchievementsHistoryList()
        this.getbdMemberQuotaList()
    }

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        mockTableListData:[],
        secTeamData: []
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
          var now = new Date(date * 1000),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
          return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        } else {   //13位时间戳
          var now = new Date(date),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
          return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        }
      }

    // getAchievementsHistoryList = () => {
    //     let params ={}
    //     achievementsHistoryList(params, 'GET').then(res => {
    //         if (res.data.code == 1) {
    //             if (res.data.data && res.data.data.length > 0) {
    //                 let adminlist = res.data.data
    //                 this._setdata(adminlist)
    //             } else {
    //                 this.setState({ mockTableListData: [] })
    //                 // Toast.fail(res.data.msg, 2);
    //             }
    //         }
    //     })
    // }

    getbdMemberQuotaList = () => {
        let params = {
            pageidx: 1,
            pagesize: 9999,
        }
        bdMemberQuotaAllocationList(params, 'GET').then(res => {
          if (res.data.code == 1) {
            if (res.data.data && res.data.data.length > 0) {
              let dataList = res.data.data;
              let secTeamData = []
              dataList.map((data, j) => {
                secTeamData.push({
                  key: j,
                  idnum: j,
                  mobile: data.mobile,
                  userName: data.userName,
                  type: data.type=='1'?'直接':'转介绍',
                  bdUserName: data.bdUserName,
                  createTime: this.dateFormate(data.createTime),
                  status: data.status == '1' ? '已发放' : (data.status == '2' ? '已使用' : '已过期'),
                  payTime: this.dateFormate(data.payTime),
                  promoteTime: this.dateFormate(data.promoteTime)
                })
              })
              this.setState({
                secTeamData
              })
            }  
          } else {
            Toast.fail(res.data.msg,2);
          }
        });
      }

    _setdata(adminlist) {
        let mockTableListData = []
        adminlist.map((data,j) => {
          mockTableListData.push({
            key: j + 1000,
            mobile: data.mobile,
            payTime: data.payTime,
            registerTime: data.registerTime,
            number: data.number,
            bdType: data.bdType,
            userName: data.userName,
            bdUserName: data.bdUserName,
            // createTime: this.getLocalTime(data.createTime),
            // type: data.type == 1 ? '当面拜访' : '电话拜访',
            // address: data.address,
            // content: data.content,
            // imageList: data.imageList
          })
        })
        this.setState({
          mockTableListData
        })
        console.log(mockTableListData)
    }

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
            <div id='superWebPerformanceInfo'>
                <div className='pageTitle'>
                <Icon type="home" size='lg' className='returnIcon' onClick={this.goIndex}/>    
                发放记录</div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                {/* <div className='head'>
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
                        <div className='head_search'>
                            <Icon type="search" size='xs' />
                        </div>
                    </Flex>
                </div> */}
                {
                    this.state.secTeamData != '' ?
                    this.state.secTeamData.map(data=>
                            <div className='mainUserInfo' key={data.key}>
                        <Flex
                            className='head_flexs'
                            direction='row'
                            justify='center'
                        >
                            <div className='userMaintxt'>
                                <p>账号: {data.mobile}</p>
                                <p>昵称: {data.userName}</p>
                                <p>来源: {data.type}</p>
                                <p>发放人: {data.bdUserName}</p>
                                <p>状态: {data.status}</p>
                            </div>
                                <div className='userMoreInfo'>
                                <p>发放时间</p>
                                <p>{data.createTime}</p>
                                <p>使用时间</p>
                                <p>{data.payTime}</p>
                                <p>晋升时间</p>
                                <p>{data.promoteTime}</p>
                            </div>
                        </Flex>
                    </div>)
                    :null
                }
            </div>
        )
    }
}