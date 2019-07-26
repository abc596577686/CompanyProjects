import React from 'react';
import {Tabs,message} from 'antd';
import './index.less';
import {ProductListComponent} from './productList';
import {ProductFormComponent} from './productForm';
import {substring} from "../../../utils/utils";
const TabPane = Tabs.TabPane;
export default class Goods extends React.Component {
  constructor(props) {
    super(props);

    this.newTabIndex = 0;
    const panes = [{
      key: '1',
      title: '商品列表',
      content: <ProductListComponent superComponent={this}/>, 
      closable: false
    }];

    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }
  updateCallback = (title, productId) => {
    title = substring(title, 10);
    const panes = this.state.panes;
    const activeKey = 'tab' + productId;

    this.state.panes.forEach((pane, i) => {
      if (pane.key == 'tab添加商品') {
        pane.title = title;
        pane.key = activeKey;
        this.setState({panes, activeKey});
        return;
      }
    });
  }
  stateCallback = (title, productId, isEditProduct) => {
    if(!isEditProduct){
      productId = '添加商品';
    }
    const panes = this.state.panes;
    const activeKey = 'tab' + productId;

    // 检查tab是否已打开
    let isExistTab = false;
    this.state.panes.forEach((pane, i) => {
      if (pane.key == activeKey) {
        pane.title = title;
        this.setState({panes, activeKey});
        return;
      }
    });

    // 新增tab
    if(!isExistTab){
      panes.push({ title: title, content: <ProductFormComponent indexComponent={this} productId={productId} isEditProduct={isEditProduct}/>, key: activeKey});
      this.setState({panes, activeKey});
      this.scrollToAnchor("ManagerGoods");
    }
  }
  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  render() {
    return (
      <div id="ManagerGoods" className="manager-product-page">
        <Tabs
          hideAdd
          className="manager-product-body"
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}>
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}


