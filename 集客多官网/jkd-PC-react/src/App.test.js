import React from 'react';
import ReactDOM from 'react-dom';
import App from './page/pc/index/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
