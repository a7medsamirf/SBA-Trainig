import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkNafathStatus, loginApi } from "./server-actions";

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
        const email: any = credentials?.email;
        const password: any = credentials.password;
        const remember: any = credentials.remember === "true";

        const isNafathLogin = credentials?.isNafathLogin === "true";

        const nafathId = credentials?.nafath_id as string;
        const transId = credentials?.trans_id as string;
        const randomId = credentials?.random as number;

        let user = null;

        if (isNafathLogin) {
          user = await checkNafathStatus({
            nafath_id: nafathId,
            trans_id: transId,
            random: randomId,
          });
        } else {
          user = await loginApi({ email, password });
        }

        const maxAge = remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60; // 7 days or 1 day

        if (user?.succeeded) {
          return { ...user?.data, maxAge, remember };
        } else {
          throw new AuthError(user?.error || "حدث خطأ ما");
        }

        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt", // أو "database" لو بتستخدم DB للجلسات
    maxAge: 60 * 60 * 24 * 7, // الجلسة تظل صالحة لمدة 7 أيام
    updateAge: 60 * 60 * 24, // يتم تجديد الجلسة كل 24 ساعة
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
