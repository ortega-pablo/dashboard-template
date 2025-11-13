// Mock data actualizado basado en la estructura del Excel

export interface Promotion {
  id: string;
  pais: "BRASIL" | "CHILE" | "GUATEMALA" | "MEXICO" | "COLOMBIA";
  tipoPromo: "TRANSACCIONAL" | "ENGAGEMENT";
  clasificacion: "VALUE" | "EQUITY" | "LICENSE";
  mecanica: string;
  premio: string;
  marca: string;
  categoria: string;
  temporalidad: string;
  concepto: "CELEBRITIES" | "DEPORTES" | string;
  f1: boolean;
  mundial: boolean;
  nfl: boolean;
  uefaChampionsLeague: boolean;
  promoExito: boolean;
  relacionPepsico: "PEPSICO" | "COMPETENCIA DIRECTA" | "COMPETENCIA OTROS";
  descripcion?: string;
  fechaInicio?: string;
  fechaFin?: string;
  fechaAnalisis: string;
  celebrity?: string;
}

const mecanicas = [
  "Descuentos (EJ: 2X1, por cantidad, por forma de pago)",
  "Canje inmediato por un premio (ej.: compras y obtienes un producto de regalo por rascadita u otro modo)",
  "Promociones de devolución de dinero (cash back)",
  "Descuentos por volumen de compra (compra más, ahorra más)",
  "Sorteos (Ej: en páginas web, en aplicaciones, en tiendas, completando cupones)",
  "Canje de un premio por acumulación de (ej.: tapas, empaques, tiras)",
  "Colección de productos (Ej: tazos, figuras/ productos con diferentes diseños o variedades, etc)",
  "Registro de códigos, tickets, comprobantes de compra",
  "Desafíos o juegos online para obtener descuentos/premios (Ej: retos, dinámicas en redes sociales, etc)",
  "Programas de fidelización (acumulación de puntos, descuentos exclusivos, etc.)",
];

const premios = [
  "Viajes",
  "Dinero en efectivo",
  "Bonos/ tarjeta de regalo para comprar en determinado lugar (Ej. supermercados, tiendas de indumentaria, etc.)",
  "Electrónicos (Pantallas/Bocinas/Equipos de Sonido/Celulares)",
  "Descuentos en productos (Ej.: % de descuento, 2x1, etc.)",
  "Descuentos en apps de delivery/entregas a domicilio tipo Rappi",
  "Descuentos en apps de transporte tipo Uber",
  "Entradas a conciertos / eventos deportivos",
  "Autos/ motos",
  "Estadías en lugares turísticos",
];

const categorias = [
  "Bebidas gaseosas, sodas",
  "Bebidas alcohólicas/con alcohol (no incluye cerveza)",
  "Cervezas",
  "Jugos listos para tomar",
  "Productos de almacén/tienda (tipo spaguetti, arroz, etc)",
  "Snacks salados/ botanas/ paquetes/ pasabocas",
  "Galletas dulces/ Galletas saladas",
  "Snacks dulces/ Confitería / Dulces/ Golosinas",
  "Cadenas de supermercados",
  "Bancos/ entidades financieras",
  "Tecnología (ej: móviles/celulares, electrodomésticos)",
  "Ropa y accesorios",
  "Productos de limpieza",
  "Empresas de turismo",
  "Industria automotriz",
  "Productos de perfumería",
];

const marcasPepsico = [
  "Pepsi",
  "7UP",
  "Gatorade",
  "Lay's",
  "Doritos",
  "Cheetos",
  "Ruffles",
  "Quaker",
  "Tropicana",
  "Sabritas",
];

const marcasCompetenciaDirecta = [
  "Coca-Cola",
  "Sprite",
  "Fanta",
  "Red Bull",
  "Monster",
  "Powerade",
];

const marcasCompetenciaOtros = [
  "Corona",
  "Heineken",
  "Modelo",
  "Tecate",
  "Budweiser",
  "Stella Artois",
  "Brahma",
  "Pilsen",
  "Cristal",
];

const celebrities = [
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Neymar Jr",
  "Bad Bunny",
  "Shakira",
  "J Balvin",
  "Karol G",
  "Paulo Dybala",
  "Lele Pons",
  "Maluma",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePromotion(index: number): Promotion {
  const pais = getRandomItem([
    "BRASIL",
    "CHILE",
    "GUATEMALA",
    "MEXICO",
    "COLOMBIA",
  ] as const);
  const relacionPepsico = getRandomItem([
    "PEPSICO",
    "COMPETENCIA DIRECTA",
    "COMPETENCIA OTROS",
  ] as const);

  let marca: string;
  if (relacionPepsico === "PEPSICO") {
    marca = getRandomItem(marcasPepsico);
  } else if (relacionPepsico === "COMPETENCIA DIRECTA") {
    marca = getRandomItem(marcasCompetenciaDirecta);
  } else {
    marca = getRandomItem(marcasCompetenciaOtros);
  }

  const tipoPromo = getRandomItem(["TRANSACCIONAL", "ENGAGEMENT"] as const);
  const clasificacion = getRandomItem(["VALUE", "EQUITY", "LICENSE"] as const);
  const concepto = Math.random() > 0.5 ? "CELEBRITIES" : "DEPORTES";

  const usaF1 = Math.random() > 0.85;
  const usaMundial = Math.random() > 0.8;
  const usaNFL = Math.random() > 0.85;
  const usaUEFA = Math.random() > 0.82;

  // Generar fecha de análisis entre enero 2024 y marzo 2025
  const startDate = new Date(2025, 6, 1); // 1 enero 2024
  const endDate = new Date(2025, 10, 30); // 31 marzo 2025
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const fechaAnalisis = new Date(randomTime).toISOString().split('T')[0];

  return {
    id: `promo-${index}`,
    pais,
    tipoPromo,
    clasificacion,
    mecanica: getRandomItem(mecanicas),
    premio: getRandomItem(premios),
    marca,
    categoria: getRandomItem(categorias),
    temporalidad: `Q${Math.ceil(Math.random() * 4)} 2024`,
    concepto,
    f1: usaF1,
    mundial: usaMundial,
    nfl: usaNFL,
    uefaChampionsLeague: usaUEFA,
    promoExito: Math.random() > 0.6,
    relacionPepsico,
    descripcion: `Promoción ${tipoPromo.toLowerCase()} de ${marca} en ${pais}`,
    fechaInicio: `2024-${String(Math.ceil(Math.random() * 12)).padStart(
      2,
      "0"
    )}-01`,
    fechaFin: `2024-${String(Math.ceil(Math.random() * 12)).padStart(
      2,
      "0"
    )}-28`,
    fechaAnalisis,
    celebrity:
      concepto === "CELEBRITIES" ? getRandomItem(celebrities) : undefined,
  };
}

// Generar 150 promociones
export const mockPromotions: Promotion[] = Array.from({ length: 150 }, (_, i) =>
  generatePromotion(i + 1)
);

// Estadísticas por país
export const countryStats = {
  BRASIL: mockPromotions.filter((p) => p.pais === "BRASIL").length,
  CHILE: mockPromotions.filter((p) => p.pais === "CHILE").length,
  GUATEMALA: mockPromotions.filter((p) => p.pais === "GUATEMALA").length,
  MEXICO: mockPromotions.filter((p) => p.pais === "MEXICO").length,
  COLOMBIA: mockPromotions.filter((p) => p.pais === "COLOMBIA").length,
};

// Categorías de México para filtrado
export const mexicoCategorias = [
  "Bebidas gaseosas, sodas",
  "Snacks salados/ botanas/ paquetes/ pasabocas",
  "Snacks dulces/ Confitería / Dulces/ Golosinas",
  "Jugos listos para tomar",
  "Productos de almacén/tienda (tipo spaguetti, arroz, etc)",
  "Cadenas de supermercados",
  "Tecnología (ej: móviles/celulares, electrodomésticos)",
  "Bancos/ entidades financieras",
  "Ropa y accesorios",
  "Cervezas",
  "Bebidas alcohólicas/con alcohol (no incluye cerveza)",
];

// Subcategorías de ejemplo
export const mexicoSubcategorias: Record<string, string[]> = {
  "Bebidas gaseosas, sodas": [
    "Colas",
    "Gaseosas saborizadas",
    "Aguas saborizadas",
  ],
  "Snacks salados/ botanas/ paquetes/ pasabocas": [
    "Papas fritas",
    "Botanas de maíz",
    "Cacahuates",
    "Palomitas",
  ],
  "Snacks dulces/ Confitería / Dulces/ Golosinas": [
    "Chocolates",
    "Caramelos",
    "Chicles",
    "Gomitas",
  ],
  "Jugos listos para tomar": [
    "Jugos naturales",
    "Néctares",
    "Bebidas de frutas",
  ],
  "Productos de almacén/tienda (tipo spaguetti, arroz, etc)": [
    "Pastas",
    "Arroz",
    "Granos",
    "Cereales",
  ],
  "Cadenas de supermercados": [
    "Hipermercados",
    "Supermercados",
    "Tiendas de conveniencia",
  ],
  "Tecnología (ej: móviles/celulares, electrodomésticos)": [
    "Smartphones",
    "Televisores",
    "Audio",
    "Computadoras",
  ],
  "Bancos/ entidades financieras": [
    "Bancos comerciales",
    "Fintech",
    "Tarjetas de crédito",
  ],
  "Ropa y accesorios": [
    "Ropa deportiva",
    "Ropa casual",
    "Calzado",
    "Accesorios",
  ],
  Cervezas: ["Cervezas claras", "Cervezas oscuras", "Cervezas artesanales"],
  "Bebidas alcohólicas/con alcohol (no incluye cerveza)": [
    "Vinos",
    "Licores",
    "Bebidas preparadas",
  ],
};

// Deportes
export const deportes = [
  { id: "f1", nombre: "F1", icon: "🏎️" },
  { id: "mundial", nombre: "Mundial", icon: "⚽" },
  { id: "nfl", nombre: "NFL", icon: "🏈" },
  { id: "uefa", nombre: "UEFA Champions League", icon: "🏆" },
];

// Inspiración (sin Coca-Cola)
export const inspiracionBrands = [
  {
    nombre: "Pepsi",
    descripcion: "Campañas globales con celebridades y deportes",
    imageUrl: "/placeholder-pepsi.jpg",
    relacionPepsico: "PEPSICO",
  },
  {
    nombre: "Gatorade",
    descripcion: "Patrocinios deportivos y programas de fidelización",
    imageUrl: "/placeholder-gatorade.jpg",
    relacionPepsico: "PEPSICO",
  },
  {
    nombre: "Doritos",
    descripcion: "Activaciones digitales y experiencias interactivas",
    imageUrl: "/placeholder-doritos.jpg",
    relacionPepsico: "PEPSICO",
  },
  {
    nombre: "Red Bull",
    descripcion: "Marketing de eventos extremos y contenido",
    imageUrl: "/placeholder-redbull.jpg",
    relacionPepsico: "COMPETENCIA DIRECTA",
  },
  {
    nombre: "Heineken",
    descripción: "Patrocinios de UEFA y experiencias premium",
    imageUrl: "/placeholder-heineken.jpg",
    relacionPepsico: "COMPETENCIA OTROS",
  },
];
