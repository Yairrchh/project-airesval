"use client";
import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenClip, faList } from '@fortawesome/free-solid-svg-icons';
import { faUser, } from '@fortawesome/free-regular-svg-icons';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import logo from "../../../public/pngwing.png";
import Image from "next/image";
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

const navItemBase = "font-display font-semibold text-sm px-3.5 py-2 rounded-full cursor-pointer transition-colors duration-200 flex items-center gap-2";
const navItemInactive = `${navItemBase} text-steel-50 hover:bg-white/10 hover:text-brass-light`;
const navItemActive = `${navItemBase} text-ink bg-brass`;

export default function Navbar() {

  const [selectedItem, setSelectedItem] = useState<string>('');

  const router = useRouter();

  const { data: session } = useSession();

  const isSelected = (itemName: string) => selectedItem === itemName;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-steel-700 via-steel-600 to-gauge-dark border-b-2 border-brass px-6 py-2.5 shadow-md">
      <Link href="/" className="flex items-center gap-3 shrink-0">
        <Image src={logo} alt="logo" width={44} height={44} className="rounded-full bg-white/90 p-1" />
        <span className="font-display text-xl font-bold text-white">
          Aires<span className="text-brass-light">Val</span>
        </span>
        <Gauge className="w-5 h-5 text-brass-light hidden sm:block" />
      </Link>

      <ul className="flex items-center gap-1.5 sm:gap-3 flex-wrap justify-end">
        <Link href="/cpv">
          <li onClick={() => setSelectedItem('home')} className={isSelected('home') ? navItemActive : navItemInactive}>
            Panel
          </li>
        </Link>
        <Link href="/cpv/technicalSheet">
          <li onClick={() => setSelectedItem('technicalSheet')} className={isSelected('technicalSheet') ? navItemActive : navItemInactive}>
            <FontAwesomeIcon icon={faList} className="text-xs" /> Fichas Técnicas
          </li>
        </Link>
        <Link href="/cpv/newTechnicalSheet">
          <li onClick={() => setSelectedItem('newTechnicalSheet')} className={isSelected('newTechnicalSheet') ? navItemActive : navItemInactive}>
            <FontAwesomeIcon icon={faPenClip} className="text-xs" /> Nueva Ficha
          </li>
        </Link>
        <Link href="/airesval">
          <li onClick={() => setSelectedItem('airesval')} className={isSelected('airesval') ? navItemActive : navItemInactive}>
            Airesval
          </li>
        </Link>
        {
          (session as ExtendedSession)?.user?.typeOfUser === 'ADMIN' && (
            <Link href="/auth/register">
              <li onClick={() => setSelectedItem('register')} className={isSelected('register') ? navItemActive : navItemInactive}>
                <FontAwesomeIcon icon={faUser} className="text-xs" /> Registrarse
              </li>
            </Link>
          )
        }
        {session && (
          <li
            onClick={handleSignOut}
            className={`${navItemBase} text-alert-light hover:text-white hover:bg-alert/80 ml-1`}
          >
            Cerrar sesión
          </li>
        )}
      </ul>
    </nav>
  )
}
