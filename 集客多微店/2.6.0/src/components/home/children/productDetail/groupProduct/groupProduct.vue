<template>
  <section class="specGroupContainer">
    <div v-title data-title="选择套餐商品属性"></div>
    <div v-stat="{type:'pageview', title:'选择套餐商品属性'}"></div>
    
    <ul class="goodList">
      <li class="good" v-for="(product, index) in productList" :key="index">
        <div class="imgWrap">
          <img :src="product.selectImageUrl">
        </div>

        <div class="goodDesc">
          <div class="info">
            <p class="goodName" v-html="product.productName"></p>
            <span class="goodNumWrap" v-html="product.saleTimes">10</span>
          </div>
          <p class="goodsPrice" v-html="`¥${product.price}`"></p>
          <div class="selectSpec" v-if="product.isSpceProduct==1 && !product.curSelectedSpecList.length" @click="selectSpecNav(product, index)">
            <p class="text_select">请选择规格</p>
            <div class="iconImgWrap">
              <img class="icon_select" src="../../../../../common/images/icon_select.png">
            </div>
          </div>
          <div class="selectedSpec" v-if="product.isSpceProduct==1 && product.curSelectedSpecList.length" @click="selectSpecNav(product, index)">
            <p class="specDesc">
              <ul class="list">
                <!-- <li class="span" v-for="spec in curSelectedSpecList" v-html="spec"></li> -->
                <li class="span" v-html="product.selectedSpecListText"></li>
              </ul>
              <img class="select_up" src="../../../../../common/images/icon_select.png">
            </p>
          </div>
        </div>
      </li>
    </ul>

    <!-- 数量变更 -->
    <div class="actionNum">
      <div class="packageNumChange">
        <span class="text">套餐数量</span>
        <div class="numChangeWrap">
          <div class="handle reduce" :class="{'disabled': reduceDisabled}" @click="reduceEnv">-</div>
          <input class="packageNum" type="number" v-model="packageNum" @focus="handleFocus" @blur="handleBlur">
          <div class="handle add" :class="{'disabled': addDisabled}" @click="addEnv">+</div>
        </div>
      </div>
      <div class="btn" @click="actionConfirm">确定</div>
    </div>

    <!-- 规格选择 -->
    <transition name="slide">
      <div class="specSelectPanel" v-if="isShowSpecSelectPanel">
        <div class="goodInfo">
          <div class="imgWrap">
            <img :src="curSelectProduct.selectImageUrl">
          </div>
          <div class="selectedSpec">
            <!-- <p class="goodsPrice" v-html="`¥${curSelectProduct.price}`"></p> -->
            <p class="goodsPrice" v-html="`¥${groupCurrentPrice != ''? groupCurrentPrice: curSelectProduct.price}`"></p>
            <p v-if="!curSelectProduct.productSpecList.length">此商品没有可选规格</p>
            <p v-if="!curSelectProduct.curSelectedSpecList.length && curSelectProduct.productSpecList.length">请选择规格</p>
            <p v-if="curSelectProduct.curSelectedSpecList.length && curSelectProduct.productSpecList.length">已选：<span v-html="curSelectProduct.selectedSpecListText"></span></p>
          </div>
        </div>
        <div class="specList" v-if="curSelectProduct.productSpecList.length">
          <div class="spec primarySpec">
            <h3 class="title" v-html="curSelectProduct.namePrimarySpecModel"></h3>
            <ul>
              <li class="item" v-if="spec.primarySpecName !== ''" :class="{'active': curSelectProduct.curSelectIndex_primary === index, 'disabled': spec.isSoldOut === '1'}" v-for="spec,index in curSelectProduct.temporaryPrimarySpecList" v-html="spec.primarySpecName" @click="selectPrimarySpecEnv(spec, index)"></li>
            </ul>
          </div>
          <div class="spec secondSpec" v-if="curSelectProduct.nameSecondarySpecModel !== ''">
            <h3 class="title" v-html="curSelectProduct.nameSecondarySpecModel"></h3>
            <ul>
              <li class="item" v-if="spec.secondarySpecName !== ''" :class="{'active': curSelectProduct.curSelectIndex_second === index, 'disabled': spec.isSoldOut === '1'}" v-for="spec,index in curSelectProduct.temporarySecondarySpecList" v-html="spec.secondarySpecName" @click="selectSecondSpecEnv(spec, index)"></li>
            </ul>
          </div>
        </div>
        <div class="btn" @click="submitSpecParamEnv">确定</div>
        <div class="closeBtn" :class="{'rotateAni': isRotate}"  @click="hideSpecPanelEnv"></div>
      </div>
    </transition>
    
    <!-- 遮罩 -->
    <transition name="fade">
      <div class="mask" v-if="isShowSpecSelectPanel" @click="isShowSpecSelectPanel = false"></div>
    </transition>

    <alert-tip v-if="showAlert" :alertText="alertText" @closeTip="showAlert = !showAlert" style="z-index: 999;"></alert-tip>
  </section>
</template>

<script>
  import AlertTip from 'base/alertTip/alertTip'
  import { getAssemb, getAssemblyProduct, lyProduct, checkBuy, addNumCart } from 'api'
  import { rootPath } from 'config/env'
  import qs from 'qs'
  // import sa from 'sa-sdk-javascript';

  const PRIMARY_SPEC = 'primary-spec'
  const SECONDS_SPEC = 'sconds-spec'

  export default {
    data() {
      return {
        maxGoodsNum: 20,
        isShowSpecSelectPanel: false,
        isRotate: false,
        isSelected: false,
        packageNum: 1,
        productList: [],
        productStockNumber: 0,
        selectedSpecList: [],
        curSelectedSpecList: [],
        curSelectIndex_primary: null,
        curSelectIndex_second: null,
        curSelectProduct: null,
        curSelectProductIndex: null,
        isDisabled: false,
        reduceDisabled: false,
        addDisabled: false,
        showAlert: false,
        alertText: '',
        groupCurrentPrice:'',
      }
    },
    watch: {
      selectedSpecList(val) {
        if (!this.isShowSpecSelectPanel) {
          return
        }

        console.log(val)
        console.log(this.curSelectProductIndex)
        this.curSelectProduct.selectedSpecListText = ''
        this.curSelectProduct.curSelectedSpecList = []
        this.productList[this.curSelectProductIndex].selectedSpecListText = ''
        this.productList[this.curSelectProductIndex].curSelectedSpecList = []

        val.forEach((item) => {
          if (item) {
            this.curSelectProduct.curSelectedSpecList.push(item)
            this.productList[this.curSelectProductIndex].curSelectedSpecList.push(item)
          }
        })

        if (this.curSelectProduct.curSelectedSpecList.length) {
          // this.isSelected = true
          this.curSelectProduct.selectedSpecListText = this.curSelectProduct.curSelectedSpecList.join('、')
          this.productList[this.curSelectProductIndex].selectedSpecListText = this.curSelectProduct.curSelectedSpecList.join('、')
        } else {
          // this.isSelected = false
        }

        console.log(this.curSelectProduct.curSelectedSpecList)
        console.log(this.curSelectProduct.selectedSpecListText)
      },
      packageNum(newVal, oldVal) {
        if (newVal >= this.productStockNumber || newVal >= this.maxGoodsNum) {
          this.addDisabled = true
          this.reduceDisabled = false
        } else {
          this.addDisabled = false
        }

        if (newVal <= 1) {
          this.reduceDisabled = true
          this.addDisabled = false
        } else {
          this.reduceDisabled = false
        }

        if (newVal > this.productStockNumber) {
          this._toastMsg('超过库存')
          this.packageNum = oldVal
          return
        }

        if (newVal < 0) {
          this.packageNum = 1
          return
        }

      }
    },
    mounted() {
      this.productId = this.$route.query.productId
      this.oprType = this.$route.query.oprType
      this._getGroupProduct()

      // sa.track('$pageview', {
      //   $title: this.documentTitle,
      //   $url: location.href,
      //   $url_path: location.pathname,
      //   $referrer_host: location.hostname,
      //   $referrer: document.referrer,
      // })

    },
    methods: {
      handleFocus(e) {
        console.log('获取焦点')
      },
      handleBlur(e) {
        console.log('失去焦点')
      },
      addEnv() {
        this.packageNum ++
        if (this.packageNum >= this.productStockNumber) {
          return
        }
      },
      reduceEnv() {
        if (this.packageNum <= 1) {
          return
        }
        this.packageNum --
      },
      selectSpecNav(product, index) {
        this.isShowSpecSelectPanel = !this.isShowSpecSelectPanel
        this.curSelectProductIndex = index

        if (product.curSelectedSpecList.length) {
          this.isSelected = true
        } else {
          this.isSelected = false
        }

        this.curSelectProduct = Object.assign({}, this._regenerateProduct(product))
        // this.oldImgUrl = this.curSelectProduct.imageUrl
        console.log(this.curSelectProduct)


      },
      _regenerateProduct(product) {
        if (!product.productSpecList.length) {
          return product
        }

        let primarySpecList = []
        let secondarySpecList = []

        // 一级规格
        product.productSpecList.forEach((spec, index) => {
          let toggle_primary = true
          let isExistPrimarySpec = true;

          // console.log('第' + index + '个')

          if (spec.isSoldOut == '1') {
            spec.disabled = true
          } else {
            spec.disabled = false
          }

          if (primarySpecList.length) {
            toggle_primary = false

            for (var i = 0; i < primarySpecList.length; i++) {
              if (spec.primarySpecId != primarySpecList[i].primarySpecId) {
                isExistPrimarySpec = false
              } else {
                isExistPrimarySpec = true
                return
              }
            }
          }

          if (toggle_primary) {
            primarySpecList.push(spec)
          }

          if (!isExistPrimarySpec) {
            primarySpecList.push(spec)
          }

        })

        // 二级规格
        product.productSpecList.forEach((spec, index) => {
          let toggle_secondary = true
          let isExistScondarySpec = true;
          
          // console.log('第' + index + '个')

          if (spec.isSoldOut == '1') {
            spec.disabled = true
          } else {
            spec.disabled = false
          }

          if (secondarySpecList.length) {
            toggle_secondary = false

            for (var i = 0; i < secondarySpecList.length; i++) {
              if (spec.secondarySpecId != secondarySpecList[i].secondarySpecId) {
                isExistScondarySpec = false
              } else {
                isExistScondarySpec = true
                return
              }
            }
          }

          if (toggle_secondary) {
            secondarySpecList.push(spec)
          }

          if (!isExistScondarySpec) {
            secondarySpecList.push(spec)
          }
          
        })


        product.namePrimarySpecModel = primarySpecList[0].primarySpecModelName
        product.nameSecondarySpecModel = secondarySpecList[0].secondarySpecModelName

        product.temporaryPrimarySpecList = primarySpecList
        product.temporarySecondarySpecList = secondarySpecList

        // 是否有二级规格
        let isHaveSecondarySpec = false
        if (product.temporarySecondarySpecList.length && product.temporarySecondarySpecList[0].secondarySpecId != '') {
          isHaveSecondarySpec = true
        }
        product.isHaveSecondarySpec = isHaveSecondarySpec
        console.log('是否有二级规格:' + isHaveSecondarySpec)
        
        if (this.isSelected) {
          product.selectImageUrl = product.temporaryPrimarySpecList[product.curSelectIndex_primary].imageUrl
        } else {
          product.selectImageUrl = product.imageUrl
        }
        return product
      },
      selectPrimarySpecEnv(primarySpec, index) {
        if (primarySpec.isSoldOut === '1') {
          return
        }
        console.log(primarySpec.price)
        this.groupCurrentPrice = primarySpec.price
        
        if (this.curSelectProduct.oldSelectIndex_primary !== index) {
          this.curSelectProduct.selectImageUrl = primarySpec.imageUrl
          this.productList[this.curSelectProductIndex].selectImageUrl = primarySpec.imageUrl

          this.curSelectProduct.oldSelectIndex_primary = this.curSelectProduct.curSelectIndex_primary = index
          this.productList[this.curSelectProductIndex].oldSelectIndex_primary = this.productList[this.curSelectProductIndex].curSelectIndex_primary = index
          this._generateSpecText(PRIMARY_SPEC, primarySpec.primarySpecName,)
        } else {
          this.curSelectProduct.oldSelectIndex_primary = this.curSelectProduct.curSelectIndex_primary = null
          this.productList[this.curSelectProductIndex].oldSelectIndex_primary = this.productList[this.curSelectProductIndex].curSelectIndex_primary = null
          this.curSelectProduct.selectImageUrl = this.curSelectProduct.imageUrl

          this._resetSpecText(PRIMARY_SPEC)
        }
      },
      selectSecondSpecEnv(secondsSpec, index) {
        if (secondsSpec.isSoldOut === '1') {
          return
        }
        
        if (this.curSelectProduct.oldSelectIndex_second !== index) {
          this.curSelectProduct.oldSelectIndex_second = this.curSelectProduct.curSelectIndex_second = index
          this.productList[this.curSelectProductIndex].oldSelectIndex_second = this.productList[this.curSelectProductIndex].curSelectIndex_second = index
          this._generateSpecText(SECONDS_SPEC, secondsSpec.secondarySpecName)
        } else {
          this.curSelectProduct.oldSelectIndex_second = this.curSelectProduct.curSelectIndex_second = null
          this.productList[this.curSelectProductIndex].oldSelectIndex_second = this.productList[this.curSelectProductIndex].curSelectIndex_second = null

          this._resetSpecText(SECONDS_SPEC)
        }
      },
      _getGroupProduct() {
        let params = qs.stringify({
          a: 'v1/productGroupList',
          productId: this.productId
        })
        getAssemblyProduct(params).then(res => {
          console.log('商品组合----')
          console.log(res)
          if (res.code == '1') {
            let specObj = {}
            let data = res.dataList
            data.forEach((product) => {
              product.curSelectedSpecList = []
              product.selectImageUrl = product.imageUrl
            })
            this.productList = data
            // this.productStockNumber = this._calculationStock(data)
            // this.productStockNumber = 5
            this.productStockNumber = res.stockNumber
            if (this.productStockNumber < 1) {
              this.packageNum = 0;
            }
          }
        })
      },
      _calculationStock(data) {
        let ret = []
        data.forEach((item) => {
          ret.push(parseInt(parseInt(item.stockNumber) / parseInt(item.saleTimes)) )
        })
        return Math.min.apply(null, ret)
      },
      _generateSpecText(type, val) {
        if (PRIMARY_SPEC === type) {
          this.$set(this.selectedSpecList, 0, val)
        }
        if (SECONDS_SPEC === type) {
          this.$set(this.selectedSpecList, 1, val)
        }
      },
      _resetSpecText(type) {
        if (PRIMARY_SPEC === type) {
          this.$set(this.selectedSpecList, 0, undefined)
        }
        if (SECONDS_SPEC === type) {
          this.$set(this.selectedSpecList, 1, undefined)
        }
      },
      hideSpecPanelEnv() {

        this.isRotate = true
        let timer = setTimeout(() => {
          this.isShowSpecSelectPanel = false
          this.isRotate = false
          clearTimeout(timer)

          if (!this.isSelected) {
            this._resetSpecData()
          }
          
        }, 600)
      },
      _resetSpecData() {
        this.productList[this.curSelectProductIndex].oldSelectIndex_primary = null
        this.productList[this.curSelectProductIndex].oldSelectIndex_second = null
        this.productList[this.curSelectProductIndex].curSelectIndex_primary = null
        this.productList[this.curSelectProductIndex].curSelectIndex_second = null
        this.productList[this.curSelectProductIndex].curSelectedSpecList = []
        this.productList[this.curSelectProductIndex].selectImageUrl = this.productList[this.curSelectProductIndex].imageUrl

        this.curSelectProduct = null
        this.selectedSpecList = []

      },
      submitSpecParamEnv() {
        if (!this.curSelectProduct.productSpecList.length) {
          this.isShowSpecSelectPanel = false
          return
        }

        if (this.curSelectProduct.productSpecList.length && !this.curSelectProduct.curSelectedSpecList.length) {
          this._toastMsg('请选择规格')
          return
        }

        if (this.curSelectProduct.isHaveSecondarySpec) {
          if (!this.selectedSpecList[0] && this.curSelectProduct.curSelectIndex_primary === null) {
            this._toastMsg(`请选择${this.curSelectProduct.namePrimarySpecModel}`)
            return
          }
          if (!this.selectedSpecList[1]) {
            this._toastMsg(`请选择${this.curSelectProduct.nameSecondarySpecModel}`)
            return
          }
        }

        this.productList[this.curSelectProductIndex].imageUrl = this.curSelectProduct.imageUrl
        this.isShowSpecSelectPanel = false
        // this._toastMsg('选择了text' + this.curSelectProduct.selectedSpecListText)

        this._resetSpecText(PRIMARY_SPEC)
        this._resetSpecText(SECONDS_SPEC)
      },
      actionConfirm() {
        console.log(this.productList);
        let groupProductInfo = []

        this.productList.forEach((product) => {
          let specId = ''
          let productSpecId = ''

          let primarySpecName = ''
          let secondarySpecName = ''

          if (product.curSelectIndex_primary != undefined) {
            primarySpecName = product.temporaryPrimarySpecList[product.curSelectIndex_primary].primarySpecName
          }
          if (product.curSelectIndex_second != undefined) {
            secondarySpecName = product.temporarySecondarySpecList[product.curSelectIndex_second].secondarySpecName
          }

          // console.log(primarySpecName)
          // console.log(secondarySpecName)

          let primarySpecs = []
          let specs = {}

          product.productSpecList.forEach((item) => {
            if (item.primarySpecName == primarySpecName) {
              primarySpecs.push(item)
            }
          })
          primarySpecs.forEach((item) => {
            if (item.secondarySpecName == secondarySpecName) {
              specs = item
            }
          })

          console.log(specs)
          console.log(product)

          // let obj = {
          //   productId: product.productId,
          //   groupId: specs && specs.groupId ? specs.groupId : product.groupId
          // }

          let groupId = specs && specs.groupId ? specs.groupId : product.groupId
          groupProductInfo.push(groupId)

          console.log('已选的组合ID ====')
          console.log(groupProductInfo)
        })
        groupProductInfo = groupProductInfo.join(',')

        if (this.oprType == "1") { 
          //加入购物车
          let params = qs.stringify({
            productId: this.productId,
            groupProductInfo: groupProductInfo,
            addNum: this.packageNum
          })
          addNumCart(params).then(res => {
            console.log('购物车改变---')
            console.log(res);
            if (res.code == "1") { //成功
              this._toastMsg(res.msg)
              setTimeout(() => {
                this.$router.go(-1)
              }, 800)
            } else {
              this._toastMsg(res.msg)
            }
          });
        } else {
          let params = qs.stringify({
            productId: this.productId,
            groupProductInfo: groupProductInfo,
            number: this.packageNum
          })

          checkBuy(params).then((res) => {
            console.log('提交商品----')
            console.log(res);

            if (res.code == 1) {
              this.$router.push({
                path:  rootPath + '/confirmOrder',
                query: {
                  id: this.productId,
                  groupProductInfo: groupProductInfo,
                  num: this.packageNum
                }
              })
            } else {
              this._toastMsg('请选择规格商品')
            }

          })
        }

        
        // this._toastMsg('请选择规格')
      },
      _toastMsg(msg) {
        this.showAlert = true
        this.alertText = msg
      }
    },
    components: {
      AlertTip
    }
  }

</script>

<style lang="css" scoped>
  @import './groupProduct.css'
</style>
