import { client } from "@/utils/client";

// 根据userId获取会话信息
export const getSesssionConversation = async (id: number) => {
  const { data } = await client(`/conversation`, {
    data: {
      id,
    },
  });
  return data;
};
