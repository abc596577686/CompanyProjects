import React from 'react';
import './style/default.less'
import './style/common.less';
import './style/reset.less';
import './resource/assets/css/font-awesome.min.css';
import {LocaleProvider} from 'antd';
import {Link} from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import errorImg from './resource/assets/images/errorPage.png'
//hack
export default class App extends React.Component {
  state = {
    hasError : false
  }
  componentWillMount(){
    window.onerror = function(message, source, lineno, colno, error) {
      console.log('捕获到异常：',{message, source, lineno, colno, error});
      this.setState({
        hasError : true
      })
      return true
   }
   let width = document.documentElement.clientWidth||document.body.clientWidth
   console.log('视口宽度-------------',width)
   if(width<1220){
     let minScreen = width
     localStorage.setItem('__screenWidth__',minScreen)
   }else{
     localStorage.removeItem('__screenWidth__')
   }
  }
  componentDidCatch(err,info){
    console.log('错误发生了',err,info)
    this.setState({
      hasError : true
    })
  }

  render() {
    if(this.state.hasError){
      return (
        <div className='error' style={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div><img className='errorImg' src={errorImg} alt='图片走丢了'></img></div>
            <div style={{textAlign:'center',fontSize:'18px'}}>页面出错了，刷新或返回
            <Link to='/' style={{color:'#e31436',fontSize:'20px'}}>首页</Link>试试吧！
          </div> 
        </div>
      )
    }
    return (
      <div style={{height:'100%'}}>
        <LocaleProvider locale={zhCN}>
          {
            this.props.children
          }
        </LocaleProvider>
      </div>
    )
  }
};