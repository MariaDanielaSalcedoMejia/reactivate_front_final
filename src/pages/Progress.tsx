import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Activity, TrendingUp, Calendar, Award, Target } from "lucide-react";

interface ProgressEntry {
  exerciseId: string;
  exerciseName: string;
  date: string;
  duration: number;
}

interface WeeklyStats {
  week: string;
  exercises: number;
  minutes: number;
}

const Progress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalExercises: 0,
    totalMinutes: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  useEffect(() => {
    loadProgress();
  }, [user]);

  const loadProgress = () => {
    const saved = localStorage.getItem(`reactivate_progress_${user?.id}`);
    if (saved) {
      const data: ProgressEntry[] = JSON.parse(saved);
      setProgress(data);
      calculateStats(data);
    }
  };

  const calculateStats = (data: ProgressEntry[]) => {
    // Total stats
    const totalExercises = data.length;
    const totalMinutes = data.reduce((sum, entry) => sum + entry.duration, 0);

    // Weekly stats for last 4 weeks
    const weeks: WeeklyStats[] = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7) - 7);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - (i * 7));

      const weekData = data.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekStart && entryDate < weekEnd;
      });

      weeks.unshift({
        week: `Semana ${4 - i}`,
        exercises: weekData.length,
        minutes: weekData.reduce((sum, entry) => sum + entry.duration, 0),
      });
    }
    setWeeklyStats(weeks);

    // Calculate streaks
    const sortedDates = data
      .map(entry => new Date(entry.date).toDateString())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
        const today = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (sortedDates[0] === today || sortedDates[0] === yesterday.toDateString()) {
          currentStreak = 1;
        }
      } else {
        const prevDate = new Date(sortedDates[i - 1]);
        const currDate = new Date(sortedDates[i]);
        const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          tempStreak++;
          if (i === 1 || currentStreak > 0) {
            currentStreak = tempStreak;
          }
        } else {
          if (tempStreak > bestStreak) {
            bestStreak = tempStreak;
          }
          tempStreak = 1;
        }
      }
    }

    if (tempStreak > bestStreak) {
      bestStreak = tempStreak;
    }

    setTotalStats({
      totalExercises,
      totalMinutes,
      currentStreak,
      bestStreak,
    });
  };

  const getMotivationalMessage = () => {
    const { currentStreak, totalExercises } = totalStats;
    
    if (currentStreak >= 7) {
      return "¡Increíble! Llevas una semana completa. ¡Sigue así!";
    } else if (currentStreak >= 3) {
      return "¡Excelente! Estás construyendo un gran hábito.";
    } else if (totalExercises >= 10) {
      return "¡Buen progreso! Cada día cuenta.";
    } else if (totalExercises >= 1) {
      return "¡Gran comienzo! El primer paso es el más importante.";
    } else {
      return "Empieza hoy tu viaje hacia el bienestar.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-accessible py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Tu Progreso
          </h1>
          <p className="text-xl text-muted-foreground">
            Seguimiento de tu actividad física
          </p>
        </div>

        {/* Total Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Total Ejercicios</CardTitle>
              <Activity className="w-8 h-8 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">
                {totalStats.totalExercises}
              </div>
              <p className="text-muted-foreground mt-2">ejercicios completados</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Tiempo Total</CardTitle>
              <TrendingUp className="w-8 h-8 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {totalStats.totalMinutes}
              </div>
              <p className="text-muted-foreground mt-2">minutos activos</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Racha Actual</CardTitle>
              <Calendar className="w-8 h-8 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-warning">
                {totalStats.currentStreak}
              </div>
              <p className="text-muted-foreground mt-2">días consecutivos</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Mejor Racha</CardTitle>
              <Award className="w-8 h-8 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-success">
                {totalStats.bestStreak}
              </div>
              <p className="text-muted-foreground mt-2">días consecutivos</p>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Message */}
        <Card className="mb-8 gradient-hero border-0 text-primary-foreground">
          <CardContent className="py-8">
            <div className="flex items-center gap-4">
              <Target className="w-12 h-12 flex-shrink-0" />
              <p className="text-2xl font-semibold">{getMotivationalMessage()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Progreso Semanal</CardTitle>
            <CardDescription className="text-lg">
              Últimas 4 semanas de actividad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weeklyStats.map((week, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">{week.week}</span>
                    <span className="text-lg text-muted-foreground">
                      {week.exercises} ejercicios • {week.minutes} min
                    </span>
                  </div>
                  <div className="relative h-10 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute h-full gradient-accent rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((week.exercises / 7) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Actividad Reciente</CardTitle>
            <CardDescription className="text-lg">
              Tus últimos ejercicios completados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {progress.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">
                  Aún no has completado ningún ejercicio
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {progress.slice(-10).reverse().map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border-2 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Activity className="w-6 h-6 text-accent" />
                      <div>
                        <p className="text-lg font-semibold">{entry.exerciseName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()} • {entry.duration} min
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Progress;
