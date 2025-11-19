import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, User, Mail, Lock, Calendar } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await register(name, email, password, parseInt(age));
    if (success) {
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Activity className="w-16 h-16 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold">Únete a ReActívate</CardTitle>
          <CardDescription className="text-lg">
            Crea tu cuenta y comienza tu viaje de bienestar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">
                Nombre completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-lg">
                Edad
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  min="15"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">Mínimo 6 caracteres</p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg h-14"
              disabled={isLoading}
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-lg">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
