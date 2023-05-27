import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/shared/types";
const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = (await getServerSession(req, res, authOptions)) as {
      user: User;
    };
    const jwtToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (session?.user?.email) {
      return {
        ...session.user,
        accessToken: jwtToken!.accessToken as string,
      };
    }
    return null;
  } catch (err: any) {
    return null;
  }
};

export default getCurrentUser;
