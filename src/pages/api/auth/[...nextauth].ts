import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import prisma from "@/db";

export const authOptions = {
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/users/login",
  },
  callbacks: {
    session: ({ session, token }: any) => ({
      ...session,
      user: { ...session.user, id: token.sub },
    }),
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  }
};

export default NextAuth(authOptions);
