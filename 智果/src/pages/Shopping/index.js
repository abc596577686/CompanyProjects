import React from 'react';
import IHeader from '../../components/Header';
import  HomeHeader from '../../components/HomeHeader'
import PageFooter from '../../components/PageFooter'
import HandleBar from '../../components/HandleBar'
import './index.less';
import SearchComponent from '../../components/Search/index'
export default class Shopping extends React.Component{
  state = {
    search : false,
    keyword :'',
    categoryId : '',
    category : '',
    categoryList : [],
    productType : ''
  }
  //设置父组件状态
  initTerm = (type,val) => {
    switch(type){
      case 'key':
        this.setState({
          keyword : val
        })
        break
      case 'cate':
        if(val ===''){
          this.setState({
            category : ''
          })
        }else{
          let now = this.state.categoryList.filter(item => item.categoryId===val)
          this.setState({
            category : now[0]
          })
        }
    }
  }
  searchEnv = (keyword) => {
    console.log('关键词-------',keyword)
    this.setState({
      keyword
    })
  }
  setCategory =(val) => {
    console.log('----------',val)
    this.setState({
      category:val,
      categoryId : val.categoryId
    })
  }
  searchType = (productType) => {
    console.log('商品类型',productType)
    this.setState({
      productType
    })
  }
  freshCart = () => {
    this.setState({
      freshCart : true
    })
  }
  freshHeader = (val) => {
    this.setState({
      freshHeader : val
    })
  }
  getCartDom =(dom) => {
    console.log('cart--------------',dom)
    this.cartDom = dom
  }
  render(){
    return(
      <div className='home-page'>
        <IHeader fresh={this.state.freshHeader}/>
        <HomeHeader triggerSearch={this.searchEnv}
                    submitCate={this.setCategory}
                    data={this.state.categoryList}
                    changeType={this.searchType}
                    keyWordList = {this.state.keyWordList}
                    isHome = {true}
        />
        <SearchComponent
          init={this.initTerm}
          data={this.props}
          keyword = {this.state.keyword}
          productType ={this.state.productType}
          cate ={this.state.category}
          submitFresh={this.freshCart}
          freshHeader={this.freshHeader}
          isHome={true}
          cartDom ={this.cartDom}
        />
        <PageFooter/>
        <HandleBar data={this.state.freshCart} submitCartDom={this.getCartDom} freshUser={this.state.freshHeader}/>
      </div>
    )
  }
}