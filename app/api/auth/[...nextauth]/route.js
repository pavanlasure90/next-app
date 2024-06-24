import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB(); 

          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("No user found");
          }

          // Compare hashed password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Passwords do not match");
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name 
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true 
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
