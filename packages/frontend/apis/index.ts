import { createRequest } from "./createRequest";
import { AxiosResponse, RawAxiosRequestHeaders } from "axios";
// import { useAuth } from "./auth/useAuth";
import { handleResponseCode } from "./handleResponseCode";
import NProgress from "NProgress";
const customOptions = {
  CANCEL_REPEAT_REQUEST: true,
  OPEN_THE_ERROR_HANDLE: true,
  REDACT_DATA_FORMAT: true,
} as const;
const request = createRequest(
  {
    baseURL: process.env.BASE_URL,
    timeout: 100000,
  },
  customOptions
);

interface ClientConfig {
  data?: Record<string, any>;
  token?: string;
  headers?: RawAxiosRequestHeaders;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  ownHandleResponseCode?: boolean;
  [key: string]: any;
}

type ClientResponse<D> = typeof customOptions.REDACT_DATA_FORMAT extends true
  ? {
      recode: number;
      errmsg: string;
      data: D;
    }
  : AxiosResponse<any, any>;
export async function client<D>(
  endpoint: string,
  clientConfig: ClientConfig = {}
) {
  const {
    data,
    headers: customHeaders,
    ownHandleResponseCode = false,
    ...customConfig
  } = clientConfig;
  // const { token } = useAuth() // TODO: 从本地存储中获取
  const token = "";
  const config = {
    method: data ? "POST" : "GET",
    data,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  NProgress.inc(0.2);
  return request(endpoint, config).then(async (response: any) => {
    NProgress.done();
    const { recode } = response as unknown as ClientResponse<D>;
    // if (recode === 4005) {
    //   useAuth().logout()
    //   router.push({
    //     path: '/login',
    //     replace: true,
    //   })
    // }
    if (!ownHandleResponseCode) {
      handleResponseCode(response.recode, response.errmsg);
      return response.data as typeof response.data & D;
    }
    return response as unknown as ClientResponse<D>;
  });
}
