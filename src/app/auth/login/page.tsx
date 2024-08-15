"use client"
import prisma from "@/lib/db";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import config from "../../../config"

export default function LoginForm() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async(data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true, // Cambiado a true
      callbackUrl: 'https://project-airesval-production.up.railway.app/cpv', // URL de redirección
    });


    console.log(res)

    if(res?.status === 401) {
      setError(res.error);
    } else if (res?.status === 200) {
      setError(null);
      router.push('/cpv');
    } else {
      setError('Error desconocido');
    }

  })
  
  return (
    <div className='h-[calc(100vh-15rem)] flex flex-col justify-center items-center mt-5'>
      <div className="font-bold text-4xl mb-2">
        <h1 className='text-2xl'>Inicio de Sesión</h1>
      </div>
      <form onSubmit={onSubmit} className=' mb-2 flex flex-col items-center w-max-1/4 gap-3 border-2 border-sky-300 rounded px-10 py-16 bg-[#BAE6FD]'>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type="email" placeholder='Example@gmai.com' className='p-1.5 rounded block mb-2 bg-white text-slate-900 focus:outline-blue-500'
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
            <input type="password" placeholder='**************' className='p-1.5 rounded block mb-2 bg-white text-slate-900 focus:outline-blue-500'
            {...register("password", {required: {
                value: true,
                message: 'Este campo es requerido'
            }})}/>
          </div>
          {
            errors.password && typeof errors.password.message === 'string' && 
            (<span className='text-red-500 text-xs font-bold'>*{errors.password.message}</span>)
          }

            <button className='bg-blue-400/70 text-black mt-3 w-full px-5 py-2 rounded transition-transform transform-gpu hover:scale-110 ease-out duration-300' type='submit'>Login</button>
            {
              error && <span className='text-red-500 text-xs font-bold mt-2'>*{error}</span>
            }
      </form>
    </div>
  );
}