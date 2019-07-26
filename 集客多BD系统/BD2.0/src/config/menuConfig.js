const menuList = [
  {
    title: '渠道管理',
    icon: 'table',
    id : '',
    children: [
      {
        title: '渠道列表',
        url: '/channel/list',
        id : 'product'
      },
      {
        title: '成员管理',
        url: '/channel/user',
        id : 'brand'
      }
    ]
  },  
  {
    title: '地推团队',
    icon: 'dropbox',
    id : 'dispatchManager',
    children: [
      {
        title: '地推团队列表',
        url: '/groundPromotion/list',
        id : 'product'
      }
    ]
  },
  {
    id : 'transform',
    title : '转化团队',
    icon : 'stock',
    children :[
      {
        id : 'menuManage',
        title : '转化团队列表',
        icon : '',
        url : '/conversion/list'
      },
    ]
  },
  {
    title : '用户分配',
    icon : 'form',
    id : 'teams',
    children: [
      {
        id : 'information',
        title : '用户分配表',
        icon : '',
        url : '/teams/information'
      }
    ]
  },
  {
    id : 'transform',
    title : '客户管理',
    icon : 'usergroup-add',
    children :[
      {
        id : 'menuManage',
        title : '客户信息列表',
        icon : '',
        url : '/transform/list'
      },
    ]
  },
  {
    id : 'transform',
    title : '拜访记录',
    icon : 'car',
    children :[
      {
        id : 'menuManage',
        title : '拜访记录',
        icon : '',
        url : '/visit/list'
      },
    ]
  },
  {
    id : 'transform',
    title : '绩效记录',
    icon : 'snippets',
    children :[
      {
        id : 'menuManagelist',
        title : '绩效记录列表',
        icon : '',
        url : '/performance/list'
      },
    ]
  },
];
export default menuList;