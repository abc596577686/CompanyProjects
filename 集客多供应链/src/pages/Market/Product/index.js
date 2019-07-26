import React from 'react';
import {Tabs,message} from 'antd';
import './index.less';
import {MarketProductListComponent} from './productList';
import {MarketProductFormComponent} from './productForm';

const TabPane = Tabs.TabPane;

export default class MarketProduct extends React.Component {
  
  constructor(props) {
    super(props);

    this.newTabIndex = 0;
   
    const panes = [{
      title: '商品列表',
      content: <MarketProductListComponent superComponent={this} local={this.props.location.state}/>,
      key: '1',
      closable: false
    }];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }
  stateCallback = (title, productId) => {
    const panes = this.state.panes;
    const activeKey = 'tab' + productId;

    // 检查tab是否已打开
    let isExistTab = false;
    this.state.panes.forEach((pane, i) => {
      if (pane.key == activeKey) {
        isExistTab = true;
        pane.title = title;
        this.setState({panes, activeKey});
        return;
      }
    });
    
    // 新增tab
    if(!isExistTab){
      panes.push({ title: title, content: <MarketProductFormComponent indexComponent={this} productId={productId}/>, key: activeKey});
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

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
  componentWillMount() {
  
  }
  render() {
    return (
      <div id="ManagerGoods" className="market-product-page">
        <Tabs
          hideAdd
          className="market-product-body"
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
