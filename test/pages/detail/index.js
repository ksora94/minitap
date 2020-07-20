import tap from '../../minitap.min';

[
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onTitleClick',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onBack'
].forEach(methodName => {
  tap('pages/detail/index', methodName, function (data) {
    console.log('%cdetail:'+methodName, 'color:#02e;', data, this);
  })
});

Page({
  data: {
    name: 'detail'
  },
  onLoad() {

  }
});
