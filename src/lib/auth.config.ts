import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import prisma from 'prisma/client';
import { comparePassword } from './utils';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const user = await prisma.Admins.findFirst({
          where:{
            email:credentials?.email as string
          }
        })
        console.log(user)
        const isPassCorrect:boolean = await comparePassword(credentials?.password as string,user.password)
        console.log(isPassCorrect)

        if (user && isPassCorrect) {
          console.log(user)
          return user;
        } else {
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn: '/' //signin page
  }
} satisfies NextAuthConfig;

export default authConfig;
