import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../App';
import Admin from '../admin';
import Home from '../pages/Home';
import NoFound from "../pages/NoFound";
import Login from "../pages/Login";

// 供应链管理
import Product from "../pages/Manager/Product";
import Brand from "../pages/Manager/Brand";
import Stock from "../pages/Manager/Stock";
import Category from "../pages/Manager/Category";
// 分销市场管理
import MarketProduct from "../pages/Market/Product";
import SyncOrderList from "../pages/Market/SyncOrderList";
import SyncExpress from "../pages/Market/SyncExpress";
import MarketUser from "../pages/Market/User";
//订单管理
import AllOrder from "../pages/Order/AllOrder";
import WareHouse from "../pages/WareHouse";
import PostageTpl from "../pages/PostageTpl";
import SyncStatus from "../pages/Order/SyncStatus";
import SyncStatusRecord from "../pages/Order/SyncStatusRecord";
import CustomsRecord from "../pages/Order/customsRecord";
import OrderDetail from "../pages/Order/OrderDetail";
import CustomerOrder from "../pages/Order/CustomerOrder";
import InterceptOrder from '../pages/Order/InterceptOrder'
import Refund from '../pages/Order/Refund'
import WaitPay from '../pages/Order/WaitPay'
// import PaymentNotify from "../pages/Order/PaymentNotify";
import AccountSetting from "../pages/AccountSetting";
import Custom from "../pages/Custom";
import Dispatch from "../pages/Dispatch";
import Intro from "../pages/Intro";
import Setting from "../pages/Setting";
import Question from "../pages/Question";
import PurchaseDoubt from "../pages/PurchaseDoubt";
import Answer from "../pages/Answer";
import Assembly from "../pages/Assembly";
import GiftPack from "../pages/GiftPack";
import Intercept from "../pages/Intercept";
import Examine from "../pages/Examine";
import ErpPush from "../pages/ErpPush";
import ErpWareHouse from "../pages/ErpWareHouse";
import Completed from "../pages/Completed";
import RefundOrder from "../pages/RefundOrder";
import ClosedOrder from "../pages/ClosedOrder";
import ProfitRecord from "../pages/ProfitRecord";
import AbnormalOrder from "../pages/AbnormalOrder";
import RefundRecord from "../pages/RefundRecord";
import RefundRefuse from "../pages/RefundRefuse";
import RefundAgree from "../pages/RefundAgree";
import RefundReceipt from "../pages/RefundReceipt";
import RefundComplete from "../pages/RefundComplete";
import RefundManagerCheck from "../pages/RefundManagerCheck";
import RefundTimeout from "../pages/RefundTimeout";
import RefundFicanceCheck from "../pages/RefundFicanceCheck";
import RefundReject from "../pages/RefundReject";
// import CustomerManager from '../pages/CustomerManager'
//权限管理
import MenuManage from '../pages/authority/menuManage'
import Permission from '../pages/authority/permission'
import UserList from '../pages/authority/userList'
import superAdmin from '../pages/authority/superAdmin'
import role from '../pages/authority/role'
import resource from '../pages/authority/resource'
// 海关信息
import info from '../pages/Customs/information'

export default class ERouter extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" render={() =>
              <Admin>
                <Switch>
                  {/* 供应链管理 */}
                  <Route path="/" component={Home} exact={true}/>
                  <Route path="/home" component={Home}/>
                  <Route path="/Manager/product" component={Product} exact={true}/>
                  <Route path="/Manager/stock" component={Stock} exact={true}/>
                  <Route path="/Manager/brand" component={Brand} exact={true}/>
                  <Route path="/Manager/category" component={Category} exact={true}/>
                  <Route path="/orderManager/allOrder" component={AllOrder} exact={true}/>
                  <Route path="/orderManager/allOrder/orderDetail" component={OrderDetail} exact={true}/>
                  <Route path="/orderManager/customerOrder/orderDetail" component={OrderDetail} exact={true}/>
                  <Route path="/orderManager/customerOrder" component={CustomerOrder} exact={true}/>
                  <Route path="/orderManager/InterceptOrder" component={InterceptOrder} exact={true} />
                  <Route path="/orderManager/Refund" component={Refund} exact={true} />
                  <Route path="/orderManager/WaitPay" component={WaitPay} exact={true}/>
                  <Route path="/orderManager/syncRecord/syncStatusRecord" component={SyncStatusRecord} exact={true}/>
                  <Route path="/orderManager/syncRecord/syncStatus" component={SyncStatus} exact={true}/>
                  <Route path="/orderManager/syncRecord/customsRecord" component={CustomsRecord} exact={true}/>
                  {/*<Route path="/orderManager/syncRecord/paymentNotify" component={PaymentNotify} exact={true}/>*/}
                  <Route path="/dispatchManager/wareHouse" component={WareHouse} exact={true}/>
                  <Route path="/dispatchManager/postageTpl" component={PostageTpl} exact={true}/>
                  <Route path="/accountSetting" component={AccountSetting}/>
                  {/* 分销市场 */}
                  <Route path="/Market/product" component={MarketProduct} exact={true}/>
                  <Route path="/Market/user" component={MarketUser} exact={true}/>
                  <Route path="/Market/sync/syncOrderList" component={SyncOrderList} exact={true}/>
                  <Route path="/Market/sync/syncexpress" component={SyncExpress} exact={true}/>
                  {/*权限设置*/}
                  <Route path="/authority/menuManage" component={MenuManage} exact={true}/>
                  <Route path="/authority/permission" component={Permission} exact={true}/>
                  <Route path="/authority/userList" component={UserList} exact={true}/>
                  <Route path="/authority/superAdmin" component={superAdmin} exact={true} />
                  <Route path="/authority/role" component={role} exact={true} />
                  <Route path="/authority/resource" component={resource} exact={true} />
                  {/* 海关信息 */}
                  <Route path="/Customs/information" component={info} exact={true} />
                  <Route component={NoFound}/>
                </Switch>
              </Admin>
            }/>
          </Switch>
        </App>
      </Router>
    )
  }
}