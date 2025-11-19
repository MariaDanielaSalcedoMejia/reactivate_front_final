import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BookOpen,
  Home,
  MessageSquare,
  Map,
  TrendingUp,
  Dumbbell,
  HeartPulse,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Inicio" },
    { path: "/exercises", icon: Dumbbell, label: "Ejercicios" },
    // { path: "/health", icon: HeartPulse, label: "Evaluación" }, // Deshabilitado
    { path: "/blog", icon: BookOpen, label: "Blog" },
    { path: "/forum", icon: MessageSquare, label: "Foro" },
    { path: "/progress", icon: TrendingUp, label: "Progreso" },
    { path: "/map", icon: Map, label: "Parques" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-md">
      <div className="container-accessible">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Activity className="w-10 h-10 text-accent" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="lg"
                  className="gap-2 text-lg"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold color-green-200">{user?.name}</span>
             
            </div>
            
            <Button
              onClick={logout}
              variant="outline"
              size="lg"
              className="hidden md:flex gap-2"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </Button>

            {/* Mobile menu button */}
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="lg"
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="lg"
                    className="w-full justify-start gap-3 text-lg"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <div className="px-3 mb-3">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <Button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
