import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';

import { supabase } from '@/libs/config/supabase';

export default NextAuth({
  // adapter: UpstashRedisAdapter(supabase),
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        if (req.body?.email && req.body?.password) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: String(req.body?.email),
            password: String(req.body?.password),
          });

          if (error) {
            throw new Error(error.message);
          }

          return data.user;
        } else {
          return null;
        }
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  // pages: {
  //   signIn: '/auth/sign-in',
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     const { data: dbUser } = await supabase.from('users')
  //       .select()
  //       .eq('id', user.id)
  //       .single();

  //     if (!dbUser) {
  //       token.id = user.id;
  //       return token;
  //     }

  //     return {
  //       id: dbUser.id,
  //       email: dbUser.email,
  //       name: `${dbUser.firstName} ${dbUser.lastName}`,
  //       picture: dbUser.image,
  //     };
  //   },

  //   async session({ token, session }) {
  //     if (token) {
  //       session.user.id = token.id;
  //       session.user.name = token.name;
  //       session.user.email = token.email;
  //       session.user.image = token.picture;
  //     }

  //     return session;
  //   },
  //   redirect() {
  //     return '/categories';
  //   },
  // },
});
