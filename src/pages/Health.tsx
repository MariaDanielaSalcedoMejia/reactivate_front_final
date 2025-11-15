import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Heart, Activity, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";

interface HealthAssessment {
  mobilityLevel: string;
  chronicConditions: string[];
  exerciseFrequency: string;
  painLevel: string;
  goals: string[];
}

const Health = () => {
  const { user } = useAuth();
  const [assessment, setAssessment] = useState<HealthAssessment>({
    mobilityLevel: "",
    chronicConditions: [],
    exerciseFrequency: "",
    painLevel: "",
    goals: [],
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [savedAssessment, setSavedAssessment] = useState<HealthAssessment | null>(null);

  useEffect(() => {
    // Cargar evaluación guardada
    const saved = localStorage.getItem(`reactivate_health_${user?.id}`);
    if (saved) {
      const data = JSON.parse(saved);
      setSavedAssessment(data);
      setAssessment(data);
      setShowRecommendations(true);
    }
  }, [user]);

  const handleConditionToggle = (condition: string) => {
    setAssessment(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions.includes(condition)
        ? prev.chronicConditions.filter(c => c !== condition)
        : [...prev.chronicConditions, condition],
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setAssessment(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`reactivate_health_${user?.id}`, JSON.stringify(assessment));
    setShowRecommendations(true);
    toast({
      title: "Evaluación guardada",
      description: "Tus recomendaciones han sido generadas",
    });
  };

  const getRecommendations = () => {
    const recommendations = [];

    // Basado en nivel de movilidad
    if (assessment.mobilityLevel === "high") {
      recommendations.push({
        title: "Ejercicios de resistencia moderada",
        description: "Puedes realizar ejercicios como caminar rápido, nadar o usar bandas elásticas.",
        icon: Activity,
      });
    } else if (assessment.mobilityLevel === "medium") {
      recommendations.push({
        title: "Ejercicios de bajo impacto",
        description: "Prueba ejercicios sentado, yoga suave o caminatas cortas.",
        icon: Activity,
      });
    } else if (assessment.mobilityLevel === "low") {
      recommendations.push({
        title: "Ejercicios adaptados",
        description: "Movimientos suaves desde una silla, estiramientos y ejercicios de respiración.",
        icon: Activity,
      });
    }

    // Basado en condiciones crónicas
    if (assessment.chronicConditions.includes("arthritis")) {
      recommendations.push({
        title: "Ejercicios para artritis",
        description: "Movimientos suaves en agua caliente, estiramientos y ejercicios de rango de movimiento.",
        icon: Heart,
      });
    }
    if (assessment.chronicConditions.includes("diabetes")) {
      recommendations.push({
        title: "Control de glucosa",
        description: "Caminatas regulares después de las comidas y ejercicios de resistencia ligera.",
        icon: Heart,
      });
    }
    if (assessment.chronicConditions.includes("hypertension")) {
      recommendations.push({
        title: "Cardio suave",
        description: "Caminatas, natación suave y ejercicios de respiración profunda.",
        icon: Heart,
      });
    }

    // Basado en frecuencia de ejercicio
    if (assessment.exerciseFrequency === "none") {
      recommendations.push({
        title: "Comienza despacio",
        description: "Inicia con 5-10 minutos de actividad al día. La constancia es más importante que la intensidad.",
        icon: Lightbulb,
      });
    }

    // Basado en nivel de dolor
    if (assessment.painLevel === "high") {
      recommendations.push({
        title: "Ejercicios sin dolor",
        description: "Prioriza estiramientos suaves y movimientos en agua. Consulta a tu médico antes de comenzar.",
        icon: AlertCircle,
      });
    }

    // Basado en objetivos
    if (assessment.goals.includes("strength")) {
      recommendations.push({
        title: "Fortalecimiento muscular",
        description: "Usa bandas elásticas o botellas de agua. Empieza con 2-3 sesiones semanales.",
        icon: Activity,
      });
    }
    if (assessment.goals.includes("flexibility")) {
      recommendations.push({
        title: "Mejora tu flexibilidad",
        description: "Dedica 10 minutos diarios a estiramientos suaves. El yoga es excelente.",
        icon: Activity,
      });
    }
    if (assessment.goals.includes("balance")) {
      recommendations.push({
        title: "Equilibrio y prevención de caídas",
        description: "Practica pararte en un pie, caminar en línea recta y Tai Chi.",
        icon: Activity,
      });
    }

    return recommendations;
  };

  if (showRecommendations) {
    const recommendations = getRecommendations();

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container-accessible py-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Tus Recomendaciones Personalizadas
            </h1>
            <p className="text-xl text-muted-foreground">
              Basadas en tu evaluación de salud
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            {recommendations.map((rec, idx) => (
              <Card key={idx} className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <rec.icon className="w-10 h-10 text-primary flex-shrink-0" />
                    <div>
                      <CardTitle className="text-2xl mb-2">{rec.title}</CardTitle>
                      <CardDescription className="text-lg">{rec.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="bg-accent/10 border-accent">
            <CardContent className="py-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Importante</h3>
                  <p className="text-lg text-muted-foreground">
                    Estas recomendaciones son generales. Siempre consulta con tu médico antes de iniciar un nuevo programa de ejercicios, especialmente si tienes condiciones médicas preexistentes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => setShowRecommendations(false)}
              size="lg"
              variant="outline"
              className="text-lg"
            >
              Modificar evaluación
            </Button>
            <Button
              onClick={() => window.location.href = "/exercises"}
              size="lg"
              className="text-lg"
            >
              Ver ejercicios recomendados
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-accessible py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Evaluación de Salud
          </h1>
          <p className="text-xl text-muted-foreground">
            Responde estas preguntas para recibir recomendaciones personalizadas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nivel de movilidad */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Cómo describirías tu nivel de movilidad actual?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={assessment.mobilityLevel}
                onValueChange={(value) => setAssessment({ ...assessment, mobilityLevel: value })}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-lg cursor-pointer flex-1">
                    Alto - Puedo caminar sin dificultad y realizar la mayoría de actividades
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="text-lg cursor-pointer flex-1">
                    Medio - Puedo caminar pero con algunas limitaciones
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-lg cursor-pointer flex-1">
                    Bajo - Necesito ayuda para caminar o uso silla de ruedas
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Condiciones crónicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Tienes alguna de estas condiciones? (Selecciona todas las que apliquen)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "arthritis", label: "Artritis" },
                { id: "diabetes", label: "Diabetes" },
                { id: "hypertension", label: "Hipertensión" },
                { id: "heart", label: "Problemas cardíacos" },
                { id: "osteoporosis", label: "Osteoporosis" },
                { id: "none", label: "Ninguna de las anteriores" },
              ].map((condition) => (
                <div
                  key={condition.id}
                  onClick={() => handleConditionToggle(condition.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    assessment.chronicConditions.includes(condition.id)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {assessment.chronicConditions.includes(condition.id) ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2" />
                  )}
                  <Label className="text-lg cursor-pointer flex-1">{condition.label}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Frecuencia de ejercicio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Con qué frecuencia haces ejercicio actualmente?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={assessment.exerciseFrequency}
                onValueChange={(value) => setAssessment({ ...assessment, exerciseFrequency: value })}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="text-lg cursor-pointer flex-1">
                    Diariamente
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="text-lg cursor-pointer flex-1">
                    3-5 veces por semana
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="occasionally" id="occasionally" />
                  <Label htmlFor="occasionally" className="text-lg cursor-pointer flex-1">
                    Ocasionalmente (1-2 veces por semana)
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="text-lg cursor-pointer flex-1">
                    No hago ejercicio regularmente
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Nivel de dolor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Experimentas dolor al moverte?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={assessment.painLevel}
                onValueChange={(value) => setAssessment({ ...assessment, painLevel: value })}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="none" id="pain-none" />
                  <Label htmlFor="pain-none" className="text-lg cursor-pointer flex-1">
                    Sin dolor
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="mild" id="mild" />
                  <Label htmlFor="mild" className="text-lg cursor-pointer flex-1">
                    Dolor leve ocasional
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="text-lg cursor-pointer flex-1">
                    Dolor moderado frecuente
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value="high" id="pain-high" />
                  <Label htmlFor="pain-high" className="text-lg cursor-pointer flex-1">
                    Dolor intenso constante
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Objetivos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Cuáles son tus objetivos? (Selecciona todos los que apliquen)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "strength", label: "Aumentar fuerza muscular" },
                { id: "flexibility", label: "Mejorar flexibilidad" },
                { id: "balance", label: "Mejorar equilibrio" },
                { id: "cardio", label: "Mejorar salud cardiovascular" },
                { id: "weight", label: "Mantener peso saludable" },
                { id: "social", label: "Socializar y conocer gente" },
              ].map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    assessment.goals.includes(goal.id)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {assessment.goals.includes(goal.id) ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2" />
                  )}
                  <Label className="text-lg cursor-pointer flex-1">{goal.label}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full text-lg h-14">
            Generar recomendaciones personalizadas
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Health;
