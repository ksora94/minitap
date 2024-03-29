type MTAppEvent = 'onLaunch' | 'onShow' | 'onHide' | 'onError' | 'onUnhandledRejection';

type MTPageEvent = 'onLoad' | 'onShow' | 'onReady' | 'onHide' | 'onUnload' | 'onTitleClick' | 'onPullDownRefresh' | 'onReachBottom' | 'onBack';

type MTCallback = (...args: any[]) => any;

type RequestConfig = {
  url: string,
  method?: string,
  headers: any,
  [key: string]: any
}

export declare function tap(scope: 'app', eventName: MTAppEvent, callback: MTCallback);

export declare function tap(scope: 'page' | string, eventName: MTPageEvent, callback: MTCallback);

export declare function tap(scope: 'request', eventName: string | null, callback: (dur: number, config: RequestConfig, data: any) => void);

export declare function off(scope: 'app', eventName: MTAppEvent, callback?: MTCallback);

export declare function off(scope: 'page' | string, eventName: MTPageEvent, callback?: MTCallback);

export declare function off(scope: 'request', eventName?: string | null, callback?: (dur: number, config: RequestConfig) => void);

export default tap;
