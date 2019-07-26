import React from 'react';
import './index.css'
import { Button, Icon, Row, Col, Card, Spin, Transfer, BackTop } from 'antd';
import QueueAnim from 'rc-queue-anim';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

import imga from '../../../../material/image/index/groups/imga.jpg'
import imgb from '../../../../material/image/index/groups/imgb.jpg'
import imgc from '../../../../material/image/index/groups/imgc.jpg'
import imgd from '../../../../material/image/index/groups/imgd.jpg'
import imge from '../../../../material/image/index/groups/imge.jpg'
import imgf from '../../../../material/image/index/groups/imgf.jpg'
import businessImga from '../../../../material/image/index/team/imgh.jpg'
import businessImgb from '../../../../material/image/index/team/imgi.jpg'
import businessImgc from '../../../../material/image/index/team/imgj.jpg'
import businessImgd from '../../../../material/image/index/team/imgk.jpg'
import businessImge from '../../../../material/image/index/team/imgl.jpg'
// import txtContent from "../../../../material/image/index/txtContent.jpg"
import brandimga from "../../../../material/image/index/zu1.png"
import brandimgb from "../../../../material/image/index/zu2.png"
import brandimgc from "../../../../material/image/index/zu3.png"
import brandimgd from "../../../../material/image/index/zu4.png"
import rightimga from "../../../../material/image/index/Group15Copy5@2x.png"
import { setTimeout } from 'timers';
// business page
import headimg from "../../../../material/image/index/groups/imgd.jpg"
import txtcontentImga from "../../../../material/image/index/app/Group6@2x.png"
import txtcontentImgb from "../../../../material/image/index/app/Group@2x.png"
import txtcontentImgc from "../../../../material/image/index/app/Group16@2x.png"
import txtcontentImgd from "../../../../material/image/index/app/Group15@2x.png"
import txtcontentImge from "../../../../material/image/index/app/Group20@2x.png"
import txtcontentImgf from "../../../../material/image/index/app/Group19@2x.png"
import voiceImga from "../../../../material/image/index/app/Group5Copy2@2x.png"
import voiceImgb from "../../../../material/image/index/app/Group5Copy@2x.png"
import voiceImgc from "../../../../material/image/index/app/Group5@2x.png"

const BgElement = Element.BgElement;

export default class mobileApp extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.onLoading()
    }

    componentDidMount() {
        this.closeLoading()

        // 初始化swiper实例
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
            preloadImages: true,
            updateOnImagesReady : true,
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
    }

    state = {
        visible: false,
        imglist: [
            imga, imgb, imgc
        ],
        imglists: [
            businessImga, businessImgb, businessImgc, businessImgd, businessImge
        ],
        imglistss: [
            brandimga, brandimgb, brandimgc, brandimgd
        ],
        show: true,
        isloading: true
    };

    onLoading() {
        this.setState({
            isloading: true
        })
    }
    closeLoading() {
        let _this = this
        setTimeout(function () {
            _this.setState({
                isloading: false
            })
        }, 1500)
    }

    godown =()=>{
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd'
    }
    

    render() {
        // const childrenToRender = this.state.imglist.map((item, i)=>{
        //     return (
        //         <Element
        //             prefixCls="banner-user-elem"
        //             key={i.toString()}
        //         >  
        //             <BgElement
        //                 key={i.toString()+1}
        //                 className="bg"
        //                 style={{
        //                     backgroundImage: `url(${item})`,
        //                     backgroundSize: 'cover',
        //                     backgroundPosition: 'center',
        //                 }}
        //             />
        //         </Element>
        //     )
        // })
        // const childrenToRenders = this.state.imglists.map((item, i)=>{
        //     return (
        //         <Element
        //             prefixCls="banner-user-elem"
        //             key={i.toString()}
        //         >  
        //             <BgElement
        //                 key="bg"
        //                 className="bg"
        //                 style={{
        //                     backgroundImage: `url(${item})`,
        //                     backgroundSize: 'cover',
        //                     backgroundPosition: 'center',
        //                 }}
        //             />
        //         </Element>
        //     )
        // })
        // const cooperativeBrand = this.state.imglistss.map((item, i)=>{
        //     return (
        //         <Element
        //             prefixCls="banner-user-elem"
        //             key={i.toString()}
        //         >  
        //             <BgElement
        //                 key="bg"
        //                 className="bg"
        //                 style={{
        //                     backgroundImage: `url(${item})`,
        //                     backgroundSize: '100% 100%',
        //                     backgroundPosition: 'center',
        //                 }}
        //             />
        //         </Element>
        //     )
        // })

        return (
            <div id='main'>
                {
                    this.state.isloading == true ?
                        <Spin size="large" /> : null
                }

                {/* <BannerAnim
                    prefixCls="banner-user"
                    autoPlay
                    arrow={true}
                    dragPlay={false}
                    duration={600}
                >
                    {childrenToRender}
                </BannerAnim> */}
                {/* 替换装 */}
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div key='0' className="swiper-slide"><img src={imga} /></div>
                        <div key='1' className="swiper-slide"><img src={imgb} /></div>
                        <div key='2' className="swiper-slide"><img src={imgc} /></div>
                        <div key='3' className="swiper-slide"><img src={imgd} onClick={this.godown}/></div>
                        <div key='4' className="swiper-slide"><img src={imge} onClick={this.godown}/></div>
                        <div key='5' className="swiper-slide"><img src={imgf} onClick={this.godown}/></div>
                    </div>
                    <div className='swiper-pagination'></div>
                </div>
                <div style={{ background: '#fff', padding: '10px' }}>
                    <QueueAnim className="demo-content">
                        {this.state.show ? [
                            <h2 className='firstTile' key='1'>BUSINESS INTRIDUCTIO</h2>,
                            <h3 className='firstTile' key='2'>集客多业务</h3>,
                            <p key='3'>集客多是由御馔集团打造的营养品行业全程服务链平台，为电商平台、营养品品牌、经销商，提供全球采购、国际物流、跨境通关、保税仓储、市场营销、商品配送、金融方案的一站式解决方案。</p>
                        ] : null}
                    </QueueAnim>
                </div>
                {/* <BannerAnim
                    prefixCls="banner-user"
                    autoPlay
                    arrow={false}
                    thumb={false}
                    dragPlay={false}
                >
                    {childrenToRenders}
                </BannerAnim> */}
                <div className="swiper-containers">
                    <div className="swiper-wrapper">
                        <div key='0' className="swiper-slide"><img src={businessImga} /></div>
                        <div key='1' className="swiper-slide"><img src={businessImgb} /></div>
                        <div key='3' className="swiper-slide"><img src={businessImgc} /></div>
                        <div key='4' className="swiper-slide"><img src={businessImgd} /></div>
                        <div key='5' className="swiper-slide"><img src={businessImge} /></div>
                    </div>
                </div>
                {/* <Card
                    title="BUSINESS INTRIDUCTION"
                > */}
                {/* <QueueAnim className="demo-content">
                    {this.state.show ? [
                        <h3 key='3'>合作伙伴</h3>,
                        <h4 key='4'>集客多App深受国内外营养品牌认可，100+全球一线运动营养品牌入驻</h4>
                    ] : null}
                </QueueAnim> */}
                

                <div style={{ background: '#fff', padding: '10px' }}>
                    <QueueAnim className="demo-content">
                        {this.state.show ? [
                            <h2 className='firstTile' key='1'>COOPERATIVE PARTNER</h2>,
                            <h3 className='firstTile' key='2'>合作伙伴</h3>,
                            <p key='3'>集客多App深受国内外营养品牌认可，100+全球一线运动营养品牌入驻</p>
                        ] : null}
                    </QueueAnim>
                </div>
                {/* </Card> */}
                {/* <h2>BUSINESS INTRIDUCTION</h2> */}

                {/* 移动端显示缺陷 */}
                {/* <div className="txtContent" id='static'>
                    <img src={txtContent} />
                </div> */}
                {/* <BannerAnim
                    prefixCls="brand"
                    autoPlay
                    dragPlay={false}
                    arrow={false}
                    thumb={false}
                >
                    {cooperativeBrand}
                </BannerAnim> */}
                <div className="swiper-containerss">
                    <div className="swiper-wrapper">
                        <div key='0' className="swiper-slide"><img src={brandimga} /></div>
                        <div key='1' className="swiper-slide"><img src={brandimgb} /></div>
                        <div key='2' className="swiper-slide"><img src={brandimgc} /></div>
                        <div key='3' className="swiper-slide"><img src={brandimgd} /></div>
                    </div>
                </div>
                <Card
                    // title="集客多APP"
                    className='app'
                >
                    <img src={headimg} onClick={this.godown}/>
                </Card>
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
                {/* <Card */}
                    {/* title="客户的声音" */}
                    {/* className='app' */}
                {/* > */}
                    {/* <p>客户的声音</p> */}
                    {/* <img src={voiceImga} /> */}
                    {/* <img src={voiceImgb} /> */}
                {/* <img src={voiceImgc} /> */}
                <div style={{ background: '#fff', padding: '10px' ,paddingTop: '15px' }}>
                    <QueueAnim className="demo-content">
                        {this.state.show ? [
                            <h2 className='firstTile' key='3'>VOICE OF CUSTOMERS</h2>,
                            <h3 className='firstTile' key='4'>客户的声音</h3>,
                            // <p key='3'>集客多App深受国内外营养品牌认可，100+全球一线运动营养品牌入驻</p>
                        ] : null}
                    </QueueAnim>
                </div>
                <div className="swiper-containerss">
                    <div className="swiper-wrapper">
                        <div key='10' className="swiper-slide"><img src={voiceImga} /></div>
                        <div key='11' className="swiper-slide"><img src={voiceImgb} /></div>
                        <div key='12' className="swiper-slide"><img src={voiceImgc} /></div>
                    </div>
                </div>
                {/* </Card> */}

                
                {/* <div className="swiper-containerss">
                    <div className="swiper-wrapper">
                        <div key='10' className="swiper-slide"><img src={voiceImga} /></div>
                        <div key='11' className="swiper-slide"><img src={voiceImgb} /></div>
                        <div key='12' className="swiper-slide"><img src={voiceImgc} /></div>
                    </div>
                </div> */}
                <Card
                    title="联系我们"
                    bordered={false}
                    className='contus'
                    headStyle={{ background: '#f0f0f0' }}
                >
                    <p>客服热线：4000-639-939</p>
                    <p>工作时间：09:00 - 17:00（工作日）</p>
                    <p>公司邮箱：jikeduo@uzengroup.com</p>
                </Card>
                <BackTop visibilityHeight={100} className="goTopBtn">
                    <img src={rightimga} />
                </BackTop>
            </div>
        )
    }
}