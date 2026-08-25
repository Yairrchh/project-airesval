"use client"
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from 'primereact/progressspinner';
import Gauge from "../../components/Gauge";


export default function LoginForm() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async(data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // Cambiado a true
    });




    console.log(res);

    if(res?.status === 401) {
      setError(res.error);
    } else if (res?.status === 200) {
      setError(null);
      setLoading(true);
      console.log('Inicio de sesión exitoso');
      router.push('/cpv');
    } else {
      setError('Error desconocido');
    }

  })

  if(loading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-15rem)] bg-paper'>
        <ProgressSpinner />
      </div>
    )
  }

  return (
    <div className='min-h-[calc(100vh-15rem)] flex flex-col justify-center items-center bg-paper px-4 py-10'>
      <div className='w-full max-w-sm'>
        <div className='card-panel border-t-4 border-t-brass px-8 py-9 relative'>
          <div className='flex items-center gap-2 mb-1'>
            <Gauge className='w-6 h-6 text-steel-700' needleDeg={-50} />
            <span className='field-label !mb-0'>Acceso técnico</span>
          </div>
          <h1 className='font-display font-semibold text-2xl text-steel-700 mb-6'>Inicio de sesión</h1>

          <form onSubmit={onSubmit} className='flex flex-col gap-4'>
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
              <input type="password" placeholder='••••••••••••' className='field-input'
              {...register("password", {required: {
                  value: true,
                  message: 'Este campo es requerido'
              }})}/>
              {
                errors.password && typeof errors.password.message === 'string' &&
                (<span className='text-alert text-xs font-medium mt-1 block'>{errors.password.message}</span>)
              }
            </div>

            <button className='btn-primary w-full mt-2' type='submit'>Ingresar</button>
            {
              error && <span className='text-alert text-xs font-medium text-center'>{error}</span>
            }
          </form>
        </div>
      </div>
    </div>
  );
}