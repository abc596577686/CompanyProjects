// 商品列表表格header
export const goodsTableColumns = [
  {
    title: '品牌图片',
    dataIndex: 'image',
    key: 'col01',
    // fixed: 'left',
    // width: 100,
  },
  // {
  //   title: '品牌Id',
  //   dataIndex: 'productId',
  //   key: 'col02',
  // },
  {
    title: '品牌名称/简称',
    dataIndex: 'name',
    key: 'col03',
  },
  {
    title: '所属国家',
    dataIndex: 'countryName',
    key: 'col07',
  },
  // {
  //   title: '品牌简称',
  //   dataIndex: 'shortName',
  //   key: 'col04',
  // },
  {
    title: '首字母',
    dataIndex: 'initial',
    key: 'col05',
  }, {
    title: '品牌标签',
    dataIndex: 'tagNames',
    key: 'col06',
  },
  {
    title: '是否热门品牌',
    dataIndex: 'isHot',
    key: 'col08',
  },
  // {
  //   title: '品牌为首页',
  //   dataIndex: 'isHomePage',
  //   key: 'col08',
  // },{
  //   title: '所属国家ID',
  //   dataIndex: 'countryId',
  //   key: 'col09',
  // },{
  //   title: '所属国家',
  //   dataIndex: 'countryName',
  //   key: 'col010',
  // },{
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   key: 'col011',
  // },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'col012',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'col013',
  }
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