import React from 'react';
import {Link} from 'react-router-dom'
import './index.less'

import loginlogos from '../../resource/assets/images/dkhs.png';

// const {status} = this.props.status;

export default class LoginHeader extends React.Component {
  componentDidMount() {
    console.log(this.props.status);
    this.setState({
      status: this.props.status
    })
  };

  state = {
    status:'',
  }

  showAction() {
    console.log(this.state.status)
    let showkey = this.state.status
    switch (showkey) {
      case '1':
        return (
          <a>欢迎登录</a>
        );
      case '2':
        return (
          <a>欢迎注册</a>
        );
      case '3':
        return (
          <a>找回密码</a>
        );
    }
  }

  render() {
    // const {mobile} = this.props.userInfo;
    // const {status} = this.props.status;

    return (
      <div className="lg_headerWrap">
        <div className="lg_headerBox clearfix">
          <Link className="lg_logo" to="/">
            <img src={loginlogos}/>
          </Link>
          <span className='line'></span>
          <div className="lg_txt">
            {/* <img src={loginlogos}/> */}
            {this.showAction()}
          </div>
          {/* <Link className="lg_logo" to="/shopping">
            <img src={loginlogok}/>
          </Link> */}
          {/* <span className='titletxt'>欢迎登录</span> */}
          {/* <div className="lg_header_right clearfix"> */}
            {/* <Link className="tag" to="/shopping">智果首页</Link> */}
            {/* <span className="tag">您好{mobile}</span> */}
            {/* <span className="tag welcome">欢迎光临智果</span> */}
            {/* <Link className="tag login" to="/login">登录</Link> */}
          {/* </div> */}
        </div>
      </div>
    )
  }
}
