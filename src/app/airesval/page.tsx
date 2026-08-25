import Gauge from "../components/Gauge";

export default function Airesval() {
    return(
        <div className='flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-15rem)] bg-paper px-4'>
            <Gauge className='w-10 h-10 text-steel-400' needleDeg={90} />
            <h1 className='font-display font-semibold text-2xl text-steel-700 text-center'>Airesval aún no está disponible</h1>
            <p className='text-steel-400 text-sm'>Esta sección está en construcción.</p>
        </div>
    )
}
