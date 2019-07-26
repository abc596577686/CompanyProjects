import React, { Component } from 'react';
import './index.css'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import headimg from "../../../material/image/index/groups/imgd.jpg"
import topimg from "../../../material/image/index/Bitmap@2x.png"
import headerDhImg from "../../../material/image/index/app/Group21@2x.png"
import historyContentImg from "../../../material/image/index/app/Group14@2x.png"
import txtcontentImga from "../../../material/image/index/app/Group6@2x.png"
import txtcontentImgb from "../../../material/image/index/app/Group@2x.png"
import txtcontentImgc from "../../../material/image/index/app/Group16@2x.png"
import txtcontentImgd from "../../../material/image/index/app/Group15@2x.png"
import txtcontentImge from "../../../material/image/index/app/Group20@2x.png"
import txtcontentImgf from "../../../material/image/index/app/Group19@2x.png"
import voiceImga from "../../../material/image/index/app/Group5Copy2@2x.png"
import voiceImgb from "../../../material/image/index/app/Group5Copy@2x.png"
import voiceImgc from "../../../material/image/index/app/Group5@2x.png"
import voiceImgd from "../../../material/image/index/app/Group2@2x.png"
import voiceImge from "../../../material/image/index/app/Group2Copy@2x.png"
import voiceImgf from "../../../material/image/index/app/Group2Copy2@2x.png"
import rightimga from "../../../material/image/index/Group15Copy5@2x.png"
import rightimgb from "../../../material/image/index/Group15Copy4@2x.png"
import rightimgc from "../../../material/image/index/Group15Copy3@2x.png"

import { Anchor, Drawer, Button, Radio, BackTop } from 'antd';
const { Link } = Anchor
const RadioGroup = Radio.Group;

export default class business extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    visible: false,
    visibles: false,
    showphone: false,
    showcode: false,
    placement: 'top',
  };

  componentDidMount() {
    // this.handleScroll()
    window.addEventListener('scroll', this.handleScroll);

    let localidx =  sessionStorage.getItem('pageidx')
    console.log(localidx)
    if (localidx == 'index') {
      // document.body.scrollTop = 0
      window.scrollTo(0,0)
      // sessionStorage.setItem('pageidx', 'business');
    }
  }

  handleScroll = () => {
    console.log(window.scrollY)
    if (window.scrollY > 200) {
      this.setState({
        visible: true,
        visibles: true
      })
    } else if (window.scrollY < 200) {
      this.setState({
        visible: false,
        visibles: false
      })
    }
  }

  showphone = () => {
    this.setState({
      showphone: true
    })
  }
  hidephone = () => {
    this.setState({
      showphone: false
    })
  }
  showcode = () => {
    this.setState({
      showcode: true
    })
  }
  hidecode = () => {
    this.setState({
      showcode: false
    })
  }

  godown = () => {
    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd'
  }

  handleClick = (e, link) => {
    e.preventDefault();
    console.log(link);
    if (link.href == 'index') {
      console.log('go index page')
      this.props.history.push('/index')
      // this.$router.push('/index');
      // window.location.href = '/index'
    }
  };

  render() {
    return (
      <div className="App" id="mainPage">
        <header>
          <div className="swiper-container">
            <img src={headimg} onMouseDown={this.godown} className='headimg'/>
            <div className="headerTitle">
              <img src={topimg} />
              <div className="hT_txt">
                <div className="hT_txt1">集客多</div>
                <div className="hT_txt2">全球营养供应商</div>
              </div>
              <Anchor
                affix={false}
                className='fixanchor'
                onClick={this.handleClick}
              >
                <Link
                  href="index"
                  title="关于我们"
                  className='linkchild'
                />
                <Link title="集客多APP" className='linkchild' />
                {/* <Link
                  href="index"
                  title="联系我们"
                  className='linkchild'
                /> */}
              </Anchor>
            </div>
            <div
              className={this.state.visible == true ? 'headerTitles' : 'none'}
            >
              <img src={topimg} />
              <div className="hT_txt">
                <div className="hT_txt1">集客多</div>
                <div className="hT_txt2">全球营养供应商</div>
              </div>
              <Anchor
                affix={false}
                className='fixanchors'
                onClick={this.handleClick}
                offsetTop={500}
              >
                <Link
                  href="index"
                  title="关于我们"
                  className='linkchild'
                />
                <Link title="集客多APP" className='linkchild' />
                {/* <Link
                  href="index"
                  title="联系我们"
                  className='linkchild'
                /> */}
              </Anchor>
            </div>
          </div>
        </header>
        <div className="headerDh">
          <img src={headerDhImg} />
        </div>
        {/* <!-- history --> */}
        <div className="historyContent">
          <img src={historyContentImg} />
        </div>
        {/* <!-- txtcontent --> */}
        <div>
          <img src={txtcontentImga} />
        </div>
        <div>
          <img src={txtcontentImgb} />
        </div>
        <div>
          <img src={txtcontentImgc} />
        </div>
        <div>
          <img src={txtcontentImgd} />
        </div>
        <div>
          <img src={txtcontentImge} />
        </div>
        <div>
          <img src={txtcontentImgf} />
        </div>
        {/* voice */}
        <div className="voice">
          <ul>THE VOICE OF CUSTOMERS</ul>
          <p>客户的声音</p>
          <div className="cont">
            <div>
              <img src={voiceImga} />
            </div>
            <div>
              <img src={voiceImgb} />
            </div>
            <div>
              <img src={voiceImgc} />
            </div>
          </div>
        </div>
        <div className="voice bot">
          <ul>DOWNLOAD AVAILABLE</ul>
          <p>下载集客多APP</p>
          <div className="cont">
            <div className="gourl" onMouseDown={this.godown}>
              <img src={voiceImgd} />
            </div>
            <div className="gourl" onMouseDown={this.godown}>
              <img src={voiceImge} />
            </div>
            <div>
              <img src={voiceImgf} />
            </div>
          </div>
        </div>
        {/* right modal */}
        <div className={this.state.visibles == true ? 'rightDiv' : 'none'}>
          <BackTop visibilityHeight={200} className="goTopBtn">
            <img src={rightimga} />
          </BackTop>
          <div className="phoneCode">
            <img src={rightimgb} onMouseEnter={this.showphone} onMouseLeave={this.hidephone} />
            <ul className={this.state.showphone == true ? 'cover1' : 'none'}>
              客服热线：4000-639-939
            </ul>
          </div>
          <div className="vrCode">
            <img src={rightimgc} onMouseEnter={this.showcode} onMouseLeave={this.hidecode} />
            <ul className={this.state.showcode == true ? 'cover' : 'none'}>
              <img src={rightimgc} />
            </ul>
          </div>
        </div>
        <footer>
          Copyright jikeduo.com.cn. All rights reserved. 渝ICP备16000273号-2
        </footer>
      </div>
    );
  }
}
