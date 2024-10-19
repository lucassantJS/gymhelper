export type RecipeProps = {
  name: string;
  photo: string;
  descricao: string;
  calorias: number;
  proteina: number;
  gordura: number;
  ingredientes: string;
  modoPreparo: string;
};

const listRefeicoes: RecipeProps[] = [
  {
    name: "Salada de Quinoa com Legumes",
    photo: "https://plus.unsplash.com/premium_photo-1704989936092-c41f477cb6e2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Uma salada nutritiva e saborosa, perfeita para um almoço leve.",
    calorias: 250,
    proteina: 8,
    gordura: 7,
    ingredientes: "Quinoa, tomate, pepino, pimentão, cebola roxa, azeite de oliva, limão, sal, pimenta",
    modoPreparo: "Cozinhe a quinoa conforme as instruções da embalagem. Deixe esfriar. Misture os legumes picados e tempere com azeite, limão, sal e pimenta."
  },
  {
    name: "Smoothie Verde Detox",
    photo: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Um smoothie refrescante e desintoxicante, cheio de nutrientes.",
    calorias: 150,
    proteina: 5,
    gordura: 2,
    ingredientes: "Espinafre, pepino, maçã, limão, gengibre, água de coco",
    modoPreparo: "Bata todos os ingredientes no liquidificador até obter uma mistura homogênea. Sirva imediatamente."
  },
  {
    name: "Omelete de Claras com Espinafre",
    photo: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Uma omelete leve e rica em proteínas para começar o dia.",
    calorias: 100,
    proteina: 12,
    gordura: 3,
    ingredientes: "Claras de ovo, espinafre, tomate, cebola, azeite, sal, pimenta",
    modoPreparo: "Bata as claras e despeje em uma frigideira aquecida com azeite. Adicione espinafre, tomate e cebola. Cozinhe até firmar e sirva."
  },
  {
    name: "Sopa de Abóbora",
    photo: "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descricao: "Uma sopa cremosa e reconfortante, perfeita para dias frios.",
    calorias: 120,
    proteina: 2,
    gordura: 4,
    ingredientes: "Abóbora, cebola, alho, caldo de legumes, azeite, sal, pimenta",
    modoPreparo: "Refogue cebola e alho em azeite até ficarem macios. Adicione a abóbora e o caldo. Cozinhe até a abóbora estar macia. Bata no liquidificador e tempere a gosto."
  },
  {
    name: "Peito de Frango Grelhado com Ervas",
    photo: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RnJhbmdvJTIwR3JlbGhhZG8lMjBjb20lMjBFcnZhc3xlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Frango suculento grelhado com uma mistura de ervas aromáticas.",
    calorias: 200,
    proteina: 30,
    gordura: 5,
    ingredientes: "Peito de frango, alecrim, tomilho, alho, limão, azeite, sal, pimenta",
    modoPreparo: "Misture suco de limão, azeite, alho picado, alecrim e tomilho. Marine o frango por 30 minutos. Grelhe por 6 a 8 minutos de cada lado até cozinhar."
  },
  {
    name: "Wrap de Frango com Abacate",
    photo: "https://plus.unsplash.com/premium_photo-1679287668420-80c27ea4fb31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d3JhcCUyMGRlJTIwRnJhbmdvfGVufDB8fDB8fHww",
    descricao: "Um wrap leve e saboroso, perfeito para um almoço rápido.",
    calorias: 300,
    proteina: 20,
    gordura: 12,
    ingredientes: "Tortilla integral, peito de frango, abacate, alface, tomate, cebola, limão",
    modoPreparo: "Grelhe o frango e fatie. Em uma tortilla, adicione o frango, abacate, alface, tomate e cebola. Tempere com limão e enrole."
  },
  {
    name: "Iogurte com Frutas e Granola",
    photo: "https://images.unsplash.com/photo-1526893628193-76477eb4bc8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SW9ndXJ0ZSUyMGNvbSUyMEZydXRhcyUyMGUlMjBHcmFub2xhfGVufDB8fDB8fHww",
    descricao: "Uma opção saudável e deliciosa para o café da manhã ou lanche.",
    calorias: 180,
    proteina: 8,
    gordura: 4,
    ingredientes: "Iogurte natural, frutas frescas, granola, mel",
    modoPreparo: "Em uma tigela, coloque o iogurte e adicione frutas frescas e granola por cima. Regue com mel e sirva."
  },
  {
    name: "Ceviche de Peixe Branco",
    photo: "https://images.unsplash.com/photo-1533658266890-8bd362930725?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2V2aWNoZSUyMGRlJTIwcGVpeGV8ZW58MHx8MHx8fDA%3D",
    descricao: "Um prato refrescante de peixe marinado no limão.",
    calorias: 220,
    proteina: 25,
    gordura: 5,
    ingredientes: "Peixe branco, limão, cebola roxa, coentro, pimenta, sal",
    modoPreparo: "Marinar o peixe no suco de limão por 30 minutos. Adicione cebola roxa, coentro, pimenta e sal. Sirva imediatamente."
  },
  {
    name: "Hambúrguer de Lentilha",
    photo: "https://plus.unsplash.com/premium_photo-1664007710992-ad36b7943edb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGVudGlsaGElMjBjYXJuZXxlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Um hambúrguer vegetariano saudável e saboroso.",
    calorias: 180,
    proteina: 10,
    gordura: 6,
    ingredientes: "Lentilha, cebola, alho, farinha de aveia, cenoura, especiarias",
    modoPreparo: "Cozinhe as lentilhas e amasse. Misture com cebola, alho, farinha de aveia e especiarias. Modele em hambúrgueres e asse ou frite até dourar."
  },
  {
    name: "Tartar de Salmão",
    photo: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FsbWFvJTIwY2Vib2xhJTIwcm94YXxlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Um prato leve e sofisticado, ideal para entradas.",
    calorias: 200,
    proteina: 18,
    gordura: 12,
    ingredientes: "Salmão fresco, abacate, limão, azeite, cebola roxa, coentro, sal, pimenta",
    modoPreparo: "Corte o salmão e o abacate em cubos. Misture com cebola roxa, coentro, limão, azeite, sal e pimenta. Sirva como entrada."
  },
  {
    name: "Salada de Frutas com Chia",
    photo: "https://plus.unsplash.com/premium_photo-1664478279991-832059d65835?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FsYWRhJTIwZGUlMjBGcnV0YXN8ZW58MHx8MHx8fDA%3D",
    descricao: "Uma salada doce e nutritiva, rica em fibras.",
    calorias: 150,
    proteina: 3,
    gordura: 2,
    ingredientes: "Frutas variadas, chia, mel, hortelã",
    modoPreparo: "Misture as frutas picadas com chia e mel. Decore com hortelã e sirva."
  },
  {
    name: "Bruschetta Integral",
    photo: "https://images.unsplash.com/photo-1505575967455-40e256f73376?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJ1c2NoZXR0YSUyMEludGVncmFsfGVufDB8fDB8fHww",
    descricao: "Um aperitivo delicioso e saudável.",
    calorias: 120,
    proteina: 4,
    gordura: 5,
    ingredientes: "Pão integral, tomate, manjericão, azeite, alho, sal, pimenta",
    modoPreparo: "Toste o pão integral. Cubra com tomate picado, manjericão, azeite, alho, sal e pimenta. Sirva imediatamente."
  },
  {
    name: "Sopa de Tomate",
    photo: "https://images.unsplash.com/photo-1629978448078-c94a0ab6500f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U29wYSUyMGRlJTIwVG9tYXRlfGVufDB8fDB8fHww",
    descricao: "Uma sopa leve e saborosa, fácil de fazer.",
    calorias: 90,
    proteina: 2,
    gordura: 3,
    ingredientes: "Tomate, cebola, alho, caldo de legumes, azeite, manjericão, sal, pimenta",
    modoPreparo: "Refogue cebola e alho em azeite. Adicione tomates e caldo de legumes. Cozinhe até os tomates desmancharem e bata no liquidificador. Tempere e sirva."
  },
  {
    name: "Salada de Grão-de-Bico",
    photo: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FsYWRhJTIwZGUlMjBHciVDMyVBM28lMjBkZSUyMEJpY298ZW58MHx8MHx8fDA%3D",
    descricao: "Uma salada rica em proteínas vegetais e fibras.",
    calorias: 230,
    proteina: 10,
    gordura: 8,
    ingredientes: "Grão-de-bico, tomate, pepino, cebola roxa, salsinha, azeite, limão, sal, pimenta",
    modoPreparo: "Misture grão-de-bico cozido com tomate, pepino e cebola roxa picados. Tempere com azeite, limão, sal e pimenta. Adicione salsinha e sirva."
  },
  {
    name: "Panqueca de Banana e Aveia",
    photo: "https://images.unsplash.com/photo-1615205129530-49b8934b2294?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UGFucXVlY2ElMjBkZSUyMEJhbmFuYXxlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Uma opção saudável e deliciosa para o café da manhã.",
    calorias: 200,
    proteina: 5,
    gordura: 3,
    ingredientes: "Banana, aveia, ovo, canela, mel",
    modoPreparo: "Amasse a banana e misture com aveia e ovo. Cozinhe em uma frigideira antiaderente até dourar. Sirva com mel e canela."
  },
  {
    name: "Salada de Atum",
    photo: "https://images.unsplash.com/photo-1622756144420-6877b1b7476e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FsYWRhJTIwZGUlMjBBdHVtfGVufDB8fDB8fHww",
    descricao: "Uma salada prática e rica em proteínas.",
    calorias: 250,
    proteina: 20,
    gordura: 8,
    ingredientes: "Atum, alface, tomate, pepino, cebola, azeitonas, azeite, limão, sal, pimenta",
    modoPreparo: "Misture atum com alface, tomate, pepino, cebola e azeitonas. Tempere com azeite, limão, sal e pimenta. Sirva imediatamente."
  },
  {
    name: "Quiche de Espinafre",
    photo: "https://images.unsplash.com/photo-1565181782289-457ee028de39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UXVpY2hlJTIwZGUlMjBFc3BpbmFmcmV8ZW58MHx8MHx8fDA%3D",
    descricao: "Uma quiche leve e saborosa, ideal para uma refeição rápida.",
    calorias: 300,
    proteina: 12,
    gordura: 15,
    ingredientes: "Massa de quiche, espinafre, queijo, ovos, creme de leite, sal, pimenta",
    modoPreparo: "Prepare a massa de quiche e pré-assar. Misture espinafre refogado com queijo, ovos e creme de leite. Despeje sobre a massa e asse até firmar."
  },
  {
    name: "Bolinho de Abobrinha",
    photo: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEJvbGluaG8lMjBkZSUyMEFib2JyaW5oYXxlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Bolinho crocante e saboroso, ideal para petiscar.",
    calorias: 150,
    proteina: 4,
    gordura: 7,
    ingredientes: "Abobrinha, cebola, farinha, ovo, queijo, sal, pimenta",
    modoPreparo: "Rale a abobrinha e misture com cebola picada, farinha, ovo e queijo. Modele em bolinhos e frite até dourar."
  },
  {
    name: "Sushi de Pepino com Salmão",
    photo: "https://images.unsplash.com/photo-1648146299118-1ac5cfa5c27b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VzaGklMjBkZSUyMFBlcGlubyUyMGNvbSUyMFNhbG0lQzMlQTNvfGVufDB8fDB8fHww",
    descricao: "Sushi leve e fresco, ideal para uma refeição rápida.",
    calorias: 200,
    proteina: 15,
    gordura: 8,
    ingredientes: "Arroz para sushi, salmão, pepino, vinagre de arroz, alga nori",
    modoPreparo: "Prepare o arroz para sushi conforme as instruções. Enrole o arroz, salmão e pepino em alga nori. Corte em pedaços e sirva com molho de soja."
  },
  {
    name: "Sorvete de Banana",
    photo: "https://images.unsplash.com/photo-1477588993959-f93989518546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFNvcnZldGUlMjBkZSUyMEJhbmFuYXxlbnwwfHwwfHx8MA%3D%3D",
    descricao: "Um sorvete cremoso e saudável, feito apenas com bananas.",
    calorias: 120,
    proteina: 1,
    gordura: 0,
    ingredientes: "Banana congelada, extrato de baunilha",
    modoPreparo: "Bata a banana congelada no processador até obter uma textura cremosa. Adicione o extrato de baunilha e sirva imediatamente."
  }
];

  
  export function AllRefeicoes() {
    return listRefeicoes;
  }

  export default function getRandomRefeicoes(): RecipeProps[] {
    const listLength = listRefeicoes.length;
    
    const getUniqueRandomIndex = (excludedIndices: Set<number>): number => {
        let index;
        do {
            index = Math.floor(Math.random() * listLength);
        } while (excludedIndices.has(index));
        return index;
    };

    const excludedIndices = new Set<number>();
    
    const firstIndex = getUniqueRandomIndex(excludedIndices);
    excludedIndices.add(firstIndex);
    
    const secondIndex = getUniqueRandomIndex(excludedIndices);
    
    return [listRefeicoes[firstIndex], listRefeicoes[secondIndex]];
}