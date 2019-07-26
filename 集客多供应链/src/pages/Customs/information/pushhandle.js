
import React from 'react';
import {
  Form,
  Select,
  Input,
  Button,
  Icon,
  Row,
  Col,
  Layout,
  Card,
  Cascader,
  Table,
  Modal,
  message,
  Radio,
  Checkbox,
  Tooltip,
  AutoComplete,
  Upload
} from 'antd';
import './index.less';
import { getBrandCountryList } from '../../../axios/api';
// import {optionCustom, optionOnOff, optionsClass, optionStatus, optionVerify} from "./mockData";
import { mockTableListData } from './mockData'
import {ERR_OK} from "../../../axios/config";

const FormItem = Form.Item;
const {Column, ColumnGroup} = Table;
const {TextArea} = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const layoutHorizontal = 'horizontal';

// 搜索表单
class pushhandle extends React.Component {
    constructor(props) {
        super(props);    

    }

    componentDidMount() {
        this.setState({
            // optionsClass: optionsClass,
            // optionCustom: optionCustom,
            // optionStatus: optionStatus,
            // optionOnOff: optionOnOff,
            // optionVerify: optionVerify,
            mockTableListData: mockTableListData,
        })
        // 获取国家数据
        this._getBrandCountryList()
        // 获取缓存里的默认数据
        let localdata = localStorage.getItem('localBrandData');
        // let localdatab =JSON.stringify(localdata)
        if (localdata) {
            let localdatas =JSON.parse(localdata)
            if (localdatas !== '') {
                // console.log(localdatas.name)
                this.setState({
                    name: localdatas.name,
                    tagNames: localdatas.tagNames,
                    countryId: localdatas.countryId,
                    shortName: localdatas.shortName,
                    countryName: localdatas.countryName,
                    initial:localdatas.initial
                })
            }
        }
    }

    state = {
        //页面大小
        pagesize: 5,
        pageidx: 1,
        filters: [],
        pushdata:[],
        // 品牌名称
        name: '',
        // 品牌简称
        tagNames: '',
        // 是否热门
        isHot: '',
        // 国家id
        countryId: '',
        countryData:[],
        isok: { '是': '否' },
        pushdataA: '',
        pushdataB: '',
        pushdataC: '',
        pushdataD: '',
        pushdataE: '',
        defaultCurrent: [{}],
        
    };

    _getBrandCountryList(params) {
        getBrandCountryList(params, 'GET').then(res => { 
        if (res.data.code === ERR_OK) {
            console.log(res.data.data)
            this.setState({
                countryData: res.data.data
            })
            // console.log(this.state.countryData.length)
        }
        });
        
    }


    onChangea = (rule, value, callback) => { 
        // console.log(value)
        if (value !== '' || value.length !== 0) {
            // this.setState({
            //     pushdataA: value ,
            // })
            this.props.pusha({ value });
        }
    };
    onChangeb = (rule, value, callback) => { 
        // console.log(value)
        if (value !== '' || value.length !== 0) {
            this.props.pushb({  
                value
            });
        }
    };
    onChangec = (rule, value, callback) => { 
        console.log(value)
        if (value !== '' || value.length !== 0) {
            this.props.pushc({  
                value
            });
        }
    };
    onChanged = (rule, value, callback) => { 
        // console.log(value)
        if (value !== '' || value.length !== 0) {
            this.props.pushd({  
                value
            });
        }
    };
    onChangee = (rule, value, callback) => { 
        // console.log(value)
        if (value !== '' || value.length !== 0) {
            this.props.pushe({  
                value
            });
        }
    };

    // 搜索商品
    searchGoods = () => {
        let pushdata = []

        if (this.state.pushdataA !== '') {  
            pushdata.push({
                key : 'name',
                value : this.state.name
            })      
        }
        if (this.state.pushdataB !== '') {  
            pushdata.push({
                key : 'shortName',
                value : this.state.shortName
            })      
        }
        if (this.state.pushdataC !== '') {  
            pushdata.push({
                key : 'countryId',
                value : this.state.countryId
            })      
        }
        if (this.state.pushdataD !== '') {  
            pushdata.push({
                key : 'tagNames',
                value : this.state.tagNames
            })            
        }
        if (this.state.pushdataE !== '') {  
            pushdata.push({
                key : 'initial',
                value : this.state.initial
            })            
        }

        // this.setState({
        //   loadingSearch: true
        // });

        let params
        console.log(pushdata)
        if(pushdata.length > 0){
            console.log(pushdata)
            pushdata = encodeURIComponent(JSON.stringify(pushdata))
            params = {
                pagesize: this.state.pagesize,
                pageidx: this.state.pageidx,
                pushdata
            }
        }
        console.log(params)
        this.props.push({  
            params
        });
    };

    //品牌id
    // handleProductId = (rule, value, callback) => { 
    //   if (!/^[0-9]+$/.test(value)) {
    //     this.setState({
    //       productId: '',
    //     })
    //     callback('只能输入数字');
    //   } else {
    //     this.setState({
    //       productId: { productId:value },
    //     })
    //   }
    // };


    render() { 
        // 获取品牌默认值
        const countryData = this.state.countryData;
        const {getFieldDecorator} = this.props.form;
        const formItemLayoutOther = {
            labelCol: {span: 2},
            wrapperCol: {span: 20},
        };

        const formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
        };

        return (
            <Form layout={layoutHorizontal}>
                <Col span={9}>
                    <FormItem
                    label="品牌名称"
                    {...formItemLayout}>
                        {
                            getFieldDecorator('aa', {
                                initialValue: this.state.name,
                                rules: [{
                                    validator: this.onChangea
                                }],
                            })(
                                <Input/>
                        )
                    }
                    </FormItem>
                </Col>
                <Col span={9}>
                    <FormItem
                    label="品牌简称"
                    {...formItemLayout}>
                    {
                        getFieldDecorator('bb', {
                            initialValue: this.state.shortName,
                            rules: [{
                                validator: this.onChangeb
                            }],
                        })(
                            <Input onChange={this.validator}/>
                        )
                    }
                    </FormItem>
                </Col>
                <Col span={9}>
                    <FormItem
                    label="所属国家"
                    {...formItemLayout}>
                    {
                        getFieldDecorator('cc', {
                            initialValue: this.state.countryName,
                            value: '请选择',    
                            rules: [{
                                validator: this.onChangec,
                                dertxt:'请选择'
                            }],
                        })(
                            <Select
                                showSearch
                                onChange={this.validator}
                                // value={this.dertxt}
                            >
                            {countryData.map((countryData,i) => <Option value={countryData.value} key={i}>{countryData.key}</Option>)}
                            </Select>    
                            // <Input onChange={this.validator}/>
                        )
                    }
                    </FormItem>
                </Col>
                <Col span={9}>
                    <FormItem
                    label="品牌标签"
                    {...formItemLayout}>
                    {
                        getFieldDecorator('dd', {
                            initialValue: this.state.tagNames,
                            rules: [{
                                validator: this.onChanged
                            }],
                        })(
                            <Input onChange={this.validator}/>
                        )
                    }
                    </FormItem>
                </Col>
                <Col span={9}>
                    <FormItem
                    label="品牌首字"
                    {...formItemLayout}>
                    {
                        getFieldDecorator('ee', {
                            initialValue: this.state.initial,
                            rules: [{
                                validator: this.onChangee
                            }],
                        })(
                            <Input onChange={this.validator}/>
                        )
                    }
                    </FormItem>
                </Col>
            </Form>
        )
    }
}

export const PushData = Form.create()(pushhandle);

