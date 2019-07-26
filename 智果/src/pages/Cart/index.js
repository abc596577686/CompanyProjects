import React from 'react';
import Header from '../../components/Header'
import HomeHeader from '../../components/HomeHeader'
import PageFooter from '../../components/PageFooter'
import {Link} from 'react-router-dom'
import {getValForKey} from '../../utils/utils'
import {Spin,Modal,Tabs } from 'antd'
import './index.less'
// import cartList from './cartList'
import {message} from 'antd'
import CartItem from './cartItem'
import ShowList from '../../components/ShowList'
import SessionList from '../../components/SessionList'
import { getShoppingCartList, buyShopoingGood, delShoppingCartList,checkBuy } from '../../axios/api'

const TabPane = Tabs.TabPane;
//购物车头部
function BoxTitle(props){
  return(
    <ul className='clearfix topHead'>
      <li className='t-item t-active'>
        <a href="javascript:;" className='t-active'>
          全部商品({props.num})
        </a>
      </li>
    </ul>
  )
}
//购物车主体
class CartTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      storeList : [],
      data : {},
      totalPrice : '0.00',
      totalCount:'0',
      fixed : true,
      loadOver:false,
      allCheck : true
    }
  }
  componentDidMount(){
    let isBuyStatus = window.location.search.length>0?true:false
    if(isBuyStatus){
      let productId = getValForKey(window.location.search)
      let local = this.props.local
      let buyInfo = local.location.state
      console.log('------------------',productId,buyInfo)
      this.setState({
        loadOver : true,
      })
      let storeList = [
        {
          warehouseName : buyInfo.wareHouseName,
          warehouseId : buyInfo.wareHouseId,
          someCheck : true,
          productList : [
            {
              imageUrl : buyInfo.imagePath,
              price : buyInfo.price,
              productName : buyInfo.productName,
              productNumber : buyInfo.quantity,
              productSpecId : buyInfo.productSpecId,
              productType : buyInfo.productType,
              productTags : buyInfo.productTags,
              eveCheck : true,
              isSoldOut:'false',
              cartId : 0,
              tax : buyInfo.paymentTax,
              productId
            }
          ]
        }
      ]
      this.setState({
        storeList,
        isBuyStatus,
        buyInfo,
        buyProductId : productId,
        buyNumber : buyInfo.quantity
      },() => {
        this.setFooterBar()
        this.getGoodCount()
        this.getTotalPrice()
      })
    }else{
      this._getShoppingCartList()
    }
    
  }

  callback(key) {
    window.sessionStorage.setItem('__checktype__',key)
  }

  
  _getShoppingCartList =()=>{
    getShoppingCartList().then(res => {
      let storeList = res.data.data
      this.setState({
        loadOver : true
      })
      console.log('购物车数据',storeList)
      if(!storeList||storeList.length===0){
        this.setState({
          storeList : []
        },() =>{
          this.getAllCount()
          this.setFooterBar()
          this.getGoodCount()
          this.getTotalPrice()
        })
        return
      }
      storeList.forEach(item =>{
        item.someCheck = true
        item.productList.forEach(i => {
          i.eveCheck = true
        })
      })
        this.setState({
          storeList
        },() => {
          this.setFooterBar()
          this.getGoodCount()
          this.getTotalPrice()
        })
    })
  }
  setFooterBar = () => {
    console.log(111)
      if(this.refs.footBar===undefined||this.refs.start===undefined) return
      let footBar = this.refs.footBar
      let startHeight = this.refs.start.offsetTop
    
      let topHeight = footBar.offsetTop - startHeight
      console.log('距顶部---------',footBar,topHeight)
      if(topHeight <= 0){
      this.setState({
        fixed : false
      })
      }
      window.addEventListener('scroll',() => {
        this.handleScroll(topHeight)
      })
  }
  handleScroll(topHeight) {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    console.log('滚动高度----------',scrollTop);
    
    if (scrollTop >= topHeight) {
      console.log('nofixed');
      this.setState({
        fixed : false
      })
    } else {
      this.setState({
        fixed : true
      })
    }
  };
  allCheckEnv = () => {
    let storeList = this.state.storeList
    let allCheck = !this.state.allCheck
    storeList.forEach(i => {
      i.someCheck = allCheck
      i.productList.forEach(item => {
        if(item.isSoldOut === 'false'){
          item.eveCheck = allCheck
        }
      })
    })
   
    this.setState(prev => ({
      allCheck : !prev.allCheck,
      storeList
    }))
    this.getTotalPrice()
    this.getGoodCount()
  }
  //检查是否全选
  watchAllCheck = () => {
    let allExitGoodsLen = 0,checkGoodsLen = 0
    let storeList = this.state.storeList
    storeList.forEach(item => {
      item.productList.forEach(i => {
        if(i.isSoldOut === 'false'){
          allExitGoodsLen++
        }
        if(i.eveCheck){
          checkGoodsLen++
        }
      })
    })
    let isAllCheck = allExitGoodsLen == checkGoodsLen? true : false
    this.setState({
      allCheck : isAllCheck
    })
  }
  someCheckEnv = (warehouseId) => {
    let storeList = this.state.storeList
    console.log('someCheckEnv-----------',warehouseId)
    storeList.forEach(item => {
      if(item.warehouseId === warehouseId){
        let someCheck = item.someCheck
        item.someCheck = !someCheck
        item.productList.forEach(item => {
          if(item.isSoldOut === 'false'){
            item.eveCheck = !someCheck
          }
        })
      }
    })
    this.setState({
      storeList
    },() => {
      this.getTotalPrice()
      this.getGoodCount()
      this.watchAllCheck()
      
    })
  }
  eveSubmitEnv = (eveCheck,cartId,warehouseId) => {
    console.log('事件提交')
    console.log(eveCheck,cartId,warehouseId)
    let storeList = this.state.storeList
    storeList.forEach(item => {
      if(item.warehouseId === warehouseId){
        item.productList.forEach(i => {
          if(i.cartId===cartId){
            i.eveCheck = eveCheck
          }
        })
      }
    })
    storeList.forEach(item => {
      if(item.warehouseId === warehouseId){
        item.someCheck = item.productList.every(i => {
          return i.eveCheck
        })
      }
    })
    this.setState({
      storeList
    })
    this.getTotalPrice()
    this.getGoodCount()
    this.watchAllCheck()
  }
  //刷新价格
  freshPrice =() => {
    this.getTotalPrice()
  }
  getTotalPrice = () => {
    let storeList = this.state.storeList
    let totalPrice = 0
    if(storeList&& storeList.length>0){
      storeList.forEach(i => {
        i.productList.forEach(item => {
          if(item.eveCheck){
            totalPrice += item.productNumber*((item.price-0)+(item.tax-0))
          }
        })
        })
    }
    this.setState({
      totalPrice : totalPrice.toFixed(2)
    })
  }
  getCartIds =() => {
    let storeList = this.state.storeList
    let cartIds = []
    if(!storeList||storeList.length===0) return cartIds
    storeList.forEach(item => {
          item.productList.forEach(i => {
            if (i.eveCheck){
              cartIds.push(i.cartId)
            }
          })
        })
    console.log('----------', cartIds)
    cartIds = cartIds.join()
    return cartIds
  }
  getGoodCount =() => {
    let storeList = this.state.storeList
    let totalCount = 0
    storeList.forEach(item => {
      item.productList.forEach(i => {
        if (i.eveCheck) {
          totalCount++
        }
      })
      })
    this.setState({
      totalCount,
    })
  }
  getAllCount = () => {
    let allCountLen = 0
    let storeList = this.state.storeList
    if(storeList&&storeList.length>0){
      storeList.forEach(i => {
        i.productList.forEach(item => {
          allCountLen ++
        })
        
      })
    }
    this.setState({
      totalNum : allCountLen
    })
    console.log('total------------',allCountLen)
   
  }
  freshList = (cartIds,warehouseId) => {
    let storeList = this.state.storeList
    storeList.forEach((item,index) => {
        if(warehouseId === item.warehouseId){
          item.productList.forEach((i,idx) => {
            if(i.cartId == cartIds){
              item.productList.splice(idx,1)
              if(item.productList.length===0){
                storeList.splice(index,1)
              }
            }
          })
        }
      })
    this.setState({
      storeList
    },() => {
      console.log('------------',storeList)
      this.getTotalPrice()
      this.getGoodCount()
      this.setFooterBar()
      this.getAllCount()
    })
    
  }
  toBuy = () => {
    let cartIds = this.getCartIds()
    if(cartIds.length=='0'){
      message.error('请选择商品')
      return
    }
    if(this.state.isBuyStatus){
      //直接购买
      let buyInfo = this.state.buyInfo
      let params = {
        productId : this.state.buyProductId,
        productSpecId : buyInfo.productSpecId,
        quantity : this.state.buyNumber
      }
      checkBuy(params).then(res => {
        if(res.data.code=='0'){
          message.error(res.data.msg)
        }else{
          this.props.local.history.push({
            pathname : '/confirmOrder',
            search : `?productId=${this.state.buyProductId}`,
            state : {
              productSpecId : buyInfo.productSpecId,
              specName : buyInfo.productTags,
              postType : '0',
              productType : buyInfo.productType,
              quantity : this.state.buyNumber,
            }
          })
        }
      })
    }else{
      //购物车结算
      let params = {
        cartIds : cartIds
      }
      buyShopoingGood(params).then(res => {
        console.log(res)
        if(res.data.code=='1'){
          this.props.submitSkipEnv(cartIds)
        }else{
          message.error(res.data.msg)
        }
      })
    }
  }
  showConfirm =()=>{
    let cartIds = this.getCartIds()
    if(cartIds.length===0){
      message.error('请选择要删除的商品')
      return
    }
    let that = this
    Modal.confirm({
      title: '温馨提示',
      content: '确认删除已选中的商品?',
      onOk () {
        that.someDel(cartIds)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  someDel = (cartIds) =>{
    let params = {
      cartIds
    }
    delShoppingCartList(params).then(res => {
      console.log(res)
      if(res.data.code=='1'){
       this._getShoppingCartList()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  //直接购买的数量
  getBuyNum = (num) => {
    this.setState({
      buyNumber : num
    })
  }
  render(){
    return(
       <Spin spinning={!this.state.loadOver}>
         {
           this.state.totalNum === 0?
             <div className='emptyCart'>
               <div className='em-content'>
                <span className='icon-cart'></span>
                  <span className='info'>
                    进货单里空空如也，赶紧
                    <Link to='/' className='goShopping'>&nbsp;去逛逛吧 >></Link>
                  </span></div>
            </div>: <div className='tableBox'>
                {
                 this.state.loadOver&&
                 <div>
                   <table className='table'>
                     <thead>
                     <tr>
                       <th className='check-th'>
                         <div className='check-box fl'>
                         <input type="checkbox" onChange={this.allCheckEnv} checked={this.state.allCheck}/>
                         <label className='labeler' style={{fontSize:'12px'}}>全选</label>
                         </div>
                       </th>
                       <th className='cart-th text-left'>商品信息</th>
                       <th className='cart-th'>单价</th>
                       <th className='cart-th'>购买数量</th>
                       <th className='cart-th'>操作</th>
                     </tr>
                     </thead>
                     {
                       this.state.storeList&&this.state.storeList.length>0&&
                       this.state.storeList.map((item,index) => {
                         return(
                           <tbody>
                           <tr className='all-check'>
                             <td  colSpan='9'>
                               <div className='check-box'>
                                 <label>
                                   <input type="checkbox"
                                          checked={item.someCheck}
                                          onChange={() => this.someCheckEnv(item.warehouseId)}
                                          style={{marginRight:'5px'}}
                                   />
                                   <span>{item.warehouseName}</span>
                                 </label>
                               </div>
                             </td>
                           </tr>
                           {
                             item.productList.map((i,idx) => <CartItem  data={i}
                                                                        key={i.cartId}
                                                                        idx ={item.warehouseId}
                                                                        eveSubmit={this.eveSubmitEnv}
                                                                        submitFresh ={this.freshList}
                                                                        submitGetPrice ={this.freshPrice}
                                                                        isBuyStatus ={this.state.isBuyStatus}
                                                                        submitNumber = {this.getBuyNum}
                             />)
                           }
                           </tbody>
                         )
                       })
                     }
                   </table>
                   <div className='tags' ref='footBar'></div>
                   <div className={this.state.fixed?'footerBar fix' : 'footerBar'} ref='start'>
                   {/*<div className={'footerBar'} ref='start'>*/}
                     <div className='left'>
                       {/*<input type="checkbox" onChange={this.allCheckEnv} checked={this.state.allCheck}/>*/}
                       {/*<label className='labeler'>全选</label>*/}
                       <Link to='/' className='goHome'>继续浏览</Link>
                       {
                         !this.state.isBuyStatus&&
                         <span className='someDel' onClick={this.showConfirm}>批量删除</span>
                       }
                     </div>
                     <div className='right'>
                       <div style={{fontSize : '14px',marginRight:'10px'}}>已选中<span style={{color : '#e31436',fontWeight:'700'}}>{this.state.totalCount}</span>件商品</div>
                       <span>总价（含税费）：</span>
                       <span className='price'>￥{this.state.totalPrice}</span>
                       <div className='btn_buy' onClick={this.toBuy}>去结算</div>
                     </div>
                   </div>
                </div>
              }
              
             </div>
         }
       </Spin>
    )
  }
}
export default  class Cart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      totalNum : 1
    }
  }
  componentWillMount(){
    window.scrollTo(0,0)
  }
  submitEnv = (value) => {
    console.log('-----','总数',value)
    this.setState({
      totalNum : value
    })
    
  }
  skipToConfirmPage = (cartIds) => {
    this.props.history.push({
      pathname :'/confirmOrder',
      state : {
        cartIds : cartIds,
        postType : '1'
      }
      
    })
  }
  loadOver =(val)=>{
    this.setState({
      loadOver : val
    })
  }
  render() {
    return (
      <div className="cart-container">
        <Header/>
          <div className='cartBox'>
            <HomeHeader isHome={false} isBuyStatus={true} buyStatus={0}/>
            <div className='box-content'>
              <CartTable submitCount={this.submitEnv}
                         submitSkipEnv={this.skipToConfirmPage}
                         submitLoadOver ={this.loadOver}
                         local ={this.props}
              />
            </div>
            <SessionList/>
          </div>
        }
        {/*{*/}
          {/*this.state.totalNum === 0 ?*/}
            {/*<div className='emptyCart'>*/}
              {/*<HomeHeader isHome={false}/>*/}
              {/*<div className='em-content'>*/}
                {/*<span className='icon-cart'></span>*/}
                {/*<span className='info'>*/}
                  {/*进货单里空空如也，赶紧*/}
                  {/*<Link to='/shopping' className='goShopping'>&nbsp;去逛逛吧 >></Link>*/}
                {/*</span>*/}
              {/*</div>*/}
            {/*</div> : null*/}
        {/*}*/}
        <PageFooter/>
      </div>
    )
  }
}

