
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
  Upload,
  Collapse
} from 'antd';
import './index.less';
import {getBrandCountryList} from '../../../axios/api';
// import {optionCustom, optionOnOff, optionsClass, optionStatus, optionVerify} from "./mockData";
import { mockTableListData } from './mockData'
import { ERR_OK } from "../../../axios/config";
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

const FormItem = Form.Item;
const {Column, ColumnGroup} = Table;
const {TextArea} = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const layoutHorizontal = 'horizontal';
const Panel = Collapse.Panel; 

// 搜索表单
class AdvancedSearchForm extends React.Component {
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
    // 按钮文字显示动效
    this.onshowtxt();
  }

  state = {
    //页面大小
    pagesize: 5,
    pageidx: 1,
    
    filters:[],
    // 品牌名称
    name: '',
    // 品牌简称
    tagNames: '',
    // 是否热门
    isHot: '',
    isHomePage:'',
    // 国家id
    countryId: '',
    countryData:[],
    defaultCustom: '01',
    defaultStatus: '01',
    defaultOnOff: '01',
    defaultVerify: '01',
    loadingSearch: false,
    valueSPU: 'SPU-001',
    valueSKU: 'SKU-001',
    isok: { '是': '否' },
    showMoreBox: 'none',
    // 文字动效
    show: false,
    tableEmpty: {
      // 空数据样式
      emptyText: () => <div>
        <Icon type="frown" theme="outlined"/>
        暂无数据
      </div>
    },
  };

  getEnter = (e) => {
    switch (e.index) {
      case 0:
        return {
          rotate: 90,
          opacity: 0,
          y: -60,
        };
      case 10:
      case 1:
        return {
          y: -60,
          x: -10,
          opacity: 0,
        };
      case 9:
      case 2:
        return {
          y: -60,
          x: 20,
          opacity: 0,
        };
      case 3:
        return {
          y: 60,
          opacity: 0,
        };
      case 8:
      case 4:
        return {
          x: 30,
          opacity: 0,
        };
      case 5:
        return {
          enter: [
            {
              scale: 2,
              opacity: 0,
              type: 'set',
            },
            { scale: 1.2, opacity: 1, duration: 300 },
            { scale: 0.9, duration: 200 },
            { scale: 1.05, duration: 150 },
            { scale: 1, duration: 100 },
          ],
          leave: {
            opacity: 0, scale: 0,
          },
        };
      case 6:
        return {
          scale: 0.8,
          x: 30,
          y: -10,
          opacity: 0,
        };
      case 7:
        return {
          scale: 0.8,
          x: 30,
          y: 10,
          opacity: 0,
        };
      default:
        return {
          opacity: 0,
        };
    }
  }
  // 触发方法
  onshowtxt = () => {
    this.setState({
      show: !this.state.show
    });
  }

  _getBrandCountryList(params) {
    getBrandCountryList(params, 'GET').then(res => { 
      if (res.data.code === ERR_OK) {
        console.log(res.data.data)
        this.setState({
          countryData: res.data.data
        })
        console.log(this.state.countryData.length)
      }
    });
    
  }

  onChangeA = (val) => {
    console.log(val);
  };

  onChangeB = (val) => {  //是否热门选择
    console.log(val);

    this.setState({
      isHot: val
    });
  };

  onChangeC = (val) => {
    console.log(val);
    this.setState({
      isHomePage: val
    });
  };

  onChangeD = (val) => {
    console.log(val);
    this.setState({
      countryId: val
    });
  };

  onChangeE = (val) => {
    console.log(val);
  };

  // 搜索商品
  searchGoods = () => {
    console.log('开始搜索');

    let filters = []
    if (this.state.name !== '') {  //品牌简称
      filters.push({
        key : 'name',
        value : this.state.name
      })      
    } else {
      filters.push({
        key : 'name',
        value : ''
      }) 
    }
    if (this.state.tagNames !== '') {  //品牌标签
      filters.push({
        key : 'tagNames',
        value : this.state.tagNames
      })      
    } else {
      filters.push({
        key : 'tagNames',
        value : ''
      }) 
    }
    if (this.state.isHot !== '') {  //是否热门
      filters.push({
        key : 'isHot',
        value : this.state.isHot
      })      
    } else {
      filters.push({
        key : 'isHot',
        value : ''
      }) 
    }
    if (this.state.isHomePage !== '') {  //是否首页品牌
      filters.push({
        key : 'isHomePage',
        value : this.state.isHomePage
      })      
    } else {
      filters.push({
        key : 'isHomePage',
        value : ''
      })  
    }
    if (this.state.countryId !== '') {  //国家id
      filters.push({
        key : 'countryId',
        value : this.state.countryId
      })      
    } else {
      filters.push({
        key : 'countryId',
        value : ''
      }) 
    }

    this.setState({
      loadingSearch: true
    });

    let params
    console.log(filters)
    if(filters.length > 0){
      console.log(filters)
      filters = encodeURIComponent(JSON.stringify(filters))
      params = {
        pagesize: this.state.pagesize,
        pageidx: this.state.pageidx,
        filters
      }
    }else{
      params = {
        pagesize: this.state.pagesize,
        pageidx: this.state.pageidx,
      }
    }
    // return params
    console.log(params)
    this.props.search({  
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

  //品牌名称
  handleName = (rule, value, callback) => { 
    console.log(value)
    if (value !== '' || value.length !== 0) {
      this.setState({
        name: value ,
      }) 
    }
  };

  // 品牌标签
  handleTagNames = (rule, value, callback) => { 
    if (value !== '' || value.length !== 0) {
      this.setState({
        tagNames: value ,
      }) 
    }
  };

  changeShowBox = () => {
    if (this.state.showMoreBox == 'block') {
      this.setState({
        showMoreBox: 'none'
      })
    } else{
      this.setState({
        showMoreBox: 'block'
      })
    }
  }

  render() { 
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
        {/* <Collapse defaultActiveKey={['1']} onChange={this.callback}>
          <Panel header="This is panel header 1" key="1">
            <p>1</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>2</p>
          </Panel>
        </Collapse>, */}
        <Col span={8} className='firstCol'>
            <FormItem
              label="品牌名称/简称"
              {...formItemLayout}>
              {
                getFieldDecorator('b', {
                  rules: [{
                    validator: this.handleName
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
        </Col>
        <Col span={6} style={{ textAlign: 'right'}} >
          <FormItem>
            <Button
              className='findBtn'
              icon="search"
              type="primary"
              loading={this.props.loadingSearch}
              onClick={this.searchGoods}>
              查询
              {/* <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '查询'}</Texty> */}
            </Button>
          </FormItem>
        </Col>
        <div onClick={this.changeShowBox}>
          {
            this.state.showMoreBox== 'none' ?
              <div className='bar'>
                <span>更多搜索条件</span>
                <Icon type="down" theme="outlined"/>
              </div>
              :
              <div className='bar'>
                <span>收起</span>
                <Icon type="up" theme="outlined"/>
              </div>
          }
        </div>
        <Col span={8} style={{display:this.state.showMoreBox}}>
            <FormItem
              label="品牌标签"
              {...formItemLayout}>
              {
                getFieldDecorator('e', {
                  rules: [{
                    validator: this.handleTagNames
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
        </Col>
        <Col span={6} style={{display:this.state.showMoreBox}}>
            <FormItem
              label="是否热门"
              {...formItemLayout}>
              <Select
                showSearch
                // optionFilterProp="children"
                onChange={this.onChangeB}
                defaultValue='请选择'
              >
              <Option value="true">是</Option>
              <Option value="false">否</Option>
              </Select>
            </FormItem>
        </Col>
        <Col span={8} style={{display:this.state.showMoreBox}}>
            <FormItem
              label="是否首页品牌"
              {...formItemLayout}>
              <Select
                showSearch
                // optionFilterProp="children"
                onChange={this.onChangeC}
                defaultValue='请选择'
              >
              <Option value="true">是</Option>
              <Option value="false">否</Option>
              </Select>
            </FormItem>
        </Col>
        <Col span={8} style={{display:this.state.showMoreBox}}>
            <FormItem
              label="所属国家"
              {...formItemLayout}>
              <Select
                showSearch
                onChange={this.onChangeD}
                defaultValue='请选择'
              >
              {countryData.map((countryData,i) => <Option value={countryData.value} key={i}>{countryData.key}</Option>)}
              </Select>
            </FormItem>
        </Col>
       
      </Form>
    )
  }
}

export const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

