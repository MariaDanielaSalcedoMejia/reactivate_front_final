import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, AlertCircle, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: typeof Activity;
  category: string;
  priority: "alta" | "media" | "baja";
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Ejercicios de resistencia moderada",
    description: "Puedes realizar ejercicios como caminar rápido, nadar o usar bandas elásticas. Estos ejercicios mejoran tu resistencia cardiovascular y fortalecen los músculos sin sobrecargar las articulaciones.",
    icon: Activity,
    category: "Movilidad Alta",
    priority: "alta",
  },
  {
    id: "2",
    title: "Ejercicios para artritis",
    description: "Movimientos suaves en agua caliente, estiramientos y ejercicios de rango de movimiento ayudan a mantener la flexibilidad y reducir el dolor articular.",
    icon: Heart,
    category: "Condiciones Crónicas",
    priority: "alta",
  },
  {
    id: "3",
    title: "Control de glucosa",
    description: "Caminatas regulares después de las comidas y ejercicios de resistencia ligera ayudan a mantener niveles estables de glucosa en sangre.",
    icon: Heart,
    category: "Salud Metabólica",
    priority: "alta",
  },
  {
    id: "4",
    title: "Cardio suave",
    description: "Caminatas, natación suave y ejercicios de respiración profunda mejoran la circulación y la salud cardiovascular sin elevar demasiado la presión arterial.",
    icon: Heart,
    category: "Cardiovascular",
    priority: "alta",
  },
  {
    id: "5",
    title: "Fortalecimiento muscular",
    description: "Usa bandas elásticas o botellas de agua. Empieza con 2-3 sesiones semanales. El fortalecimiento muscular previene la pérdida de masa muscular relacionada con la edad.",
    icon: Activity,
    category: "Fuerza",
    priority: "media",
  },
  {
    id: "6",
    title: "Mejora tu flexibilidad",
    description: "Dedica 10 minutos diarios a estiramientos suaves. El yoga es excelente para mejorar la flexibilidad, reducir la tensión muscular y mejorar el equilibrio.",
    icon: Activity,
    category: "Flexibilidad",
    priority: "media",
  },
  {
    id: "7",
    title: "Equilibrio y prevención de caídas",
    description: "Practica pararte en un pie, caminar en línea recta y Tai Chi. Estos ejercicios mejoran la coordinación y reducen significativamente el riesgo de caídas.",
    icon: Activity,
    category: "Equilibrio",
    priority: "alta",
  },
  {
    id: "8",
    title: "Salud cardiovascular",
    description: "Caminatas regulares, natación suave o ejercicios aeróbicos de bajo impacto 3-4 veces por semana mejoran la salud del corazón y los pulmones.",
    icon: Activity,
    category: "Cardiovascular",
    priority: "alta",
  },
  {
    id: "9",
    title: "Comienza despacio",
    description: "Inicia con 5-10 minutos de actividad al día. La constancia es más importante que la intensidad. Establece una rutina que puedas mantener a largo plazo.",
    icon: Lightbulb,
    category: "Principiantes",
    priority: "baja",
  },
  {
    id: "10",
    title: "Ejercicios sin dolor",
    description: "Prioriza estiramientos suaves y movimientos en agua. Escucha a tu cuerpo y detente si algo duele. Siempre consulta a tu médico antes de comenzar un nuevo programa de ejercicios.",
    icon: AlertCircle,
    category: "Precaución",
    priority: "alta",
  },
];

const categories = ["Todas", ...Array.from(new Set(mockRecommendations.map(r => r.category)))];

const Health = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const filteredRecommendations = selectedCategory === "Todas"
    ? mockRecommendations
    : mockRecommendations.filter(rec => rec.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "bg-red-500";
      case "media": return "bg-yellow-500";
      case "baja": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-accessible py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Recomendaciones de Salud
          </h1>
          <p className="text-xl text-muted-foreground">
            Guías personalizadas para mantener tu bienestar y salud
          </p>
        </div>

        {/* Filtros por categoría */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-base"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Grid de recomendaciones */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {filteredRecommendations.map((recommendation) => (
            <Card key={recommendation.id} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-4 flex-1">
                    <recommendation.icon className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{recommendation.title}</CardTitle>
                      <Badge 
                        className={`${getPriorityColor(recommendation.priority)} text-white text-xs mb-2`}
                      >
                        Prioridad {recommendation.priority}
                      </Badge>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {recommendation.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {recommendation.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Información importante */}
        <Card className="bg-accent/10 border-accent">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Importante</h3>
                <p className="text-lg text-muted-foreground">
                  Estas recomendaciones son generales. Siempre consulta con tu médico antes de iniciar un nuevo programa de ejercicios, especialmente si tienes condiciones médicas preexistentes. Escucha a tu cuerpo y ajusta la intensidad según tu nivel de comodidad.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            onClick={() => navigate("/exercises")}
            size="lg"
            className="text-lg"
          >
            Ver ejercicios recomendados
          </Button>
          <Button
            onClick={() => navigate("/blog")}
            size="lg"
            variant="outline"
            className="text-lg"
          >
            Leer artículos de nutrición
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Health;
