import React from 'react';
import {
  Button,
  Icon,
  Card,
  Form,
  Select,
  Input,
  Cascader,
  Row,
  Col,
  Pagination,
  Dropdown
} from 'antd';
import './index.less';
const FormItem = Form.Item;
const layoutHorizontal = 'horizontal';
const Option = Select.Option
const formItemLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 14},
};
function SearchComponetUI(props){
  const brand = (
    <div>
      <div className='brandList'>
        <ul>
          {
            props.brandList&&props.brandList.length>0&&
              props.brandList.map(item => {
                return(
                  <li className='brandItem'
                      key={item.name}
                       onClick={() => {
                    console.log(11111111122)
                    return props.brandChangeCallback(item)
                   }}
                  >
                    {item.name}
                  </li>
                )
              })
          }
        </ul>
      </div>
      {/*<Pagination*/}
        {/*size='small'*/}
        {/*onChange={props._pageChangCallback}*/}
      {/*/>*/}
    </div>
  )
  return(
    <Form className='formCom'>
      <Row>
        <Col span={8} style={{textAlign:'left'}}>
          <FormItem
            label="条件查询"
            labelCol={{span:6}}
            wrapperCol = {{span:18}}
          >
            <Row>
              <Col span={10}>
                <Select onChange={props.selectCallback} defaultValue='商品名称' style={{width:'90%'}}>
                  <Option value='1'>商品名称</Option>
                  <Option value='2'>商品货号</Option>
                  <Option value='3'>商品条码</Option>
                </Select>
              </Col>
              <Col span={14}>
                <Input onChange={props.inputCallback} value={props.searchValue}/>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span={6} style={{textAlign:'center'}}>
          <FormItem>
            <Button
              icon="search"
              type="primary"
              onClick={props.searchCallback}>查询</Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              icon="retweet"
              onClick={props.resetCallback}>重置</Button>
          </FormItem>
        </Col>
          {
            !props.hideAdd&&
          <Col span={4}>
            <FormItem>
              <Button type="primary" ghost icon="plus" onClick={props.addCallback}>添加商品</Button>
            </FormItem>
          </Col>
        }
        <Col span={4}>
          <div onClick={props._changeShowBoxCallBack}>
            {
              !props.showMoreBox ?
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
        </Col>
      </Row>
      {
        props.showMoreBox&&
        <div>
          <Row>
            <Col span={10}>
              <FormItem
                label="商品类型"
                {...formItemLayout}>
                <Cascader
                  changeOnSelect
                  options={props.optionsClassValue}
                  onChange={props.cateIdCallback}
                  value={props.cateValue}
                  placeholder="请选择"/>
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem
                label='商品品牌'
                {...formItemLayout}
              >
                {/*<Select*/}
                {/*defaultValue='选择品牌'*/}
                {/*dropdownClassName ='brandDrop'*/}
                {/*dropdownRender ={() =>(*/}
                {/*brand*/}
                {/*)*/}
                {/*}*/}
                {/*>*/}
                {/*</Select>*/}
                <Dropdown overlay={brand}
                          trigger='click'
                          overlayClassName='dropMenu'
                >
                  <Input
                    readOnly
                    placeholder="请选择品牌"
                    // allowClear ={true}
                    suffix={<Icon type="down" style={{color:'#ccc'}}/>}
                    value={props.brandName}
                  />
                </Dropdown>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <FormItem
                label="仓库名称"
                {...formItemLayout}>
                <Select
                placeholder='请选择仓库'
                onChange={props.wareCallback}
                value={props.warehouseName}
                >
                  {
                    props.warehouseList&&props.warehouseList.length>0&&
                      props.warehouseList.map(item =>
                        <Option value={item.warehouseId}>{item.name}</Option>
                      )
                  }
                </Select>
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem
                label='地区名称'
                {...formItemLayout}
              >
                <Select
                  placeholder='请选择选择地区'
                  onChange={props.areaCallback}
                  value={props.countryName}
                  
                >
                  {
                    props.countryList&&props.countryList.length>0&&
                    props.countryList.map(item =>
                      <Option value={item.value}>{item.key}</Option>
                    )
                  }
                </Select>
              </FormItem>
            </Col>
          </Row>
        </div>
        
      }
    </Form>
  )
}
export default SearchComponetUI