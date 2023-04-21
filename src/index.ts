import * as utils from './utils';

const APP_PROXY_METHODS = ['onLaunch', 'onShow', 'onHide', 'onError', 'onUnhandledRejection'];

const PAGE_PROXY_METHODS = ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onTitleClick', 'onPullDownRefresh', 'onReachBottom'];

const PAGE_EVENTS_PROXY_METHODS = ['onBack'];

/**
 * 将event挂载到App，防止重复引用minitap导致事件多次触发
 */
const event = App.__minitap_event = App.__minitap_event || utils.event;

/**
 * 获取跨平台的 SDK
 */
const getSDK = () => {
  let currentSdk;

  if (typeof wx === 'object') {
    currentSdk = wx;
  } else if (typeof dd === 'object') {
    currentSdk = dd;
  } else if (typeof my === 'object') {
    currentSdk = my;
  } else if (typeof tt === 'object') {
    currentSdk = tt;
  } else if (typeof qq === 'object') {
    currentSdk = qq;
  } else if (typeof swan === 'object') {
    currentSdk = swan;
  }

  return currentSdk;
};

const sdk = getSDK();

/**
 * 创建方法代理
 * @param method 如果不存在则新建一个function
 * @param callback
 */
function createMethodProxy(method, callback) {
  return utils.createProxy(method || function () {}, callback)
}

/**
 * 创建小程序App对象代理
 */
function proxyApp() {
  App = utils.createProxy(App, function (app, argArray) {
    return app(APP_PROXY_METHODS.reduce((arg, methodName) => {
      arg[methodName] = createMethodProxy(arg[methodName], function (method, params) {
        event.trigger.call(this, 'app:' + methodName, ...params);
        method.apply(this, params);
      });
      return arg;
    }, argArray[0]));
  })
}

/**
 * 创建小程序Page对象代理
 */
function proxyPage() {
  Page = utils.createProxy(Page, function (page, argArray) {
    argArray[0].events = PAGE_EVENTS_PROXY_METHODS.reduce((evs, methodName) => {
      evs[methodName] =
          createMethodProxy(evs[methodName], function (method, params) {
            event.trigger.call(this, `page@${this.route}:${methodName}`, ...params);
            event.trigger.call(this, `page:${methodName}`, ...params);
            method.apply(this, params);
          })
      return evs;
    }, argArray[0].events || {});

    return page(PAGE_PROXY_METHODS.reduce((arg, methodName) => {
      arg[methodName] = createMethodProxy(arg[methodName], function (method, params) {
        event.trigger.call(this, `page@${this.route}:${methodName}`, ...params);
        event.trigger.call(this, `page:${methodName}`, ...params);
        method.apply(this, params);
      })
      return arg;
    }, argArray[0]))
  })
}

/**
 * 创建request代理
 */
function proxyRequest() {
  sdk.request = utils.createProxy(sdk.request, function (request, [config]) {
    const startTime = utils.now();

    return request({
      ...config,
      success(...args) {
        const dur = utils.now() - startTime;

        config.success && config.success(...args);
        event.trigger.call(this, 'request', dur, config, ...args);
        event.trigger.call(this, `request:${config.url}`, dur, config, ...args);
      },
      fail(...args) {
        config.fail && config.fail(...args);
        event.trigger.call(this, 'request', -1, config, ...args);
        event.trigger.call(this, `request:${config.url}`, -1, config, ...args);
      }
    })
  })
}


/**
 * 监听事件
 * @param scope 'app' | 'pages/index/index' ...
 * @param eventName 'onShow', 'onHide', ....
 * @param callback
 */
export function tap(scope: 'app' | 'page' | 'request' | string, eventName: string, callback) {
  switch (scope) {
    case 'app':
      event.on('app:' + eventName, callback);
      break;
    case 'page':
      event.on('page:' + eventName, callback);
      break;
    case 'request':
      if (eventName) {
        event.on('request:' + eventName, callback);
      } else {
        event.on('request', callback);
      }
      break;
    default:
      event.on('page@' + scope + ':' + eventName, callback);
      break;
  }
}

/**
 * 取消监听
 * @param scope 'app' | 'pages/index/index' ...
 * @param eventName 'onShow', 'onHide', ....
 * @param callback 可选，为空则该事件下的回调全部取消
 */
export function off(scope: 'app' | 'page' | 'request' | string, eventName: string, callback?) {
  switch (scope) {
    case 'app':
      event.off('app:' + eventName, callback);
      break;
    case 'page':
      event.off('page:' + eventName, callback);
      break;
    case 'request':
      if (eventName) {
        event.off('request:' + eventName, callback);
      } else {
        event.off('request', callback);
      }
      break;
    default:
      event.off('page@' + scope + ':' + eventName, callback);
      break;
  }
}

// 防止重复挂载
if (!App.__minitaped) {
  proxyApp();
  proxyPage();
  proxyRequest();
  App.__minitaped = true;
}

export default tap;
