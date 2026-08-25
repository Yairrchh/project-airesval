'use client';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import logo from "../../../public/cvp.png";
import Gauge from "../components/Gauge";


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

    return (
        <main className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 min-h-[calc(100vh-15rem)] bg-paper px-6 py-14">
            <div className="mt-2 lg:mt-0">
                  <Image src={logo} alt="logo" width={420} height={420} />
            </div>
            <div className="flex flex-col gap-5 w-full max-w-xs">
                <div className="flex items-center gap-2 text-steel-400">
                  <Gauge className="w-5 h-5" />
                  <span className="field-label !mb-0">Panel de control</span>
                </div>
                {
                    ((session as ExtendedSession)?.user?.typeOfUser === 'ADMIN' || (session as ExtendedSession)?.user?.typeOfUser === 'EDITOR') && (
                    <Link href="/cpv/newTechnicalSheet" >
                        <div className="card-panel border-l-4 border-l-brass flex items-center gap-4 px-6 py-5 hover:border-l-gauge hover:-translate-y-0.5 transition-all duration-200 group">
                          <FontAwesomeIcon icon={faPlus} className="text-brass text-xl group-hover:text-gauge transition-colors" />
                          <div>
                            <p className="font-display font-semibold text-lg text-steel-700">Nueva Ficha técnica</p>
                            <p className="text-xs text-steel-400">Registrar una inspección</p>
                          </div>
                        </div>
                    </Link>
                    )
                }
                <Link href="/cpv/technicalSheet">
                    <div className="card-panel border-l-4 border-l-gauge flex items-center gap-4 px-6 py-5 hover:border-l-brass hover:-translate-y-0.5 transition-all duration-200 group">
                        <FontAwesomeIcon icon={faBars} className="text-gauge text-xl group-hover:text-brass transition-colors" />
                        <div>
                          <p className="font-display font-semibold text-lg text-steel-700">Fichas Técnicas</p>
                          <p className="text-xs text-steel-400">Ver historial de equipos</p>
                        </div>
                    </div>
                </Link>
            </div>
        </main>
    )
}
