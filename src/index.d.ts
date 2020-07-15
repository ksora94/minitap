/**
 * 监听事件
 * @param scope 'app' | 'pages/index/index' ...
 * @param eventName 'onShow', 'onHide', ....
 * @param callback
 */
export declare function tap(scope: 'app' | 'page' | string, eventName: string, callback: any): void;
/**
 * 取消监听
 * @param scope 'app' | 'pages/index/index' ...
 * @param eventName 'onShow', 'onHide', ....
 * @param callback 可选，为空则该事件下的回调全部取消
 */
export declare function off(scope: 'app' | 'page' | string, eventName: string, callback?: any): void;
export default tap;
