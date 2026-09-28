import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://');

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@lud.la" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TEMPORARY: Allow all logins for UI testing
        if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
          return {
            id: "mock-id-123",
            email: credentials?.email,
            name: "Test Admin",
            role: "Admin",
            accessToken: "mock-token-123",
          } as any;
        }

        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
          const res = await fetch(`${API_URL}/api/v1/auth/login`, {
            method: 'POST',
            body: new URLSearchParams({
              username: credentials?.email || "",
              password: credentials?.password || "",
              grant_type: 'password'
            }),
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded",
              "Bypass-Tunnel-Reminder": "true" 
            }
          });
          
          if (res.status === 401) {
            throw new Error("INVALID_CREDENTIALS");
          }
          
          if (!res.ok) {
            throw new Error(`AUTH_SERVER_ERROR_${res.status}`);
          }
          
          const tokenData = await res.json();
          const accessToken = tokenData.access_token;
          
          const meRes = await fetch(`${API_URL}/api/v1/auth/me`, {
            headers: { 
              "Authorization": `Bearer ${accessToken}`,
              "Bypass-Tunnel-Reminder": "true"
            }
          });
          
          if (!meRes.ok) {
            throw new Error("PROFILE_FETCH_FAILED");
          }
          
          const user = await meRes.json();
          
          return {
            id: user.user_id,
            email: user.email,
            name: user.name || user.email,
            role: user.role,
            accessToken: accessToken
          } as any;
        } catch (error: any) {
          console.error("Auth error:", error?.message || error);
          if (error?.message?.includes("fetch failed") || error?.cause?.code === "ECONNREFUSED") {
            throw new Error("BACKEND_OFFLINE");
          }
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: "/en/login"
  },
  cookies: {
    sessionToken: {
      name: useSecureCookies ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        // By omitting maxAge, it becomes a Session Cookie (expires on browser close)
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
