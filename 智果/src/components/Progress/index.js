
import React from 'react'
import './index.less'
function ProcessItem(props) {
  let step = props.step-0
  let liClass
  console.log('进度--------------',props.step)
  if(props.index==0){
    liClass = 'frist_li step_li'
  }else if(props.index==props.length-1){
    liClass = 'last_li step_li'
  }else{
    liClass='step_li'
  }
  //当前状态
  let divClass = props.index>step? 'itemBox':'itemBox item-done'
  return(
    <li className={liClass}>
      <div className={divClass}>
       <div className='step-name'>{props.data}</div>
        <div className='step-no'>
          <span className='num'>{props.index+1}</span>
        </div>
      </div>
    </li>
  )
}
export default ProcessItem