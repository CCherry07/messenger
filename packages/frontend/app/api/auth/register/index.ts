import { client } from "@/utils/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  try {
    const { email, password, name } = Request.body;

    if (!email || !password || !name) {
      return Response.status(400).json({ message: "Missing credentials" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await client("auth/register", {
      data: {
        email,
        hashPassword,
        name,
        password,
      },
    });

    if (!user) {
      return Response.status(400).json({ message: "Invalid credentials" });
    }
    return Response.status(200).json(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("register POST", error);
    return Response.status(500).json({ message: error.message });
  }
}
