import Card from "@/components/card";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="ml-4 mt-12 mr-4 md:ml-52 md:mr-52">
        <h1 className="text-3xl md:text-5xl text-white">Menu</h1>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-between">
          <Card 
            title="Meus treinos" 
            descricao="Veja, crie ou atualize seus treinos!" 
            type="treino" 
            textoBTN="Meus treinos" 
          />
          <Card 
            title="Minha dieta" 
            descricao="Veja, crie ou atualize sua dieta!" 
            type="dieta" 
            textoBTN="Minha dieta" 
          />
          <Card 
            title="Dicas de dietas" 
            descricao="Que tal uma refeição saudável!" 
            type="dicas" 
            textoBTN="Saiba mais!" 
          />
        </div>
      </div>
    </div>
  );
}
