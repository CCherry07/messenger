import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";

// import { useNotification } from 'components/Message';

// const showNotification = useNotification();

// // 请求队列
// const pendingRequestMap = new Map();

type RequestConfig = AxiosRequestConfig;

// function createPendingKey(config: RequestConfig) {
//   const { url, method, params, data } = config
//   const stringifyData = (typeof data === 'string') ? JSON.parse(data) : JSON.stringify(data)
//   return [url, method, JSON.stringify(params), stringifyData].join('&')
// }

// function appendPendingKey(config: RequestConfig) {
//   const pendingKey = createPendingKey(config)
//   config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
//     if (!pendingRequestMap.has(pendingKey)) {
//       pendingRequestMap.set(pendingKey, cancel);
//     }
//   });
// }

// function removePending(config: RequestConfig) {
//   const pendingKey = createPendingKey(config);
//   if (pendingRequestMap.has(pendingKey)) {
//     const cancelRequest = pendingRequestMap.get(pendingKey);
//     cancelRequest(pendingKey);
//     pendingRequestMap.delete(pendingKey);
//   }
// }

function handleHttpErrorStatus(error: any) {
  if (axios.isCancel(error))
    return console.error("请求的重复请求：" + error.message);
  let message = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "接口重定向了！";
        break;
      case 400:
        message = "参数不正确！";
        break;
      case 401:
        message = "您未登录，或者登录已经超时，请先登录！";
        break;
      case 403:
        message = "您没有权限操作！";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = "请求超时！";
        break;
      case 409:
        message = "系统已存在相同数据！";
        break;
      case 500:
        message = "服务器内部错误！";
        break;
      case 501:
        message = "服务未实现！";
        break;
      case 502:
        message = "网关错误！";
        break;
      case 503:
        message = "服务不可用！";
        break;
      case 504:
        message = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        message = "HTTP版本不受支持！";
        break;
      default:
        message = "异常问题，请联系管理员！";
        break;
    }
  }
  if (error.message.includes("timeout")) message = "网络请求超时！";
  if (error.message.includes("Network"))
    message = window.navigator.onLine ? "服务端异常！" : "您断网了！";
  // showNotification('error', message)
  return {
    type: "error",
    message,
  };
}
export interface CustomOptions {
  CANCEL_REPEAT_REQUEST?: boolean;
  OPEN_THE_ERROR_HANDLE?: boolean;
  REDACT_DATA_FORMAT?: boolean;
  handleOwnResponse?: (
    response: AxiosResponse<any, any>,
    removePending: (config: RequestConfig) => void
  ) => unknown;
}
export function createRequest(
  config: CreateAxiosDefaults,
  customOptions: CustomOptions
) {
  const {
    CANCEL_REPEAT_REQUEST,
    OPEN_THE_ERROR_HANDLE = true,
    REDACT_DATA_FORMAT: REDACT_DATA_FORMAT = true,
    handleOwnResponse,
  } = customOptions;
  const serve = axios.create(config);
  // 请求拦截
  serve.interceptors.request.use(
    (config) => {
      if (config.data && config.data instanceof FormData) {
        return config;
      }
      // CANCEL_REPEAT_REQUEST && removePending(config);
      // CANCEL_REPEAT_REQUEST && appendPendingKey(config);
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  // 响应拦截
  serve.interceptors.response.use(
    (response) => {
      if (handleOwnResponse) {
        // return handleOwnResponse(response, removePending)
      }
      // removePending(response.config);
      return REDACT_DATA_FORMAT ? response.data : response;
    },
    (error) => {
      // error.config && removePending(error.config);
      return Promise.reject(
        OPEN_THE_ERROR_HANDLE ? handleHttpErrorStatus(error) : error
      );
    }
  );
  return serve;
}
