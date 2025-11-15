import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  type HealthAssessment,
  mobilityLevels,
  chronicConditions,
  exerciseFrequencies,
  painLevels,
  goalOptions,
  generateRecommendations,
} from "@/data/health";

const Health = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    if (!user?.id) return;
    
    const saved = localStorage.getItem(`reactivate_health_${user.id}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Validar que los datos son válidos y no null
        if (data && typeof data === 'object' && 'mobilityLevel' in data) {
          setSavedAssessment(data);
          setAssessment(data);
          setShowRecommendations(true);
        }
      } catch (error) {
        console.error("Error al cargar la evaluación guardada:", error);
        // Si hay error, limpiar el localStorage
        localStorage.removeItem(`reactivate_health_${user.id}`);
      }
    }
  }, [user]);

  const handleConditionToggle = (condition: string) => {
    setAssessment(prev => {
      const currentConditions = prev.chronicConditions || [];
      
      // Si se selecciona "none", limpiar todas las demás condiciones
      if (condition === "none") {
        return {
          ...prev,
          chronicConditions: currentConditions.includes("none") 
            ? [] 
            : ["none"],
        };
      }
      
      // Si se selecciona cualquier otra condición, quitar "none" si está presente
      const newConditions = currentConditions.includes(condition)
        ? currentConditions.filter(c => c !== condition)
        : [...currentConditions.filter(c => c !== "none"), condition];
      
      return {
        ...prev,
        chronicConditions: newConditions,
      };
    });
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
    
    // Validar que se haya completado al menos el nivel de movilidad
    if (!assessment.mobilityLevel) {
      toast({
        title: "Completa la evaluación",
        description: "Por favor, selecciona al menos tu nivel de movilidad",
        variant: "destructive",
      });
      return;
    }

    // Validar que se haya seleccionado al menos un objetivo
    if (assessment.goals.length === 0) {
      toast({
        title: "Completa la evaluación",
        description: "Por favor, selecciona al menos un objetivo",
        variant: "destructive",
      });
      return;
    }

    try {
      localStorage.setItem(`reactivate_health_${user?.id}`, JSON.stringify(assessment));
      setShowRecommendations(true);
      toast({
        title: "Evaluación guardada",
        description: "Tus recomendaciones han sido generadas",
      });
    } catch (error) {
      console.error("Error al guardar la evaluación:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la evaluación. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const getRecommendations = () => {
    return generateRecommendations(assessment);
  };

  if (showRecommendations) {
    const recommendations = getRecommendations();

    // Si no hay recomendaciones, mostrar mensaje
    if (recommendations.length === 0) {
      return (
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container-accessible py-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Evaluación incompleta</CardTitle>
                <CardDescription>
                  No se pudieron generar recomendaciones. Por favor, completa todos los campos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setShowRecommendations(false)}
                  className="w-full"
                >
                  Volver a la evaluación
                </Button>
              </CardContent>
            </Card>
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
              onClick={() => navigate("/exercises")}
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
                {mobilityLevels.map((level) => (
                  <div key={level.value} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value={level.value} id={level.value} />
                    <Label htmlFor={level.value} className="text-lg cursor-pointer flex-1">
                      {level.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Condiciones crónicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Tienes alguna de estas condiciones? (Selecciona todas las que apliquen)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chronicConditions.map((condition) => (
                <div
                  key={condition.id}
                  onClick={() => handleConditionToggle(condition.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    (assessment.chronicConditions || []).includes(condition.id)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {(assessment.chronicConditions || []).includes(condition.id) ? (
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
                {exerciseFrequencies.map((freq) => (
                  <div key={freq.value} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value={freq.value} id={freq.value} />
                    <Label htmlFor={freq.value} className="text-lg cursor-pointer flex-1">
                      {freq.label}
                    </Label>
                  </div>
                ))}
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
                {painLevels.map((pain) => (
                  <div key={pain.value} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value={pain.value} id={pain.value} />
                    <Label htmlFor={pain.value} className="text-lg cursor-pointer flex-1">
                      {pain.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Objetivos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">¿Cuáles son tus objetivos? (Selecciona todos los que apliquen)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {goalOptions.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    (assessment.goals || []).includes(goal.id)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {(assessment.goals || []).includes(goal.id) ? (
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
