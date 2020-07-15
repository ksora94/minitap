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

tap('page', 'onShow', function () {
  console.log('page: onShow', this)
})

App({
  onLaunch(options) {
  },
  onShow(options) {
  },
});
