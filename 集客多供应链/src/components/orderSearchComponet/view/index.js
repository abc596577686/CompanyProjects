import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Icon,
  Select,
  DatePicker,
  Button,
} from 'antd';
import moment from 'moment';
import './index.less';
const FromItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const layoutHorizontal = 'horizontal';
export default function OrderSearchComUI(props){
  const formItemLayoutBottom = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  };
  const { getFieldDecorator } = props.form;
  return(
    <Form layout={layoutHorizontal} className='orderSearchCom'>
      <Row>
        <Col span={7}>
          <div className='selectModx'>
            <FromItem {...formItemLayoutBottom} style={{width: '120px'}}>
              {getFieldDecorator('selectMod', {
                initialValue: 'orderNo',
              })(
                  <Select style={{width: '120px'}}>
                    <Option value='orderNo'>商户订单号</Option>
                    <Option value='tradeNo'>支付交易号</Option>
                  </Select>
              )}
            </FromItem>
            <FromItem>
              {getFieldDecorator('selectNo')(
                  <Input style={{width: '200px'}}/>
              )}
            </FromItem>
          </div>
        </Col>
        <Col span={7} style={{marginLeft: '10px'}}>
          <FromItem label='店铺'  {...formItemLayoutBottom}>
            {getFieldDecorator('erpStoreId', {
              initialValue: '',
            })(
                <Select
                    defaultValue='全部店铺'
                    style={{minWidth:'250px',marginRight:'5px'}}>
                  <Option value=''>全部店铺</Option>
                  {
                    props.storeList && props.storeList.length>0 &&
                    props.storeList.map(item => {
                      return(
                          <Option value={item.appStoreId}>{item.nick}</Option>
                      )
                    })
                  }
                </Select>
            )}
          </FromItem>
        </Col>
        {
          <Col span={6}>
            <div className="btns">
              <Button icon="search"
                      type="primary"
                      loading={props.loadingSearch}
                      onClick={props._searchGoodsCallback}>查询</Button>
              <Button icon="retweet" onClick={props._resetFormCallback}>重置</Button>
            </div>
          </Col>
        }
        <Col span={3}>
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
        props.showMoreBox &&
        <div className='moreBox'>
          <Row>
            <Col span={11}>
              <FromItem
                label='下单时间'
                {...formItemLayoutBottom}
              >
                  {getFieldDecorator('time')(
                    <RangePicker
                      format="YYYY-MM-DD"
                      style={{width: '100%'}}
                      allowClear={true}
                    />
                  )}
              </FromItem>
            </Col>
            <Col span={9}>
              <FromItem
                label='付款时间'
                {...formItemLayoutBottom}
              >
                {getFieldDecorator('payTime')(
                  <RangePicker
                    format="YYYY-MM-DD"
                    style={{width: '100%'}}
                    allowClear={true}
                  />
                )}
              </FromItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <FromItem
                label='收货人'
                {...formItemLayoutBottom}
              >
                {getFieldDecorator('customer')(
                  <Input/>
                )}
              </FromItem>
            </Col>
            <Col span={9}>
              <FromItem
                label='手机号'
                {...formItemLayoutBottom}
              >
                {getFieldDecorator('mobile')(
                  <Input/>
                )}
              </FromItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <FromItem
                label='商品货号'
                {...formItemLayoutBottom}
              >
                {getFieldDecorator('productCode')(
                  <Input/>
                )}
              </FromItem>
            </Col>
            <Col span={9}>
              <FromItem
                label='老订单号'
                {...formItemLayoutBottom}
              >
                {getFieldDecorator('oldOrderNo')(
                  <Input/>
                )}
              </FromItem>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
            <FromItem
            label='商品名称'
            {...formItemLayoutBottom}
            >
            {getFieldDecorator('goodName')(
            <Input/>
            )}
            </FromItem>
            </Col>
          </Row>
        </div>
      }
    </Form>
  )
}
