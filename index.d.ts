import E from "./src";

export = Excepturer;
export as namespace Excepturer;

declare namespace Excepturer {
  type ExcepturerConfig = {
    env?: 'production' | 'development',
    rate?: number,
    allowDuplicates?: boolean,
    extra?: object | ((args?: CaptureArgs) => object),
    wrapApp?: boolean,
    mountTimeThreshold?: number
    wrapRequest?: boolean,
    requestTimeThreshold?: number,
    requestSuccess?: (response: any, request: RequestParams) => boolean,
  }

  type RequestParams = {
    data: any,
    headers: any,
    method: string,
    url: string,
    _startAt: number
  }

  type CaptureArgs = {
    type: 'syntax' | 'request' | 'other',
    msg: string,
    datetime: number,
    url: string
    [key: string]: any
  }

  function init(url: string, config: ExcepturerConfig): E

  function capture(data: CaptureArgs): void

  function clearHistory(): void
}
