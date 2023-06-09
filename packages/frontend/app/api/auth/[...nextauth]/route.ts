import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProviders from "next-auth/providers/github";
import GoogleProviders from "next-auth/providers/google";
import { client } from "@/utils/client";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    name: string;
    image: string;
    accessToken: string;
  }
  interface Session {
    user: User;
  }
}

export const authOptions: AuthOptions = {
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
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        // login
        const user = await client("auth/login", {
          data: credentials,
        });
        if (!user || !user?.token) {
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
  callbacks: {
    async session({ session, token }) {
      if (token?.accessToken) {
        session.user = {
          ...session.user,
          accessToken: token.accessToken as string,
          id: token.id ?? token.sub ?? null,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.token;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
