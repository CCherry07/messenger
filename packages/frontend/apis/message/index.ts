import { client } from "@/utils/client";

export const getMessagesByConversationId = async (
  conversationId: string,
  token: string
) => {
  return await client(`message/conversationId`, {
    token,
    data: {
      conversationId,
    },
    method: "POST",
  });
};

export const sendMessage = async (
  data: Record<string, unknown>,
  token: string
) => {
  return await client(`message`, {
    token,
    data,
    method: "POST",
  });
};
