import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
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

        // Fetch the user from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // console.log(user);

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        // Compare the provided password with the stored hashed password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }

        return user;
      },

      //
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
    strategy: "database",
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   async session({ session, user }) {
  //     session.user.id = user.id;
  //     console.log(user.id);
  //     // session.user.role = user.role; // Add role to the session
  //     return session;
  //   },
  callbacks: {
    async session({ session, user }) {
      console.log("Session:", session); // Log session details
      return session;
    },
  },

  // // },
  // callbacks: {
  //   async session({ session, user }) {
  //     const sessionUser = await prisma.user.findUnique({
  //       where: { id: user.id },
  //       include: {
  //         accounts: true, // To include account info for provider-specific data
  //       },
  //     });

  //     // Store additional session information
  //     session.user.id = sessionUser.id;
  //     session.user.email = sessionUser.email;
  //     session.user.isAdmin = sessionUser.isAdmin;
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       token.isAdmin = user.isAdmin;
  //     }
  //     return token;
  //   },
  // },

  debug: true,
  pages: {
    // signIn: "/auth/Login",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
