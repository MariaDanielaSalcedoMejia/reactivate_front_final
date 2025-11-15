import { Activity, Heart, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface HealthAssessment {
  mobilityLevel: string;
  chronicConditions: string[];
  exerciseFrequency: string;
  painLevel: string;
  goals: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  icon: LucideIcon;
}

// Opciones para el formulario de evaluación
export const mobilityLevels = [
  {
    value: "high",
    label: "Alto - Puedo caminar sin dificultad y realizar la mayoría de actividades",
  },
  {
    value: "medium",
    label: "Medio - Puedo caminar pero con algunas limitaciones",
  },
  {
    value: "low",
    label: "Bajo - Necesito ayuda para caminar o uso silla de ruedas",
  },
];

export const chronicConditions = [
  { id: "arthritis", label: "Artritis" },
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hipertensión" },
  { id: "heart", label: "Problemas cardíacos" },
  { id: "osteoporosis", label: "Osteoporosis" },
  { id: "none", label: "Ninguna de las anteriores" },
];

export const exerciseFrequencies = [
  { value: "daily", label: "Diariamente" },
  { value: "weekly", label: "3-5 veces por semana" },
  { value: "occasionally", label: "Ocasionalmente (1-2 veces por semana)" },
  { value: "none", label: "No hago ejercicio regularmente" },
];

export const painLevels = [
  { value: "none", label: "Sin dolor" },
  { value: "mild", label: "Dolor leve ocasional" },
  { value: "moderate", label: "Dolor moderado frecuente" },
  { value: "high", label: "Dolor intenso constante" },
];

export const goalOptions = [
  { id: "strength", label: "Aumentar fuerza muscular" },
  { id: "flexibility", label: "Mejorar flexibilidad" },
  { id: "balance", label: "Mejorar equilibrio" },
  { id: "cardio", label: "Mejorar salud cardiovascular" },
  { id: "weight", label: "Mantener peso saludable" },
  { id: "social", label: "Socializar y conocer gente" },
];

// Recomendaciones predefinidas por categoría
export const recommendationsByMobility: Record<string, Recommendation> = {
  high: {
    title: "Ejercicios de resistencia moderada",
    description: "Puedes realizar ejercicios como caminar rápido, nadar o usar bandas elásticas.",
    icon: Activity,
  },
  medium: {
    title: "Ejercicios de bajo impacto",
    description: "Prueba ejercicios sentado, yoga suave o caminatas cortas.",
    icon: Activity,
  },
  low: {
    title: "Ejercicios adaptados",
    description: "Movimientos suaves desde una silla, estiramientos y ejercicios de respiración.",
    icon: Activity,
  },
};

export const recommendationsByCondition: Record<string, Recommendation> = {
  arthritis: {
    title: "Ejercicios para artritis",
    description: "Movimientos suaves en agua caliente, estiramientos y ejercicios de rango de movimiento.",
    icon: Heart,
  },
  diabetes: {
    title: "Control de glucosa",
    description: "Caminatas regulares después de las comidas y ejercicios de resistencia ligera.",
    icon: Heart,
  },
  hypertension: {
    title: "Cardio suave",
    description: "Caminatas, natación suave y ejercicios de respiración profunda.",
    icon: Heart,
  },
  heart: {
    title: "Ejercicios cardiovasculares supervisados",
    description: "Actividades de baja intensidad como caminar, y siempre bajo supervisión médica.",
    icon: Heart,
  },
  osteoporosis: {
    title: "Ejercicios de carga para huesos",
    description: "Caminatas, ejercicios con peso ligero y estiramientos suaves. Evita movimientos bruscos.",
    icon: Heart,
  },
};

export const recommendationsByFrequency: Record<string, Recommendation> = {
  none: {
    title: "Comienza despacio",
    description: "Inicia con 5-10 minutos de actividad al día. La constancia es más importante que la intensidad.",
    icon: Lightbulb,
  },
  occasionally: {
    title: "Aumenta gradualmente",
    description: "Trata de aumentar a 3-4 días por semana. Establece una rutina que puedas mantener.",
    icon: Lightbulb,
  },
};

export const recommendationsByPain: Record<string, Recommendation> = {
  high: {
    title: "Ejercicios sin dolor",
    description: "Prioriza estiramientos suaves y movimientos en agua. Consulta a tu médico antes de comenzar.",
    icon: AlertCircle,
  },
  moderate: {
    title: "Movimientos suaves",
    description: "Escucha a tu cuerpo. Si algo duele, detente. Prioriza estiramientos y movilidad articular.",
    icon: AlertCircle,
  },
};

export const recommendationsByGoal: Record<string, Recommendation> = {
  strength: {
    title: "Fortalecimiento muscular",
    description: "Usa bandas elásticas o botellas de agua. Empieza con 2-3 sesiones semanales.",
    icon: Activity,
  },
  flexibility: {
    title: "Mejora tu flexibilidad",
    description: "Dedica 10 minutos diarios a estiramientos suaves. El yoga es excelente.",
    icon: Activity,
  },
  balance: {
    title: "Equilibrio y prevención de caídas",
    description: "Practica pararte en un pie, caminar en línea recta y Tai Chi.",
    icon: Activity,
  },
  cardio: {
    title: "Salud cardiovascular",
    description: "Caminatas regulares, natación suave o ejercicios aeróbicos de bajo impacto 3-4 veces por semana.",
    icon: Activity,
  },
  weight: {
    title: "Control de peso saludable",
    description: "Combina ejercicio moderado con una dieta balanceada. Caminar 30 minutos al día es un buen inicio.",
    icon: Activity,
  },
  social: {
    title: "Ejercicio social",
    description: "Únete a clases grupales, caminatas en grupo o grupos de ejercicio. La compañía motiva y divierte.",
    icon: Activity,
  },
};

// Función helper para generar recomendaciones basadas en una evaluación
export const generateRecommendations = (assessment: HealthAssessment | null): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Validar que assessment existe y es válido
  if (!assessment) {
    return recommendations;
  }

  // Recomendación por nivel de movilidad
  if (assessment.mobilityLevel && recommendationsByMobility[assessment.mobilityLevel]) {
    recommendations.push(recommendationsByMobility[assessment.mobilityLevel]);
  }

  // Recomendaciones por condiciones crónicas
  if (assessment.chronicConditions && Array.isArray(assessment.chronicConditions)) {
    assessment.chronicConditions.forEach((condition) => {
      if (recommendationsByCondition[condition] && condition !== "none") {
        recommendations.push(recommendationsByCondition[condition]);
      }
    });
  }

  // Recomendación por frecuencia de ejercicio
  if (assessment.exerciseFrequency && recommendationsByFrequency[assessment.exerciseFrequency]) {
    recommendations.push(recommendationsByFrequency[assessment.exerciseFrequency]);
  }

  // Recomendación por nivel de dolor
  if (assessment.painLevel && recommendationsByPain[assessment.painLevel]) {
    recommendations.push(recommendationsByPain[assessment.painLevel]);
  }

  // Recomendaciones por objetivos
  if (assessment.goals && Array.isArray(assessment.goals)) {
    assessment.goals.forEach((goal) => {
      if (recommendationsByGoal[goal]) {
        recommendations.push(recommendationsByGoal[goal]);
      }
    });
  }

  return recommendations;
};

// Ejemplos de evaluaciones completadas para testing/demo
export const mockAssessments: HealthAssessment[] = [
  {
    mobilityLevel: "high",
    chronicConditions: ["hypertension"],
    exerciseFrequency: "weekly",
    painLevel: "mild",
    goals: ["strength", "cardio", "weight"],
  },
  {
    mobilityLevel: "medium",
    chronicConditions: ["arthritis", "diabetes"],
    exerciseFrequency: "occasionally",
    painLevel: "moderate",
    goals: ["flexibility", "balance"],
  },
  {
    mobilityLevel: "low",
    chronicConditions: ["osteoporosis"],
    exerciseFrequency: "none",
    painLevel: "high",
    goals: ["flexibility", "balance"],
  },
  {
    mobilityLevel: "medium",
    chronicConditions: ["none"],
    exerciseFrequency: "weekly",
    painLevel: "none",
    goals: ["strength", "cardio", "social"],
  },
  {
    mobilityLevel: "high",
    chronicConditions: ["heart"],
    exerciseFrequency: "daily",
    painLevel: "none",
    goals: ["cardio", "weight"],
  },
];

// Usuario de ejemplo con evaluación completada
export const mockUserWithAssessment = {
  userId: "user_123",
  assessment: mockAssessments[0],
  completedAt: new Date("2025-01-15").toISOString(),
  recommendations: generateRecommendations(mockAssessments[0]),
};

