(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // src/index.tsx
  var import_react6 = __toModule(__require("react"));
  var import_react_dom = __toModule(__require("react-dom"));

  // src/component/news/news.tsx
  var import_react5 = __toModule(__require("react"));

  // node_modules/swr/esm/use-swr.js
  var import_react3 = __toModule(__require("react"));

  // node_modules/dequal/lite/index.mjs
  var has = Object.prototype.hasOwnProperty;
  function dequal(foo, bar) {
    var ctor, len;
    if (foo === bar)
      return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
      if (ctor === Date)
        return foo.getTime() === bar.getTime();
      if (ctor === RegExp)
        return foo.toString() === bar.toString();
      if (ctor === Array) {
        if ((len = foo.length) === bar.length) {
          while (len-- && dequal(foo[len], bar[len]))
            ;
        }
        return len === -1;
      }
      if (!ctor || typeof foo === "object") {
        len = 0;
        for (ctor in foo) {
          if (has.call(foo, ctor) && ++len && !has.call(bar, ctor))
            return false;
          if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor]))
            return false;
        }
        return Object.keys(bar).length === len;
      }
    }
    return foo !== foo && bar !== bar;
  }

  // node_modules/swr/esm/libs/hash.js
  var table = new WeakMap();
  var counter = 0;
  function hash(args) {
    if (!args.length)
      return "";
    var key = "arg";
    for (var i = 0; i < args.length; ++i) {
      if (args[i] === null) {
        key += "@null";
        continue;
      }
      var _hash = void 0;
      if (typeof args[i] !== "object" && typeof args[i] !== "function") {
        if (typeof args[i] === "string") {
          _hash = '"' + args[i] + '"';
        } else {
          _hash = String(args[i]);
        }
      } else {
        if (!table.has(args[i])) {
          _hash = counter;
          table.set(args[i], counter++);
        } else {
          _hash = table.get(args[i]);
        }
      }
      key += "@" + _hash;
    }
    return key;
  }

  // node_modules/swr/esm/cache.js
  var Cache = function() {
    function Cache2(initialData) {
      if (initialData === void 0) {
        initialData = {};
      }
      this.cache = new Map(Object.entries(initialData));
      this.subs = [];
    }
    Cache2.prototype.get = function(key) {
      var _key = this.serializeKey(key)[0];
      return this.cache.get(_key);
    };
    Cache2.prototype.set = function(key, value) {
      var _key = this.serializeKey(key)[0];
      this.cache.set(_key, value);
      this.notify();
    };
    Cache2.prototype.keys = function() {
      return Array.from(this.cache.keys());
    };
    Cache2.prototype.has = function(key) {
      var _key = this.serializeKey(key)[0];
      return this.cache.has(_key);
    };
    Cache2.prototype.clear = function() {
      this.cache.clear();
      this.notify();
    };
    Cache2.prototype.delete = function(key) {
      var _key = this.serializeKey(key)[0];
      this.cache.delete(_key);
      this.notify();
    };
    Cache2.prototype.serializeKey = function(key) {
      var args = null;
      if (typeof key === "function") {
        try {
          key = key();
        } catch (err) {
          key = "";
        }
      }
      if (Array.isArray(key)) {
        args = key;
        key = hash(key);
      } else {
        key = String(key || "");
      }
      var errorKey = key ? "err@" + key : "";
      var isValidatingKey = key ? "validating@" + key : "";
      return [key, args, errorKey, isValidatingKey];
    };
    Cache2.prototype.subscribe = function(listener) {
      var _this = this;
      if (typeof listener !== "function") {
        throw new Error("Expected the listener to be a function.");
      }
      var isSubscribed = true;
      this.subs.push(listener);
      return function() {
        if (!isSubscribed)
          return;
        isSubscribed = false;
        var index = _this.subs.indexOf(listener);
        if (index > -1) {
          _this.subs[index] = _this.subs[_this.subs.length - 1];
          _this.subs.length--;
        }
      };
    };
    Cache2.prototype.notify = function() {
      for (var _i = 0, _a = this.subs; _i < _a.length; _i++) {
        var listener = _a[_i];
        listener();
      }
    };
    return Cache2;
  }();
  var cache_default = Cache;

  // node_modules/swr/esm/libs/web-preset.js
  var online = true;
  var isOnline = function() {
    return online;
  };
  var isDocumentVisible = function() {
    if (typeof document !== "undefined" && document.visibilityState !== void 0) {
      return document.visibilityState !== "hidden";
    }
    return true;
  };
  var fetcher = function(url) {
    return fetch(url).then(function(res) {
      return res.json();
    });
  };
  var registerOnFocus = function(cb) {
    if (typeof window !== "undefined" && window.addEventListener !== void 0 && typeof document !== "undefined" && document.addEventListener !== void 0) {
      document.addEventListener("visibilitychange", function() {
        return cb();
      }, false);
      window.addEventListener("focus", function() {
        return cb();
      }, false);
    }
  };
  var registerOnReconnect = function(cb) {
    if (typeof window !== "undefined" && window.addEventListener !== void 0) {
      window.addEventListener("online", function() {
        online = true;
        cb();
      }, false);
      window.addEventListener("offline", function() {
        return online = false;
      }, false);
    }
  };
  var web_preset_default = {
    isOnline,
    isDocumentVisible,
    fetcher,
    registerOnFocus,
    registerOnReconnect
  };

  // node_modules/swr/esm/config.js
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var cache = new cache_default();
  function onErrorRetry(_, __, config, revalidate, opts) {
    if (!config.isDocumentVisible()) {
      return;
    }
    if (typeof config.errorRetryCount === "number" && opts.retryCount > config.errorRetryCount) {
      return;
    }
    var count = Math.min(opts.retryCount, 8);
    var timeout = ~~((Math.random() + 0.5) * (1 << count)) * config.errorRetryInterval;
    setTimeout(revalidate, timeout, opts);
  }
  var slowConnection = typeof window !== "undefined" && navigator["connection"] && ["slow-2g", "2g"].indexOf(navigator["connection"].effectiveType) !== -1;
  var defaultConfig = __assign({
    onLoadingSlow: function() {
    },
    onSuccess: function() {
    },
    onError: function() {
    },
    onErrorRetry,
    errorRetryInterval: (slowConnection ? 10 : 5) * 1e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: (slowConnection ? 5 : 3) * 1e3,
    refreshInterval: 0,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    shouldRetryOnError: true,
    suspense: false,
    compare: dequal,
    isPaused: function() {
      return false;
    }
  }, web_preset_default);
  var config_default = defaultConfig;

  // node_modules/swr/esm/env.js
  var import_react = __toModule(__require("react"));
  var IS_SERVER = typeof window === "undefined" || !!(typeof Deno !== "undefined" && Deno && Deno.version && Deno.version.deno);
  var rAF = IS_SERVER ? null : window["requestAnimationFrame"] ? function(f) {
    return window["requestAnimationFrame"](f);
  } : function(f) {
    return setTimeout(f, 1);
  };
  var useIsomorphicLayoutEffect = IS_SERVER ? import_react.useEffect : import_react.useLayoutEffect;

  // node_modules/swr/esm/swr-config-context.js
  var import_react2 = __toModule(__require("react"));
  var SWRConfigContext = (0, import_react2.createContext)({});
  SWRConfigContext.displayName = "SWRConfigContext";
  var swr_config_context_default = SWRConfigContext;

  // node_modules/swr/esm/use-swr.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var CONCURRENT_PROMISES = {};
  var CONCURRENT_PROMISES_TS = {};
  var FOCUS_REVALIDATORS = {};
  var RECONNECT_REVALIDATORS = {};
  var CACHE_REVALIDATORS = {};
  var MUTATION_TS = {};
  var MUTATION_END_TS = {};
  var now = function() {
    var ts = 0;
    return function() {
      return ++ts;
    };
  }();
  if (!IS_SERVER) {
    revalidate_1 = function(revalidators) {
      if (!config_default.isDocumentVisible() || !config_default.isOnline())
        return;
      for (var key in revalidators) {
        if (revalidators[key][0])
          revalidators[key][0]();
      }
    };
    if (typeof config_default.registerOnFocus === "function") {
      config_default.registerOnFocus(function() {
        return revalidate_1(FOCUS_REVALIDATORS);
      });
    }
    if (typeof config_default.registerOnReconnect === "function") {
      config_default.registerOnReconnect(function() {
        return revalidate_1(RECONNECT_REVALIDATORS);
      });
    }
  }
  var revalidate_1;
  var trigger = function(_key, shouldRevalidate) {
    if (shouldRevalidate === void 0) {
      shouldRevalidate = true;
    }
    var _a = cache.serializeKey(_key), key = _a[0], keyErr = _a[2], keyValidating = _a[3];
    if (!key)
      return Promise.resolve();
    var updaters = CACHE_REVALIDATORS[key];
    if (key && updaters) {
      var currentData = cache.get(key);
      var currentError = cache.get(keyErr);
      var currentIsValidating = cache.get(keyValidating);
      var promises = [];
      for (var i = 0; i < updaters.length; ++i) {
        promises.push(updaters[i](shouldRevalidate, currentData, currentError, currentIsValidating, i > 0));
      }
      return Promise.all(promises).then(function() {
        return cache.get(key);
      });
    }
    return Promise.resolve(cache.get(key));
  };
  var broadcastState = function(key, data, error, isValidating) {
    var updaters = CACHE_REVALIDATORS[key];
    if (key && updaters) {
      for (var i = 0; i < updaters.length; ++i) {
        updaters[i](false, data, error, isValidating);
      }
    }
  };
  var mutate = function(_key, _data, shouldRevalidate) {
    if (shouldRevalidate === void 0) {
      shouldRevalidate = true;
    }
    return __awaiter(void 0, void 0, void 0, function() {
      var _a, key, keyErr, beforeMutationTs, beforeConcurrentPromisesTs, data, error, isAsyncMutation, err_1, shouldAbort, updaters, promises, i;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = cache.serializeKey(_key), key = _a[0], keyErr = _a[2];
            if (!key)
              return [2];
            if (typeof _data === "undefined")
              return [
                2,
                trigger(_key, shouldRevalidate)
              ];
            MUTATION_TS[key] = now() - 1;
            MUTATION_END_TS[key] = 0;
            beforeMutationTs = MUTATION_TS[key];
            beforeConcurrentPromisesTs = CONCURRENT_PROMISES_TS[key];
            isAsyncMutation = false;
            if (_data && typeof _data === "function") {
              try {
                _data = _data(cache.get(key));
              } catch (err) {
                _data = void 0;
                error = err;
              }
            }
            if (!(_data && typeof _data.then === "function"))
              return [3, 5];
            isAsyncMutation = true;
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            return [4, _data];
          case 2:
            data = _b.sent();
            return [3, 4];
          case 3:
            err_1 = _b.sent();
            error = err_1;
            return [3, 4];
          case 4:
            return [3, 6];
          case 5:
            data = _data;
            _b.label = 6;
          case 6:
            shouldAbort = function() {
              if (beforeMutationTs !== MUTATION_TS[key] || beforeConcurrentPromisesTs !== CONCURRENT_PROMISES_TS[key]) {
                if (error)
                  throw error;
                return true;
              }
            };
            if (shouldAbort())
              return [2, data];
            if (typeof data !== "undefined") {
              cache.set(key, data);
            }
            cache.set(keyErr, error);
            MUTATION_END_TS[key] = now() - 1;
            if (!isAsyncMutation) {
              if (shouldAbort())
                return [2, data];
            }
            updaters = CACHE_REVALIDATORS[key];
            if (updaters) {
              promises = [];
              for (i = 0; i < updaters.length; ++i) {
                promises.push(updaters[i](!!shouldRevalidate, data, error, void 0, i > 0));
              }
              return [2, Promise.all(promises).then(function() {
                if (error)
                  throw error;
                return cache.get(key);
              })];
            }
            if (error)
              throw error;
            return [2, data];
        }
      });
    });
  };
  function useSWR() {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _key = args[0];
    var config = Object.assign({}, config_default, (0, import_react3.useContext)(swr_config_context_default), args.length > 2 ? args[2] : args.length === 2 && typeof args[1] === "object" ? args[1] : {});
    var fn = args.length > 2 ? args[1] : args.length === 2 && typeof args[1] === "function" ? args[1] : args[1] === null ? args[1] : config.fetcher;
    var _a = cache.serializeKey(_key), key = _a[0], fnArgs = _a[1], keyErr = _a[2], keyValidating = _a[3];
    var configRef = (0, import_react3.useRef)(config);
    useIsomorphicLayoutEffect(function() {
      configRef.current = config;
    });
    var willRevalidateOnMount = function() {
      return config.revalidateOnMount || !config.initialData && config.revalidateOnMount === void 0;
    };
    var resolveData = function() {
      var cachedData = cache.get(key);
      return typeof cachedData === "undefined" ? config.initialData : cachedData;
    };
    var resolveIsValidating = function() {
      return !!cache.get(keyValidating) || key && willRevalidateOnMount();
    };
    var initialData = resolveData();
    var initialError = cache.get(keyErr);
    var initialIsValidating = resolveIsValidating();
    var stateDependencies = (0, import_react3.useRef)({
      data: false,
      error: false,
      isValidating: false
    });
    var stateRef = (0, import_react3.useRef)({
      data: initialData,
      error: initialError,
      isValidating: initialIsValidating
    });
    (0, import_react3.useDebugValue)(stateRef.current.data);
    var rerender = (0, import_react3.useState)({})[1];
    var dispatch = (0, import_react3.useCallback)(function(payload) {
      var shouldUpdateState = false;
      for (var k in payload) {
        if (stateRef.current[k] === payload[k]) {
          continue;
        }
        stateRef.current[k] = payload[k];
        if (stateDependencies.current[k]) {
          shouldUpdateState = true;
        }
      }
      if (shouldUpdateState) {
        if (unmountedRef.current || !initialMountedRef.current)
          return;
        rerender({});
      }
    }, []);
    var unmountedRef = (0, import_react3.useRef)(false);
    var keyRef = (0, import_react3.useRef)(key);
    var initialMountedRef = (0, import_react3.useRef)(false);
    var eventsCallback = (0, import_react3.useCallback)(function(event) {
      var _a2;
      var params = [];
      for (var _i2 = 1; _i2 < arguments.length; _i2++) {
        params[_i2 - 1] = arguments[_i2];
      }
      if (unmountedRef.current)
        return;
      if (!initialMountedRef.current)
        return;
      if (key !== keyRef.current)
        return;
      (_a2 = configRef.current)[event].apply(_a2, params);
    }, [key]);
    var boundMutate = (0, import_react3.useCallback)(function(data, shouldRevalidate) {
      return mutate(keyRef.current, data, shouldRevalidate);
    }, []);
    var addRevalidator = function(revalidators, callback) {
      if (!revalidators[key]) {
        revalidators[key] = [callback];
      } else {
        revalidators[key].push(callback);
      }
      return function() {
        var keyedRevalidators = revalidators[key];
        var index = keyedRevalidators.indexOf(callback);
        if (index >= 0) {
          keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
          keyedRevalidators.pop();
        }
      };
    };
    var revalidate = (0, import_react3.useCallback)(function(revalidateOpts) {
      if (revalidateOpts === void 0) {
        revalidateOpts = {};
      }
      return __awaiter(_this, void 0, void 0, function() {
        var _a2, retryCount, _b, dedupe, loading, shouldDeduping, newData, startAt, newState, err_2;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              if (!key || !fn)
                return [2, false];
              if (unmountedRef.current)
                return [2, false];
              if (configRef.current.isPaused())
                return [2, false];
              _a2 = revalidateOpts.retryCount, retryCount = _a2 === void 0 ? 0 : _a2, _b = revalidateOpts.dedupe, dedupe = _b === void 0 ? false : _b;
              loading = true;
              shouldDeduping = typeof CONCURRENT_PROMISES[key] !== "undefined" && dedupe;
              _c.label = 1;
            case 1:
              _c.trys.push([1, 6, , 7]);
              dispatch({
                isValidating: true
              });
              cache.set(keyValidating, true);
              if (!shouldDeduping) {
                broadcastState(key, stateRef.current.data, stateRef.current.error, true);
              }
              newData = void 0;
              startAt = void 0;
              if (!shouldDeduping)
                return [3, 3];
              startAt = CONCURRENT_PROMISES_TS[key];
              return [4, CONCURRENT_PROMISES[key]];
            case 2:
              newData = _c.sent();
              return [3, 5];
            case 3:
              if (config.loadingTimeout && !cache.get(key)) {
                setTimeout(function() {
                  if (loading)
                    eventsCallback("onLoadingSlow", key, config);
                }, config.loadingTimeout);
              }
              if (fnArgs !== null) {
                CONCURRENT_PROMISES[key] = fn.apply(void 0, fnArgs);
              } else {
                CONCURRENT_PROMISES[key] = fn(key);
              }
              CONCURRENT_PROMISES_TS[key] = startAt = now();
              return [4, CONCURRENT_PROMISES[key]];
            case 4:
              newData = _c.sent();
              setTimeout(function() {
                delete CONCURRENT_PROMISES[key];
                delete CONCURRENT_PROMISES_TS[key];
              }, config.dedupingInterval);
              eventsCallback("onSuccess", newData, key, config);
              _c.label = 5;
            case 5:
              if (CONCURRENT_PROMISES_TS[key] > startAt) {
                return [2, false];
              }
              if (MUTATION_TS[key] && (startAt <= MUTATION_TS[key] || startAt <= MUTATION_END_TS[key] || MUTATION_END_TS[key] === 0)) {
                dispatch({ isValidating: false });
                return [2, false];
              }
              cache.set(keyErr, void 0);
              cache.set(keyValidating, false);
              newState = {
                isValidating: false
              };
              if (typeof stateRef.current.error !== "undefined") {
                newState.error = void 0;
              }
              if (!config.compare(stateRef.current.data, newData)) {
                newState.data = newData;
              }
              if (!config.compare(cache.get(key), newData)) {
                cache.set(key, newData);
              }
              dispatch(newState);
              if (!shouldDeduping) {
                broadcastState(key, newData, newState.error, false);
              }
              return [3, 7];
            case 6:
              err_2 = _c.sent();
              delete CONCURRENT_PROMISES[key];
              delete CONCURRENT_PROMISES_TS[key];
              if (configRef.current.isPaused()) {
                dispatch({
                  isValidating: false
                });
                return [2, false];
              }
              cache.set(keyErr, err_2);
              if (stateRef.current.error !== err_2) {
                dispatch({
                  isValidating: false,
                  error: err_2
                });
                if (!shouldDeduping) {
                  broadcastState(key, void 0, err_2, false);
                }
              }
              eventsCallback("onError", err_2, key, config);
              if (config.shouldRetryOnError) {
                eventsCallback("onErrorRetry", err_2, key, config, revalidate, {
                  retryCount: retryCount + 1,
                  dedupe: true
                });
              }
              return [3, 7];
            case 7:
              loading = false;
              return [2, true];
          }
        });
      });
    }, [key]);
    useIsomorphicLayoutEffect(function() {
      if (!key)
        return void 0;
      unmountedRef.current = false;
      var isUpdating = initialMountedRef.current;
      initialMountedRef.current = true;
      var currentHookData = stateRef.current.data;
      var latestKeyedData = resolveData();
      keyRef.current = key;
      if (!config.compare(currentHookData, latestKeyedData)) {
        dispatch({ data: latestKeyedData });
      }
      var softRevalidate = function() {
        return revalidate({ dedupe: true });
      };
      if (isUpdating || willRevalidateOnMount()) {
        if (typeof latestKeyedData !== "undefined" && !IS_SERVER) {
          rAF(softRevalidate);
        } else {
          softRevalidate();
        }
      }
      var pending = false;
      var onFocus = function() {
        if (pending || !configRef.current.revalidateOnFocus)
          return;
        pending = true;
        softRevalidate();
        setTimeout(function() {
          return pending = false;
        }, configRef.current.focusThrottleInterval);
      };
      var onReconnect = function() {
        if (configRef.current.revalidateOnReconnect) {
          softRevalidate();
        }
      };
      var onUpdate = function(shouldRevalidate, updatedData, updatedError, updatedIsValidating, dedupe) {
        if (shouldRevalidate === void 0) {
          shouldRevalidate = true;
        }
        if (dedupe === void 0) {
          dedupe = true;
        }
        var newState = {};
        var needUpdate = false;
        if (typeof updatedData !== "undefined" && !config.compare(stateRef.current.data, updatedData)) {
          newState.data = updatedData;
          needUpdate = true;
        }
        if (stateRef.current.error !== updatedError) {
          newState.error = updatedError;
          needUpdate = true;
        }
        if (typeof updatedIsValidating !== "undefined" && stateRef.current.isValidating !== updatedIsValidating) {
          newState.isValidating = updatedIsValidating;
          needUpdate = true;
        }
        if (needUpdate) {
          dispatch(newState);
        }
        if (shouldRevalidate) {
          if (dedupe) {
            return softRevalidate();
          } else {
            return revalidate();
          }
        }
        return false;
      };
      var unsubFocus = addRevalidator(FOCUS_REVALIDATORS, onFocus);
      var unsubReconnect = addRevalidator(RECONNECT_REVALIDATORS, onReconnect);
      var unsubUpdate = addRevalidator(CACHE_REVALIDATORS, onUpdate);
      return function() {
        dispatch = function() {
          return null;
        };
        unmountedRef.current = true;
        unsubFocus();
        unsubReconnect();
        unsubUpdate();
      };
    }, [key, revalidate]);
    useIsomorphicLayoutEffect(function() {
      var timer = null;
      var tick = function() {
        return __awaiter(_this, void 0, void 0, function() {
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                if (!(!stateRef.current.error && (configRef.current.refreshWhenHidden || configRef.current.isDocumentVisible()) && (configRef.current.refreshWhenOffline || configRef.current.isOnline())))
                  return [3, 2];
                return [4, revalidate({ dedupe: true })];
              case 1:
                _a2.sent();
                _a2.label = 2;
              case 2:
                if (configRef.current.refreshInterval && timer) {
                  timer = setTimeout(tick, configRef.current.refreshInterval);
                }
                return [2];
            }
          });
        });
      };
      if (configRef.current.refreshInterval) {
        timer = setTimeout(tick, configRef.current.refreshInterval);
      }
      return function() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      };
    }, [
      config.refreshInterval,
      config.refreshWhenHidden,
      config.refreshWhenOffline,
      revalidate
    ]);
    var latestData;
    var latestError;
    if (config.suspense) {
      latestData = cache.get(key);
      latestError = cache.get(keyErr);
      if (typeof latestData === "undefined") {
        latestData = initialData;
      }
      if (typeof latestError === "undefined") {
        latestError = initialError;
      }
      if (typeof latestData === "undefined" && typeof latestError === "undefined") {
        if (!CONCURRENT_PROMISES[key]) {
          revalidate();
        }
        if (CONCURRENT_PROMISES[key] && typeof CONCURRENT_PROMISES[key].then === "function") {
          throw CONCURRENT_PROMISES[key];
        }
        latestData = CONCURRENT_PROMISES[key];
      }
      if (typeof latestData === "undefined" && latestError) {
        throw latestError;
      }
    }
    var memoizedState = (0, import_react3.useMemo)(function() {
      var state = { revalidate, mutate: boundMutate };
      Object.defineProperties(state, {
        error: {
          get: function() {
            stateDependencies.current.error = true;
            if (config.suspense) {
              return latestError;
            }
            return keyRef.current === key ? stateRef.current.error : initialError;
          },
          enumerable: true
        },
        data: {
          get: function() {
            stateDependencies.current.data = true;
            if (config.suspense) {
              return latestData;
            }
            return keyRef.current === key ? stateRef.current.data : initialData;
          },
          enumerable: true
        },
        isValidating: {
          get: function() {
            stateDependencies.current.isValidating = true;
            return key ? stateRef.current.isValidating : false;
          },
          enumerable: true
        }
      });
      return state;
    }, [
      revalidate,
      initialData,
      initialError,
      boundMutate,
      key,
      config.suspense,
      latestError,
      latestData
    ]);
    return memoizedState;
  }
  Object.defineProperty(swr_config_context_default.Provider, "default", {
    value: config_default
  });
  var SWRConfig = swr_config_context_default.Provider;
  var use_swr_default = useSWR;

  // node_modules/swr/esm/use-swr-infinite.js
  var import_react4 = __toModule(__require("react"));

  // node_modules/swr/esm/index.js
  var esm_default = use_swr_default;

  // src/component/news/news.tsx
  var getNews = async () => {
    return await fetch(NEWS_API).then((response) => response.json());
  };
  var NEWS_API = "https://gw2.wishingstarmoye.com/gw2api/news";
  var News = ({ news }) => {
    return /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h1", null, news.title), /* @__PURE__ */ import_react5.default.createElement("p", null, news.content), news.image && /* @__PURE__ */ import_react5.default.createElement("img", {
      src: news.image,
      alt: news.title
    }));
  };
  var NewsList = () => {
    const { data, error } = esm_default("news", getNews);
    console.log(data);
    if (error)
      return /* @__PURE__ */ import_react5.default.createElement("div", null, "failed to load");
    if (!data)
      return /* @__PURE__ */ import_react5.default.createElement("div", null, "loading...");
    return /* @__PURE__ */ import_react5.default.createElement("div", null, data.map((news) => /* @__PURE__ */ import_react5.default.createElement(News, {
      news
    })));
  };

  // src/index.tsx
  import_react_dom.default.render(/* @__PURE__ */ import_react6.default.createElement(NewsList, null), document.getElementById("root"));
})();
