
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
//import { authOptions } from '../app/api/auth/[...nextauth]/route'; // Asegúrate de importar correctamente

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   // Redirige a la página de inicio de sesión si no hay sesión
  //   redirect('/auth/login');
  // }

  // Si hay una sesión, puedes renderizar el contenido de la página principal
  return <h1>Bienvenido a la aplicación</h1>;
}

