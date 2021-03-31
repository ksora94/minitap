type MTAppEvent = 'onLaunch' | 'onShow' | 'onHide' | 'onError' | 'onUnhandledRejection';

type MTPageEvent = 'onLoad' | 'onShow' | 'onReady' | 'onHide' | 'onUnload' | 'onTitleClick' | 'onPullDownRefresh' | 'onReachBottom' | 'onBack';

type MTCallback = (...args: any[]) => any;

export declare function tap(scope: 'app', eventName: MTAppEvent, callback: MTCallback);

export declare function tap(scope: 'page' | string, eventName: MTPageEvent, callback: MTCallback);

export declare function off(scope: 'app', eventName: MTAppEvent, callback?: MTCallback);

export declare function off(scope: 'page' | string, eventName: MTPageEvent, callback?: MTCallback);

export default tap;
