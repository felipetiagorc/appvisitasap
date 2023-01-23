import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  /**
 *   ...
callbacks: {
    jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token
    },
    session: async ({ session, token }) => {
        session.user = token.user
        return session
    }
}
...

 */
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
        image: user.image
      }
    })
  }
};

export default NextAuth(authOptions);
