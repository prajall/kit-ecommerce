//@ts-nocheck
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";

interface user {
  email: string;
  password?: string;
  image?: string;
}

const config: NextAuthConfig = {
  providers: [
    google,
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (
          credentials.email == "prajalmhrzn@gmail.com" &&
          credentials.password == "password"
        ) {
          return { email: "prajalmhrzn@gmail.com" };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: { email: true },
          });
          console.log(user);

          if (!user) {
            throw new Error("no existing user");
          } else {
            return { id: user.id, email: user.email };
          }
        } catch (error) {
          console.error("Login error:", error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      try {
        const existingUser = await prisma.user
          .findUnique({ where: { email: user.user.email } })
          .catch((err) => {
            console.log("error checking user: ", err);
          });
        console.log("existingUser: ", existingUser);

        if (!existingUser) {
          console.log("no existingUser Creating new user");

          try {
            const newUser = prisma.user.create({
              data: {
                email: user.user.email,
                // name: user.user.name,
                image: user.user.image,
              },
            });
            console.log("new Google user created: ", newUser);
            return { email: user.user.email, name: user.user.name };
          } catch (err) {
            console.log("/auth Error Creating new user: ", err);
          }
        }
      } catch (err) {
        console.log("/auth Error Signing: ", err);
      }

      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
