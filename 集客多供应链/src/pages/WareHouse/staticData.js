// 商品列表表格header
export const goodsTableColumns = [
  {
    title: '仓库序号',
    dataIndex: 'warehouseId',
    key: 'col01'
  }, {
    title: '仓库名字',
    dataIndex: 'name',
    key: 'col02'
  },
  // {
  //   title: '模板配送区域',
  //   dataIndex: 'tplArea',
  //   key: 'col03'
  // },
  {
    title: '仓库类型',
    dataIndex: 'warehouseType',
    key: 'col04'
  },{
    title: '仓库属性',
    dataIndex: 'productType',
    key: 'col05',
  },{
    title: '是否推送海关',
    dataIndex: 'isPushCustoms',
    key: 'col06',
  },{
    title: '是否直推ERP',
    dataIndex: 'isDirectPushErp',
    key: 'col07',
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'col08',
  },{
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'col09',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'col010',
  }
];