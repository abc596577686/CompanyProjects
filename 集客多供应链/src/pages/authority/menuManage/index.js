import React from 'react'
import './index.less'
import menuConfig from '../../../config/menuConfig'
import { menuInfo, editMenu, deleteMenu, createMenu, menuTree } from '../../../axios/api'
import {
  Table, Input, InputNumber, Popconfirm, Form, Modal, Button, message
} from 'antd'
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import 'rc-texty/assets/index.css';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
//模态框
const ModalBox = Form.create()(
  class extends React.Component {
    componentDidMount() { 
      this.showTxt()
    }
    state = {
      show: false,
    }
  
    // 启动文字动效
    showTxt = () => {
      this.setState({
        show: !this.state.show
      });
    }
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="添加菜单"
          okText="添加"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="菜单名称">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请填写菜单名!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="图标">
              {getFieldDecorator('icon', {
                rules: [{ required: true, message: '请填写图标名!' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="相对路径">
              {getFieldDecorator('url', {
                rules: [{ required: true, message: '请填写相对路径!' }],
                initialValue: this.props.baseUrl ? this.props.baseUrl : ''
              })(<Input />)}
            </FormItem>
           <FormItem label="新建序列">
              {getFieldDecorator('sort', {
                rules: [{ required: true, message: '请填写序列!' }]
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);
//包装行
const EditableFormRow = Form.create()(EditableRow);
//单元格
class EditableCell extends React.Component {
  getInput = () => {
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请填写 ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
export default class MenuManage extends React.Component {
  constructor() {
    super()
    this.state = {
      menuList: [],
      editingKey: '',
      sort: '',
      index : 0
    }
    this.columns = [
      {
        title: '名称',
        dataIndex: 'title',
        key: 'title',
        editable: true,
      },
      {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        editable: true,
      },
      {
        title: '相对路径',
        dataIndex: 'url',
        key: 'url',
        editable: true,
      },
      {
        title: '新建序列',
        dataIndex: 'sort',
        key: 'sort',
        editable: true,
      },
      {
        title: '编辑',
        dataIndex: 'operation',
        key: 'operation',
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
                        onClick={() => this.save(form, record.menuId)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="确定取消操作?"
                    onConfirm={() => this.cancel(record.menuId)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                  <div>
                    <a onClick={() => this.edit(record.menuId, record.parentId)}>编辑此菜单</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a onClick={() => this.showModal(record.menuId, record.url)}>添加子菜单</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a onClick={() => this.delete(record.menuId)}>删除此菜单</a>

                  </div>
                )}
            </div>
          )
        }
      }
    ]
  }
  componentWillMount() {
    this.getMenuTree()
  }
  _createMenu = (icon, title, url, sort) => {
    let params = {
      icon,
      parentId: this.state.parentId==0?null:this.state.parentId,
      title,
      url,
      sort
    }
    createMenu(params).then(res => {
      console.log(res)
      if (res.data.code === '1') {
        message.success(res.data.msg)
        this.setState({
          visible: false
        })
        this.getMenuTree()
      } else {
        message.error(res.data.msg)
      }
    })

  }
  delete = (val) => {
    console.log('--------', val)
    this.setState({
      menuId: val
    })
    let that = this
    confirm({
      title: '温馨提示',
      content: '确定删除此菜单?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        that._deleteMenu()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  _editMenu = (val) => {
    let { menuId, title, icon, url, parentId , sort } = val
    let params = {
      menuId,
      title,
      icon,
      url,
      parentId,
      sort
    }
    editMenu(params).then(res => {
      console.log(res)
      if (res.data.code === '1') {
        message.success(res.data.msg)
        this.getMenuTree()
      } else {
        message.error(res.data.msg)
      }

    })
  }
  _deleteMenu = () => {
    let params = {
      menuId: this.state.menuId
    }
    deleteMenu(params).then(res => {
      console.log(res)
      if (res.data.code === '1') {
        this.getMenuTree()
      } else {
        message.error(res.data.msg)
      }
    })

  }
  getMenuTree = () => {
    menuTree().then(res => {
      console.log(res)
      if (res.data.code === '1' && res.data.data.length > 0) {
        this.setState({
          menuList: res.data.data
        }, () => {
          // this.getMenuBaseUrl(this.state.menuList)
          // this.setMenuKey(this.state.menuList)
          localStorage.setItem('_menulist_',JSON.stringify(res.data.data))
        })
      }
    })
  }
  //拼接url
  getMenuBaseUrl = (data, baseUrl) => {
    data.forEach((item) => {
      if (baseUrl) {
        item.baseUrl = baseUrl + '/' + item.url
      } else {
        item.baseUrl = item.url
      }
      if (item.children && item.children.length > 0) {
        baseUrl = item.baseUrl
        this.getMenuBaseUrl(item.children, baseUrl)
      }
    })
    console.log('data---------', data)
    this.setState({
      menuList: data
    })
  }
  //表格key值
  setMenuKey =(data)=>{
    data.forEach((item) =>{
      item.key = item.menuId
      if(item.children&&item.children.length>0){
        this.getMenuBaseUrl(item.children)
      }
    })
    this.setState({
      menuList : data
    })
  }
  cancel = () => {
    this.setState({ editingKey: '' });
  };
  save(form, key) {
    console.log('11111----------------',form)
    form.validateFields((error, val) => {
      if (error) {
        return;
      }
      val.menuId = this.state.menuId
      val.parentId = this.state.parentId
      // val.sort = this.state.sort
      console.log('valvalval------', val)
      this._editMenu(val)
      this.setState({ editingKey: '' });
    });
  }
  edit(menuId, parentId) {
    this.setState({ editingKey: menuId, menuId, parentId });
  }
  showModal = (val, baseUrl) => {
    console.log(val, baseUrl)
    let parentId = val
    console.log('parentId', parentId)
    this.setState({ visible: true, parentId, baseUrl });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('接受的信息', values);
      form.resetFields();
      let { title, icon, url , sort} = values
      this._createMenu(icon, title, url, sort)
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  //展开行
  expandRow = (e,info) => {
    console.log(e,info)
    
  }
  
  
  isEditing = record => record.menuId === this.state.editingKey;
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const dataSource = this.state.menuList
// <<<<<<< HEAD
//     console.log('newData------',dataSource)
//     return(
//       <div className='menu-page'>
//         <Button onClick={ ()=>this.showModal('0',null)} style={{margin:'10px'}}>
//           添加主菜单
//         </Button>
//         <ModalBox
//           wrappedComponentRef={this.saveFormRef}
//           visible={this.state.visible}
//           onCancel={this.handleCancel}
//           onCreate={this.handleCreate}
//           baseUrl ={this.state.baseUrl}
//         />
//         <Table columns={columns}
//                dataSource={dataSource}
//                components={components}
//                onExpand = {this.expandRow}
//                rowKey={(record) => record.menuId}
//                bordered>
        
//         </Table>
//       </div>
// =======
    console.log('newData------', dataSource)
    return (
      <div className="page goods-page ">
        <div className='menu-page m-t-lg backgrounds'>
          <Button onClick={() => this.showModal('0', null)} style={{ margin: '0 0 10px 0' }} type="primary">
            添加主菜单
            {/* <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '添加主菜单'}</Texty> */}
          </Button>
          {/* <Button type="primary" onClick={this.addFirst}>
              <Texty delay={300} enter={this.getEnter} leave={this.getEnter}>{this.state.show && '新建角色'}</Texty>
          </Button> */}
          <ModalBox
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            baseUrl={this.state.baseUrl}
          />
          <Table columns={columns}
                 dataSource={dataSource}
                 components={components}
                 onExpand = {this.expandRow}
                 rowKey={(record) => record.menuId}
                 bordered>

          </Table>
        </div>
      </div >
// >>>>>>> 855bea33bae5a4237bb1320e23aa745f014c1713
    )
  }
}