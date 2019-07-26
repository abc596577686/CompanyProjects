import React from 'react';
import {Link} from 'react-router-dom';
import IHeader from '../../components/Header';
import {getGoodsDetails_api,_addCart_api,checkBuy,getRegionList,postage} from '../../axios/api';
import {getValForKey} from '../../utils/utils';
import {ERR_OK} from "../../axios/config";
import './index.less';
import {message,Carousel,Button,Input,Cascader,Popover,Spin,Modal,Table} from 'antd';
import PageFooter from '../../components/PageFooter'
import HandleBar from '../../components/HandleBar'
import HomeHeader from "../../components/HomeHeader/index";
import {baseUrl,baseImgUrl} from "../../axios/api";
import arrLeft from '../../resource/assets/images/btn_per.gif'
import arrRight from '../../resource/assets/images/btn_next.gif'
export default class Goods extends React.Component {
  // 初始化状态值
  constructor(){
    super()
    this.flyItem = React.createRef()
    this.btnDom = React.createRef()
    this.hotList = React.createRef()
    this.steps = React.createRef()
    this.smallSwiper = React.createRef()
  }
  state = {
    QAIndex: -1,
    isFixedPos: false,
    innerTabIndex: 0,
    productDetails: null,
    productSpecList: null,
    oldSelectSecondaryIndex: undefined,
    oldSelectPrimaryIndex: undefined,
    // 商品规格选择
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
    imgList : [],
    swiperIndex : 0,
    initBuyCount : 1,
    current : 0,
    now : 0,
    curPostage : 0,
  //  默认省市区
    provinceVal : "310000",
    cityVal : "310100",
    areaVal :"310112",
    curProvinceName : '上海',
    curCityName : '上海市',
    curAreaName : '闵行区',
    fullAreaName : '请选择收货地址',
  //  默认列表1 省 2 市 3 区
    curAreaList : '1',
    isVirtualLogin : 'false',
  };

  // Render之前
  componentWillMount() {
    window.scrollTo(0,0)
    let userInfo
    if(sessionStorage.getItem('__userInfo__')){
      userInfo = JSON.parse(sessionStorage.getItem('__userInfo__'));
      this.setState({
        userInfo
      });
    }
    let searchInfo = decodeURIComponent(this.props.location.search);
    let productId = getValForKey(searchInfo, 'productId');
    this.setState({
      curProductId: productId
    });

    let params = {
      productId: productId,
      // isVirtualLogin : 'true'
    };
    this._getGoodsDetails_api(params);
    this._getRegionList()
    this.getFullAreaName()
    // this.defaultList()
  };

  // Render之后
  componentDidMount() {
  
  };
  //获取cart dom
  getCartDom =(dom) => {
    console.log('cart--------------',dom)
    this.cartDom = dom
  }
  //设置滚动条位置
  setHandbar = () =>{
    let EleSteps = this.steps.current;
    let EleStepsTop = EleSteps.offsetTop;
    console.log('顶部高度----------',EleSteps,EleStepsTop);
    let staticHeight = EleStepsTop + 35 + 86 + 20;
    window.addEventListener('scroll', () => {
      this.handleScroll(staticHeight);
    })
  }
  // 获取商品详情
  _getGoodsDetails_api(params) {
    this.setState({
      showLoading : true
    })
    getGoodsDetails_api(params).then(res => {
      console.log('商品详情：', res);
      if (res.data.code === '0') {
        if(res.data.payTime==='商品不存在'){
          message.error('商品不存在！')
          let exit = setTimeout(() => {
            this.props.history.push('/')
            clearTimeout(exit)
          },2000)
        }
        return;
      }
      this.setState({
        showLoading:false
      })
      let data = res.data.data;
      // console.log('商品详情-----',data,data.productDesc);
      console.log('类型',data.productType)
      let headerImageList = res.data.headerImageList
      this.setState({
        productDetails: data,
        productSpecList: this._generateSpecList(data.productSpecList),
        selectSpecType: this._getGoodsSpecTypes(data.productSpecList),
        productType: data.productType,
        productDesc : this.generateImgList(data.productDesc),
        headImgList : headerImageList,
        curGoodImg:headerImageList&&headerImageList.length>0?headerImageList[0].imageUrl:'',
        productInfoList : data.productIntroList,
        purchaseDoubtList : this.genarateList(data.purchaseDoubtList),
        curPrice : data.paymentPrice,
        isLogin : res.data.isLogin,
        isVirtualLogin : res.data.isVirtualLogin,
        hotProductList : data.hotProductList,
        wareHouseName : data.wareHouseName,
        wareHouseId : data.wareHouseId,
        paymentTax : data.paymentTax,
        priceRecommend : data.priceRecommend,
        isSingleProduct : data.isSingleProduct,
        curSwiperImg : headerImageList&&headerImageList.length>0?headerImageList[0].imageUrl:''
      },() => {
        this._getSecondarySpecLen()
        this.setHandbar()
        let isLogin = this.state.isLogin
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
        if(this.state.isSingleProduct ==='1'){
          this.setState({
            isSelected : true,
            isSelectedFinish : true,
            curSpecProductId : this.state.productSpecList[0].productSpecId,
            curProduct : this.state.productSpecList[0]
          })
        }
      });
      console.log('推荐列表-----------------',data.hotProductList);
      console.log(data.productInfoList)
    })
  }
  //刷新header
  freshHeader =(val)=>{
    this.setState({
      freshHeader : val
    })
  }
  //
  generateImgList =(list)=>{
    let productSpec = list.replace(/#IMAGE#/g,baseUrl)
    console.log('新字符串----------',productSpec)
    return productSpec
  }
  //购买须知
  genarateList =(list) =>{
    let addList = [
      {
      title : '1.为何商品有从国内保税区发出？有从海外仓库直接发出？',
      description :
      '<p>保税区发货，智果从海外产地直接采购商品，批量运输，运费成本降低50%，在海关和国检部门的监控下，储存在保税区仓库，100%正品保障。当您在智果下单时，商品直接从国内保税区仓库用国内快递寄出。对比传统的代购等海淘模式，保税区发货，让您享受更优惠的商品价格，同时享受到国内的物流速度。智果的海外保税区，是经国务院批准设立的、海关实施特殊监管的经济区域。根据现行有关政策，海关对保税区实行封闭管理，境外货物进入保税区，实行保税管理；同时，对保税区也实行较区外相对优惠的政策。</p>' +
      '<p>海外仓发货，是智果为保证用户能在考拉海购买到理想、优质的海外商品，直接与海外认证的供货商或品牌商合作，并在海外仓直接发货至用户手中的模式：避免了源头不清，中间环节转手。我们所有品牌均为海外优质品牌，所有商品由拥有海外企业经营资质及海外企业商家认证的商家提供，100%正品保证。</p>'
      
    },
      {
        title:'2.海关如何收取税费？',
        description :
        '<p>我们储存在保税区仓库及海外仓库里的商品都是跨境贸易进口商品，海外进口商品需要依法向海关申报及纳税。商品适用哪种税率请以购物时的提示为准。</p>'
        +'<h3>跨境电商综合税：</h3>\n' +
        '<p>根据《关于跨境电子商务零售进口税收政策的通知》，跨境电子商务零售进口商品按照货物征收关税和进口环节增值税、消费税，实际交易价格（包括货物零售价格、运费和保险费）作为完税价格。 跨境电子商务零售进口商品的单次交易限值为人民币5000元，个人年度交易限值为人民币26000元。在限值以内进口的跨境电子商务零售进口商品，关税税率暂设为0%；进口环节增值税、消费税取消免征税额，暂按法定应纳税额的70%征收。超过单次限值、累加后超过个人年度限值的单次交易，以及完税价格超过5000元限值的单个不可分割商品，均按照一般贸易方式全额征税。</p>' +
        '<p>海外仓发货的商品如在商品配送期间产生税费，为配合海关征税可能需要您前往当地海关提交身份证件等相关材料，请保留税费单，并联系客服。由此造成的不便，请您理解。</p>'
      },
      {
        title :'3. 订单什么时候发货？大概多久可以收到商品?',
        description:'<p>\n' +
        '保税区发货商品：一般情况下，您的订单将在当天包装出库。海关清关需要2~3工作日的时间，所以您的订单将于3个工作日内送关发货。发货之后，您可以在我的订单中查看物流情况。一般情况下，您将在接下去的1~5工作日内收到这些来自海外的商品。具体时间根据具体收货地址而定。</p>'+
       
          '<p>海外仓发货商品：一般情况下，您的订单将于3个工作日内发出。发出之后，您可以在我的订单中查看物流情况。国际快递公司物流信息可能会有一定延迟，请您谅解。海关清关需要2~3工作日的时间。发货后，您将在接下去的两周内收到这些来自海外的商品。具体时间根据具体商品的收发地址而定。</p> '
        
      },
      {
        title:'4.为什么要进行实名认证？',
        description : '<p>根据《关于跨境电子商务零售进口税收政策的通知》，跨境电子商务零售进口商品购买人（订购人）的身份信息应进行认证；未进行认证的，购买人（订购人）身份信息应与付款人一致。</p>'
      }
      ]
    let newList = list.concat(addList)
    return newList
  }

  // 生成规格列表
  _generateSpecList(specList) {
   if(!specList[0].secondarySpecTypeName){
     specList.forEach(spec => {
       if (spec.isPaymentSoldout == '1'){
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
    this.getSwipperList()
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
      this.state.oldSelectSecondaryIndex = selectIndex
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
      this.state.oldSelectPrimaryIndex = selectIndex
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

    console.log(selectSpec);
    console.log(selectIndex);
    console.log(selectSpecId);

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
      this.setState({
        curSwiperImg : spec.imagePath
      })
    }
    this.setState({
      productSpecList: this.state.productSpecList
    });

    console.log('当前选择规格1');
    console.log(this.state.selectedSpecType);
    console.log(this.state.selectedSpecName);
    console.log(spec)
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
      this._getCurProductId().then(curSpecProductId => {
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
  _getCurProductId() {
    return new Promise((resolve, reject) => {
      let primaryIndex = this.state.oldSelectPrimaryIndex;
      let secondaryIndex = this.state.oldSelectSecondaryIndex;
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
  handleScroll(eleOffsetTop) {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    console.log('滚动高度',eleOffsetTop,scrollTop)
    if (scrollTop >= eleOffsetTop) {
      console.log('fixed');
      this.setState({
        isFixedPos: true
      })
    } else {
      this.setState({
        isFixedPos: false
      })
    }
  };
  continueEnv =(env) => {
    if(env == 'toBuy'){
      // this.props.history.push({
      //   pathname : '/confirmOrder',
      //   search : `?productId=${this.state.curProductId}`,
      //   state : {
      //     productSpecId : this.state.curSpecProductId,
      //     specName : this.state.selectedSpecName,
      //     postType : '0',
      //     productType : this.state.productType,
      //     quantity : this.state.initBuyCount,
      //   }
      // })
      this.props.history.push({
        pathname : '/cart',
        search : `?productId=${this.state.curProductId}`,
        state : {
          productSpecId : this.state.curSpecProductId,
          specName : this.state.selectedSpecName,
          postType : '0',
          productType : this.state.productType,
          quantity : this.state.initBuyCount,
          productTags : this.state.curProduct.productTags,
          storeName : this.state.storeName,
          productName : this.state.productDetails.productName,
          imagePath : this.state.curProduct.imagePath,
          wareHouseName : this.state.wareHouseName,
          wareHouseId : this.state.wareHouseId,
          price : this.state.curPrice||this.state.productDetails.paymentPrice,
          paymentTax:this.state.paymentTax||0
        }
      })
      
    }else{
      let otherParams = {
        productId : this.state.curProductId,
        productSpecId : this.state.curSpecProductId,
        quantity : this.state.initBuyCount,
        type : '1'
      }
      console.log(1111,otherParams)
      _addCart_api(otherParams).then(res => {
        console.log(res)
        if(res.data.code=='1'){
          message.success(res.data.msg)
          // this.flyToCart()
        }else{
          message.error(res.data.msg)
        }
      })
    }
  }
  //购物车飞入动画
  flyToCart =() => {
    let running = false
    this.setState({
      getDom : true,
      running
    })
    console.log('飞出dom----',this.flyItem.current,'目标dom',this.cartDom.current)
    let fly = this.flyItem.current
    let cart = this.cartDom.current
    let btn = this.btnDom.current
    let fly1 = this.flyItem.current.getBoundingClientRect()
    let cart1 = this.cartDom.current.getBoundingClientRect()
    let btn1 = this.btnDom.current.getBoundingClientRect()
    console.log('-------------------',fly,cart)
    //中心点间距
    let offsetX = cart1.left + cart1.width / 2 - (btn1.left + btn1.width / 2);
    let offsetY = cart1.top + cart1.height / 2 - (btn1.top + btn1.height / 2);
    console.log('距离-----------',offsetX,offsetY)
    //页面滚动
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    if(!running){
      //初始位置
      fly.style.display = 'block';
      //触发页面重渲
      console.log(btn.clientWidth)
      // fly.style.left = (btn1.left + scrollLeft + btn.clientWidth / 2) + 'px';
      // fly.style.top = (btn1.top + scrollTop + btn.clientHeight / 2) + 'px';
      // console.log('初始--------',fly.style.left,fly.style.top)
    //  开始
    //   fly.style.transform = 'translateX('+ offsetX +'px)';
    //   fly.style.transform = 'translateY('+ offsetY +'px)';
      fly.style.transform = 'translate('+ offsetX +'px,'+offsetY +'px)';
      console.log('---------------fly',fly)
      running = true;
      let time = setTimeout( () => {
        fly.style.display = 'none';
        fly.style.transform = 'translate('+ 0 +'px,'+ 0 +'px)';
        running = false;
        clearTimeout(time)
      }, 500);
    }
   
  }
  //购买商品和加入购物车
  toBuyEnv =(env) => {
    if(this.state.isSelectedFinish){
      let params = {
        productId : this.state.curProductId,
        productSpecId : this.state.curSpecProductId,
        quantity : this.state.initBuyCount
      }
      checkBuy(params).then(res => {
        console.log('校验结果',res)
        if(res.data.code=='0'){
          message.error(res.data.msg)
        }else{
          this.continueEnv(env)
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
  //生成轮播图列表
  getSwipperList = () => {
    let swipperList = []
    let imgList = []
    let specList = this.state.productSpecList
    specList.forEach(item => {
      if(swipperList.indexOf(item.primarySpecTagId) == -1){
        swipperList.push(item.primarySpecTagId)
        imgList.push({imagePath : item.imagePath})
      }
    })
    let headList = this.state.headImgList
    if(headList&&headList.length>0){
      headList.forEach(item => {
        item.imagePath = item.imageUrl
        imgList.forEach(i => {})
      })
    }
    let newImgList = headList.concat(imgList)
    console.log('---------------------sssssssss',swipperList,imgList,headList)
    this.setState({
      imgList : newImgList
    })
  }
  //选择swiper
  changeSwiper = (index,img) => {
    this.setState({
      swiperIndex : index,
      curSwiperImg : img
    })
    
  }
  //地址改变
  addressChange = (e) => {
    console.log(e)
    this.setState({
      provinceId: e[0]
    },() => {
      this.getPostage()
    })
   
  }
  //运费计算
  getPostage =()=>{
    let provinceId = this.state.provinceVal
    let number = this.state.initBuyCount
    let productId = this.state.curProductId
    let productSpecId = this.state.curSpecProductId || ''
    let params = {
      provinceId,
      number,
      productId,
      productSpecId
    }
    postage(params).then(res => {
      console.log('邮费---',res)
      if(res.data.code=='1'){
        let curPostage = res.data.data
        this.setState({
          curPostage
        })
      }else{
        this.setState({
          curPostage : '运费计算错误'
        })
      }
    })
  }
  // 购买数量 增加
  bindleAdd = () => {
    let curBuyCount = this.state.initBuyCount + 1;
    this.setState({
      initBuyCount: curBuyCount
    },() =>{
      this.getPostage()
    })
  };
  // 购买数量 减少
  bindleReduce = () => {
    let curBuyCount = this.state.initBuyCount - 1;
    if (curBuyCount <= 1) {
      curBuyCount = 1
    }
    this.setState({
      initBuyCount: curBuyCount
    },() => {
      this.getPostage()
    })
  };
  // 购买数量输入
  bindleInput = (e) => {
    console.log(e.target.value);
    let curBuyCount = e.target.value;
    this.setState({
      initBuyCount: curBuyCount - 0
    },() => {
      this.getPostage()
    })
  }
  up =() =>{
    let hotList = this.hotList.current
    hotList.style.transition = 'all 1s'
    let step = 480
    let current = this.state.current
    if(current<=0) return
    console.log(hotList)
    this.setState({
      current : current-step
    },() => {
      hotList.style.marginTop = -this.state.current+'px'
    })
  }
  down =() => {
    let hotList = this.hotList.current
    hotList.style.transition = 'all 1s'
    let step = 480
    let num = 3
    let current = this.state.current
    if(current>=(this.state.hotProductList.length-num)*160) return
    console.log(hotList)
    this.setState({
      current : current+step
    },() => {
      hotList.style.marginTop = -this.state.current+'px'
    })
  }
  showSpecTable = () => {
    this.setState({
      visible : true
    })
    this.getColumns()
    this.getDataSourse()
  }
  getDataSourse = () => {
    let specList = this.state.productSpecList
    console.log('aaaaaa--------------------',specList)
    let newList = []
    specList&&specList.length>0&&
    specList.map((item,index) =>{
      // if(item.productUpc&&item.isPaymentSoldout==='0'){
        newList.push({
          key : index,
          productUpc : item.productUpc,
          productTags : this.state.isSingleProduct==='0'?item.productTags:'单品',
          price : this.state.isLogin==='true'||this.state.isVirtualLogin==='true'?item.price:'登录查看价格',
          paymentStockNumber : item.paymentStockNumber,
          productSku : item.productSku,
          productCode : item.productCode
        })
      // }
    })
    this.setState({
      newList
    })
  
  }
  getColumns = () => {
    const columns = [
      {
      title: '商品条形码',
      dataIndex: 'productUpc',
      key: 'productUpc',
    },
      {
        title: '商品货号',
        dataIndex: 'productCode',
        key: 'productCode',
      },
      {
        title: '商品规格号',
        dataIndex: 'productSku',
        key: 'productSku',
      },
      {
      title: '商品类型',
      dataIndex: 'productTags',
      key: 'productTags',
    },
      {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
      {
        title: '库存',
        dataIndex: 'paymentStockNumber',
        key: 'paymentStockNumber',
      }
      ];
    this.setState({
      columns
    })
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  //小轮播
  toPrev = () =>{
    let swiper = this.smallSwiper.current
    swiper.style.transition = 'all 1s'
    let step = 66
    let num = 5
    let total = this.state.imgList.length
    let now = this.state.now
    console.log(total,now)
    if(now <=0) return
    this.setState({
      now : now-1
    },() =>{
      swiper.style.marginLeft = -this.state.now*step + 'px'
      console.log(22222222)
    })
  }
  toNext = () =>{
    let swiper = this.smallSwiper.current
    swiper.style.transition = 'all 1s'
    let step = 66
    let num = 5
    let total = this.state.imgList.length
    let now = this.state.now
    console.log(total,now)
    if((total - now) <= num) return
    this.setState({
      now : now+1
    },() =>{
      swiper.style.marginLeft = -this.state.now*step + 'px'
      console.log(1111111111111)
    })
  }
  //默认省市区
  defaultList = () =>{
    let cityList,areaList
    let provinceVal = this.state.provinceVal
    let cityVal = this.state.cityVal
    let areaVal = this.state.areaVal
    cityList = this._getCityList(provinceVal)
    this.setState({
      cityList,
    },() =>{
      areaList = this._getAreaList(cityVal)
      this.setState({
        areaList
      },() => {
        this.setState({
          curAreaList : '1'
        })
      })
    })
    
    
  }
  // 省份区域列表
  _getRegionList() {
    let regionList = JSON.parse(window.localStorage.getItem('_regionList_'))
    if(regionList){
      this.setState({
        regionList
      },() => {
        this.setState({
          provinceList: this._getProvinceList()
        },() =>{
          this.defaultList()
        });
      })
      return
    }
    getRegionList().then(res => {
      if (res.data.code !== ERR_OK) {
        console.log('error');
      } else {
        let regionList = res.data.dataList;
        this.setState({
          regionList
        });
        this.setState({
          provinceList: this._getProvinceList()
        });
        window.localStorage.setItem('_regionList_',JSON.stringify(regionList))
      }
    })
  };
  // 省份列表
  _getProvinceList() {
    let provinceList = [];
    if(this.state.regionList&&this.state.regionList.length>0){
      this.state.regionList.forEach((province, index) => {
        let curProvince = {
          areaId: province.areaId,
          areaName: province.areaName
        };
        provinceList.push(curProvince)
      });
    }
    this.setState({
      provinceList
    })
    return provinceList;
  };
  // 城市列表
  _getCityList(curProvinceId) {
    let cityList = [];
    if(this.state.regionList&&this.state.regionList.length>0){
      this.state.regionList.forEach((province, index) => {
        if (province.areaId === curProvinceId) {
          cityList = province.dataList
        }
      });
    }
    console.log('city------------',cityList)
    this.setState({
      cityList,
      curAreaList:'2'
    })
    return cityList;
  };
  // 区域列表
  _getAreaList(curAreaId) {
    let areaList = [];
    this.state.cityList.forEach((area, index) => {
      if (area.areaId === curAreaId) {
        areaList = area.dataList
      }
    });
    this.setState({
      areaList,
      curAreaList : '3'
    })
    return areaList
  };
  // 省份选择
  bindleProvince = (item) => {
    let curProvinceId = item.areaId
    console.log('-----------',curProvinceId)
    this.setState({
      provinceVal: curProvinceId,
      curProvinceName : item.areaName,
      cityVal: null,
      areaVal: null,
      cityList : null,
      areaList : null,
      curCityName : '请选择市'
    })
    this._getCityList(curProvinceId)
  };
  // 城市选择
  bindleCity = (item) => {
    let curCityId = item.areaId
    this.setState({
      cityVal: curCityId,
      curCityName : item.areaName,
      curAreaList : '3',
      areaVal: null,
      curAreaName : '请选择区/县'
    })
   this._getAreaList(curCityId)
  };
  // 区域选择
  bindleArea = (item) => {
    let curAreaId = item.areaId
    this.setState({
      areaVal: curAreaId,
      curAreaName : item.areaName,
    },() => {
      this.getPostage()
      this.getFullAreaName()
    })
  };
  //设置收货地址名字
  getFullAreaName = () =>{
    this.setState({
      fullAreaName : this.state.curProvinceName+this.state.curCityName+this.state.curAreaName
    })
  }
  //tab
  changeCurAreaList =(val) =>{
    this.setState({
      curAreaList : val
    })
  }
  render() {
    let tabBarTitle,type
    if(this.state.productType == '1'){
      tabBarTitle = '国内发货流程'
      type = ' steps typeC'
    }else if(this.state.productType == '2'){
      tabBarTitle = '保税仓发货流程'
      type = 'steps typeB'
    }else if(this.state.productType == '3'){
      tabBarTitle = '海外直邮流程'
      type = 'steps typeA'
    }
    let taxMsg = (
        <p style={{fontSize:'13px',fontWeight:'500'}}>
          总价规则：到手价＝商品成交价格+税费+运费
          <br/>
          中国海关规定进口商品需要缴纳进口税，每个商品因类目不同，有不同的税率。
          <br/>
          进口税＝商品完税价格X税率，完税价格由海关最终认定
        </p>
    )
    
    // 商品轮播图
    const ImgBanner = (
      <div className="leftCont">
        <div className="img-wrapper">
          <div className="slider-wp">
            <div className="carousel">
              <div className="carousel-inner">
                <div className="item">
                  {
                    this.state.imgList&&this.state.imgList.length>0&&
                    <img src={baseImgUrl+this.state.curSwiperImg} alt=""/>
                  }
                </div>
              </div>
            </div>
              <div className="thumb-cnt clearfix">
                <img src={arrLeft} alt="" className='arrow arrLeft' onClick={this.toPrev}/>
                <img src={arrRight} alt="" className='arrow arrRight' onClick={this.toNext}/>
                <div className='ulBox'>
                  <ul className="list clearfix"
                      style={{width:66*this.state.imgList.length+'px'}}
                      ref={this.smallSwiper}
                  
                  >
                    {this.state.imgList.map((item,index) => {
                      return(
                        <li className={index == this.state.swiperIndex? 'lt active' : 'lt'} style={{marginLeft : '10px'}} onClick={ () => this.changeSwiper(index,item.imagePath)}>
                          <img src={baseImgUrl+item.imagePath} alt=""/>
                        </li>
                      )
      
                    })}
                  </ul>
                </div>
              </div>
            <div className='showSpecTable clearfix'>
              <Button type='primary' onClick={this.showSpecTable}>获取商品规格列表</Button>
            </div>
          </div>
        </div>
       
      </div>
    );
    // 商品信息
    const GoodsInfo = (
      !this.state.productDetails ?
        <div className="detail-wrapper"/> :
        <div className="detail-wrapper">
          <div className='detail-main'>
            <div className="title">
              <h3>{this.state.productDetails.productName}</h3>
            </div>
            {
              this.state.isLogin==='true'||this.state.isVirtualLogin==='true'?
                <div className="price-wp" >
                  <div className='price-head'>
                    <span className="p">
                    <em className='title'>售价</em>
                    <em className="price" id="goodPrice">￥{this.state.curPrice?(this.state.curPrice-0).toFixed(2):''}</em>
                      <Popover content={taxMsg}>
                        <span className='taxInfo'>税费信息</span>
                        {/*<i className='fa fa-question-circle' style={{color:'#FE596A'}}></i>*/}
                    </Popover>
                </span>
                  </div>
                  <div className='price-bottom'>
                    <span className="market"><span className='title'>参考价</span><span className='pp'>￥{this.state.priceRecommend?parseInt(this.state.priceRecommend).toFixed(2):''}</span></span>
                    <span className="maoyi">贸易类型:
                       {
                         this.state.productDetails.infoList.map((item, i) =>
                           <em key={i} className='c'>{item.value} </em>
                         )
                       }
                    </span>
                    <span className='tax'>
                  <em className='c'>进口税:</em>
                  预计￥{this.state.paymentTax||'0.00'}
                    </span>
                  </div>
                </div>:
                <div className='mod-gd'>
                  <div className="attr">
                    <div className="label">价格</div>
                    <div className="mod-wrap">
                      <Link className='notLogin' to='/login'>登录后查看价格</Link>
                    </div>
                  </div>
                 
                </div>
            }
            <div className="mod-gd send">
                <div className="attr clearfix" style={{marginBottom:'11px'}}>
                  <div className="label">配送</div>
                  <div className="mod-wrap">
                    <span className='from'>{this.state.wareHouseName||'保税仓'}</span>
                    <span className='pad' style={{marginRight:'10px'}}>至</span>
                    {/*<Cascader defaultValue={["310000","310100","310112"]}*/}
                              {/*options ={this.state.regionList}*/}
                              {/*size='small'*/}
                              {/*fieldNames ={{label:'areaName',value:'areaId',children:'dataList'}}*/}
                              {/*className='cascader'*/}
                              {/*onChange={this.addressChange}*/}
                    {/*/>*/}
                    <div className='area-wrap'>
                      <div className='area-text'>{this.state.fullAreaName}</div>
                      <b className='fa fa-angle-down'></b>
                      <div className='area-content'>
                        <div className='area-tab'>
                          <span
                            className={this.state.curAreaList==='1'?'tab-item cur':"tab-item"}
                            onClick={this.changeCurAreaList.bind(this,'1')}
                          >
                            <em>{this.state.curProvinceName}</em>
                            <i className='fa fa-angle-down'></i>
                          </span>
                          {
                            this.state.cityList&&this.state.cityList.length>0&&
                            <span
                              className={this.state.curAreaList==='2'?'tab-item cur':"tab-item"}
                              onClick={this.changeCurAreaList.bind(this,'2')}
                            >
                            <em>{this.state.curCityName}</em>
                            <i className='fa fa-angle-down'></i>
                          </span>
                          }
                          {
                           this.state.areaList&&this.state.areaList.length>0&&
                           <span
                             className={this.state.curAreaList==='3'?'tab-item cur':"tab-item"}
                             onClick={this.changeCurAreaList.bind(this,'3')}
                           >
                            <em>{this.state.curAreaName}</em>
                            <i className='fa fa-angle-down'></i>
                          </span>
                          }
                        </div>
                        <div className='area-list'>
                          <ul className='area-ul'>
                            {
                              this.state.curAreaList==='1'
                              &&this.state.provinceList
                              &&this.state.provinceList.length>0
                              &&
                                this.state.provinceList.map(item =>
                                  <li
                                    className={this.state.provinceVal===item.areaId?
                                      'area-item active':'area-item'}
                                    onClick={this.bindleProvince.bind(this,item)}
                                  >
                                    {item.areaName}
                                  </li>
                                )
                            }
                            {
                              this.state.curAreaList==='2'
                              &&this.state.cityList
                              &&this.state.cityList.length>0&&
                                this.state.cityList.map(item =>
                                  <li
                                    className={this.state.cityVal===item.areaId?'area-item active':'area-item'}
                                    onClick={this.bindleCity.bind(this,item)}
                                  
                                  >
                                    {item.areaName}
                                  </li>
                                )
                            }
                            {
                              this.state.curAreaList==='3'
                              &&this.state.areaList
                              &&this.state.areaList.length>0&&
                              this.state.areaList.map(item =>
                                <li
                                  className={this.state.areaVal===item.areaId?'area-item active':'area-item'}
                                  onClick={this.bindleArea.bind(this,item)}
                                >
                                  {item.areaName}
                                </li>
                              )
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="mod-gd">
                <div className="attr clearfix">
                  <div className="label">运费</div>
                  <div className="mod-wrap">
                    {(this.state.curPostage-0).toFixed(2)}元
                  </div>
                </div>
              </div>
            <div className="mod-gd" aaa={this.state.selectSpecType[0]+'&&'+this.state.selectSpecType[1]}>
              <div className="attr">
                <div className="label">库存</div>
                <div className="mod-wrap">
                <span>
                  {
                    this.state.curSpecStockNumber === undefined?
                      this.state.productDetails.paymentStockNumber
                      :
                      this.state.curSpecStockNumber
                  }
                  </span>
                </div>
              </div>
            </div>
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
            <div className="mod-gd numberBox">
              <div className="attr">
                <div className="label" style={{paddingTop:'8px'}}>数量</div>
                <div className="mod-wrap">
                  <div className="buyNum clearfix">
                    <div className="inputBox">
                      <span className="handle" onClick={this.bindleReduce}><i className='fa fa-minus'></i></span>
                      <input className="form-control count" type="text"
                             value={this.state.initBuyCount}
                             onInput={this.bindleInput}
                             />
                      <span className="handle" onClick={this.bindleAdd}><i className='fa fa-plus'></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opt">
              <div className="toshop" onClick={() => this.toBuyEnv('toCart')} ref={this.btnDom}>
                加入购物车
                <div className='fly-item' ref={this.flyItem}>
                  <img src={baseImgUrl+this.state.curGoodImg} alt=""/>
                </div>
              </div>
              <div className="tostore" onClick={() => this.toBuyEnv('toBuy')}>立即购买</div>
            </div>
          </div>
          <div className='Promotion'>
            <div className='pro-title'>
              <span className='line'></span>
              <span className='name'>热销商品</span>
              <span className='line'></span>
            </div>
            {/*<div className={this.state.isSingleProduct==='1'?'small-List pro-List':'pro-List'}>*/}
            <div className='pro-List'>
              <ul className='hot-box' ref={this.hotList}>
                {
                  this.state.hotProductList&&this.state.hotProductList.length>0&&
                    this.state.hotProductList.map((item,i) => {
                    return(
                      <li className='hot-item'>
                        <Link to={`/goods?productId=${item.productId}`} target='_blank'>
                          <img src={baseImgUrl+item.imagePath} alt="" className='hot-img'/>
                          <div className='hot-name'>
                            <div className='hot-price'>
                              {
                                this.state.isLogin==='true'||this.state.isVirtualLogin==='true'?
                                  <span>{item.price?(item.price-0).toFixed(2):''}</span>
                                  :<span style={{color:'#c40000'}}>登录后查看价格</span>
                              }
                            </div>
                            <div className='hot-info'>{item.productName}</div>
                          </div>
                        </Link>
                      </li>
                    )
                    })
                }
              
              </ul>
            </div>
            <div className='sort-box'>
              <i className='fa fa-angle-down sort' onClick={this.down}></i>
              <i className='fa fa-angle-up sort' onClick={this.up}></i>
            </div>
          </div>
        </div>
    );

    // 商品说明-购买流程
    const LC = (
      <div className="step lc" ref="lc" id='lc'>
        <div className="title-wrap">
          <h4>{tabBarTitle}</h4>
          <div className="mult-title">
            <ul className="clearfix">
              <li>
                <span className="hy">icon</span>海外货源
              </li>
              <li>
                <span className="zp">icon</span>正品直邮
              </li>
              <li>
                <span className="sd">icon</span>速度保证
              </li>
            </ul>
          </div>
        </div>
        <div className="detail">
          <div className="img-wrap">
            <div className="img"/>
          </div>
        </div>
      </div>
    );

    // 商品说明-商品信息
    // const GI = (
    //  !this.state.productDetails? null :
    //    <div className="step gi" id='gier'>
    //      <div className="second-title-wrap">
    //        <h4>商品信息 <span/></h4>
    //      </div>
    //      <div className="detail clearfix">
    //        <div className="textInfo">
    //          <ul>
    //            <li>
    //              <span>商品名称：</span>
    //              {this.state.productDetails.productName}
    //            </li>
    //            <li>
    //              <span>品牌：</span>
    //              {this.state.productDetails.brandName}
    //            </li>
    //          </ul>
    //        </div>
    //        <div className="imgInfo">
    //          <div className="imgWrap">
    //            <img className="thumbnail" src={baseUrl+this.state.headImgList[0].imageUrl} alt=""/>
    //          </div>
    //        </div>
    //      </div>
    //    </div>
    // );
    // 商品说明-实拍
    const SP = (
      !this.state.productDesc?null :
        <div className="step sp" id='sper'>
          <div className="second-title-wrap">
            <h4>商品详情<span/></h4>
          </div>
          <div className="detail">
            <div className="imgList">
              {/*<ul>*/}
                {/*{this.state.productDesc.map((item,index) => {*/}
                  {/*return (*/}
                    {/*<li  key={index}>*/}
                      {/*<img src={baseUrl+item.src} alt=""/>*/}
                    {/*</li>*/}
                  {/*)*/}
                {/*})}*/}
              {/*</ul>*/}
              <div dangerouslySetInnerHTML={{
                __html:this.state.productDesc
              }}></div>
            </div>
          </div>
        </div>
    );

    // 商品说明-购买须知setState
    const XZ = (
      <div className="step sz" id='xz'>
        <div className="second-title-wrap">
          <h4>购买须知 <span/></h4>
        </div>
        <div className="detail">
          <ul className="questionList">
            {
              this.state.purchaseDoubtList && this.state.purchaseDoubtList.length>0&&
              this.state.purchaseDoubtList.map((item, i) =>
                <li className={this.state.QAIndex === i ? 'active' : ''}
                    key={i}
                    onClick={() => {
                      if (i === this.state.QAIndex) {
                        this.setState({
                          QAIndex: -1
                        })
                      } else {
                        this.setState({
                          QAIndex: i
                        })
                      }
                    }}>
                  <div className="title">
                    {item.title}
                    {
                      this.state.QAIndex === i?
                        <i className="fa fa-chevron-up"/>
                        :
                        <i className="fa fa-chevron-down"/>
                    }
                    
                  </div>
                  <div className="answer" dangerouslySetInnerHTML={{
                    __html : item.description
                  }}></div>
                </li>
              )
            }
          </ul>
          <div className="innerDesc" style={{minHeight:'130px'}}>
            {
              this.state.productInfoList&&this.state.productInfoList.length > 0&&
              <h4 className="innerTitle">购买须知：</h4>
            }
            
            <ul>
              {
                this.state.productInfoList&&this.state.productInfoList.length > 0 &&
                  this.state.productInfoList.map((item,index) => {
                    return (
                      <li>
                        <p>{index+1}){item.introduction}</p>
                      </li>
                    )
                  })
              }
            </ul>
          </div>
        </div>
      </div>
    );

    // 商品说明
    const GoodsExplain = (
      <div className="step-detail">
        {LC}
        {SP}
        {XZ}
      </div>
    );

    // 导航
    const innerNavTabs = [
      {
        name : '购买流程',
        href : '#lc'
      },
      {
        name : '商品详情',
        href : '#sper'
      },
      {
        name : 'FAQ',
        href : '#xz'
      }
    ];
    return (
      <div className="goods-page">
          <Modal
            title="商品规格列表"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={false}
            width={800}
          >
            <Table
              dataSource={this.state.newList}
              columns={this.state.columns}
              pagination ={false}
              bordered={true}
            >
            </Table>
          </Modal>
          <IHeader userInfo={this.state.userInfo} fresh={this.state.freshHeader}/>
          <HomeHeader navIndex={0} isHome={false}/>
        <Spin spinning={this.state.showLoading}>
          <div className="page-box minW">
            <div className="page-container">
              <div className="cont-wrap">
                <div className="detailBox">
                  <div className="detail-meta clearfix">
                    {ImgBanner}
                    {GoodsInfo}
                  </div>
                  {
                    this.state.productDesc!==undefined?
                      <div className={type} ref={this.steps}>
                        <div className="step-nav">
                          <div className={this.state.isFixedPos ? 'n fixed' : 'n'}>
                            <ul className="nav-tabs clearfix">
                              {
                                innerNavTabs.map((item, i) =>
                                  <li className={this.state.innerTabIndex === i ? 'active' : ''}
                                      key={i}
                                  >
                                    <a href={item.href} onClick={() => {this.setState({innerTabIndex:i})}}>{item.name}</a>
                                  </li>
                                )
                              }
                            </ul>
                          </div>
                        </div>
                        {GoodsExplain}
                      </div>:null
                  }
                </div>
              </div>
            </div>
          </div>
        </Spin>
          <PageFooter/>
          {/*<HandleBar submitCartDom={thisflygetCartDom} data={this.state.getDom}/>*/}
      </div>
    )
  }
}