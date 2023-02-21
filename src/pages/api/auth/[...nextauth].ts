import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db/pool";
import bcrypt from 'bcrypt'

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req){
                const {username, password} = credentials as {
                    username: string;
                    password: string;
                }
                if (username !== "nicole" || password !== "1234"){
                    return null
                }
                return {id: '1', name: 'nicole'}
            }
        })
    ],
    pages: {
        signIn: "/admin/login"
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) {
                return url
            }
            return baseUrl
        }
    },
    secret: process.env.SESSION_SECRET
}

export default NextAuth(authOptions)