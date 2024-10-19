'use client'
import { Button } from '@/components/ui/button';
import { CornerDownRight, UtensilsCrossed, Trash } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/server';
import Header from '@/components/headerNoMenu';

type Refeicao = {
    alimento: string;
    quantidade: string;
    unidade: string;
};

type DietaCompleta = {
    data: Date; 
    dayWeek: string;
    refeicoes: Refeicao[];
};

export default function Page() {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [data, setData] = useState('')
    const [diaSemana, setDiaSemana] = useState('')
    const [fields, setFields] = useState<Refeicao[]>([{ alimento: '', quantidade: '', unidade: 'g' }]);
    const [listDietas, setListDietas] = useState<DietaCompleta[]>([]);
    const [selectedDieta, setSelectedDieta] = useState<DietaCompleta | null>(null);

    const [emailUser, setemailUser] = useState<string | undefined>('')

    const handleAddFields = () => {
        if (fields.length < 8) {
            setFields([...fields, { alimento: '', quantidade: '', unidade: 'g' }]);
        }
    };

    const handleRemoveField = (index: number) => {
        const values = [...fields];
        values.splice(index, 1);
        setFields(values);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const values = [...fields];

        if (name === "alimento") {
            values[index][name] = value;
        } else if (name === "quantidade" && /^[0-9]*$/.test(value)) {
            values[index][name] = value;
        }

        setFields(values);
    };

    const handleUnitChange = (index: number, value: string) => {
        const values = [...fields];
        values[index].unidade = value;
        setFields(values);
    };

    const handleSubmit = async (data: string, diaSemana: string, fields: Refeicao[]) => {
        const newDieta: DietaCompleta = { data: new Date(data), dayWeek: diaSemana, refeicoes: fields };
        setListDietas([...listDietas, newDieta]);

        try {
            await supabase.from('Dietas').insert({
                email: emailUser,
                data: new Date(data).toISOString(), 
                dayWeek: diaSemana,
                refeicoes: fields,
                type: 'Cafe da Tarde'
            });
            
            setDiaSemana('')
            setFields([{ alimento: '', quantidade: '', unidade: 'g' }])
        } catch (error) {
            console.log(error);
        }

        setOpen(false);
    };

    const handleSelectDieta = (data: string) => {
        const dieta = listDietas.find(dieta => new Date(dieta.data).toISOString().split('T')[0] === data);
        setSelectedDieta(dieta || null);
    };

    const handleEditDieta = () => {
        if (selectedDieta) {
            setData(new Date(selectedDieta.data).toISOString().split('T')[0]);
            setDiaSemana(selectedDieta.dayWeek);
            setFields(selectedDieta.refeicoes);
            setEditOpen(true);
        }
    };

    const handleUpdateDieta = async () => {
        if (selectedDieta) {
            const updatedDieta: DietaCompleta = { data: new Date(data), dayWeek: diaSemana, refeicoes: fields };
            setListDietas(listDietas.map(dieta => dieta.data === selectedDieta.data ? updatedDieta : dieta));
            setSelectedDieta(updatedDieta);

            try {
                await supabase
                    .from('Dietas')
                    .update({ dayWeek: diaSemana, refeicoes: fields })
                    .eq('email', emailUser)
                    .eq('data', new Date(data).toISOString())
                    .eq('type', 'Cafe da Tarde')

                    setDiaSemana('')
                    setFields([{ alimento: '', quantidade: '', unidade: 'g' }])
            } catch (error) {
                console.log(error)
            }

            setEditOpen(false);
        }
    };

    const handleDeleteDieta = async () => {
        if (selectedDieta) {
            try {
                await supabase
                    .from('Dietas')
                    .delete()
                    .eq('email', emailUser)
                    .eq('data', new Date(selectedDieta.data).toISOString())
                    .eq('type', 'Cafe da Tarde');

                setListDietas(listDietas.filter(dieta => dieta.data !== selectedDieta.data));
                setSelectedDieta(null);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        async function load() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setemailUser(user?.email);

                const { data, error } = await supabase.from('Dietas').select('*').eq('email', user?.email).eq('type', 'Cafe da Tarde');


                if (error) {
                    throw error;
                }

                if (data) {
                    const parsedData = data.map((dieta) => {
                        return {
                            ...dieta,
                            refeicoes: Array.isArray(dieta.refeicoes)
                                ? dieta.refeicoes.map((ref: string) => {
                                    if (typeof ref === 'string') {
                                        return JSON.parse(ref);
                                    }
                                    return ref;
                                })
                                : []
                        };
                    });
                    console.log(parsedData);
                    setListDietas(parsedData);
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        load();
    }, []);

    return (
        <div className="h-[90%] bg-background">
            <Header />
            <div className='flex justify-center items-center flex-col px-4 md:px-24'>
                <Select onValueChange={handleSelectDieta}>
                    <SelectTrigger className="w-full md:w-[20%] text-[white] font-sans flex items-center justify-center border-none bg-primary text-lg md:text-2xl mt-4">
                        <SelectValue placeholder="Dietas já criadas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Dietas já criadas</SelectLabel>
                            {listDietas.map((item, index) => {

                                const day = new Date(item.data).toISOString().split('T')[0].split('-')[2]
                                const mouth = new Date(item.data).toISOString().split('T')[0].split('-')[1]
                                const year = new Date(item.data).toISOString().split('T')[0].split('-')[0]

                                
                                return (
                                    <SelectItem key={index} value={new Date(item.data).toISOString().split('T')[0]} className="text-[black] font-sans">{`${day}/${mouth}/${year}`}</SelectItem>
                                )
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {selectedDieta && (
                    <h2 className="text-lg md:text-xl text-[#D1B06B] mt-4">{selectedDieta.dayWeek}</h2>
                )}

                {selectedDieta && (
                    <div className='w-full md:w-[20%] h-[0.5px] bg-[gray] mt-6'></div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 justify-items-center mt-8">
                    {selectedDieta && selectedDieta.refeicoes.map((refeicao, index) => (
                        <div key={index} className='flex flex-col items-center text-[white] text-base md:text-lg font-sans'>
                            <div className='flex items-center'>
                                <UtensilsCrossed className='w-4 h-4 mr-2' />
                                <h1>{refeicao.alimento}</h1>
                            </div>
                            <div className='flex items-center'>
                                <CornerDownRight className='w-4 h-4 mr-2' />
                                <p>{refeicao.quantidade} {refeicao.unidade}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full md:w-[17%] h-[0.5px] bg-[gray] mt-6'></div>

                {selectedDieta && (
                    <div className='flex flex-wrap mt-4 space-x-4 justify-center items-center'>
                        <Button className='w-full md:w-[40%] font-sans h-10 bg-blue-500 hover:bg-blue-400 mt-2 md:mt-0' onClick={handleEditDieta}>Editar dieta</Button>
                        <Button className='w-full md:w-[40%] font-sans h-10 bg-red-500 hover:bg-red-400 mt-2 md:mt-0' onClick={handleDeleteDieta}>Excluir dieta</Button>
                    </div>
                )}

                <Button className='w-full md:w-[17%] mt-10 font-sans h-20 bg-[#D1B06B] hover:bg-[#D1B06B]' onClick={() => setOpen(!open)}>Criar nova dieta</Button>

                <Dialog open={open} onOpenChange={() => setOpen(false)}>
                    <DialogContent className='max-w-lg w-full mx-auto p-6 rounded-lg bg-[#1E1E1E] text-white'>
                        <DialogHeader>
                            <DialogTitle className='font-sans text-lg text-[white]'>Crie uma nova dieta!</DialogTitle>

                            <div className='space-y-4'>
                                <div>
                                    <label className='text-[white] font-sans block'>Data (dia/mês/ano):</label>
                                    <input
                                        type="date"
                                        className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 w-full placeholder:font-sans font-sans'
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className='text-[white] font-sans block'>Dia da semana:</label>
                                    <Select onValueChange={(value) => setDiaSemana(value)}>
                                        <SelectTrigger className="w-full text-[white] font-sans flex items-center justify-center border border-[gray] bg-primary text-lg">
                                            <SelectValue placeholder="Selecione o dia da semana" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Dias da semana</SelectLabel>
                                                {['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'].map((day, index) => (
                                                    <SelectItem key={index} value={day} className="text-[black] font-sans">{day}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {fields.map((field, index) => (
                                    <div key={index} className="flex flex-col space-y-2 mt-4">
                                        <div className="flex items-center space-x-2">
                                            <label className='text-[white] font-sans'>Alimento:</label>
                                            <input
                                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 placeholder:font-sans font-sans w-full'
                                                name="alimento"
                                                placeholder='Pão Integral'
                                                value={field.alimento}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                            <Button onClick={() => handleRemoveField(index)} className="ml-2 bg-red-500 text-white hover:bg-red-700">
                                                <Trash className='w-4 h-4' />
                                            </Button>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className='text-[white] font-sans'>Quantidade:</label>
                                            <input
                                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 placeholder:font-sans font-sans w-1/2'
                                                name="quantidade"
                                                placeholder='100'
                                                value={field.quantidade}
                                                onChange={(event) => handleInputChange(index, event)}
                                                type="number"
                                            />

                                            <Select name="unidade" onValueChange={(value) => handleUnitChange(index, value)} value={field.unidade}>
                                                <SelectTrigger className="w-1/2 text-[white] font-sans flex items-center justify-center border border-[gray] bg-primary text-lg">
                                                    <SelectValue placeholder="Unidade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="g" className="text-[black] font-sans">Gramas (g)</SelectItem>
                                                        <SelectItem value="ml" className="text-[black] font-sans">Mililitros (ml)</SelectItem>
                                                        <SelectItem value="mg" className="text-[black] font-sans">Miligramas (mg)</SelectItem>
                                                        <SelectItem value="kg" className="text-[black] font-sans">Quilos (kg)</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-row justify-between mt-8'>
                                <Button
                                    type="button"
                                    onClick={handleAddFields}
                                    className="bg-blue-500 h-[40px] text-white px-4 py-2 rounded flex flex-1 font-sans hover:bg-blue-300"
                                >
                                    Adicionar alimento
                                </Button>

                                <Button
                                    type="button"
                                    onClick={() => handleSubmit(data, diaSemana, fields)}
                                    className="ml-4 text-white h-[40px] bg-[#D1B06B] px-4 py-2 rounded font-sans"
                                >
                                    Salvar dieta
                                </Button>
                            </div>
                            </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog open={editOpen} onOpenChange={() => setEditOpen(false)}>
                    <DialogContent className='max-w-lg w-full mx-auto p-6 rounded-lg bg-[#1E1E1E] text-white'>
                        <DialogHeader>
                            <DialogTitle className='font-sans text-lg text-[white]'>Editar dieta</DialogTitle>

                            <div className='space-y-4'>
                                <div>
                                    <label className='text-[white] font-sans block'>Data (dia/mês/ano):</label>
                                    <input
                                        type="date"
                                        className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 w-full placeholder:font-sans font-sans'
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className='text-[white] font-sans block'>Dia da semana:</label>
                                    <Select onValueChange={(value) => setDiaSemana(value)} value={diaSemana}>
                                        <SelectTrigger className="w-full text-[white] font-sans flex items-center justify-center border border-[gray] bg-primary text-lg">
                                            <SelectValue placeholder="Selecione o dia da semana" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Dias da semana</SelectLabel>
                                                {['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'].map((day, index) => (
                                                    <SelectItem key={index} value={day} className="text-[black] font-sans">{day}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {fields.map((field, index) => (
                                    <div key={index} className="flex flex-col space-y-2 mt-4">
                                        <div className="flex items-center space-x-2">
                                            <label className='text-[white] font-sans'>Alimento:</label>
                                            <input
                                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 placeholder:font-sans font-sans w-full'
                                                name="alimento"
                                                placeholder='Pão Integral'
                                                value={field.alimento}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                            <Button onClick={() => handleRemoveField(index)} className="ml-2 bg-red-500 text-white hover:bg-red-700">
                                                <Trash className='w-4 h-4' />
                                            </Button>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className='text-[white] font-sans'>Quantidade:</label>
                                            <input
                                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 placeholder:font-sans font-sans w-1/2'
                                                name="quantidade"
                                                placeholder='100'
                                                value={field.quantidade}
                                                onChange={(event) => handleInputChange(index, event)}
                                                type="number"
                                            />

                                            <Select name="unidade" onValueChange={(value) => handleUnitChange(index, value)} value={field.unidade}>
                                                <SelectTrigger className="w-1/2 text-[white] font-sans flex items-center justify-center border border-[gray] bg-primary text-lg">
                                                    <SelectValue placeholder="Unidade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="g" className="text-[black] font-sans">Gramas (g)</SelectItem>
                                                        <SelectItem value="ml" className="text-[black] font-sans">Mililitros (ml)</SelectItem>
                                                        <SelectItem value="mg" className="text-[black] font-sans">Miligramas (mg)</SelectItem>
                                                        <SelectItem value="kg" className="text-[black] font-sans">Quilos (kg)</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-row justify-between mt-8'>
                                <Button
                                    type="button"
                                    onClick={handleAddFields}
                                    className="bg-blue-500 h-[40px] text-white px-4 py-2 rounded flex flex-1 font-sans hover:bg-blue-300"
                                >
                                    Adicionar alimento
                                </Button>

                                <Button
                                    type="button"
                                    onClick={handleUpdateDieta}
                                    className="ml-4 text-white h-[40px] bg-[#D1B06B] px-4 py-2 rounded font-sans"
                                >
                                    Atualizar dieta
                                </Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}