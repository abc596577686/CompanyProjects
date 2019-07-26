import React from 'react';
import axios from 'axios';
import {
    Button,
    WingBlank,
    WhiteSpace,
    Card,
    Flex,
    InputItem,
    Toast,
    Menu,
    ActivityIndicator,
    NavBar,
    ListView,
    Modal,
} from 'antd-mobile';
import { Icon, BackTop  } from 'antd'
import { userLogin, vertifyCode, getUserInfo, customerList , allocateUserMember} from '../../../../axios/api';
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { createForm } from 'rc-form';

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);
const alert = Modal.alert;

const data = [
    {
        value: '1',
        label: '筛选等级',
        children: [
            {
                label: '待晋升',
                value: '1',
            },
            {
                label: '已晋升',
                value: '2',
            }]
    },
];
const datas = [
    {
        value: '1',
        label: '排序方式',
        children: [
            {
                label: '注册从近到远',
                value: '1',
            }, {
                label: '注册从远到近',
                value: '2',
            }, {
                label: '最近晋升',
                value: '3',
            }, {
                label: '即将续费',
                value: '4',
            }, {
                label: '咨询量从高到低',
                value: '5',
            }
        ],
    }
];

const datass = [
    {
        value: '1',
        label: '筛选来源',
        children: [
            {
                label: '直接',
                value: '1',
            },
            {
                label: '转介绍',
                value: '2',
            }]
    },
];

// 虚拟数据
const dataItem = {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
}
const datax = []
for (let i = 0; i < 100; i++) {
    dataItem.key = i
    datax.push(dataItem)
}

const NUM_ROWS = 1;

export default class GiftPack extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.inputRef.focus();
        this.loading()
        this.getUserInfo()
        this.setState({
            monthType: this.getUrlPara('monthType')
        }, () => {
            this._getCustomerList()
        })
    }

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        userInfo: [],
        underTeamList: [],
        currentType: '0',
        keyword: '',
        sort: '1',
        sortType: '2',
        initData: '',
        initDatas: '',
        show: false,
        ca: [],
        cb: [],
        cc: [],
        type: '0',
        pageidxs: 1,
        pagesizes: 10,
        dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }),
        list: [],
        upLoading: false,
        pullLoading: false,
        row: [],
        showSize: 0,
        inviteType: 0,
        currentValuea: '',
        currentValueb: '',
        currentValuec: '',
        totalnum: '',
        totalAllocateNumber: '',
        totalUsedNumber: '',
        totalSurplusNumber: ''
    }

    getUrlPara(paraName) {
        var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    loading() {
        Toast.loading('Loading...', 0.7, null, true);
    }

    // 惨遭抛弃的时间戳翻译方法
    // getLocalTime(nS) {     
    //     if (nS == 0 || nS == '' ) {
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

    // 时间戳翻译
    // dateFormate = date => {
    //     if(typeof date === 'string' || typeof date === 'number'){
    //       let dateFormate = new Date(date);
    //       let year = dateFormate.getFullYear();
    //       let month = dateFormate.getMonth() + 1;
    //       let day = dateFormate.getDate();
    //       let hour = dateFormate.getHours();
    //       let min = dateFormate.getMinutes();
    //       let second = dateFormate.getSeconds();

    //       if (month < 10) {
    //         month = '0' + month;
    //       }
    //       if (day < 10) {
    //         day = '0' + day;
    //       }
    //       if (hour < 10) {
    //         hour = '0' + hour
    //       }
    //       if (min < 10) {
    //         min = '0' + min
    //       }
    //       if (second < 10) {
    //         second = '0' + second
    //       }

    //       return `${year}-${month}-${day} ${hour}:${min}:${second}`
    //     }else{
    //       return null
    //     }
    // }

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
    resetData = () => {
        this.setState({
            keyword: '',
            sort: 1,          //1、注册时间 2、晋升时间 3、分配时间 4、过期时间 5、v0 6、v1 7.咨询量
            sortType: 2,   //1、升序 2、降序
            type: 0,    //0: 所有 1：待晋升 2：已晋升
            inviteType: 0,  //0：所有 1：直接 2：转介绍
            pageidx: 1,
            pagesize: 10,
            monthType: '',
            concatType: 4,
        }, () => {
            this._getCustomerList()
        })
    }

    _getCustomerList = () => {
        this.setState({
            underTeamList: []
        })
        let params = {
            keyword: this.state.keyword,
            sort: this.state.sort,          //1、注册时间 2、晋升时间 3、分配时间 4、过期时间 5、v0 6、v1 7.咨询量
            sortType: this.state.sortType,   //1、升序 2、降序
            type: this.state.type,    //0: 所有 1：待晋升 2：已晋升
            inviteType: this.state.inviteType,  //0：所有 1：直接 2：转介绍
            pageidx: this.state.pageidxs,
            pagesize: this.state.pagesizes,
            monthType: this.state.monthType,
            concatType: 4,
        }
        customerList(params, 'GET').then(res => {
            if (res.data.code == 1) {
                if (res.data.data) {
                    let underTeamList = []
                    let currentUnderTeamList = res.data.data
                    this.setState({
                        totalnum: res.data.total,
                        totalAllocateNumber: res.data.totalAllocateNumber,
                        totalUsedNumber: res.data.totalUsedNumber,
                        totalSurplusNumber: res.data.totalSurplusNumber,
                    })
                    let list = res.data
                    currentUnderTeamList.map((data) => {
                        underTeamList.push({
                            key: data.systemTime,
                            nickName: data.nickName,
                            realName: data.realName,
                            mobile: data.mobile,
                            headerImage: data.headerImage,
                            type: data.type == '1' ? '直接' : '转介绍',
                            level: data.level == '1' ? 'v0' : (data.level == '4' ? 'v2' : (data.level == '5' ? 'v3' : 'v1')),
                            registerTime: data.registerTime,
                            consultateNumber: data.consultateNumber,
                            expireDate: data.expireDate,
                            promoteDate: data.promoteDate,
                            userId: data.userId,
                            v0Count: data.v0Count,
                            status: data.status,
                        })
                    })
                    this.setState({
                        underTeamList,
                        list: list
                    }, () => {
                        console.log(this.state.list)
                        this.changeState(list);
                    })

                    Toast.hide()
                } else {
                    Toast.fail(res.data.msg, 2)
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

    // constructor(...args) {
    //     super(...args);
    //     this.state = {
    //         initData: '',
    //         initDatas: '',
    //         show: false,
    //     };
    // }
    onChange = (value) => {
        console.log('筛选等级选择了：', value[1])
        this.setState({
            currentValuea: value[1]
        })


        // let label = '';
        // data.forEach((dataItem) => {
        //   if (dataItem.value === value[0]) {
        //     label = dataItem.label;
        //     if (dataItem.children && value[1]) {
        //       dataItem.children.forEach((cItem) => {
        //         if (cItem.value === value[1]) {
        //           label += ` ${cItem.label}`;
        //         }
        //       });
        //     }
        //   }
        // });

        // console.log(label);
    }
    onChanges = (value) => {
        console.log('排序方式选择了：', value[1])
        this.setState({
            currentValueb: value[1]
        })
    }

    onChangess = (value) => {
        console.log('客户来源类型选择了：', value[1])
        this.setState({
            currentValuec: value[1]
        })
    }

    handleClick = (e) => {
        document.documentElement.style.height = 'calc(100vh)';
        document.getElementsByTagName("body")[0].style.height = 'calc(100vh)';
        document.getElementById("root").style.height = 'calc(100vh)';
        document.getElementById("root").style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData || !this.state.initDatas) {
            // setTimeout(() => {
            this.setState({
                initData: data,
                initDatas: datas,
                initDatass: datass,
            });
            // }, 500);
        }
    }

    onMaskClick = () => {
        document.documentElement.style.height = '';
        document.getElementsByTagName("body")[0].style.height = '';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'scroll';
        document.getElementById("root").style.height = '';
        document.getElementById("root").style.overflow = '';


        this.setState({
            show: false,
        });
        // 来源
        let currentValuec = this.state.currentValuec
        console.log(currentValuec)
        this.setState({
            inviteType: currentValuec
        })
        let cc = ['1']
        let keychoosea = Number(currentValuec).toString()
        cc.push(keychoosea)
        // console.log(cc)
        this.setState({
            cc
        })
        // 筛选
        let currentValuea = this.state.currentValuea
        this.setState({
            type: currentValuea
        })
        let ca = ['1']
        let keychoose = Number(currentValuea).toString()
        ca.push(keychoose)
        // console.log(ca)
        this.setState({
            ca
        })
        // 排序
        let currentValueb = this.state.currentValueb
        if (currentValueb == 1) {  //注册由近及远
            this.setState({
                sort: 1,
                sortType: 2,
            })
            let cb = ['1']
            let keychoose = Number(currentValueb).toString()
            cb.push(keychoose)
            this.setState({
                cb
            })
        } else if (currentValueb == 2) {  //注册由及近
            this.setState({
                sort: 1,
                sortType: 1,
            })
            let cb = ['1']
            let keychoose = Number(currentValueb).toString()
            cb.push(keychoose)
            this.setState({
                cb
            })
        } else if (currentValueb == 3) {  //最近晋升
            this.setState({
                sort: 2,
                sortType: 2,
            })
            let cb = ['1']
            let keychoose = Number(currentValueb).toString()
            cb.push(keychoose)
            this.setState({
                cb
            })
        } else if (currentValueb == 4) {  //即将续费
            this.setState({
                sort: 4,
                sortType: 2,
            })
            let cb = ['1']
            let keychoose = Number(currentValueb).toString()
            cb.push(keychoose)
            this.setState({
                cb
            })
        } else if (currentValueb == 5) {  //咨询量由高到低
            this.setState({
                sort: 7,
                sortType: 2,
            })
            let cb = ['1']
            let keychoose = Number(currentValueb).toString()
            cb.push(keychoose)
            this.setState({
                cb
            })
        }
        Toast.loading('查询中...', 0);
        let _this = this
        setTimeout(
            function () {
                _this.setState({
                    keyword: _this.state.mobile,
                })
                _this._getCustomerList()
            }
            , 200)
    }

    maskClick = () => {
        this.setState({
            show: false
        })
        document.documentElement.style.height = '';
        document.getElementsByTagName("body")[0].style.height = '';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'scroll';
        document.getElementById("root").style.height = '';
        document.getElementById("root").style.overflow = '';
    }

    preventTouchMove(e) {
        e.stopPropagation()
        e.preventDefault()
    }

    serachList = () => {
        // let params = {
        //     mobile: this.state.mobile
        // }
        this.setState({
            keyword: this.state.mobile,
            // sort: this.state.sort ,          //1、注册时间 2、晋升时间 3、分配时间 4、过期时间 5、v0 6、v1
            // sortType: this.state.sortType,   //1、升序 2、降序
            // type: this.state.currentType,    //0: 所有 1：待晋升 2：已晋升
        })
        Toast.loading('查询中...', 0);
        this._getCustomerList()
    }

    goVisitList(data) {
        console.log(data)
        this.props.history.push('/userCenter/visitList?userId=' + data.userId + '&username=' + data.mobile);
    }

    goIndex = () => {
        this.props.history.push('/userCenter');
    }

    //上拉加载
    onEndReached = (event) => {
        // if (this.state.isLoading && !this.state.hasMore) {
        //     return;
        // }
        // this.setState({ isLoading: true,pageIndex:this.state.pageIndex+1 });
        // let that=this;
        setTimeout(() => {
            // that.genData(false);
            this.setState({
                pageidxs: 1,
                pagesizes: this.state.pagesizes + 10
            }, () => {
                this._getCustomerList()
            })
        }, 1000);
        console.log('到底了,搞快点')
    }

    //修改 state
    changeState = (list) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(list.data)
        });
    }

    // 确认启用名额
    // handleAddTest = (keyUserId) => {
    //     let params = {
    //         userId: keyUserId
    //     }
    //     allocateUserMember(params, 'get').then(res => { 
    //         if (res.data.code != 1) {
    //             Toast.info(res.data.msg, 1);
    //             return
    //         }
    //         Toast.info(res.data.msg, 1);
    //         this.setState({
    //             isAddTest: false,
    //         })
    //         // this.getCustomerDetail();  //刷新客户管理列表数据
    //         this._getCustomerList()
    //     })
    // }

    // renderData = (list) => {
    //     let data = list.data
    //     return (
    //         data.map((obj, i) =>
    //             <div className='mainUserInfo' key={i + 1000} >
    //                 <Flex
    //                     className='head_flexs'
    //                     direction='row'
    //                     justify='center'
    //                 >
    //                     <div className='userMaintxt' onClick={this.goVisitList.bind(this, obj)}>
    //                         {obj.nickName != '' ? <p>{obj.nickName}</p> : null}
    //                         {obj.realName != '' ? <p>({obj.realName})</p> : null}
    //                         <p>{obj.mobile}</p>
    //                         <p>{obj.level <= 1 ? '待晋升' : '已晋升'}{obj.level}</p>
    //                     </div>
    //                     <div className='userMoreInfo' onClick={this.goVisitList.bind(this, obj)}>
    //                         <p>注册时间：{this.dateFormate(obj.registerTime)}</p>
    //                         <p>咨询报价：{obj.consultateNumber}</p>
    //                         <p>续费：{this.dateFormate(obj.expireDate)}</p>
    //                         <p>晋升时间: {this.dateFormate(obj.promoteDate)}</p>
    //                         <p>客户来源：{ obj.type }</p>
    //                     </div>
    //                     <div className='userHeadImg'>
    //                         <img src={obj.headerImage} />
    //                         <CopyToClipboard text={obj.mobile}
    //                             onCopy={() => Toast.info('复制成功', 2)}>
    //                             <Button
    //                                 type="primary"
    //                             >复制</Button>
    //                         </CopyToClipboard>
    //                     </div>
    //                 </Flex>
    //             </div >
    //         )
    //     )
    // }

    gotop = () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
        });
    }

    handleMember = () => {
        
    }

    // const alertInstance = alert('Delete', 'Are you sure???', [
    //     { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
    //     { text: 'OK', onPress: () => console.log('ok') },
    //   ]);
    //   setTimeout(() => {
    //     // 可以调用close方法以在外部close
    //     console.log('auto close');
    //     alertInstance.close();
    // }, 500000);



    render() {
        const customIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
                <path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
            </svg>
        );
        const { initData, initDatas, initDatass, show } = this.state;
        const menuEl = (
            <Menu
                className="foo-menu kt"
                data={initData}
                // value={['1','1'] }
                value={this.state.ca}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.14}
                style={{ bottom: (document.documentElement.clientHeight * 0.46), border: 'none' }}
            />
        );
        const typeEl = (
            <Menu
                className="foo-menu"
                data={initDatass}
                value={this.state.cc}
                onChange={this.onChangess}
                // height={ 420 }
                height={document.documentElement.clientHeight * 0.14}
                style={{ bottom: (document.documentElement.clientHeight * 0.61), border: 'none' }}
            />
        );
        const menuEls = (
            <Menu
                className="foo-menu"
                data={initDatas}
                value={this.state.cb}
                onChange={this.onChanges}
                // height={ 420 }
                height={document.documentElement.clientHeight * 0.45}
            />
        );
        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.4, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        // const { list } = this.state;
        // console.log(this.state.list)

        // let index = dataItem.length - 1;
        // const row = (rowData, sectionID, rowID) => {
        //     if (index < 0) {
        //         index = dataItem.length - 1;
        //     }
        //     //   const obj = this.state.list[index--];      
        //     return (
        //         <div className='mainUserInfo' key={rowID} >
        //             1121212
        //         </div>
        //     );
        // };
        const row = (dataRow) => {
            // console.log(dataRow)
            return (
                <div className='mainUserInfo' key={10000}>
                    <Flex
                        className='head_flexs'
                        direction='row'
                        justify='center'
                    >
                        <div className='userMaintxt' onClick={this.goVisitList.bind(this, dataRow)}>
                            {dataRow.nickName != '' ? <p>{dataRow.nickName}</p> : null}
                            {dataRow.realName != '' ? <p>({dataRow.realName})</p> : null}
                            <p>{dataRow.mobile}</p>
                            <p>{dataRow.level <= 1 ? '待晋升' : '已晋升'}</p>
                        </div>
                        <div className='userMoreInfo' onClick={this.goVisitList.bind(this, dataRow)}>
                            <p>注册时间：{this.dateFormate(dataRow.registerTime)}</p>
                            <p>咨询报价：{dataRow.consultateNumber}</p>
                            <p>续费：{this.dateFormate(dataRow.expireDate)}</p>
                            <p>晋升时间: {this.dateFormate(dataRow.promoteDate)}</p>
                            <p>客户来源：{dataRow.type == 1? '直接':'转介绍'}</p>
                        </div>
                        <div className='userHeadImg'>
                            <img src={dataRow.headerImage} />
                            <CopyToClipboard text={dataRow.mobile}
                                onCopy={() => Toast.info('复制成功', 2)}>
                                <Button
                                    type="primary"
                                >复制</Button>
                            </CopyToClipboard>
                            {/* {
                                dataRow.memberStatus == 1 ?
                                <span className='dataStatusSp'>
                                    已发放
                                </span>
                                :
                                <Button
                                    type="primary"
                                >发放</Button>  
                            } */}
                            {
                                dataRow.memberStatus == 0 ?
                                // <Button
                                //     type="primary"
                                //     onClick={ this.showModal('modal1') }

                                // >发放</Button>  
                                <Button
                                    onClick={() =>
                                        alert(
                                            '名额发放',
                                            '您本月共有'+this.state.totalAllocateNumber+'个试用经销商名额，已使用'+this.state.totalUsedNumber+'个，还剩'+this.state.totalSurplusNumber+'个，请确认是否为此用户发放',
                                            [
                                                {
                                                    text: '取消',
                                                    onPress: () => console.log('cancel')
                                                },
                                                {
                                                    text: '确定',   
                                                    onPress: () =>
                                                        // this.handleAddTest.bind(this,dataRow.userId)
                                                        new Promise((resolve,reject) => {
                                                            // Toast.info('分配中...', 1);
                                                            // this.handleAddTest.bind(this,dataRow.userId)
                                                            // setTimeout(resolve, 100);
                                                            allocateUserMember({
                                                                userId: dataRow.userId
                                                            }).then(res => {
                                                                alert('',res.data.msg)
                                                                // Toast.info(res.data.msg, 21111);
                                                                resolve(res)
                                                            })
                                                            .catch(err => {
                                                                // 抛出错误
                                                                // Toast.info('分配中...', 1);
                                                                alert(err)
                                                                reject(err)
                                                                console.log(err)
                                                            })
                                                        }),
                                                },      
                                            ]
                                        )
                                    }
                                >
                                发放
                                </Button>
                                : (dataRow.memberStatus == '1' ? <span className='dataStatusSp'>已发放</span> : (dataRow.memberStatus == '2' ? '已使用' : (dataRow.memberStatus == '3' ? '已过期' : '')))
                            } 
                        </div>
                    </Flex>
                </div>
            )
        }
        return (
            <div id='superWebClientList'>
                <div className='pageTitle'>
                    <Icon type="home" size='lg' className='returnIcon' onClick={this.goIndex} />
                    客户列表
                    <Icon className='returnIcons' onClick={this.handleClick} type="ellipsis" size='lg' />
                </div>
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
                            placeholder="搜索客户"
                            onChange={this.usernameHandle}
                            value={this.state.mobile}
                            className='head_name'
                        ></InputItem>
                        <div className='head_search' onClick={this.serachList}>
                            <Icon type="search" size='xs' />
                        </div>
                    </Flex>
                </div>
                <WhiteSpace size="lg" />
                {/* <WhiteSpace size="lg" /> */}
                <div className='topCover'>
                    <p className='totalp'>共{this.state.totalnum}条用户数据</p>
                    <Button className='resetBtn' onClick={this.resetData} >重置</Button>
                </div>
                {/* <WhiteSpace size="lg" /> */}
                {/* <WhiteSpace size="lg" /> */}
                {/* {
                    this.state.underTeamList ?
                        this.state.underTeamList.map( (data,p) =>
                        <div className='mainUserInfo' key={ p+10000 }>
                            <Flex
                                className='head_flexs'
                                direction='row'
                                justify='center'
                            >
                                <div className='userMaintxt' onClick={this.goVisitList.bind(this,data)}>
                                    {data.nickName!=''?<p>{data.nickName}</p>:null}
                                    {data.realName!=''?<p>({data.realName})</p>:null}
                                    <p>{data.mobile}</p>
                                    <p>{data.level<=1?'待晋升':'已晋升'}{data.level}</p>
                                </div>
                                <div className='userMoreInfo' onClick={this.goVisitList.bind(this,data)}>
                                    <p>注册时间：{ this.dateFormate(data.registerTime)}</p>
                                    <p>咨询报价：{data.consultateNumber}</p>
                                    <p>续费：{ this.dateFormate(data.expireDate)}</p>
                                    <p>晋升时间: {this.dateFormate(data.promoteDate)}</p>
                                    <p>客户来源：{ data.type }</p>
                                </div>
                                <div className='userHeadImg'>
                                    <img src={ data.headerImage } />
                                    <CopyToClipboard text={data.mobile}
                                        onCopy={() => Toast.info('复制成功', 2)}>
                                        <Button
                                            type="primary"
                                        >复制</Button>
                                    </CopyToClipboard>
                                </div>
                            </Flex>
                        </div>)
                    :null
                } */}
                {
                    this.state.list.data != '' ?
                        <ListView
                            dataSource={this.state.dataSource}
                            // renderRow={this.renderData.bind(this,this.state.list)}
                            renderRow={row}
                            initialListSize={10}
                            pageSize={1}
                            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                {this.state.list.pageidx * this.state.list.pagesize < this.state.list.total ? <div>加载中...</div> : null}
                            </div>)}
                            onEndReached={() => this.onEndReached()}
                            onEndReachedThreshold={20}
                            useBodyScroll={true}
                            quickSearchBarTop
                        // style={{ width: '100vw' }}
                        // pullToRefresh={<PullToRefresh // import { PullToRefresh } from 'antd-mobile'
                        // refreshing={pullLoading}
                        // onRefresh={this.onRefresh}
                        />

                        // :
                        // list && list.rows && !list.rows.length ?
                        // <div>
                        //     <p>暂无数据</p>
                        // </div>
                        : null
                }
                {/* <div className={show ? 'menu-activess' : ''}>
                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.maskClick} /> : null}
                </div> */}
                <div className={show ? 'menu-active' : ''}>
                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.maskClick} /> : null}
                </div>
                <div className={show ? 'menu-actives' : ''}>
                    {show ? initDatas ? menuEls : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.maskClick} /> : null}
                    {show ? <div className='sureBtn' onClick={this.onMaskClick}>确认</div> : null}
                </div>
                <div className={show ? 'menu-activess' : ''}>
                    {show ? typeEl : null}
                    {show ? <div className="menu-mask" onClick={this.maskClick} /> : null}
                </div>
                {/* 回到顶部按钮 */}
                {
                    this.state.list.data != '' ?
                        <BackTop className='toTop'>
                            <div  >
                                <Icon type="to-top" />
                            </div>
                        </BackTop>
                    : null
                }
            </div>
        )
    }
}