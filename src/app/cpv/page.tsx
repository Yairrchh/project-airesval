import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars , faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import logo from "../../../public/cvp.png";



export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <main className="flex items-center justify-center gap-20">
            <div className="mt-16">
                  <Image src={logo} alt="logo" width={500} height={500} />         
            </div>
            <div className="flex flex-col gap-x-10 text-5x1 gap-16 mt-16">
                <Link href="/cpv/newTechnicalSheet" >
                    <div className="bg-blue-300 rounded-lg flex items-center justify-center p-5 gap-2 transition-transform transform-gpu hover:scale-110 ease-out duration-300">
                        <FontAwesomeIcon icon={faPlus} />
                        <p> Nueva Ficha técnica</p>
                    </div>
                </Link>
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