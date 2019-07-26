import React from 'react'
import {Breadcrumb} from 'antd';
import PropTypes from "prop-types";
// import MenuConfig from "../../config/menuConfig";
import './index.less'

class BreadcrumbCustom extends React.Component {
  //利用PropTypes记住所跳转每个页面的位置
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      pathSnippets: null,
      extraBreadcrumbItems: null
    }
  }

  getPath(){
    let MenuConfig
    if (localStorage.getItem('_menulist_')) {
      const menulist = localStorage.getItem('_menulist_')
      MenuConfig = JSON.parse(menulist)
    }
      
    let urlPath = this.context.router.history.location.pathname;
    let namePaths = [];
      MenuConfig && MenuConfig.length>0 &&
      MenuConfig.map((item, i) => {
      if(item.url == urlPath){
        namePaths.push({title: item.title, url: item.url});
        return;
      }

      if (item.children) {
        item.children.map((subItem, j) => {
          if(subItem.url == urlPath){
            namePaths.push({title: item.title, url: item.url});
            namePaths.push({title: subItem.title, url: subItem.url});
            return;
          }

          if (subItem.children) {
            subItem.children.map((childSubItem, j) => {
                if(childSubItem.url == urlPath){
                  namePaths.push({title: item.title, url: item.url});
                  namePaths.push({title: subItem.title, url: subItem.url});
                  namePaths.push({title: childSubItem.title, url: childSubItem.url});
                  return;
                }
            })
          }
        })
      }
    });

    if(namePaths != null && namePaths.length > 0){
      this.state.extraBreadcrumbItems = namePaths.map((item, index) => {
        return (<Breadcrumb.Item className="breadcrumb-header" key={item.title}>{item.title}</Breadcrumb.Item>);
      });
    }
  }

  componentWillMount() {
    this.getPath();
  }

  componentWillReceiveProps() {
    this.getPath();
  }

  render() {
    return (
      <span className="breadcrumb">
        <Breadcrumb separator=">" style={{margin: '12px 0'}}>
          {this.state.extraBreadcrumbItems}
        </Breadcrumb>
      </span>
    )
  }
}

export default BreadcrumbCustom;