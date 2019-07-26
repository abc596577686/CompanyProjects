// 商品列表表格header
export const goodsTableColumns = [
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'col01',
  },
  {
    title: '是否响应',
    dataIndex: 'isRequestSucc',
    key: 'col03',
  },
  {
    title: '是否回调',
    dataIndex: 'isCustomsSucc',
    key: 'col07',
  },
  {
    title: '同步次数',
    dataIndex: 'syncNumber',
    key: 'col05',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'col06',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'col08',
  },
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   key: 'col013',
  // }
];

export const goodsTableColumnss = [
  {
    title: '商品名称',
    dataIndex: 'gname',
    key: 'col031',
  },
  {
    title: '商品链接',
    dataIndex: 'itemLink',
    key: 'col032',
  },
];

// 已选规格表格标题
export const specTitleColumns = [
  {
    title: '颜色',
    dataIndex: 'color',
    colSpan: 2,
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 0) {
        obj.props.rowSpan = 2;
      }
      return obj;
    }
  },
  {
    title: '尺码',
    dataIndex: 'rules',
  },
  {
    title: '商品货号',
    dataIndex: 'artNumber'
  },
  {
    title: '规格编码',
    dataIndex: 'specNumber'
  },
  {
    title: '成本价格',
    dataIndex: 'costPrice'
  },
  {
    title: '市场价格',
    dataIndex: 'marketPrice'
  },
  {
    title: '建议价格',
    dataIndex: 'jyPrice'
  },
  {
    title: '库存量',
    dataIndex: 'stockNumber'
  },
  {
    title: '重量',
    dataIndex: 'weight'
  }
];

// 已选规格表格数据
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    rules: 'a',
    color: 'r',
    articleNum: '',
    specCode: '',
    priceOrigin: '',
    priceMarket: '',
    priceRecommend: '',
    stockNum: '',
    weight: '',
  });
}
export const specTableData = data;