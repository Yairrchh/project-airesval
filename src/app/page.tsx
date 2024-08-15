'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner';
        

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 1500); // 3000 milisegundos = 3 segundos

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [status, router]);

 // Si hay una sesión, puedes renderizar el contenido de la página principal
  return (
    <div className='flex items-center justify-center h-[calc(100vh-15rem)]'>
      <ProgressSpinner />
    </div>
  )
}

