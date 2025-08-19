import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL_API}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });

                    const response = await res.json();

                    if (res.ok && response) {
                        return {
                            access_token: response.access_token,
                            id: response.user.id,
                            email: response.user.email,
                            name: response.user.name,
                            avatarUrl: response.user.avatarUrl || null,
                            isEmailVerified: response.user.isEmailVerified,
                            provider: response.user.provider || "credentials",
                            providerId: response.user.providerId,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile, user }: any) {
            if (account.provider === "google") {
                const data = {
                    email: profile.email,
                    name: user.name,
                    image: user.image || null,
                    providerId: account.providerAccountId,
                };

                const res = await fetch(`${process.env.BACKEND_URL_API}/auth/social-login/${account.provider}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const response = await res.json();
                user.access_token = response.access_token;
                user.id = response.user.id;
                user.email = response.user.email;
                user.name = response.user.name;
                user.image = response.user.image || null;
                user.isEmailVerified = response.user.isEmailVerified;
                user.provider = response.user.provider;
                user.providerId = response.user.providerId;
            }

            return true;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.access_token = user.access_token;
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                user.image = user.image || null;
                token.isEmailVerified = user.isEmailVerified;
                token.provider = user.provider;
                token.providerId = user.providerId;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.access_token = token.access_token;

            session.user = {
                id: token.id,
                email: token.email,
                name: token.name,
                image: session.user.image,
                isEmailVerified: token.isEmailVerified,
                provider: token.provider,
                providerId: token.providerId,
            };

            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",

    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };