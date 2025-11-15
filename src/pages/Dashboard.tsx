import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Activity,
  TrendingUp,
  Heart,
  Dumbbell,
  BookOpen,
  MessageSquare,
  Target,
  Award,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    weeklyExercises: 0,
    totalMinutes: 0,
    streak: 0,
  });

  useEffect(() => {
    // Cargar estadísticas del localStorage
    const progress = localStorage.getItem(`reactivate_progress_${user?.id}`);
    if (progress) {
      const data = JSON.parse(progress);
      // Calcular estadísticas simples
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const weeklyData = data.filter((entry: any) => 
        new Date(entry.date) >= weekAgo
      );
      
      setStats({
        weeklyExercises: weeklyData.length,
        totalMinutes: weeklyData.reduce((sum: number, entry: any) => sum + (entry.duration || 0), 0),
        streak: Math.min(data.length, 7),
      });
    }
  }, [user]);

  const quickActions = [
    {
      title: "Ejercicios",
      description: "Explora rutinas diseñadas para ti",
      icon: Dumbbell,
      link: "/exercises",
      color: "text-accent",
    },
    // {
    //   title: "Evaluación de Salud",
    //   description: "Completa tu evaluación personalizada",
    //   icon: Heart,
    //   link: "/health",
    //   color: "text-primary",
    // }, // Deshabilitado
    {
      title: "Blog de Nutrición",
      description: "Consejos de alimentación saludable",
      icon: BookOpen,
      link: "/blog",
      color: "text-success",
    },
    {
      title: "Foro Comunitario",
      description: "Conecta con otros usuarios",
      icon: MessageSquare,
      link: "/forum",
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-accessible py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            ¡Hola, {user?.name}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Bienvenido a tu espacio de bienestar. Aquí está tu resumen de hoy.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Ejercicios</CardTitle>
              <Activity className="w-8 h-8 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent mb-2">
                {stats.weeklyExercises}
              </div>
              <p className="text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Tiempo Activo</CardTitle>
              <Clock className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.totalMinutes} min
              </div>
              <p className="text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Racha</CardTitle>
              <Award className="w-8 h-8 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-warning mb-2">
                {stats.streak} días
              </div>
              <p className="text-muted-foreground">¡Sigue así!</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Goal */}
        <Card className="mb-8 gradient-accent border-0 text-accent-foreground">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Target className="w-8 h-8" />
              Meta del Día
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xl">
              Realiza al menos 20 minutos de actividad física hoy
            </p>
            <Link to="/exercises">
              <Button size="lg" variant="secondary" className="text-lg">
                Comenzar ahora
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.link}>
                <Card className="hover:shadow-lg transition-all hover:scale-[1.02] border-2 h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <action.icon className={`w-12 h-12 ${action.color} flex-shrink-0`} />
                      <div>
                        <CardTitle className="text-2xl mb-2">{action.title}</CardTitle>
                        <CardDescription className="text-lg">
                          {action.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <Card className="mt-8 gradient-primary border-0 text-primary-foreground">
          <CardContent className="py-8">
            <p className="text-2xl font-semibold text-center">
              "La edad no es una barrera para la actividad física. Cada paso cuenta, cada movimiento importa."
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
