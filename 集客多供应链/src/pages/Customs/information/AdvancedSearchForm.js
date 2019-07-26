
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
    orderNo:'',
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
    if (this.state.orderNo !== '') { 
      filters.push({
        key : 'orderNo',
        value : this.state.orderNo
      })      
    } else {
      filters.push({
        key : 'orderNo',
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

    console.log(params)
    this.props.search({  
      params
    });
  };


  //品牌名称
  handleName = (rule, value, callback) => { 
    console.log(value)
    if (value !== '' || value.length !== 0) {
      this.setState({
        orderNo: value ,
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
        <Col span={8} className='firstColl' style={{ width: '200px'}}>
            <FormItem
              label="订单id"
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
        <Col span={6} style={{ textAlign: 'right'}} className="pll">
          <FormItem>
            <Button
              className='findBtn kbtn'
              // icon="search"
              type="primary"
              loading={this.props.loadingSearch}
              onClick={this.searchGoods}>
              {/* 查询 */}
              <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '查询'}</Texty>
            </Button>
          </FormItem>
        </Col>
      </Form>
    )
  }
}

export const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

