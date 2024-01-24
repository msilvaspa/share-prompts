import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user!.email,
      });
      session.user!._id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }: any): Promise<any> {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile!.email });
        if (!userExists) {
          const username = profile!.name!.replaceAll(" ", "").toLowerCase();
          await User.create({
            email: profile!.email,
            username,
            image: profile!.picture,
          });
        }
        return true;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
