import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// 按需加载
import AsyncComponent from '../utils/AsyncLoad/AsyncComponent';
const PCApp = AsyncComponent(() => import("./pc/index/index"));
const PCApps = AsyncComponent(() => import("./pc/business/index"));
const MobileApp = AsyncComponent(() => import("./moblie/index/home/index"));

export default  class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('欢迎来到集客多');
    if (window.location.pathname === '/index') {
      return;
    }
    window.location.href = '/index'
    sessionStorage.setItem('pageidx', 'index');
  }

  render() {
    return (
      <div className="App">
        <MediaQuery query='(min-device-width:1224px)'>
          <Router>
            <Switch>
              <Route path='/index' component={PCApp} exact={true} />
              <Route path='/business' component={PCApps} exact={true}/>
            </Switch>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <Router>
            <Switch>
              <Route path='/index' component={MobileApp} exact={true} />
              {/* <Route path='/index' component={MobileApp} exact={true}/> */}
            </Switch>
          </Router>
        </MediaQuery>
      </div>
    );
  }
}
