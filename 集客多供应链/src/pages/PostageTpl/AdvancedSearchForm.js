
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
// import {optionCustom, optionOnOff, optionsClass, optionStatus, optionVerify} from "./mockData";
import {mockTableListData} from './mockData'

const FormItem = Form.Item;
const {Column, ColumnGroup} = Table;
const {TextArea} = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const layoutHorizontal = 'horizontal';

// 搜索表单
class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    defaultCustom: '01',
    defaultStatus: '01',
    defaultOnOff: '01',
    defaultVerify: '01',
    loadingSearch: false,
    valueSPU: 'SPU-001',
    valueSKU: 'SKU-001',
    isok: {'是':'否'}
  };

  componentDidMount() {
    this.setState({
      // optionsClass: optionsClass,
      // optionCustom: optionCustom,
      // optionStatus: optionStatus,
      // optionOnOff: optionOnOff,
      // optionVerify: optionVerify,
      mockTableListData: mockTableListData,
    })

  }

  onChangeA = (val) => {
    console.log(val);
  };

  onChangeB = (val) => {
    console.log(val);
  };

  onChangeC = (val) => {
    console.log(val);
  };

  onChangeD = (val) => {
    console.log(val);
  };

  onChangeE = (val) => {
    console.log(val);
  };

  // 搜索商品
  searchGoods = () => {
    console.log('开始搜索');
    this.props.search({
      query: '减肥'
    });
  };

  handleInputSKU = (rule, value, callback) => {
    if (!/^[0-9]+$/.test(value)) {
      callback('只能输入数字');
    }
    callback();
  };

  handleInputSPU = (rule, value, callback) => {
    if (!/^[0-9]+$/.test(value)) {
      callback('只能输入数字');
    }
    callback();
  };

  handleInputGoodsEncode = (rule, value, callback) => {
    if (!/^[0-9a-z]+$/.test(value)) {
      callback('只能输入数字、字母');
    }
    callback()
  };

  render() {
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
        
        <Col span={7}>
            <FormItem
              label="一级仓库模板"
              {...formItemLayout}>
              {/* <Cascader
                options={ 'zhejiang' }
                onChange={this.onChangeA}
                placeholder="请选择"
              /> */}
              <Select
                showSearch
                // optionFilterProp="children"
                onChange={this.onChangeB}
                defaultValue='请选择'
              >
              <Option value="a1">仓库1</Option>
              <Option value="a2">仓库2</Option>
              </Select>
            </FormItem>
        </Col>
        <Col span={7}>
            <FormItem
              label="二级仓库列"
              {...formItemLayout}>
              {/* <Cascader
                options={ 'zhejiang' }
                onChange={this.onChangeA}
                placeholder="请选择"
              /> */}
              <Select
                showSearch
                // optionFilterProp="children"
                onChange={this.onChangeB}
                defaultValue='请选择'
              >
              <Option value="a1">包邮仓库1</Option>
              <Option value="a2">送货仓库2</Option>
              <Option value="a3">海底仓库3</Option>
              </Select>
            </FormItem>
        </Col>
      
        <Col span={6} style={{textAlign: 'right'}}>
          <FormItem>
            <Button
              icon="search"
              type="primary"
              loading={this.props.loadingSearch}
              onClick={this.searchGoods}>查询</Button>
          </FormItem>
        </Col>
      </Form>
    )
  }
}

export const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

