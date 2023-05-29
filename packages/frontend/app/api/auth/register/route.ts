import { client } from "@/utils/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export default async function handler(Request: Request) {
  try {
    const { email, password, name } = await Request.json();
    if (!email || !password || !name) {
      return new NextResponse("Invalid credentials", {
        status: 400,
      });
    }
    const user = await client("auth/register", {
      data: {
        email,
        name,
        password,
      },
    });
    if (!user) {
      return new NextResponse("Invalid credentials", {
        status: 400,
      });
    }
    return NextResponse.json(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("register POST", error);
    return new NextResponse(error.message, {
      status: 400,
    });
  }
}
export { handler as POST };
