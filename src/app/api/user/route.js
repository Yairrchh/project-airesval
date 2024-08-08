'use server'

import { getSession } from 'next-auth/react';

export async function GET(req) {
    try {
        const session = await getSession({ req });

        if (session) {
            // Si hay una sesión, devolver la información del usuario
            return new Response(JSON.stringify({
                email: session.user.email,
                name: session.user.name,
                typeOfUser: session.user.typeOfUser,
            }), { status: 200 });
        } else {
            // Si no hay sesión, devolver un error
            return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
        }
    } catch (error) {
        console.error('Error en el handler de user:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
    }
}