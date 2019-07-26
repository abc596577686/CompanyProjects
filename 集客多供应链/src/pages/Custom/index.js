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
  message
} from 'antd';
import './custom.less';
import { userList } from '../../axios/api';
import { ERR_OK } from "../../axios/config";

const FormItem = Form.Item;
// radio组件
const RadioGroup = Radio.Group;
const layoutHorizontal = 'horizontal';
const Option = Select.Option;
const confirm = Modal.confirm;

export default class Custom extends React.Component { 
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this._getuserList()
  }

  state = {

  }

  _getuserList() {
    let params = {
      pageidx: 1,
      pagesize: 5,
    }
    userList(params, 'GET').then(res => {
      if (res.data.code === ERR_OK) {
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data)
          // let brandList = res.data.data;
          // this.setState({
          //   dataTotal: res.data.count
          // });
          // this._setdata(brandList)
        } else {
          message.warning(res.data.msg);
        }
      }
    });
  }

  render() {
    // 数据
    // const TableListData
    // 抬头
    const goodsTableColumns = [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'col01',
      },
      {
        title: '用户头像',
        dataIndex: 'image',
        key: 'col02',
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        key: 'col03',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'col04',
      }
    ]
  
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

    return (
      <div className="custom_page">
        <Table
          dataSource={this.state.TableListData}
          columns={goodsTableColumns}
          locale={this.state.tableEmpty}
          rowSelection={rowSelection}
          loading={this.state.loading}
          pagination={false}
        />
      </div>
    )
  }
}