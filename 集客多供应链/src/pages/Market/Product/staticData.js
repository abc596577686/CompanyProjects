import React from 'react';
import {dateFormate} from "../../../utils/index";

// 商品列表表格header
export const goodsTableColumns = [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
    render : (text,score) => {
      return(
        <img src={score.image} ccc={score.image} alt='' style={{width: '30px', height: '30px'}}/>
      )
    }
  },{
    title: '序号',
    dataIndex: 'productId',
    key: 'productId',
    width: '8%'
  },{
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
    width: '40%',
    render : (text,record) => {
      return(
        <div style={{textAlign:'left'}}>
          {record.productName}
        </div>
      )
    }
  },{
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: '20%',
    render : (text,record) => {
      return(
        <div>
          {record.updateTime?dateFormate(record.updateTime):''}
        </div>
      )
    }
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '20%'
  }
];

// 已选规格表格标题
export const specTitleColumns = [
  {
    title: '序号',
    dataIndex: 'productSpecId',
    key: 'productSpecId',
    width: '9%'
  },
  {
    title: '商品条码',
    dataIndex: 'productUpc',
    key: 'productUpc',
    width: '15%'
  },
  {
    title: '商品货号',
    dataIndex: 'productCode',
    key: 'productCode',
    width: '15%'
  },
  {
    title: '规格类型',
    dataIndex: 'productTags',
    key: 'productTags',
    width: '15%',
    render : (a,b) =>{
      return <span>{b.productTags?b.productTags:'单规格'}</span>
    }
  },
  {
    title: '成本价格',
    dataIndex: 'priceCost',
    key: 'priceCost',
    width: '9%'
  },
  {
    title: '市场价格',
    dataIndex: 'priceWholesale',
    key: 'priceWholesale',
    width: '9%'
  },
  {
    title: '建议价格',
    dataIndex: 'priceRecommend',
    key: 'priceRecommend',
    width: '9%'
  },
  {
    title: '库存量',
    dataIndex: 'paymentStockNumber',
    key: 'paymentStockNumber',
    width: '9%'
  },
  {
    title: '销量',
    dataIndex: 'paymentSaleNumber',
    key: 'paymentSaleNumber',
    width: '9%'
  }
];