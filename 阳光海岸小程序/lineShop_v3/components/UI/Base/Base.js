class Base {
  constructor(page, id) {
    /// <summary>组件构造函数</summary>
    /// <param name="page" type="Object">页面对象</param>
    /// <param name="id" type="String">要绑定的元素ID</param>

    if (this.name === 'Base') {
      throw new ReferenceError('Base 类不能被直接调用');
    }

    this._page = page;

    let oldUnloadFn = this._page.onUnload;
    this._page.onUnload = () => {
      typeof this.dispose === 'function' && this.dispose();
      typeof oldUnloadFn === 'function' && oldUnloadFn.apply(this._page, arguments);

      console.log(`页面 "${this._page.route}" 上的 "${this.name}" 组件 "${this._id}" 已销毁`);
    };

    this._id = id;
    this._eventId = `_${id}_${this.generateUUID()}`;
    this._isVisible = false;
    this._canUpdate = true;
  };

  get id() {
    /// <summary>获取组件id</summary>
    /// <returns type="String">组件id</returns>

    return this._id;
  };

  get name() {
    /// <summary>获取组件名称</summary>
    /// <returns type="String">组件名称</returns>

    return 'Base';
  };

  get isVisible() {
    /// <summary>获取是否可见</summary>
    /// <returns type="Boolean">是否可见</returns>

    return this._isVisible;
  };

  set isVisible(value) {
    /// <summary>设置是否可见</summary>
    /// <param name="value" type="Boolean">是否可见</param>

    this._isVisible = value;
    this.update();
  };

  get canUpdate() {
    /// <summary>获取是否更新</summary>
    /// <returns type="Boolean">是否更新</returns>

    return this._canUpdate;
  };

  set canUpdate(value) {
    /// <summary>设置是否更新</summary>
    /// <param name="value" type="Boolean">是否更新</param>

    this._canUpdate = value;
  };

  init() {
    /// <summary>初始化组件</summary>

    this.reset();

    console.log(`页面 "${this._page.route}" 上的 "${this.name}" 组件 "${this._id}" 初始化已完成`);
  };

  update(cloneAll) {
    /// <summary>更新数据</summary>

    if (!this._canUpdate) return;
    if (!!this._updateTimer) clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(() => {
      this._updateTimer = null;
      let setDataObj = {};

      let obj = shallowCopy(this);
      setDataObj[this._id] = saveObj(obj, [], obj, cloneAll);
      this._page.setData(setDataObj);
    }, 50);
  };

  createEvent(name, callback) {
    /// <summary>创建事件</summary>
    /// <param name="name" type="String">事件名称</param>
    /// <param name="callback" type="Function">事件函数</param>

    name = `_${name}`;
    this[name] = `${this._eventId}_${name}`;
    this._page[this[name]] = e => {
      callback.call(this, e.currentTarget.dataset, e);
    };
  };

  deleteEvent(name) {
    /// <summary>删除事件</summary>
    /// <param name="name" type="String">事件名称</param>

    delete this._page[this[name]];
    delete this[name];
  };

  getStorage() {
    /// <summary>获取本地存储数据</summary>

    let storage = wx.getStorageSync(`JyoComponent_${this._page.route}`);
    storage = JSON.parse(storage || "{}");
    return storage[this._id] || {};
  };

  setStorage(value) {
    /// <summary>设置本地存储数据</summary>
    /// <param name="value" type="Object">数据对象</param>

    let key = `JyoComponent_${this._page.route}`;
    let storage = wx.getStorageSync(key);
    storage = JSON.parse(storage || "{}");
    if (value === null || typeof value === "undefined") {
      delete storage[this._id];
    } else {
      storage[this._id] = value;
    }
    if (isEmptyObject(storage)) {
      wx.removeStorageSync(key);
    } else {
      wx.setStorageSync(key, JSON.stringify(storage));
    }
  };

  clearStorage() {
    /// <summary>清空本地存储数据</summary>

    this.setStorage(null);
  };

  generateUUID() {
    /// <summary>生成UUID</summary>
    /// <returns type="String">UUID</returns>

    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

}

function isEmptyObject(obj) {
  /// <summary>判断对象是否为空</summary>
  /// <param name="obj" type="Object">对象</param>
  /// <returns type="Boolean">是否为空对象</returns>

  for (let i in obj) return false;
  return true;
}

function saveObj(obj, parents, srcObj, cloneAll) {
  /// <summary>筛选数据</summary>
  /// <param name="obj" type="Object">对象</param>
  /// <param name="parents" type="Array">父级对象数组</param>
  /// <returns type="Object">经过筛选的新对象</returns>

  if (!obj) return null;
  if (typeof obj !== 'object') return obj;

  let newObj = {};

  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i] instanceof Array) {
        obj[i] = saveObj(obj[i], parents, obj[i], cloneAll);
      } else if (typeof obj[i] === "object") {
        if (cloneAll) {
          obj[i] = saveObj(shallowCopy(obj[i]), parents, obj[i], cloneAll);
        } else {
          obj[i] = saveObj(obj[i], parents, obj[i], cloneAll);
        }
      }
    }
    return obj;
  }

  loopFor: for (let i in obj) {
    // 阻止向上引用
    for (let n = 0; n < parents.length; n++) {
      if (srcObj[i] === parents[n]) {
        continue loopFor;
      }
    }
    // 阻止空引用
    if (typeof obj[i] === 'undefined' || obj[i] === null) continue;
    switch (i) {
      // 阻止引用页面对象
      case '_page': continue;
      default:
        if (typeof obj[i] === 'object') {
          parents.push(srcObj);
          if (cloneAll) {
            newObj[i] = saveObj(shallowCopy(obj[i]), parents, obj[i], cloneAll);
          } else {
            newObj[i] = saveObj(obj[i], parents, obj[i], cloneAll);
          }
        } else newObj[i] = obj[i];
        break;
    }
  }
  return newObj;
}

function shallowCopy(src) {
  /// <summary>对象浅拷贝</summary>
  /// <param name="src" type="Object">对象</param>

  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}

module.exports = Base;