"use client";
import React,{useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars , faRotate, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { faUser, } from '@fortawesome/free-regular-svg-icons';
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from 'primereact/skeleton';        
import Link from "next/link";
import logo from "../../../public/pngwing.png";
import Image from "next/image";

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  typeOfUser?: string | null;
}

interface ExtendedSession {
  user?: ExtendedUser;
}


export default function Navbar() {

  const [selectedItem, setSelectedItem] = useState<string>('');

    const [isLoading, setIsLoading] = useState(true);


  const { data: session } = useSession();

  const isSelected = (itemName: string) => selectedItem === itemName;

  const activeStyle = 'underline underline-offset-8 rounded-sm bg-green-200 p-0.5'

    useEffect(() => {
    // Simula la carga de datos con un temporizador
    const loadData = async () => {
      // Aquí iría tu lógica de carga de datos
      // Por ejemplo, cargar datos de una API
      setTimeout(() => {
        setIsLoading(false); // Cambia isLoading a false una vez que los datos estén cargados
      }, 500); // Simula un retraso de 2 segundos
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
          <nav className="flex justify-between bg-sky-200">
            <ul>
              <div className="ml-6 m-2">
                <Skeleton shape="circle" size="5rem"></Skeleton>
              </div>
            </ul>
            <ul></ul>
            <ul className="flex items-center justify-center gap-10 mr-10 text-lg">
                <Skeleton width="5rem" className="mb-2"></Skeleton>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
              <li></li>
            </ul>
            
        </nav>
    );
  }

    return (
        <nav className="flex justify-between bg-sky-200">
            <ul>
              <div className="ml-6 m-2">
                <Link href="/"> 
                  <Image src={logo} alt="logo" width={120} height={120} />         
                  <span className="ml-14 text-2xl font-sans font-bold text-blue-950">Aires<span className="text-blue-400">Val</span></span>
                </Link>
              </div>
            </ul>
            <ul></ul>
            <ul className="flex items-center justify-center gap-10 mr-10 text-lg">
                <Link href="/cpv">
                  <li onClick={() => setSelectedItem('home')} 
                    className={isSelected('home') ? 'rounded-lg bg-blue-400/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer' : 'rounded-lg bg-blue-300/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer'}>
                    CPV <FontAwesomeIcon icon={faAngleDown} />
                  </li>
                </Link>
                <Link href="/airesval">
                  <li onClick={() => setSelectedItem('airesval')} className={isSelected('airesval') ? 'rounded-lg bg-blue-400/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer' : 'rounded-lg bg-blue-300/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer'} >
                    Airesval
                  </li>
                </Link>
                {
                    (session as ExtendedSession)?.user?.typeOfUser === 'ADMIN' && (
                  <Link href="/auth/register">
                    <li onClick={() => setSelectedItem('register')} className={isSelected('register') ? 'rounded-lg bg-blue-400/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer' : 'rounded-lg bg-blue-300/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer'}>
                      Registrarse <FontAwesomeIcon icon={faUser} />
                    </li>
                  </Link>
                    ) 
                }
                    {session && (
                      <li
                        onClick={() => signOut()}
                        className="rounded-lg bg-red-400/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer"
                      >
                        Cerrar sesión
                      </li>
                    )}
              <li></li>
            </ul>
            
        </nav>
    )
}