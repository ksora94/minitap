type MTAppEvent = 'onLaunch' | 'onShow' | 'onHide' | 'onError' | 'onShareAppMessage' | 'onUnhandledRejection';

type MTPageEvent = 'onLoad' | 'onShow' | 'onReady' | 'onHide' | 'onUnload' | 'onTitleClick' | 'onPullDownRefresh' | 'onReachBottom' | 'onShareAppMessage' | 'onBack';

type MTCallback = (...args: any[]) => any;

export declare function tap(scope: 'app', eventName: MTAppEvent, callback: MTCallback);

export declare function tap(scope: string, eventName: MTPageEvent, callback: MTCallback);

export declare function off(scope: 'app', eventName: MTAppEvent, callback?: MTCallback);

export declare function off(scope: string, eventName: MTPageEvent, callback?: MTCallback);

export default tap;
