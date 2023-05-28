import { client } from "@/utils/client";

// 根据userId获取会话信息
interface GetConversationParams {
  userId: number;
  isGroup?: boolean;
  members?: number[];
  name?: string;
}

export const getSesssionConversation = async (
  params: GetConversationParams,
  token: string
) => {
  return await client(`conversation`, {
    token,
    data: {
      ...params,
    },
  });
};

export const createConversation = async (params: GetConversationParams) => {
  const { data } = await client(`/conversation`, {
    data: {
      ...params,
    },
  });
  return data;
};
