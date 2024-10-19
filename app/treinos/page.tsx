'use client'
import Image from 'next/image'
import Peito from '../../assets/peitoral.png'
import Costas from '../../assets/costas.png'
import Perna from '../../assets/perna.png'
import Braco from '../../assets/braco.png'
import Ombro from '../../assets/ombro.png'
import Cardio from '../../assets/cardio.png'
import Link from 'next/link'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase/server'
import { useRouter } from 'next/navigation'
import Header from '@/components/headerNoMenu'

export default function Page() {

    const router = useRouter()

    useEffect(() => {
        async function hasSession() {
            try{
                const {data} = await supabase.auth.getSession()
                if (!data.session){
                    router.push('/login')
                }
            } catch(error){
                console.log(error)
            }
        }
        hasSession()
    }, [])

    return(
        <div className="h-[90%] bg-background">
            <Header/>
            <div className="ml-4 mt-8 mr-4 md:ml-48 md:mr-48">
             <h1 className="text-4xl md:text-5xl text-[white] font-normal">TREINOS</h1>
             <div className="flex items-center justify-center mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/treinos/peito'><Image alt='Peito' src={Peito} className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded'/></Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Peito</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/treinos/costas'><Image alt='Costas' src={Costas} className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded'/></Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Costas</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/treinos/perna'><Image alt='Perna' src={Perna} className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded'/></Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Perna</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/treinos/braco'><Image alt='Braco' src={Braco} className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded'/></Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Braço</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/treinos/ombro'><Image alt='Ombro' src={Ombro} className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded'/></Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Ombro</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/treinos/cardio'><Image alt='Cardio' src={Cardio} className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded'/></Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Cardio</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
