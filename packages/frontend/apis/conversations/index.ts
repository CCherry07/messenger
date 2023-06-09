import { client } from "@/utils/client";

interface GetConversationParams {
  userId?: number;
  name?: string;
  isGroup?: boolean;
  members?: number[];
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

export const updateSeenWithConversationId = async (
  conversationId: number,
  token: string
) => {
  return await client(`conversation/${conversationId}/seen`, {
    token,
    method: "POST",
  });
};

export const deleteConversationById = async (
  conversationId: number,
  token: string
) => {
  return await client(`conversation/${conversationId}`, {
    token,
    method: "DELETE",
  });
};
