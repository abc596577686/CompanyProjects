import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import './index.less';
import logo1 from '../../resource/assets/images/zhiguo@2x.png'
import {getValForKey} from "../../utils/utils";
import ProcessItem from '../../components/Progress'
import imgLogo1 from '../../resource/assets/images/imgLogo1.png'
import imgLogo2 from '../../resource/assets/images/imgLogo2.png'
import imgLogo3 from '../../resource/assets/images/imgLogo3.png'
export default class HomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      keyword: '',
      navIndex : 0,
      navList : [
        // {
        //   name: '商品',
        //   url: '/search'
        // },
        // {
        //   name: '订单',
        //   url: '/order'
        // },
        // {
        //   name: '客户',
        //   url: '/customer'
        // },
        // {
        //   name: '账户',
        //   url: '/account'
        // },
        {
          name: '同步',
          url: '/syncList'
        }
      ],
      processList : [
        '查看商品',
        '拍下商品',
        '付款',
        '购买完成'
      ],
      pageIdx : '1',
      homeList : [
        '首页',
        '保税直供',
        '海外直邮'
      ],
      redirect:false,
      redirect2:false,
      redirect3:false,
      status : 2
    };
  }
  getHomeInfo =()=>{
    let keyWordList
    let categoryList
    if(localStorage.getItem('__keyword__')
      &&localStorage.getItem('__categoryList__')
      &&localStorage.getItem('__categoryList__').length>0
    ){
      keyWordList = JSON.parse(window.localStorage.getItem('__keyword__'))
      categoryList = JSON.parse(localStorage.getItem('__categoryList__')).splice(1)
    }
    this.setState({
      keyWordList,
      categoryList,
    },() =>{
      if(this.state.keyWordList&&this.state.categoryList){
        clearInterval(this.timer)
      }
    })
  }
  componentWillMount() {
    console.log(this.props)
    let keyword
    let pageIdx
    if(!localStorage.getItem('__keyword__')||!localStorage.getItem('__categoryList__')){
      this.timer = setInterval(() => {
        console.log('定时任务启动了')
        this.getHomeInfo()
      },1000)
    }else{
      this.getHomeInfo()
    }
    if(window.location.search.indexOf('keyword')>0){
      keyword = getValForKey(decodeURIComponent(window.location.search),'keyword')
    }else{
      keyword = ''
    }
    if(window.location.search.indexOf('productType')>0){
      pageIdx = getValForKey(decodeURIComponent(window.location.search),'productType')
    }else{
      pageIdx = ''
    }
    console.log('关键字',keyword)
    // console.log('热词列表',keyWordList)
    // console.log('列表',categoryList)
    this.setState({
      keyword,
      pageIdx
    })
    //重定向时初始化父组件
    if(pageIdx){
      this.triggerType(pageIdx)
    }
    if(keyword){
      this.hotSearch(keyword)
    }
  };
  componentWillReceiveProps(nextProps){
    // this.setState({
    //   categoryList : nextProps.data,
    //   keyWordList : nextProps.keyWordList||this.state.keyWordList
    // })
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  bindleKeywordChange = (e) => {
    let keyword = e.target.value;
    this.setState({
      keyword
    });
  };
  // 关键词搜索
  keywordSearch = () => {
    if(this.props.isHome){
      this.props.triggerSearch(this.state.keyword)
    }else{
      this.setState({
        redirect : true
      })
    }
  };
  //类型切换
  triggerType = (val) =>{
    console.log(1111111,val)
    this.setState({
      pageIdx : val
    })
    if(this.props.isHome){
      this.props.changeType(val)
    }else{
      this.setState({
        redirect2 : true
      })
    }
   
  }
  //热词搜索
  hotSearch =(item) => {
    this.setState({
      keyword : item
    })
    if(this.props.isHome){
      this.props.triggerSearch(item)
    }else{
      this.setState({
        redirect : true
      })
    }
  }
  //类型搜索
  searchCate = (item) => {
    if(this.props.isHome){
      this.props.submitCate(item)
    }else{
      this.setState({
        redirect1 : true,
        item
      })
    }
  }
  //购物流程
  renderProcess = () => {
    return (this.state.processList.map((item,index) => {
      return <ProcessItem data={item} length={this.state.processList.length} step={this.props.buyStatus} index={index} key={index}/>
    }))
  }
  render() {
    //顶部LOGO
    const TopLogo = (
      <div className="page-logo">
        <div className='logoer logo1'>
          <Link to="/">
            <img src={logo1} alt=""/>
          </Link>
        </div>
      </div>
    );
    // 右侧搜索区域
    const RightSearchArea = (
      <div>
        <i className="fa fa-search"/>
        <div className="searchWrap">
          <div className="searchBox">
            <div className='search-box'>
              <input type="text" className="searchInput" placeholder="请输入商品名称"
                     value={this.state.keyword}
                     onChange={this.bindleKeywordChange}
              />
            </div>
           
          </div>
          <div className="searchBtn" onClick={this.keywordSearch}>搜索</div>
        </div>
      </div>
    );
    //关键词搜索
    const KeyWordSearch = (
      <div className="search-hot">
        {
          this.state.keyWordList&&this.state.keyWordList.length ?
            this.state.keyWordList.map((item, i) =>
              <span className="search-hot-item" key={i}>
                 <a href="javascript:void(0);" onClick={this.hotSearch.bind(this,item)}>{item}</a>
                </span>
            ):<span className="search-hot-item"></span>
        }
      </div>
    );

    //下拉菜单
    const DropdownMenu = (
      <ul className="dropdown-menu">
        {
          this.state.categoryList&&this.state.categoryList.length>0 ?
            this.state.categoryList.map((item, i) =>
                <li key={i}>
                  <a href="javascript:void(0);" onClick={() => this.searchCate(item)}>{item.name}</a>
                </li>
            ):null
        }
      </ul>
    );
    //首页导航菜单
    const NavMenus = (
      <ul className="navList">
        <li className="dropdown">
          <div className="dropdown-top">所有分类</div>
          {DropdownMenu}
        </li>
        <li onClick={this.triggerType.bind(this,'1')} className={this.state.pageIdx==='1'?'active home-item':'' }>
          <a href="javascript:void (0)">首页</a>
        </li>
        {/*<li onClick={this.fresh} className={this.state.pageIdx==='1'?'active home-item':'' }>*/}
          {/*<a href="javascript:void (0)">首页</a>*/}
        {/*</li>*/}
        <li onClick={this.triggerType.bind(this,'2')} className={this.state.pageIdx==='2'?'active home-item':'' }>
          <a href="javascript:void (0)">保税直购</a>
        </li>
        <li onClick={this.triggerType.bind(this,'3')} className={this.state.pageIdx==='3'?'active home-item':'' }>
          <a href="javascript:void (0)">海外直邮</a>
        </li>
      </ul>
    );
    //tabBar导航菜单
    const TabBarMenus = (
      <ul className="navList">
        {
          this.state.navList.map((item,index) => {
            return(
              <li className={this.props.navIndex == index ?'active nav-item':'nav-item'} key={index}>
                <Link to={item.url}><span className='nav-title'>{item.name}</span></Link>
              </li>
            )
          })
        }
      </ul>
    );
    //进度条
    const processList = (
      <div className='flowstep'>
        <ul className='step_ul clearfix'>
          {
            this.state.status&&
            this.renderProcess()
          }
        </ul>
      </div>
    )
    return (
      <div className="homeHeader">
        {
          this.state.redirect&&
          <Redirect to={`/index?keyword=${this.state.keyword}`}/>
        }
        {
          this.state.redirect1&&
          <Redirect to={{
            pathname : '/index',
            search : `?categoryId=${this.state.item.categoryId}`,
            state:{name : this.state.item.name}
            
          }}/>
        }
        {
          this.state.redirect2&&
          <Redirect to={`/index?productType=${this.state.pageIdx}`}/>
        }
        <div className="hh-container">
          {TopLogo}
          {
            this.props.isBuyStatus?
              <div className='pro-list'>
                {
                  processList
                }
              </div>
              :
              <div>
                <div className="hh-search">
                  <div className="gds-search">
                    {RightSearchArea}
                    {KeyWordSearch}
                  </div>
                </div>
                <div className='img-right'>
                  <ul>
                    <li className='right-item'><img src={imgLogo1} alt="" className='logo-img'/></li>
                    <li className='right-item'><img src={imgLogo2} alt="" className='logo-img'/></li>
                    <li className='right-item'><img src={imgLogo3} alt="" className='logo-img'/></li>
                  </ul>
                </div>
              </div>
          }
        </div>
        <div className="navWrapper">
          <div className="navBox">
            {
              !this.props.isBuyStatus&&
              NavMenus
            }
          </div>
        </div>
        {/*{*/}
          {/*<div className="navWrapper">*/}
            {/*<div className="navBox">*/}
              {/*{NavMenus}*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*}*/}
      </div>
    );
  }
}
