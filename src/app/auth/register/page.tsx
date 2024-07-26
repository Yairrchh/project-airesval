"use client";

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

    const { register, handleSubmit, formState: {errors} } = useForm();

    const router = useRouter();

    const onSubmit = handleSubmit(async(data) => {

        if(data.password !== data.confirmPassword) {
           return alert('Las contraseñas no coinciden');
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                userName: data.userName,
                email: data.email,
                password: data.password,
                typeOfUser: data.typeOfUser
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resJSON = await res.json();

        if(res.ok) {
            router.push('/auth/login');
        }

        console.log(resJSON)
    });

    console.log(errors)

    return (
        <div className='h-[calc(100vh-10rem)] flex flex-col justify-center items-center '>
            <div className='mb-2 font-bold text-4xl'>
                <h1 className='text-2xl'>Registro de Usuario</h1>
            </div>
            <form onSubmit={onSubmit} className=' mb-2 flex flex-col items-center w-1/4 border-2 border-sky-300 rounded p-4 bg-[#BAE6FD]'>
                <div>
                    <label htmlFor='username'>Nombre de usuario:</label>
                    <input type="text" placeholder='Username' className='p-1.5 rounded block mb-2 bg-white text-slate-900 focus:outline-blue-500'
                {...register("userName", {required: {
                    value: true,
                    message: 'Este campo es requerido'
                }})}/>
                </div>
                {
                    errors.userName && typeof errors.userName.message === 'string' && 
                    (<span className='text-red-500 text-xs font-bold'>*{errors.userName.message}</span>)
                }
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" placeholder='Example@gmail.com' className='p-1.5 rounded block mb-2 bg-white text-slate-900 focus:outline-blue-500'
                {...register("email", {required: {
                    value: true,
                    message: 'Este campo es requerido'
                }})}/>
                </div>
                {
                    errors.email && typeof errors.email.message === 'string' && 
                    (<span className='text-red-500 text-xs font-bold'>*{errors.email.message}</span>)
                }
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" placeholder='*******' className='p-1.5 rounded block mb-2 bg-white text-slate-900 focus:outline-blue-500'
                {...register("password", {required: {
                    value: true,
                    message: 'Este campo es requerido'
                }})}/>
                </div>
                {
                    errors.password && typeof errors.password.message === 'string' && 
                    (<span className='text-red-500 text-xs font-bold'>*{errors.password.message}</span>)
                }
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type="password" placeholder='*******' className='p-1.5 rounded block mb-2 bg-white text-slate-900 focus:outline-blue-500'
                {...register("confirmPassword", {required: {
                    value: true,
                    message: 'Este campo es requerido'
                }})}/>
                </div>
                {
                    errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && 
                    (<span className='text-red-500 text-xs font-bold'>*{errors.confirmPassword.message}</span>)
                }
                <div className='flex items-center justify-center gap-2'>
                    <label>Tipo de usuario:</label>
                    <select className='p-1 px-2 rounded block bg-white text-slate-900 border border-blue-950/35 focus:outline-blue-500'
                {...register("typeOfUser", {required: {
                    value: true,
                    message: 'Este campo es requerido'
                }})}>
                    <option value="ADMIN">Admin</option>
                    <option value="EDITOR">Editor</option>
                    <option value="VIEWER">Viewer</option>
                </select>
                </div>
            <button className='bg-blue-400/70 text-black mt-3 w-full px-5 py-2 rounded transition-transform transform-gpu hover:scale-110 ease-out duration-300' type='submit'>Registrar</button>
            </form>


        </div>
    )
}