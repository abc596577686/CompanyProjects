import React from 'react';
import SearchComponentUI from "../view/index";
import {getGoodsCategoryList,brandList,warehouseList,getBrandCountryList} from '../../../axios/api'
import {baseUrl, ERR_OK} from "../../../axios/config";
export default class SearchComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      filters: [],
      categoryId : null,
      searchTypeId : '1',
      searchValue : '',
      optionsClass : [],
      showMoreBox : false
    }
  }
  componentWillMount(){
    this._getGoodsCategoryList()
    this._brandList()
    this._warehouseList()
    this._getBrandCountryList()
  }
  //切换搜索key值
  _getSearchKey = (e) => {
    console.log(e)
    this.setState({
      searchTypeId : e
    })
  }
  _getSearchValue = (e) => {
    console.log(e)
    this.setState({
      searchValue : e.target.value
    })
  }
  //获取搜索品牌id
  _getCategoryId = (e) =>{
    console.log(e)
    if(e&&e.length>0&&e.length===1){
      this.setState({
        categoryId : e[0],
        cateValue : e
      })
      return
    }
    if(e&&e.length>0&&e.length>1){
      this.setState({
        categoryId : e[1],
        cateValue : e
      })
      return
    }
    this.setState({
      categoryId : null,
    })
  }
  //获取查询参数
  getFilters = () => {
    let filters = [
      {
        key : 'status',
        value : '1'
      },
      {
        key : 'isDelete',
        value : '0'
      },
      {
        key : 'searchTypeId',
        value : this.state.searchTypeId
      },
      {
        key : 'searchValue',
        value : this.state.searchValue
      },
      {
        key : 'categoryId',
        value : this.state.categoryId
      },
      {
        key : 'wareHouseId',
        value : this.state.warehouseId
      },
      {
        key : 'countryId',
        value : this.state.countryId
      },
      {
        key : 'brandId',
        value : this.state.brandId
      },
      
    ]
    filters = filters.filter(item => item.value&&item.value!==undefined)
    return filters
  }
  // 商品分类获取
  _getGoodsCategoryList() {
    getGoodsCategoryList({}, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        let categoryList = res.data.data;
        let optionsClass = [];
        categoryList.map((item, i) => {
          let levelA = {
            value: item.categoryId,
            label: item.name
          };
          if (item.childrenList) {
            levelA['children'] = [];
            item.childrenList.map((innerItem, j) => {
              let levelB = {
                value: innerItem.categoryId,
                label: innerItem.name
              };
              levelA['children'].push(levelB);
            })
          }
          optionsClass.push(levelA);
        });
        this.setState({optionsClass});
      }
    });
  };
  _search_getGoodsList = () => {
    let filters = this.getFilters()
    console.log('--------------',filters)
    this.props.submitSearchEnv(filters)
  }
  resetForm = () => {
    this.setState({
      filters: [],
      categoryId : null,
      searchValue : '',
      brandName : '',
      countryName : '',
      warehouseName : '',
      brandId : '',
      warehouseId : '',
      countryId : '',
      cateValue : []
    })
  }
  changeHideBox = () => {
    this.setState({
      showMoreBox : !this.state.showMoreBox
    })
  }
  //品牌列表
  _brandList =()=>{
    let params = {
      pagesize : '100',
      pageidx : '1'
    }
    brandList(params,'get').then(res => {
      if(res.data.code==='1'){
        this.setState({
          brandList : res.data.data
        })
      }
    })
  }
  //厂库列表
  _warehouseList = () => {
    let params = {
      pagesize : '20',
      pageidx:'1'
    }
    warehouseList(params,'get').then(res => {
      if(res.data.code==='1'){
        this.setState({
          warehouseList : res.data.data
        })
      }
    })
  }
  //国家列表
  _getBrandCountryList =() =>{
    let params ={
      pagesize : '50',
      pageidx: '1'
    }
    getBrandCountryList(params,'get').then(res => {
      if(res.data.code==='1'){
        this.setState({
          countryList : res.data.data
        })
      }
    })
  }
  //品牌改变
  brandChange = (item) => {
    console.log(11111111111111,item)
    this.setState({
      brandId : item.brandId,
      brandName : item.name
    })
  }
  wareChange = (e,a) => {
    console.log(a)
    this.setState({
      warehouseName : a.props.children,
      warehouseId : a.props.value
    })
  }
  areaChange = (e,a) => {
    console.log(a)
    this.setState({
      countryId : a.props.value,
      countryName : a.props.children
    })
  }
  render(){
    return  <SearchComponentUI
      selectCallback = {this._getSearchKey}
      inputCallback = {this._getSearchValue}
      cateIdCallback = {this._getCategoryId}
      searchCallback = {this._search_getGoodsList}
      _changeShowBoxCallBack ={this.changeHideBox}
      addCallback = {this.props._productAdd}
      brandChangeCallback = {this.brandChange}
      areaCallback = {this.areaChange}
      wareCallback ={this.wareChange}
      resetCallback = {this.resetForm}
      optionsClassValue = {this.state.optionsClass}
      searchValue = {this.state.searchValue}
      hideAdd = {this.props.hideAdd}
      showMoreBox = {this.state.showMoreBox}
      brandList ={this.state.brandList}
      warehouseList = {this.state.warehouseList}
      countryList = {this.state.countryList}
      countryName = {this.state.countryName}
      brandName = {this.state.brandName}
      warehouseName={this.state.warehouseName}
      cateValue = {this.state.cateValue}
    />
  }
  
  
}