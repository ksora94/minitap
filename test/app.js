import tap from './minitap.min'

tap('app', 'onLaunch', function () {
  console.log('onLaunch');
});

tap('app', 'onShow', function () {
  console.log('onShow', this);
});

tap('app', 'onHide', function () {
  console.log('onHide');
});

tap('app', 'onError', function () {
  console.log('onError');
});

tap('app', 'onShareAppMessage', function () {
  console.log('onShareAppMessage');
});

tap('app', 'onUnhandledRejection', function () {
  console.log('onUnhandledRejection');
});

tap('page', 'onShow', function (params) {
  console.log('%cpage: onShow', 'color:#0e2;', params, this)
})

tap('request', null, function (dur, config) {
  console.log('request', dur, config);
})

tap('request', 'https://httpbin.org/post', function (dur, config) {
  console.log('request:https://httpbin.org/post', dur, config);
})

App({
  onLaunch(options) {
  },
  onShow(options) {
  },
});
