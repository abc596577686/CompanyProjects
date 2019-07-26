import React from 'react';
import {
    Button,
    WingBlank,
    WhiteSpace,
    Card,
    Flex,
    InputItem,
    Toast,
    Modal,
    List
} from 'antd-mobile';
import {
    Input,
    Upload
} from 'antd';
import { Icon } from 'antd'
import { dockRecordList,applyDock } from '../../../../axios/api';
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { createForm } from 'rc-form';

const alert = Modal.alert;

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
        // this.getbdMemberQuotaList()
        this.getDockRecordList()
    }

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        mockTableListData:[],
        secTeamData: [],
        keyword: '',
        visible: '',
        imageUrl: '',
        pageidx: 1,
        pagesize: 9999,
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

    getDockRecordList() {
        // this.setState({ showLoading: true })
        let params = {
            pageidx: this.state.pageidx,
            pagesize: this.state.pagesize   
        }
        dockRecordList(params, 'GET').then(res => {
          if (res.data.code == 1) {
            this._setdata(res.data.data)
            // this.setState({ showLoading: false }) 
          } else {
            // message.warning(res.data.msg)
          }
        })
    }


    _setdata(adminlist) {
        let mockTableListData = []
        adminlist.map((data,j) => {
          mockTableListData.push({
            key: j + 1000,
            recordId: data.recordId,
            userName: data.userName,
            mobile: data.mobile,
            registerTime: this.dateFormate(data.registerTime),
            promoteTime: this.dateFormate(data.promoteTime),
            bdUserName: data.bdUserName,
            createTime: this.dateFormate(data.createTime),
            complateTime: this.dateFormate(data.complateTime),
            status: data.status==0?'审核中':(data.status==1?'已通过':'已拒绝')
          })
        })
        this.setState({
          mockTableListData
        })
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

    _handlekeyword = (e) => {
        // console.log(e.target.value)
        this.setState({
          keyword: e.target.value
        })
    }

    // 添加拜访记录
    _addBDuser = () => {
        this.setState({
            visible: true
        })
    }
    handleCancel = () => {
        this.setState({
          visible: false,
        })
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }, () => {
              // console.log(info.file.response.data.imageAbso)
              this.setState({
                readyUpUrl: info.file.response.data.imageAbso
              })
            }),
          );
        }
    };
    handleMobile = (e) => {
        this.setState({
          mobile: e.target.value
        })
    }

    goDerive = () => {
        let params = {
          mobile: this.state.mobile,
          imagePath: this.state.readyUpUrl
        }
        applyDock(params, 'GET').then(res => {
          if (res.data.code == 1) {
            // this._setdata(res.data.data)
            // message.success(res.data.msg)
            this.getDockRecordList()
            this.setState({
              showLoading: false,
              visible: false
            })
          } else {
            // message.warning(res.data.msg)
            Toast.fail(res.data.msg,2);
          }
        })
    }


    render() {
        // const { getFieldProps } = this.props.form;
        const customIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
                <path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
            </svg>
        );

        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} style={{ width:'.7rem',height:'.7rem',marginTop: '.5rem' }}/>
                <div className="ant-upload-text" style={{ fontSize: '.3rem' }}>上传晋升证明</div>
            </div>
          );
        return (
            <div id='superWebPerformanceInfo'>
                <div className='pageTitle'>
                <Icon type="home" size='lg' className='returnIcon' onClick={this.goIndex}/>    
                申请对接记录</div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                {
                    this.state.mockTableListData != '' ?
                    this.state.mockTableListData.map(data=>
                            <div className='mainUserInfo' key={data.key}>
                        <Flex
                            className='head_flexs'
                            direction='row'
                            justify='center'
                        >
                            <div className='userMaintxt'>
                                <p>账号: {data.mobile}</p>
                                <p>昵称: {data.userName}</p>
                                <p>对接人: {data.bdUserName}</p>
                                <p>状态: {data.status}</p>
                            </div>
                                <div className='userMoreInfo'>
                                <p>注册时间</p>
                                <p>{data.registerTime}</p>
                                <p>晋升时间</p>
                                <p>{data.promoteTime}</p>
                                <p>申请时间</p>
                                <p>{data.createTime}</p>
                                <p>审核时间</p>
                                <p>{data.complateTime}</p>
                            </div>
                        </Flex>
                    </div>)
                    :null
                }
                <div className='return'>
                    {/* <Button
                        activeStyle={{ backgroundColor: '#fff', color: '#fff' }}
                        onClick={() =>
                            alert(
                                '申请对接',
                                // <div> 
                                    <Input addonBefore='用户账号' value={this.state.keyword} style={{  fontSize: '.3rem', display: 'inline-block',  }} onChange={this._handlekeyword} />
                                // </div>
                                ,
                                [
                                    {
                                        text: '取消',
                                        onPress: () => console.log('cancel')
                                    },
                                    {
                                        text: '确定',   
                                        onPress: () =>
                                            new Promise((resolve,reject) => {
                                                // allocateUserMember({
                                                //     userId: dataRow.userId
                                                // }).then(res => {
                                                //     alert(res.data.msg)
                                                //     resolve(res)
                                                // })
                                                // .catch(err => {
                                                //     // 抛出错误
                                                //     // Toast.info('分配中...', 1);
                                                //     alert(err)
                                                //     reject(err)
                                                //     console.log(err)
                                                // })
                                            }),
                                    },      
                                ]
                            )
                        }
                    >
                    申请对接
                    </Button> */}
                    <Button
                        type="primary"
                        activeStyle={{ backgroundColor: '#fff', color: '#fff' }}
                        onClick={this._addBDuser}
                    >申请对接</Button>
                </div>
                <WhiteSpace size="lg" />
                <Modal
                    // title="申请对接"
                    visible={ this.state.visible }
                    onOk={ this.goDerive }
                    onCancel={ this.handleCancel }
                    destroyOnClose={ true }
                    // className='visitHistoryList'
                    okText={'确认对接'}
                    style={{ minWidth: '6rem', height: '7rem' ,fontSize: '.4rem',padding: '.3rem' }}
                >
                    <div>
                        <Input addonBefore='用户账号' size='default' style={{ fontWeight:'bold', marginBottom: '30px',width:'90%',marginTop: '30px',fontSize:'.3rem' }} value={this.state.mobile} onChange={ this.handleMobile }/>
                        <div style={{ fontSize: '.3rem' ,fontWeight: 'bold' ,textAlign: 'left',marginLeft:'.4rem'}}>
                            <p style={{ fontSize: '.3rem',fontWeight: 'bold', color: '#666',textIndent:'.02rem' }}>双击上传晋升证明图片：</p>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploaderr"
                                showUploadList={false}
                                action="http://dbtest.uzengroup.com/clt/upload/webUploadImage"
                                onChange={this.handleChange}
                                style={{ minWidth: '2.5rem', minHeight:'2.5rem' ,display: 'block'  }}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        </div>
                        <div style={{ width: '100%',height: '.7rem' ,position:'absolute' ,bottom: '0',marginTop:'.3rem' }}>
                            <Button style={{ width: '50%' ,height:'.7rem', display: 'inline-block' ,fontSize:'.3rem' ,lineHeight:'.7rem'}}  onClick={ this.goDerive }>确认</Button>
                            <Button style={{ width: '50%', height: '.7rem', display: 'inline-block', fontSize: '.3rem' ,lineHeight:'.7rem'}} onClick={ this.handleCancel }>取消</Button>
                        </div>
                    </div>
                    </Modal>
            </div>
        )
    }
}