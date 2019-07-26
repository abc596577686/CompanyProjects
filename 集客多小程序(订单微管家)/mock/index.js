const getNavList = [{
  "channelId": "29",
  "isSeckill": "0",
  "channelName": "运动营养",
  "requestUrl": "http://test.uzengroup.com/clt/index.json?a=v1/channelDetail&channelId=29",
  "id": "target_01"
}, 
{
          "channelId": "37",
  "isSeckill": "0",
  "channelName": "品牌日",
  "requestUrl": "http://test.uzengroup.com/clt/index.json?a=v1/channelDetail&channelId=37",
  "id": "target_02"
}, {
          "channelId": "35",
  "isSeckill": "0",
  "channelName": "运动服饰",
  "requestUrl": "http://test.uzengroup.com/clt/index.json?a=v1/channelDetail&channelId=35",
  "id": "target_03"
}, {
          "channelId": "34",
  "isSeckill": "0",
  "channelName": "减肥专区",
  "requestUrl": "http://test.uzengroup.com/clt/index.json?a=v1/channelDetail&channelId=34",
  "id": "target_04"
}, {
          "channelId": "23",
  "isSeckill": "0",
  "channelName": "营养保健",
  "requestUrl": "http://test.uzengroup.com/clt/index.json?a=v1/channelDetail&channelId=23",
  "id": "target_05"
}, {
          "channelId": "14",
  "isSeckill": "0",
  "channelName": "母婴专区",
  "requestUrl": "http://test.uzengroup.com/clt/index.json?a=v1/channelDetail&channelId=14",
  "id": "target_06"
}, {
          "channelId": "33",
  "isSeckill": "0",
  "channelName": "整箱购",
  "requestUrl": "http://test.uzengroup.com/clt/index.json?a=v1/channelDetail&channelId=33",
  "id": "target_07"
}]

const orderInfo = [
  {
    id: 0,
    /*状态0-4对应订单5个状态*/
    status: 0,
    orderNum: "BD2017020716493123131",
    goodList: [
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: "巧克力味",
        price: 40,
        num: 3
      },
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: '芒果味',
        price: 40,
        num: 6,
      }
    ],
    sendMoney: 20
  },
  {
    id: 1,
    /*状态0-4对应订单5个状态*/
    status: 1,
    orderNum: "BD2017020716493123131",
    goodList: [
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: "巧克力味",
        price: 40,
        num: 3
      },
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: '芒果味',
        price: 40,
        num: 6,
      }
    ],
    sendMoney: 20
  },
  {
    id: 2,
    /*状态0-4对应订单5个状态*/
    status: 2,
    orderNum: "BD2017020716493123131",
    goodList: [
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: "巧克力味",
        price: 40,
        num: 3
      },
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: '芒果味',
        price: 40,
        num: 6,
      }
    ],
    sendMoney: 20
  },
  {
    id: 3,
    /*状态0-4对应订单5个状态*/
    status: 3,
    orderNum: "BD2017020716493123131",
    goodList: [
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: "巧克力味",
        price: 40,
        num: 3
      },
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: '芒果味',
        price: 40,
        num: 6,
      }
    ],
    sendMoney: 20
  },
  {
    id: 4,
    /*状态0-4对应订单5个状态*/
    status: 4,
    orderNum: "BD2017020716493123131",
    goodList: [
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: "巧克力味",
        price: 40,
        num: 3
      },
      {
        img: '',
        goodName: "ON欧普特蒙增肌粉2720g 健肌粉健身含乳清蛋白粉质粉",
        weight: "5磅",
        taste: '芒果味',
        price: 40,
        num: 6,
      }
    ],
    sendMoney: 20
  },
];


module.exports = {
  getNavList,
  orderInfo
}