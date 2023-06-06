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
  user: Omit<User, "accessToken" | "id">,
  token: string
) => {
  const updatedUser = await client("user/update", {
    token,
    method: "PATCH",
    data: {
      ...user,
    },
  });
  return updatedUser;
};
