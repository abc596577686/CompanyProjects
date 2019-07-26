import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../App'
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shopping from "../pages/Shopping";
import NoFound from "../pages/NoFound";
import OrderDetail from "../pages/OrderDetail";
import Order from "../pages/Order";
import Customer from "../pages/Customer";
import Account from "../pages/Account";
import Search from "../pages/Search";
import ConfirmOrder from "../pages/ConfirmOrder";
import Goods from "../pages/Goods";
import Cart from '../pages/Cart'
import Payment from "../pages/Payment";
import PaymentAction from "../pages/PaymentAction";
import Coupon from '../pages/coupon'
import TradHistory from '../pages/TradHistory'
import SetPassword from '../pages/SetPassword'
import Invite from '../pages/InviteOthers'
import Iforget from '../pages/Iforget'
import AfterSale from '../pages/afterSale'
import Batch from '../pages/batch'
import SyncList from '../pages/SyncList'
import ControlCenter from '../pages/ControlCenter'
import BankCard from '../pages/bankCard'

export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/" component={Shopping} exact={true}/>
            <Route path="/index" component={Shopping}/>
            <Route path="/login" component={Login}/>
            <Route path="/goods" component={Goods}/>
            <Route path="/search" component={Search}/>
            <Route path="/register" component={Register}/>
            <Route path="/customer" component={Customer}/>
            <Route path="/account" component={Account}/>
            <Route path="/order" component={Order}/>
            <Route path="/confirmOrder" component={ConfirmOrder}/>
            <Route path="/payment" component={Payment}/>
            <Route path="/paymentaction" component={PaymentAction}/>
            <Route path="/orderDetail" component={OrderDetail}/>
            <Route path="/cart" component={Cart}/>
            <Route path='/coupon' component ={Coupon}/>
            <Route path='/trading' component ={TradHistory}/>
            <Route path='/password' component={SetPassword}/>
            <Route path='/invite' component={Invite}/>
            <Route path='/iforget' component={Iforget}/>
            <Route path='/aftersale' component={AfterSale}/>
            <Route path='/batch' component={Batch}  />
            <Route path='/syncList' component={SyncList}/>
            <Route path='/control' component={ControlCenter}/>
            <Route path='/bankCard' component={BankCard}/>
            <Route component={NoFound}/>
          </Switch>
        </App>
      </Router>
    )
  }
}