'use client'
import Header from "@/components/headerNoMenu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/server";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

    async function logar() {
      if(email.trim() !== '' && password.trim() !== ''){
        try{
          const{error : supabaseError} = 
          await supabase.auth.signInWithPassword({
            email: email,
            password: password
          })
          if(!supabaseError){
            router.push('/')
          }
        }catch(error){
          console.log(error)
        }
      }
    }

    return(
        <div className="h-[90%] bg-background">
          <Header type="SECUNDARY"/>
          <div className="ml-4 mr-4 md:ml-48 md:mr-48 mt-8">
            <h1 className="text-4xl md:text-5xl text-[white] text-center md:text-left">Login</h1>
            <div className="w-full h-auto md:h-[550px] bg-[#282a2b] mt-8 flex flex-col items-center p-4 md:p-12">
                <input onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full max-w-[400px] h-[40px] mt-12 border-b-[0.5px] border-[gray] text-[white] placeholder-white" placeholder="Email"></input>
                <input type={"password"} onChange={(e) => setPassword(e.target.value)} className="bg-transparent w-full max-w-[400px] h-[40px] mt-12 border-b-[0.5px] border-[gray] placeholder-white" placeholder="Senha"></input>
                <div className="w-[90%] h-[0.5px] bg-[gray] mt-28"></div>

                <Button onClick={logar} className='w-[150px] md:w-[200px] h-[60px] md:h-[80px] mt-16 text-lg md:text-xl'>Login</Button>

                <p className="mt-8 text-[gray] text-center">Não possui uma conta? <Link href="/registrar" className="text-[white]">Crie uma conta agora!</Link></p>
            </div>
          </div>
        </div>
    )
}
