import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import './index.less';

export default class HeaderNavbar extends React.Component {
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    navIndex: -1,
    placeholder: "请输入商品关键词",
  };
  state ={
    hidden : true
  }
  componentDidMount(){
    let hidden = this.props.data == 'trad'?false:true
    this.setState({
      hidden : hidden
    })
  }

  state = {
    keywordVal: '',
    redirect:false
  };

  componentWillMount() {
    console.log('willMount',this.props);
    this.setState({
      keywordSearch: this.props.keywordSearch,
      // keywordVal: this.props.placeholder,
    })
  };

  bindleKeyword = (e) => {
    console.log(e.target.value);
    let keywordVal = e.target.value;
    this.setState({
      keywordVal
    })
  };

  // 关键词搜索
  keywordSearch = () => {
    
    if(this.props.navIndex=='0'){
      this.props.triggerSearch(this.state.keywordVal)
    }else{
      this.setState({
        redirect : true
      })
    }
  };
  changeIndex =(i) => {
    this.setState({
      curIndex : i
    })
  }

  render() {
    const navList = [
      {
        name: '商品',
        url: '/search'
      },
      {
        name: '订单',
        url: '/order'
      },
      {
        name: '客户',
        url: '/customer'
      },
      {
        name: '账户',
        url: '/account'
      }
    ];
   
    return (
      <div className="headerNavbar minW">
        {
          this.state.redirect&&
            <Redirect to={`/search?keyword=${this.state.keywordVal}`}/>
        }
        <div className="hd_container">
          <div className="page-logo">
            <Link to="/" className="imgWrap">
              {/* <img src={logo} alt=""/> */}
            </Link>
          </div>
          {this.state.hidden&&
          <div className="navbar">
            <ul className="navbarBox">
              {
                navList.map((nav, i) =>
                  <li className={this.props.navIndex === i ? 'active' : ''} key={i} onClick={()=>this.changeIndex(i)}>
                    <Link to={nav.url}>{nav.name}</Link>
                  </li>
                )
              }
            </ul>
          </div>
          }
          <div className="searchWrap">
            <div className="formBox">
              <div className="formGroup">
                <input className="form-control input searchInput"
                   placeholder={this.props.placeholder}
                   value={this.state.keywordVal}
                   onChange={this.bindleKeyword}
                />
              </div>
              <div className="btn searchBtn" onClick={this.keywordSearch}>搜索</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
