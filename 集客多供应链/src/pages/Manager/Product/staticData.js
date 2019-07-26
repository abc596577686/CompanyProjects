import React from 'react';

// 商品列表表格header
export const goodsTableColumns = [
  {
    title: '',
    dataIndex: 'image',
    key: 'col01',
    render : (text,score) => {
      return(
        <img src={score.image} alt="" style={{width: '30px', height: '30px'}}/>
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
    title: '商品分类',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: '15%'
  }, {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: '15%'
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '19%'
  }
];

// 已选规格表格标题
export const specTitleColumns = [
  {
    title: '序号',
    dataIndex: 'productSpecId',
    key: 'productSpecId',
    width: '10%'
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
    title: '规格编码',
    dataIndex: 'productSku',
    key: 'productSku',
    width: '15%'
  },
  {
    title: '规格类型',
    dataIndex: 'productTags',
    key: 'productTags',
    width: '15%'
  },
  {
    title: '指导价',
    dataIndex: 'priceRecommend',
    key: 'priceRecommend',
    width: '10%'
  },
  {
    title: '库存量',
    dataIndex: 'stockNumber',
    key: 'stockNumber',
    width: '10%'
  },
  {
    title: '重量',
    dataIndex: 'weight',
    key: 'weight',
    width: '10%'
  }
];