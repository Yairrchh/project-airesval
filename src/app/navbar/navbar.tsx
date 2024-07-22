"use client";
import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars , faRotate, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { faUser, } from '@fortawesome/free-regular-svg-icons';

import Link from "next/link";
import logo from "../../../public/pngwing.png";
import Image from "next/image";


export default function Navbar() {

  const [selectedItem, setSelectedItem] = useState<string>('');

  const isSelected = (itemName: string) => selectedItem === itemName;

  const activeStyle = 'underline underline-offset-8 rounded-sm bg-green-200 p-0.5'

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
                <Link href="/">
                  <li onClick={() => setSelectedItem('airesval')} className={isSelected('airesval') ? 'rounded-lg bg-blue-400/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer' : 'rounded-lg bg-blue-300/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer'} >
                    Airesval
                  </li>
                </Link>
                <Link href="/login">
                  <li onClick={() => setSelectedItem('login')} className={isSelected('login') ? 'rounded-lg bg-blue-400/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer' : 'rounded-lg bg-blue-300/80 p-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300 cursor-pointer'}>
                    Login <FontAwesomeIcon icon={faUser} />
                  </li>
                </Link>
              <li></li>
            </ul>
            
        </nav>
    )
}