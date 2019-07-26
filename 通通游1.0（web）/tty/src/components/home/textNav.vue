 <template>
        <section class="profile-info" style="margin-top:0.3rem;"> 
            <section  v-for="item in content" class="info-router">
                <a v-if="item.prefix==''" :href="item.name">
                    <section class="headportrait headportraitwo">
                        <h2>{{item.title}}</h2>
                        <div class="headportrait-div">
                            <p></p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                    </section>
                </a>
                <a v-if="item.prefix=='外链'" :href="item.name">
                    <section class="headportrait headportraitwo">
                        <h2>{{item.title}}</h2>
                        <div class="headportrait-div">
                            <p></p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                    </section>
                </a>
                <router-link v-if="item.prefix=='微页面'" :to="{path: routerPath+'/innerPage',query:{shopid:storeId,id:item.url,type:'wym'}}">
                    <section class="headportrait headportraitwo">
                        <h2>{{item.title}}</h2>
                        <div class="headportrait-div">
                            <p></p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                    </section>
                </router-link>
                <router-link v-if="item.prefix=='商品分组'" :to="{path: routerPath+'/productGroup',query:{shopid:storeId,id:item.url}}">
                    <section class="headportrait headportraitwo">
                        <h2>{{item.title}}</h2>
                        <div class="headportrait-div">
                            <p></p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                    </section>
                </router-link>
               <router-link  v-if="item.prefix=='商品'" :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.url}}">
                    <section class="headportrait headportraitwo">
                        <h2>{{item.title}}</h2>
                        <div class="headportrait-div">
                            <p></p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                    </section>
                </router-link>
                <router-link  v-if="item.prefix=='微页面分类'" :to="{path: routerPath+'/type',query:{shopid:storeId,channelId:item.url}}">
                    <section class="headportrait headportraitwo">
                        <h2>{{item.title}}</h2>
                        <div class="headportrait-div">
                            <p></p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                    </section>
                </router-link>
            </section>
        </section>
</template>

<script>
    import { rootPath } from 'src/config/env'
    export default {
        data(){
            return{
                 routerPath:''
            }
        },
         created() {
             this.routerPath=rootPath;
        },
        props: ['content','storeId'],
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin.scss';
    .profile-info{
        .profileinfopanel-upload{
            display: block;
            position: absolute;
            opacity: 0;
            top: 2.35rem;
            left: 0;
            @include wh(100%,3.1rem);
        }
        .headportrait{
            margin-top:.4rem;
            padding:.5rem .4rem;
            @include fj(space-between);
            align-items:center;
            border-top:1px solid #eee;
            background:#fff;

            h2{
                @include sc(.6rem,#333);
                font-weight:500;
                display:flex;
                align-items:center;
            }
            .headportrait-div{
                span{
                    display:inline-block;

                    svg{
                        @include wh(100%,100%);
                    }
                }
                .headportrait-div-top{
                    @include wh(2rem,2rem);
                    @include borderRadius(50%);
                    vertical-align:middle;
                }
                .headportrait-div-bottom{
                    @include wh(.66667rem,1.4rem);
                    position:relative;
                    top:0.44rem;
                }
            }
        }
        .headportraitwo{
            margin-top:0;
            padding:.3rem .4rem;
            .headportrait-div{
                @include fj(left)
                p{
                    text-align:left;
                    line-height:1.39rem;
                    @include sc(.7rem,#999);
                    margin-right:.2rem;
                    font-weight:100;
                    font-family:Arial;
                }
                .headportrait-div-bottom{
                    top:0;
                }
            }
        }
        .headportraithree{
            border-bottom:1px solid #eee;
        }
        
        
    }
    .info-router{
        display:block;
    }
   
 
</style>
