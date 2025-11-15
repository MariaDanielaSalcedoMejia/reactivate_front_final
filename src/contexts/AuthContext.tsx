import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, age: number) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem("reactivate_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (name: string, email: string, password: string, age: number): Promise<boolean> => {
    try {
      // Obtener usuarios existentes
      const usersData = localStorage.getItem("reactivate_users");
      const users = usersData ? JSON.parse(usersData) : [];

      // Verificar si el email ya existe
      if (users.some((u: any) => u.email === email)) {
        toast({
          title: "Error",
          description: "Este correo ya está registrado",
          variant: "destructive",
        });
        return false;
      }

      // Crear nuevo usuario
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        age,
        registeredAt: new Date().toISOString(),
      };

      // Guardar contraseña (en un caso real, esto debería estar hasheado)
      const userWithPassword = { ...newUser, password };
      users.push(userWithPassword);
      localStorage.setItem("reactivate_users", JSON.stringify(users));

      // Inicializar datos del usuario
      localStorage.setItem(`reactivate_progress_${newUser.id}`, JSON.stringify([]));
      localStorage.setItem(`reactivate_health_${newUser.id}`, JSON.stringify(null));

      setUser(newUser);
      localStorage.setItem("reactivate_user", JSON.stringify(newUser));

      toast({
        title: "¡Bienvenido a ReActívate!",
        description: "Tu cuenta ha sido creada exitosamente",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la cuenta",
        variant: "destructive",
      });
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersData = localStorage.getItem("reactivate_users");
      const users = usersData ? JSON.parse(usersData) : [];

      const userWithPassword = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!userWithPassword) {
        toast({
          title: "Error",
          description: "Correo o contraseña incorrectos",
          variant: "destructive",
        });
        return false;
      }

      const { password: _, ...userWithoutPassword } = userWithPassword;
      setUser(userWithoutPassword);
      localStorage.setItem("reactivate_user", JSON.stringify(userWithoutPassword));

      toast({
        title: "¡Bienvenido de nuevo!",
        description: `Hola ${userWithoutPassword.name}`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar sesión",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("reactivate_user");
    navigate("/login");
    toast({
      title: "Sesión cerrada",
      description: "Hasta pronto",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
