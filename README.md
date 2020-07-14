# minitap
劫持支付宝小程序原生对象通用库,适用于原生小程序以及所有第三方小程序框架

## Examples
### App
```javascript
import tap from 'minitap'

tap('app', 'onLaunch', function () {
  console.log('onLaunch');
});

App({
  onLaunch(options) {
  },
  onShow(options) {
  },
});
```

### Page
```javascript
import tap from 'minitap'

tap('pages/detail/index', 'onShow', (data) => {
    console.log('detail:onShow', data);
})

Page({
  data: {},
  onLoad() {

  }
});
```

## API

### 监听原生对象方法
> tap(scope, eventName, callback)
 * scope: 'app' | 'pages/index/index' ...
 * eventName: 'onShow', 'onHide', ....
 * callback
 
### 取消监听
> off(scope, eventName, callback?)
* scope: 'app' | 'pages/index/index' ...
* eventName: 'onShow', 'onHide', ....
* callback(optional)
