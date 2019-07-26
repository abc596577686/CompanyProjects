import React from 'react'
import './index.less'
//length 进度个数,step当前状态，index当前下标,type是否是退款
function Process(props) {
  console.log(props)
  let liClass
  let step = props.step - 0
  console.log('进度--------------',props.step)
  console.log()
  if(props.index==0){
    liClass = 'frist_li'
  }else if(props.index == props.length-1){
    liClass = 'last_li'
  }else{
    liClass='step_li'
  }
  //当前状态
  liClass = props.index+1 > step? liClass + ' no' : liClass
  //取消订单
  if(step == 5){
    liClass = props.index+1 == 1? liClass : liClass + ' no'
  }
  //售后
  if(props.type == '1'){
    liClass = liClass + ' refund'
    if(props.index==0){
      liClass += ' first'
    }
  }else if(props.type == '2'){
    liClass = liClass + ' reGood'
  }
  return(
    <li className={liClass}>
      <div className='line'></div>
      <div className='item_box'>
        <div className='stp_icon'>
          <i className='fa fa-circle'></i>
        </div>
        <div className='stp_txt'>
          <span>{props.data}</span>
          <br/>
          {
            step == 5&&props.index==0&&
              <span>（已取消）</span>
          }
          {
            step ==6&&props.index==3&&
              <span>(售后)</span>
          }
        </div>
      </div>
    </li>
  )
}
export default Process