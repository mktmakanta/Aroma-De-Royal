import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Assuming you have this set up
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("No user found with the provided email.");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
<<<<<<< HEAD
    strategy: "database", //
=======
    strategy: "database",
>>>>>>> a086eb6a3276c656cdfd1b46457e3e5ffe55a5e7
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
<<<<<<< HEAD
      if (user) {
        session.user.id = token.id as string;
=======
      const dbUser = await prisma.user.findUnique({
        where: { email: user?.email },
        select: { role: true },
      });
      if (dbUser) {
        session.user.role = dbUser.role || "user";
>>>>>>> a086eb6a3276c656cdfd1b46457e3e5ffe55a5e7
      }
      // console.log(session);

      return session;
    },
<<<<<<< HEAD
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
  },
  debug: true,
  // pages: {
  //   // signIn: "/auth/Login",
  //   // signOut: "/auth/signout",
  //   // error: "/auth/error", // Error code passed in query string as ?error=
  //   // verifyRequest: "/auth/verify-request", // (used for check email message)
  //   // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
=======

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
  // debug: true,
  pages: {
    // signIn: "/auth/Login",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: "/auth/new-user", // New users will be redirected here
  },
>>>>>>> a086eb6a3276c656cdfd1b46457e3e5ffe55a5e7
});
