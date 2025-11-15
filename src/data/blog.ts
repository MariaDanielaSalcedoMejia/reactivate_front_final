export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Alimentación saludable después de los 60",
    excerpt: "Descubre cómo adaptar tu dieta para mantener la energía y vitalidad en la edad dorada.",
    content: `
# Alimentación saludable después de los 60

La nutrición adecuada es fundamental para mantener la calidad de vida en la edad adulta mayor. A medida que envejecemos, nuestras necesidades nutricionales cambian.

## Proteínas: La base de la fuerza

Las proteínas son esenciales para mantener la masa muscular. Incluye en tu dieta:
- Pescado (salmón, atún)
- Pollo sin piel
- Huevos
- Legumbres
- Lácteos bajos en grasa

## Calcio y Vitamina D

Para huesos fuertes:
- Leche fortificada
- Yogur
- Queso
- Brócoli
- Almendras
- Exposición solar moderada (15-20 minutos diarios)

## Hidratación

El agua es vital. Aunque sientas menos sed, debes beber:
- 6-8 vasos de agua al día
- Infusiones sin azúcar
- Caldos caseros

## Fibra para la digestión

Mejora el tránsito intestinal con:
- Frutas con cáscara
- Verduras
- Cereales integrales
- Legumbres

## Grasas saludables

No todas las grasas son malas:
- Aceite de oliva
- Aguacate
- Nueces
- Pescados grasos

## Consejo final

Consulta con tu médico o nutricionista para un plan personalizado según tus condiciones de salud.
    `,
    category: "Nutrición",
    author: "Dra. María González",
    date: "2025-01-10",
    readTime: "5 min",
    imageUrl: "/placeholder.svg",
    tags: ["nutrición", "salud", "proteínas", "calcio"],
  },
  {
    id: "2",
    title: "Los mejores alimentos para fortalecer los huesos",
    excerpt: "La osteoporosis es prevenible con la alimentación correcta. Conoce qué alimentos ayudan.",
    content: `
# Los mejores alimentos para fortalecer los huesos

La salud ósea es crucial para mantener la independencia y prevenir fracturas en la edad adulta mayor.

## Lácteos: El clásico confiable

- **Leche**: 300mg de calcio por vaso
- **Yogur**: Probióticos + calcio
- **Queso**: Alto en calcio, moderado en consumo

## Vegetales de hoja verde

- **Espinacas**: Ricas en calcio y vitamina K
- **Kale**: Superalimento para huesos
- **Brócoli**: Calcio + vitamina C

## Pescados grasos

El salmón, sardinas y caballa aportan:
- Vitamina D natural
- Omega-3
- Calcio (si comes las espinas de sardinas)

## Frutos secos y semillas

- **Almendras**: 75mg de calcio por porción
- **Semillas de sésamo**: Muy ricas en calcio
- **Chía**: Calcio + omega-3

## Alimentos fortificados

Muchos productos están enriquecidos con calcio y vitamina D:
- Jugos de naranja
- Cereales
- Leches vegetales

## Receta recomendada: Batido fortalecedor

**Ingredientes:**
- 1 taza de leche o leche fortificada
- 1 plátano
- 1 cucharada de semillas de chía
- Un puñado de espinacas
- 5 almendras

**Preparación:** Licúa todo hasta obtener una mezcla suave.

## Importante

La absorción de calcio mejora con vitamina D. Combina estos alimentos con exposición solar moderada.
    `,
    category: "Nutrición",
    author: "Dr. Carlos Ramírez",
    date: "2025-01-08",
    readTime: "4 min",
    imageUrl: "/placeholder.svg",
    tags: ["huesos", "calcio", "osteoporosis", "vitamina D"],
  },
  {
    id: "3",
    title: "Hidratación: El secreto mejor guardado",
    excerpt: "La deshidratación es común en adultos mayores. Aprende a mantener niveles óptimos de hidratación.",
    content: `
# Hidratación: El secreto mejor guardado

La sensación de sed disminuye con la edad, pero la necesidad de agua no. La deshidratación puede causar confusión, caídas y problemas de salud serios.

## ¿Por qué es tan importante?

El agua:
- Regula la temperatura corporal
- Transporta nutrientes
- Elimina toxinas
- Lubrica articulaciones
- Mejora la función cognitiva

## Señales de deshidratación

- Boca seca
- Orina oscura
- Mareos
- Fatiga
- Confusión
- Estreñimiento

## ¿Cuánta agua necesitas?

**Mínimo recomendado:** 6-8 vasos al día (1.5-2 litros)

Aumenta si:
- Hace calor
- Haces ejercicio
- Tomas diuréticos
- Tienes fiebre o diarrea

## Fuentes de hidratación

### Agua pura
La mejor opción, siempre disponible

### Infusiones
- Manzanilla
- Tilo
- Menta
- Jengibre

### Frutas con alto contenido de agua
- Sandía (92% agua)
- Melón (90% agua)
- Naranja (87% agua)
- Pepino (95% agua)

### Caldos y sopas
Excelentes para hidratación + nutrientes

## Consejos prácticos

1. **Ten siempre agua cerca**: Botella visible en cada habitación
2. **Crea rutina**: Agua al despertar, antes de cada comida, antes de dormir
3. **Usa recordatorios**: Alarma en el celular cada 2 horas
4. **Sabores naturales**: Agrega limón, pepino o menta al agua
5. **Registra tu consumo**: Marca en un papel cada vaso que tomes

## Alimentos hidratantes

- Ensaladas frescas
- Gelatina
- Yogur
- Smoothies
- Gazpacho

## Evita

- Exceso de cafeína (deshidrata)
- Alcohol (deshidrata)
- Bebidas muy azucaradas

## En resumen

La hidratación es tan importante como la alimentación. No esperes a tener sed para beber agua. Tu cuerpo te lo agradecerá.
    `,
    category: "Salud",
    author: "Lic. Ana Martínez",
    date: "2025-01-05",
    readTime: "4 min",
    imageUrl: "/placeholder.svg",
    tags: ["hidratación", "agua", "salud", "prevención"],
  },
  {
    id: "4",
    title: "Superalimentos para la memoria",
    excerpt: "Ciertos alimentos pueden ayudar a mantener tu mente aguda. Descubre cuáles son.",
    content: `
# Superalimentos para la memoria

La alimentación tiene un impacto directo en la salud cerebral. Estos alimentos pueden ayudar a mantener tu mente aguda.

## 1. Arándanos: Antioxidantes poderosos

Los arándanos protegen el cerebro del estrés oxidativo y pueden:
- Mejorar la memoria
- Retrasar el envejecimiento cerebral
- Mejorar la comunicación entre neuronas

**Cómo consumir:** 1 taza al día, frescos o congelados

## 2. Nueces: Omega-3 cerebral

Las nueces tienen la forma del cerebro ¡por algo será!
- Alto contenido de omega-3
- Vitamina E
- Mejoran función cognitiva

**Porción ideal:** 7 nueces al día

## 3. Pescado graso: DHA para el cerebro

Salmón, caballa, sardinas:
- DHA (ácido graso esencial)
- Reduce riesgo de Alzheimer
- Mejora memoria

**Frecuencia:** 2-3 veces por semana

## 4. Cúrcuma: El antiinflamatorio dorado

La curcumina de la cúrcuma:
- Cruza la barrera hematoencefálica
- Propiedades antiinflamatorias
- Mejora memoria

**Uso:** En currys, sopas, leche dorada

## 5. Brócoli: Vitamina K

El brócoli es rico en compuestos que:
- Protegen el cerebro
- Mejoran memoria
- Tienen efectos antiinflamatorios

**Consumo:** 3-4 veces por semana

## 6. Huevos: Colina esencial

La yema contiene colina, importante para:
- Neurotransmisor de la memoria
- Desarrollo cerebral
- Función cognitiva

**Cantidad:** 1 huevo al día es seguro

## 7. Chocolate oscuro: Flavonoides

Con mínimo 70% cacao:
- Mejora flujo sanguíneo cerebral
- Estimula función cognitiva
- Antioxidantes

**Porción:** 1-2 cuadros al día

## 8. Té verde: L-teanina

Combina cafeína y L-teanina:
- Mejora atención
- Memoria
- Función cerebral

**Consumo:** 2-3 tazas al día

## Menú diario para la memoria

**Desayuno:**
- Avena con arándanos y nueces
- Té verde

**Almuerzo:**
- Ensalada con salmón
- Brócoli al vapor

**Merienda:**
- Yogur con cúrcuma
- 2 cuadros de chocolate oscuro

**Cena:**
- Huevo revuelto con espinacas
- Infusión

## Recuerda

La constancia es clave. Estos alimentos deben ser parte regular de tu dieta, no soluciones mágicas ocasionales.

Combina buena alimentación con:
- Ejercicio mental (crucigramas, lectura)
- Ejercicio físico
- Socialización
- Buen descanso
    `,
    category: "Nutrición",
    author: "Dra. Patricia López",
    date: "2025-01-03",
    readTime: "6 min",
    imageUrl: "/placeholder.svg",
    tags: ["memoria", "cerebro", "superalimentos", "cognitivo"],
  },
  {
    id: "5",
    title: "Recetas saludables y fáciles para todos los días",
    excerpt: "Platos nutritivos que puedes preparar en menos de 30 minutos.",
    content: `
# Recetas saludables y fáciles para todos los días

Cocinar de forma saludable no tiene que ser complicado. Aquí te compartimos recetas nutritivas y sencillas.

## 1. Sopa de lentejas energizante

**Ingredientes:**
- 1 taza de lentejas
- 2 zanahorias
- 1 cebolla
- 2 dientes de ajo
- Caldo de verduras
- Comino y sal

**Preparación:**
1. Sofríe cebolla y ajo
2. Agrega lentejas y zanahoria picada
3. Cubre con caldo
4. Cocina 25 minutos
5. Sirve caliente

**Beneficios:** Proteínas, hierro, fibra

## 2. Ensalada completa mediterránea

**Ingredientes:**
- Lechuga mixta
- Tomate cherry
- Pepino
- Queso feta bajo en grasa
- Aceitunas
- Atún en agua
- Aceite de oliva y limón

**Preparación:**
1. Lava y corta vegetales
2. Mezcla todo en un bowl
3. Agrega atún
4. Aliña con aceite y limón

**Beneficios:** Omega-3, vitaminas, proteínas

## 3. Pollo al horno con hierbas

**Ingredientes:**
- 2 pechugas de pollo
- Romero, tomillo
- Limón
- Ajo
- Aceite de oliva

**Preparación:**
1. Marina el pollo con hierbas, ajo y limón
2. Deja reposar 15 minutos
3. Hornea a 180°C por 25 minutos
4. Acompaña con vegetales

**Beneficios:** Proteína magra, bajo en grasa

## 4. Batido verde energético

**Ingredientes:**
- 1 plátano
- 1 taza de espinacas
- 1/2 manzana verde
- Jugo de 1 naranja
- 1 cucharada de chía

**Preparación:**
1. Licúa todos los ingredientes
2. Agrega hielo si prefieres
3. Sirve inmediatamente

**Beneficios:** Vitaminas, fibra, energía

## 5. Pescado a la plancha con limón

**Ingredientes:**
- Filete de pescado blanco
- Limón
- Ajo
- Perejil
- Pimienta

**Preparación:**
1. Sazona el pescado
2. Cocina en plancha 4 minutos por lado
3. Exprime limón fresco
4. Espolvorea perejil

**Beneficios:** Omega-3, proteínas, bajo en calorías

## 6. Avena nocturna con frutas

**Ingredientes:**
- 1/2 taza de avena
- 1 taza de leche o leche vegetal
- 1 cucharada de miel
- Frutas frescas
- Nueces

**Preparación:**
1. Mezcla avena con leche
2. Refrigera toda la noche
3. Por la mañana, agrega frutas y nueces
4. Endulza con miel

**Beneficios:** Fibra, energía duradera

## 7. Wrap de vegetales y hummus

**Ingredientes:**
- Tortilla integral
- Hummus
- Lechuga
- Tomate
- Zanahoria rallada
- Pimiento

**Preparación:**
1. Unta hummus en la tortilla
2. Agrega vegetales frescos
3. Enrolla firmemente
4. Corta por la mitad

**Beneficios:** Fibra, proteína vegetal, vitaminas

## Tips de cocina saludable

- **Cocción al vapor**: Mantiene nutrientes
- **Menos sal**: Usa especias para dar sabor
- **Porciones adecuadas**: El plato debe ser 50% vegetales
- **Cocina en lotes**: Prepara para varios días
- **Congela**: Porciones individuales para emergencias

## Planificación semanal

- **Lunes**: Sopa de lentejas
- **Martes**: Ensalada mediterránea
- **Miércoles**: Pollo al horno
- **Jueves**: Pescado a la plancha
- **Viernes**: Wrap de vegetales
- **Sábado**: Experimenta nuevas recetas
- **Domingo**: Prepara para la semana

Cocinar saludable es más fácil de lo que parece. ¡Empieza hoy!
    `,
    category: "Recetas",
    author: "Chef Roberto Silva",
    date: "2025-01-01",
    readTime: "7 min",
    imageUrl: "/placeholder.svg",
    tags: ["recetas", "cocina", "fácil", "nutritivo"],
  },
];
