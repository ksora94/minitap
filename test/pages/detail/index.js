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
  tap('pages/detail/index', methodName, (data) => {
    console.log('detail:'+methodName, data);
  })
});

Page({
  data: {},
  onLoad() {

  }
});
