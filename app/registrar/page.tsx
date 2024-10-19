'use client'
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/server";
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Header from "@/components/headerNoMenu";

export default function Page() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const router = useRouter()

  async function registrar() {
    console.log(name)
    if (email.trim() !== '' && password.trim() !== '' && name.trim() !== '') {
      try {
        const { error: supabaseError } =
          await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name,
              }
            },
          });
        if (!supabaseError) {
          router.push('/login')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="h-[90%] bg-background">
      <Header type="SECUNDARY" />
      <div className="ml-4 mt-8 mr-4 md:ml-48 md:mr-48">
        <h1 className="text-4xl md:text-5xl text-[white]">Cadastrar</h1>
        <div className="w-full md:w-[100%] h-auto md:h-[550px] bg-[#282a2b] mt-8 flex flex-col items-center p-4 md:p-0">
          <input
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent w-full md:w-[400px] h-[40px] mt-8 md:mt-20 border-b-[0.5px] border-[gray] placeholder-white text-[white]"
            placeholder="Usuário"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent w-full md:w-[400px] h-[40px] mt-6 md:mt-12 border-b-[0.5px] border-[gray] placeholder-white text-[white]"
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent w-full md:w-[400px] h-[40px] mt-6 md:mt-12 border-b-[0.5px] border-[gray] placeholder-white text-[white]"
            placeholder="Senha"
          />
          <div className="w-full md:w-[90%] h-[0.5px] bg-[gray] mt-16 md:mt-28"></div>

          <Button onClick={registrar} className='w-full md:w-[200px] h-[50px] md:h-[80px] mt-8 text-lg md:text-xl'>Cadastrar</Button>

          <p className="mt-8 mb-8 text-[gray] text-center">Já possui uma conta? <Link href="/login" className="text-[white]">Entre aqui!</Link></p>
        </div>
      </div>
    </div>
  )
}
