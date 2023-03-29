(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.translator = factory());
})(this, (function () { 'use strict';

    const BAIDU_LANGUAGE = ["zh", "jp", "jpka", "th", "fra", "en", "spa", "kor", "tr", "vie", "ms", "de", "ru", "ir", "ara", "est", "be", "bul", "hi", "is", "pl", "fa", "dan", "tl", "fin", "nl", "ca", "cs", "hr", "lv", "lt", "rom", "af", "no", "pt_br", "pt", "swe", "sr", "eo", "sk", "slo", "sw", "uk", "iw", "el", "hu", "hy", "it", "id", "sq", "am", "as", "az", "eu", "bn", "bs", "gl", "ka", "gu", "ha", "ig", "iu", "ga", "zu", "kn", "kk", "ky", "lb", "mk", "mt", "mi", "mr", "ne", "or", "pa", "qu", "tn", "si", "ta", "tt", "te", "ur", "uz", "cy", "yo", "yue", "wyw", "cht"];
    const GOOGLE_LANGUAGE = ["sq", "ar", "am", "as", "az", "ee", "ay", "ga", "et", "or", "om", "eu", "be", "bm", "bg", "is", "pl", "bs", "fa", "bho", "af", "tt", "da", "de", "dv", "ti", "doi", "ru", "fr", "sa", "tl", "fi", "fy", "km", "ka", "gom", "gu", "gn", "kk", "ht", "ko", "ha", "nl", "ky", "gl", "ca", "cs", "kn", "co", "kri", "hr", "qu", "ku", "ckb", "la", "lv", "lo", "lt", "ln", "lg", "lb", "rw", "ro", "mg", "mt", "mr", "ml", "ms", "mk", "mai", "mi", "mni-mtei", "mn", "bn", "lus", "my", "hmn", "xh", "zu", "ne", "no", "pa", "pt", "ps", "ny", "ak", "ja", "sv", "sm", "sr", "nso", "st", "si", "eo", "sk", "sl", "sw", "gd", "ceb", "so", "tg", "te", "ta", "th", "tr", "tk", "cy", "ug", "ur", "uk", "uz", "es", "iw", "el", "haw", "sd", "hu", "sn", "hy", "ig", "ilo", "it", "yi", "hi", "su", "id", "jw", "en", "yo", "vi", "zh-tw", "zh-cn", "ts"];
    const DEEPL_LANGUAGE = ["en", "en-us", "en-gb", "de", "fr", "es", "it", "nl", "pl", "ru", "pt", "pt-pt", "pt-br", "ja", "zh", "bg", "cs", "da", "et", "fi", "el", "hu", "id", "lv", "lt", "ro", "sk", "sl", "sv", "uk", "tr", "ko", "nb"];
    const BING_LANGUAGE = ["lzh", "ikt", "iu-latn", "mn-cyrl", "mn-mong", "hsb", "zh-hans", "zh-hant", "da", "uk", "uz", "ur", "nb", "hy", "ru", "bg", "tlh-latn", "hr", "otq", "is", "gl", "ca", "hu", "af", "kn", "hi", "id", "gu", "kk", "iu", "tk", "tr", "ty", "sr-latn", "sr-cyrl", "or", "cy", "bn", "yua", "ne", "ba", "eu", "he", "el", "ku", "kmr", "de", "it", "lv", "cs", "ti", "fj", "sk", "sl", "sw", "pa", "ja", "ps", "ky", "ka", "mi", "to", "fo", "fr", "fr-ca", "pl", "bs", "fa", "te", "ta", "th", "ht", "ga", "et", "sv", "zu", "lt", "yue", "so", "ug", "my", "ro", "lo", "fi", "mww", "en", "nl", "fil", "sm", "pt", "pt-pt", "bo", "es", "vi", "prs", "dv", "az", "am", "sq", "ar", "as", "tt", "ko", "mk", "mg", "mr", "ml", "ms", "mt", "km"];
    const SOGOU_LANGUAGE = ["ar", "pl", "da", "de", "ru", "fr", "fi", "ko", "nl", "cs", "pt", "ja", "sv", "th", "tr", "es", "hu", "en", "it", "vi", "zh-CHS"];
    const YANDEX_LANGUAGE = ["af", "sq", "am", "ar", "hy", "az", "ba", "eu", "be", "bn", "bs", "bg", "my", "ca", "ceb", "zh", "cv", "hr", "cs", "da", "nl", "sjn", "emj", "en", "eo", "et", "fi", "fr", "gl", "ka", "de", "el", "gu", "ht", "he", "mrj", "hi", "hu", "is", "id", "ga", "it", "ja", "jv", "kn", "kk", "kazlat", "km", "ko", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mhr", "mn", "ne", "no", "pap", "fa", "pl", "pt", "pt-br", "pa", "ro", "ru", "gd", "sr", "sr-latn", "si", "sk", "sl", "es", "su", "sw", "sv", "tl", "tg", "ta", "tt", "te", "th", "tr", "udm", "uk", "ur", "uz", "uzbcyr", "vi", "cy", "xh", "sah", "yi", "zu"];
    const SupportedLanguage = (source, language) => {
        let tmpList = [];
        switch (source) {
            case 'baidu':
                tmpList = BAIDU_LANGUAGE;
                break;
            case 'deepl':
                tmpList = DEEPL_LANGUAGE;
                break;
            case 'microsoft':
                tmpList = BING_LANGUAGE;
                break;
            case 'sogou':
                tmpList = SOGOU_LANGUAGE;
                break;
            case 'yandex':
                tmpList = YANDEX_LANGUAGE;
                break;
            default: tmpList = GOOGLE_LANGUAGE;
        }
        return tmpList.map(x => x.toLowerCase()).includes(language.toLowerCase());
    };

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _regeneratorRuntime() {
      _regeneratorRuntime = function () {
        return exports;
      };
      var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        defineProperty = Object.defineProperty || function (obj, key, desc) {
          obj[key] = desc.value;
        },
        $Symbol = "function" == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
          value: value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function (obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
          generator = Object.create(protoGenerator.prototype),
          context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
          value: makeInvokeMethod(innerFn, self, context)
        }), generator;
      }
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      exports.wrap = wrap;
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });
      var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if ("throw" !== record.type) {
            var result = record.arg,
              value = result.value;
            return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            }) : PromiseImpl.resolve(value).then(function (unwrapped) {
              result.value = unwrapped, resolve(result);
            }, function (error) {
              return invoke("throw", error, resolve, reject);
            });
          }
          reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
          value: function (method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }
            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method,
          method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
      }
      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [{
          tryLoc: "root"
        }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) return iteratorMethod.call(iterable);
          if ("function" == typeof iterable.next) return iterable;
          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                return next.value = undefined, next.done = !0, next;
              };
            return next.next = next;
          }
        }
        return {
          next: doneResult
        };
      }
      function doneResult() {
        return {
          value: undefined,
          done: !0
        };
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
      }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
      }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
      }, exports.mark = function (genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
      }, exports.awrap = function (arg) {
        return {
          __await: arg
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
        return this;
      }), define(Gp, "toString", function () {
        return "[object Generator]";
      }), exports.keys = function (val) {
        var object = Object(val),
          keys = [];
        for (var key in object) keys.push(key);
        return keys.reverse(), function next() {
          for (; keys.length;) {
            var key = keys.pop();
            if (key in object) return next.value = key, next.done = !1, next;
          }
          return next.done = !0, next;
        };
      }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function (skipTempReset) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function () {
          this.done = !0;
          var rootRecord = this.tryEntries[0].completion;
          if ("throw" === rootRecord.type) throw rootRecord.arg;
          return this.rval;
        },
        dispatchException: function (exception) {
          if (this.done) throw exception;
          var context = this;
          function handle(loc, caught) {
            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i],
              record = entry.completion;
            if ("root" === entry.tryLoc) return handle("end");
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc"),
                hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              } else {
                if (!hasFinally) throw new Error("try statement without catch or finally");
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              }
            }
          }
        },
        abrupt: function (type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
          var record = finallyEntry ? finallyEntry.completion : {};
          return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function (record, afterLoc) {
          if ("throw" === record.type) throw record.arg;
          return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function (finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
          }
        },
        catch: function (tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if ("throw" === record.type) {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function (iterable, resultName, nextLoc) {
          return this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
      }, exports;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
          args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(undefined);
        });
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }

    var AxiosRequest = function () {
      function AxiosRequest() {
        _classCallCheck(this, AxiosRequest);
      }
      _createClass(AxiosRequest, [{
        key: "requestHandle",
        value: function requestHandle(url, postData) {
          var _options$method,
            _options$headers,
            _this = this;
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (!options.timeout) {
            options.timeout = 30000;
          }
          var validPostRequest = ((_options$method = options === null || options === void 0 ? void 0 : options.method) !== null && _options$method !== void 0 ? _options$method : '').toLowerCase() === 'post' && postData;
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
            options.headers['content-length'] = ArrayBuffer.byteLength(postData);
            options.body = postData;
          }
          return new Promise(function (resolve, reject) {
            fetch(url, options).then( function () {
              var _ref = _asyncToGenerator( _regeneratorRuntime().mark(function _callee(response) {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.t0 = response;
                      _context.next = 3;
                      return response.text();
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
              resolve(_this.responseBuilder(res.response, res.data));
            })["catch"](function (e) {
              reject({
                cause: e
              });
            });
          });
        }
      }, {
        key: "isJson",
        value: function isJson(str) {
          try {
            JSON.parse(str);
          } catch (e) {
            return false;
          }
          return true;
        }
      }, {
        key: "responseBuilder",
        value: function responseBuilder(res, data) {
          var dataString = data.toString();
          var isJson = this.isJson(dataString);
          var headers = Object.fromEntries(res.headers.entries());
          if (headers['set-cookie'] && res.headers.getAll) {
            headers['set-cookie'] = res.headers.getAll('set-cookie');
          }
          return {
            status: res.status,
            statusText: res.statusText,
            headers: headers,
            data: isJson ? JSON.parse(dataString) : dataString
          };
        }
      }, {
        key: "get",
        value: function get(url, options) {
          return this.requestHandle(url, null, _objectSpread2({
            method: 'GET'
          }, options));
        }
      }, {
        key: "post",
        value: function post(url, data, options) {
          return this.requestHandle(url, data, _objectSpread2({
            method: 'POST'
          }, options));
        }
      }]);
      return AxiosRequest;
    }();
    var axiosFetch = new AxiosRequest();

    const GoogleBrowserTranslate = async (text = '', target, raw) => {
        if (!text) {
            return await Promise.reject('Empty text #GoogleTranslate ');
        }
        if (!SupportedLanguage('google', target || 'en')) {
            return await Promise.reject('Not supported target language #GoogleTranslate ');
        }
        //curl 'https://translate.googleapis.com/translate_a/t?anno=3&client=wt_lib&format=html&v=1.0&key&sl=auto&tl=zh&tc=1&sr=1&tk=164775.366094&mode=1' --data-raw 'q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF' --compressed
        //https://vielhuber.de/zh-cn/blog-zh-cn/google-translation-api-hacking/
        let query = new URLSearchParams({ anno: '4', client: 'te_lib', format: 'html', v: '1.0', key: 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw', sl: 'auto', tl: (target || 'en'), tc: '1', sr: '1', tk: GoogleTranslateTk(text), mode: '1' });
        //let formData = new URLSearchParams({q: text})
        return await new Promise(async (resolve, reject) => {
            axiosFetch.post('https://translate.googleapis.com/translate_a/t?' + query.toString(), 'q=' + ((text instanceof Array) ? text.map(x => encodeURIComponent(x)).join('&q=') : encodeURIComponent(text))).then((response) => {
                if (response.data && response.data instanceof Array) {
                    resolve(raw ? response.data : response.data.map((x) => x?.[0] || '').join("\n"));
                }
                reject(raw ? response.data : 'Invalid content #GoogleTranslate ');
            }).catch(e => {
                reject(raw ? e : e.toString());
            });
        });
    };
    const hl = function (a, b) {
        let c = 0;
        for (; c < b.length - 2; c += 3) {
            let d = b.charAt(c + 2);
            d = "a" <= d ? (d.charCodeAt(0) - 87) : Number(d);
            d = "+" == b.charAt(c + 1) ? (a >>> d) : (a << d);
            a = "+" == b.charAt(c) ? (a + d & 4294967295) : (a ^ d);
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
                    charCodeList[charCodeListIndex++] = charCode >> 6 | 192;
                }
                else {
                    if (55296 == (charCode & 64512) && index + 1 < text.length && 56320 == (text.charCodeAt(index + 1) & 64512)) {
                        charCode = 65536 + ((charCode & 1023) << 10) + (text.charCodeAt(++index) & 1023);
                        charCodeList[charCodeListIndex++] = charCode >> 18 | 240;
                        charCodeList[charCodeListIndex++] = charCode >> 12 & 63 | 128;
                    }
                    else {
                        charCodeList[charCodeListIndex++] = charCode >> 12 | 224;
                    }
                    charCodeList[charCodeListIndex++] = charCode >> 6 & 63 | 128;
                }
                charCodeList[charCodeListIndex++] = charCode & 63 | 128;
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
        a %= 1E6;
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
    const MicrosoftBrowserTranslator = async (text = '', target, raw) => {
        if (!text) {
            return await Promise.reject('Empty text #MicrosoftTranslator ');
        }
        if (!SupportedLanguage('microsoft', target || 'en')) {
            return await Promise.reject('Not supported target language #MicrosoftTranslator ');
        }
        //get jwt
        const jwt = await GetMicrosoftBrowserTranslatorAuth();
        if (jwt) {
            return await new Promise(async (resolve, reject) => {
                axiosFetch.post(`https://api.cognitive.microsofttranslator.com/translate?from=&to=${target}&api-version=3.0&includeSentenceLength=true`, JSON.stringify(text instanceof Array ? text.map(tmpText => ({ Text: tmpText })) : [{ Text: text }]), {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${jwt}`
                    }
                }).then((response) => {
                    if (response.data && response.data instanceof Array) {
                        resolve(raw ? response.data : response.data.map((x) => (x?.translations || [])?.[0]?.text || '').join("\n"));
                    }
                    reject(raw ? response.data : 'Invalid content #MicrosoftTranslator ');
                }).catch(e => {
                    reject(raw ? e : e.toString());
                });
            });
        }
        else {
            return await Promise.reject('Invalid jwt #MicrosoftTranslator ');
        }
    };

    const SogouBrowserTranslator = async (text = '', target, raw) => {
        if (!text) {
            return await Promise.reject('Empty text #SogouTranslator ');
        }
        if (!SupportedLanguage('sogou', target || 'en')) {
            return await Promise.reject('Not supported target language #SogouTranslator ');
        }
        let body = JSON.stringify({
            from_lang: "auto",
            to_lang: target,
            trans_frag: text instanceof Array ? text.map(x => ({ text: x })) : [{ text }]
        });
        return await new Promise(async (resolve, reject) => {
            axiosFetch.post('https://go.ie.sogou.com/qbpc/translate', `S-Param=${body}`).then(response => {
                if (response?.data?.data?.trans_result && response?.data?.data?.trans_result instanceof Array) {
                    resolve(raw ? response.data : (response.data.data.trans_result.map((x) => x.trans_text).join("\n") || ''));
                }
                reject(raw ? response.data : 'Invalid content #SogouTranslator ');
            }).catch(e => {
                reject(raw ? e : e.toString());
            });
        });
    };

    const Translator = async (text = '', platform, target, raw) => {
        let result = { content: '', message: '' };
        try {
            switch (platform) {
                case 'google':
                    result.content = await GoogleBrowserTranslate(text, target, !!raw);
                    break;
                case 'microsoft':
                    result.content = await MicrosoftBrowserTranslator(text, target, !!raw);
                    break;
                case 'sogou':
                    result.content = await SogouBrowserTranslator(text, target, !!raw);
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
