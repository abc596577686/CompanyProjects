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
  saveMarketProduct,
  getMarketProductDetail,
  getEditorUploadURL,
  getFileUploadURL
} from '../../../axios/api';
import {getValForKey} from '../../../utils/index'
import {ERR_OK, baseUrl} from "../../../axios/config";
import {substring} from "../../../utils/utils";

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
class MarketProductForms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indexComponent: props.indexComponent,
      // 默认新建商品
      isCreateProduct: true,
      isOpenEditor: false,
      isProductSpecEidtStatus: false,
      // from表单基础数据
      baseData: {},
      // 商品规格头列表
      specHeaderColumnList: [],
      // 商品规格明细列表
      productSpecDataList: [],
      // 商品规格类型层级
      productSpecLevel: 0,
      // 商品大图
      imageFileList: [],
      loading: false,

      defulatColumnsList: [{
        title: '商品条码',
        dataIndex: 'productUpc',
        width: '11%',
        editable: false
      },{
        title: '商品货号',
        dataIndex: 'productCode',
        width: '11%',
        editable: false
      }, {
        title: '规格编码',
        dataIndex: 'productSku',
        width: '7%',
        editable: false
      }, {
        title: '库存量',
        dataIndex: 'paymentStockNumber',
        width: '7%',
        editable: false
      }, {
        title: '净重(克)',
        dataIndex: 'weight',
        width: '7%',
        editable: false
      }, {
        title: '成本价格',
        dataIndex: 'priceCost',
      width: '9%',
        editable: true
      }, {
        title: '市场价格',
        dataIndex: 'priceWholesale',
        width: '9%',
        editable: true
      }, {
        title: '建议价格',
        dataIndex: 'priceRecommend',
        width: '9%',
        editable: true
      }, {
        title: '操作',
        dataIndex: '操作',
        width: '8%',
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

    // 初始化数据
    this.initData(props.productId);
  }

  initData(productId) {
    getMarketProductDetail({productId: productId}, 'GET').then(res => {
      if (res.data.code == '1') {
        let baseData = this.state.baseData;
        let productSpecLevel = res.data.data.productSpecLevel;
        let product = res.data.data.product;

        baseData.productId = product.productId;
        baseData.productName = product.name;
        baseData.warePostTplName = product.warePostTplName;
        baseData.brandName = product.brandName;
        baseData.countryName = product.countryName;
        baseData.categoryName = product.categoryName;
        baseData.productDetail = (product.productDetail + '').replace(/#IMAGE#/g, baseUrl);
        baseData.isFreePostage = product.isFreePostage
        baseData.isFreeTax = product.isFreeTax
        this.editor.txt.html(baseData.productDetail);

        // 商品主图列表
        let imageList = [];
        let tmpImageList = res.data.data.imageList;
        if (tmpImageList != null && tmpImageList.length > 0) {
          tmpImageList.forEach(function(item, index){
            imageList.push({
              width: '11%',
              uid: item.uid,
              name: item.name,
              url: baseUrl + item.url,
              status: item.status
            });
          });
        }

        let productSpecDataList = [];
        let columnsList = [];

        // 商品规格信息
        let headerMapList = res.data.data.headerMapList;
        if(headerMapList != null && headerMapList.length > 0){
          for(let i = 0; i < headerMapList.length; i ++){
            let headerMap = headerMapList[i];
            Object.keys(headerMap).map((key, item) => {
              columnsList.push({
                width: '11%',
                title: headerMap[key],
                dataIndex: key,
                editable: false
              })
            });
          }
        }

        let dataList = res.data.data.productSpceList;
        if(dataList != null && dataList.length > 0){
          productSpecDataList = dataList;
          productSpecDataList.map((item, i) => {
            item.key = i;
          })
        }

        columnsList.push(...this.state.defulatColumnsList);
        this.setState({
          baseData: baseData,
          imageFileList: imageList,
          productSpecLevel: productSpecLevel,
          productSpecDataList: productSpecDataList,
          specHeaderColumnList: columnsList
        });
      } else {
        message.error(res.data.msg, 5)
      }
    })
  }

  componentDidMount() {
    console.log('-----------111','form组件')

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
      let baseData = this.state.baseData;
      baseData.productDetail = html;
      this.setState({
        baseData: baseData
      });
    }

    this.editor.create();
    this.setState({isOpenEditor: true})
  };

  handleInputGoodsName = (rule, value, callback) => {
    if (value.length > 300) {
      callback('商品名称最多300字符');
    }
    callback()
  };

  // 保存商品信息
  _saveProduct = () => {
    if(this.state.isProductSpecEidtStatus){
      message.error('规格信息编辑状态不能保存', 5);
      return;
    }

    let params = {
      baseData: this.state.baseData,
      productSpecDataList: this.state.productSpecDataList,
      imageFileList: this.state.imageFileList
    };

    let thiz = this;
    confirm({
      title: '确认提交吗？',
      content: '请先确认已编辑的商品信息完整无误',
      onOk() {
        saveMarketProduct(params, 'POST').then(res => {
          if (res.data.code === '1') {
            let product = res.data.data;
            if(product != null && product.length > 0){
              thiz.state.indexComponent.stateCallback(substring(product.name, 10), product.productId);
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
    let baseData = this.state.baseData;
    if (type === 1) {
      baseData[name] = event;
    } else if (type === 2) {
      baseData[name] = event.target.checked;
    } else {
      baseData[name] = event.target.value;
      console.log('-----------',event)
    }

    this.setState({
      baseData: baseData
    });
  };

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
            initialValue: this.state.baseData.productName,
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
        <Input
          disabled={true}
          defaultValue={this.state.baseData.categoryName}/>
      </FormItem>
    );

    // 商品品牌
    const EleGoodsBrand = (
      <FormItem
        label="商品品牌"
        {...formItemLayout}>
        <Input
          disabled={true}
          defaultValue={this.state.baseData.brandName}/>
      </FormItem>
    );

    // 商品国家
    const EleGoodsCountry = (
      <FormItem
        label="商品国家"
        {...formItemLayout}>
        <Input
          disabled={true}
          defaultValue={this.state.baseData.countryName}/>
      </FormItem>
    );

    //商品仓库
    const EleGoodsWarehouse = (
      <FormItem
        label="仓库与邮费"
        {...formItemLayout}>
        <Input
          disabled={true}
          defaultValue={this.state.baseData.warePostTplName}/>
      </FormItem>
    );
    //是否包邮
    const EleIsFreePostage = (
      <FormItem
        label="是否包邮"
        {...formItemLayout}>
        <RadioGroup onChange={this._handleChange.bind(this,'isFreePostage','3')}
                    value={this.state.baseData.isFreePostage}
                    disabled={true}
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
                    value={this.state.baseData.isFreeTax}
                    style={{paddingTop:'10px'}}
                    disabled={true}
        >
          <Radio value={false}>非免税商品</Radio>
          <Radio value={true}>免税商品</Radio>
        </RadioGroup>
      </FormItem>
    );

    const EleOtherConfig = (
      <Row style={{padding: '0px 10px 30px'}}>
        <Col span={8} style={{textAlign: 'center'}}>
          <Checkbox
            checked={this.state.baseData.status}
            onChange={this._handleChange.bind(this, 'status', 2)}>
            是否上架
          </Checkbox>
        </Col>
        <Col span={8} style={{textAlign: 'center'}}>
          <Checkbox
            value={this.state.goodsOtherB}
            onChange={this.onChangeGoodsOtherB}>
            是否免税
          </Checkbox>
        </Col>
        <Col span={8} style={{textAlign: 'center'}}>
          <Checkbox
            value={this.state.goodsOtherC}
            onChange={this.onChangeGoodsOtherC}>
            是否包邮
          </Checkbox>
        </Col>
      </Row>
    );

    // 动态商品规格编辑组件
    class ChilderAntdUpload extends AntdUpload {
    }

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

    return (
      <div>
        <Form className="market-product-xbody">
          <div className="goods-edit-region">
            <div className="goods-edit-title">
              <div className="goods-edit-title-inner">基本信息</div>
            </div>
            <div className="goods-edit-content">
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
              <Row>
                <FormItem>
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
export const MarketProductFormComponent = Form.create()(MarketProductForms);