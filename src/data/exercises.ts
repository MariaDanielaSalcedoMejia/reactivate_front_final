export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  description: string;
  duration: string;
  difficulty: "Fácil" | "Moderado" | "Avanzado";
  benefits: string[];
  instructions: string[];
  imageUrl: string;
}

export const bodyParts = [
  { id: "piernas", name: "Piernas", icon: "🦵" },
  { id: "brazos", name: "Brazos", icon: "💪" },
  { id: "espalda", name: "Espalda", icon: "🧍" },
  { id: "abdomen", name: "Abdomen", icon: "🏋️" },
  { id: "cuello", name: "Cuello", icon: "👤" },
  { id: "cardio", name: "Cardio", icon: "❤️" },
];

export const exercises: Exercise[] = [
  // Piernas
  {
    id: "1",
    name: "Sentadillas de silla",
    bodyPart: "piernas",
    description: "Ejercicio suave para fortalecer piernas sin impacto",
    duration: "10-15 repeticiones",
    difficulty: "Fácil",
    benefits: [
      "Fortalece cuádriceps y glúteos",
      "Mejora el equilibrio",
      "Ayuda con actividades diarias",
    ],
    instructions: [
      "Siéntate en una silla firme",
      "Levántate lentamente sin usar las manos",
      "Mantén la espalda recta",
      "Baja controladamente",
      "Repite el movimiento",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Elevación de talones",
    bodyPart: "piernas",
    description: "Fortalece las pantorrillas y mejora el equilibrio",
    duration: "15-20 repeticiones",
    difficulty: "Fácil",
    benefits: [
      "Fortalece pantorrillas",
      "Mejora el equilibrio al caminar",
      "Previene caídas",
    ],
    instructions: [
      "Párate cerca de una pared o silla para apoyo",
      "Eleva los talones despacio",
      "Mantén arriba 2 segundos",
      "Baja controladamente",
      "Mantén las rodillas rectas",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Marcha en el lugar",
    bodyPart: "piernas",
    description: "Ejercicio cardiovascular suave",
    duration: "2-3 minutos",
    difficulty: "Moderado",
    benefits: [
      "Mejora circulación",
      "Fortalece piernas",
      "Bajo impacto",
    ],
    instructions: [
      "Párate con postura erguida",
      "Eleva una rodilla a la vez",
      "Balancea los brazos naturalmente",
      "Mantén un ritmo constante",
      "Respira profundamente",
    ],
    imageUrl: "/placeholder.svg",
  },
  // Brazos
  {
    id: "4",
    name: "Flexiones de bíceps con botella",
    bodyPart: "brazos",
    description: "Fortalece los brazos con objetos cotidianos",
    duration: "10-12 repeticiones",
    difficulty: "Fácil",
    benefits: [
      "Fortalece bíceps",
      "Mejora fuerza para cargar objetos",
      "Aumenta autonomía",
    ],
    instructions: [
      "Sostén una botella de agua en cada mano",
      "Brazos a los lados del cuerpo",
      "Dobla los codos lentamente",
      "Acerca las botellas a los hombros",
      "Baja controladamente",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Círculos de hombros",
    bodyPart: "brazos",
    description: "Aumenta la movilidad y reduce tensión",
    duration: "10 círculos cada dirección",
    difficulty: "Fácil",
    benefits: [
      "Aumenta movilidad de hombros",
      "Reduce tensión",
      "Previene rigidez",
    ],
    instructions: [
      "Siéntate o párate con postura erguida",
      "Haz círculos lentos con los hombros",
      "Primero hacia adelante",
      "Luego hacia atrás",
      "Mantén movimientos suaves",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Extensiones de tríceps",
    bodyPart: "brazos",
    description: "Fortalece la parte posterior del brazo",
    duration: "10-12 repeticiones",
    difficulty: "Moderado",
    benefits: [
      "Fortalece tríceps",
      "Mejora fuerza para empujar",
      "Tonifica brazos",
    ],
    instructions: [
      "Siéntate con espalda recta",
      "Levanta una botella con ambas manos sobre la cabeza",
      "Baja la botella detrás de la cabeza",
      "Mantén los codos cerca de las orejas",
      "Sube lentamente",
    ],
    imageUrl: "/placeholder.svg",
  },
  // Espalda
  {
    id: "7",
    name: "Estiramiento de gato-camello",
    bodyPart: "espalda",
    description: "Aumenta flexibilidad de la columna",
    duration: "8-10 repeticiones",
    difficulty: "Fácil",
    benefits: [
      "Mejora flexibilidad de espalda",
      "Alivia tensión",
      "Mejora postura",
    ],
    instructions: [
      "Apóyate en manos y rodillas",
      "Arquea la espalda hacia arriba (gato)",
      "Mantén 3 segundos",
      "Baja la espalda hacia abajo (camello)",
      "Alterna suavemente",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "8",
    name: "Remo con banda elástica",
    bodyPart: "espalda",
    description: "Fortalece la parte superior de la espalda",
    duration: "10-12 repeticiones",
    difficulty: "Moderado",
    benefits: [
      "Fortalece espalda alta",
      "Mejora postura",
      "Previene dolor de espalda",
    ],
    instructions: [
      "Siéntate con piernas extendidas",
      "Coloca banda alrededor de los pies",
      "Tira de la banda hacia ti",
      "Mantén la espalda recta",
      "Aprieta omóplatos",
    ],
    imageUrl: "/placeholder.svg",
  },
  // Abdomen
  {
    id: "9",
    name: "Inclinaciones laterales sentado",
    bodyPart: "abdomen",
    description: "Trabaja oblicuos suavemente",
    duration: "10 repeticiones por lado",
    difficulty: "Fácil",
    benefits: [
      "Fortalece oblicuos",
      "Mejora flexibilidad lateral",
      "Ayuda con el balance",
    ],
    instructions: [
      "Siéntate en una silla",
      "Coloca manos detrás de la cabeza",
      "Inclínate suavemente a un lado",
      "Regresa al centro",
      "Alterna los lados",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "10",
    name: "Respiración abdominal",
    bodyPart: "abdomen",
    description: "Fortalece el core con respiración",
    duration: "5-8 respiraciones",
    difficulty: "Fácil",
    benefits: [
      "Fortalece abdomen profundo",
      "Mejora respiración",
      "Reduce estrés",
    ],
    instructions: [
      "Siéntate o acuéstate cómodamente",
      "Coloca mano en el abdomen",
      "Inhala profundamente por la nariz",
      "El abdomen debe expandirse",
      "Exhala lentamente por la boca",
    ],
    imageUrl: "/placeholder.svg",
  },
  // Cuello
  {
    id: "11",
    name: "Giros de cuello suaves",
    bodyPart: "cuello",
    description: "Alivia tensión del cuello",
    duration: "8-10 repeticiones",
    difficulty: "Fácil",
    benefits: [
      "Reduce tensión cervical",
      "Mejora movilidad",
      "Previene rigidez",
    ],
    instructions: [
      "Siéntate con espalda recta",
      "Gira la cabeza lentamente a la derecha",
      "Mantén 3 segundos",
      "Regresa al centro",
      "Repite hacia el otro lado",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "12",
    name: "Inclinación lateral de cuello",
    bodyPart: "cuello",
    description: "Estira los músculos laterales del cuello",
    duration: "5 repeticiones por lado",
    difficulty: "Fácil",
    benefits: [
      "Estira músculos del cuello",
      "Alivia tensión",
      "Mejora rango de movimiento",
    ],
    instructions: [
      "Siéntate erguido",
      "Inclina la oreja hacia el hombro",
      "No levantes el hombro",
      "Mantén 10-15 segundos",
      "Alterna los lados",
    ],
    imageUrl: "/placeholder.svg",
  },
  // Cardio
  {
    id: "13",
    name: "Caminar en el lugar",
    bodyPart: "cardio",
    description: "Ejercicio cardiovascular básico",
    duration: "3-5 minutos",
    difficulty: "Fácil",
    benefits: [
      "Mejora salud cardiovascular",
      "Bajo impacto",
      "Se puede hacer en casa",
    ],
    instructions: [
      "Párate con postura erguida",
      "Camina elevando las rodillas",
      "Balancea los brazos",
      "Mantén un ritmo cómodo",
      "Respira naturalmente",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "14",
    name: "Pasos laterales",
    bodyPart: "cardio",
    description: "Mejora coordinación y cardio",
    duration: "2-3 minutos",
    difficulty: "Moderado",
    benefits: [
      "Mejora coordinación",
      "Fortalece piernas",
      "Ejercicio cardiovascular",
    ],
    instructions: [
      "Párate con pies juntos",
      "Da un paso grande a la izquierda",
      "Junta el pie derecho",
      "Repite hacia la derecha",
      "Mantén ritmo constante",
    ],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "15",
    name: "Baile suave",
    bodyPart: "cardio",
    description: "Ejercicio divertido y efectivo",
    duration: "5-10 minutos",
    difficulty: "Moderado",
    benefits: [
      "Mejora ánimo",
      "Ejercicio cardiovascular completo",
      "Mejora coordinación",
    ],
    instructions: [
      "Pon tu música favorita",
      "Muévete al ritmo",
      "Usa movimientos suaves",
      "Disfruta el momento",
      "Descansa cuando lo necesites",
    ],
    imageUrl: "/placeholder.svg",
  },
];
