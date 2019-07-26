import React from 'react';
import {Row, Col, Card, Tooltip, Icon} from 'antd';
import './index.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('组件加载完');
  };

  render() {
    return (
      <div className="page homePage" style={{overflowY: 'scroll'}}>
      </div>
    )
  }
}