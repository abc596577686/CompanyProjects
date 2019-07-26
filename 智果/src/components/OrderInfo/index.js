import React from 'react';
import { dateFormate} from '../../utils/utils'
import './index.less'
function Title(props){
  return(
    <div className='title_box'>
      <div className='titleBtn'>{props.btnInfo}</div>
    </div>
  )
}
//订单信息
export default function OrderInfo(props){
  console.log(props)
  let data = props.data[0]
  return(
    <div className='infoBox'>
      <Title btnInfo='订单信息'/>
      <div className='log_main order_main'>
        <ul className='left'>
          <li><span>订单编号：</span>{data.orderNo}</li>
          {
            data.oldOrderNo?
              <li>
                <span>原始订单号：</span>
                {data.oldOrderNo}
              </li>:null
          }
          <li><span>收货信息：</span>
            <div>
              {data.consignee} {data.consigneePhone}
              <br/>
              {data.identityNo}
              <br/>
              {data.address}
            </div>
          </li>
        </ul>
        <ul className='right'>
          <li><span>下单时间：</span>{data.createTime?dateFormate(data.createTime):''}</li>
          <li><span>支付时间：</span>{data.payTime?dateFormate(data.payTime):''}</li>
        </ul>
      </div>
    </div>
  )
}