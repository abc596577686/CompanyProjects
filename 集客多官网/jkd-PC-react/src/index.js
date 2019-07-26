import React from 'react';
import ReactDOM from 'react-dom';
import App from './page/App';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider, DatePicker, message  } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
import './index.css';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

moment.locale('zh-cn');

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <App />
    </LocaleProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();
