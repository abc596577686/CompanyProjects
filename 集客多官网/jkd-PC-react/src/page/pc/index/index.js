import React, { Component } from 'react';
import './index.css'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
// import {
//   headimg,
// } from '../../datasouce.js';
import headimg from "../../../material/image/index/Bitmap@2x.png"
import imga from '../../../material/image/index/groups/imga.jpg'
import imgb from '../../../material/image/index/groups/imgb.jpg'
import imgc from '../../../material/image/index/groups/imgc.jpg'
import imgd from '../../../material/image/index/groups/imgd.jpg'
import imge from '../../../material/image/index/groups/imge.jpg'
import imgf from '../../../material/image/index/groups/imgf.jpg'
import imgg from '../../../material/image/index/groups/imgg.jpg'
import teamimga from "../../../material/image/index/team/imgh.jpg"
import teamimgb from "../../../material/image/index/team/imgi.jpg"
import teamimgc from "../../../material/image/index/team/imgj.jpg"
import teamimgd from "../../../material/image/index/team/imgk.jpg"
import teamimge from "../../../material/image/index/team/imgl.jpg"
import teamimgf from "../../../material/image/index/team/imgm.jpg"
import teamimgg from "../../../material/image/index/team/imgn.jpg"
import txtContent from "../../../material/image/index/txtContent.jpg"
import brandimga from "../../../material/image/index/zu1.png"
import brandimgb from "../../../material/image/index/zu2.png"
import brandimgc from "../../../material/image/index/zu3.png"
import brandimgd from "../../../material/image/index/zu4.png"
import codeimga from "../../../material/image/index/app/e8c5ffa2d8e7d603b3fd407157ca372.jpg"
import codeimgb from "../../../material/image/index/app/1ecaf86cccab85adba49e39b016fe63.png"
import codeimgc from "../../../material/image/index/app/3fdd69e5253b5263d1423add0e38099.png"
import rightimga from "../../../material/image/index/Group15Copy5@2x.png"
import rightimgb from "../../../material/image/index/Group15Copy4@2x.png"
import rightimgc from "../../../material/image/index/Group15Copy3@2x.png"
import { Anchor, Drawer, Button, Radio, BackTop } from 'antd';
const { Link } = Anchor
const RadioGroup = Radio.Group;

// Vue.use(VueRouter)

export default class PCApp extends React.Component {
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
    // group
    new Swiper('.swiper-container', {
      loop: true,     //循环
      autoplay: {      //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
        delay: 2500,
        disableOnInteraction: false,    //户操作swiper之后，是否禁止autoplay。默认为true：停止。
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,    // 允许点击跳转
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // team
    new Swiper('.swiper-containers', {
      loop: true,     //循环
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: {      //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
        delay: 2500,
        disableOnInteraction: false,    //户操作swiper之后，是否禁止autoplay。默认为true：停止。
      }
    });

    // brand
    new Swiper('.swiper-containerss', {
      loop: true,     //循环
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: {      //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
        delay: 2500,
        disableOnInteraction: false,    //户操作swiper之后，是否禁止autoplay。默认为true：停止。
      }
    });

    // this.handleScroll()
    window.addEventListener('scroll', this.handleScroll);
    
    // let localidx =  sessionStorage.getItem('pageidx')
    // console.log(localidx)
    // if (localidx == 'business') {
      // document.body.scrollTop = 0
      window.scrollTo(0,0)
      // sessionStorage.setItem('pageidx', 'index');
    // }
  }

  handleScroll = () => {
    // console.log(window.scrollY)
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
  // goBusinessPage=()=>{
  //   console.log('跳转商品页')
  //   this.props.history.push('/business')
  // }
  handleClick = (e, link) => {
    e.preventDefault();
    console.log(link.href);
    if (link.href == 'business') {
      console.log('go business')
      this.props.history.push('/business')
      // this.props.push('/business')
      // this.$router.push('/business');
      // window.location.href = '/business'
    }
  };

  godown =()=>{
    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd'
  }

  render() {
    return (
      <div className="App">
        <header id='guan'>
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {/*                 {bannerImg.map((item,index)=>(
                    <div key={index} className="swiper-slide" style={{backgroundImage:`url(${item})`}}></div>
                ))} */}
              <div key='0' className="swiper-slide"><img src={imga} /></div>
              <div key='1' className="swiper-slide"><img src={imgb} /></div>
              <div key='2' className="swiper-slide"><img src={imgc} /></div>
              <div key='3' className="swiper-slide ss" onClick={this.godown}><img src={imgd}/></div>
              <div key='4' className="swiper-slide ss" onClick={this.godown}><img src={imge} /></div>
              <div key='5' className="swiper-slide ss" onClick={this.godown}><img src={imgf} /></div>
              <div key='6' className="swiper-slide ss" onClick={this.godown}><img src={imgg} /></div>
            </div>
            <div className='swiper-pagination'></div>
            <div className='swiper-button-warp'>  
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
            <div className="headerTitle">
              <img src={headimg} />
              <div className="hT_txt">
                <div className="hT_txt1">集客多</div>
                <div className="hT_txt2">全球营养供应商</div>
              </div>
              <Anchor
                affix={false}
                className='fixanchor'
                onClick={this.handleClick}
              >
                <Link href="#guan" title="关于我们" className='linkchild' />
                <Link
                  href="business"
                  title="集客多APP"
                  className='linkchild'
                />
                <Link href="#Anchor" title="联系我们" className='linkchild' />
              </Anchor>
            </div>
            <div
              className={this.state.visible == true ? 'headerTitles' : 'none'}
            >
              <img src={headimg} />
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
                <Link href="#guan" title="关于我们" className='linkchild' />
                <Link
                  href="business"
                  title="集客多APP"
                  className='linkchild'
                />
                <Link href="#Anchor" title="联系我们" className='linkchild' />
              </Anchor>
            </div>
          </div>
        </header>
        <div className="business">
          <div className="intrduction">
            <div className="title1">BUSINESS INTRIDUCTION</div>
            <div className="title2">集客多业务</div>
            <div className="title3">集客多是由御馔集团打造的营养品行业全程服务链平台，为电商平台、营养品品牌、经销商，提供全球采购、国际物流、跨境通关、保税仓储、市场营销、商品配送、金融方案的一站式解决方案。</div>
          </div>
          <div className="swiper-containers sc_a">
            <div className="swiper-wrapper">
              <div key='7' className="swiper-slide"><img src={teamimga} /></div>
              <div key='8' className="swiper-slide"><img src={teamimgb} /></div>
              <div key='9' className="swiper-slide"><img src={teamimgc} /></div>
              <div key='10' className="swiper-slide"><img src={teamimgd} /></div>
              <div key='11' className="swiper-slide"><img src={teamimge} /></div>
              <div key='12' className="swiper-slide"><img src={teamimgf} /></div>
              <div key='13' className="swiper-slide"><img src={teamimgg} /></div>
            </div>
          </div>
        </div>
        <div className="txtContent" id='static'>
          <img src={txtContent} />
        </div>
        <div className="brand">
          <div className="tit_1">Cooperative Partner</div>
          <div className="tit_2">合作伙伴</div>
          <div className="tit_3">集客多App深受国内外营养品牌认可，100+全球一线运动营养品牌入驻</div>
          <div className="brandPlay">
            <div className="swiper-containerss thirdauto">
              <div className="swiper-wrapper">
                <div key='14' className="swiper-slide"><img src={brandimga} /></div>
                <div key='15' className="swiper-slide"><img src={brandimgb} /></div>
                <div key='16' className="swiper-slide"><img src={brandimgc} /></div>
                <div key='17' className="swiper-slide"><img src={brandimgd} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContent">
          <div className="contactus">
            <ul>联系我们</ul>
            <div className="ca_coverline"></div>
            <div className="txt">客服热线：4000-639-939</div>
            <div className="txt">工作时间：09:00 - 17:00（工作日）</div>
            <div className="txt">公司邮箱：jikeduo@uzengroup.com</div>
          </div>
          <div className="ewCode">
            <div className="ewCodeMain">
              <ul>微信公众号</ul>
              <div className="ca_coverline"></div>
              <div className="showcode">
                <img src={codeimga} />
              </div>
            </div>
            <div className="ewCodeMain">
              <ul>微博</ul>
              <div className="ca_coverline"></div>
              <div className="showcode">
                <img src={codeimgb} />
              </div>
            </div>
            <div className="ewCodeMain">
              <ul>下载集客多APP</ul>
              <div className="ca_coverline"></div>
              <div className="showcode">
                <img src={codeimgc} />
              </div>
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
        <footer id='Anchor'>
          Copyright jikeduo.com.cn. All rights reserved. 渝ICP备16000273号-2
        </footer>
      </div>
    );
  }
}
