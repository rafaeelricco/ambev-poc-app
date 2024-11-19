import { UserProps } from '@/types/user'
import { NextAuthOptions, Session, User } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
   providers: [
      CredentialsProvider({
         id: 'credentials',
         name: 'Login with credentials',
         credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' }
         },
         async authorize(credentials): Promise<User | null> {
            try {
               const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/users/auth`,
                  {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                     })
                  }
               )

               const data: { user: UserProps; token: string } = await response.json()

               const user = {
                  ...{ email: credentials?.email },
                  id: data.user.id,
                  token: data.token,
                  userInfo: data.user
               }

               return user
            } catch (error) {
               console.error('Auth error on id: credentials', error)
               return null
            }
         }
      })
   ],
   pages: {
      signIn: '/home',
      error: '/error'
   },
   callbacks: {
      async jwt({ token, account, session, trigger, profile, user }) {
         if (trigger === 'update' && session) {
            return { ...token, ...session?.user }
         }

         if (account?.type === 'credentials') {
            const obj = {
               ...token,
               ...user,
               ...profile,
               ...account
            }
            return obj
         }

         return { ...token, ...user, ...profile, ...account }
      },

      async session({ token }): Promise<Session> {
         const user_infos = {
            name: token?.name,
            email: token?.email,
            token: token?.token,
            googleId: token?.googleId,
            redirectToRegister: token?.redirectToRegister || false,
            userInfo: { ...(token?.userInfo as object) }
         }
         return {
            user: { ...user_infos }
         } as Session
      }
   }
}
