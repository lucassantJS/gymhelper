'use client'
import Image from 'next/image'
import CafedaManha from '../../assets/cafedamanha.png'
import Almoco from '../../assets/almoco.png'
import CafeedaTarde from '../../assets/cafedatarde.png'
import Janta from '../../assets/jantar.png'

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
            <div className="ml-4 md:ml-24 mt-8 mr-4 md:mr-24">
             <h1 className="text-3xl md:text-5xl text-[white] font-normal text-center md:text-left">DIETAS</h1>
             <div className="flex items-center justify-center mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-12">
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/dietas/cafedamanha'>
                                <Image alt='Cafe da manha' src={CafedaManha} className='w-40 h-40 md:w-56 md:h-56 rounded'/>
                            </Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Café da manhã</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/dietas/almoco'>
                                <Image alt='Almoço' src={Almoco} className='w-40 h-40 md:w-56 md:h-56 rounded'/>
                            </Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Almoço</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/dietas/cafedatarde'>
                                <Image alt='Cafe da tarde' src={CafeedaTarde} className='w-40 h-40 md:w-56 md:h-56 rounded'/>
                            </Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Café da tarde</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Link href='/dietas/janta'>
                                <Image alt='Janta' src={Janta} className='w-40 h-40 md:w-56 md:h-56 rounded'/>
                            </Link>
                            <p className='text-white mt-4 text-xl md:text-2xl'>Janta</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
