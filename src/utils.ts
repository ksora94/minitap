export const event = {
  $: {},
  on(name, callback) {
    event.$[name] = event.$[name] || [];
    event.$[name].push(callback)
  },
  off(name, callback?) {
    if (event.$[name]) {
      if (callback) {
        event.$[name].splice(event.$[name].indexOf(callback), 1);
      } else {
        event.$[name] = [];
        delete event.$[name];
      }
    }
  },
  trigger(name, ...args) {
    if (event.$[name]) {
      return event.$[name].map(handler => handler.apply(this, args))
    }
  }
}

export const createProxy = function () {
  try {
    if (Proxy) {
      return function (target, callback) {
        return new Proxy(target, {
          apply(func, that, params) {
            return callback.call(that, func, params);
          }
        })
      }
    } else {
      throw new Error('Proxy not exist');
    }
  } catch (e) {
    return function (target, callback) {
      return function (...params) {
        return callback.call(this, target, params);
      }
    }
  }
}();

export function now() {
  return +new Date();
}
