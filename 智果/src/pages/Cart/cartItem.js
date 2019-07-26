import React from 'react'
import {_addCart_api,delShoppingCartList} from '../../axios/api'
import {Link} from 'react-router-dom'
import {baseUrl,baseImgUrl} from "../../axios/api";
import {message} from 'antd'
//厂库组件
// export default class StoreItem extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = {
//       data : props.storeProductList,
//       productList : props.storeProductList.productList,
//       someCheck : props.allCheck,
//
//     }
//     // console.log(this.state.someCheck)
//   }
//   componentDidMount(){
//     this.state.productList.forEach((item)=> {
//       item.eveCheck = false
//     })
//   }
//   componentWillReceiveProps(nextProps){
//     // console.log('厂库收到属性了',nextProps.allCheck)
//     let data = this.state.data
//     this.setState({
//       someCheck : nextProps.allCheck
//     })
//     this.state.productList.forEach(item =>{
//       item.eveCheck = nextProps.allCheck
//     })
//   }
//   someCheckEnv = ()=>{
//     // console.log('----------------onchange')
//     this.state.productList.forEach(item =>{
//       item.eveCheck = !this.state.someCheck
//     })
//     this.setState({
//       someCheck : !this.state.someCheck
//     })
//   }
//   eveSubmitEnv = (eveCheck,cartId) => {
//     console.log('事件提交')
//     console.log(eveCheck,cartId)
//     let data = this.state.data
//     let productList = this.state.productList
//     productList.forEach((item)=>{
//       if(item.cartId==cartId){
//         item.eveCheck = eveCheck
//       }
//     })
//     let someCheck = productList.every((item)=>{
//       return item.eveCheck
//     })
//     if(someCheck != this.state.someCheck){
//
//     }
//     this.setState({
//       someCheck : someCheck
//     })
//   }
//   render(){
//     console.log('仓库渲染了',this.state.someCheck)
//     return(
//       <tbody>
//       <tr className='all-check'>
//         <td  colSpan='9'>
//           <div className='check-box'>
//             <label>
//               <input type="checkbox" checked={this.state.someCheck} onChange={this.someCheckEnv}/>
//               <span>{this.state.data.warehouseName}</span>
//             </label>
//           </div>
//         </td>
//       </tr>
//       {this.state.productList.map(item =>{
//         return <CartItem   data={item}
//                            key={item.cartId}
//                            eveSubmit={this.eveSubmitEnv}
//                            someCheck={item.eveCheck}/>
//       })}
//       <tr className='sep-row'><td  colSpan='9'></td></tr>
//       </tbody>
//     )
//   }
// }

//商品组件
export default class CartItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:props.data,
      eveCheck : true,
      showHandleBox: false,
      allCheck : props.allCheck,
      startNum : props.data.productNumber,
      productType : props.data.productType,
      isSoldOut : props.data.isSoldOut
      // isSoldOut : 'true'
      
    }
    console.log('------',this.state)
  }
  componentWillReceiveProps(nextProps,prevProps) {
    console.log('商品收到了新属性')
    console.log('---------------next', nextProps)
    this.setState({
      eveCheck : nextProps.data.eveCheck
    })
    
    
  }
  componentDidMount(){
    this.getProductType()
    
  }
  getProductType = () => {
    let typeName
    if(this.state.productType == '1'){
      typeName = '保税'
    }else if(this.state.productType == '2'){
      typeName = '跨境'
    }else if(this.state.productType == '3'){
      typeName = '直邮'
    }
    this.setState({
      typeName
    })
  }
  eveCheckEnv = () => {
    console.log('eve-----------',this.state.eveCheck)
    if(this.state.isSoldOut === 'true'){
      console.log(this.state.isSoldOut)
      return
    }
    let cartId = this.state.data.cartId
    let warehouseId = this.props.idx
    let eveCheck = this.state.eveCheck
    this.setState((prev)=>({
      eveCheck : !prev.eveCheck
    }),() =>{
      eveCheck = !eveCheck
      this.props.eveSubmit(eveCheck,cartId,warehouseId)
      console.log('--------------',this.state.eveCheck,eveCheck)
    })
  }
  changeNum =(e) => {
    let value = e.target.value
    let data = this.state.data
    data.productNumber = value
    this.props.submitNumber(data.productNumber)
    this.setState({
      data
    },() =>{
      this.props.submitGetPrice()
    })
    if(this.props.isBuyStatus) return
    this._addNumberCart(data,'change')
  
  }
  addNum = () => {
    let data = this.state.data
    console.log('---------',data)
    data.productNumber++
    this.props.submitNumber(data.productNumber)
    if(this.props.isBuyStatus){
      this.setState({
        data
      },() =>{
        this.props.submitGetPrice()
      })
      return
    }
    this._addNumberCart(data)
  }
  delNum =() => {
    let data = this.state.data
    if(data.productNumber>1){
      data.productNumber--
    }
    this.props.submitNumber(data.productNumber)
    if(this.props.isBuyStatus){
      this.setState({
        data
      },() =>{
        this.props.submitGetPrice()
      })
      return
    }
    this._addNumberCart(data)
  
  }
  delEnv =() => {
    this.setState({
      showHandleBox :!this.state.showHandleBox
    })
  }
  confirmEnv = () => {
    if(this.props.isBuyStatus){
      this.props.submitFresh(this.state.data.cartId,this.props.idx)
      return
    }
    let params = {
      cartIds : this.state.data.cartId
    }
    delShoppingCartList(params).then(res => {
      console.log(res)
      if(res.data.code=='1'){
        this.cancelEnv()
        this.props.submitFresh(params.cartIds,this.props.idx)
      }
    })
  }
  cancelEnv = () => {
    console.log(1111)
    this.setState({
      showHandleBox :!this.state.showHandleBox
    })
  
  }
  _addNumberCart =(data) => {
    let params = {
      productId : this.state.data.productId,
      productSpecId : this.state.data.productSpecId,
      quantity : data.productNumber,
      type : '2'
    }
    if(data.productNumber>0){
      _addCart_api(params).then(res => {
        console.log(res)
        if(res.data.code == '0'){
          message.error(res.data.msg)
          let data = this.state.data
          if(this.state.curRealNum){
            data.productNumber = this.state.curRealNum
          }else{
            data.productNumber = this.state.startNum
          }
          this.setState({
            data
          })
        }else if(res.data.code=='1'){
          this.setState({
            data,
            curRealNum : res.data.data.quantity
          })
          console.log('----------',this.state.curRealNum)
          this.props.submitGetPrice()
      
        }
      })
    }
  }
  render(){
    let data = this.state.data
    console.log('商品渲染了',this.state.eveCheck)
    const handleBox = (
      <div className='handleBox'>
        <div className='hand-h'>
          <span>确认删除吗？</span>
        </div>
        <div className='hand-f'>
          <div className='btnBox'>
            <div className='confirm btn' onClick={this.confirmEnv}>确认</div>
            <div className='cancel btn' onClick={this.cancelEnv}>取消</div>
          </div>
        </div>
        <div className='arrow'></div>
      </div>
    )
    
    return(
      <tr className={this.state.isSoldOut==='true'?'goodMain unSale':this.state.eveCheck?'goodMain active':'goodMain'}>
       <td className='check-th'>
         <input type='checkbox'
                onChange={this.eveCheckEnv}
                checked={this.state.eveCheck}/>
         <div className='imgBox'>
           <Link to={`/goods?productId=${this.state.data.productId}`} className='imga'>
             <img src={baseImgUrl+data.imageUrl} alt="" className='goodImg'/>
           </Link>
           {this.state.isSoldOut === 'true'?
             <div className='unSaleLogo'>已下架</div>:null
           }
         </div>
       </td>
       <td className='goodsInfo'>
         <div className='p-goods'>
           <Link to={`/goods?productId=${this.state.data.productId}`}>
             <span>{data.productName}</span>
           </Link>
         </div>
         <div className='p-spec'>
           <span className='s'>{data.productTags}</span>
         </div>
       </td>
       <td className='goods-spec'>
         <div className='s-in'>
           <div className='in-c'>
             <span className='g'>￥{data.price?(data.price-0).toFixed(2):''}</span>
             <br/>
             {
               parseInt(data.tax)?
                 <span className='i'>(税费:￥{(data.tax-0).toFixed(2)?(data.tax-0).toFixed(2):''})</span>
                 :
                 null
             }
             
           </div>
           <span className='dec'>修改</span>
         </div>
       </td>
       <td className='numBox-td'>
         <div className='input-group'>
            <span className='numBox-btn'>
              <button className='btn' onClick={() => this.delNum(this.props.idx)}><i className='fa fa-minus'></i></button>
            </span>
           <input type="tel"  className='numBox' value={this.state.data.productNumber} onInput={this.changeNum} />
           <span className='numBox-btn'>
              <button className='btn'  onClick={this.addNum}><i className='fa fa-plus'></i></button>
            </span>
         </div>
         {/*<span className='stock'>（库存量：{this.state.data.stockNumber}）</span>*/}
       </td>
       <td className='operate'>
         <div className='opratediv'>
           {this.state.showHandleBox && handleBox}
           <a href="javascript:void (0);" className='del' data-id={data.cartId} onClick={this.delEnv}>
             <i>删除</i>
           </a>
         </div>
       </td>
     </tr>
    )
  }
}