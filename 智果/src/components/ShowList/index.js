import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getCookie, getValForKey } from '../../utils/utils';
import './index.less';
import { Pagination, Spin, Card , Popconfirm, message } from 'antd';
import { userProductList, delCollect } from '../../axios/api'
import { ERR_OK } from "../../axios/config";
import { baseUrl,baseImgUrl } from '../../axios/api'

export default class ShowList extends React.Component {
    constructor(props) {
        super(props)
        // console.log('传入的type值是',this.props)
    }

    componentWillMount() {

        console.log(this.props)
        // if (this.props.type) {
        //     if (this.props.type == 1) {
                this._getuserProductList()
        //     }
        // }
        // let keytype = window.sessionStorage.getItem('__checktype__')
        // console.log(keytype)
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
        productId:'',
    }

    //获取视口和图片度进行懒加载
    // getImgDistance = () => {
    //     let goodsList = this.state.goodsList
    //     let vpHeight = document.documentElement.clientHeight
    //     if (!this.state.showLoading) {
    //         goodsList.forEach(item => {
    //             let { top } = item.myRef.current.getBoundingClientRect()
    //             if (top <= vpHeight) {
    //                 item.showImg = true
    //             }
    //         })
    //     }
    //     this.setState({
    //         goodsList
    //     })
    // }

    // 浏览记录和收藏列表
    _getuserProductList() {
        let params = {
            type: 1
        }
        userProductList(params).then(res => {
            if (res.data.code == 1) {
                console.log(res)
                this.setState({
                    goodsList: res.data.data
                })
                // res.data.data.forEach(item => {
                //     let myRef = React.createRef()
                //     item.myRef = myRef
                //     item.showImg = false
                // })
            } else {
                console.log('接口失败')
            }
        })
    }

    // 浏览过商品
    _getoldList() {
        let params = {
            type: 0
        }
        userProductList(params).then(res => {
            if (res.data.code == 1) {
                console.log(res)
                this.setState({
                    goodsList: res.data.data
                })
            } else {
                console.log('接口失败')
            }
        })
    }

    //热销商品数据
    _hotProduct() {
        
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

    confirm =(e) =>{
        let _this =this
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
        // message.error('C');
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
                                    to={{
                                        pathname: '/goods',
                                        search: `?productId=${goods.productId}`
                                    }}
                                    className="goods-img"
                                    target="_blank"
                                >
                                    {
                                        // goods.showImg &&
                                        <img src={baseImgUrl + goods.imagePath} />
                                    }
                                </Link>
                            </div>
                            <div className="goods-title">
                                <span>{goods.productName}</span>
                            </div>
                            <div className="goods-info">
                                <div className="after-tax">
                                    <span className="price">￥{goods.price?(goods.price-0).toFixed(2):''}</span>
                                </div>
                            </div>
                            <div className='more-opt'>
                                {/* <span className={goods.isCollected === '1' ? 'collect active' : 'collect'} onClick={() => this.colletEnv(goods.isCollected, goods.productId)}>
                                    <i className='icon-collect'></i>
                                    <em>收藏</em>
                                </span> */}
                                <span className={goods.isCollected === '1' ? 'collect' : 'collect active'} onClick={() => this.colletEnv( goods.productId)}>
                                    <i className='icon-collect'></i>
                                    <Popconfirm title="确定取消收藏吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="取消收藏" cancelText="我再想想">
                                        {/* <a href="#">Delete</a> */}
                                        <em>取消收藏</em>
                                    </Popconfirm>
                                    
                                </span>
                                {/* 添加购物车 */}
                                {/* <span className='to-cart'>
                                </span> */}
                            </div>
                        </div>
                    </li>
                )
        );
        return (
          <div className="showList-container">
              <div className="goods-lists">
                  <ul className="list-items">{Goods}</ul>
                {
                  // this.state.goodsList && this.state.goodsList.length > 0 &&
                  // <Pagination
                  //     defaultCurrent={this.state.defaultCurrent}
                  //     current={this.state.currentPage}
                  //     pageSize={this.state.pageSize}
                  //     total={this.state.dataTotal}
                  //     showQuickJumper={true}
                  //     onShowSizeChange={this.pageSizeChange}
                  //     onChange={this.pageChange}
                  //     hideOnSinglePage={true}
                  // />
                }
    
              </div>
          </div>
        )
    }
}