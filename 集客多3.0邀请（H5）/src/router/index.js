import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../App';
import MediaQuery from 'react-responsive';
import Admin from '../admin';

// import Admin from '../admin';
// import Home from '../pages/Home';
// import Login from "../pages/Login";

// pc端页面
import NoFound from "../pages/NoFound"

// 移动端页面
// import bdMobileMode from "../pages/webPages/mobileindex"
import invite from "../pages/invite"
import registersuccess from "../pages/registerSuccess"
import readyRegister from "../pages/readyRegister"
import pageDueError from "../pages/pageDueError"
import NoPage from "../pages/NoPage"

export default class ERouter extends React.Component {
  render() {
    return (
      <div className="superH5System">
        {/* 移动端页面 */}
        <MediaQuery query='(max-device-width:1224px)'>
          <Router>
            <App>
              <Switch>
                {/* <Route path="/login" component={webLogin}/> */}
                <Route path="/" render={() =>
                  <Switch>
                    {/* 方便启动直接查看 上线后移除/ */}
                    <Route path="/wepage/" component={invite} exact={true} />   
                    {/* 项目邀请页 */}
                    <Route path="/wepage/register" component={invite} exact={true} />
                    {/* 注册成功页 */}
                    <Route path="/wepage/code" component={registersuccess} exact={true} />
                    {/* 已经注册过了 */}
                    <Route path="/wepage/inDownload" component={readyRegister} exact={true} />
                    {/* 邀请链接失效 */}
                    <Route path="/wepage/pageDueError" component={pageDueError} exact={true} />
                    {/* <Route component={NoPage}/> */}
                    <Route component={NoPage}/>
                  </Switch>
                } />
              </Switch>
            </App>
          </Router>
        </MediaQuery>
        {/* PC版本方式 */}
        <MediaQuery query='(min-device-width:1224px)'>
          <Router>
            <App>
              <Switch>
                {/* 只在移动端查看 */}
                <Route component={NoFound}/>
              </Switch>
            </App>
          </Router>
        </MediaQuery>
      </div>
    )
  }
}
