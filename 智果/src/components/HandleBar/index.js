import React from 'react';
import './index.less'
import {baseUrl,baseImgUrl} from "../../axios/api";
import {getShoppingCartList,delShoppingCartList,userProductList,userInfo} from '../../axios/api'
import {Link} from 'react-router-dom'
// import ewm from '../../resource/assets/images/ecode.png'
// import ewm from '../../resource/assets/images/135486654053726882.jpg';
import userImg from '../../resource/assets/images/people.gif'
export default class HandleBar extends React.Component{
  constructor(){
    super()
    this.state = {
      showSlider: false,
      productList : [],
      hadSeeList: [],
      islogin:'',
    }
    this.cart = React.createRef()
  }
  componentDidMount(){
    console.log('购物车dom------',this.cart.current)
    this.props.submitCartDom(this.cart)
    let userInfo = sessionStorage.getItem('__userInfo__')?JSON.parse(sessionStorage.getItem('__userInfo__')):{}
    if(userInfo){
      this.setState({
        userInfo
      })
      this._getShoppingCartList()
    }else{
      this.setState({
        userInfo : ''
      })
    }
    // this.getuserInfo()
  }
  setInfo =()=>{
    let userInfo
    if(window.sessionStorage.getItem('__userInfo__')){
      userInfo = JSON.parse(window.sessionStorage.getItem('__userInfo__'))
    }
    console.log('客户信息',userInfo)
    this.setState({
      userInfo : userInfo||''
    })
    if(userInfo){
      clearInterval(this.timer)
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data == true){
      console.log('next----------------')
      this.props.submitCartDom(this.cart)
      this._getShoppingCartList()
      this._collectProductList()
    }
    if(nextProps.freshUser==='isLogin'){
      // this.getUserInfo()
      if(!sessionStorage.getItem('__userInfo__')){
        this.timer = setInterval(() => {
          console.log('定时任务启动了')
          this.setInfo()
        },1000)
      }else{
        this.setInfo()
      }
    }else if(nextProps.freshUser==='noLogin'){
      this.setState({
        userInfo : ''
      })
    }else{
    
    }
  }
  barEnv =()=>{
    window.scrollTo(0,0)
  }

  getuserInfo=()=> {
    userInfo().then(res => {
      if(res.data.code=='1'){
        this.setState({
          islogin : 1,
          userInfo : res.data.data
        })
        sessionStorage.setItem('__islogin__',1)
        sessionStorage.setItem('__userInfo__',JSON.stringify(res.data.data))
        
      } else {
        this.setState({
          islogin : 0,
          userInfo : ''
        })
        sessionStorage.setItem('__islogin__',0)
      }
    })
  }
  showSlider = (val) => {
    this._userProductList()
    this._collectProductList()
    this.setState({
      curBox : val,
      showSlider : true
    })
  }
  _getShoppingCartList =()=>{
    getShoppingCartList().then(res => {
      let storeList = res.data.data
      let productList = []
      console.log('购物车数据',storeList)
      if(!storeList||storeList.length===0){
        this.setState({
          productList : []
        })
        return
      }
      storeList.forEach(item =>{
        item.productList.forEach(i => {
          productList.push(i)
        })
      })
      this.setState({
        productList
      })
    })
  }
  _userProductList =() => {
    let params = {
      pageidx : 1,
      pagesize : 20,
      type : '0'
    }
    userProductList(params).then(res => {
      if(res.data.code==='1'){
        this.setState({
          watchedList : res.data.data
        })
      }
    })
  }
  _collectProductList =() => {
    let params = {
      pageidx : 1,
      pagesize : 20,
      type : '1'
    }
    userProductList(params).then(res => {
      if(res.data.code==='1'){
        this.setState({
          collectList : res.data.data
        })
      }
    })
  }
  delCart = (val) => {
    let params = {
      cartIds : val
    }
    delShoppingCartList(params).then(res => {
      if(res.data.code==='1'){
        this._getShoppingCartList()
      }else{
      
      }
    })
  }
  render(){
    const openClass = this.state.showSlider?'box-item box-open':'box-item'
    return(
      <div className={this.state.showSlider?'handle-box handle-box-open':'handle-box'}>
        <div className='handleBar'>
          <ul className='quick-top'>
            <li className='clearfix'>
              <a href='javascript:void (0);' className='bar-item'>
                <i className='icon icon1'></i>
                <div className='hide-box abnormal'>
                  <i className='arr-right'></i>
                  <div className='box-info'>
                    { 
                      !this.state.userInfo ?
                        <div className='user-pic'>
                          <img src={this.state.userInfo && this.state.userInfo.headImage ? (baseImgUrl + this.state.userInfo.headImage) : userImg} />
                        </div> 
                      :<Link className='user-pic' to='/control'>
                        <img src={this.state.userInfo && this.state.userInfo.headImage ? (baseImgUrl + this.state.userInfo.headImage) : userImg} />
                      </Link>
                    }
                    {
                      this.state.userInfo?
                        <div className='Logined'>
                          <span>欢迎</span>
                          &nbsp;
                            <span style={{color:'#e31436'}}><div>{this.state.userInfo.fullName}</div></span>
                          
                        </div>
                        :
                        <div className='user-op'>
                          你好！请
                          &nbsp;
                          <Link to='/login' className='log-item'>登录</Link>
                          &nbsp;&nbsp;
                          |
                          &nbsp;
                          <Link to='/register' className='log-item'>注册</Link>
                        </div>
                    }
                  </div>
                </div>
              </a>
            </li>
            {/*<li className='clearfix'>*/}
              {/*<a href='javascript:void (0);'*/}
                 {/*className='bar-item'*/}
                 {/*onClick={() => this.showSlider('coupon')}>*/}
                {/*<i className='icon icon2'></i>*/}
                {/*<div className='hide-box'>*/}
                  {/*<i className='arr-right'></i>*/}
                  {/*<div>领完红包再购物</div>*/}
                {/*</div>*/}
              {/*</a>*/}
            {/*</li>*/}
            <li ref={this.cart}>
              <a href='javascript:void(0);'
                 className='bar-item cart-item'
                 onClick={() => this.showSlider('cart')}>
                <i className='icon icon-cart'></i>
                <div className='name'>购物车</div>
                <div className='cartNum'>{this.state.productList.length}</div>
              </a>
            </li>
            <li className='clearfix'>
              <a href='javascript:void (0);'
                 className='bar-item'
                 onClick={() => this.showSlider('hasWatch')}>
                <i className='icon icon-hasWatch'></i>
                <div className='hide-box'>
                  <i className='arr-right'></i>
                  <div>我看过的</div>
                </div>
              </a>
            </li>
            {/*<li className='clearfix'>*/}
              {/*<a href='javascript:void (0);' className='bar-item'>*/}
                {/*<i className='icon icon-interest'></i>*/}
                {/*<div className='hide-box'>*/}
                  {/*<i className='arr-right'></i>*/}
                  {/*<div>关注的店铺</div>*/}
                {/*</div>*/}
              {/*</a>*/}
            {/*</li>*/}
            <li className='clearfix' onClick={() =>{this.showSlider('collect')}}>
              <a href='javascript:void (0);' className='bar-item'>
                <i className='icon icon-collect'></i>
                <div className='hide-box'>
                  <i className='arr-right'></i>
                  <div>我的收藏</div>
                </div>
              </a>
            </li>
            {/*<li>*/}
            {/*<a href='javascript:void (0);' className='bar-item'>*/}
            {/*<div className='icon icon3'></div>*/}
            {/*<div className='name'>关注我们</div>*/}
            {/*<div className='qrCode'>*/}
            {/*<img src={ewm} className='ewm' alt=""/>*/}
            {/*</div>*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*<a href='javascript:void (0);' className='bar-item' onClick={this.barEnv}>*/}
            {/*<div className='icon icon4'></div>*/}
            {/*<div className='name'>去顶部</div>*/}
            {/*</a>*/}
            {/*</li>*/}
          </ul>
        </div>
        <div className='right-handBox'>
          <div className={this.state.curBox==='collect'?openClass+' zIdx':openClass}>
            <div className='box-header'>
              <span className='title'>
                <i className='icon-sliderBar icon-coupon'></i>
                <em className='title-info'>收藏</em>
              </span>
              <span className='icon-del' onClick={() => {this.setState({showSlider : false})}}>
              </span>
            </div>
            <div className='box-main'>
             <div className='collect'>
               {
                 this.state.collectList&&this.state.collectList.length>0&&
                 this.state.collectList.map((item,index) => {
                   return(
                     <div className="w-item" key={index}>
                       <Link to={`/goods?productId=${item.productId}`} className='good-item'>
                         <img src={baseImgUrl+item.imagePath} alt=""/>
                         <p className='price'>{item.price}</p>
                       </Link>
                     </div>
                   )
                 })
               }
             </div>
            </div>
          </div>
          <div className={this.state.curBox==='cart'?openClass+' zIdx':openClass}>
            <div className='box-header'>
              <span className='title'>
                <i className='icon-sliderBar icon-cart'></i>
                <em className='title-info'>购物车</em>
              </span>
              <span className='icon-del' onClick={() => {this.setState({showSlider : false})}}>
              </span>
            </div>
            <div className='box-main'>
              {
                this.state.productList.map((item,index) => {
                  return(
                    <div className="item-good">
                      <span className='p-img'>
                        <img className='imgInfo' alt="" src={baseImgUrl+item.imageUrl}/>
                      </span>
                      <div className='right-item'>
                        <Link to={`goods?productId=${item.productId}`}>
                          <div className='p-name'>{item.productName}</div>
                          <div className='p-tag'>{item.productTags}</div>
                        </Link>
                        <div className='p-price'>
                          <span className='i'>{item.price}</span>X<span className='g'>{item.productNumber}</span>
                          <span className='del' onClick={() => this.delCart(item.cartId)}>删除</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              {
                this.state.productList.length>0?
                  <Link to='cart'>
                    <div className='toCart'>
                      去购物车结算
                    </div>
                  </Link>
                  :null
              }
  
            </div>
          </div>
          <div className={this.state.curBox==='hasWatch'?openClass+' zIdx':openClass}>
            <div className='box-header'>
              <span className='title'>
                <i className='icon-sliderBar icon-watch'></i>
                <em className='title-info'>我看过的</em>
              </span>
              <span className='icon-del' onClick={() => {this.setState({showSlider : false})}}>
              </span>
            </div>
            <div className='box-main'>
              <div className='watched'>
                {
                  this.state.watchedList&&this.state.watchedList.length>0&&
                  this.state.watchedList.map((item,index) => {
                    return(
                      <div className="w-item" key={index}>
                        <Link to={`/goods?productId=${item.productId}`} className='good-item'>
                          <img src={baseImgUrl+item.imagePath} alt=""/>
                          <p className='price'>{item.price}</p>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
  
}