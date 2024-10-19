'use client'
import { ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type props = {
    type?: 'PRIMARY' | 'SECUNDARY'
}

export default function Header({type = 'PRIMARY'} : props) {
    const router = useRouter()

    return(
        <div className='flex flex-row justify-between items-center ml-12 mr-12 mt-6'>
            {type === 'PRIMARY' ? <button onClick={() => router.back()}><ArrowLeft className='text-[white]'/></button> : null}
            <Link href="/"><Image alt='logo' src={logo} style={{width: 100, height: 100}}/></Link>
        </div>
    )
}