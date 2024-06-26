// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.provider && user) {
        token.email = user.email;
        token.firstName = user.name?.split(' ')[0];
        token.lastName = user.name?.split(' ')[1];
      }
      return token;
    },
    async session({ session, token }) {
      session.user!.email = token.email;
      session.user!.name = token.firstName;
      return session;
    },
  },
});
