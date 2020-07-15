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
    console.log('detail:'+methodName, data, this);
  })
});

Page({
  data: {
    name: 'detail'
  },
  onLoad() {

  }
});
