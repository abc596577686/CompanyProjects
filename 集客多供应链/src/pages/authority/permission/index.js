import React from 'react'
import './index.less'
import {createRole,roleList,deleteRole} from '../../../axios/api'
import {
  Card, Button, Form, Input, Select, Tree, Transfer, Modal,message,Table
} from 'antd'
const FormItem = Form.Item;
const confirm = Modal.confirm;
export default class Permission extends React.Component{
  constructor(){
    super()
    this.state = {
    
    }
    this.columns = [
      {
        title: '角色ID',
        dataIndex: 'roleId'
      }, {
        title: '角色名称',
        dataIndex: 'name'
      },{
        title: '创建时间',
        dataIndex: 'createTime',
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
      }, {
        title: '授权人',
        dataIndex: 'authority',
      },
      {
        title : '描述',
        dataIndex : 'description'
      }
    ];
  }
  componentWillMount(){
    this._roleList()
  }
  showRole = () => {
    this.setState({
      visible : true
    })
  }
  onCreate = () =>{
    this._createRole()
    this.setState({
      visible:false
    })
  }
  onCancel = () =>{
    this.setState({
      visible:false
    })
  }
  getRole = (e) => {
    let roleName = e.target.value
    this.setState({
      roleName
    })
    
  }
  getDescription = (e) => {
    let description = e.target.value
    this.setState({
      description
    })
    
  }
  //创建角色
  _createRole = () => {
    let params = {
      name :this.state.roleName,
      description:this.state.description
    }
    createRole(params).then(res => {
      this.setState({
        roleName : '',
        description : ''
      })
      console.log(res)
      if(res.data.code==='1'){
        message.success(res.data.msg)
        this._roleList()
      }else{
        message.error(res.data.msg)
      }
    
    })
  }
  //角色列表
  _roleList = () => {
    roleList().then(res => {
      console.log(res)
      if(res.data.code==='1'){
        this.setState({
          roleList : res.data.data
        })
      }
    })
  }
  //选择角色
  changeRole = (a,b) => {
    console.log(a,b)
    let roleId = b[0].roleId
    this.setState({
      roleId
    })
  }
  _deleteRole = () => {
    let params = {
      roleId : this.state.roleId
    }
    deleteRole(params).then(res => {
      if(res.data.code==='1'){
        message.success(res.data.msg)
        this._roleList()
      }else{
        message.error(res.data.msg)
      }
    })
  }
  //删除角色
  deleteRole =()=>{
    let that = this
    confirm({
      title: '温馨提示',
      content: '确定删除此角色?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        that._deleteRole()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  render(){
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    };
    return(
      <div className='pess-page'>
        <Modal  visible={this.state.visible}
                title="创建角色"
                okText="创建"
                onCancel={this.onCancel}
                onOk={this.onCreate}>
          <Form layout="horizontal">
            <FormItem label="角色名称" {...formItemLayout}>
              <Input type="text" placeholder="请输入角色名称" onChange={this.getRole} value={this.state.roleName}/>
            </FormItem>
            <FormItem label="角色描述" {...formItemLayout}>
              <Input type="text" placeholder="请输入角色描述" onChange={this.getDescription} value={this.state.description}/>
            </FormItem>
          </Form>
        </Modal>
        <Card>
          <Button type="primary" style={{marginRight:'20px'}} onClick={this.showRole}>创建角色</Button>
          <Button type="primary" style={{marginRight:'20px'}} onClick={this.deleteRole}>删除角色</Button>
          <Button type="primary" style={{marginRight:'20px'}}>设置权限</Button>
          <Button type="primary" style={{marginRight:'20px'}}>用户授权</Button>
        </Card>
        <Card hoverable={true}>
          <Table columns={this.columns}
                 dataSource={this.state.roleList}
                 rowSelection ={
                   {
                     type : 'radio',
                     hideDefaultSelections : false,
                     onChange : this.changeRole
                   }
                 }
                 bordered
  
          >
  
          </Table>
        </Card>
      </div>
    )
  }
}