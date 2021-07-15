Page({
  data: {
    name: 'index'
  },
  onLoad() {
  },
  onShow() {
    my.request({
      url: 'https://httpbin.org/post',
      method: 'POST',
      data: {
        from: 'test miniapp'
      },
      headers:{
        'content-type':'application/json'
      },
      success: function(res) {
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    });
  }
});
