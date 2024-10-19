import { Dumbbell, Utensils, ChefHat } from "lucide-react";
import { Button } from "./ui/button";
import Link from 'next/link'


type props = {
    title: string,
    descricao: string,
    type: 'treino' | 'dieta' | 'dicas',
    textoBTN: string
}

export default function Card({title, descricao, type, textoBTN}: props) {

    return(
        <div className='bg-[#282a2b] w-[400px] h-[400px] rounded'>
            <div className="flex flex-row ml-6 mr-6">
                <h1 className='text-2xl flex flex-1 mt-20 text-[white]'>{title}</h1>
                {type === 'treino' ? <Dumbbell className='w-8 h-8 text-[white] mt-20'/> : 
                 type === 'dieta' ? <Utensils className='w-8 h-8 text-[white] mt-20'/> : 
                 type === 'dicas' ? <ChefHat className='w-8 h-8 text-[white] mt-20'/> :
                 null
                 }
            </div>
            <p className="text-[gray] ml-6 mt-2">{descricao}</p>
            <div className="w-[90%] ml-4 mt-8 h-[0.5px] bg-[gray]"></div>
            <Link href={type === 'treino' ? '/treinos' : type === 'dieta' ? '/dietas' : type === 'dicas' ? '/dicas' : '/'}>
            <Button className="w-[90%] h-[50px] ml-4 mt-32 text-lg">{textoBTN}</Button></Link>
        </div>
    )
}