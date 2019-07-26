let cssToJson = require("CssToJson");

function deleteNullItem(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length == 0) arr.splice(i, 1);
  }
}

(function () {

  // Regular Expressions for parsing tags and attributes
  var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

  // Empty Elements - HTML 5
  var empty = makeMap("style,area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

  // Block Elements - HTML 5
  var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

  // Inline Elements - HTML 5
  var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

  // Elements that you can, intentionally, leave open
  // (and which close themselves)
  var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

  // Attributes that have their values filled in disabled="disabled"
  var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

  // Special Elements (can contain anything)
  var special = makeMap("script,style");

  var HTMLParser = function (html, handler) {
    var index, chars, match, stack = [], last = html;
    stack.last = function () {
      return this[this.length - 1];
    };

    while (html) {
      chars = true;

      // Make sure we're not in a script or style element
      if (!stack.last() || !special[stack.last()]) {

        // Comment
        if (html.indexOf("<!--") == 0) {
          index = html.indexOf("-->");

          if (index >= 0) {
            if (handler.comment)
              handler.comment(html.substring(4, index));
            html = html.substring(index + 3);
            chars = false;
          }

          // end tag
        } else if (html.indexOf("</") == 0) {
          match = html.match(endTag);

          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(endTag, parseEndTag);
            chars = false;
          }

          // start tag
        } else if (html.indexOf("<") == 0) {
          match = html.match(startTag);

          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(startTag, parseStartTag);
            chars = false;
          }
        }

        if (chars) {
          index = html.indexOf("<");

          var text = index < 0 ? html : html.substring(0, index);
          html = index < 0 ? "" : html.substring(index);

          if (handler.chars)
            handler.chars(text);
        }

      } else {
        html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
          text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
          if (handler.chars)
            handler.chars(text);

          return "";
        });

        parseEndTag("", stack.last());
      }

      if (html == last) {
        throw "Parse Error: " + html;
      }

      last = html;
    }

    // Clean up any remaining tags
    parseEndTag();

    function parseStartTag(tag, tagName, rest, unary) {
      tagName = tagName.toLowerCase();

      if (block[tagName]) {
        while (stack.last() && inline[stack.last()]) {
          parseEndTag("", stack.last());
        }
      }

      if (closeSelf[tagName] && stack.last() == tagName) {
        parseEndTag("", tagName);
      }

      unary = empty[tagName] || !!unary;

      if (!unary)
        stack.push(tagName);

      if (handler.start) {
        var attrs = [];

        rest.replace(attr, function (match, name) {
          var value = arguments[2] ? arguments[2] :
            arguments[3] ? arguments[3] :
              arguments[4] ? arguments[4] :
                fillAttrs[name] ? name : "";

          attrs.push({
            name: name,
            value: value
            //escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
          });
        });

        if (handler.start)
          handler.start(tagName, attrs, unary);
      }
    }

    function parseEndTag(tag, tagName) {
      // If no tag name is provided, clean shop
      if (!tagName)
        var pos = 0;

      // Find the closest opened tag of the same type
      else
        for (var pos = stack.length - 1; pos >= 0; pos--)
          if (stack[pos] == tagName)
            break;

      if (pos >= 0) {
        // Close all the open elements, up the stack
        for (var i = stack.length - 1; i >= pos; i--)
          if (handler.end)
            handler.end(stack[i]);

        // Remove the open elements from the stack
        stack.length = pos;
      }
    }
  };

  (function (global) {
    const DEBUG = false;
    var debug = DEBUG ? console.log.bind(console) : function () { };

    function q(v) {
      return '"' + v + '"';
    }

    function removeDOCTYPE(html) {
      return html
        .replace(/<\?xml.*\?>\n/, '')
        .replace(/<!doctype.*\>\n/, '')
        .replace(/<!DOCTYPE.*\>\n/, '');
    }

    var currentDocument = null;

    global.toJson = function html2json(html, settings) {

      if (!!settings._bindObj) {
        for (let i in settings._bindObj) {
          html = html.replace(new RegExp("({{" + i + "}})", "g"), settings._bindObj[i]);
        }
      }

      currentDocument = null;
      settings = settings || 0;
      //处理字符串
      html = removeDOCTYPE(html);
      html = html;
      //生成node节点
      var bufArray = [];
      var results = {
        nodes: [],
        images: [],
        imageUrls: [],
        linkUrls: [],
        styleSheets: []
      };
      var index = 0;
      var preNodeTag = "";

      HTMLParser(html, {
        start: function (tag, attrs, unary) {
          //debug(tag, attrs, unary);
          // node for this element
          var node = {
            n: 'el',
            tag: tag
          };
          preNodeTag = tag;

          if (bufArray.length === 0) {
            node.i = index.toString()
            index += 1
          } else {
            var parent = bufArray[0];
            if (parent.nodes === undefined) {
              parent.nodes = [];
            }
            node.i = parent.i + '.' + parent.nodes.length
          }

          if (block[tag]) {
            node.tt = "block";
          } else if (inline[tag]) {
            node.tt = "inline";
          } else if (closeSelf[tag]) {
            node.tt = "closeSelf";
          }

          if (attrs.length !== 0) {
            let attrLength = attrs.length;
            let newAttr = attrs.reduce(function (pre, attr) {
              var name = attr.name;
              var value = attr.value;
              if (name == 'class') {
                //console.dir(value);
                //  value = value.join("")
                node.cls = value;
                attrLength--;
                return pre;
              }
              if (name == "onclick") {
                node.tapEvent = value;
                attrLength--;
                return pre;
              }
              if (name == 'xmlns') {
                attrLength--;
                return pre;
              }
              // has multi attibutes
              // make it array of attribute
              if (name == 'style') {
                //console.dir(value);
                //  value = value.join("")
                node.styleStr = value;
              }
              if (value.match(/ /)) {
                value = value.split(' ');
              }

              // if attr already exists
              // merge it
              if (pre[name]) {
                if (Array.isArray(pre[name])) {
                  // already array, push to last
                  pre[name].push(value);
                } else {
                  // single value, make it array
                  pre[name] = [pre[name], value];
                }
              } else {
                // not exist, put it
                pre[name] = value;
              }
              return pre;
            }, {});

            if (attrLength !== 0) {
              node.attr = newAttr;
            }
          }

          if (!!node.attr && !!node.attr.if) {
            if (!settings._bindObj[node.attr.if]) {
              node.hidden = true;
            }
          }

          if (node.tag === "style") return;

          if (node.tag === "link") {
            if (node.attr.rel !== "stylesheet") return;
            // 处理外联样式
            let styleIndex = results.styleSheets.length;
            results.styleSheets.push(null);
            wx.request({
              url: urlToHttpUrl(node.attr.href, settings.url),
              success: (e) => {
                results.styleSheets[styleIndex] = cssToJson(e.data);
                global.processStyle(results, settings);
              }
            });
            return;
          }

          if (node.tag === 'a') {
            // 处理a标签

            node.linkClickEventId = settings.linkClickEventId;
            var linkUrl = node.attr.href;
            if (linkUrl[0] == '') {
              linkUrl.splice(0, 1);
            }
            linkUrl = urlToHttpUrl(linkUrl, settings.url);
            node.attr.href = linkUrl;
            results.linkUrls.push(linkUrl);
          }

          if (node.tag === 'img') {
            // 处理img标签
            node.ii = results.images.length;
            var imgUrl = node.attr.src;
            if (imgUrl[0] == '') {
              imgUrl.splice(0, 1);
            }
            imgUrl = urlToHttpUrl(imgUrl, settings.url);
            node.attr.src = imgUrl;
            node.processImg = !!settings.processImg;
            node.imageClickEventId = settings.imageClickEventId;
            node.imageLoadEventId = settings.imageLoadEventId;
            results.images.push(node);
            results.imageUrls.push(imgUrl);
          }

          if (node.tag === 'font') {
            // 处理font标签

            var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
            var styleAttrs = {
              'color': 'color',
              'face': 'font-family',
              'size': 'font-size'
            };
            if (!node.attr.style) node.attr.style = [];
            if (!node.styleStr) node.styleStr = '';
            for (var key in styleAttrs) {
              if (node.attr[key]) {
                var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
                node.attr.style.push(styleAttrs[key]);
                node.attr.style.push(value);
                node.styleStr += styleAttrs[key] + ': ' + value + ';';
              }
            }
          }

          //临时记录source资源
          if (node.tag === 'source') {
            results.source = node.attr.src;
          }

          if (unary) {
            // if this tag dosen't have end tag
            // like <img src="hoge.png"/>
            // add to parents
            var parent = bufArray[0] || results;
            if (parent.nodes === undefined) {
              parent.nodes = [];
            }
            parent.nodes.push(node);
          } else {
            bufArray.unshift(node);
          }
        },
        end: function (tag) {
          //debug(tag);
          // merge into parent tag
          var node = bufArray.shift();
          if (node.tag !== tag) console.error('invalid state: mismatch end tag');

          //当有缓存source资源时于于video补上src资源
          if (node.tag === 'video' && results.source) {
            node.attr.src = results.source;
            delete result.source;
          }

          if (bufArray.length === 0) {
            results.nodes.push(node);
          } else {
            var parent = bufArray[0];
            if (parent.nodes === undefined) {
              parent.nodes = [];
            }
            parent.nodes.push(node);
          }
        },
        chars: function (text) {
          //debug(text);
          if (!text.trim()) return;
          var node = {
            n: 'txt',
            txt: strDiscode(text)
          };

          if (preNodeTag === "style") {
            results.styleSheets.push(cssToJson(node.txt));
            return;
          }

          if (bufArray.length === 0) {
            results.nodes.push(node);
          } else {
            var parent = bufArray[0];
            if (parent.nodes === undefined) {
              parent.nodes = [];
            }
            node.i = parent.i + '.' + parent.nodes.length
            parent.nodes.push(node);
          }
        },
        comment: function (text) {
          //debug(text);
          // var node = {
          //     n: 'comment',
          //     text: text,
          // };
          // var parent = bufArray[0];
          // if (parent.nodes === undefined) {
          //     parent.nodes = [];
          // }
          // parent.nodes.push(node);
        }
      });

      currentDocument = JSON.parse(JSON.stringify(results));
      global.processStyle(results, settings);
      return results;
    };

    global.processStyle = function (node, page) {
      if (!currentDocument) return;
      let nodes = node.nodes;
      node.styleSheets.map((value, index) => {
        if (!value) return;
        for (let i = 0; i < nodes.length; i++) {
          processNodeStyle(nodes[i], value);
        }
      });
      page.update();
    };

    function processNodeStyle(node, styleSheet, parentClasses) {
      /// <summary>计算合成样式</summary>
      /// <param name="node" type="Object">标签节点</param>
      /// <param name="styleSheet" type="Object">样式表对象</param>
      /// <param name="parentClasses" type="Array">层级数组</param>

      parentClasses = parentClasses || [];
      parentClasses = parentClasses.slice(0);
      if (!!node.cls) {
        let clses = node.cls.split(" ");
        deleteNullItem(clses);
        parentClasses.push(clses);

        for (let style in styleSheet) {
          let styles = style.split(" ");
          deleteNullItem(styles);

          breakFor: for (let clsi = 0; clsi < clses.length; clsi++) {
            let cls = "." + clses[clsi];
            if (styles.indexOf(cls) < 0 || styles[styles.length - 1] != cls) continue;

            if (styles.length != 1 && !cascadeSelector(style, parentClasses)) {
              continue breakFor;
            }

            calcStyle(node, styleSheet[style]);
          }
        }
      }

      if (!!node.nodes) {
        for (let i = 0; i < node.nodes.length; i++) {
          processNodeStyle(node.nodes[i], styleSheet, parentClasses);
        }
      }
    }

    function cascadeSelector(classStr, parentClasses) {
      /// <summary>级联选择器规则判断</summary>
      /// <param name="classStr" type="String">样式表达式</param>
      /// <param name="parentClasses" type="Array">标签样式层级数组</param>

      let lastClasses = parentClasses[parentClasses.length - 1];
      let parentMaybeList = cascadeSelectorMaybeList(parentClasses);
      let classList = classStr.replace(/[\.]/g, "").split(" ");
      for (let i = 0; i < classList.length; i++) {
        classList[i] = [classList[i]];
      }
      classList = cascadeSelectorMaybeList(classList);

      for (let i = 0; i < parentMaybeList.length; i++) {
        for (let n = 0; n < classList.length; n++) {
          let pm = parentMaybeList[i].split(" ");
          if (parentMaybeList[i] == classList[n]) {
            for (let k = 0; k < lastClasses.length; k++) {
              if ("." + lastClasses[k] == pm[pm.length - 1]) {
                return true;
              }
            }
          }
        }
      }

      return false;
    }

    function cascadeSelectorMaybeList(parentClasses) {
      /// <summary>级联选择器所有可能列表</summary>
      /// <param name="parentClasses" type="Array">标签样式层级数组</param>
      /// <returns type="Array">所有可能列表</returns>

      let list = [];

      for (let i = 0; i < parentClasses.length; i++) {
        let newList = [];
        for (let n = 0; n < parentClasses[i].length; n++) {
          if (i == 0) {
            newList.push("." + parentClasses[i][n]);
          } else {
            for (let k = 0; k < list.length; k++) {
              let preList = list[k];
              for (let j = 0; j < preList.length; j++) {
                newList.push(preList[j] + " ." + parentClasses[i][n]);
              }
            }
          }
        }
        list[list.length] = newList;
      }

      return Array.prototype.concat.apply([], list);
    }

    function calcStyle(node, style) {
      /// <summary>计算合成样式</summary>
      /// <param name="node" type="Object">标签节点</param>
      /// <param name="style" type="Object">样式对象</param>

      let styleStr = "";
      for (let i in style) {
        styleStr += `${i}:${style[i]};`;
      }
      node.styleStr = node.styleStr || "";
      node.styleStr += styleStr;
    }

  })(HTMLParser);

  function makeMap(str) {
    var obj = {}, items = str.split(",");
    for (var i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }

  function strDiscode(str) {
    /// <summary>转义</summary>
    /// <param name="str" type="String">转义前的HTML代码</param>
    /// <returns type="String">转义后的HTML代码</param>

    [/&forall;/g, '∀', /&part;/g, '∂', /&exists;/g, '∃', /&empty;/g, '∅', /&nabla;/g, '∇', /&isin;/g, '∈', /&notin;/g, '∉', /&ni;/g, '∋', /&prod;/g, '∏', /&sum;/g, '∑', /&minus;/g, '−', /&lowast;/g, '∗', /&radic;/g, '√', /&prop;/g, '∝', /&infin;/g, '∞', /&ang;/g, '∠', /&and;/g, '∧', /&or;/g, '∨', /&cap;/g, '∩', /&cap;/g, '∪', /&int;/g, '∫', /&there4;/g, '∴', /&sim;/g, '∼', /&cong;/g, '≅', /&asymp;/g, '≈', /&ne;/g, '≠', /&le;/g, '≤', /&ge;/g, '≥', /&sub;/g, '⊂', /&sup;/g, '⊃', /&nsub;/g, '⊄', /&sube;/g, '⊆', /&supe;/g, '⊇', /&oplus;/g, '⊕', /&otimes;/g, '⊗', /&perp;/g, '⊥', /&sdot;/g, '⋅', /&Alpha;/g, 'Α', /&Beta;/g, 'Β', /&Gamma;/g, 'Γ', /&Delta;/g, 'Δ', /&Epsilon;/g, 'Ε', /&Zeta;/g, 'Ζ', /&Eta;/g, 'Η', /&Theta;/g, 'Θ', /&Iota;/g, 'Ι', /&Kappa;/g, 'Κ', /&Lambda;/g, 'Λ', /&Mu;/g, 'Μ', /&Nu;/g, 'Ν', /&Xi;/g, 'Ν', /&Omicron;/g, 'Ο', /&Pi;/g, 'Π', /&Rho;/g, 'Ρ', /&Sigma;/g, 'Σ', /&Tau;/g, 'Τ', /&Upsilon;/g, 'Υ', /&Phi;/g, 'Φ', /&Chi;/g, 'Χ', /&Psi;/g, 'Ψ', /&Omega;/g, 'Ω', /&alpha;/g, 'α', /&beta;/g, 'β', /&gamma;/g, 'γ', /&delta;/g, 'δ', /&epsilon;/g, 'ε', /&zeta;/g, 'ζ', /&eta;/g, 'η', /&theta;/g, 'θ', /&iota;/g, 'ι', /&kappa;/g, 'κ', /&lambda;/g, 'λ', /&mu;/g, 'μ', /&nu;/g, 'ν', /&xi;/g, 'ξ', /&omicron;/g, 'ο', /&pi;/g, 'π', /&rho;/g, 'ρ', /&sigmaf;/g, 'ς', /&sigma;/g, 'σ', /&tau;/g, 'τ', /&upsilon;/g, 'υ', /&phi;/g, 'φ', /&chi;/g, 'χ', /&psi;/g, 'ψ', /&omega;/g, 'ω', /&thetasym;/g, 'ϑ', /&upsih;/g, 'ϒ', /&piv;/g, 'ϖ', /&middot;/g, '·', /&nbsp;/g, ' ', /&quot;/g, "'", /&amp;/g, '&', /&lt;/g, '<', /&gt;/g, '>', /&OElig;/g, 'Œ', /&oelig;/g, 'œ', /&Scaron;/g, 'Š', /&scaron;/g, 'š', /&Yuml;/g, 'Ÿ', /&fnof;/g, 'ƒ', /&circ;/g, 'ˆ', /&tilde;/g, '˜', /&ensp;/g, '', /&emsp;/g, '', /&thinsp;/g, '', /&zwnj;/g, '', /&zwj;/g, '', /&lrm;/g, '', /&rlm;/g, '', /&ndash;/g, '–', /&mdash;/g, '—', /&lsquo;/g, '‘', /&rsquo;/g, '’', /&sbquo;/g, '‚', /&ldquo;/g, '“', /&rdquo;/g, '”', /&bdquo;/g, '„', /&dagger;/g, '†', /&Dagger;/g, '‡', /&bull;/g, '•', /&hellip;/g, '…', /&permil;/g, '‰', /&prime;/g, '′', /&Prime;/g, '″', /&lsaquo;/g, '‹', /&rsaquo;/g, '›', /&oline;/g, '‾', /&euro;/g, '€', /&trade;/g, '™', /&larr;/g, '←', /&uarr;/g, '↑', /&rarr;/g, '→', /&darr;/g, '↓', /&harr;/g, '↔', /&crarr;/g, '↵', /&lceil;/g, '⌈', /&rceil;/g, '⌉', /&lfloor;/g, '⌊', /&rfloor;/g, '⌋', /&loz;/g, '◊', /&spades;/g, '♠', /&clubs;/g, '♣', /&hearts;/g, '♥', /&diams;/g, '♦', /&#39;/g, '\''].map(function (value, index, arr) {
      if (index % 2 == 1) return;
      str = str.replace(value, arr[index + 1]);
    });

    return str;
  }

  function urlToHttpUrl(url, srcUrl) {
    /// <summary>将相对路径转成绝对路径</summary>

    if (url.toLowerCase().indexOf("weapp://") === 0 || url[0] === "#") {
      return url;
    }
    let rep = srcUrl.split("://")[0];
    if (rep == "") rep = "https";
    var patt1 = new RegExp("^//");
    var result = patt1.test(url);
    if (result) {
      url = rep + ":" + url;
    } else if (url.indexOf("//") <= 0) {
      let list = srcUrl.replace(/\\/g, "\/").split("/");
      list[list.length - 1] = "";
      srcUrl = list.join("/");
      url = srcUrl + url;
    } else if (url.indexOf("://") <= 0) {
      url = rep + url;
    }
    return url;
  }

  module.exports = HTMLParser;
})();