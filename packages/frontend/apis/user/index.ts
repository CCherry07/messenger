import { User } from "shared/types";
import { client } from "@/utils/client";
export const getUsers = async (email: string, token: string) => {
  const users = await client("user/users", {
    token,
    data: {
      email,
    },
  });
  return users;
};

// update user
export const updateUser = async (
  user: Omit<User, "accessToken">,
  token: string
) => {
  const updatedUser = await client("user/update", {
    token,
    data: {
      user,
    },
  });
  return updatedUser;
};
