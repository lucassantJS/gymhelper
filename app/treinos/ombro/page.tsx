'use client'

import { Button } from '@/components/ui/button';
import { Dumbbell, CornerDownRight } from 'lucide-react';
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

type Treino = {
    exercicio: string;
    repeticao: string;
};

type TreinoCompleto = {
    name: string;
    description: string;
    dayWeek: string;
    time: string;
    exercise: Treino[];
};

export default function Page() {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [name, setName] = useState('')
    const [descricao, setDescricao] = useState('')
    const [diaSemana, setDiaSemana] = useState('')
    const [tempo, setTempo] = useState('')
    const [fields, setFields] = useState<Treino[]>([]);
    const [listTreinos, setListTreinos] = useState<TreinoCompleto[]>([]);
    const [selectedTreino, setSelectedTreino] = useState<TreinoCompleto | null>(null);

    const [emailUser, setemailUser] = useState<string | undefined>('')

    const handleAddFields = () => {
        if (fields.length < 8) {
            setFields([...fields, { exercicio: '', repeticao: '' }]);
        }
    };

    const handleRemoveField = (index: number) => {
        const values = [...fields];
        values.splice(index, 1);
        setFields(values);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const values = [...fields];

        if (name === "exercicio" || name === "repeticao") {
            values[index][name] = value;
        }

        setFields(values);
    };

    const handleSubmit = async (name: string, descricao: string, diaSemana: string, tempo: string, fields: Treino[]) => {
        const newTreino: TreinoCompleto = { name: name, description: descricao, dayWeek: diaSemana, time: tempo, exercise: fields };
        setListTreinos([...listTreinos, newTreino]);
        
        try{
            await supabase.from('Treinos').insert({
            email: emailUser,
            name: name,
            description: descricao,
            time: tempo,
            dayWeek: diaSemana,
            exercise: fields,
            type: 'Ombro'
            })
        }catch(error){
            console.log(error)
        }

        setOpen(false);
    };

    const handleSelectTreino = (nome: string) => {
        const treino = listTreinos.find(treino => treino.name === nome);
        setSelectedTreino(treino || null);
    };

    const handleEditTreino = () => {
        if (selectedTreino) {
            setName(selectedTreino.name);
            setDescricao(selectedTreino.description);
            setDiaSemana(selectedTreino.dayWeek);
            setTempo(selectedTreino.time);
            setFields(selectedTreino.exercise);
            setEditOpen(true);
        }
    };

    const handleUpdateTreino = async() => {
        if (selectedTreino) {
            const updatedTreino: TreinoCompleto = { name: name, description: descricao, dayWeek: diaSemana, time: tempo, exercise: fields };
            setListTreinos(listTreinos.map(treino => treino.name === selectedTreino.name ? updatedTreino : treino));
            setSelectedTreino(updatedTreino);

            try {
                await supabase
                .from('Treinos')
                .update({ description: descricao, dayWeek: diaSemana, time: tempo, exercise: fields })
                .eq('email', emailUser)
                .eq('name', name)

            }catch(error) {
                console.log(error)
            }
            setEditOpen(false);
        }
    };

    const handleDeleteTreino = async () => {
        if (selectedTreino) {
            try {
                await supabase
                .from('Treinos')
                .delete()
                .eq('email', emailUser)
                .eq('name', selectedTreino.name);

                setListTreinos(listTreinos.filter(treino => treino.name !== selectedTreino.name));
                setSelectedTreino(null);
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
    
                const { data, error } = await supabase.from('Treinos').select('*').eq('email', user?.email).eq('type', 'Ombro');
    
                if (error) {
                    throw error;
                }
    
                if (data) {
                    const parsedData = data.map(treino => {
                        return {
                            ...treino,
                            exercise: Array.isArray(treino.exercise)
                                ? treino.exercise.map((ex: string | Treino) => {
                                    if (typeof ex === 'string') {
                                        return JSON.parse(ex) as Treino;
                                    }
                                    return ex;
                                })
                                : [] 
                        };
                    });
    
                    setListTreinos(parsedData);
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        load();
    }, []);
    
    return (
        <div className="h-[90%] bg-background">
            <Header/>
            <div className='flex justify-center items-center flex-col px-4 md:px-0'>
                <Select onValueChange={handleSelectTreino}>
                    <SelectTrigger className="w-full md:w-[20%] text-[white] font-sans flex items-center justify-center border-none bg-primary text-lg md:text-2xl">
                        <SelectValue placeholder="Treinos já criados" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Treinos já criados</SelectLabel>
                            {listTreinos.map((item, index) => {
                                return (
                                    <SelectItem key={index} value={item.name} className="text-[black] font-sans">{item.name}</SelectItem>
                                )
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {selectedTreino && (
                    <h2 className="text-lg md:text-xl text-[#D1B06B] mt-4 text-center">{selectedTreino.description}</h2>
                )}

                {selectedTreino && (
                    <>
                        <div className='w-full md:w-[20%] h-[0.5px] bg-[gray] mt-2'></div>

                        <h1 className="text-3xl md:text-4xl text-[#D1B06B] font-bold font-sans mt-8">{selectedTreino.time} minutos</h1>
                        <div className="flex bg-primary rounded w-48 h-12 mt-8 items-center justify-center">
                            <h1 className='text-lg font-sans text-[white]'>{selectedTreino.dayWeek}</h1>
                        </div>
                        <div className='w-full md:w-[17%] h-[0.5px] bg-[gray] mt-6'></div>
                    </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 justify-items-center mt-8">
                    {selectedTreino && selectedTreino.exercise.map((exercise, index) => (
                        <div key={index} className='flex flex-col items-center text-[white] text-lg font-sans'>
                            <div className='flex items-center'>
                                <Dumbbell className='w-4 h-4 mr-2' />
                                <h1>{exercise.exercicio}</h1>
                            </div>
                            <div className='flex items-center'>
                                <CornerDownRight className='w-4 h-4 mr-2' />
                                <p>{exercise.repeticao}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full md:w-[17%] h-[0.5px] bg-[gray] mt-6'></div>

                {selectedTreino && (
                    <div className='flex mt-4 space-x-4 justify-center items-center'>
                        <Button className='w-full md:w-[40%] font-sans h-10 bg-blue-500 hover:bg-blue-400' onClick={handleEditTreino}>Editar treino</Button>
                        <Button className='w-full md:w-[40%] font-sans h-10 bg-red-500 hover:bg-red-400' onClick={handleDeleteTreino}>Excluir treino</Button>
                    </div>
                )}

                <Button className='w-full md:w-[17%] mt-6 font-sans h-16 md:h-20 bg-[#D1B06B] hover:bg-[#D1B06B]' onClick={() => setOpen(!open)}>Criar novo treino</Button>

                <Dialog open={open} onOpenChange={() => setOpen(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='font-sans text-lg text-[white]'>Crie um novo treino!</DialogTitle>

                            <label className='text-[white] font-sans'>Nome do treino:</label>
                            <input
                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mr-8 placeholder:font-sans font-sans w-full md:w-auto'
                                placeholder='Nome do treino'
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className='text-[white] font-sans'>Descrição:</label>
                            <input
                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mr-8 placeholder:font-sans font-sans w-full md:w-auto'
                                placeholder='Descrição do treino'
                                onChange={(e) => setDescricao(e.target.value)}
                            />

                            <label className='text-[white] font-sans'>Tempo (minutos):</label>
                            <input
                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mr-8 placeholder:font-sans font-sans w-full md:w-auto'
                                placeholder='Ex: 45'
                                onChange={(e) => setTempo(e.target.value)}
                            />

                            <label className='text-[white] font-sans'>Dia da semana:</label>
                            <Select onValueChange={(value) => setDiaSemana(value)}>
                                <SelectTrigger className="w-full md:w-[20%] text-[white] font-sans flex items-center justify-center border border-[gray] bg-primary text-lg">
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

                            {fields.map((field, index) => (
                                <div key={index} className="flex flex-row items-center mt-4">
                                    <label className='text-[white] font-sans mr-2'>Exercício:</label>
                                    <input
                                        className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mt-1 placeholder:font-sans font-sans w-full md:w-auto'
                                        name="exercicio"
                                        placeholder='Ex: Agachamento'
                                        value={field.exercicio}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />

                                    <label className='text-[white] font-sans ml-2 mr-2'>Series:</label>
                                    <input
                                        className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mt-1 w-[28%] placeholder:font-sans font-sans'
                                        name="repeticao"
                                        placeholder='Ex: 4x12'
                                        value={field.repeticao}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => handleRemoveField(index)}
                                        className="ml-4 mt-1 bg-red-500 h-[30px] text-white px-2 py-1 rounded font-sans hover:bg-red-400"
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                            <div className='flex flex-row justify-between mr-8 '>
                              <Button
                                  type="button"
                                  onClick={handleAddFields}
                                  className="mt-4 bg-blue-500 h-[40px] text-white px-4 py-2 rounded flex flex-1 font-sans hover:bg-blue-300"
                              >
                                  Adicionar exercício
                              </Button>

                              <Button
                                  type="button"
                                  onClick={() => handleSubmit(name, descricao, diaSemana, tempo, fields)}
                                  className="mt-4 text-white h-[40px] ml-8 bg-[#D1B06B] px-4 py-2 rounded font-sans"
                              >
                                  Salvar treino
                              </Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog open={editOpen} onOpenChange={() => setEditOpen(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='font-sans text-lg text-[white]'>Editar treino</DialogTitle>

                            <label className='text-[gray] font-sans'>Nome do treino:</label>
                            <input
                                className='bg-primary border border-[gray] rounded text-[gray] placeholder-gray px-2 py-1 mr-8 placeholder:font-sans font-sans w-full md:w-auto'
                                placeholder='Nome do treino'
                                value={name}
                                disabled
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className='text-[white] font-sans'>Descrição:</label>
                            <input
                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mr-8 placeholder:font-sans font-sans w-full md:w-auto'
                                placeholder='Descrição do treino'
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />

                            <label className='text-[white] font-sans'>Tempo (minutos):</label>
                            <input
                                className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mr-8 placeholder:font-sans font-sans w-full md:w-auto'
                                placeholder='Ex: 45'
                                value={tempo}
                                onChange={(e) => setTempo(e.target.value)}
                            />

                            <label className='text-[white] font-sans'>Dia da semana:</label>
                            <Select onValueChange={(value) => setDiaSemana(value)} value={diaSemana}>
                                <SelectTrigger className="w-full md:w-[20%] text-[white] font-sans flex items-center justify-center border border-[gray] bg-primary text-lg">
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

                            {fields.map((field, index) => (
                                <div key={index} className="flex flex-row items-center mt-4">
                                    <label className='text-[white] font-sans mr-2'>Exercício:</label>
                                    <input
                                        className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mt-1 placeholder:font-sans font-sans w-full md:w-auto'
                                        name="exercicio"
                                        placeholder='Ex: Agachamento'
                                        value={field.exercicio}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />

                                    <label className='text-[white] font-sans ml-2 mr-2'>Series:</label>
                                    <input
                                        className='bg-primary border border-[gray] rounded text-white placeholder-gray px-2 py-1 mt-1 w-[28%] placeholder:font-sans font-sans'
                                        name="repeticao"
                                        placeholder='Ex: 4x12'
                                        value={field.repeticao}
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => handleRemoveField(index)}
                                        className="ml-4 mt-1 bg-red-500 h-[30px] text-white px-2 py-1 rounded font-sans hover:bg-red-400"
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                            <div className='flex flex-row justify-between mr-8 '>
                              <Button
                                  type="button"
                                  onClick={handleAddFields}
                                  className="mt-4 bg-blue-500 h-[40px] text-white px-4 py-2 rounded flex flex-1 font-sans hover:bg-blue-300"
                              >
                                  Adicionar exercício
                              </Button>

                              <Button
                                  type="button"
                                  onClick={handleUpdateTreino}
                                  className="mt-4 text-white h-[40px] ml-8 bg-[#D1B06B] px-4 py-2 rounded font-sans"
                              >
                                  Atualizar treino
                              </Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}