import React from 'react';
import IHeader from '../../components/Header';
import HomeHeader from '../../components/HomeHeader'
import './index.less';
import SearchComponent from '../../components/Search/index'
import PageFooter from '../../components/PageFooter/index'
export default class Search extends React.Component{
  state = {
    search : false,
    keyword :'',
  }
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
        break
    }
  }
  searchEnv = (keyword) => {
    console.log('关键词-------',keyword)
    this.setState({
      keyword
    })
  }
  render(){
    return(
      <div className='search_container'>
        <IHeader/>
        <HomeHeader triggerSearch={this.searchEnv}
                    changeType={this.searchType}
                    isHome = {true}
        />
        <SearchComponent
          init={this.initTerm}
          data={this.props}
          keyword = {this.state.keyword}
          isHome = {false}
        />
        <PageFooter></PageFooter>
      </div>
    )
  }
}