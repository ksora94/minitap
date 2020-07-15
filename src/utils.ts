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
