(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.translator = factory());
})(this, (function () { 'use strict';

    var cryptoHandle = crypto || {
      getRandomValues: function getRandomValues() {
        return [0];
      },
      randomUUID: function randomUUID() {
        return '00000000-0000-0000-0000-000000000000';
      }
    };

    const SupportedLanguage = (List, language) => {
        return List.map((x) => x.toLowerCase()).includes(language.toLowerCase());
    };
    const generateUUID = () => cryptoHandle.randomUUID() || '00000000-0000-0000-0000-000000000000';

    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c),
          u = i.value;
      } catch (n) {
        return void e(n);
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
      return function () {
        var t = this,
          e = arguments;
        return new Promise(function (r, o) {
          var a = n.apply(t, e);
          function _next(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
          }
          function _throw(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
          }
          _next(void 0);
        });
      };
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
        writable: false
      }), e;
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _regeneratorRuntime() {
      _regeneratorRuntime = function () {
        return r;
      };
      var t,
        r = {},
        e = Object.prototype,
        n = e.hasOwnProperty,
        o = "function" == typeof Symbol ? Symbol : {},
        i = o.iterator || "@@iterator",
        a = o.asyncIterator || "@@asyncIterator",
        u = o.toStringTag || "@@toStringTag";
      function c(t, r, e, n) {
        return Object.defineProperty(t, r, {
          value: e,
          enumerable: !n,
          configurable: !n,
          writable: !n
        });
      }
      try {
        c({}, "");
      } catch (t) {
        c = function (t, r, e) {
          return t[r] = e;
        };
      }
      function h(r, e, n, o) {
        var i = e && e.prototype instanceof Generator ? e : Generator,
          a = Object.create(i.prototype);
        return c(a, "_invoke", function (r, e, n) {
          var o = 1;
          return function (i, a) {
            if (3 === o) throw Error("Generator is already running");
            if (4 === o) {
              if ("throw" === i) throw a;
              return {
                value: t,
                done: true
              };
            }
            for (n.method = i, n.arg = a;;) {
              var u = n.delegate;
              if (u) {
                var c = d(u, n);
                if (c) {
                  if (c === f) continue;
                  return c;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
                if (1 === o) throw o = 4, n.arg;
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              o = 3;
              var h = s(r, e, n);
              if ("normal" === h.type) {
                if (o = n.done ? 4 : 2, h.arg === f) continue;
                return {
                  value: h.arg,
                  done: n.done
                };
              }
              "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg);
            }
          };
        }(r, n, new Context(o || [])), true), a;
      }
      function s(t, r, e) {
        try {
          return {
            type: "normal",
            arg: t.call(r, e)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }
      r.wrap = h;
      var f = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var l = {};
      c(l, i, function () {
        return this;
      });
      var p = Object.getPrototypeOf,
        y = p && p(p(x([])));
      y && y !== e && n.call(y, i) && (l = y);
      var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l);
      function g(t) {
        ["next", "throw", "return"].forEach(function (r) {
          c(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }
      function AsyncIterator(t, r) {
        function e(o, i, a, u) {
          var c = s(t[o], t, i);
          if ("throw" !== c.type) {
            var h = c.arg,
              f = h.value;
            return f && "object" == typeof f && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) {
              e("next", t, a, u);
            }, function (t) {
              e("throw", t, a, u);
            }) : r.resolve(f).then(function (t) {
              h.value = t, a(h);
            }, function (t) {
              return e("throw", t, a, u);
            });
          }
          u(c.arg);
        }
        var o;
        c(this, "_invoke", function (t, n) {
          function i() {
            return new r(function (r, o) {
              e(t, n, r, o);
            });
          }
          return o = o ? o.then(i, i) : i();
        }, true);
      }
      function d(r, e) {
        var n = e.method,
          o = r.i[n];
        if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
        var i = s(o, r.i, e.arg);
        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f;
        var a = i.arg;
        return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
      }
      function w(t) {
        this.tryEntries.push(t);
      }
      function m(r) {
        var e = r[4] || {};
        e.type = "normal", e.arg = t, r[4] = e;
      }
      function Context(t) {
        this.tryEntries = [[-1]], t.forEach(w, this), this.reset(true);
      }
      function x(r) {
        if (null != r) {
          var e = r[i];
          if (e) return e.call(r);
          if ("function" == typeof r.next) return r;
          if (!isNaN(r.length)) {
            var o = -1,
              a = function e() {
                for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = false, e;
                return e.value = t, e.done = true, e;
              };
            return a.next = a;
          }
        }
        throw new TypeError(typeof r + " is not iterable");
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) {
        var r = "function" == typeof t && t.constructor;
        return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
      }, r.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t;
      }, r.awrap = function (t) {
        return {
          __await: t
        };
      }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () {
        return this;
      }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new AsyncIterator(h(t, e, n, o), i);
        return r.isGeneratorFunction(e) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, g(v), c(v, u, "Generator"), c(v, i, function () {
        return this;
      }), c(v, "toString", function () {
        return "[object Generator]";
      }), r.keys = function (t) {
        var r = Object(t),
          e = [];
        for (var n in r) e.unshift(n);
        return function t() {
          for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = false, t;
          return t.done = true, t;
        };
      }, r.values = x, Context.prototype = {
        constructor: Context,
        reset: function (r) {
          if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
        },
        stop: function () {
          this.done = true;
          var t = this.tryEntries[0][4];
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (r) {
          if (this.done) throw r;
          var e = this;
          function n(t) {
            a.type = "throw", a.arg = r, e.next = t;
          }
          for (var o = e.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
              a = i[4],
              u = this.prev,
              c = i[1],
              h = i[2];
            if (-1 === i[0]) return n("end"), false;
            if (!c && !h) throw Error("try statement without catch or finally");
            if (null != i[0] && i[0] <= u) {
              if (u < c) return this.method = "next", this.arg = t, n(c), true;
              if (u < h) return n(h), false;
            }
          }
        },
        abrupt: function (t, r) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var n = this.tryEntries[e];
            if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
              var o = n;
              break;
            }
          }
          o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
          var i = o ? o[4] : {};
          return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i);
        },
        complete: function (t, r) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f;
        },
        finish: function (t) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var e = this.tryEntries[r];
            if (e[2] === t) return this.complete(e[4], e[3]), m(e), f;
          }
        },
        catch: function (t) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var e = this.tryEntries[r];
            if (e[0] === t) {
              var n = e[4];
              if ("throw" === n.type) {
                var o = n.arg;
                m(e);
              }
              return o;
            }
          }
          throw Error("illegal catch attempt");
        },
        delegateYield: function (r, e, n) {
          return this.delegate = {
            i: x(r),
            r: e,
            n: n
          }, "next" === this.method && (this.arg = t), f;
        }
      }, r;
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r);
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (String )(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }
    function _typeof(o) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
        return typeof o;
      } : function (o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
      }, _typeof(o);
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }

    var AxiosRequest = function () {
      function AxiosRequest() {
        _classCallCheck(this, AxiosRequest);
      }
      return _createClass(AxiosRequest, [{
        key: "requestHandle",
        value: function requestHandle(url, postData) {
          var _this = this;
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (!options.timeout) {
            options.timeout = 30000;
          }
          var validPostRequest = ((options === null || options === void 0 ? void 0 : options.method) || '').toLowerCase() === 'post' && postData;
          if (!options.headers) {
            options.headers = {};
          }
          var isFormData = postData instanceof FormData;
          if (validPostRequest && !isFormData) {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
            if (_typeof(postData) === 'object') {
              postData = JSON.stringify(postData);
              options.headers['content-type'] = 'application/json';
            }
            options.headers['content-length'] = postData.length;
            options.body = postData;
          }
          return new Promise(function (resolve, reject) {
            if (typeof fetch === 'function') {
              fetch(url, options).then(function () {
                var _ref = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(response) {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = response;
                        _context.next = 3;
                        return response.arrayBuffer();
                      case 3:
                        _context.t1 = _context.sent;
                        return _context.abrupt("return", {
                          response: _context.t0,
                          data: _context.t1
                        });
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()).then(function (res) {
                resolve(_this.responseBuilder(res.response, res.data, options));
              })["catch"](function (e) {
                reject({
                  cause: e,
                  toString: function toString() {
                    return e.toString();
                  }
                });
              });
            } else {
              reject({
                cause: 'NOT SUPPORT fetch OR XMLHttpRequest',
                toString: 'NOT SUPPORT fetch OR XMLHttpRequest'
              });
            }
          });
        }
      }, {
        key: "isJson",
        value: function isJson(str) {
          try {
            JSON.parse(str);
            return true;
          } catch (e) {
            return false;
          }
        }
      }, {
        key: "responseBuilder",
        value: function responseBuilder(res, data) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          switch (options === null || options === void 0 ? void 0 : options.responseType) {
            case 'arraybuffer':
              break;
            default:
              data = new TextDecoder().decode(data);
              if (this.isJson(data)) {
                data = JSON.parse(data);
              }
          }
          var headers = Object.fromEntries(res.headers.entries());
          if (headers['set-cookie'] && res.headers.getSetCookie) {
            headers['set-cookie'] = res.headers.getSetCookie();
          } else if (headers['set-cookie'] && res.headers.getAll) {
            headers['set-cookie'] = res.headers.getAll('set-cookie');
          } else if (headers['set-cookie']) {
            headers['set-cookie'] = _toConsumableArray(res.headers.entries()).filter(function (header) {
              return header[0] === 'set-cookie';
            }).map(function (header) {
              return header[1];
            });
          }
          return {
            status: res.status,
            statusText: res.statusText,
            headers: headers,
            data: data
          };
        }
      }, {
        key: "get",
        value: function get(url) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          options.method = 'GET';
          return this.requestHandle(url, null, options);
        }
      }, {
        key: "post",
        value: function post(url) {
          var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          options.method = 'POST';
          return this.requestHandle(url, data, options);
        }
      }]);
    }();
    var axiosFetch = new AxiosRequest();

    const GOOGLE_LANGUAGE = ['aa', 'ab', 'ace', 'ach', 'af', 'ak', 'alz', 'am', 'ar', 'as', 'av', 'awa', 'ay', 'az', 'ba', 'bal', 'ban', 'bbc', 'bci', 'be', 'bem', 'ber', 'ber-latn', 'bew', 'bg', 'bho', 'bik', 'bm', 'bm-nkoo', 'bn', 'bo', 'br', 'bs', 'bts', 'btx', 'bua', 'ca', 'ce', 'ceb', 'cgg', 'ch', 'chk', 'chm', 'ckb', 'cnh', 'co', 'crh', 'crs', 'cs', 'cv', 'cy', 'da', 'de', 'din', 'doi', 'dov', 'dv', 'dyu', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fa-af', 'ff', 'fi', 'fj', 'fo', 'fon', 'fr', 'fur', 'fy', 'ga', 'gaa', 'gd', 'gl', 'gn', 'gom', 'gu', 'gv', 'ha', 'haw', 'hi', 'hil', 'hmn', 'hr', 'hrx', 'ht', 'hu', 'hy', 'iba', 'id', 'ig', 'ilo', 'is', 'it', 'iw', 'ja', 'jam', 'jw', 'ka', 'kac', 'kek', 'kg', 'kha', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'kri', 'ktu', 'ku', 'kv', 'ky', 'la', 'lb', 'lg', 'li', 'lij', 'lmo', 'ln', 'lo', 'lt', 'ltg', 'luo', 'lus', 'lv', 'mad', 'mai', 'mak', 'mam', 'mfe', 'mg', 'mh', 'mi', 'min', 'mk', 'ml', 'mn', 'mni-mtei', 'mr', 'ms', 'ms-arab', 'mt', 'mwr', 'my', 'ndc-zw', 'ne', 'new', 'nhe', 'nl', 'no', 'nr', 'nso', 'nus', 'ny', 'oc', 'om', 'or', 'os', 'pa', 'pa-arab', 'pag', 'pam', 'pap', 'pl', 'ps', 'pt', 'pt-pt', 'qu', 'rn', 'ro', 'rom', 'ru', 'rw', 'sa', 'sah', 'sat-latn', 'scn', 'sd', 'se', 'sg', 'shn', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sus', 'sv', 'sw', 'szl', 'ta', 'tcy', 'te', 'tet', 'tg', 'th', 'ti', 'tiv', 'tk', 'tl', 'tn', 'to', 'tpi', 'tr', 'trp', 'ts', 'tt', 'tum', 'ty', 'tyv', 'udm', 'ug', 'uk', 'ur', 'uz', 've', 'vec', 'vi', 'war', 'wo', 'xh', 'yi', 'yo', 'yua', 'yue', 'zap', 'zh-cn', 'zh-tw', 'zu'];
    const BING_LANGUAGE = ['af', 'am', 'ar', 'as', 'az', 'ba', 'bg', 'bho', 'bn', 'bo', 'brx', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'doi', 'dsb', 'dv', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fil', 'fj', 'fo', 'fr', 'fr-ca', 'ga', 'gl', 'gom', 'gu', 'ha', 'he', 'hi', 'hr', 'hsb', 'ht', 'hu', 'hy', 'id', 'ig', 'ikt', 'is', 'it', 'iu', 'iu-latn', 'ja', 'ka', 'kk', 'km', 'kmr', 'kn', 'ko', 'ks', 'ku', 'ky', 'ln', 'lo', 'lt', 'lug', 'lv', 'lzh', 'mai', 'mg', 'mi', 'mk', 'ml', 'mn-cyrl', 'mn-mong', 'mr', 'ms', 'mt', 'mww', 'my', 'nb', 'ne', 'nl', 'nso', 'nya', 'or', 'otq', 'pa', 'pl', 'prs', 'ps', 'pt', 'pt-pt', 'ro', 'ru', 'run', 'rw', 'sd', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr-cyrl', 'sr-latn', 'st', 'sv', 'sw', 'ta', 'te', 'th', 'ti', 'tk', 'tlh-latn', 'tn', 'to', 'tr', 'tt', 'ty', 'ug', 'uk', 'ur', 'uz', 'vi', 'xh', 'yo', 'yua', 'yue', 'zh-hans', 'zh-hant', 'zu'];
    const YANDEX_LANGUAGE = ['af', 'am', 'ar', 'az', 'ba', 'be', 'bg', 'bn', 'bs', 'ca', 'ceb', 'cs', 'cv', 'cy', 'da', 'de', 'el', 'emj', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'ga', 'gd', 'gl', 'gu', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'jv', 'ka', 'kazlat', 'kk', 'km', 'kn', 'ko', 'ky', 'la', 'lb', 'lo', 'lt', 'lv', 'mg', 'mhr', 'mi', 'mk', 'ml', 'mn', 'mr', 'mrj', 'ms', 'mt', 'my', 'ne', 'nl', 'no', 'pa', 'pap', 'pl', 'pt', 'ro', 'ru', 'sah', 'si', 'sjn', 'sk', 'sl', 'sq', 'sr', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'tl', 'tr', 'tt', 'udm', 'uk', 'ur', 'uz', 'uzbcyr', 'vi', 'xh', 'yi', 'zh', 'zu'];
    const SOGOU_LANGUAGE = ['ar', 'pl', 'da', 'de', 'ru', 'fr', 'fi', 'ko', 'nl', 'cs', 'pt', 'ja', 'sv', 'th', 'tr', 'es', 'hu', 'en', 'it', 'vi', 'zh-CHS'];

    //from yandex browser
    const generateSid = () => generateUUID().replaceAll('-', '');
    const YandexDetect = async (text = '') => {
        if (!text) {
            return '_';
        }
        if (Array.isArray(text)) {
            text = text.join('\n');
        }
        try {
            const languageResult = await axiosFetch.get('https://translate.yandex.net/api/v1/tr.json/detect?' +
                new URLSearchParams({
                    sid: generateSid(),
                    srv: 'android', // or 'ios'
                    text
                    //hint: 'en,zh'
                }).toString());
            if (languageResult.data?.code === 200 && languageResult.data?.lang) {
                return languageResult.data?.lang || '_';
            }
            else {
                return '_';
            }
        }
        catch (e) {
            return '_';
        }
    };
    const YandexBrowserTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
        if (!text) {
            return Promise.reject('Empty text #YandexTranslator ');
        }
        if (!SupportedLanguage(YANDEX_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(YANDEX_LANGUAGE, source || 'en'))) {
            return Promise.reject('Unsupported target language #YandexTranslator ');
        }
        const lang = source === 'auto' ? await YandexDetect((Array.isArray(text) ? text.join(' ') : text).replaceAll(/<a id=\d><><\/a>/gm, '')) : source;
        if (lang === '_') {
            return Promise.reject('Unsupported source language #YandexTranslator ');
        }
        let query = new URLSearchParams({
            translateMode: 'context',
            context_title: 'Twitter Monitor Translator',
            id: `${generateSid()}-0-0`,
            srv: 'yabrowser',
            lang: `${lang}-${target}`,
            format: 'html',
            options: '2'
        });
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .get('https://browser.translate.yandex.net/api/v1/tr.json/translate?' + query.toString() + '&text=' + (text instanceof Array ? text.map((x) => encodeURIComponent(x)).join('&text=') : encodeURIComponent(text)))
                .then((response) => {
                if (response?.data?.text && response?.data?.text instanceof Array) {
                    resolve(raw ? response.data : response.data.text.join('\n'));
                }
                reject(raw ? response.data : 'Invalid content #YandexTranslator ');
            })
                .catch((e) => {
                reject(raw ? e : e.toString());
            });
        });
    };

    const GoogleBrowserTranslate = async (text = '', source = 'auto', target, raw, ext = {}) => {
        if (!text) {
            return Promise.reject('Empty text #GoogleTranslate ');
        }
        if (!SupportedLanguage(GOOGLE_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(GOOGLE_LANGUAGE, source || 'en'))) {
            return Promise.reject('Unsupported target language #GoogleTranslate ');
        }
        //curl 'https://translate.googleapis.com/translate_a/t?anno=3&client=wt_lib&format=html&v=1.0&key&sl=auto&tl=zh&tc=1&sr=1&tk=164775.366094&mode=1' --data-raw 'q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF' --compressed
        //https://vielhuber.de/zh-cn/blog-zh-cn/google-translation-api-hacking/
        let query = new URLSearchParams({
            anno: '4',
            client: 'te_lib',
            format: 'html',
            v: '1.0',
            key: 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw',
            sl: source,
            tl: target || 'en',
            tc: '1',
            sr: '1',
            tk: GoogleTranslateTk(text),
            mode: '1'
        });
        //let formData = new URLSearchParams({q: text})
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .post('https://translate.googleapis.com/translate_a/t?' + query.toString(), 'q=' + (text instanceof Array ? text.map((x) => encodeURIComponent(x)).join('&q=') : encodeURIComponent(text)))
                .then((response) => {
                if (response.data && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x) => (Array.isArray(x) ? x?.[0] || '' : x || '')).join('\n'));
                }
                reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
            })
                .catch((e) => {
                reject(raw ? e : e.toString());
            });
        });
    };
    const GoogleBrowserTranslateV2 = async (text = '', source = 'en', target, raw, ext = {}) => {
        if (!text) {
            return Promise.reject('Empty text #GoogleTranslate ');
        }
        if (source === 'auto' || !SupportedLanguage(GOOGLE_LANGUAGE, target || 'en') || !SupportedLanguage(GOOGLE_LANGUAGE, source || 'en')) {
            return Promise.reject('Unsupported target language #GoogleTranslate ');
        }
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw', {
                q: Array.isArray(text) ? text.join('\n') : text,
                source,
                target,
                format: 'text'
            })
                .then((response) => {
                if (response.data && response.data?.data?.translations instanceof Array) {
                    resolve(raw ? response.data : response.data.data.translations.map((x) => x?.translatedText || '').join('\n'));
                }
                reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
            })
                .catch((e) => {
                reject(raw ? e : e.toString());
            });
        });
    };
    const hl = function (a, b) {
        let c = 0;
        for (; c < b.length - 2; c += 3) {
            let d = b.charAt(c + 2);
            d = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d);
            d = '+' == b.charAt(c + 1) ? a >>> d : a << d;
            a = '+' == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
        }
        return a;
    };
    const getCharCodeList = function (text) {
        let charCodeList = [], charCodeListIndex = 0;
        for (let index = 0; index < text.length; index++) {
            let charCode = text.charCodeAt(index);
            if (128 > charCode) {
                charCodeList[charCodeListIndex++] = charCode;
            }
            else {
                if (2048 > charCode) {
                    charCodeList[charCodeListIndex++] = (charCode >> 6) | 192;
                }
                else {
                    if (55296 == (charCode & 64512) && index + 1 < text.length && 56320 == (text.charCodeAt(index + 1) & 64512)) {
                        charCode = 65536 + ((charCode & 1023) << 10) + (text.charCodeAt(++index) & 1023);
                        charCodeList[charCodeListIndex++] = (charCode >> 18) | 240;
                        charCodeList[charCodeListIndex++] = ((charCode >> 12) & 63) | 128;
                    }
                    else {
                        charCodeList[charCodeListIndex++] = (charCode >> 12) | 224;
                    }
                    charCodeList[charCodeListIndex++] = ((charCode >> 6) & 63) | 128;
                }
                charCodeList[charCodeListIndex++] = (charCode & 63) | 128;
            }
        }
        return charCodeList;
    };
    //https://translate.google.com/translate_a/element?cb=gtElInit&hl=zh-CN&client=wt c._ctkk
    const GoogleTranslateTk = (originalText = '', tkk = [464385, 3806605782]) => {
        //from https://translate.googleapis.com/_/translate_http/_/js/k=translate_http.tr.zh_CN.D7QeyoDkDhY.O/d=1/exm=el_conf/ed=1/rs=AN8SPfq20C5s1IToiD2r2PKoyh-SRQysPA/m=el_main
        let text;
        if (originalText instanceof Array) {
            text = JSON.parse(JSON.stringify(originalText)).join('');
        }
        else {
            text = originalText;
        }
        const charCodeList = getCharCodeList(text);
        let a = tkk[0];
        for (const charCode of charCodeList) {
            a += charCode;
            a = hl(a, '+-a^+6');
        }
        a = hl(a, '+-3^+b+-f');
        a ^= tkk[1] ? tkk[1] + 0 : 0;
        if (a < 0) {
            a = (a & 2147483647) + 2147483648;
        }
        a %= 1e6;
        return a.toString() + '.' + (a ^ tkk[0]);
    };

    const GetMicrosoftBrowserTranslatorAuth = async () => {
        try {
            return (await axiosFetch.get('https://edge.microsoft.com/translate/auth')).data;
        }
        catch (e) {
            return '';
        }
    };
    const MicrosoftBrowserTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
        if (!text) {
            return Promise.reject('Empty text #MicrosoftTranslator ');
        }
        if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
            return Promise.reject('Unsupported target language #MicrosoftTranslator ');
        }
        //get jwt
        let jwt = '';
        if (ext.jwt && typeof ext.jwt === 'string') {
            jwt = ext.jwt;
        }
        else {
            jwt = await GetMicrosoftBrowserTranslatorAuth();
        }
        if (jwt) {
            return new Promise(async (resolve, reject) => {
                axiosFetch
                    .post(`https://api.cognitive.microsofttranslator.com/translate?from=${source === 'auto' ? '' : source}&to=${target}&api-version=3.0&includeSentenceLength=true`, text instanceof Array ? text.map((tmpText) => ({ Text: tmpText })) : [{ Text: text }], {
                    headers: {
                        authorization: `Bearer ${jwt}`
                    }
                })
                    .then((response) => {
                    if (response.data && response.data instanceof Array) {
                        resolve(raw ? response.data : response.data.map((x) => (x?.translations || [])?.[0]?.text || '').join('\n'));
                    }
                    reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ');
                })
                    .catch((e) => {
                    reject(raw ? e : e.toString());
                });
            });
        }
        else {
            return Promise.reject('Invalid jwt #MicrosoftTranslator ');
        }
    };
    const MicrosoftBrowserTranslatorV2 = async (text = '', source = 'auto', target, raw, ext = {}) => {
        if (!text) {
            return Promise.reject('Empty text #MicrosoftTranslatorV2 ');
        }
        if (!SupportedLanguage(BING_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(BING_LANGUAGE, source || 'en'))) {
            return Promise.reject('Unsupported target language #MicrosoftTranslatorV2 ');
        }
        return new Promise(async (resolve, reject) => {
            axiosFetch
                .post(`https://edge.microsoft.com/translate/translatetext?from=${source === 'auto' ? '' : source}&to=${target}`, text instanceof Array ? text : [text])
                .then((response) => {
                if (response.data && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x) => (x?.translations || [])?.[0]?.text || '').join('\n'));
                }
                reject(raw ? response.data : 'Invalid content #MicrosoftTranslatorV2 ');
            })
                .catch((e) => {
                reject(raw ? e : e.toString());
            });
        });
    };

    const SogouBrowserTranslator = async (text = '', source = 'auto', target, raw, ext = {}) => {
        if (!text) {
            return Promise.reject('Empty text #SogouTranslator ');
        }
        if (!SupportedLanguage(SOGOU_LANGUAGE, target || 'en') || (source !== 'auto' && !SupportedLanguage(SOGOU_LANGUAGE, source || 'en'))) {
            return Promise.reject('Unsupported target language #SogouTranslator ');
        }
        let body = JSON.stringify({
            from_lang: source,
            to_lang: target,
            trans_frag: text instanceof Array ? text.map((x) => ({ text: x })) : [{ text }]
        });
        return new Promise(async (resolve, reject) => {
            const _body = new FormData();
            _body.append('S-Param', body);
            axiosFetch
                .post('https://go.ie.sogou.com/qbpc/translate', _body)
                .then((response) => {
                if (response?.data?.data?.trans_result && response?.data?.data?.trans_result instanceof Array) {
                    resolve(raw ? response.data : response.data.data.trans_result.map((x) => x.trans_text).join('\n') || '');
                }
                reject(raw ? response.data : 'Invalid content #SogouTranslator ');
            })
                .catch((e) => {
                reject(raw ? e : e.toString());
            });
        });
    };

    const Translator = async (text = '', platform, source, target, raw, ext = {}) => {
        let result = { content: '', message: '' };
        try {
            switch (platform) {
                case 'google':
                case 'google_browser':
                    result.content = await GoogleBrowserTranslate(text, source, target, !!raw, ext);
                    break;
                case 'google_browser_v2':
                    result.content = await GoogleBrowserTranslateV2(text, source, target, !!raw, ext);
                    break;
                case 'microsoft':
                case 'microsoft_browser':
                    result.content = await MicrosoftBrowserTranslator(text, source, target, !!raw, ext);
                    break;
                case 'microsoft_browser_v2':
                    result.content = await MicrosoftBrowserTranslatorV2(text, source, target, !!raw, ext);
                    break;
                case 'sogou':
                case 'sogou_browser':
                    result.content = await SogouBrowserTranslator(text, source, target, !!raw, ext);
                    break;
                case 'yandex':
                case 'yandex_browser':
                    result.content = await YandexBrowserTranslator(text, source, target, !!raw, ext);
                    break;
            }
        }
        catch (e) {
            result.message = String(e);
        }
        return result;
    };

    return Translator;

}));
//# sourceMappingURL=translator.js.map
