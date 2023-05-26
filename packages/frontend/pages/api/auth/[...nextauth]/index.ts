import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProviders from "next-auth/providers/github";
import GoogleProviders from "next-auth/providers/google";

import { client } from "@/utils/client";

export const authAction: AuthOptions = {
  providers: [
    GithubProviders({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProviders({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email || credentials?.password) {
          throw new Error("Missing credentials");
        }
        // login
        const user = await client("auth/login", {
          data: credentials,
        });
        if (!user || !user?.hashPassword) {
          throw new Error("Invalid credentials");
        }
        // check password is valid
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.hashPassword
        );
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authAction);

export default handler;

export { handler as GET, handler as POST };
