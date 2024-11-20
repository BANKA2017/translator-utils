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
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
        writable: !1
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
        return e;
      };
      var t,
        e = {},
        r = Object.prototype,
        n = r.hasOwnProperty,
        o = Object.defineProperty || function (t, e, r) {
          t[e] = r.value;
        },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        c = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
      function define(t, e, r) {
        return Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), t[e];
      }
      try {
        define({}, "");
      } catch (t) {
        define = function (t, e, r) {
          return t[e] = r;
        };
      }
      function wrap(t, e, r, n) {
        var i = e && e.prototype instanceof Generator ? e : Generator,
          a = Object.create(i.prototype),
          c = new Context(n || []);
        return o(a, "_invoke", {
          value: makeInvokeMethod(t, r, c)
        }), a;
      }
      function tryCatch(t, e, r) {
        try {
          return {
            type: "normal",
            arg: t.call(e, r)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }
      e.wrap = wrap;
      var h = "suspendedStart",
        l = "suspendedYield",
        f = "executing",
        s = "completed",
        y = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var p = {};
      define(p, a, function () {
        return this;
      });
      var d = Object.getPrototypeOf,
        v = d && d(d(values([])));
      v && v !== r && n.call(v, a) && (p = v);
      var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
      function defineIteratorMethods(t) {
        ["next", "throw", "return"].forEach(function (e) {
          define(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function AsyncIterator(t, e) {
        function invoke(r, o, i, a) {
          var c = tryCatch(t[r], t, o);
          if ("throw" !== c.type) {
            var u = c.arg,
              h = u.value;
            return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
              invoke("next", t, i, a);
            }, function (t) {
              invoke("throw", t, i, a);
            }) : e.resolve(h).then(function (t) {
              u.value = t, i(u);
            }, function (t) {
              return invoke("throw", t, i, a);
            });
          }
          a(c.arg);
        }
        var r;
        o(this, "_invoke", {
          value: function (t, n) {
            function callInvokeWithMethodAndArg() {
              return new e(function (e, r) {
                invoke(t, n, e, r);
              });
            }
            return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(e, r, n) {
        var o = h;
        return function (i, a) {
          if (o === f) throw Error("Generator is already running");
          if (o === s) {
            if ("throw" === i) throw a;
            return {
              value: t,
              done: !0
            };
          }
          for (n.method = i, n.arg = a;;) {
            var c = n.delegate;
            if (c) {
              var u = maybeInvokeDelegate(c, n);
              if (u) {
                if (u === y) continue;
                return u;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
              if (o === h) throw o = s, n.arg;
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = f;
            var p = tryCatch(e, r, n);
            if ("normal" === p.type) {
              if (o = n.done ? s : l, p.arg === y) continue;
              return {
                value: p.arg,
                done: n.done
              };
            }
            "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
          }
        };
      }
      function maybeInvokeDelegate(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
        var i = tryCatch(o, e.iterator, r.arg);
        if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
        var a = i.arg;
        return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
      }
      function pushTryEntry(t) {
        var e = {
          tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }
      function resetTryEntry(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }
      function Context(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(pushTryEntry, this), this.reset(!0);
      }
      function values(e) {
        if (e || "" === e) {
          var r = e[a];
          if (r) return r.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var o = -1,
              i = function next() {
                for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
                return next.value = t, next.done = !0, next;
              };
            return i.next = i;
          }
        }
        throw new TypeError(typeof e + " is not iterable");
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
      }), o(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
      }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
      }, e.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
      }, e.awrap = function (t) {
        return {
          __await: t
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
        return this;
      }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new AsyncIterator(wrap(t, r, n, o), i);
        return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
        return this;
      }), define(g, "toString", function () {
        return "[object Generator]";
      }), e.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) r.push(n);
        return r.reverse(), function next() {
          for (; r.length;) {
            var t = r.pop();
            if (t in e) return next.value = t, next.done = !1, next;
          }
          return next.done = !0, next;
        };
      }, e.values = values, Context.prototype = {
        constructor: Context,
        reset: function (e) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (e) {
          if (this.done) throw e;
          var r = this;
          function handle(n, o) {
            return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
          }
          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
              a = i.completion;
            if ("root" === i.tryLoc) return handle("end");
            if (i.tryLoc <= this.prev) {
              var c = n.call(i, "catchLoc"),
                u = n.call(i, "finallyLoc");
              if (c && u) {
                if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              } else {
                if (!u) throw Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var o = this.tryEntries[r];
            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
              var i = o;
              break;
            }
          }
          i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
          var a = i ? i.completion : {};
          return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var o = n.arg;
                resetTryEntry(r);
              }
              return o;
            }
          }
          throw Error("illegal catch attempt");
        },
        delegateYield: function (e, r, n) {
          return this.delegate = {
            iterator: values(e),
            resultName: r,
            nextLoc: n
          }, "next" === this.method && (this.arg = t), y;
        }
      }, e;
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
          var _options$headers,
            _this = this;
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (!options.timeout) {
            options.timeout = 30000;
          }
          var validPostRequest = ((options === null || options === void 0 ? void 0 : options.method) || '').toLowerCase() === 'post' && postData;
          if (!options.headers) {
            options.headers = {};
          }
          if (!((_options$headers = options.headers) !== null && _options$headers !== void 0 && _options$headers['content-type'])) {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
          }
          if (validPostRequest) {
            if (_typeof(postData) === 'object') {
              postData = JSON.stringify(postData);
              options.headers['content-type'] = 'application/json';
            }
            options.headers['content-length'] = postData.length;
            options.body = postData;
          }
          (options === null || options === void 0 ? void 0 : options.method) || 'GET';
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
                    .post(`https://api.cognitive.microsofttranslator.com/translate?from=${source === 'auto' ? '' : source}&to=${target}&api-version=3.0&includeSentenceLength=true`, JSON.stringify(text instanceof Array ? text.map((tmpText) => ({ Text: tmpText })) : [{ Text: text }]), {
                    headers: {
                        'content-type': 'application/json',
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
            axiosFetch
                .post('https://go.ie.sogou.com/qbpc/translate', `S-Param=${body}`)
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
