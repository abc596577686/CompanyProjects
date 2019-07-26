import React from 'react';
import noImg from '../../resource/assets/images/404Page.jpg'
import {Link} from 'react-router-dom'
export default class NoFound extends React.Component {
  render() {
    return (
      <div style={{textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <div style={{borderRadius:'50%',height:'400px',width:'400px',overflow:'hidden',position:'relative'}}>
          <img src={noImg} alt='加载失败' 
          style={{width:'500px',height:'500px',position:'absolute',
          left:'50%',bottom:'50%',marginLeft:'-250px',marginBottom:'-250px'}}></img>
        </div>
        <div>您访问的的页面不存在！<Link to='/'><span  style={{color:'#fc6921',fontSize:'18px'}}>返回首页</span></Link></div>
      </div>
    )
  }
}