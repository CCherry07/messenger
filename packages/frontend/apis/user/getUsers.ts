import { client } from "@/utils/client";
const getUsers = async (email: string, token: string) => {
  const users = await client("user/users", {
    token,
    data: {
      email,
    },
  });
  return users;
};

export default getUsers;
