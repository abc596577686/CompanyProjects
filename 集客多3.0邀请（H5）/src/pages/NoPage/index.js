import React from 'react';

export default class NoFound extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('欢迎来到集客多');
  }
  
  render() {
    return (
      <div style={{ fontSize:'.5rem',textAlign:'center' }} >
        咦 页面不见了  T-T
      </div>
    )
  }
}