import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import prisma from 'prisma/client';
import { comparePassword } from './utils';

const authConfig = {
  providers: [
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
        const user = await prisma.admins.findFirst({
          where: {
            email: credentials?.email as string
          }
        });
        console.log(user);
        const isPassCorrect: boolean = await comparePassword(
          credentials?.password as string,
          user?.password as string
        );
        console.log(isPassCorrect);

        if (user && isPassCorrect) {
          console.log(user);
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
