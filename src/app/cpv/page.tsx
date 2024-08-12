'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars , faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import Image from "next/image";
// import { useSession, Session } from 'next-auth/react';
import logo from "../../../public/cvp.png";


interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  typeOfUser?: string | null;
}

interface ExtendedSession {
  user?: ExtendedUser;
}

export default function Layout() {

  const { data: session } = useSession();


//      const { data: sessionData } = useSession();
//       const [session, setSession] = useState<Session | null>(null)

//     useEffect(() => {
//     setSession(sessionData);
//   }, [sessionData]);

    return (
        <main className="flex items-center justify-center gap-20">
            <div className="mt-16">
                  <Image src={logo} alt="logo" width={500} height={500} />         
            </div>
            <div className="flex flex-col gap-x-10 text-5x1 gap-16 mt-16">
                {
                    ((session as ExtendedSession)?.user?.typeOfUser === 'ADMIN' || (session as ExtendedSession)?.user?.typeOfUser === 'EDITOR') && (
                    <Link href="/cpv/newTechnicalSheet" >
                        <div className="bg-blue-300 rounded-lg flex items-center justify-center p-5 gap-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300">
                        <FontAwesomeIcon icon={faPlus} />
                        <p> Nueva Ficha técnica</p>
                        </div>
                    </Link>
                    ) 
                }
                <Link href="/cpv/technicalSheet">
                    <div className="bg-blue-300 rounded-lg flex items-center justify-center p-5 gap-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300">
                        <FontAwesomeIcon icon={faBars} />
                        <p>Fichas Técnicas</p>
                    </div>
                </Link>
            </div>
        </main>
    )
}