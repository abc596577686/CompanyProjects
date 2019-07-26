import React from 'react';
import {
    Button,
    WingBlank,
    WhiteSpace,
    Card,
    Flex,
    InputItem,
    Toast,
    // Tabs,
    // Badge
    ListView
} from 'antd-mobile';
import {
    Icon,
    Tabs,
    BackTop
} from 'antd'
import { userLogin, vertifyCode,achievementsHistoryList,bdMemberQuotaAllocationList,userProfitRecordList } from '../../../../axios/api';
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import dianpu from '../../../../resource/assets/images/dianpu@2x.png'
// import { createForm } from 'rc-form';

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);

const { TabPane } = Tabs;



export default class GiftPack extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.inputRef.focus();
        // this.getAchievementsHistoryList()
        // this.getbdMemberQuotaList()
        this.getUserPoolList(3)
    }

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        mockTableListData:[],
        secTeamData: [],
        keyword: '',
        pageidx: 1,
        pagesize: 10,
        beginTime: '',
        endTime: '',
        userdata: [],
        datalist:[],
        dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }),
        row: [],
        type: '3',
        currentIndex: ''
    }

    // getLocalTime(nS) {     
    //     if (nS == 0) {
    //       return '' 
    //     }
    //     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    // }

    // 获取表数据
    getUserPoolList = (type) => {
        this.setState({
            type: type
        })
        // message.warning('数据量较大 请稍候')
        Toast.info('加载中...请稍候',0,null,false)

        let params = {
            status: type,
            keyword: this.state.keyword,
            pageidx: this.state.pageidx,
            pagesize: this.state.pagesize,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime
        }
        userProfitRecordList(params, 'GET').then(res => {
            if (res.data.code == 1) {
                // this.setState({
                //     dataTotals: Number(res.data.total)
                // })
                if (res.data.data && res.data.data.length > 0) {
                    Toast.hide() 
                    let datalist = res.data
                    let orderList = res.data.data;
                    let userdata = []
                    orderList.map((data, j) => {
                        userdata.push({
                            key: j + 100,
                            nickName: data.nickName,
                            mobile: data.mobile,
                            payTime: this.dateFormate(data.payTime),
                            bdUserName: data.bdUserName,
                            complateTime: this.dateFormate(data.complateTime),
                            income: data.income,
                            orderStatus: data.orderStatus,
                            recordId: data.recordId,
                            refundProfit: data.refundProfit,
                            userId: data.userId,
                            refundList: data.refundList,
                            orderProfit: data.orderProfit
                        })
                    })
                    this.setState({
                        userdata,
                        datalist
                    }, () => {
                        console.log(this.state.datalist)
                    })
                } else {
                    Toast.hide()
                    this.setState({ userdata: [] })
                }
            } else {
                Toast.fail('数据返回错误',2) 
            }
        })
    }

    // 返点模式切换
    callback=(key)=> {
        console.log(key);
        if (key == 1) {
            this.setState({
                type: 3,
                pagesize: 10
            }, () => {
                this.getUserPoolList(3)
            })
        } else if (key == 2){
            this.setState({
                type: 1,
                pagesize: 10
            }, () => {
                this.getUserPoolList(1)
            })
        }
        
    }

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

    // getbdMemberQuotaList = () => {
    //     let params ={}
    //     bdMemberQuotaAllocationList(params, 'GET').then(res => {
    //       if (res.data.code == 1) {
    //         if (res.data.data && res.data.data.length > 0) {
    //           let dataList = res.data.data;
    //           let secTeamData = []
    //           dataList.map((data, j) => {
    //             secTeamData.push({
    //               key: j,
    //               idnum: j,
    //               mobile: data.mobile,
    //               userName: data.userName,
    //               type: data.type=='1'?'直接':'转介绍',
    //               bdUserName: data.bdUserName,
    //               createTime: this.dateFormate(data.createTime),
    //               status: data.status == '1' ? '已发放' : (data.status == '2' ? '已使用' : '已过期'),
    //               payTime: this.dateFormate(data.payTime),
    //               promoteTime: this.dateFormate(data.promoteTime)
    //             })
    //           })
    //           this.setState({
    //             secTeamData
    //           })
    //         }  
    //       } else {
    //         Toast.fail(res.data.msg,2);
    //       }
    //     });
    //   }

    // _setdata(adminlist) {
    //     let mockTableListData = []
    //     adminlist.map((data,j) => {
    //       mockTableListData.push({
    //         key: j + 1000,
    //         mobile: data.mobile,
    //         payTime: data.payTime,
    //         registerTime: data.registerTime,
    //         number: data.number,
    //         bdType: data.bdType,
    //         userName: data.userName,
    //         bdUserName: data.bdUserName,
    //         // createTime: this.getLocalTime(data.createTime),
    //         // type: data.type == 1 ? '当面拜访' : '电话拜访',
    //         // address: data.address,
    //         // content: data.content,
    //         // imageList: data.imageList
    //       })
    //     })
    //     this.setState({
    //       mockTableListData
    //     })
    //     console.log(mockTableListData)
    // }

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

    //上拉加载
    onEndReached = (event) => {
        setTimeout(() => {
            this.setState({
                pageidx: 1,
                pagesize: this.state.pagesize + 10
            }, () => {
                this.getUserPoolList(this.state.type)
            })
        }, 1000);
        console.log('到底了,搞快点')
    }

    upShow = (node) => {
        console.log(node)
        console.log(this.state.currentIndex)
        if (node === this.state.currentIndex) {  //收起
            this.setState({
                currentIndex: ''
            })
            return
        }
        
        this.setState({   //放下
            currentIndex: node
        }, () => {
            console.log(this.state.currentIndex)
        })  
    }

    render() {
        // const { getFieldProps } = this.props.form;
        const customIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
                <path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
            </svg>
        );
        // const row = (dataRow) => {
        //     return (
        //         <div className='mainUserInfok' key={12121}>
        //             <div className='head_flexss'>
        //                 <div className='mainTopD'>
        //                     <img src={dianpu} />
        //                     <p className='mainTopD_txt1'>sadasssdsdsds</p>
        //                     <p className='mainTopD_txt2'>sadasssdsdsds</p>
        //                     <Icon
        //                         className='mainUpdIcon hideShow'
        //                         type="up"
        //                         style={{ color: '#fff' }}   
                                
        //                     />
        //                 </div>
        //                 <div className='mainBottomD'>
        //                     下单时间：{dataRow.payTime}
        //                 </div>
        //                 <div className='mainReturn'>
        //                     退款时间：232323455364332
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
        return (
            <div id='superWebPerformanceInfo'>
                <div className='pageTitle'>
                    <Icon type="home" size='lg' className='returnIcon' onClick={this.goIndex}/>    
                    商品返点明细
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Tabs defaultActiveKey="1" onChange={this.callback} tabBarStyle={{ color: '#002140' }}>
                    <TabPane tab="已结算商品返点" key="1">
                        {/* 已结算商品返点 */}
                    </TabPane>
                    <TabPane tab="待结算商品返点" key="2">
                        {/* 待结算商品返点 */}
                    </TabPane>
                </Tabs>
                {
                    this.state.userdata != '' ?
                    this.state.userdata.map((data,index)=>
                        <div className='mainUserInfok' key={data.key}>
                            {/* <Flex
                                className='head_flexss'
                                direction='row'
                                justify='center'
                            >
                            </Flex> */}
                            <div className='head_flexss'>
                                <div className='mainTopD'>
                                    <img src={dianpu} />
                                    <p className='mainTopD_txt1'>{data.nickName}</p>
                                    <p className='mainTopD_txt2'>{data.income}</p>
                                    {
                                        data.refundList !=''?
                                        <Icon
                                            className={['mainUpdIcon' , index===this.state.currentIndex?"activesss":null]}
                                            type="up"
                                            style={{ color: '#fff' ,backgroundColor:'#002140' ,zIndex:'9'}}    
                                            onClick={ this.upShow.bind(this,index) }
                                        />
                                        :null
                                    }
                                    {    
                                        data.refundList !=''?
                                        <Icon
                                            className='mainUpdIcon'
                                            type="down"
                                            style={{ color: '#fff' ,backgroundColor:'#002140' ,zIndex:'8'}}    
                                            onClick={ this.upShow.bind(this,index) }
                                        />
                                        :null
                                    }
                                    {/* <div className={["container tab", index===this.state.currentIndex?"active":null].join(' ')}>此标签是否选中</div> */}
                                </div>
                                    <div className='mainBottomD'>
                                    <p className='mainBottomD_txt1'>下单时间：{data.payTime}</p>
                                    <p className='mainBottomD_txt2'>+{data.orderProfit}</p>
                                </div>
                                {
                                    index === this.state.currentIndex ?
                                    data.refundList.map((datax,index)=>
                                        <div className='mainReturn'>
                                            <p className='mainReturn_txt1'>退款时间：{this.dateFormate(datax.refundTime)}</p>
                                            <p className='mainReturn_txt2'>-{datax.refundProfit}</p>
                                        </div>
                                    )
                                    :null
                                }  
                            </div>
                        </div>)
                        :null
                }
                {
                    this.state.datalist.pageidx * this.state.datalist.pagesize < this.state.datalist.total ?
                        <div
                            className='bottomMore'   
                            onClick= { this.onEndReached }
                        >点击加载下一页数据</div>
                    :null
                }
                
                {/* {
                    this.state.userdata != '' ?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={row}
                            initialListSize={10}
                            pageSize={1}
                            renderFooter={() => (<div style={{  textAlign: 'center', }}>
                                {this.state.datalist.pageidx * this.state.datalist.pagesize < this.state.datalist.total ? <div>加载中...</div> : null}
                            </div>)}
                            onEndReached={() => this.onEndReached()}
                            onEndReachedThreshold={5000}
                            useBodyScroll={true}
                            quickSearchBarTop
                            style={{ border: 'none' }}
                        />
                        : null
                } */}
                {/* 回到顶部按钮 */}
                {
                    this.state.userdata != '' ?
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