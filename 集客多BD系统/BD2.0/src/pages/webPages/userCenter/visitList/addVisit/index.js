import React from 'react';
import {
    Button,
    WingBlank,
    WhiteSpace,
    Card,
    Flex,
    InputItem,
    Toast,
    // Icon,
    Picker,
    List,
    TextareaItem,
    ImagePicker,
    SegmentedControl
} from 'antd-mobile';
import { Icon } from 'antd'
import { userLogin, vertifyCode, saveCustomerHistory, webUploadImage } from '../../../../../axios/api';
import 'antd-mobile/dist/antd-mobile.css';
import "./index.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import { createForm } from 'rc-form';

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);

// const data = [{
//     url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//     id: '2121',
// }, {
//     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
//     id: '2122',
// }];

const data = []

export default class GiftPack extends React.Component {
    componentDidMount() {
        // this.inputRef.focus();
        // console.log(this.getUrlPara('username'))
        this.setState({
            username: this.getUrlPara('username'),
            userId: this.getUrlPara('userId')
        }, () => {
            this.makeParas()
        })
    }

    state = {
        codeimg: '',
        mobile: '',
        password: '',
        verifyCode: '',
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['2013', '春'],
        visible: false,
        colorValue: ['#00FF00'],
        district: [
            {
                label: '当面访问',
                value: '1',
            },
            {
                label: '电话访问',
                value: '2',
            },
            
        ],
        pickItem: 'ddsd',
        chooseTypeValue: '',
        files: data,
        multiple: false,
        address: '',
        content: '',
        type: '',
        imagePath: '',
        username: '',
        userId: ''
    }

    makeParas = () => {
        let key = this.state.username
        if (key != '' && key != 'null') {
            this.setState({
                mobile: key
            })
        }
    }

    getUrlPara(paraName) {
        var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
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
  
    chooseType = (value) => {
        console.log(value)
        this.setState({
            chooseTypeValue: value,
            type: Number(value)
        })
    }

    onChangeColor = (color) => {
        this.setState({
            colorValue: color,
        });
    };

    // 删除上传图片
    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }

    // changebaseimg(key) {
    //     var base64String = key ;/*base64图片串*/
    //     //这里对base64串进行操作，去掉url头，并转换为byte   
    //     var bytes = window.atob(base64String.split(',')[1]);
    //     var ab = new ArrayBuffer(bytes.length);
    //     var ia = new Uint8Array(ab);
    //     for(var i = 0; i < bytes.length; i++){
    //         ia[i] = bytes.charCodeAt(i); //这里有点疑惑，ia是怎么改变ab的？注：①
    //     }
    //     //Blob对象
    //     var blob = new Blob([ab], {type: 'image/jpeg'}); //type为图片的格式

    //     // File对象
    //     // var File = new File([ab], {type: 'image/jpeg'}); 
        
    //     //FormData对象
    //     var fd = new FormData();
    //     //TDOD Ajax或者其他方式上传FormData对象

    //     //FormData对象接受三个参数，第三个参数为文件名，通常我们只传前两个参数，第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
    //     fd.append('file', blob, Date.now() + '.jpg');
    //     return fd
    // }

    dataURLtoFile(dataurl, filename) {  //将base64转换为文件
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    
    uploadPic(base64Codes) {
        var form = document.forms[0];
        
        var formData = new FormData(form);   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数  
    
        //convertBase64UrlToBlob函数是将base64编码转换为Blob  
        // formData.append("imageName",this.convertBase64UrlToBlob(base64Codes));  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同  
        // formData.append('file', base64Codes);

        // 接口太low 直接用file算了
        formData.append("myfile", this.dataURLtoFile(base64Codes,".png"));
        formData.append('chunk', '0');
        return formData
    }
    
    // convertBase64UrlToBlob(urlData) {
    //     const bytes = window.atob(urlData.split(',')[1]);        // 去掉url的头，并转换为byte   
    //     // 处理异常,将ascii码小于0的转换为大于0   
    //     const ab = new ArrayBuffer(bytes.length);
    //     const ia = new Uint8Array(ab);
    //     for (let i = 0; i < bytes.length; i++) {
    //         ia[i] = bytes.charCodeAt(i);
    //     }
    //     return new File([ab], { type: 'image/png' });
    // }

    uploadImg = (data) => {
        this.setState({
            imagePath: ''
        })
        webUploadImage(data).then(res => {
            // console.log(res);
            // console.log(res.data)
            // if (res.data.code == 1) { 
                let imageList = this.state.imagePath
                imageList += res.data.imageAbso + ';'
                this.setState({
                    imagePath: imageList
                })
            // }
        })
    }

    onChangeUp = (files, type, index) => {
        // console.log(files, type, index);
        // console.log(files)
        files.map((data) => {
            this.uploadImg(                //单独上传
                this.uploadPic(data.url)
            )                               
        })
        this.setState({
            files
        })        
    }

    submitAddVisitTe = () => {
        // console.log(this.state.imagePath)
        let _this = this
        let params = {
            mobile: _this.state.mobile,
            type: _this.state.type,
            address: _this.state.address,
            content: _this.state.content,
            imagePath: _this.state.imagePath
        }
        console.log(params)

        saveCustomerHistory(params, 'POST').then(res => {
            if (res.data.code == 1) {
                Toast.info(res.data.msg,1.2) 
                _this.props.history.push('/userCenter/visitList?userId='+this.state.userId+'&username='+this.state.username);
            } else {
                Toast.fail(res.data.msg) 
            }
        });


        // let imgData = this.state.files
        // console.log(imgData[0].url)
        
        // imgData.map((data) => {
        //     this.uploadImg(this.uploadPic(data.url))       //单独上传
        // })
        // return this.goSave();
    }

    handleAddress = (value) => {
        this.setState({
            address: value
        })
    }

    handleContent = (value) => {
        this.setState({
            content: value
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
            <div id='superWebAddVisitList'>
                <div className='pageTitle'>
                <Icon type="home" size='lg' className='returnIcon' onClick={this.goIndex}/>        
                添加拜访记录</div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                {
                    this.state.username=='' || this.state.username == 'null'?
                    <div className='inputTxt'>
                        <Flex
                            direction='row'
                            justify='start'
                            wrap='wrap'
                            className='inputFlexBo'
                        >
                            <p>拜访用户：</p>
                            <InputItem
                                type="number"
                                className='inputFlexBoIn'
                                placeholder="请填写拜访用户"
                                onChange={this.usernameHandle}
                                value={this.state.mobile}
                            ></InputItem>
                        </Flex>
                    </div>
                    :null
                }
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='inputTxt'>
                    <Flex
                        direction='row'
                        justify='start'
                        wrap='wrap'
                        className='inputFlexType'
                    >
                        <p>拜访方式</p>
                        <Picker className='picker' data={this.state.district} value={ this.state.chooseTypeValue } cols={1} onChange={this.chooseType} className="forss">
                            <List.Item arrow="horizontal"></List.Item>
                        </Picker>
                    </Flex>
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='inputTxt autoheight'>
                    <TextareaItem
                        title="拜访地址："
                        placeholder="请输入拜访地址"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        value={this.state.address}
                        onChange={ this.handleAddress }
                        autoHeight
                    />
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='inputTxt autoheight'>
                    <TextareaItem
                        title="拜访内容："
                        placeholder="请输入拜访内容"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        value={this.state.content}
                        onChange={ this.handleContent }
                        autoHeight
                    />
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <div className='imgUpload autoheight'>
                    <p>照片：</p>
                    <WingBlank>
                        <SegmentedControl
                            // values={['切换到单选', '切换到多选']}
                            selectedIndex={this.state.multiple ? 1 : 0}
                            onChange={this.onSegChange}
                        />
                        <ImagePicker
                            files={this.state.files}
                            onChange={this.onChangeUp}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={this.state.files.length < 3}
                            multiple={this.state.multiple}
                            accept={'image/png'}
                        />
                    </WingBlank>
                </div>
                <div className='return'>
                    <Button
                        type="primary"
                        activeStyle={{ backgroundColor: '#fff', color: '#fff' }}
                        onClick= { this.submitAddVisitTe }
                    >确认添加</Button>
                </div>
            </div>
        )
    }
}