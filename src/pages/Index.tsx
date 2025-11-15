import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Heart, Users, TrendingUp, MapPin, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20 px-4">
        <div className="container-accessible">
          <div className="max-w-4xl mx-auto text-center">
            <Activity className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              ReActívate
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-90">
              Plataforma diseñada para incentivar la actividad física en adultos mayores
            </p>
            <p className="text-xl md:text-2xl mb-12 opacity-80">
              Tu bienestar está a un clic de distancia. Ejercicios adaptados, comunidad activa y seguimiento personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-xl h-16 px-8">
                  Comenzar ahora
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-xl h-16 px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container-accessible">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            ¿Qué ofrece ReActívate?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-8 text-center">
                <Activity className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-3">Ejercicios Adaptados</h3>
                <p className="text-lg text-muted-foreground">
                  Rutinas diseñadas específicamente para adultos mayores, con diferentes niveles de dificultad
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-8 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Evaluación de Salud</h3>
                <p className="text-lg text-muted-foreground">
                  Recomendaciones personalizadas basadas en tu condición física y objetivos
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-8 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-warning" />
                <h3 className="text-2xl font-bold mb-3">Comunidad Activa</h3>
                <p className="text-lg text-muted-foreground">
                  Conecta con otros usuarios, comparte experiencias y motívense mutuamente
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-8 text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-success" />
                <h3 className="text-2xl font-bold mb-3">Seguimiento de Progreso</h3>
                <p className="text-lg text-muted-foreground">
                  Visualiza tu evolución con gráficas y estadísticas detalladas
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-8 text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-3">Parques Cercanos</h3>
                <p className="text-lg text-muted-foreground">
                  Descubre espacios verdes cerca de ti para realizar actividad física al aire libre
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-8 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Blog de Nutrición</h3>
                <p className="text-lg text-muted-foreground">
                  Consejos y recetas para mantener una alimentación saludable
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-accent text-accent-foreground py-20 px-4">
        <div className="container-accessible text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¡Empieza tu viaje hacia el bienestar hoy!
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Únete a miles de adultos mayores que ya están mejorando su calidad de vida con ReActívate
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-xl h-16 px-12">
              Registrarse gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4">
        <div className="container-accessible text-center text-muted-foreground">
          <p className="text-lg">
            © 2025 ReActívate - Plataforma de bienestar para adultos mayores
          </p>
          <p className="mt-2">
            Tu salud, nuestra prioridad
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
