let Base = require('../Base/Base');
let Pinyin = require('../Base/Pinyin');

class SortListView extends Base {
  constructor(page, id) {
    /// <summary>组件构造函数</summary>
    /// <param name="page" type="Object">页面对象</param>
    /// <param name="id" type="String">要绑定的元素ID</param>

    super(page, id);

    // 回到顶部
    // this.createEvent('gotop', function () {
    //   if (this.scrollTop == 0) {
    //     return
    //   } else {
    //     // console.log(this.scrollTop)
    //     this.scrollTop = 0;
    //     this.update();
    //     wx.vibrateShort({}); 
    //   }
    // });

    // this.createEvent('scrollLog', function (data) {
      // if (this.isShow == 1) {
      //   return
      // } else {
      //   console.log("触发滚动事件")
      //   this.isShow = 1
      //   console.log(this.isShow)
      //   this.update();
      // }
     
    // });

    // 创建选择事件
    this.createEvent('onSelect', function (data) {
      console.log(123,data)
      if (data.canclick !== 1) return;
      if (typeof this.onSelect === 'function') {
        let obj = {
          title: data.title,
          desc: data.desc || '',
          other: data.other || '',
          brandId: data.brandid || '',
          name : data.title
        };
        this.onSelect.call(this, obj);
        wx.vibrateShort({});
      }
    });
    let that = this

    // 创建选择事件
    this.createEvent('onSelect1', function (data) {
      console.log(data)
      let name = data.brand
      // if (data.canclick !== 1) return;
      if (typeof this.onSelect1 === 'function') {
        let obj = {
          title: data.title,
          desc: data.desc || '',
          other: data.other || '',
          brandId: data.brandid || '',
          name : name
        };
        this.onSelect1.call(this, obj);
        wx.vibrateShort({});
        // that.setData({
        //   name : name
        // })
      }
    });

    // 创建快速指引事件
    this.createEvent('onFast', function (data) {
      if (!data.value) return;
      this.toFast = data.value;
      if (this.toFast == '#') this.toFast = 'sharp';
      this.update();
      wx.vibrateShort({});
    });

    this.init();
  };

  get name() {
    /// <summary>获取组件名称</summary>
    /// <returns type="String">组件名称</returns>

    return 'SortListView';
  };

  set isVisible(value) {
    /// <summary>设置是否可见</summary>
    /// <param name="value" type="Boolean">是否可见</param>

    super.isVisible = value;
    this.toFast = '#';

    if (this.list.length === 0) console.warn('您打开了一个没有数据的排序选择器视图');
  };

  set footerText(value) {
    /// <summary>设置页脚</summary>
    /// <param name="value" type="String">页脚</param>

    this._footerText = value;
    if (this.list.length != 0) {
      this.list[this.list.length - 1].hb = value !== '' ? 1 : 0;
    }

    this.update();
  };

  get footerText() {
    return this._footerText;
  };

  reset() {
    /// <summary>重置</summary>

    // 所有品牌
    this.list = [];
    this.fastList = [];
    // 热门品牌
    this.hotlist = [];
    this.hot = [];
    // 底部
    this._footerText = '';

    this.isShow = 1

    this.update();
  };
  
  setList1(hotlist) {
    this.hotlist.length = 0
    this.hotlist = hotlist
    console.log(this.hotlist)
    
    this.update();
  }

  setList(list) {
    this.list.length = 0;
    this.fastList.length = 0;

    let hasList = [];

    list.map(function (value, index) {
      let desc, other, imgurl ,brandId;
      // console.log(typeof(value.brandName))
      // console.log(typeof(value.brandPic))
      // console.log(list)
      // console.log(list.length)

      // console.log(value)

      // for (let i = 0; i < list.length; i++) { 
      //   _this.list.push({
      //     url:list[i].brandPic
      //   });
      // } 

      if (typeof value === 'object') {
        brandId = value.brandId;
        imgurl = value.brandPic;
        value = value.brandName;
        desc = value.desc;
        other = value.other;
      }

      // console.log(brandId)
      
      hasList.push({
        i: Pinyin.getCamelChars(value),
        c: Pinyin.getCamelChars(value)[0],
        w: value,
        desc: desc,
        other: other,
        url: imgurl, //图片地址
        brandId : brandId, //品牌id
      })
    });

    console.log(hasList)

    // for (let i = 0; i < hasList.length; i++) { 
    //   this.list.push({
    //     url:hasList[i].url
    //   });
    // }

    console.log(this.list)

    let otherList = [];
    {
      let newWordList = [];
      for (let i = 0; i < hasList.length; i++) {
        (hasList[i].c.charCodeAt() < 65 ? otherList : newWordList).push(hasList[i]);
      }
      hasList = newWordList;
    }

    hasList.sort(function (a, b) {
      if (a.c.charCodeAt() > b.c.charCodeAt()) return 1;
      return -1;
    });

    otherList.sort(function (a, b) {
      if (a.c.charCodeAt() > b.c.charCodeAt()) return 1;
      return -1;
    });

    let lastChar = '';
    for (let i = 0; i < hasList.length; i++) {
      if (lastChar != hasList[i].c) {
        if (this.list.length != 0) this.list[this.list.length - 1].hb = 0;
        this.list.push({
          id: hasList[i].c,
          title: hasList[i].c,
          ict: 1
        });
        this.fastList.push(hasList[i].c);
        lastChar = hasList[i].c;
      }
      let listObj = {
        title: hasList[i].w,
        cc: 1,
        hb: 1,
        url: hasList[i].url,
        brandId : hasList[i].brandId
      };
      if (!!hasList[i].desc) listObj.desc = hasList[i].desc;
      if (!!hasList[i].other) listObj.other = hasList[i].other;
      this.list.push(listObj);
    }

    if (otherList.length > 0) {
      this.list.push({ id: 'sharp', value: '#', ict: 1 });
      this.fastList.push('#');
      for (let i = 0; i < otherList.length; i++) {
        let listObj = {
          value: otherList[i].w,
          cc: 1,
          hb: 1
        };
        if (!!otherList[i].desc) listObj.desc = otherList[i].desc;
        if (!!hasList[i].other) listObj.other = hasList[i].other;
        this.list.push(listObj);
      }
    }

    if (this._footerText === '' && this.list.length !== 0) this.list[this.list.length - 1].hb = 0;

    this.update();
  };

}

module.exports = SortListView;