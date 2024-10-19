'use client'
import Header from "@/components/headerNoMenu";
import { Card } from "@/components/ui/card";
import { AllRefeicoes, RecipeProps } from "@/utils/supabase/databaseLocal";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function Page() {
    const [receita, setReceita] = useState<RecipeProps[]>([])

    useEffect(() => {
        const info = AllRefeicoes()
        setReceita(info)
    }, [])

    return (
        <div className="flex min-h-screen w-full flex-col bg-primary">
            <Header />
            <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:ml-12 md:mr-12 md:gap-x-8">
                {receita.map((item) => (
                    <Card key={item.name} className="w-full p-4 grid lg:max-w-4xl mt-8 mx-auto md:ml-2">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center">
                            <Image
                                src={item.photo}
                                alt=""
                                width={300}
                                height={300}
                                className="rounded-lg object-cover w-full h-auto lg:w-[300px] lg:h-[200px]"
                            />
                            <div className="grid gap-2 mt-4 lg:mt-0 lg:ml-5 text-center lg:text-left">
                                <h3 className="text-2xl font-bold text-[white]">{item.name}</h3>
                                <p className="text-[white] font-sans">
                                    {item.descricao}
                                </p>
                                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4 text-sm text-[white] font-sans">
                                    <div>
                                        <span className="font-medium">Calorias:</span> {item.calorias}g
                                    </div>
                                    <div>
                                        <span className="font-medium">Proteína:</span> {item.proteina}g
                                    </div>
                                    <div>
                                        <span className="font-medium">Gordura:</span> {item.gordura}g
                                    </div>
                                </div>
                                <div className="text-sm text-[white] font-sans mt-2">
                                    <span className="font-medium">Ingredientes: </span> {item.ingredientes}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
