// import { QueryCache } from "react-query";
import { useSession } from "next-auth/react";
import React from "react";
// 获取环境变量

const apiURL = process.env.NEXT_PUBLIC_API_URL;
interface ClientParameter extends RequestInit {
  data: Record<string, unknown>;
  token: string;
  headers: HeadersInit;
  customHeaders: HeadersInit;
}

export async function client(
  endpoint: string,
  {
    data,
    token,
    headers: customHeaders,
    ...customConfig
  }: Partial<ClientParameter> = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };
  return fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      // new QueryCache().clear();
      // refresh the page for them
      window.location.assign(window.location as unknown as string);
      return Promise.reject({ message: "Please re-authenticate." });
    }
    const data = await response.json();
    if (response.ok) {
      if (data.code !== 0) {
        return Promise.reject(data);
      }
      if (data.code === 0) {
        return data.data;
      }
      return Promise.reject(data);
    } else {
      return Promise.reject(data);
    }
  });
}

// export const useClient = () => {
//   const { data: session } = useSession();
//   const { token } = session?.user || {};
//   return React.useCallback(
//     (endpoint: string, config: Partial<ClientParameter> | undefined) =>
//       client(endpoint, { ...config, token }),
//     [token]
//   );
// };
