import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import authenticatedBefore from "@/lib/authenticated-before";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user }: { user: User | AdapterUser }) {
      const alreadyLogged = await authenticatedBefore({
        userEmail: user.email,
      });
      if (alreadyLogged) {
        return true;
      }
      try {
        const result = await prisma.user.create({
          data: {
            id: "u" + uuidv4(),
            name: user.name || "name-error" + uuidv4() + " error",
            email: user.email || "email-error" + uuidv4() + "@error.com",
            image: user.image || "image-error" + uuidv4() + ".image",
          },
        });
        if (!result) {
          return false;
        }
        return true;
      } catch (e) {
        console.error("error", e);
        return false;
      }
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
