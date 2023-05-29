import { client } from "@/utils/client";

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

export const getConversationById = async (
  conversationId: string,
  token: string
) => {
  return await client(`conversation/${conversationId}`, {
    token,
    method: "POST",
  });
};
