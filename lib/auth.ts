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
        // console.log(user.role);

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database", // Use JWT for session tokens
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      // if (user) {
      //   // session.user.id = user.id as string;
      // }
      // console.log(session);
      return session;
    },
  },
  debug: true,
  pages: {
    // signIn: "/auth/Login",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: "/auth/new-user", // New users will be redirected here
  },
});
