import React from 'react'
import {Menu, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import menuConfig from "../../config/menuConfig";
import {connect} from 'react-redux';
import './index.less'
// import { menuTree } from '../../axios/api'

const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
  state = {
    currentKey: '',
    collapsed: true,
    openKeys: [],
    selectedKeys: [],
    rootSubmenuKeys: [],
    defaultSelectedKeys: [],
  };

  componentWillMount() {
    this.getMenuTreeList()
  };
  //获取本地菜单
  getLocalMenu = () =>{
    if (localStorage.getItem('_menulist_')) {
      const menulist = localStorage.getItem('_menulist_')
      let menulists = JSON.parse(menulist)
      const menuTreeNode = this.renderMenu(menulists);
      this.setState({
        menuTreeNode
      })
      return true
    } else {
      console.log('nolist')
      return false
    }
  }

  getMenuTreeList = () => {
    if (this.getLocalMenu()) return
    
    // this.getLocalMenu()
    // 获取左侧菜单
    // menuTree().then(res => {
    //   console.log(res)
    //   if (res.data.code === '1' && res.data.data.length > 0) {
    //     const menuTreeNode = this.renderMenu(res.data.data);
    //     localStorage.setItem('_menulist_',JSON.stringify(res.data.data))
    //     this.setState({
    //       menuTreeNode
    //     })
    //   }
    // })
    
    // 写死左侧菜单
    // this.setState({
    //   menuTreeNode:MenuConfig
    // })

    // const menulist = this.renderMenu(menuConfig)
    // this.setState({
    //   menuTreeNode: menulist
    // })
  }

  // 多级菜单打开收起时
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  // 菜单渲染
  renderMenu = (data) => {
    if(data&&data.length>0){
      return data.map((item, i) => {
        if (item.children) {
          return (
            <SubMenu key={'sub' + i} title={
              <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
            }>
              {
                item.children.map((subItem, j) => {
                    if (subItem.children && subItem.children.length>0) {
                      return (
                        <SubMenu key={'sub' + i + '_' + j} title={
                          <span>
                      <span>{subItem.title}</span>
                    </span>
                        }>
                          {
                            subItem.children.map((innerItem, k) =>
                              <Menu.Item title={innerItem.title} key={'sub' + i + '_' + j + '_' + k}>
                                <NavLink to={innerItem.url}>{innerItem.title}</NavLink>
                              </Menu.Item>
                            )
                          }
                        </SubMenu>
                      )
                    } else {
                      return (
                        <Menu.Item title={subItem.title} key={'sub' + i + '_' + j}>
                          <NavLink to={subItem.url}>{subItem.title}</NavLink>
                        </Menu.Item>
                      )
                    }
                  }
                )
              }
            </SubMenu>
          )
        } else {
          return <Menu.Item title={item.title} key={'sub' + i}>
            <NavLink to={item.url}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </NavLink>
          </Menu.Item>
        }
      })
    }
  };

  render() {
    return <Menu
      theme="dark"
      mode="inline"
      onOpenChange={this.onOpenChange}
      inlineCollapsed={this.state.collapsed}>
      {this.state.menuTreeNode}
    </Menu>
  }
}

export default connect()(NavLeft);