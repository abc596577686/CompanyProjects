import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {getCookie, getValForKey} from '../../utils/utils';
import './index.less';
import {Pagination,Spin,Card,Modal,message} from 'antd';
import {getGoodsList_api,getBrandCategoryList_api,
        saveCollect,delCollect,
        getProductSpecList,checkBuy,_addCart_api} from '../../axios/api'
import {ERR_OK} from "../../axios/config";
import {baseUrl, baseImgUrl} from '../../axios/api'
// import Loading from "../Loading/index";
export default class SearchComponent extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    isLogin: false,
    isOpen: false,
    brandEleHeight: '70px',
    priceLow: '',
    priceHigh: '',
    isCheckedA: false,
    isCheckedB: false,
    isFilter: false,
    keyword: '',
    categoryList: null, //分类列表
    curCategoryIndex: 0, //当前分类索引
    curCategoryId: '', //当前分类ID
    curCategoryName: '', //当前分类名字
    firstCategoryId: '', //一级分类ID
    secondCategoryId: '', //二级分类ID
    brandList: [], //品牌列表
    curBrandIndex: 0, //当前品牌索引
    curBrandId: '', // 当前品牌ID
    curBrandName: '', // 当前品牌名字
    sort: '', // 排序类型  1：销量 2：价格
    sortTypeCount: 1, // 排序顺序  1：升序 2：降序
    sortTypePrice: 1, // 排序顺序  1：升序 2：降序
    productType: '', // 产品类型 默认0:全部类型, 1:国内, 2:保税仓,跨境, 3:直邮
    selectCount: false,
    selectPrice: false,
    goodsList: [], //商品列表
    defaultCurrent: 1,  //默认第一页
    currentPage: 1,  //当前第几页
    pageSize: '40',  //每页条数
    dataTotal: 0, //总条数
    pageSizeOptions: ['20', '40','60'],
    showLoading : true,
    search : false,
  //  商品规格选择
    productSpecList : [],
    isShowProductSpecSelectPlain: false,
    selectSpecType: [],
    selectedSpecType: [],
    selectedSpecName: [],
    primaryOldIndex: null,
    goodsSpecList: null, //处理后的规格
    selectedSpec: [], //已选规格
    curProductId: '',
    headImgList : [],
    isSelectedFinish : false,
    isSelected : false,
    isVirtualLogin : ''
  };
  //获取url参数
  getUrlParams = () => {
    return new Promise((resolve,reject) => {
      let keyword,categoryId,productType
      let searchInfo = decodeURIComponent(this.props.data.location.search)
      console.log('--------------',this.props.data.location)
      if(searchInfo.indexOf('keyword')>-1){
        keyword =  getValForKey(searchInfo, 'keyword')
        this.setState({
          keyword
        })
      }
      if(searchInfo.indexOf('categoryId')>-1){
        categoryId = getValForKey(searchInfo,'categoryId')
        this.setState({
          curCategoryId : categoryId,
          curCategoryName : this.props.data.location.state.name
        })
      }
      if(searchInfo.indexOf('productType')>-1){
        productType = getValForKey(searchInfo,'productType')
        this.setState({
          productType
        })
      }
      resolve(1)
    })
  }
  //获取视口和图片度进行懒加载
  getImgDistance =() => {
    let goodsList = this.state.goodsList
    let vpHeight = document.documentElement.clientHeight
   if(!this.state.showLoading){
     goodsList.forEach(item => {
       let {top} = item.myRef.current.getBoundingClientRect()
       // console.log('图片---------',item.myRef.current,top,vpHeight,item.myRef.current.offsetTop)
       if(top<=vpHeight){
         // console.log('显示了')
         item.showImg = true
       }
     })
   }
   this.setState({
     goodsList
   })
   
  }
  // render之前
  componentWillMount() {
    let userInfo
    if(window.sessionStorage.getItem('__userInfo__')){
      userInfo = JSON.parse(window.sessionStorage.getItem('__userInfo__'))
    }
    console.log('客户信息',userInfo)
    this.setState({
      userInfo : userInfo||''
    })
    this.cartDom = this.props.cartDom
    console.log('cartDom',this.cartDom)
    this.getUrlParams().then(res => {
      this.searchEnv()
    })
  }
  _saveCollect =(params,productId,goodList)=> {
    saveCollect(params).then(res => {
      if(res.data.code==='1'){
        goodList.forEach(item => {
          if(item.productId === productId){
            item.isCollected = '1'
          }
        })
        this.setState({
          goodList
        })
        message.success('收藏成功')
        this.props.submitFresh()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  _delCollect =(params,productId,goodList) => {
    delCollect(params).then(res => {
      if(res.data.code=='1'){
        goodList.forEach(item => {
          if(item.productId === productId){
            item.isCollected = '0'
          }
        })
        this.setState({
          goodList
        })
        message.success('取消成功')
        this.props.submitFresh()
      }
    })
  }
  //收藏商品
  colletEnv = (a,b) => {
    let isCollected = a
    let productId = b
    let goodList = this.state.goodsList
    console.log(productId)
    let params = {
      productId
    }
    if(isCollected === '0'){
      this._saveCollect(params,productId,goodList)
    }else{
      this._delCollect(params,productId,goodList)
    }
  }
  searchEnv =()=> {
    this._checkFilter(this.state.curCategoryId,this.state.curBrandId,this.state.keyword)
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId ? this.state.curCategoryId : '',
      brandId : this.state.curBrandId? this.state.curBrandId : '',
      secondCategoryId: '',
      keyword: this.state.keyword ? this.state.keyword : '',
      productType: this.state.productType==='1'? '':this.state.productType,
      // isVirtualLogin : 'true'
    };
    this.showLoading()
    this._getGoodsList(params);
  }
  componentWillReceiveProps(nextProps){
    console.log('next--------',nextProps,this.state.productType,this.state.curCategoryId,this.state.keyword)
    this.cartDom = nextProps.cartDom
    console.log('cartDom',this.cartDom)
    if(nextProps.keyword ===this.state.keyword
      &&nextProps.productType===this.state.productType
      &&(nextProps.cate.categoryId===this.state.curCategoryId||nextProps.cate==='')) return
      let keyword = nextProps.keyword?nextProps.keyword : this.state.keyword
      let productType = nextProps.productType?nextProps.productType:this.state.productType
      let curCategoryId = nextProps.cate?nextProps.cate.categoryId : this.state.curCategoryId
      let curCategoryName = nextProps.cate?nextProps.cate.name: this.state.curCategoryName
      this.setState({
        keyword,
        productType,
        curCategoryId,
        curCategoryName
      },() => {
        this.searchEnv()
      })
  }
  // 关键词搜索
  keywordSearch = (keyword) => {
    console.log('key: ', keyword);
    this.setState({
      keyword
    })
    
    let params = {
      pageidx: this.state.page,
      pagesize: this.state.pageSize,
      keyword: keyword,
      // isVirtualLogin : 'true'
    };
    this._getGoodsList(params);
  };
  
  // render之后
  componentDidMount() {
    window.addEventListener('scroll',this.getImgDistance)
  };
  componentWillUnmount(){
    window.removeEventListener('scroll',this.getImgDistance)
  }
  // 获取商品列表和品牌分类列表
  _getGoodsList(params) {
    getGoodsList_api(params).then(res => {
      console.log('商品列表-------', res);
      if (res.data.code !== ERR_OK) {
        return;
      }
     this.hideLoading()
      let data = res.data;
      let dataTotal = data.total - 0;
      let goodsList = data.dataList;
      let brandList = data.brandList
      let categoryList = data.categoryList
      localStorage.setItem('__categoryList__',JSON.stringify(categoryList))
      let isLogin = data.isLogin
      let keyWordList = data.keyWordList
      let isVirtualLogin = data.isVirtualLogin
      goodsList.forEach(item => {
        //储存dom
        let myRef = React.createRef()
        let btnDom = React.createRef()
        let flyItem = React.createRef()
        item.myRef = myRef
        item.btnDom = btnDom
        item.flyItem = flyItem
        item.showImg = false
      })
      categoryList.unshift({
              name: '全部',
              categoryId: '',
            });
      brandList.unshift({
              name: '全部',
              brandId: '',
            });
      // 刷新本地存储
      if(isLogin==='false'){
        window.sessionStorage.removeItem('__userInfo__')
        this.setState({
          userInfo : ''
        })
        this.freshHeader('noLogin')
      }
      if(isLogin==='true'&&!this.state.userInfo){
        this.freshHeader('isLogin')
      }
      this.setState({
        goodsList,
        dataTotal,
        brandList,
        categoryList,
        isLogin,
        keyWordList,
        isVirtualLogin
      },()=>{
        this.getImgDistance()
        this.saveKeyword()
        this.saveCategoryList()
      })
      if(params.firstCategoryId || params.brandId){
          let otherParams = {
            firstCategoryId : params.firstCategoryId,
            brandId : params.brandId
          }
            getBrandCategoryList_api(otherParams).then(res => {
            let brandList = res.data.brandList
              let categoryList  = res.data.categoryList
              if(brandList.length>0){
                brandList.unshift({
                  name: '全部',
                  brandId: '',
                });
              }
             if(categoryList.length>0){
               categoryList.unshift({
                 name: '全部',
                 categoryId: '',
               });
             }
            this.setState({
              brandList,
              categoryList
            })
          })
        }
    }).catch(err => {
      console.log('-------',err)
    })
    ;
  };
  //储存keyword
  saveKeyword =()=> {
    let keyWordList = this.state.keyWordList
    window.localStorage.setItem('__keyword__',JSON.stringify(keyWordList))
  }
  //刷新header
  freshHeader =(val)=>{
    this.props.freshHeader(val)
  }
  //储存分类
  saveCategoryList =()=> {
    let categoryList = this.state.categoryList
    window.localStorage.setItem('__categoryList__',JSON.stringify(categoryList))
  }
  // 查看更多品牌
  switchSeeMore = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
        brandEleHeight: '70px'
      })
    } else {
      this.setState({
        isOpen: true,
        brandEleHeight: 'auto'
      })
    }
  };
  
  // 改变分类
  bindleChangeCategory(item, i) {
    console.log(item, i);
    let curCategoryId = item.categoryId;
    let curCategoryName = item.name;
    let curCategoryIndex = i;
    this.setState({
      curCategoryIndex,
      curCategoryId,
      curCategoryName,
    });
    this._checkFilter(curCategoryId, this.state.curBrandId);
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: curCategoryId,
      secondCategoryId: this.state.secondCategoryId,
      brandId: this.state.curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params,curCategoryId,'category');
  };
  showLoading =() => {
    this.setState({
      showLoading : true
    })
  }
  hideLoading = () => {
    this.setState({
      showLoading : false
    })
  }
  // 改变品牌
  bindleChangeBrand(item, i) {
    console.log(item, i);
    let curBrandId = item.brandId;
    let curBrandName = item.name;
    let curBrandIndex = i;
    
    this.setState({
      curBrandIndex,
      curBrandId,
      curBrandName
    });
    this._checkFilter(this.state.curCategoryId, curBrandId);
    
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params,curBrandId,'brand');
  };
  // 销量排序
  bindleChangeSort = () => {
    let sortType = this.state.sortTypeCount;
    let minPrice = this.state.priceLow;
    let maxPrice = this.state.priceHigh;
    
    this.setState({
      selectCount: true,
      selectPrice: false,
      sort: 1,
      sortTypeCount: sortType === 1 ? 2 : 1
    });
    
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: 1,
      sortType,
      minPrice,
      maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  // 价格排序
  bindleChangeSortPrice = () => {
    let sortType = this.state.sortTypePrice;
    let minPrice = this.state.priceLow;
    let maxPrice = this.state.priceHigh;
    
    this.setState({
      selectCount: false,
      selectPrice: true,
      sort: 2,
      sortTypePrice: sortType === 1 ? 2 : 1
    });
    
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: 2,
      sortType,
      minPrice,
      maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  //最低价格输入
  bindLowChange = (e) => {
    this.setState({
      priceLow: e.target.value,
    })
  };
  //最高价格输入
  bindHighChange = (e) => {
    this.setState({
      priceHigh: e.target.value,
    })
  };
  // 提交价格区间
  bindSubmit = () => {
    console.log(this.state.priceLow, this.state.priceHigh);
    let minPrice = this.state.priceLow;
    let maxPrice = this.state.priceHigh
    this.setState({
      minPrice,
      maxPrice
    })
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: this.state.sort,
      sortType: '',
      minPrice,
      maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  // 删除已选分类
  bindleClearCurCategory = () => {
    let curCategoryName = '';
    let curCategoryId = '';
    let curCategoryIndex = 0;
    this.setState({
      curCategoryName,
      curCategoryId,
      curCategoryIndex,
    });
    this._checkFilter(curCategoryId, this.state.curBrandId,this.state.keyword);
    this.props.isHome &&
    this.submitInit('cate',curCategoryId)
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  // 删除已选品牌
  bindleClearCurBrand = () => {
    let curBrandName = '';
    let curBrandId = '';
    let curBrandIndex = 0;
    this.setState({
      curBrandName,
      curBrandId,
      curBrandIndex,
    });
    this._checkFilter(this.state.curCategoryId, curBrandId,this.state.keyword);
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  //初始化父组件
  submitInit =(type,val) => {
    this.props.init(type,val)
    }
  //删除关键字
  bindleClearKeyword = () => {
    let keyword = ''
    this.setState({
      keyword
    },() => {
      this._checkFilter(this.state.curCategoryId,this.state.curBrandId,keyword)
      this.submitInit('key',keyword)
      let params = {
        pageidx: this.state.defaultCurrent,
        pagesize: this.state.pageSize,
        firstCategoryId: this.state.curCategoryId,
        secondCategoryId: '',
        brandId: this.state.curBrandId,
        sort: this.state.sort,
        sortType: this.state.sortType,
        minPrice: this.state.minPrice,
        maxPrice: this.state.maxPrice,
        productType: this.state.productType==='1'? '':this.state.productType,
        keyword : keyword
      };
      this.showLoading()
      this._getGoodsList(params);
    })
  }
  _checkFilter(curCategoryId,curBrandId,keyword) {
    console.log('----------------',curCategoryId,curBrandId,keyword)
    if (curCategoryId || curBrandId|| keyword) {
      this.setState({
        isFilter: true,
      });
      console.log(true);
    } else {
      this.setState({
        isFilter: false,
      });
      console.log(false);
    }
  };
  //复选状态改变A
  bindChangeCheckA = () => {
    let isCheckedA = !this.state.isCheckedA;
    let isCheckedB = this.state.isCheckedB;
    let productType = isCheckedB === isCheckedA ? 0 : isCheckedA ? '2' : isCheckedB ? '3' : '';
    
    this.setState({
      isCheckedA,
      productType,
    });
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  //复选状态改变B
  bindChangeCheckB = () => {
    let isCheckedB = !this.state.isCheckedB;
    let isCheckedA = this.state.isCheckedA;
    let productType = isCheckedB === isCheckedA ? 0 : isCheckedB ? '3' : isCheckedA ? '2' : '';
    
    this.setState({
      isCheckedB,
      productType,
    });
    
    let params = {
      pageidx: this.state.defaultCurrent,
      pagesize: this.state.pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({
      pageSize: pageSize,
      currentPage: 1,
    });
    let params = {
      pageidx: 1,
      pagesize: pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({
      currentPage: page,
      pageSize: pageSize
    });
    let params = {
      pageidx: page,
      pagesize: pageSize,
      firstCategoryId: this.state.curCategoryId,
      secondCategoryId: '',
      brandId: this.state.curBrandId,
      sort: this.state.sort,
      sortType: this.state.sortType,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      productType: this.state.productType==='1'? '':this.state.productType,
      keyword : this.state.keyword
    };
    this.showLoading()
    this._getGoodsList(params);
  };
  //添加购物车弹窗
  AddToCart =(productId,btnDom,flyItem) =>{
    let params = {
      productId
    }
    getProductSpecList(params).then(res => {
      console.log(res)
      let productSpecList = res.data.data
      let isSingleProduct = productSpecList.length===1?'1':'0'
      this.setState({
        productSpecList: this._generateSpecList(productSpecList),
        selectSpecType: this._getGoodsSpecTypes(productSpecList),
        curProductId : productId,
        isSingleProduct,
        isSelected : isSingleProduct==='1'?true:false,
        isSelectedFinish :isSingleProduct==='1'?true:false,
        curSpecProductId : isSingleProduct==='1'?productSpecList[0].productSpecId:'',
        curProduct : productSpecList[0],
        showSpecList : isSingleProduct==='1'?false:true,
        btnDom,
        flyItem
      },() =>{
        if(this.state.isSingleProduct==='1'){
          this.toCartEnv()
          return
        }else{
          this._getSecondarySpecLen()
        }
      })
    })
  }
  //加入购物车
  toCartEnv =() => {
    if(this.state.isSelectedFinish){
        let params = {
          productId : this.state.curProductId,
          productSpecId : this.state.curSpecProductId,
          quantity : 1
        }
        checkBuy(params).then(res => {
          console.log('校验结果',res)
          if(res.data.code=='0'){
            message.error(res.data.msg)
          }else{
            this.continueEnv()
          }
        })
    }else{
      if(this.state.isSelected){
        message.error(`请选择${this.state.tipSelectSpecTypes}`)
      }else{
        message.error('请选择规格')
      }
    }
  }
  //购物车飞入动画
  flyToCart =() => {
    let running = false
    this.props.submitFresh()
    if(this.cartDom){
      let fly = this.state.flyItem.current
      let cart = this.cartDom.current
      let btn = this.state.btnDom.current
      console.log('-------------------1111111',fly,cart,btn)
      let fly1 = this.state.flyItem.current.getBoundingClientRect()
      let cart1 =  this.cartDom.current.getBoundingClientRect()
      let btn1 = this.state.btnDom.current.getBoundingClientRect()
      //中心点间距
      let offsetX = cart1.left + cart1.width / 2 - (btn1.left + btn1.width / 2);
      let offsetY = cart1.top + cart1.height / 2 - (btn1.top + btn1.height / 2);
      console.log('距离-----------',offsetX,offsetY)
      if(!running){
        //初始位置
        fly.style.display = 'block';
        //触发页面重渲
        console.log(btn.clientWidth)
        fly.style.transform = 'translate('+ offsetX +'px,'+offsetY +'px)';
        console.log('---------------fly',fly)
        running = true;
        let time = setTimeout( () => {
          fly.style.display = 'none';
          fly.style.transform = 'translate('+ 0 +'px,'+ 0 +'px)';
          running = false;
          clearTimeout(time)
        }, 490);
      }
    }
    
  }
  continueEnv =() => {
      let otherParams = {
        productId : this.state.curProductId,
        productSpecId : this.state.curSpecProductId,
        quantity : 1,
        type : '1'
      }
      console.log(1111,otherParams)
      _addCart_api(otherParams).then(res => {
        console.log(res)
        if(res.data.code=='1'){
          message.success(res.data.msg)
          this.flyToCart()
          this.resetState()
        }else{
          message.error(res.data.msg)
        }
      })
  }
  resetState =()=>{
    this.setState({
      productSpecList : [],
      isShowProductSpecSelectPlain: false,
      selectSpecType: [],
      selectedSpecType: [],
      selectedSpecName: [],
      primaryOldIndex: null,
      goodsSpecList: null, //处理后的规格
      selectedSpec: [], //已选规格
      curProductId: '',
      curSpecProductId : '',
      curProduct : '',
      headImgList : [],
      isSelectedFinish : false,
      isSelected : false,
      showSpecList : false
    })
  }
  handleCancel =() =>{
    this.resetState()
  }
  handleOk = () => {
    this.toCartEnv()
  }
  //商品规格部分---------
  // 生成规格列表
  _generateSpecList(specList) {
    if(!specList[0].secondarySpecTypeName){
      specList.forEach(spec => {
        if (spec.isPaymentSoldout == '1') {
          spec.primaryDisabled = true;
          spec.secondaryDisabled = true;
        }
      });
    }
    localStorage.setItem('__oldProductSpecList__', specList);
    return specList;
  };
  //获取规格类型
  _getGoodsSpecTypes(specList) {
    let selectSpecType = [];
    if (specList && specList.length) {
      if (specList[0].primarySpecTypeName) {
        selectSpecType.push(specList[0].primarySpecTypeName)
      }
      if (specList[0].secondarySpecTypeName) {
        selectSpecType.push(specList[0].secondarySpecTypeName)
      }
    }
    console.log('selectSpecType--------',selectSpecType)
    return selectSpecType;
    
  };
  //获取二级规格种类
  _getSecondarySpecLen =() =>{
    if(this.state.productSpecList.length>0&&this.state.productSpecList[0].secondarySpecTagName){
      let secondary = []
      let specList = this.state.productSpecList
      specList.forEach(item => {
        if(secondary.indexOf(item.secondarySpecTagId) == -1){
          secondary.push(item.secondarySpecTagId)
        }
      })
      this.setState({
        secondaryLen: secondary.length
      })
      console.log('-----------二级规格种类',secondary)
      
    }else{
      this.setState({
        secondaryLen : 1
      })
    }
  }
  //选择一级规格
  selectPrimarySpecEnvs(spec, i) {
    if (spec.primaryDisabled) return;
    this.setSelectedSpec(spec, i, 'primary')
  };
  // 选择二级规格
  selectSecondarySpecEnvs(spec, i) {
    if (spec.secondaryDisabled) return;
    this.setSelectedSpec(spec, i, 'secondary')
  };
  // 重置已选样式
  _resetSelectedStyles(selectSpecId, specType) {
    if (specType === 'secondary') {
      let secondarySelected = selectSpecId;
      this.state.productSpecList.forEach((spec) => {
        spec.secondarySelected = false
      });
      this.state.oldSelectSecondaryIndex = undefined
    } else {
      let primarySelected = selectSpecId;
      this.state.productSpecList.forEach((spec) => {
        spec.primarySelected = false
      });
      this.state.oldSelectPrimaryIndex = undefined
    }
  };
  // 重置不可选样式
  _resetDisabledStyles(specType) {
    let args = '';
    if (specType === 'secondary') {
      args = 'primaryDisabled'
    }
    if (specType === 'primary') {
      args = 'secondaryDisabled'
    }
    
    this.state.productSpecList.forEach((spec) => {
      spec[args] = false
    });
  };
  // 设置已选样式
  _setSelectedStyles(selectSpecId, selectIndex, specType) {
    if (specType === 'secondary') {
      let selectSecondarySpecId = selectSpecId;
      this.state.productSpecList.forEach((spec) => {
        if (selectSecondarySpecId === spec.secondarySpecTagId) {
          spec.secondarySelected = true
        } else {
          spec.secondarySelected = false
        }
      });
      // this.state.oldSelectSecondaryIndex = selectIndex
      this.setState({
        oldSelectSecondaryIndex : selectIndex
      })
    }
    if (specType === 'primary') {
      let selectPrimarySpecId = selectSpecId;
      this.state.productSpecList.forEach((spec) => {
        if (selectPrimarySpecId === spec.primarySpecTagId) {
          spec.primarySelected = true
        } else {
          spec.primarySelected = false
        }
      });
      // this.state.oldSelectPrimaryIndex = selectIndex
      this.setState({
        oldSelectPrimaryIndex : selectIndex
      })
    }
  };
  // 设置残废样式
  _setDisabledStyles(selectSpecId, specType) {
    if (specType === 'secondary') {
      let selectSecondarySpecId = selectSpecId;
      this.state.productSpecList.forEach((spec) => {
        spec.primaryDisabled = false
      });
      this.state.productSpecList.forEach((spec) => {
        if (spec.secondarySpecTagId === selectSecondarySpecId && spec.isPaymentSoldout === '1') {
          this.state.productSpecList.forEach(item => {
            if (spec.primarySpecTagId === item.primarySpecTagId) {
              item.primaryDisabled = true
            }
          })
        }
      })
    }
    if (specType === 'primary') {
      let selectPrimarySpecId = selectSpecId;
      this.state.productSpecList.forEach((spec) => {
        spec.secondaryDisabled = false
      });
      this.state.productSpecList.forEach((spec) => {
        if (spec.primarySpecTagId === selectPrimarySpecId && spec.isPaymentSoldout === '1') {
          this.state.productSpecList.forEach(item => {
            if (spec.secondarySpecTagId === item.secondarySpecTagId) {
              item.secondaryDisabled = true
            }
          })
        }
      })
    }
  };
  setSelectedSpec(spec, i, specType) {
    let selectSpec = spec;
    let selectIndex = i;
    let oldSelectSecondaryIndex = this.state.oldSelectSecondaryIndex;
    let oldSelectPrimaryIndex = this.state.oldSelectPrimaryIndex;
    
    let arg, selectSpecId;
    if (specType === 'secondary') {
      selectSpecId = selectSpec.secondarySpecTagId;
      arg = 'secondary'
    }
    if (specType === 'primary') {
      selectSpecId = selectSpec.primarySpecTagId;
      arg = 'primary'
    }
    // console.log(selectSpec);
    // console.log(selectIndex);
    // console.log(selectSpecId);
    console.log('选择--------------------',selectSpec,selectIndex,selectSpecId)
    if (specType === 'secondary') {
      // 重复选择时取消选择
      // if (oldSelectSecondaryIndex === selectIndex) {
      //   this._resetSelectedStyles(selectSpecId, arg);
      //   this._resetDisabledStyles(arg);
      //
      //   this.state.selectedSpecType[1] = undefined;
      //   this.state.selectedSpecName[1] = undefined;
      //   return;
      // }
      
      this._setSelectedStyles(selectSpecId, selectIndex, arg);
      this._setDisabledStyles(selectSpecId, arg);
      if (!this.state.selectedSpecType[0]) {
        this.state.selectedSpecType[0] = undefined
      }
      this.state.selectedSpecType[1] = selectSpec.secondarySpecTypeName;
      
      if (!this.state.selectedSpecName[0]) {
        this.state.selectedSpecName[0] = undefined
      }
      this.state.selectedSpecName[1] = selectSpec.secondarySpecTagName
      oldSelectSecondaryIndex = selectIndex
      
    }
    if (specType === 'primary') {
      // 重复选择时取消选择
      // if (oldSelectPrimaryIndex === selectIndex) {
      //   this._resetSelectedStyles(selectSpecId, arg);
      //   this._resetDisabledStyles(arg);
      //
      //   this.state.selectedSpecType[0] = undefined;
      //   this.state.selectedSpecName[0] = undefined;
      //   return;
      // }
      this._setSelectedStyles(selectSpecId, selectIndex, arg);
      this._setDisabledStyles(selectSpecId, arg);
      if (this.state.selectSpecType[1] && !this.state.selectedSpecType[1]) {
        this.state.selectedSpecType[1] = undefined
      }
      this.state.selectedSpecType[0] = selectSpec.primarySpecTypeName;
      
      if (this.state.selectSpecType[1] && !this.state.selectedSpecName[1]) {
        this.state.selectedSpecName[1] = undefined
      }
      this.state.selectedSpecName[0] = selectSpec.primarySpecTagName
      oldSelectPrimaryIndex = selectIndex
    }
    this.setState({
      productSpecList: this.state.productSpecList
    });
    
    console.log('当前选择规格');
    console.log(this.state.selectedSpecType);
    console.log(this.state.selectedSpecName);
    this.setState({
      selectedSpecType: this.state.selectedSpecType,
      selectedSpecName: this.state.selectedSpecName,
      
    });
    console.log(this.state.selectedSpecType);
    console.log(this.state.selectedSpecName);
    // 判断是否选择完成
    let temp = 0
    let tipSelectSpecTypes = ''
    let isSelectedFinish,isSelected
    this.state.selectedSpecType.forEach((selectedItem, index) => {
      if (selectedItem) {
        temp++
      }
      if (!selectedItem) {
        this.setState({
          tipSelectSpecTypes: this.state.selectSpecType[index]
        })
      }
    })
    if (this.state.selectSpecType.length === temp) {
      isSelected = true
      isSelectedFinish = true
      this.setState({
        isSelected,
        isSelectedFinish
      })
    }
    if (temp > 0 && temp < this.state.selectSpecType.length) {
      isSelected = true
      isSelectedFinish = false
      this.setState({
        isSelected,
        isSelectedFinish
      })
    }
    if (temp === 0) {
      isSelected = false
      isSelectedFinish = false
      this.setState({
        isSelected,
        isSelectedFinish
      })
    }
    // 当前选择的商品规格id
    if(isSelectedFinish){
      this._getCurProductId(oldSelectPrimaryIndex,oldSelectSecondaryIndex).then(curSpecProductId => {
        this.setState({
          curSpecProductId: curSpecProductId
        });
        console.log('选择的商品id: ' + curSpecProductId)
        let curProduct = this.state.productSpecList.filter(item => {
          return item.productSpecId == curSpecProductId
        })
        if(!curProduct||curProduct.length===0) return
        this.setState({
          curGoodImg : curProduct[0].imagePath,
          curSpecStockNumber : curProduct[0].paymentStockNumber,
          curProduct:curProduct[0]
        })
        console.log('已选商品-------------',curProduct)
      })
    }
  };
  // 获取当前选择商品ID
  _getCurProductId(oldSelectPrimaryIndex,oldSelectSecondaryIndex) {
    return new Promise((resolve, reject) => {
      let primaryIndex = oldSelectPrimaryIndex;
      let secondaryIndex = oldSelectSecondaryIndex;
      console.log('异步------------',primaryIndex,secondaryIndex)
      let curPrice
      let curPrimarySpecId, curSecondarySpecId, curSpecProductId;
      this.state.productSpecList.forEach((spec, index) => {
        if (primaryIndex === index) {
          curPrimarySpecId = spec.primarySpecTagId
        }
        if (secondaryIndex !== undefined) {
          if (secondaryIndex === index) {
            curSecondarySpecId = spec.secondarySpecTagId
          }
        }
      });
      if (secondaryIndex !== undefined) {
        this.state.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecTagId && curSecondarySpecId === spec.secondarySpecTagId) {
            curSpecProductId = spec.productSpecId
            curPrice = spec.price
          }
        })
      } else {
        this.state.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecTagId) {
            curSpecProductId = spec.productSpecId
            curPrice = spec.price
          }
        })
      }
      console.log('当前选择的商品规格id');
      // console.log(curPrimarySpecId, curSecondarySpecId)
      console.log(curSpecProductId);
      this.setState({
        curPrice
      })
      resolve(curSpecProductId);
    })
  }
  
  render() {
    //分类
    const Classfiys = (
      <div className="dl classfiy">
        <div className="title">分类</div>
        <ul className="list">
          {
            !this.state.categoryList ?
              <li className="active">全部</li>
              :
              this.state.categoryList.map((item, i) =>
                <li key={i}
                    className={this.state.curCategoryIndex === i ? 'active' : ''}
                    onClick={this.bindleChangeCategory.bind(this, item, i)}>
                  {item.name}
                </li>
              )
          }
        </ul>
      </div>
    );
    
    //品牌
    const Brand = (
      <div className={`dl brand ${this.state.isOpen ? 'open' : ''}`} style={{height: this.state.brandEleHeight}}>
        <div className="title">品牌</div>
        <ul id="listBox" className="list listBox" ref={listBox => this.listBox = listBox}>
          {
            !this.state.brandList ?
              <li className="active">全部</li>
              :
              this.state.brandList.map((item, i) =>
                <li key={i}
                    className={this.state.curBrandIndex === i ? 'active' : ''}
                    onClick={this.bindleChangeBrand.bind(this, item, i)}>
                  {item.name}
                  {
                    !item.typeNumber ? <span/>
                      :
                      <span>(<em className="inner">{item.typeNumber}</em>)</span>
                  }
                </li>
              )
          }
        </ul>
        <div className={`seeMore ${this.state.isOpen ? 'open' : ''}`}
             onClick={this.switchSeeMore}>
          <span className="">{this.state.isOpen ? '收起' : '展开'}</span>
        </div>
      </div>
    );
    
    //市场商品 排序
    const MarketShort = (
      <div className="market">
        <div className="btn-group">
          <span className={this.state.selectCount ? 'href active' : 'href'} onClick={this.bindleChangeSort}>销量
            {
              this.state.sortTypeCount === 1 ?
                <i className="fa fa-angle-down"/>
                :
                <i className="fa fa-angle-up"/>
            }
          </span>
          <span className={this.state.selectPrice ? 'href active' : 'href'} onClick={this.bindleChangeSortPrice}>价格
            {
              this.state.sortTypePrice === 1 ?
                <i className="fa fa-angle-down"/>
                :
                <i className="fa fa-angle-up"/>
            }
          </span>
          <div className="btnBox">
            <input type="number" placeholder="￥" className="innerInput"
                   value={this.state.priceLow}
                   onChange={this.bindLowChange}
            />
            &nbsp;-&nbsp;
            <input type="number" placeholder="￥" className="innerInput"
                   value={this.state.priceHigh}
                   onChange={this.bindHighChange}
            />
            <div className="submitBtn" onClick={this.bindSubmit}>确定</div>
          </div>
          {
            !this.props.isHome &&
            <div className="radioBox">
              <label>
                <input type="checkbox" name=""
                       checked={this.state.isCheckedA}
                       onChange={this.bindChangeCheckA}/>保税直供
              </label>
              <label>
                <input type="checkbox" name=""
                       checked={this.state.isCheckedB}
                       onChange={this.bindChangeCheckB}/>海外直邮
              </label>
            </div>
          }
        </div>
        <div className="paging">
        </div>
      </div>
    );
    //商品
    const Goods = (
      !this.state.goodsList.length ? <li className="goodsNull">暂无此类商品</li> :
        this.state.goodsList.map((goods, i) =>
          <li className="item" key={i} ref={this.state.goodsList[i].myRef}>
           <div className='item-box'>
             <div className="goods">
               <Link to={{
                 pathname: '/goods',
                 search: `?productId=${goods.productId}`
               }} className="goods-img" target="_blank">
                 {
                   goods.showImg &&
                   <img src={baseImgUrl+goods.imageUrl}/>
                 }
               </Link>
             </div>
             <div className="goods-info">
               {
                 this.state.isLogin === 'true'||this.state.isVirtualLogin==='true'?
                   <div className="after-tax">
                     {/*<span className="label" style={{marginRight:'5px'}}>市场价</span>*/}
                     <span className="price">￥{goods.price?(goods.price-0).toFixed(2):''}</span>
                   </div>:
                   <div className='after-tax'>
                     <Link to='/login'>
                       <span  style={{color:'#999',fontSize:'12px'}} >登录后查看价格</span>
                     </Link>
                   </div>
               }
             </div>
             <div className="goods-title">
               <span>{goods.productName}</span>
             </div>
             <div className='more-opt'>
               <span className={goods.isCollected==='1'?'collect active':'collect'} onClick={() =>this.colletEnv(goods.isCollected,goods.productId)}>
                 <i className='icon-collect'></i>
                 <em>收藏</em>
               </span>
               <span className='to-cart'
                     onClick={() => this.AddToCart(goods.productId,goods.btnDom,goods.flyItem)}
                     ref={goods.btnDom}
               >
                 <div className='fly-item' ref={goods.flyItem}>
                  <img src={baseImgUrl+goods.imageUrl} alt=""/>
                </div>
               </span>
             </div>
           </div>
          </li>
        )
    );
    // 已选条件
    const Filters = (
      <div className="nav-crumb">
        全部结果
        <span className="fa fa-angle-right"/>
        <div className="filter-terms">
          {
            !this.state.curCategoryId ? null :
              <span className="filter-term">
                      <em>分类:</em>
                      <em>{this.state.curCategoryName}</em>
                      <i className="icon-close search-close" onClick={this.bindleClearCurCategory}/>
                    </span>
          }
          {
          !this.state.curBrandId ? null :
            <span className="filter-term">
                      <em>品牌:</em>
                      <em>{this.state.curBrandName}</em>
                      <i className="icon-close search-close" onClick={this.bindleClearCurBrand}/>
                    </span>
        }
          {
            !this.state.keyword ? null :
              <span className="filter-term">
                <em>关键字:</em>
                <em>{this.state.keyword}</em>
                <i className="icon-close search-close" onClick={this.bindleClearKeyword}/>
              </span>
          }
        </div>
        <span className="fa fa-angle-right"/>
        找到<span className="text-danger">{this.state.dataTotal}</span>个商品
      </div>
    );
    //规格选择
    const productSpecBox =(
      <div>
        {
          this.state.isSingleProduct !== '1'&&this.state.selectSpecType[0]?
            <div className="mod-gd">
              <div className="attr">
                <div className="label" style={{paddingTop:'10px'}}>{this.state.selectSpecType[0]}</div>
                <div className="mod-wrap">
                  <div className="mod-item">
                    <ul className="spec clearfix">
                      {
                        this.state.productSpecList.map((spec, index) => {
                            return (
                              (index + 1) > this.state.productSpecList.length / this.state.secondaryLen ?
                                <li key={index}></li> :
                                <li key={index}
                                    className={spec.primarySelected ? 'item active' : spec.primaryDisabled ? 'item disabled' : 'item'}
                                    onClick={this.selectPrimarySpecEnvs.bind(this, spec, index)}>
                                  <img className='smallImg' src={baseImgUrl+spec.imagePath}></img>
                                  <span className='tags'>{spec.primarySpecTagName}</span>
                                  <span className="cls">
                          <i className="fa fa-check"/>
                          </span>
                                </li>
                            )
                          }
                        )
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>:null
        }
        {
          this.state.isSingleProduct !== '1'&&this.state.selectSpecType[1]?
            <div className="mod-gd">
              <div className="attr">
                <div className="label" style={{paddingTop:'10px'}}>{this.state.selectSpecType[1]}</div>
                <div className="mod-wrap">
                  <div className="mod-item">
                    <ul className="spec clearfix">
                      {
                  
                        this.state.productSpecList.map((spec,i) => {
                          return(
                            i < this.state.productSpecList.length-1 &&
                            this.state.productSpecList[i].secondarySpecTagId === this.state.productSpecList[i + 1].secondarySpecTagId ?null:
                              <li key={i}
                                  className={spec.secondarySelected ? 'item active' : spec.secondaryDisabled ? 'item disabled' : 'item'}
                                  onClick={this.selectSecondarySpecEnvs.bind(this, spec, i)}>
                                <span>{spec.secondarySpecTagName}</span>
                                <span className="cls">
                          <i className="fa fa-check"/>
                      </span>
                              </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>:null
        }
      </div>
    )
    
    return (
      <Spin spinning={this.state.showLoading} wrapperClassName='loadLogo'>
      <div className="shopping-page">
        {/*规格弹窗*/}
        <Modal
          title="选择规格"
          visible={this.state.showSpecList}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={550}
        >
          <div className='specBox'>
            {productSpecBox}
          </div>
        </Modal>
        <div className="shopping-container">
          <div className="content-Cont minW">
            {!this.state.isFilter ? null : Filters}
            <div className="filter-container">
              <div className="filter-box">
                {
                  !this.state.categoryList||this.state.categoryList.length==0?
                  null : Classfiys
                }
                {
                  !this.state.brandList||this.state.brandList.length==0?
                  null : Brand
                }
              </div>
              {MarketShort}
            </div>
            <div className="goods-list">
              <ul className="list-items">{Goods}</ul>
              {
                this.state.goodsList&&this.state.goodsList.length>0&&
                <Pagination
                  defaultCurrent={this.state.defaultCurrent}
                  current={this.state.currentPage}
                  pageSize={this.state.pageSize}
                  total={this.state.dataTotal}
                  showQuickJumper={true}
                  onShowSizeChange={this.pageSizeChange}
                  onChange={this.pageChange}
                  hideOnSinglePage ={true}
                />
              }
            </div>
          </div>
        </div>
      </div>
      </Spin>
    )
  }
}