import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getCookie, getValForKey } from '../../utils/utils';
import './index.less';
import { Pagination, Spin, Card , Popconfirm, message, Tabs } from 'antd';
import { userProductList, delCollect, hotSaleProductList } from '../../axios/api'
import { ERR_OK } from "../../axios/config";
import { baseUrl,baseImgUrl } from '../../axios/api'

const TabPane = Tabs.TabPane;

export default class SessionList extends React.Component {
  constructor(props) {
    super(props)
    // console.log('传入的type值是',this.props)
  }
  
  componentWillMount() {
    this._getoldList()
    this._hotProduct()
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  
  // render之后
  componentDidMount() {
    window.addEventListener('scroll', this.getImgDistance)
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getImgDistance)
  }
  
  state = {
    goodsList: [],
    goodsLists: [],
    productId: '',
    loadOver: false,
    listType: 0,  // 0收藏浏览   1热门
  }
  
  // 浏览过商品
  _getoldList() {
    let params = {
      type: 0,
      pagesize: 15
    }
    userProductList(params).then(res => {
      if (res.data.code == 1) {
        console.log(res)
        this.setState({
          goodsList: res.data.data,
          listType: 0,
          loadOver: true
        })
      } else {
        console.log('接口失败')
      }
    })
  }
  
  //热销商品数据
  _hotProduct() {
    hotSaleProductList().then(res => {
      if (res.data.code == 1) {
        console.log(res)
        this.setState({
          goodsLists: res.data.data,
          listType: 1,
          loadOver: true
        })
      } else {
        console.log('接口失败')
      }
    })
  }
  
  // 取消收藏
  colletEnv = (a) => {
    // let isCollected = a
    let productId = a
    console.log(productId)
    this.setState({
      productId: productId
    })
  }
  confirm = (e) => {
    let _this = this
    console.log(e);
    let productId = _this.state.productId
    let params = {
      productId: productId
    }
    console.log(params)
    delCollect(params).then(res => {
      if (res.data.code == 1) {
        console.log(res)
        message.success('已取消收藏');
        // 刷新列表
        this._getuserProductList()
      } else {
        console.log('接口失败')
        message.warning(res.data.msg);
      }
    })
  }
  
  cancel(e) {
    console.log(e);
  }
  
  callback = (key) => {
    // this.setState({
    // goodsList: [],
    // loadOver : false
    // })
    // console.log(key)
    // if (key == 1) {
    // this._getoldList()
    // }else if(key == 2){
    // this._hotProduct()
    // }
  }
  
  render() {
    //商品
    const Goods = (
      !this.state.goodsList.length ? <li className="goodsNull">暂无此类商品</li> :
        this.state.goodsList.map((goods, i) =>
          <li className="item" key={i} ref={this.state.goodsList[i].productId}>
              <div className='item-box'>
                  <div className="goods">
                      <Link
                        to={`goods?productId=${goods.productId}`}
                        className="goods-img"
                        target="_blank"
                      >
                        {
                            <img src={baseImgUrl + goods.imagePath}/>
                        }
                      </Link>
                  </div>
                  <div className="goods-title">
                      <span>{goods.productName}</span>
                  </div>
                  <div className="after-tax">
                      <span className="price">￥{goods.price ? (goods.price - 0).toFixed(2) : ''}</span>
                  </div>
              </div>
          </li>
        )
    );
    const Goodss = (
      !this.state.goodsLists.length ? <li className="goodsNull">暂无此类商品</li> :
        this.state.goodsLists.map((goods, i) =>
          <li className="item" key={i} ref={this.state.goodsLists[i].productId}>
              <div className='item-box'>
                  <div className="goods">
                      <Link
                        to={`goods?productId=${goods.productId}`}
                        className="goods-img"
                        target="_blank"
                      >
                        {
                            <img src={baseImgUrl + goods.imagePath}/>
                        }
                      </Link>
                  </div>
                  <div className="goods-title">
                      <span>{goods.productName}</span>
                  </div>
                  <div className="after-tax">
                      <span className="price">￥{goods.price ? (goods.price - 0).toFixed(2) : ''}</span>
                  </div>
              </div>
          </li>
        )
    );
    
    
    return (
      
      <div className='goodList-container'>
          <div className="goods-lists keyless">
              <Spin spinning={!this.state.loadOver} delay={200}>
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                      
                      <TabPane tab="浏览过的" key="1" forceRender={false}>
                          <ul className="list-items">{Goods}</ul>
                      </TabPane>
                      <TabPane tab="热销商品" key="2" forceRender={false}>
                          <ul className="list-items">{Goodss}</ul>
                      </TabPane>
                  
                  </Tabs>
              </Spin>
          </div>
      </div>
    
    )
  }
}