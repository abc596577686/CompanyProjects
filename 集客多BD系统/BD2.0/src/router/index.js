import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../App';
import MediaQuery from 'react-responsive';
import Admin from '../admin';

// import Admin from '../admin';
// import Home from '../pages/Home';
// import Login from "../pages/Login";
// 按需加载
import AsyncComponent from '../utils/AsyncComponent';

// pc端页面
import bdPCMode from "../pages/pcPages/pcindex"
import pclogin from "../pages/pcPages/login"
import user from "../pages/pcPages/userlist"
import list from "../pages/pcPages/channelList"
import groundPromotion from "../pages/pcPages/groundPromotion/list"
import conversion from "../pages/pcPages/conversion/list"
import allocation from "../pages/pcPages/allocation"
import transform from "../pages/pcPages/transform"
import visitHistory from '../pages/pcPages/visitHistory'
import performance from '../pages/pcPages/performance'
import resource from '../pages/pcPages/resource'
import resources from '../pages/pcPages/resources'
import commodityRebates from '../pages/pcPages/commodityRebates'
import applyDockRecord from '../pages/pcPages/applyDockRecord'
import applyDockList from '../pages/pcPages/applyDockList'

// 移动端页面
import bdMobileMode from "../pages/webPages/mobileindex"
import webLogin from "../pages/webPages/login"
import userCenter from '../pages/webPages/userCenter'
import userInfo from '../pages/webPages/userCenter/userInfo'
import clientList from '../pages/webPages/userCenter/clientList'
import performanceList from '../pages/webPages/userCenter/performanceList'
import visitList from '../pages/webPages/userCenter/visitList'
import visitListAdd from '../pages/webPages/userCenter/visitList/addVisit'
import issueRecord from '../pages/webPages/userCenter/issueRecord'
import applyRecord from '../pages/webPages/userCenter/applyRecord'
import rebates from '../pages/webPages/userCenter/rebates'


import NoFound from '../pages/NoFound'
// const NoFound = AsyncComponent(() => import("../pages/NoFound"));

export default class ERouter extends React.Component {
  render() {
    return (
      <div className="superBdSystem">
        {/* PC版本BD */}
        <MediaQuery query='(min-device-width:1224px)'>
          <Router>
            <App>
              <Switch>
                <Route path="/login" component={pclogin}/>
                <Route path="/" render={() =>
                  <Admin>
                    <Switch>
                      <Route path="/index" component={bdPCMode} exact={true}/>
                      <Route path="/channel/list" component={list} exact={true}/>
                      <Route path="/channel/user" component={user} exact={true} />
                      <Route path="/groundPromotion/list" component={groundPromotion} exact={true} />
                      <Route path="/conversion/list" component={conversion} exact={true} />
                      <Route path="/teams/information" component={allocation} exact={true} />
                      <Route path="/transform/list" component={transform} exact={true}/>
                      <Route path="/visit/list" component={visitHistory} exact={true} />
                      <Route path="/performance/list" component={performance} exact={true} />
                      <Route path="/resource" component={resource} exact={true} />
                      <Route path="/resources" component={resources} exact={true} />
                      <Route path="/commodityRebates" component={commodityRebates} exact={true} />
                      <Route path="/applyDockRecord" component={applyDockRecord} exact={true} />
                      <Route path="/applyDockList" component={applyDockList} exact={true} />
                      <Route component={NoFound}/>
                    </Switch>
                  </Admin>
                }/>
              </Switch>
            </App>
          </Router>
        </MediaQuery>
        {/* 移动端版本BD */}
        <MediaQuery query='(max-device-width:1224px)'>
          <Router>
            <App>
              <Switch>
                <Route path="/login" component={webLogin}/>
                <Route path="/" render={() =>
                  <Switch>
                    <Route path="/index" component={bdMobileMode} exact={true} />
                    <Route path="/userCenter" component={userCenter} exact={true} />
                    <Route path="/userCenter/userInfo" component={userInfo} exact={true} />
                    <Route path="/userCenter/clientList" component={clientList} exact={true} />
                    <Route path="/userCenter/performanceList" component={performanceList} exact={true} />
                    <Route path="/userCenter/visitList" component={visitList} exact={true} />
                    <Route path="/userCenter/visitList/addVisit" component={visitListAdd} exact={true} />
                    <Route path="/userCenter/issueRecord" component={issueRecord} exact={true} />
                    <Route path="/userCenter/applyRecord" component={applyRecord} exact={true} />
                    <Route path="/userCenter/rebates" component={rebates} exact={true} />
                    <Route component={NoFound}/>
                  </Switch>
                }/>
              </Switch>
            </App>
          </Router>
        </MediaQuery>
      </div>
    )
  }
}
