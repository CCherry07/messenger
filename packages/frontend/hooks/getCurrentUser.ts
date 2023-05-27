import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/shared/types";
const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = (await getServerSession(req, res, authOptions)) as {
      user: User;
    };
    if (session?.user?.email) {
      return session.user;
    }
    return null;
  } catch (err: any) {
    return null;
  }
};

export default getCurrentUser;
