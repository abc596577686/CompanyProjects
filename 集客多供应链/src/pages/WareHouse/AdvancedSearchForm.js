
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
        <Col span={6}>
            <FormItem
              label="序号"
              {...formItemLayout}>
              {
                getFieldDecorator('a', {
                  rules: [{
                    validator: this.handleInputGoodsEncode
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
        </Col>
        <Col span={6}>
            <FormItem
              label="仓库名字"
              {...formItemLayout}>
              {
                getFieldDecorator('b', {
                  rules: [{
                    validator: this.handleInputGoodsEncode
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
        </Col>
        <Col span={6}>
            <FormItem
              label="模板配送区域"
              {...formItemLayout}>
              {
                getFieldDecorator('c', {
                  rules: [{
                    validator: this.handleInputGoodsEncode
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
        </Col>
        <Col span={6}>
            <FormItem
              label="仓库类型"
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
              <Option value="a1">他营</Option>
              <Option value="a2">自营</Option>
              </Select>
            </FormItem>
        </Col>
        <Col span={6}>
            <FormItem
              label="仓库属性"
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
              <Option value="a1">国内</Option>
              <Option value="a2">跨境</Option>
              <Option value="a2">直邮</Option>
              </Select>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
              label="是否推送海关"
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
              <Option value="a1">是</Option>
              <Option value="a2">否</Option>
              </Select>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
              label="是否直推ERP"
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
              <Option value="a1">是</Option>
              <Option value="a2">否</Option>
              </Select>
            </FormItem>
        </Col>
        
        <Col span={6}>
            <FormItem
              label="创建时间"
              {...formItemLayout}>
              {
                getFieldDecorator('h', {
                  rules: [{
                    validator: this.handleInputGoodsEncode
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
        </Col>
        <Col span={6}>
            <FormItem
              label="更新时间"
              {...formItemLayout}
              >
              {
                getFieldDecorator('i', {
                  rules: [{
                    validator: this.handleInputGoodsEncode
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
        </Col>
        
        {/* <Row>
          <Col span={24}>
            <FormItem
              label="后台类目"
              {...formItemLayoutOther}>
              <Cascader
                options={this.state.optionsClass}
                onChange={this.onChangeA}
                placeholder="请选择"
              />
            </FormItem>
          </Col>
        </Row> */}
        {/* <Row>
          <Col span={6}>
            <FormItem
              label="商户"
              {...formItemLayout}>
              <Select
                showSearch
                optionFilterProp="children"
                onChange={this.onChangeB}
                defaultValue={this.state.defaultCustom}>
                {
                  !this.state.optionCustom ? null :
                    this.state.optionCustom.map((item, i) =>
                      <Option key={i}
                              value={item.value}>{item.label}</Option>
                    )
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="状态"
              {...formItemLayout}>
              <Select
                onChange={this.onChangeC}
                defaultValue={this.state.defaultStatus}>
                {
                  !this.state.optionStatus ? null :
                    this.state.optionStatus.map((item, i) =>
                      <Option key={i}
                              value={item.value}>{item.label}</Option>
                    )
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="下架类型"
              {...formItemLayout}>
              <Select
                onChange={this.onChangeD}
                defaultValue={this.state.defaultOnOff}>
                {
                  !this.state.optionOnOff ? null :
                    this.state.optionOnOff.map((item, i) =>
                      <Option key={i}
                              value={item.value}>{item.label}</Option>
                    )
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="审核状态"
              {...formItemLayout}>
              <Select
                onChange={this.onChangeE}
                defaultValue={this.state.defaultVerify}>
                {
                  !this.state.optionVerify ? null :
                    this.state.optionVerify.map((item, i) =>
                      <Option key={i}
                              value={item.value}>{item.label}</Option>
                    )
                }
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label="SPU ID"
              {...formItemLayout}>
              {
                getFieldDecorator('SPU ID', {
                  rules: [{
                    validator: this.handleInputSPU
                  }],
                })(
                  <Input onChange={this.validator}/>
                )
              }

            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="SKU ID"
              {...formItemLayout}>
              {
                getFieldDecorator('SKU ID', {
                  rules: [{
                    validator: this.handleInputSKU
                  }],
                })(
                  <Input onChange={this.onChangeG}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="商户商品编码"
              {...formItemLayout}>
              {
                getFieldDecorator('goodsEncode', {
                  rules: [{
                    validator: this.handleInputGoodsEncode
                  }],
                })(
                  <Input onChange={this.onChangeGoodsEncode}/>
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="品牌"
              {...formItemLayout}>
              <Input/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label="商品名"
              {...formItemLayout}>
              <Input/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="商品类型"
              {...formItemLayout}>
              <Cascader options={this.state.optionsClass}
                        onChange={this.onChangeA}
                        placeholder="请选择"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="规格"
              {...formItemLayout}>
              <Input/>
            </FormItem>
          </Col>
          <Col span={6} style={{textAlign: 'right'}}>
            <FormItem>
              <Button icon="search"
                      type="primary"
                      loading={this.props.loadingSearch}
                      onClick={this.searchGoods}>查询</Button>
            </FormItem>
          </Col>
        </Row> */}
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

