import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'
import prisma from "app/lib/db";

export async function POST(request) {

    try {
            const data = await request.json()

    const userFound = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    })

    if(userFound) {
        return NextResponse.json({
            message: "El correo ya esta registrado",
        }, {
            status: 400
        })
    }

        const userNameFound = await prisma.user.findUnique({
        where: {
            userName: data.userName,
        }
    })

    if(userNameFound) {
        return NextResponse.json({
            message: "El Usuario ya esta registrado",
        }, {
            status: 400
        })
    }

    console.log(data);

   const hashedPassword = data.password = await bcrypt.hash(data.password, 10)

   const newUser = await prisma.user.create({
    data :{
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
        typeOfUser: data.typeOfUser,
    }
   })

   const {password: _, ...user} = newUser

    return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Error al registrar el usuario",
        }, {
            status: 500
        })
    }

}