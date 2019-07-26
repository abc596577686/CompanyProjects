const menuList = [
  {
    title: '店铺首页',
    url: '/home',
    icon: 'home',
    id : 'home'
  },
  {
    title: '商品管理',
    icon: 'table',
    id : 'goodsManager',
    children: [
      {
        title: '商品市场',
        url: '/Manager/product',
        id : 'product'
      },
      {
        title: '商品品牌',
        url: '/Manager/brand',
        id : 'brand'
      },
      {
        title: '商品分类',
        url: '/Manager/category',
        id : 'category'
      },
      {
        title: '商品投放',
        url: '/Manager/stock',
        id : 'stock'
      }
    ]
  },
  {
    title: '订单管理',
    icon: 'shopping',
    id : 'orderManage',
    children: [
      {
        title: '所有订单',
        url: '/orderManager/allOrder',
        id : 'allOrder'
      },
      {
        title : '客审订单',
        url : '/orderManager/customerOrder',
        id : 'customerOrder'
      },
      {
        title: '同步记录',
        id : 'sync',
        children: [
          {
            title: '订单状态列表同步记录',
            url: '/orderManager/syncRecord/syncStatusRecord',
            id : 'syncStatusRecord',
          },
          {
            title: '订单状态同步列表',
            url: '/orderManager/syncRecord/syncStatus',
            id : 'syncStatus',
          },
          {
            title: '支付报关记录',
            url: '/orderManager/syncRecord/customsRecord',
            id : 'customsRecord',
            
          }
        ]
      }
    ]
  },
  {
    title: '分销市场',
    icon: 'dropbox',
    id : 'market',
    children: [
      {
        title: '商品管理',
        url: '/Market/product',
        id : 'productMana'
      },
      {
        title: '会员管理',
        url: '/Market/user',
        id : 'user'
      }
    ]
  },
  {
    title: '配送管理',
    icon: 'car',
    id : 'dispatchManager',
    children: [
      {
        title: '仓库列表',
        url: '/dispatchManager/wareHouse',
        id : 'wareHouse'
      },
      {
        title: '运费模版',
        url: '/dispatchManager/postageTpl',
        id : 'postageTpl'
      }
    ]
  },
  {
    id : 'authority',
    title : '权限管理',
    icon : 'user',
    children :[
      {
        id : 'menuManage',
        title : '菜单管理',
        icon : '',
        url : '/authority/menuManage'
      },
      // {
      //   id: 'userList',
      //   title: '用户管理',
      //   icon: '',
      //   url: '/authority/userList'
      // },
      {
        id : 'superAdmin',
        title : '管理员管理',
        icon : '',
        url : '/authority/superAdmin'
      },
      {
        id : 'role',
        title : '角色管理',
        icon : '',
        url : '/authority/role'
      },
      {
        id : 'resource',
        title : '资源管理',
        icon : '',
        url : '/authority/resource'
      }
    ]
  },
  {
    title : '海关信息',
    icon : 'form',
    id : 'Customs',
    children: [
      {
        id : 'information',
        title : '海关处理订单',
        icon : '',
        url : '/Customs/information'
      },
    ]
  }
];
export default menuList;