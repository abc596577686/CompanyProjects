import React from 'react';
import {Icon, Checkbox,Button,Popconfirm} from 'antd';

// 商品列表表格header
export const goodsTableColumns = [
  {
    title: '序号',
    dataIndex: 'productId',
    key: 'productId',
    width: '9%'
  },{
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: '45%',
    render : (text,record) => {
      return(
        <div style={{textAlign:'left'}}>
          {record.name}
        </div>
      )
    }
  },{
    title: '投放渠道',
    dataIndex: 'channelName',
    key: 'channelName',
    width: '12%'
  },{
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: '18%'
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '7%'
  }
];
// 已选规格表格标题
export const specTitleColumns = [
  {
    title: '序号',
    dataIndex: 'productSpecId',
    key: 'productSpecId',
    width: '7%'
  },
  {
    title: '商品条码',
    dataIndex: 'productUpc',
    key: 'productUpc',
    width: '13%'
  },
  {
    title: '商品货号',
    dataIndex: 'productCode',
    key: 'productCode',
    width: '13%'
  },
  {
    title: '规格类型',
    dataIndex: 'productTags',
    key: 'productTags',
    width: '12%'
  },
  {
    title: '总量库存',
    dataIndex: 'totalStockNumber',
    key: 'totalStockNumber',
    width: '9%'
  },
  {
    title: '可用库存',
    dataIndex: 'availableStockNumber',
    key: 'availableStockNumber',
    width: '9%'
  },
  {
    title: '独享',
    className: "stock-cloumn-share",
    dataIndex: 'isExclusive',
    key: 'isExclusive',
    width: '7%',
    render: (text, record) => {
      return (text==1?<Icon type="check-square" theme="twoTone" style={{fontSize:'20px'}}/>:<Icon type="close-square" style={{fontSize:'20px'}}/>)
    }
  },
  {
    title: '渠道库存',
    dataIndex: 'channelStockNumber',
    key: 'channelStockNumber',
    width: '9%'
  },
  {
    title: '渠道销量',
    dataIndex: 'saleNumber',
    key: 'saleNumber',
    width: '9%'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    width: '9%',
    render : (text,record) => {
      console.log('11111111111111111',this,record)
     return(
       <Popconfirm
         title="是否确定删除?"
         onConfirm={() => this.delSpec(record)}>
         <Button icon='delete' size='small'>删除</Button>
       </Popconfirm>
     )
     
    }
  },
];


