export interface Park {
  id: string;
  name: string;
  address: string;
  distance: string;
  facilities: string[];
  coordinates: { lat: number; lng: number };
  rating: number;
  description: string;
}

export const parks: Park[] = [
  {
    id: "1",
    name: "Parque Central de la Ciudad",
    address: "Av. Principal 123",
    distance: "0.8 km",
    facilities: ["Senderos", "Área de ejercicio", "Baños", "Bancas"],
    coordinates: { lat: -34.603722, lng: -58.381592 },
    rating: 4.5,
    description: "Amplio parque con senderos pavimentados ideales para caminatas. Cuenta con zona de ejercicios adaptados y áreas de descanso.",
  },
  {
    id: "2",
    name: "Plaza del Sol",
    address: "Calle 45 y 12",
    distance: "1.2 km",
    facilities: ["Gimnasio al aire libre", "Fuente de agua", "Iluminación"],
    coordinates: { lat: -34.606722, lng: -58.377592 },
    rating: 4.2,
    description: "Plaza comunitaria con equipamiento para ejercicio. Muy concurrida por las mañanas por adultos mayores.",
  },
  {
    id: "3",
    name: "Parque Los Olivos",
    address: "Boulevard Norte 789",
    distance: "1.5 km",
    facilities: ["Senderos", "Zona de yoga", "Cafetería", "Estacionamiento"],
    coordinates: { lat: -34.600722, lng: -58.385592 },
    rating: 4.7,
    description: "Hermoso parque arbolado con clases grupales gratuitas de tai chi y yoga los martes y jueves a las 9 AM.",
  },
  {
    id: "4",
    name: "Parque Ribereño",
    address: "Costanera Este s/n",
    distance: "2.0 km",
    facilities: ["Circuito de caminata", "Miradores", "Parrillas", "Bicicletero"],
    coordinates: { lat: -34.608722, lng: -58.371592 },
    rating: 4.4,
    description: "Parque junto al río con vistas panorámicas. Circuito de 2km perfectamente señalizado con distancias.",
  },
  {
    id: "5",
    name: "Plaza de las Flores",
    address: "Av. Flores 456",
    distance: "0.5 km",
    facilities: ["Área de ejercicio", "Baños adaptados", "Sombra"],
    coordinates: { lat: -34.605722, lng: -58.379592 },
    rating: 4.0,
    description: "Plaza de barrio tranquila, ideal para ejercicios matutinos. Grupos de caminata salen a las 8 AM de lunes a viernes.",
  },
];
