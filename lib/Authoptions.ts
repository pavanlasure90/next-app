import { connectMongoDB } from "../lib/mongodb";
import User from "../models/users";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},

            async authorize(credentials: any) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ]
}
