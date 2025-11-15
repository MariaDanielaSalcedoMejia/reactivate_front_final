import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exercises, bodyParts, Exercise } from "@/data/exercises";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Exercises = () => {
  const [selectedPart, setSelectedPart] = useState<string>("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { user } = useAuth();

  const filteredExercises = selectedPart === "all" 
    ? exercises 
    : exercises.filter(ex => ex.bodyPart === selectedPart);

  const markAsCompleted = () => {
    if (!selectedExercise || !user) return;

    const progress = localStorage.getItem(`reactivate_progress_${user.id}`);
    const data = progress ? JSON.parse(progress) : [];
    
    data.push({
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      date: new Date().toISOString(),
      duration: 15, // duración promedio
    });
    
    localStorage.setItem(`reactivate_progress_${user.id}`, JSON.stringify(data));
    
    toast({
      title: "¡Excelente trabajo!",
      description: `Has completado: ${selectedExercise.name}`,
    });
    
    setSelectedExercise(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-success";
      case "Moderado": return "bg-warning";
      case "Avanzado": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-accessible py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Guía de Ejercicios
          </h1>
          <p className="text-xl text-muted-foreground">
            Ejercicios diseñados especialmente para adultos mayores. Selecciona la parte del cuerpo que deseas trabajar.
          </p>
        </div>

        {/* Body Part Selector */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Selecciona una zona</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <Button
              onClick={() => setSelectedPart("all")}
              variant={selectedPart === "all" ? "default" : "outline"}
              size="lg"
              className="h-24 flex flex-col gap-2"
            >
              <span className="text-3xl">🎯</span>
              <span className="text-base">Todos</span>
            </Button>
            {bodyParts.map((part) => (
              <Button
                key={part.id}
                onClick={() => setSelectedPart(part.id)}
                variant={selectedPart === part.id ? "default" : "outline"}
                size="lg"
                className="h-24 flex flex-col gap-2"
              >
                <span className="text-3xl">{part.icon}</span>
                <span className="text-base">{part.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Exercises Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {selectedPart === "all" 
              ? "Todos los ejercicios" 
              : `Ejercicios de ${bodyParts.find(p => p.id === selectedPart)?.name}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <Card 
                key={exercise.id}
                className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-2"
                onClick={() => setSelectedExercise(exercise)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-2xl">{exercise.name}</CardTitle>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg">
                    {exercise.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span className="text-lg">{exercise.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exercise.benefits.slice(0, 2).map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Exercise Detail Dialog */}
        <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl">{selectedExercise?.name}</DialogTitle>
              <DialogDescription className="text-lg">
                {selectedExercise?.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex gap-4 flex-wrap">
                <Badge className={getDifficultyColor(selectedExercise?.difficulty || "")}>
                  {selectedExercise?.difficulty}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedExercise?.duration}
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Beneficios
                </h3>
                <ul className="space-y-2">
                  {selectedExercise?.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3">Instrucciones</h3>
                <ol className="space-y-3">
                  {selectedExercise?.instructions.map((instruction, idx) => (
                    <li key={idx} className="flex gap-3 text-lg">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="pt-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-warning/10 border border-warning rounded-lg p-4">
                <p className="text-lg font-semibold text-warning-foreground">
                  ⚠️ Importante: Consulta con tu médico antes de comenzar cualquier programa de ejercicios. Detente si sientes dolor.
                </p>
              </div>

              <Button 
                onClick={markAsCompleted}
                size="lg" 
                className="w-full text-lg h-14"
              >
                Marcar como completado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Exercises;
