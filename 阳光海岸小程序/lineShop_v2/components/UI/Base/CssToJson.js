module.exports = function (css) {
  try {
    let open = '';
    while ((open = css.indexOf('/*')) !== -1 &&
      (close = css.indexOf('*/')) !== -1) {
      css = css.substring(0, open) + css.substring(close + 2);
    }

    var json = {};

    while (css.length > 0) {
      var lbracket = css.indexOf('{');
      var rbracket = css.indexOf('}');

      function toObject(array) {
        var ret = {};
        array.forEach(function (elm) {
          var index = elm.indexOf(':');
          var property = elm.substring(0, index).trim();
          var value = elm.substring(index + 1).trim();
          ret[property] = value;
        });
        return ret;
      }

      var declarations = css.substring(lbracket + 1, rbracket)
        .split(';')
        .map(function (declaration) {
          return declaration.trim();
        })
        .filter(function (declaration) {
          return declaration.length > 0;
        });

      declarations = toObject(declarations);

      var selectors = css.substring(0, lbracket)
        .split(',')
        .map(function (selector) {
          return selector.trim();
        });

      selectors.forEach(function (selector) {
        if (!json[selector]) json[selector] = {};
        Object.keys(declarations).forEach(function (key) {
          json[selector][key] = declarations[key];
        });
      });
      css = css.slice(rbracket + 1).trim()
    }
    return json;
  } catch (e) {
    console.error(`处理样式出错：${e}`);
    return null;
  }
};