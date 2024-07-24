import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/user.model';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider(({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        // console.log(credentials.password);
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          }).select('+password');
          console.log(user);
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log(isPasswordCorrect);
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({user, account}:{user: any, account: any}) {
    //   if(account.provider === 'google' || account.provider === 'github'){
    //     try {
    //       const {email, name} = user;
    //       console.log(user);
    //       await dbConnect();
    //       const isUserExists = await UserModel.findOne({email});
    //       console.log(isUserExists, "isUserExists");
    //       if(isUserExists){
    //         return isUserExists;
    //       }
    //       const newUser = new UserModel({
    //         email,
    //         fullName: name,
    //         isVerified: true,
    //       });
    //       const res = await newUser.save();
    //       console.log(res, "res");
    //       if(res){
    //         return user;
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   // return user;
    // },
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === 'google' || account.provider === 'github') {
        try {
          const { email } = user;
          console.log(user, "user");
          await dbConnect();
          const dbUser = await UserModel.findOne({ email });
          
          if (dbUser) {
            user._id = dbUser._id;
            user.isVerified = dbUser.isVerified;
            user.username = dbUser.username;
            return true;
          } else {
            const newUser = new UserModel({
              email,
              fullName: user.name,
              isVerified: true,
            });
            const res = await newUser.save();
            if (res) {
              user._id = res._id;
              user.isVerified = res.isVerified;
              user.username = res.username;
              return true;
            }
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); 
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      return session;
    },
  },
 
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};