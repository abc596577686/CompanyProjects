import React from 'react';
import {
  Button,
  Icon,
  Select,
  Card,
  Table,
  Input,
  Pagination,
  Form,
  Modal,
  Col,
  Radio,
  Upload,
  message,
  Affix
} from 'antd';
import './index.less';
import './indexx.css';
import {brandList,getOrderList,saveBrand,brandDelete,fileUpload} from '../../../axios/api';
import { WrappedAdvancedSearchForm } from './AdvancedSearchForm';
import { PushData } from './pushhandle';
import { goodsTableColumns } from './staticData';
import { baseUrl, ERR_OK } from "../../../axios/config";
import { Z_DATA_ERROR } from 'zlib';
// 引用单元素动画
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
TweenOne.plugins.push(SvgMorphPlugin);

const FormItem = Form.Item;
// radio组件
const RadioGroup = Radio.Group;
// 上传商品图片
// const fileList = [];
// 上传设置
// const props = {
//   action : fileUpload ,
//   listType: 'picture',
//   defaultFileList: [...fileList],
// };
const layoutHorizontal = 'horizontal';
const Option = Select.Option;
const confirm = Modal.confirm;
// 单元素动效
const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
const p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
const ease0 = TweenOne.easing.path(p0);
const ease1 = TweenOne.easing.path(p1);
const children = PropTypes.any;
const className = PropTypes.string; 
const paused = PropTypes.bool;
// const Brand = TweenOne.TweenOneGroup;

export default class Brand extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('商品');

    let params = {
      pageidx: 1,
      pagesize: 5,
    };

    this._getBrandList(params);
    this.setState({
      goodsTableColumns
    })
    // 按钮文字显示动效
    this.onshowtxt();
  }

  state = {
    // 默认第几页
    defaultCurrent: 1,
    //页面大小
    pagesize: 5,
    //数据总条数
    dataTotal: 0,
    //页面大小可选项
    pageSizeOptions: ['5', '10', '15', '20'],
    mockTableListData: [],
    goodsTableColumns: [],
    visible: false,
    // 触发搜索后 记录搜索条件
    paramsa:[],
    // 增加排序搜索模块
    // data: [],
    // pagination: {},
    loading: false,
    tableEmpty: {
      // 空数据样式
      emptyText: () => <div>
        <Icon type="frown" theme="outlined"/>
        暂无数据
      </div>
    },
    visibleModelAddGoods: false,
    loadingAddGoods: false,
    loadingSearch: false,
    // radio组件
    value: '',
    // 新增品牌
    name: '',
    shortName: '',
    countryId: '',
    tagNames: '',
    initial:'',
    isHot: '',
    image: '',
    savemodel: [],
    saveidx: '',
    savesize: 5,
    // edit
    // visiblea:false,
    fileList: [],
    isR: 0,
    // 固钉
    top: 10,
    bottom: 10,
    // 动效
    // animation: [
    //   {
    //     delay: 1000,
    //     repeatDelay: 500,
    //     y: -70,
    //     repeat: 1,
    //     yoyo: true,
    //     ease: ease0,
    //     duration: 700
    //   },
    //   {
    //     delay: 1000,
    //     repeatDelay: 500,
    //     appearTo: 0,
    //     scaleX: 0,
    //     scaleY: 2,
    //     repeat: 1,
    //     yoyo: true,
    //     ease: ease1,
    //     duration: 700,
    //   }
    // ]
    animation: {
      // delay: 1000,
      x: 30, 
      scale: 1, 
      rotate: 120, 
      yoyo: false, // demo 演示需要
      repeat: 1, // demo 演示需要
      duration: 1000
    },
    // 文字动效
    show: false,
  };

  getEnter = (e) => {
    switch (e.index) {
      case 0:
        return {
          rotate: 90,
          opacity: 0,
          y: -60,
        };
      case 10:
      case 1:
        return {
          y: -60,
          x: -10,
          opacity: 0,
        };
      case 9:
      case 2:
        return {
          y: -60,
          x: 20,
          opacity: 0,
        };
      case 3:
        return {
          y: 60,
          opacity: 0,
        };
      case 8:
      case 4:
        return {
          x: 30,
          opacity: 0,
        };
      case 5:
        return {
          enter: [
            {
              scale: 2,
              opacity: 0,
              type: 'set',
            },
            { scale: 1.2, opacity: 1, duration: 300 },
            { scale: 0.9, duration: 200 },
            { scale: 1.05, duration: 150 },
            { scale: 1, duration: 100 },
          ],
          leave: {
            opacity: 0, scale: 0,
          },
        };
      case 6:
        return {
          scale: 0.8,
          x: 30,
          y: -10,
          opacity: 0,
        };
      case 7:
        return {
          scale: 0.8,
          x: 30,
          y: 10,
          opacity: 0,
        };
      default:
        return {
          opacity: 0,
        };
    }
  }
  // handleOnshowtxt = ()=>{
  //   var that = this;
  //   if(this.timer){
  //       clearTimeout(this.timer);
  //   }
  //   this.timer = setTimeout(this.onshowtxt(that),2000);
  // }
  onshowtxt = () => {
    this.setState({
      show: !this.state.show
    });
  }

  _getBrandList(params) {
    // console.log(typeof (params))
    this.setState({loadingSearch: true});
    brandList(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        if (res.data.data && res.data.data.length > 0) {
          this.setState({loadingSearch: false});
          let brandList = res.data.data;
          this.setState({
            dataTotal: res.data.count
          });
          this._setdata(brandList)
        } else {
          this.setState({ loadingSearch: false });
          message.warning('当前搜索条件无匹配结果');
        }
      }else {  
        // message.warning('当前操作无数据');
        message.warning(res.data.msg);
        this.setState({loadingSearch: false});
      }
    });
    // 去除loading 影响分页器运行
    // this.setState({
    //   loading: true
    // });
  }

  productAction(product, type) {
    switch (type) {
      case 'edit':
        this._productEdit(product);
        break;
      case 'delete':
        this._productDelete(product);
        break;
    }
  };

  _setdata(brandList) {
    let mockTableListData = []
    brandList.map((brand, i) => {
      mockTableListData.push({
        key: i + 1,
        image: <img src={baseUrl + brand.image} style={{ width: '30px' }} />,
        productId: brand.initial,
        name: brand.name,
        shortName: brand.shortName,
        tagNames: brand.tagNames,
        initial:brand.initial,
        isHot: brand.isHot == true? '是' : '否',
        isHomePage: brand.isHomePage,
        countryId: brand.countryId,
        countryName: brand.countryName,
        createTime: brand.createTime,
        updateTime: brand.updateTime,
        action: <div className='brandlist'>
          {/* <a href="javascript:;">主页</a> */}
          <Button size='small' icon='delete' onClick={this.productAction.bind(this, brand, 'delete')} >删除</Button>
          &nbsp;&nbsp;&nbsp;
          <Button size='small' icon='edit' onClick={this.productAction.bind(this, brand, 'edit')} >编辑</Button>
        </div>
      })
    })
    this.setState({
      brandList,
      mockTableListData,
    })
  }

  // 页面条数改变
  pageSizeChange = (current, pageSize) => {
    console.log(this.state.paramsa.filters)
    console.log(current, pageSize);
    this.setState({
      pagesize: pageSize,
    });

    let params = {
      pageidx: 1,
      pagesize: pageSize,
      filters: this.state.paramsa.filters
    };

    this.setState({
      savesize: pageSize,
      savemodel: params,
    });
    this._getBrandList(params);
  };

  // 页码改变
  pageChange = (page, pageSize) => {
    console.log(this.state.paramsa.filters)
    console.log('当前页码',page);
    console.log('当前页显示条数', pageSize)
    if (this.state.paramsa.filters) {
      let params = {
        pageidx: page,
        pagesize: pageSize,
        filters: this.state.paramsa.filters
      };
      this.setState({
        savesize: pageSize,
        savemodel: params,
      });
      this._getBrandList(params);
    } else {
      let params = {
        pageidx: page,
        pagesize: pageSize,
        // filters: this.state.paramsa.filters
      };
      this.setState({
        savemodel: params,
      });
      this._getBrandList(params);
    }
  };

  // 搜索
  search = (params) => {
    // console.log(params)
    let paramsa = params.params
    // console.log(paramsa.filters)
    let paramsb = {
      pageidx: 1,
      pagesize: this.state.savesize,
      filters: paramsa.filters,
    }

    this.setState({
      paramsa: paramsa,
    });

    this._getBrandList(paramsb)

    // this.setState({
    //   loadingSearch: true,
    // });

    // setTimeout(()=> {
    //   this.setState({
    //     loadingSearch: false,
    //   });
    //   this.setState({
    //     // mockTableListData
    //   });
    // }, 1000);
  }

  pusha = (val) => {
    this.setState({
      name: val.value,
    });
    console.log(this.state.name)
  }
  pushb = (val) => {
    this.setState({
      shortName: val.value,
    });
    console.log(this.state.shortName)
  }
  pushc = (val) => {
    this.setState({
      countryId: val.value,
    });
    console.log('设置前国家id',this.state.countryId)
  }
  pushd = (val) => {
    this.setState({
      tagNames: val.value,
    });
    console.log(this.state.tagNames)
  }
  pushe = (val) => {
    this.setState({
      initial: val.value,
    });
    console.log(this.state.initial)
  }

  // 添加提示窗口
  showModal = () => {
    localStorage.setItem('localBrandData', '');
    this.setState({
      visible: true,
      fileList: []
    });
  }

  // 编辑提示窗口
  showModala = (params) => {
    console.log(params)
    // let data = {
    //   uid: '-1',
    //   name: params.imagePath,
    //   status: 'done',
    //   url: baseUrl + params.imagePath,
    // }
    // fileList.push(data)
    console.log('唤醒编辑框') 
    var brandData = JSON.stringify(params);// 转成JSON格式
    localStorage.setItem('localBrandData', '');
    localStorage.setItem('localBrandData', brandData);
    let localdatas = JSON.parse(brandData)
    console.log(localdatas)
    if (localdatas) {
      console.log(localdatas.isHot)
      this.setState({
        value: localdatas.isHot,
        name: localdatas.name,
        shortName: localdatas.shortName,
        countryId: localdatas.countryId,
        tagNames: localdatas.tagNames,
        isHot: localdatas.isHot,
        image: localdatas.image,
        initial: localdatas.initial,
      });
    }
    if (localdatas.imageURL !='') {
      // fileList.push({'url':localdatas.imageURL})
      // console.log(localdatas)
      let fileList = []
      let data = {
        uid: '-1',
        name: localdatas.name,
        status: 'done',
        url: baseUrl + localdatas.image,
      }
      fileList.push(data)
      this.setState({
        fileList: fileList,
      });
      // console.log(this.state.fileList)
    }
    this.setState({
      visiblea: true,
    });
  }
  
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    // 保存新增的品牌
    let params = {
      name: this.state.name,
      shortName: this.state.shortName,
      countryId: this.state.countryId,
      tagNames: this.state.tagNames,
      isHot: this.state.isHot,
      image: this.state.image,
      initial: this.state.initial,
    };
    this._savebrand(params)
  }

  handleOka = (e) => {
    this.setState({
      visiblea: false,
    });
    // 保存新增的品牌
    let params = {
      name: this.state.name,
      shortName: this.state.shortName,
      countryId: this.state.countryId,
      tagNames: this.state.tagNames,
      isHot: this.state.isHot,
      image: this.state.image,
      initial: this.state.initial,
    };
    // console.log(params)
    console.log()
    this._savebrand(params)
  }

  _savebrand(params) {
    console.log(typeof(params))
    
    saveBrand(params, 'POST').then(res => {
      if (res.data.code === ERR_OK) {
        console.log(res)
        message.success('保存成功')
        let params = {
          pageidx: 1,
          pagesize: this.state.savesize,
          filters: this.state.paramsa.filters
        };
        this._getBrandList(params);
      } else {
        message.error('保存失败')
      }
    });
  }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancela = (e) => {
    // console.log(e);
    this.setState({
      visiblea: false,
    });
  }
  // radio
  clickRadio = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      isHot: e.target.value,
    });
  }
  // 上传操作
  uploadac = (val) => {
    let fileList = this.state.fileList
    fileList = fileList.slice(-2);
    this.setState({
      fileList: fileList
    });
    if (val.file.response) {
      console.log('上传部分',val.file.response.imagePath)
      this.setState({
        image: val.file.response.imagePath,
      });
    }
  }

  uphandleChange = (fileList, val) => {
    console.log(fileList)
    // fileList = fileList.slice(-2)
    this.setState({
      fileList: fileList.fileList,
    })
    if (fileList.fileList[0]) {
      if (fileList.fileList[0].response) {
        this.setState({
          imagePath: fileList.fileList[0].response.imagePath
        })
      }
    }
  }

  // 删除品牌确认
  _productDelete(product) {
    let _this = this;
    confirm({
      title: '提示',
      content: '确认删除吗',
      onOk() {
        // console.log('ok')
        console.log(product)
        let params = {
          brandId: product.brandId,
        };
        _this._brandDelete(params);
      },
      onCancel() {
        console.log('取消删除')
      }
    })
  }
  // 删除品牌
  _brandDelete(params) {
    brandDelete(params, 'POST').then(res => {
      if (res.data.code !== ERR_OK) {
        message.error(res.data.msg);
        return;
      }
      if (res.data.code === ERR_OK) {
        message.success(res.data.msg);
        let params = {};

        if (!this.state.savemodel) {
          params = {
            pageidx: 1,
            pagesize: 5,
          }
        }
        if (this.state.savemodel) {
          params = this.state.savemodel;
        }

        this._getBrandList(params);
      }
    })
  }

  // 编辑品牌
  _productEdit=(params)=> {
    this.showModala(params);
    console.log('触发编辑操作')
  }

  uphandlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  
  render() {
    // const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    // 编辑 移除图片
    const removeAction=()=> {
      console.log('移除图片')
      this.setState({
        fileList: ''
      })
      // let fileList = ''
    }

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="page goods-page">
        <div className="m-t-lg">
        {/* 页面固钉 */}
        {/* <Affix offsetTop={200} onChange={affixed => console.log(affixed)}>
          <Button className='fixbtn'>回到顶部</Button>
        </Affix> */}
          {/* <div className="texty-demo" style={{ marginTop: 16 }}>
            <p className="buttons" style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={this.onshowtxt}>切换</Button>
            </p>
          </div> */}
          {/* 搜索 */}
          <Card hoverable={true} className="tableData">
            <Card hoverable={true}>
              <div className="top-other-btn" style={{marginBottom: '50px'}}>
                {/* <TweenOne
                  animation={this.state.animation}
                  paused={this.props.paused}
                  className="code-box-shape"
                  style={{
                    position: 'absolute',
                    transformOrigin: 'center bottom',
                  }}
                >   */}
                <Button type="primary" onClick={this.showModal} className='addBrrandBtn'>
                  添加新品牌
                  {/* <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '添加新品牌'}</Texty> */}
                </Button>
                  
                {/* </TweenOne>                 */}
              </div>
              <WrappedAdvancedSearchForm
                search={this.search}
                loadingSearch={this.state.loadingSearch}
              />
            </Card>
            <Table
              dataSource={this.state.mockTableListData}
              columns={this.state.goodsTableColumns}
              locale={this.state.tableEmpty}
              rowSelection={rowSelection}
              loading={this.state.loadingSearch}
              pagination={false}
              className='brandlist'
            />
            <Pagination
              defaultCurrent={this.state.defaultCurrent}
              pageSize={this.state.pagesize}
              showSizeChanger
              total={this.state.dataTotal}
              pageSizeOptions={this.state.pageSizeOptions}
              onShowSizeChange={this.pageSizeChange}
              onChange={this.pageChange.bind(this)}
            />
          </Card>
        </div>
        {/* 添加新品牌 */}
        <Modal
          title="添加品牌"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          width={700}
          className='brandAddModal'
        >
        <div>
          <PushData
            pusha={this.pusha}
            pushb={this.pushb}
            pushc={this.pushc}
            pushd={this.pushd}
            pushe={this.pushe}
            // loadingSearch={this.state.loadingSearch}
          />
          <RadioGroup onChange={this.clickRadio} value={this.state.value} className='addCheackRadio'>
            <Radio value={true}>设置为热门</Radio>
            <Radio value={false}>设置为非热门</Radio>
          </RadioGroup>
          <Upload
            // {...props}
            action= {fileUpload}
            listType= 'picture'
            defaultFileList= {fileList}
            onChange={this.uploadac}
          >
            {/* <Button className='brandAddBtn'>
              <Icon type="upload" />上传商品图片
            </Button> */}
              {fileList.length >=1? null : <Button className='brandAddBtn' ><Icon type="upload" />上传商品图片</Button>}
          </Upload>
        </div>
        </Modal>
        {/* 编辑品牌 */}
        <Modal
          title="编辑品牌"
          visible={this.state.visiblea}
          onOk={this.handleOka}
          onCancel={this.handleCancela}
          destroyOnClose={true}
          width={600}
          className='brandAddModal'
        > 
          <PushData
            pusha={this.pusha}
            pushb={this.pushb}
            pushc={this.pushc}
            pushd={this.pushd}
            pushe={this.pushe}
            // loadingSearch={this.state.loadingSearch}
          />
          {/* <RadioGroup onChange={this.clickRadio} value={this.state.value} defaultValue={true} className='addCheackRadio'> */}
          <RadioGroup onChange={this.clickRadio} defaultValue={this.state.value} className='addCheackRadio'>
            <Radio value={true}>热门品牌</Radio>
            <Radio value={false}>非热门品牌</Radio>
          </RadioGroup>
          <Upload
            action= {fileUpload}
            listType= 'picture'
            defaultFileList= {fileList}
            onChange={this.uploadac}
            onRemove={removeAction}
          >
            {fileList.length >=1? null : <Button className='brandAddBtn' ><Icon type="upload" />上传商品图片</Button>}
            {/* <Button className='brandAddBtn' ><Icon type="upload" />上传商品图片</Button> */}
          </Upload>
        </Modal>
      </div>
    )
  }
}
