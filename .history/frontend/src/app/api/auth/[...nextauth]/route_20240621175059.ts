// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true, // Use JSON Web Tokens (JWT) for session management
    maxAge: 5 * 60, // Session expires after 24 hours (in seconds)
    updateAge: 5*60, // Session will be updated if still valid but within 24 hours of expiring
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
