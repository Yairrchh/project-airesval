import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "app/lib/db";
import bcrypt from "bcrypt";
import { signIn, signOut } from "next-auth/react";

const authOptions = {
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    email : { label: "Email", type: "email", placeholder: "email" },
                    password: { label: "Password", type: "password", placeholder: "password" }
                },
                async authorize(credentials, req) {
                    console.log(credentials)

                    const userFound = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        }
                    })

                    if (!userFound) {
                        throw new Error("Usuario no encontrado")
                    }

                    console.log('console.log de route',userFound)

                    const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

                    if (!matchPassword) {
                        throw new Error("Password incorrecto")
                    }

                    return {
                        id: userFound.id,
                        email: userFound.email,
                        name: userFound.userName,
                        typeOfUser: userFound.typeOfUser,
                    }
                }
            })
        ],
        secret:process.env.SECRET,
        pages: {
            signIn: '/auth/login',
        },
          callbacks: {
            async jwt({ token, user }) {
            if (user) {
                token.typeOfUser = user.typeOfUser;
            }
            return token;
            },
            async session({ session, token }) {
            if (token) {
                session.user.typeOfUser = token.typeOfUser;
            }
            return session;
            }
        }       
    }


    const handler = NextAuth(authOptions)

    export { handler as GET, handler as POST}