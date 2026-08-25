"use client";

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Gauge from "../../components/Gauge";

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

    return (
        <div className='min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center bg-paper px-4 py-10'>
            <div className='w-full max-w-sm'>
                <div className='card-panel border-t-4 border-t-brass px-8 py-9'>
                    <div className='flex items-center gap-2 mb-1'>
                        <Gauge className='w-6 h-6 text-steel-700' needleDeg={20} />
                        <span className='field-label !mb-0'>Alta de personal</span>
                    </div>
                    <h1 className='font-display font-semibold text-2xl text-steel-700 mb-6'>Registro de usuario</h1>

                    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                        <div>
                            <label htmlFor='username' className='field-label'>Nombre de usuario</label>
                            <input type="text" placeholder='usuario' className='field-input'
                        {...register("userName", {required: {
                            value: true,
                            message: 'Este campo es requerido'
                        }})}/>
                            {
                                errors.userName && typeof errors.userName.message === 'string' &&
                                (<span className='text-alert text-xs font-medium mt-1 block'>{errors.userName.message}</span>)
                            }
                        </div>
                        <div>
                            <label htmlFor='email' className='field-label'>Email</label>
                            <input type="email" placeholder='nombre@ejemplo.com' className='field-input'
                        {...register("email", {required: {
                            value: true,
                            message: 'Este campo es requerido'
                        }})}/>
                            {
                                errors.email && typeof errors.email.message === 'string' &&
                                (<span className='text-alert text-xs font-medium mt-1 block'>{errors.email.message}</span>)
                            }
                        </div>
                        <div>
                            <label htmlFor='password' className='field-label'>Contraseña</label>
                            <input type="password" placeholder='••••••••' className='field-input'
                        {...register("password", {required: {
                            value: true,
                            message: 'Este campo es requerido'
                        }})}/>
                            {
                                errors.password && typeof errors.password.message === 'string' &&
                                (<span className='text-alert text-xs font-medium mt-1 block'>{errors.password.message}</span>)
                            }
                        </div>
                        <div>
                            <label htmlFor='confirmPassword' className='field-label'>Confirmar contraseña</label>
                            <input type="password" placeholder='••••••••' className='field-input'
                        {...register("confirmPassword", {required: {
                            value: true,
                            message: 'Este campo es requerido'
                        }})}/>
                            {
                                errors.confirmPassword && typeof errors.confirmPassword.message === 'string' &&
                                (<span className='text-alert text-xs font-medium mt-1 block'>{errors.confirmPassword.message}</span>)
                            }
                        </div>
                        <div>
                            <label htmlFor='typeOfUser' className='field-label'>Tipo de usuario</label>
                            <select className='field-input font-sans'
                        {...register("typeOfUser", {required: {
                            value: true,
                            message: 'Este campo es requerido'
                        }})}>
                            <option value="ADMIN">Admin</option>
                            <option value="EDITOR">Editor</option>
                            <option value="VIEWER">Viewer</option>
                        </select>
                        </div>
                        <button className='btn-primary w-full mt-2' type='submit'>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
