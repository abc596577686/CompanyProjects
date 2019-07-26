import React from 'react'
import './index.less'
import {adminUserList} from '../../../axios/api'
import {
  Card, Button, Form, Input, Select, Tree, Transfer, Modal,message,Table
} from 'antd'
const FormItem = Form.Item;
const confirm = Modal.confirm;
export default class Permission extends React.Component{
  constructor(){
    super()
    this.state = {
      visible: false,
    }
    this.columns = [
      {
        title: '用户ID',
        dataIndex: 'userId'
      }, {
        title: '用户名称',
        dataIndex: 'username'
      },{
        title: '创建时间',
        dataIndex: 'createTime',
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
      }, {
        title: '电话',
        dataIndex: 'mobile',
      },
      {
        title : '描述',
        dataIndex : 'description'
      }
    ];
  }
  componentWillMount(){
    this._userList()  
  }

  // 显示新创建
  showRole = () => {
    this.setState({
      visible: true
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  onCreate = () => {
    
  }

  _userList = () =>{
    adminUserList().then(res => {
      console.log(res)
      if(res.data.code==='1'){
        let userList = res.data.data
        this.setState({
          userList
        })
      }
    })
  }
  render(){
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    };
    return(
      <div className='pess-page'>
        <Modal  visible={this.state.visible}
                title="创建用户"
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
          <Button type="primary" style={{marginRight:'20px'}} onClick={this.showRole}>创建用户</Button>
          <Button type="primary" style={{marginRight:'20px'}} onClick={this.deleteRole}>删除用户</Button>
        </Card>
        <Card hoverable={true}>
          <Table columns={this.columns}
                 dataSource={this.state.userList}
                 rowSelection ={
                   {
                     type : 'checkbox',
                     onChange : this.getUser
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