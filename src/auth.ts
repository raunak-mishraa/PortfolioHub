import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from "./lib/dbConnect"
import UserModel from "./models/userModel"
import bcrypt from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // GithubProvider({
    //     clientId: process.env.GITHUB_CLIENT_ID,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    CredentialProvider({
        name:"credentials",
        credentials:{
            email: {label: "Email", type: "email"},
            password: {label: "Password", type: "password"}
        },
        async authorize(credentials: any): Promise<any>{
            await dbConnect();
            try {
                const { email, password } = credentials;
                console.log("creade",credentials)
                if (!email || !password) {
                    throw new CredentialsSignin("Please enter your email and password");
                }
                const user = await UserModel.findOne({
                    $or: [
                        {email: credentials.email},
                        {username: credentials.username}
                    ]
                }).select("+password");
                if (!user) {
                    throw new CredentialsSignin('No user found with this email or username')
                  }
                if (!user.isVerified) {
                    throw new CredentialsSignin('Please verify your account before logging in')
                }
                const isPasswordCorrect = await bcrypt.compare(credentials.password,
                    user.password);
                if (isPasswordCorrect) {
                  return user;
                } else {
                  throw new CredentialsSignin('Incorrect password')
                }
                // return {email: user.email, username: user.username, id: user._id}
            } catch (error:any) {
                throw new Error(error);
            }
        }
    })
  ],
  pages: {
    signIn:'/signin',
  }
})
