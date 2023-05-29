import { client } from "@/utils/client";

// 根据userId获取会话信息
interface GetConversationParams {
  userId: number;
  currentUserId: number;
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

export const getConversationsByUserId = async (
  userId: number,
  token: string
) => {
  return await client(`conversation/user`, {
    token,
    data: {
      userId,
    },
  });
};
