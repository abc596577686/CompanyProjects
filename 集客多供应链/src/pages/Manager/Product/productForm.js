 import React from 'react';
import uuid from 'uuid';
import Editor from 'wangeditor';
import ReactDOM from 'react-dom';
import {
  Form,
  Select,
  Input,
  Button,
  Icon,
  Row,
  Col,
  Card,
  Cascader,
  Table,
  message,
  Checkbox,
  Tooltip,
  AutoComplete,
  Upload,
  InputNumber,
  Popconfirm,
  Modal,
  Popover,
  Radio
} from 'antd';
import './index.less';
import {
  getProductParamList,
  saveProduct,
  getProductDetail,
  getEditorUploadURL,
  getFileUploadURL
} from '../../../axios/api';
import {getValForKey} from '../../../utils/index'
import {ERR_OK, baseUrl} from "../../../axios/config";

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;
const confirm = Modal.confirm;
 const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 16},
};

const formItemLayoutProductName= {
  labelCol: {span: 3},
  wrapperCol: {span: 20},
};

const formItemLayoutImage = {
  labelCol: {span: 3},
  wrapperCol: {span: 21}
};

const formItemLayoutSKU = {
  labelCol: {span: 3},
  wrapperCol: {span: 20}
};

const formItemLayoutForSpec = {
  labelCol: {span: 2},
  wrapperCol: {span: 12},
};
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  constructor(props) {
    super(props);
  };
  getInput = () => {
    return <Input/>;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      record,
      ...restProps
    } = this.props;

    return (
      <EditableContext.Consumer>
        {(form) => {
          const {getFieldDecorator} = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{margin: 0}}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入 ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    )
  }
};
class AntdUpload extends React.Component {
  constructor(props) {
    super(props);
    this.maxSize = props.maxSize;
    this.index = 0;
    if (props.index) {
      this.index = props.index;
    }
    let fileList = [];
    if (props.fileList != null
      && typeof props.fileList === 'object'
      && !isNaN(props.fileList.length)) {
      fileList.push(...props.fileList);
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      headers: {
        Authorization: localStorage.getItem('token')
      },
      superComponent: props.superComponent,
      fileList: fileList
    };
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  }

  handleChange = (e) => {
    let fileList = this.handleUpload(e);
    if (typeof this.state.superComponent.onChangeImageFileList === 'function') {
      this.state.superComponent.onChangeImageFileList(fileList, this.index);
    }
  }

  handleUpload = (e) => {
    let fileList = e.fileList.map(file => {
      if (file.response) {
        //这个地方是上传结束之后会调用的方法，这边是判断success!!!
        if (file.response.success) {
          return this.filter(file);
        }
      }
      return file;
    });
    this.setState({fileList: fileList});
    return fileList;
  }

  filter = (file) => {
    const {name, response, uid, status} = file;
    return {name, url: baseUrl + response.imagePath, uid, status};
  }

  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('上传图片大小限制不能超过1MB!');
    }
    return isLt2M;
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">图片上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          accept="image/jpg,image/jpeg,image/png,image/bmp"
          action={getFileUploadURL()}
          listType="picture-card"
          headers={this.state.headers}
          fileList={fileList}
          multiple={true}
          withCredentials={true}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}>
          {fileList.length >= this.maxSize ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
};
// 添加商品
class ProductForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexComponent: props.indexComponent,
      // 默认新建商品
      isCreateProduct: true,
      isSingleProduct: false,
      isProductSpecEidtStatus: false,
      isOpenEditor: false,
      // from表单基础数据
      fromBaseData: {
        productId: '',
        name: '',
        wareHouseId: '',
        postTplId: '',
        productDetail: '',
        productDescribe: '',
        productCopywriter: '',
        usageMethod: '',
        purchaseNotes: '',
        productIntros: '',
        brandId: '',
        countryId: '',
        categoryId: '',
        categorys: [],
        status: false,
        wareHouseTpls: [],
        productPrice: ''
      },
      // 商品规格信息
      primarySpecTypeId: '',
      primarySpecData: [],
      secondarySpecTypeId: '',
      secondarySpecData: [],
      // 商品规格头列表
      specHeaderColumnList: [],
      // 商品规格明细列表
      productSpecDataList: [],
      // 商品规格类型层级
      productSpecLevel: 0,
      // 商品大图
      imageFileList: [],
      goodsOtherA: false,
      goodsOtherB: false,
      goodsOtherC: false,

      // 仓库列表
      optionGoodsA: [],
      // 品牌列表
      optionGoodsB: [],
      // 规格类型列表
      optionGoodsC: [],
      // 商品国家
      optionGoodsCountry: [],
      // 商品分类
      optionsGoodsClass: [],
      // 规格值
      specItem: [{
        specTagId: '',
        specTypeId: '',
        text: '',
        imgUrl: ''
      }],
      // 规格图片
      imageUrl: '',
      loading: false,
      defulatColumnsList: [
        {
        title: '商品条码',
        dataIndex: 'productUpc',
        width: '12%',
        editable: true
      },{
        title: '商品货号',
        dataIndex: 'productCode',
        width: '12%',
        editable: true
      }, {
        title: '规格编码',
        dataIndex: 'productSku',
        width: '9%',
        editable: true
      }, {
        title: '指导价',
        dataIndex: 'priceRecommend',
        width: '9%',
        editable: true
      }, {
        title: '库存量',
        dataIndex: 'stockNumber',
        width: '9%',
        editable: true
      }, {
        title: '净量(克)',
        dataIndex: 'weight',
        width: '9%',
        editable: true
      }, {
        title: '操作',
        dataIndex: '操作',
        width: '10%',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record)}
                        style={{marginRight: 8}}
                      >
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="是否确定取消?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>编辑</a>
              )}
            </div>
          );
        },
      }]
    }
    // 编辑商品对象初始化数据
    if(props.isEditProduct){
      this.initData(props.productId);
    }
  }
  initData(productId) {
    getProductDetail({productId: productId}, 'GET').then(res => {
      if (res.data.code === '1') {
        let baseData = this.state.fromBaseData;
        let productSpecLevel = res.data.data.productSpecLevel;
        let product = res.data.data.product;
        let isSingleProduct = product.isSingleProduct;
        baseData.productId = product.productId;
        baseData.name = product.name;
        baseData.postTplId = product.postTplId;
        baseData.productDetail = (product.productDetail + '').replace(/#IMAGE#/g, baseUrl);
        baseData.productDescribe = product.productDescribe;
        baseData.productCopywriter = product.productCopywriter;
        baseData.usageMethod = product.usageMethod;
        baseData.purchaseNotes = product.purchaseNotes;
        baseData.productIntros = product.productIntros;
        baseData.brandId = product.brandId;
        baseData.countryId = product.countryId;
        baseData.categoryId = product.categoryId;
        baseData.status = product.status;
        baseData.isFreePostage = product.isFreePostage
        baseData.isFreeTax = product.isFreeTax
        this.editor.txt.html(baseData.productDetail);

        // 商品一级二级分类
        let categorys = [];
        if (Number.isInteger(product.categoryFid)) {
          categorys[0] = product.categoryFid;
          if (Number.isInteger(product.categoryId)) {
            categorys[1] = product.categoryId;
          }
        }
        baseData.categorys = categorys;

        // 商品所属仓库和邮费模板
        let wareHouseTpls = [];
        if (Number.isInteger(product.wareHouseId)) {
          wareHouseTpls[0] = product.wareHouseId;
          if (Number.isInteger(product.postTplId)) {
            wareHouseTpls[1] = product.postTplId;
          }
        }
        baseData.wareHouseTpls = wareHouseTpls;

        // 商品主图列表
        let imageList = [];
        let tmpImageList = res.data.data.imageFileList;
        if (tmpImageList != null && tmpImageList.length > 0) {
          for (let i = 0; i < tmpImageList.length; i++) {
            imageList.push({
              uid: tmpImageList[i].uid,
              name: tmpImageList[i].name,
              url: baseUrl + tmpImageList[i].url,
              status: tmpImageList[i].status
            });
          }
        }

        let primarySpecTypeId = '';
        let primarySpecData = [];
        let secondarySpecTypeId = '';
        let secondarySpecData = [];
        let productSpecDataList = [];
        let columnsList = [];

        // 商品规格列表信息
        let productSpecList = res.data.data.productSpecList;
        if (productSpecList != null && productSpecList.length > 0) {
          for (let i = 0; i < productSpecList.length; i++) {
            let productSpec = productSpecList[i];
            let objectData = {};
            objectData.key = uuid.v4();
            objectData.productSpecId = productSpec.productSpecId;
            objectData.primarySpecTagId = productSpec.primarySpecTagId;
            objectData.secondarySpecTagId = productSpec.secondarySpecTagId;
            objectData.productUpc = productSpec.productUpc;
            objectData.productCode = productSpec.productCode;
            objectData.productSku = productSpec.productSku;
            objectData.priceRecommend = productSpec.priceRecommend;
            objectData.stockNumber = productSpec.stockNumber;
            objectData.weight = productSpec.weight;
            objectData[productSpec.primarySpecTypeId] = productSpec.primarySpecTagName;
            objectData[productSpec.secondarySpecTypeId] = productSpec.secondarySpecTagName;
            productSpecDataList.push(objectData);
          }
        }
        // 商品一级规格列表
        let primarySpecList = res.data.data.primarySpecData;
        if (primarySpecList != null && primarySpecList.length > 0) {
          let primarySpecTypeName = '';
          for (let i = 0; i < primarySpecList.length; i++) {
            let primarySpec = primarySpecList[i];
            primarySpecTypeId = primarySpec.specTypeId;
            primarySpecTypeName = primarySpec.specTypeName;

            primarySpecData.push({
              specTagId: primarySpec.specTagId,
              specTypeId: primarySpec.specTypeId,
              text: primarySpec.specTagName,
              imgUrl: baseUrl + primarySpec.imagePath
            });
          }

          columnsList.push({
            width: '15%',
            title: primarySpecTypeName,
            dataIndex: primarySpecTypeId,
            editable: false
          })
        }

        // 商品二级规格列表
        if (productSpecLevel > 1) {
          let secondarySpecList = res.data.data.secondarySpecData;
          if (secondarySpecList != null && secondarySpecList.length > 0) {
            let secondarySpecTypeName = '';
            for (let j = 0; j < secondarySpecList.length; j++) {
              let secondarySpec = secondarySpecList[j];
              secondarySpecTypeId = secondarySpec.specTypeId;
              secondarySpecTypeName = secondarySpec.specTypeName;
              secondarySpecData.push({
                specTagId: secondarySpec.specTagId,
                specTypeId: secondarySpec.specTypeId,
                text: secondarySpec.specTagName,
                imgUrl: ''
              });
            }

            columnsList.push({
              width: '15%',
              title: secondarySpecTypeName,
              dataIndex: secondarySpecTypeId,
              editable: false
            })
          }
        }

        columnsList.push(...this.state.defulatColumnsList);
        this.setState({
          isCreateProduct: false,
          isSingleProduct: isSingleProduct,
          imageFileList: imageList,
          productSpecLevel: productSpecLevel,
          fromBaseData: baseData,
          primarySpecTypeId: primarySpecTypeId,
          primarySpecData: primarySpecData,
          secondarySpecTypeId: secondarySpecTypeId,
          secondarySpecData: secondarySpecData,
          productSpecDataList: productSpecDataList,
          specHeaderColumnList: columnsList
        });
      } else {
        message.error(res.data.msg, 5)
      }
    })
  }

  componentDidMount() {
    this._getProductParamList();

    //获取真实dom，创新富文本编辑器
    this.editor = new Editor(ReactDOM.findDOMNode(this._div));
    // 自定义菜单配置
    this.editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'justify',  // 对齐方式
      'quote',  // 引用
      'image',  // 插入图片
      'undo',  // 撤销
      'redo'  // 重复
    ];

    // 网络图片隐藏
    this.editor.customConfig.showLinkImg = false;

    // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
    this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    this.editor.customConfig.uploadImgServer = getEditorUploadURL()  // 上传图片到服务器
    // 将图片大小限制为 5M
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
    // 将 timeout 时间改为 30s
    this.editor.customConfig.uploadImgTimeout = 30000
    this.editor.customConfig.h
    // 跨域上传中如果需要传递 cookie 需设置 withCredentials
    this.editor.customConfig.withCredentials = true
    // 上传图片时刻自定义设置 header
    this.editor.customConfig.uploadImgHeaders = {
      Authorization: localStorage.getItem('token')
    }

    // 监听函数在上传图片的不同阶段做相应处理
    this.editor.customConfig.uploadImgHooks = {
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        if (result.success
          && result.data
          && result.data.length) {
          result.data.forEach((filePath, index) => {
            insertImg(baseUrl + filePath);
          });
          message.success(result.message);
        } else {
          message.error(result.message, 5);
        }
      }
    }

    // 自定义提示方法
    this.editor.customConfig.customAlert = function (info) {
      message.error(info, 5);
    }

    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = (html) => {
      let baseData = this.state.fromBaseData;
      baseData.productDetail = html;
      this.setState({
        fromBaseData: baseData
      });
    }

    this.editor.create();
    this.setState({isOpenEditor: true})
  };

  // 商品编辑参数信息
  _getProductParamList() {
    getProductParamList({}, 'GET').then(res => {
      if (res.data.code !== ERR_OK) return;
      if (res.data.code === ERR_OK) {
        // 商品分类
        let categoryList = res.data.data.productCategoryList;
        if (categoryList && categoryList.length > 0) {
          let optionsGoodsClass = [];
          categoryList.map((item, i) => {
            let levelA = {
              value: item.categoryId,
              label: item.name
            };

            if (item.childrenList) {
              levelA['children'] = [];
              item.childrenList.map((innerItem, j) => {
                let levelB = {
                  value: innerItem.categoryId,
                  label: innerItem.name
                };
                levelA['children'].push(levelB);
              })
            }
            optionsGoodsClass.push(levelA);
          });
          this.setState({optionsGoodsClass});
        }

        // 仓库邮费模板
        let warehouseList = res.data.data.productWarehouseList;
        if (warehouseList && warehouseList.length > 0) {
          let optionGoodsA = [];
          warehouseList.map((item, i) => {
            let levelA = {
              value: item.warehouseId,
              label: item.name
            };

            if (item.postageTplList) {
              levelA['children'] = [];
              item.postageTplList.map((innerItem, j) => {
                let levelB = {
                  value: innerItem.postageTplId,
                  label: innerItem.name
                };
                levelA['children'].push(levelB);
              })
            }
            optionGoodsA.push(levelA);
          });
          this.setState({optionGoodsA});
        }

        // 商品分类
        let brandList = res.data.data.productBrandList;
        if (brandList && brandList.length > 0) {
          let optionGoodsB = [];
          brandList.map((item, i) => {
            optionGoodsB.push({
              value: item.brandId,
              label: item.name
            })
          });
          this.setState({optionGoodsB});
        }

        // 商品国家
        let countryList = res.data.data.productCountryList;
        if (countryList && countryList.length > 0) {
          let optionGoodsCountry = [];
          countryList.map((item, i) => {
            optionGoodsCountry.push({
              value: item.countryId,
              label: item.countryName
            })
          });
          this.setState({optionGoodsCountry});
        }
        // 商品规格类型
        let specTypeList = res.data.data.productSpecTypeList;
        if (specTypeList && specTypeList.length > 0) {
          let optionGoodsC = [];
          specTypeList.map((item, i) => {
            optionGoodsC.push({
              value: item.typeId,
              label: item.name
            })
          });
          this.setState({optionGoodsC});
        }
      }
    });
  };

  handleInputGoodsName = (rule, value, callback) => {
    if (value.length > 300) {
      callback('商品名称最多300字符');
    }
    callback()
  };

  handleInputGoodsPrice = (rule, value, callback) => {
    if (value < 0.01) {
      callback('最小价格0.01')
    }
    callback()
  };

  //添加商品规格
  handleAddGoodsSpec = () => {
    let productSpecLevel = this.state.productSpecLevel;
    productSpecLevel++;
    this.setState({
      productSpecLevel: productSpecLevel
    })
  };

  // 获取规格类型名称
  getProductSpecTypeName = (specTypeId) => {
    if (this.state.optionGoodsC.length > 0) {
      for (let i = 0; i < this.state.optionGoodsC.length; i++) {
        let goodsItem = this.state.optionGoodsC[i];
        if (goodsItem.value == specTypeId) {
          return goodsItem.label;
        }
      }
    }
    return specTypeId;
  };

  // 保存商品信息
  _saveProduct = () => {
    if(this.state.productSpecDataList == null 
      || this.state.productSpecDataList.length <= 0){
      message.error('规格信息不能为空', 5);
      return;
    }else if(this.state.isProductSpecEidtStatus){
      message.error('规格信息编辑状态不能保存', 5);
      return;
    }

    let params = {
      isSingleProduct: this.state.isSingleProduct,
      baseData: this.state.fromBaseData,
      primarySpecData: this.state.primarySpecData,
      secondarySpecData: this.state.secondarySpecData,
      productSpecDataList: this.state.productSpecDataList,
      productSpecLevel: this.state.productSpecLevel,
      imageFileList: this.state.imageFileList
    };
    console.log(params)

    let thiz = this;
    confirm({
      title: '确认提交吗？',
      content: '请先确认已编辑的商品信息完整无误',
      onOk() {
        saveProduct(params, 'POST').then(res => {
          if (res.data.code === '1') {
            let product = res.data.data;
            if(product != null && product.length > 0){
              let baseData = thiz.state.fromBaseData;
              baseData.productId = product.productId;
              thiz.setState({fromBaseData: baseData});
              thiz.state.indexComponent.updateCallback(product.name, product.productId);
            }
          
            message.success(res.data.msg);
          }else{
            message.error(res.data.msg, 4);
          }
        })
      }
    });
  };

  // from表单基础数据
  _handleChange = (name, type, event) => {
    let baseData = this.state.fromBaseData;
    if (type === 1) {
      if (name === 'categoryId') {
        if (event.length > 1) {
          baseData[name] = event[1];
        }
      } else if (name === 'postTplId') {
        if (event.length > 1) {
          baseData[name] = event[1];
        }
      } else {
        baseData[name] = event;
      }
    } else if (type === 2) {
      baseData[name] = event.target.checked;
    } else {
      baseData[name] = event.target.value;
    }
    this.setState({
      fromBaseData: baseData
    });
  };

  // 匹配已存在的商品规格信息
  _getProductSpecItem = (primarySpecTagId, secondarySpecTagId) => {
    if (this.state.productSpecDataList.length > 0) {
      for (let i = 0; i < this.state.productSpecDataList.length; i++) {
        let productSpec = this.state.productSpecDataList[i];
        if (this.state.productSpecLevel > 1
          && productSpec.primarySpecTagId == primarySpecTagId
          && productSpec.secondarySpecTagId == secondarySpecTagId) {
          return productSpec;
        } else if (this.state.productSpecLevel > 0
          && productSpec.primarySpecTagId == primarySpecTagId) {
          return productSpec;
        }
      }
    }
    return null;
  }

  // 规格信息动态数据组合
  stateCallback = () => {
    let data = [];
    let columnsList = [];
    let productSpecData = [];

    let singleKey = uuid.v4();
    if(this.state.isSingleProduct){
      let objectData = {};
      objectData.key = singleKey;
      objectData.productUpc = '';
      objectData.productCode = '';
      objectData.productSku = '';
      objectData.priceRecommend = '';
      objectData.stockNumber = '';
      objectData.weight = '';
      data.push(objectData);
    }else{
      let primarySpecTypeKey = uuid.v4();
      let secondarySpecTypeKey = uuid.v4();
      if (this.state.productSpecLevel > 0 && Number(this.state.primarySpecTypeId) > 0) {
        columnsList.push({
          width: '15%',
          title: this.getProductSpecTypeName(Number(this.state.primarySpecTypeId)),
          dataIndex: primarySpecTypeKey,
          editable: false
        })

        if (this.state.productSpecLevel > 1 && Number(this.state.secondarySpecTypeId) > 0) {
          columnsList.push({
            width: '15%',
            title: this.getProductSpecTypeName(Number(this.state.secondarySpecTypeId)),
            dataIndex: secondarySpecTypeKey,
            editable: false
          })
        }
      }

      if (this.state.productSpecLevel > 0 && this.state.primarySpecData.length > 0) {
        for (let i = 0; i < this.state.primarySpecData.length; i++) {
          let primarySpec = this.state.primarySpecData[i];
          if (this.state.productSpecLevel > 1 && this.state.secondarySpecData.length > 0) {
            for (let j = 0; j < this.state.secondarySpecData.length; j++) {
              let secondarySpec = this.state.secondarySpecData[j];

              let objectData = {};
              objectData.key = uuid.v4();
              objectData.primarySpecTagId = primarySpec.specTagId;
              objectData.secondarySpecTagId = secondarySpec.specTagId;
              objectData[primarySpecTypeKey] = primarySpec.text;
              objectData[secondarySpecTypeKey] = secondarySpec.text;
              let productSpec = this._getProductSpecItem(primarySpec.specTagId, secondarySpec.specTagId);
              if (productSpec != null 
                && objectData.primarySpecTagId == productSpec.primarySpecTagId
                && objectData.secondarySpecTagId == productSpec.secondarySpecTagId) {
                objectData.productSpecId = productSpec.productSpecId;
                objectData.productUpc = productSpec.productUpc;
                objectData.productCode = productSpec.productCode;
                objectData.productSku = productSpec.productSku;
                objectData.priceRecommend = productSpec.priceRecommend;
                objectData.stockNumber = productSpec.stockNumber;
                objectData.weight = productSpec.weight;
              } else {
                objectData.productUpc = '';
                objectData.productCode = '';
                objectData.productSku = '';
                objectData.priceRecommend = '';
                objectData.stockNumber = '';
                objectData.weight = '';
              }
              data.push(objectData);
            }
          } else {
            let objectData = {};
            objectData.key = uuid.v4();
            objectData.primarySpecTagId = primarySpec.specTagId;
            objectData.secondarySpecTagId = '';
            objectData[primarySpecTypeKey] = primarySpec.text;
            objectData[secondarySpecTypeKey] = '';
            let productSpec = this._getProductSpecItem(primarySpec.specTagId, '');
            if (productSpec != null && objectData.primarySpecTagId == productSpec.primarySpecTagId) {
              objectData.productSpecId = productSpec.productSpecId;
              objectData.productUpc = productSpec.productUpc;
              objectData.productCode = productSpec.productCode;
              objectData.productSku = productSpec.productSku;
              objectData.priceRecommend = productSpec.priceRecommend;
              objectData.stockNumber = productSpec.stockNumber;
              objectData.weight = productSpec.weight;
            } else {
              objectData.productUpc = '';
              objectData.productCode = '';
              objectData.productSku = '';
              objectData.priceRecommend = '';
              objectData.stockNumber = '';
              objectData.weight = '';
            }
            data.push(objectData);
          }
        }
      }
    }

    columnsList.push(...this.state.defulatColumnsList);
    this.setState({
      productSpecDataList: data,
      specHeaderColumnList: columnsList
    }, function(){
      if(this.state.isSingleProduct){
        this.edit(singleKey);
      }
    })
  }

  onChangeImageFileList = (fileList) => {
    setTimeout(() => {
      this.setState({
        imageFileList: fileList
      })
    }, 300)
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({editingKey: key, isProductSpecEidtStatus: true});
  }

  save(form, record) {
    form.validateFields((error, row) => {
      let key = record.key;
      if (error) {
        return;
      }
      
      const productSpecDataList = [...this.state.productSpecDataList];
      const index = productSpecDataList.findIndex(item => key === item.key);

      let newProductUpc = row.productUpc;
      let newProductCodeSku = row.productCode + '_' + row.productSku;
      for(let idx = 0; idx < productSpecDataList.length; idx ++){
        let item = productSpecDataList[idx];
        if(idx != index){
          if(newProductUpc == item.productUpc){
            message.warn('商品条码不能重复', 5);
            return;
          }
          
          let oldProductCodeSku = item.productCode + '_' + item.productSku;
          if(newProductCodeSku == oldProductCodeSku){
            message.warn('商品货号、商品规格不能重复', 5);
            return;
          }
        }
      }

      if (index > -1) {
        const item = productSpecDataList[index];
        productSpecDataList.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({productSpecDataList: productSpecDataList, editingKey: '', isProductSpecEidtStatus: false});
      } else {
        productSpecDataList.push(row);
        this.setState({productSpecDataList: productSpecDataList, editingKey: '', isProductSpecEidtStatus: false});
      }
    });
  }

  cancel = () => {
    this.setState({editingKey: ''});
  };

  handleUploadChange = (val) => {
    if (val.file.response) {
      this.setState({
        image: val.file.response.filePath,
      });
    }
  }

  _handleChangeSingleProduct = (event) => {
    this.setState({
      isSingleProduct: event.target.checked,
      productSpecLevel: 0,
      primarySpecTypeId: null,
      primarySpecData: [],
      secondarySpecTypeId: null,
      secondarySpecData: [],
      productSpecDataList: []
    }, this.stateCallback);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const getHeaderColumns = this.state.specHeaderColumnList.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    // 商品名
    const EleGoodsName = (
      <FormItem
        {...formItemLayoutProductName}
        label="商品名称">
        {
          getFieldDecorator('goodsName', {
            initialValue: this.state.fromBaseData.name,
            rules: [{
              required: true,
              message: '商品名称必须填写'
            }, {
              validator: this.handleInputGoodsName
            }],
          })(
            <Input onChange={this._handleChange.bind(this, 'name', 0)} placeholder="请填写商品名称"/>
          )
        }
      </FormItem>
    );

    // 商品分类
    const EleGoodsClass = (
      <FormItem
        label="商品分类"
        {...formItemLayout}>
        {
          getFieldDecorator('goodsClass', {
            initialValue: this.state.fromBaseData.categorys,
            rules: [{
              required: true,
              message: '商品类型必须选择'
            }]
          })(
            <Cascader 
              options={this.state.optionsGoodsClass}
              onChange={this._handleChange.bind(this, 'categoryId', 1)}
              placeholder="请选择分类"/>
          )
        }
      </FormItem>
    );

    // 商品品牌
    const EleGoodsBrand = (
      <FormItem
        label="商品品牌"
        {...formItemLayout}>
        {
          getFieldDecorator('brandId', {
            initialValue: this.state.fromBaseData.brandId,
            rules: [{
              required: true,
              message: '商品品牌必须选择'
            }]
          })(
            <Select
              showSearch
              placeholder="请选择品牌"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={this._handleChange.bind(this, 'brandId', 1)}>
              {
                this.state.optionGoodsB.map((item, i) =>
                  <Option key={i} value={item.value}>{item.label}</Option>
                )
              }
            </Select>
          )
        }
      </FormItem>
    );

    // 商品国家
    const EleGoodsCountry = (
      <FormItem
        label="商品国家"
        {...formItemLayout}>
        {
          getFieldDecorator('countryId', {
            initialValue: this.state.fromBaseData.countryId,
            rules: [{
              required: true,
              message: '商品国家必须选择'
            }]
          })(
            <Select
              showSearch
              placeholder="请选择商品国家"
              onChange={this._handleChange.bind(this, 'countryId', 1)}>
              {
                this.state.optionGoodsCountry.map((item, i) =>
                  <Option key={i} value={item.value}>{item.label}</Option>
                )
              }
            </Select>
          )
        }
      </FormItem>
    );

    //商品仓库
    const EleGoodsWarehouse = (
      <FormItem
        label="仓库与邮费"
        {...formItemLayout}>
        {
          getFieldDecorator('optionGoodsA', {
            initialValue: this.state.fromBaseData.wareHouseTpls,
            rules: [{
              required: true,
              message: '请选择所属仓库和邮费模板'
            }]
          })(
            <Cascader 
              options={this.state.optionGoodsA}
              onChange={this._handleChange.bind(this, 'postTplId', 1)}
              placeholder="请选择仓库和邮费"/>
          )
        }
      </FormItem>
    );
    //是否包邮
    const EleIsFreePostage = (
      <FormItem
        label="是否包邮"
        {...formItemLayout}>
        <RadioGroup onChange={this._handleChange.bind(this,'isFreePostage','3')}
                    value={this.state.fromBaseData.isFreePostage}
                    style={{paddingTop:'10px'}}
        >
          <Radio value={false}>不包邮</Radio>
          <Radio value={true}>包邮</Radio>
        </RadioGroup>
      </FormItem>
    );
    //是否免税
    const EleIsFreeTax = (
      <FormItem
        label="是否免税"
        {...formItemLayout}>
        <RadioGroup onChange={this._handleChange.bind(this,'isFreeTax','3')}
                    value={this.state.fromBaseData.isFreeTax}
                    style={{paddingTop:'10px'}}
        >
          <Radio value={false}>非免税商品</Radio>
          <Radio value={true}>免税商品</Radio>
        </RadioGroup>
      </FormItem>
    );

    // 动态商品规格编辑组件
    class ChilderAntdUpload extends AntdUpload {
    }

    // 规格商品button按钮
    const EleGroupCheckbox = (
      <FormItem className="goodsSelectSpec">
        <Row>
          <Col span={6}>
            <Button
              style={{margin: '1px 6px 4px'}}
              onClick={this.handleAddGoodsSpec}>
              <Icon type="plus"/>添加规格
            </Button>
          </Col>
        </Row>
      </FormItem>
    );

    const EleGoodsDetail = (
      <FormItem>
        <Row style={{padding: '0 140px'}}>
          <Col span={15} className="wangEditor">
            {
              getFieldDecorator('productDetail', {
                initialValue: 'ssss',
                rules: [{
                  required: true,
                  message: '请填写描述',
                }, {
                  validator: this.validateEditorFrom
                }]
              })(<div ref={(ref) => this._div = ref}
                      className={this.state.isOpenEditor ? "goods-edit-text" : ''}></div>)
            }
          </Col>
        </Row>
      </FormItem>
    );

    // 动态商品规格编辑组件
    class BaseSpecComponent extends React.Component {
      constructor(props) {
        super(props);
        this.defaultPopover = 'defaultPopover';

        let specTypeId = '';
        let specDataList = [];
        let specTypeList = [];
        if (props.isPrimarySpec) {
          specTypeId = props.superComponent.state.primarySpecTypeId;
          specDataList = props.superComponent.state.primarySpecData;

          // 商品规格类型下拉菜单
          if (props.superComponent.state.optionGoodsC.length > 0) {
            for (let i = 0; i < props.superComponent.state.optionGoodsC.length; i++) {
              let goodsItem = props.superComponent.state.optionGoodsC[i];
              if (props.superComponent.state.productSpecLevel > 1
                && Number(props.superComponent.state.secondarySpecTypeId) > 0
                && goodsItem.value == Number(props.superComponent.state.secondarySpecTypeId)) {
                continue
              }

              specTypeList.push(goodsItem);
            }
          }
        } else {
          specTypeId = props.superComponent.state.secondarySpecTypeId;
          specDataList = props.superComponent.state.secondarySpecData;

          // 商品规格类型下拉菜单
          if (props.superComponent.state.optionGoodsC.length > 0) {
            for (let i = 0; i < props.superComponent.state.optionGoodsC.length; i++) {
              let goodsItem = props.superComponent.state.optionGoodsC[i];
              if (props.superComponent.state.productSpecLevel > 1
                && Number(props.superComponent.state.primarySpecTypeId) > 0
                && goodsItem.value == Number(props.superComponent.state.primarySpecTypeId)) {
                continue
              }

              specTypeList.push(goodsItem);
            }
          }
        }

        this.state = {
          imageFileList: [],
          isPrimarySpec: props.isPrimarySpec,
          isCreateProduct: props.superComponent.state.isCreateProduct,
          superComponent: props.superComponent,
          specTypeId: specTypeId,
          specDataList: specDataList,
          specTypeList: specTypeList,
          popoverList: {},
          specIndex: -1,
          specValue: '',
          isCreateSpec: true
        }
      }

      handleDeleteSpecBtn = () => {
        let zhisState = this.state;
        if (this.state.isPrimarySpec) {
          // 检查二级规格是否已删除
          if (this.state.superComponent.state.productSpecLevel > 1) {
            message.warn('请删除下级规格类型,再操作！', 5)
            return false;
          }
        }

        confirm({
          title: '警告',
          content: '删除后将影响规格值数据(货号、库存、重量等数据将清零),请谨慎操作?',
          onOk() {
            if (zhisState.isPrimarySpec) {
              zhisState.superComponent.setState({
                productSpecLevel: 0,
                primarySpecData: [],
                primarySpecTypeId: ''
              }, zhisState.superComponent.stateCallback)
            } else {
              zhisState.superComponent.setState({
                productSpecLevel: 1,
                secondarySpecData: [],
                secondarySpecTypeId: ''
              }, zhisState.superComponent.stateCallback)
            }
          }
        });
      }
      updateSpecDataList = (specDataList) => {
        if (this.state.isPrimarySpec) {
          this.state.superComponent.setState({
            primarySpecData: specDataList
          }, this.state.superComponent.stateCallback)
        } else {
          this.state.superComponent.setState({
            secondarySpecData: specDataList
          }, this.state.superComponent.stateCallback)
        }
      }
      handleDeleteSpecItem = (specIndex) => {
        let zhis = this;
        confirm({
          title: '警告',
          content: '删除后将影响规格值数据(货号、库存、重量等数据将清零),请谨慎操作?',
          onOk() {
            let specDataList = zhis.state.specDataList;
            specDataList.splice(specIndex, 1);
            zhis.updateSpecDataList(specDataList);
          }
        });
      }
      onChangeSelectSpecType = value => {
        this.setState({specTypeId: value});

        let specDataList = this.state.specDataList;
        if (specDataList.length > 0) {
          for (let i = 0; i < specDataList.length; i++) {
            specDataList[i].specTypeId = value;
          }
        }

        if (this.state.isPrimarySpec) {
          this.state.superComponent.setState({
            primarySpecTypeId: value,
            primarySpecData: specDataList
          }, this.state.superComponent.stateCallback)
        } else {
          this.state.superComponent.setState({
            secondarySpecTypeId: value,
            secondarySpecData: specDataList
          }, this.state.superComponent.stateCallback)
        }
      }
      onChangeImageFileList = (fileList, specIndex) => {
        setTimeout(() => {
          let imgUrl = '';
          if (fileList && fileList.length > 0) {
            imgUrl = fileList[0].url;
          }

          let specDataList = this.state.specDataList;
          specDataList[specIndex].imgUrl = imgUrl;
          this.updateSpecDataList(specDataList);
        }, 300)
      }
      getSpecFileList = (specItem) => {
        let imageList = [];
        if (specItem.imgUrl && specItem.imgUrl.length > 0) {
          imageList.push({
            uid: specItem.specTagId,
            name: specItem.text,
            url: specItem.imgUrl,
            status: 'done'
          });
        }
        return imageList;
      }
      closeAddProductSpec = () => {
        let popoverList = this.state.popoverList;
        Object.keys(popoverList).map((key, item) => {
          popoverList[key] = false;
        });

        this.setState({
          specIndex: -1,
          specValue: '',
          isCreateSpec: false,
          popoverList: popoverList
        });
      }
      showAddProductSpec = (clickName, index, value) => {
        if(this.state.specTypeId == null || this.state.specTypeId == ''){
          message.warn('请设置规格类型,再添加商品规格');
          return;
        }


        // 检查是否新建商品规格
        let specIndex = -1;
        let specValue = '';
        let isCreateSpec = false;
        let popoverList = this.state.popoverList;
        if (popoverList[clickName] != null && popoverList[clickName] == true) {
          // 防止重复按钮事件请求
          return false;
        }

        // 默认设置显示状态
        popoverList[clickName] = true;
        if (clickName == this.defaultPopover) {
          isCreateSpec = true;
        } else {
          specIndex = index;
          specValue = value;
        }

        Object.keys(popoverList).map((key, item) => {
          if (key != clickName) {
            popoverList[key] = false;
          }
        });

        this.setState({
          specIndex: specIndex,
          specValue: specValue,
          isCreateSpec: isCreateSpec,
          popoverList: popoverList
        });
      };

      addSpecInput = (e) => {
        console.log(e.target.value);
        let addSpecInputVal = e.target.value;
        this.setState({
          addSpecInputVal
        })
      };

      clickAddProductSpect = () => {
        let inputValue = this.state.addSpecInputVal;
        if (inputValue && inputValue.length > 0) {
          let isExistSpecName = false;
          let specDataList = this.state.specDataList;
          specDataList.forEach((item, index) => {
            if (item.text == inputValue
              && (this.state.isCreateSpec == true || this.state.specIndex != index)) {
              isExistSpecName = true;
            }
          });

          // 检查商品规格类型名称是否已存在
          if (isExistSpecName) {
            message.warn('商品规格类型名称已存在', 5)
            return false;
          }

          if (this.state.isCreateSpec) {
            specDataList.push({
              specTagId: uuid.v4(),
              specTypeId: this.state.specTypeId,
              text: inputValue,
              imgUrl: ''
            });
          } else if (this.state.specIndex != null
            && specDataList != null
            && specDataList.length > 0
            && this.state.specIndex >= 0
            && this.state.specIndex < specDataList.length) {
            specDataList[this.state.specIndex].text = inputValue;
          }
          this.updateSpecDataList(specDataList);
        } else {
          message.warn('请输入规格类型名称', 5)
        }
      };

      render() {
        const addProductSpec = (
          <FormItem className="add-Product-Spec-Popover">
            <Row>
              <Input defaultValue={this.state.specValue} onChange={this.addSpecInput}/>
            </Row>
            <Row style={{marginTop: '5px', textAlign: 'center'}}>
              <Button onClick={this.closeAddProductSpec.bind(this)}>取消</Button>
              <Button type="primary" style={{marginLeft: '10px'}}
                      onClick={this.clickAddProductSpect.bind(this)}>确认</Button>
            </Row>
          </FormItem>
        );

        return (
          <div>
            <Row className="goodsSelectSpec">
              <Col span={22}>
                <FormItem
                  {...formItemLayoutForSpec}
                  label="规格类型">
                  <Select
                    showSearch
                    style={{width: 140}}
                    defaultValue={this.state.specTypeId}
                    onChange={this.onChangeSelectSpecType.bind(this)}>
                    {
                      this.state.specTypeList.length > 0 && this.state.specTypeList.map((item, i) => {
                        return <Option
                          key={i}
                          value={item.value}>
                          {item.label}
                        </Option>
                      })
                    }
                  </Select>
                </FormItem>
              </Col>
              <Col span={2}>
                {
                  !this.state.isCreateProduct ? null :
                    <Col span={2} className="deleteSpecBtn">
                      <span className="group-remove" onClick={this.handleDeleteSpecBtn}>x</span>
                    </Col>
                }
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem>
                  <div className="specItem clearfix">
                    <div className="autoCompleteInput clearfix">
                      {
                        this.state.specDataList.map((specItem, specIndex) =>
                          <div key={specIndex} className="specItem">
                            <Row>
                              <Col>
                                <Popover
                                    content={addProductSpec}
                                    visible={this.state.popoverList['popover_' + specIndex]}
                                    placement="bottomLeft" trigger="click">
                                  <div className="sku-item_name"
                                        onDoubleClick={this.showAddProductSpec.bind(this, 'popover_' + specIndex, specIndex, specItem.text)}>
                                    <span className="text">{specItem.text}</span>
                                    <div className="group-remove" onClick={() => this.handleDeleteSpecItem(specIndex)}>x</div>
                                  </div>
                                </Popover>
                                {
                                  !this.state.isPrimarySpec ? null :
                                    <ChilderAntdUpload
                                        superComponent={this}
                                        fileList={this.getSpecFileList(specItem)}
                                        index={specIndex}
                                        maxSize={1}/>
                                }
                              </Col>
                            </Row>
                          </div>
                        )
                      }
                    </div>
                    <Popover 
                        content={addProductSpec}
                        visible={this.state.popoverList[this.defaultPopover]}
                        placement="bottomLeft">
                      <div style={{margin: '10px 10px 20px 0px'}}>
                        <a type="primary" onClick={this.showAddProductSpec.bind(this, this.defaultPopover)}><Icon type="plus"/>添加</a>
                      </div>
                    </Popover>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
        );
      }
    }
    return (
      <div>
        <Form className="manager-product-form goods-edit">
          <div className="goods-edit-region">
            <div className="goods-edit-title">
              <div className="goods-edit-title-inner">基本信息</div>
            </div>
            <div className="goods-base-content">
              <Row style={{padding: '0 50px'}}>
                <Col span={20}>
                  {EleGoodsName}
                </Col>
              </Row>
              <Row style={{padding: '0 50px'}}>
                <Col span={12}>
                  {EleGoodsClass}
                </Col>
                <Col span={12}>
                  {EleGoodsBrand}
                </Col>
              </Row>
              <Row style={{padding: '0 50px'}}>
                <Col span={12}>
                  {EleGoodsWarehouse}
                </Col>
                <Col span={12}>
                  {EleGoodsCountry}
                </Col>
              </Row>
              <Row style={{padding: '0 50px'}}>
                <Col span={12}>
                  {EleIsFreePostage}
                </Col>
                <Col span={12}>
                  {EleIsFreeTax}
                </Col>
              </Row>
              <Row style={{padding: '0px 36px'}}>
                <Col span={22}>
                  <FormItem
                    label="商品大图"
                    required={true}
                    {...formItemLayoutImage}>
                    <div className="clearfix">
                      {
                        <ChilderAntdUpload superComponent={this} fileList={this.state.imageFileList} maxSize={10}/>
                      }
                    </div>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </div>
          <div className="goods-edit-region">
            <div className="goods-edit-title">
              <div className="goods-edit-title-inner">规格信息（SKU）</div>
            </div>
            <div className="goods-edit-content">
              {
                !this.state.isCreateProduct ? null :<Row className="goods-base-content">
                  <FormItem
                    {...formItemLayoutSKU}
                    label="标准规格">
                    <Col span={10} style={{margin: '8px'}}>
                      <Checkbox
                        className="goods-select-spec-check"
                        onChange={this._handleChangeSingleProduct.bind(this)}>
                        设置为标准规格后将不能切换成多规格,请谨慎操作！
                      </Checkbox>
                    </Col>
                  </FormItem>
                </Row>
              }
              {
                this.state.isSingleProduct ? null : <Row>
                  <FormItem
                    {...formItemLayoutSKU}
                    required={true}
                    label="规格设置">
                    <div className="clearfix">
                      <Card className="goodsSpec">
                        {!(this.state.productSpecLevel > 0) ? null : <BaseSpecComponent superComponent={this} isPrimarySpec={true}/>}
                        {!(this.state.productSpecLevel > 1) ? null : <BaseSpecComponent superComponent={this} isPrimarySpec={false}/>}
                        {this.state.isCreateProduct && this.state.productSpecLevel < 2 ? EleGroupCheckbox : null}
                      </Card>
                    </div>
                  </FormItem>
                </Row>
              }
              <Row>
                <FormItem
                  {...formItemLayoutSKU}
                  required={true}
                  label="规格信息">
                  <div className="clearfix">
                    <Row className="specInfo">
                      <Table
                        bordered
                        components={components}
                        pagination={false}
                        columns={getHeaderColumns}
                        dataSource={this.state.productSpecDataList}
                        rowClassName="editable-row"/>
                    </Row>
                  </div>
                </FormItem>
              </Row>
            </div>
          </div>
          <div className="goods-edit-region">
            <div className="goods-edit-title">
              <div className="goods-edit-title-inner">图文详情</div>
            </div>
            <div className="goods-edit-content">
              {EleGoodsDetail}
            </div>
          </div>
        </Form>
        <div className="product-form-button">
          <Button type="primary" onClick={this._saveProduct}>保存</Button>
        </div>
      </div>
    );
  }
};
export const ProductFormComponent = Form.create()(ProductForms);