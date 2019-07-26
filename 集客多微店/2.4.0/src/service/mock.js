const mock_coupon = {
  code: "1",
  msg: "请求成功",
  systemTime: "1520944744033",
  data: {
    storeId: "1",
    storeName: "凡喆国际商城",
    postType: "0",
    productId: "3669",
    productSpecId: "0",
    number: "10",
    cartIds: "",
    totalNumber: "10",
    postage: "0.0",
    tax: "0",
    orderAmount: "880.0",
    productAmount: "880.0",
    productType: "2",
    preferentialAmount: "15.0",
    useCouponId: "561040",
    isUserCoupon: "0",
    rollingNotice: "年前停止发货时间 2月2日：内蒙，宁夏，青海 2月5日：云南，贵州，四川，黑龙江，吉林，辽宁，重庆，山西，广西，陕西，海南，北京 2月7日：广东，福建，湖南，湖北，河南，江西，山东，天津，上海 2月8日：浙江，江苏，安徽 ； 西藏，新疆已经停止发货",
    payAmount: "865.0",
    productList: [
      {
        productId: "3669",
        productSpecId: "",
        productName: "【缓解剧烈运动后心脏压力】澳洲SWISSE心脏Q10辅酶50粒/瓶 【效期到2018-06-01】",
        imageUrl: "http://test.uzengroup.com/jkd/upload/images/000/000/001/201612/583f94569288d.1200.jpg",
        productNumber: "10",
        isSeckillProduct: "0",
        productTags: "",
        price: "88.0"
      }
    ]
  },
  coupon: {
    availableCouponList: [
      {
        receiveTime: "2018-03-10",
        effectiveTime: "2018-03-30",
        effectiveTimeFormat: "2018.03.10-2018.03.30",
        couponNo: "152066711946123471",
        userCouponId: "561040",
        couponName: "测试优惠券",
        couponType: "2",
        fullAmount: "",
        giveAmount: "15.0",
        attribute: "3",
        typeName: "代金券",
        title: "全场适用",
        bindNames: ""
      },
      {
        receiveTime: "2018-03-12",
        effectiveTime: "2018-03-19",
        effectiveTimeFormat: "2018.03.12-2018.03.19",
        couponNo: "152084538450223470",
        userCouponId: "584539",
        couponName: "测试啊 测试啊",
        couponType: "1",
        fullAmount: "5.0",
        giveAmount: "1.0",
        attribute: "3",
        typeName: "满减券",
        title: "全场适用",
        bindNames: ""
      }
    ],
    unavailableCouponList: [
      {
        receiveTime: "2018-03-13",
        effectiveTime: "2018-03-14",
        effectiveTimeFormat: "2018.03.13-2018.03.14",
        couponNo: "152093956350223472",
        userCouponId: "608069",
        couponName: "测试商品拳",
        couponType: "1",
        fullAmount: "300.0",
        giveAmount: "10.0",
        attribute: "2",
        typeName: "满减券",
        title: "部分商品适用",
        bindNames: ""
      }
    ]
  },
  addressInfo: {
    addressId: "5030",
    name: "郭琪",
    address: "河南省洛阳市宜阳县城关镇新丰街新丰东四巷1号，刘先生收18503798667",
    msg: "",
    mobile: "18817394384",
    isEmpty: "0",
    identityNo: "370181199210294819",
    isValidIdentity: "1"
  }
}

const mock_channelList = [
  {
    channelId: '1',
    channelName: '运动营养',
    requestUrl: ''
  },
  {
    channelId: '2',
    channelName: '秒杀',
    requestUrl: ''
  },
  {
    channelId: '3',
    channelName: '营养保健',
    requestUrl: ''
  },
  {
    channelId: '4',
    channelName: '母婴专区',
    requestUrl: ''
  },
  {
    channelId: '5',
    channelName: '运动营养',
    requestUrl: ''
  },
  {
    channelId: '6',
    channelName: '秒杀',
    requestUrl: ''
  },
  {
    channelId: '7',
    channelName: '营养保健',
    requestUrl: ''
  },
  {
    channelId: '8',
    channelName: '母婴专区',
    requestUrl: ''
  }
]
// 第一个板块 (运动营养
const mock_list = [
  // banner 多图 
  {
    type: '0',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '0', //内页
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t16441/158/1850818709/140828/b0a846a/5a66a794Nf18ecab8.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '1',  //内页
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t18910/157/291876138/172889/eb6671b4/5a6842c6N28f42cd1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '2',  //商品详情
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t18910/157/291876138/172889/eb6671b4/5a6842c6N28f42cd1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '3',  //专题
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t18910/157/291876138/172889/eb6671b4/5a6842c6N28f42cd1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',  //大礼包
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t18910/157/291876138/172889/eb6671b4/5a6842c6N28f42cd1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  // banner 单图
  {
    type: '0',
    attribute: '1',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4', // 0 1 2 3 4
        pictureIcon: 'https://m.360buyimg.com/mobilecms/jfs/t18055/242/251249288/299098/1ca4ec55/5a66e53eN1f8e20a0.gif',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  // banner 双图
  {
    type: '0',
    attribute: '2',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '2',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '2',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  // 导航 4个
  {
    type: '1',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '1',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '1',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '3',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '3',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  // 导航 8个
  {
    type: '1',
    attribute: '1',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '1',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '1',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3574/144/335407130/380514/8ddee7f9/5806e150N353d74b1.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '3',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '3',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '3',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3574/144/335407130/380514/8ddee7f9/5806e150N353d74b1.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '3',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '0',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '2',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: 'http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  // 专题 
  {
    type: '2',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg',
    products: [
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      }
    ],
    contents: [
      {
        pictureIcon: "https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg",
        width: "0",
        height: "0",
        targetType: "3",
        content: "202",
        navigationName: "",
        title: "上新日报",
        requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202"
      }
    ],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  // 专题  没有商品
  {
    type: '2',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg',
    products: [],
    contents: [
      {
        pictureIcon: "https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg",
        width: "0",
        height: "0",
        targetType: "3",
        content: "202",
        navigationName: "",
        title: "上新日报",
        requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202"
      }
    ],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  // 专题 8个以上商品
  {
    type: '2',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg',
    products: [
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      }
    ],
    contents: [
      {
        pictureIcon: "https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg",
        width: "0",
        height: "0",
        targetType: "3",
        content: "202",
        navigationName: "",
        title: "上新日报",
        requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25&pageId=202"
      }
    ],
    specialName: '增肌',
    width: '0',
    height: '0'
  }
]

// 第二个板块 (秒杀
const mock_secKillDetail = {
  code: '1',
  msg: '',
  systemTime: '1518056049073',
  headerImageList: [
    {
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/banner/2018/02/07/1616e5e404524.1200.jpg",
      width: "600",
      height: "337"
    }
  ],
  seckillList: [
    {
      seckillId: "1",
      seckillName: "12点",
      seckillStatus: "已开抢",
      startTime: "1517909400000",
      endTime: "1517931000000",
      isCurrentSeckill: "1"
    },
    {
      seckillId: "2",
      seckillName: "16点",
      seckillStatus: "已开抢",
      startTime: "1517909400000",
      endTime: "1517931000000",
      isCurrentSeckill: "1"
    },
    {
      seckillId: "3",
      seckillName: "18点",
      seckillStatus: "抢购中",
      startTime: "1518077971726",
      endTime: "1517920200000",
      isCurrentSeckill: "1"
    },
    {
      seckillId: "4",
      seckillName: "20点",
      seckillStatus: "即将开始",
      startTime: "1517916600000",
      endTime: "1517920200000",
      isCurrentSeckill: "0"
    },
    {
      seckillId: "5",
      seckillName: "22点",
      seckillStatus: "即将开始",
      startTime: "1517916600000",
      endTime: "1517920200000",
      isCurrentSeckill: "0"
    }
  ],
  dataList: [
    {
      wholesaleId: "144507",
      productName: "Allmax Isoflex 分离乳清蛋白粉 5磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/31/160a82cd30555.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '88',
      salesNumber: "23",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144506",
      productName: "AllMax 金牌乳清蛋白粉 5磅",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/31/160a82942d689.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '88',
      salesNumber: "95",
      isSoldOut: "0"
   },
   {
      wholesaleId: "144505",
      productName: "NutraKey/纽持健 Whey Optima乳清蛋白粉 2磅",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2018/01/18/16107535d1d58.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '66',
      salesNumber: "12",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144504",
      productName: "NutraKey/纽持健 Whey Optima乳清蛋白粉 5磅",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2018/01/18/1610755d10a84.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "39",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144503",
      productName: "NutraKey/纽持健Vpro植物蛋白粉1磅",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2018/01/18/1610761920494.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '99',
      salesNumber: "40",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144502",
      productName: "NutraKey/纽持健 L-Carnitine1500浓度左旋肉碱营养液473ml",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2018/01/18/1610768201450.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "72",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144501",
      productName: "纽持健/NutraKey L-Carnitine1500左旋肉碱营养液59ml",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/30/160a7fedee788.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "49",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144500",
      productName: "Met-Rx 美瑞克斯 乳清蛋白粉 5磅",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1c4ce4632.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "20",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144499",
      productName: "Met-Rx 美瑞克斯 赛霸增肌粉 6磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1bc0eed88.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "10",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144498",
      productName: "美国 BPI肌酸粉 300克/瓶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1b813f981.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "1",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144497",
      productName: "BPI 支链氨基酸粉 300克/瓶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1b4b69b91.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "30",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144496",
      productName: "ON 欧普特蒙 乳清蛋白 2磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1ada35356.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "60",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144495",
      productName: "ON 欧普特蒙 增肌粉 6磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1a77bab89.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "93",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144494",
      productName: "ON 欧普特蒙 金牌乳清蛋白粉 5磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1a4139934.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "100",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144493",
      productName: "ON 欧普特蒙 金牌增肌粉 5磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a1a0223f87.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "97",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144492",
      productName: "NutraKey/纽持健 L-Carnitine3000浓度左旋肉碱营养液473ml",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2018/01/18/161076ceee283.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "95",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144491",
      productName: "MP 乳清蛋白粉 5磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a18f273031.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "100",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144490",
      productName: "美国MP 缓释蛋白 2磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a18a894e45.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "20",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144489",
      productName: "美国MP缓释蛋白粉 4磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a17daf5098.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "40",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144488",
      productName: "MP 格斗增肌粉 6磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a16e0d4598.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "49",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144487",
      productName: "MPFitmiss 蛋白棒 小身材 大能量 50g*12条/盒 【女士专属】",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a165a77d71.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "85",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144486",
      productName: "MP 蛋白棒 横扫饥饿 小身材大能量 90g*12条/盒",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a160a44847.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "39",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144485",
      productName: "MP 蛋白棒 横扫饥饿 小身材大能量 63g*12条/盒",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a159aeb497.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "38",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144484",
      productName: "MuscleTech 肌肉科技 增肌粉 7磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a13a4a0296.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "59",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144483",
      productName: "Muscletech 肌肉科技 金牌正氮乳清蛋白粉 5.5磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a12cd37c14.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "82",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144482",
      productName: "Muscletech 肌肉科技 金牌正氮乳清蛋白粉 2.2磅/桶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/29/160a10bb0b981.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "82",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144479",
      productName: "测试不要派单",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/22/1607d71aa2c63.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "49",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144478",
      productName: "PROSUPPS 海德力 液态左旋肉碱 473ml/瓶",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2018/01/15/160f93824d666.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "69",
      isSoldOut: "0"
    },
    {
      wholesaleId: "144477",
      productName: "测试商品不要派单",
      imageUrl: "http://test.uzengroup.com/jkd/upload/images/2017/12/22/1607d03ce3186.1200.jpg",
      price: "1000",
      paymentPrice: "853",
      stockNumber: "100",
      seckillTotalStock: '100',
      salesNumber: "79",
      isSoldOut: "0"
    }
  ]
}

// 第三个板块 （营养保健
const mock_list_3 = [
  {
    type: '0',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t16441/158/1850818709/140828/b0a846a/5a66a794Nf18ecab8.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t18910/157/291876138/172889/eb6671b4/5a6842c6N28f42cd1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '0',
    attribute: '2',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '2',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg',
    products: [
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      }
    ],
    contents: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '1',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '1',
    attribute: '1',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3574/144/335407130/380514/8ddee7f9/5806e150N353d74b1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3574/144/335407130/380514/8ddee7f9/5806e150N353d74b1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '0',
    attribute: '1',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/jfs/t18055/242/251249288/299098/1ca4ec55/5a66e53eN1f8e20a0.gif',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '2',
    attribute: '0',
    childrenId: '1088',
    pageId: '202',
    picture: 'https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg',
    products: [
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      }
    ],
    contents: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  }
]

// 第四个板块  （母婴专区
const mock_list_4 = [
  {
    type: '0',
    attribute: '0',
    childrenId: '1088',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t16441/158/1850818709/140828/b0a846a/5a66a794Nf18ecab8.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t18910/157/291876138/172889/eb6671b4/5a6842c6N28f42cd1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '0',
    attribute: '1',
    childrenId: '1088',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/jfs/t18055/242/251249288/299098/1ca4ec55/5a66e53eN1f8e20a0.gif',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '0',
    attribute: '2',
    childrenId: '1088',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '食用品',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '1',
    attribute: '0',
    childrenId: '1088',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '，美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '1',
    attribute: '1',
    childrenId: '1088',
    picture: 'https://m.360buyimg.com/mobilecms/s220x220_jfs/t16144/39/1077612093/301317/8faf4274/5a4c3b17N5db472c3.jpg!q70.jpg',
    contents: [
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t11173/129/2339921950/64157/d470cc5c/5a6a7e6dN9358334f.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3574/144/335407130/380514/8ddee7f9/5806e150N353d74b1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '，美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3574/144/335407130/380514/8ddee7f9/5806e150N353d74b1.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '母婴馆',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/mobilecms/s374x200_jfs/t16549/164/1684970315/50662/e9298b2a/5a5edf65N54d88fcb.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '手机数码',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '，美食城',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      },
      {
        targetType: '4',
        pictureIcon: 'https://m.360buyimg.com/n1/s130x130_jfs/t3181/127/2443896944/313624/914de40e/57e10eb6Nc2553cd7.jpg!q70.jpg',
        requestUrl: '',
        navigationName: '小家电',
        title: '我是标题',
        width: '0',
        height: '0',
        content: '1'
      }
    ],
    products: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  {
    type: '2',
    attribute: '0',
    childrenId: '1088',
    picture: 'https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg',
    products: [
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      }
    ],
    contents: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  },
  ,
  {
    type: '2',
    attribute: '0',
    childrenId: '1088',
    picture: 'https://img1.360buyimg.com/da/jfs/t17602/207/176293593/98269/c5cf6742/5a61fa60Ne891d37b.jpg',
    products: [
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      },
      {
        fxNumber: '1',
        imageUrl: 'https://m.360buyimg.com/mobilecms/s130x130_jfs/t11962/157/2713519848/26717/7b4b1b09/5a1cd6e3N9b3ceba1.jpg!q70.jpg',
        price: '999.99',
        productId: '28934',
        productName: '6/6s/7s 数据线 苹果',
        salesNumber: '99',
      }
    ],
    contents: [],
    specialName: '增肌',
    width: '0',
    height: '0'
  }
]

// 专题详情列表
const mock_themeDetails = {
  defKeywords: '默认搜索词',
  spePicture: 'https://img1.360buyimg.com/da/jfs/t15127/10/1993639399/320340/8e61751b/5a68331cNc1abccb7.jpg',
  channelList: [
    {
      channelId: "1",
      channelName: "纸尿裤镑",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=15"
    },
    {
      channelId: "2",
      channelName: "奶粉镑",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=25"
    },
    {
      channelId: "3",
      channelName: "营养辅食",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=17"
    },
    {
      channelId: "4",
      channelName: "营养保健",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=23"
    },
    // {
    //   channelId: "5",
    //   channelName: "营养辅食123",
    //   requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=17"
    // },
    // {
    //   channelId: "6",
    //   channelName: "营养保健456",
    //   requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/channelDetail&channelId=23"
    // }
  ],
  list: [
    {
      childrenId: '1234',
      type: '4',
      attribute: '1',
      specialName: '纸尿裤镑',
      picture: 'https://img1.360buyimg.com/da/jfs/t15127/10/1993639399/320340/8e61751b/5a68331cNc1abccb7.jpg',
      width: '0',
      height: '0',
      contents: [],
      products: [
        {
          productId: "2093",
          wholesaleId: "2093",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t349/13/907217009/164759/403adcb2/5428c6b5N1f56c8aa.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
        },
        {
          productId: "1236",
          wholesaleId: "1236",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t15601/39/1909654599/97649/2a2bbc75/5a694948N5cc36e24.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
        },
        {
          productId: "9234",
          wholesaleId: "1236",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t14326/351/1061184604/243942/e6abd6bb/5a435c4aN08555e02.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=4892"
        }
      ]
    },
    {
      childrenId: '8912',
      type: '4',
      attribute: '1',
      specialName: '奶粉镑',
      picture: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t15601/196/1896836440/127872/c70714b5/5a699d40Ne0f1a00a.jpg!q70.jpg',
      width: '0',
      height: '0',
      contents: [],
      products: [
        {
          productId: "2093",
          wholesaleId: "2093",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t2908/194/2836350429/632797/13a56512/5774e3a0Na32750bf.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
        },
        {
          productId: "1236",
          wholesaleId: "1236",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t3445/264/2260088347/465880/e417fc2b/58479fbaN5c817180.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
        },
        {
          productId: "9234",
          wholesaleId: "1236",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t16099/334/1522336954/332744/19b0050d/5a563807N7b4ca883.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=4892"
        }
      ]
    },
    {
      childrenId: '8912',
      type: '4',
      attribute: '1',
      specialName: '营养辅食',
      picture: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t15601/196/1896836440/127872/c70714b5/5a699d40Ne0f1a00a.jpg!q70.jpg',
      width: '0',
      height: '0',
      contents: [],
      products: [
        {
          productId: "2093",
          wholesaleId: "2093",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t2908/194/2836350429/632797/13a56512/5774e3a0Na32750bf.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
        },
        {
          productId: "1236",
          wholesaleId: "1236",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t3445/264/2260088347/465880/e417fc2b/58479fbaN5c817180.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
        }
      ]
    },
    {
      childrenId: '8912',
      type: '4',
      attribute: '1',
      specialName: '营养保健',
      picture: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t15601/196/1896836440/127872/c70714b5/5a699d40Ne0f1a00a.jpg!q70.jpg',
      width: '0',
      height: '0',
      contents: [],
      products: [
        {
          productId: "2093",
          wholesaleId: "2093",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t2908/194/2836350429/632797/13a56512/5774e3a0Na32750bf.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
        },
        {
          productId: "1236",
          wholesaleId: "1236",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t3445/264/2260088347/465880/e417fc2b/58479fbaN5c817180.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
        },
        {
          productId: "9234",
          wholesaleId: "1236",
          productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
          imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t16099/334/1522336954/332744/19b0050d/5a563807N7b4ca883.jpg!q70.jpg",
          isShowPrice: "0",
          price: "66.0",
          isProxy: "1",
          imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
          shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
          fxNumber: "17467",
          salesNumber: "17471",
          requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=4892"
        }
      ]
    },
    // {
    //   childrenId: '8912',
    //   type: '4',
    //   attribute: '1',
    //   specialName: '营养辅食',
    //   picture: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t15601/196/1896836440/127872/c70714b5/5a699d40Ne0f1a00a.jpg!q70.jpg',
    //   width: '0',
    //   height: '0',
    //   contents: [],
    //   products: [
    //     {
    //       productId: "2093",
    //       wholesaleId: "2093",
    //       productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
    //       imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t2908/194/2836350429/632797/13a56512/5774e3a0Na32750bf.jpg!q70.jpg",
    //       isShowPrice: "0",
    //       price: "66.0",
    //       isProxy: "1",
    //       imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
    //       shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
    //       fxNumber: "17467",
    //       salesNumber: "17471",
    //       requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
    //     },
    //     {
    //       productId: "1236",
    //       wholesaleId: "1236",
    //       productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
    //       imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t3445/264/2260088347/465880/e417fc2b/58479fbaN5c817180.jpg!q70.jpg",
    //       isShowPrice: "0",
    //       price: "66.0",
    //       isProxy: "1",
    //       imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
    //       shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
    //       fxNumber: "17467",
    //       salesNumber: "17471",
    //       requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
    //     }
    //   ]
    // },
    // {
    //   childrenId: '8912',
    //   type: '4',
    //   attribute: '1',
    //   specialName: '营养保健',
    //   picture: 'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t15601/196/1896836440/127872/c70714b5/5a699d40Ne0f1a00a.jpg!q70.jpg',
    //   width: '0',
    //   height: '0',
    //   contents: [],
    //   products: [
    //     {
    //       productId: "2093",
    //       wholesaleId: "2093",
    //       productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
    //       imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t2908/194/2836350429/632797/13a56512/5774e3a0Na32750bf.jpg!q70.jpg",
    //       isShowPrice: "0",
    //       price: "66.0",
    //       isProxy: "1",
    //       imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
    //       shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
    //       fxNumber: "17467",
    //       salesNumber: "17471",
    //       requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
    //     },
    //     {
    //       productId: "1236",
    //       wholesaleId: "1236",
    //       productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
    //       imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t3445/264/2260088347/465880/e417fc2b/58479fbaN5c817180.jpg!q70.jpg",
    //       isShowPrice: "0",
    //       price: "66.0",
    //       isProxy: "1",
    //       imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
    //       shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
    //       fxNumber: "17467",
    //       salesNumber: "17471",
    //       requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
    //     },
    //     {
    //       productId: "9234",
    //       wholesaleId: "1236",
    //       productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
    //       imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t16099/334/1522336954/332744/19b0050d/5a563807N7b4ca883.jpg!q70.jpg",
    //       isShowPrice: "0",
    //       price: "66.0",
    //       isProxy: "1",
    //       imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
    //       shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
    //       fxNumber: "17467",
    //       salesNumber: "17471",
    //       requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=4892"
    //     }
    //   ]
    // }
  ]
}

// 
const mock_familyProductList = [
  {
    pictureIcon: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1543860409,658791325&fm=173&s=2742F3154960461380E0D1FF03008038&w=218&h=146&img.JPEG',
    requestUrl: 'https://www.baidu.com/'
  },
  {
    pictureIcon: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1634658898,3815350724&fm=173&s=87325185C6433AFC4D3CC98B0300A083&w=218&h=146&img.JPEG',
    requestUrl: 'https://www.baidu.com/'
  },
  {
    pictureIcon: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2638921293,2701703389&fm=173&s=ACB06091DE4220DE963C07020300E0C6&w=218&h=146&img.JPEG',
    requestUrl: 'https://www.baidu.com/'
  }
]

// 内页数据
const mock_insidePageDetail = {
  childrenId: '1234',
  type: '4',
  attribute: '1',
  specialName: '纸尿裤镑',
  picture: 'https://img1.360buyimg.com/da/jfs/t15127/10/1993639399/320340/8e61751b/5a68331cNc1abccb7.jpg',
  width: '0',
  height: '0',
  contents: [],
  products: [
    {
      productId: "2093",
      wholesaleId: "2093",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t349/13/907217009/164759/403adcb2/5428c6b5N1f56c8aa.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
    },
    {
      productId: "1236",
      wholesaleId: "1236",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t15601/39/1909654599/97649/2a2bbc75/5a694948N5cc36e24.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
    },
    {
      productId: "9234",
      wholesaleId: "1236",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t14326/351/1061184604/243942/e6abd6bb/5a435c4aN08555e02.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=4892"
    },
    {
      productId: "2093",
      wholesaleId: "2093",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t349/13/907217009/164759/403adcb2/5428c6b5N1f56c8aa.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
    },
    {
      productId: "1236",
      wholesaleId: "1236",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t15601/39/1909654599/97649/2a2bbc75/5a694948N5cc36e24.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
    },
    {
      productId: "9234",
      wholesaleId: "1236",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t14326/351/1061184604/243942/e6abd6bb/5a435c4aN08555e02.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=4892"
    },
    {
      productId: "2093",
      wholesaleId: "2093",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶,ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t349/13/907217009/164759/403adcb2/5428c6b5N1f56c8aa.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=1829"
    },
    {
      productId: "1236",
      wholesaleId: "1236",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t15601/39/1909654599/97649/2a2bbc75/5a694948N5cc36e24.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=2384"
    },
    {
      productId: "9234",
      wholesaleId: "1236",
      productName: "ON 欧普特蒙 褪黑素片 100片/瓶",
      imageUrl: "https://m.360buyimg.com/mobilecms/s220x220_jfs/t14326/351/1061184604/243942/e6abd6bb/5a435c4aN08555e02.jpg!q70.jpg",
      isShowPrice: "0",
      price: "66.0",
      isProxy: "1",
      imageMin: "http://www.jikeduo.com.cn/upload/thumbnail/57a0365cbed98.jpg",
      shareURL: "http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=5922&store_id=830",
      fxNumber: "17467",
      salesNumber: "17471",
      requestUrl: "http://192.168.10.91:8080/clt/index.json?a=v1/productDetail&wholesaleId=4892"
    }
  ]
}

export {
  mock_coupon,
  mock_channelList,
  mock_list,
  mock_secKillDetail,
  mock_list_3,
  mock_list_4,
  mock_themeDetails,
  mock_familyProductList,
  mock_insidePageDetail
}