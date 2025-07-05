import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateOTP } from "./server-actions";

const locale = "ar";

export class AuthError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export const {
  handlers: { POST, GET },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: `/${locale}/login`,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const userId: any = credentials.userId;
        const otp: any = credentials.otp;
        const remember: any = credentials.remember === "true";

        const user = await validateOTP({ otp, userId });

        const maxAge = remember ? 7 * 24 * 60 * 60 : 1 * 60 * 60; // 7 days or 1 hour

        if (user?.succeeded) {
          return { ...user?.data, maxAge, remember };
        } else {
          throw new AuthError(user?.message || "حدث خطأ ما");
        }

        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // Default maxAge, 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.maxAge = user.maxAge;
        token.iat = Math.floor(Date.now() / 1000);
        // @ts-ignore
        token.exp = token.iat + token.maxAge;
      }

      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      // @ts-ignore
      session.user = token;
      // @ts-ignore
      session.maxAge = token.maxAge;
      // @ts-ignore
      session.expires = new Date(token.exp * 1000).toISOString();

      return session;
    },

    async authorized({ auth, request: { nextUrl } }: any) {
      return true;
    },
  },
});
