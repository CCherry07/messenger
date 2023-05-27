import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { client } from "@/utils/client";
import { getServerSession } from "next-auth";

const useCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    return session.user;
  }
  const user = await client("user/me", {
    token: session?.user?.token,
  });

  if (!user) {
    return null;
  }
  return user;
};

export default useCurrentUser;
