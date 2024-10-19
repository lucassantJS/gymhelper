'use client'
import logo from '../assets/logo.svg'
import Image from 'next/image'
import { Button } from './ui/button'
import { CircleUser, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/server'
import { useRouter } from 'next/navigation'

export default function Header() {

    const [hasLogin, setHasLogin] = useState(false)
    const [fullname, setFullName] = useState<string | undefined>('')
    const router = useRouter()


    async function logout() {
        try {
            await supabase.auth.signOut()
            router.push('/login')
        }catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function hasLogged() {
            const {data: {user}} = await supabase.auth.getUser();
            if (user) {
                setFullName(user.user_metadata.full_name)
                setHasLogin(true)
            }
        }
        hasLogged()
    }, [])

    return(
        <div className='flex flex-row justify-between items-center ml-12 mr-12 mt-6'>
            <Link href="/"><Image alt='logo' src={logo} style={{width: 100, height: 100}}/></Link>
            <div className='flex flex-row items-center justify-center'>
                <Button onClick={() => router.push('/login')} className='w-[120px] h-[40px] bg-[#fff] text-[#000] font-bold text-sm hover:bg-[#595c5c]'>{hasLogin ? fullname : <><CircleUser className='mr-2 h-6 w-6'/> <p>USUARIO</p></>}</Button>
                {hasLogin ? <Button onClick={logout} className='w-[80px] h-[40px] bg-[#fff] text-[#000] font-bold text-sm hover:bg-[#595c5c] ml-8 font-sans'><LogOut className='mr-2 h-6 w-6'/>Sair</Button> : null}
            </div>
        </div>
    )
}