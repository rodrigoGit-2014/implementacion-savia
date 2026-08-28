/* ------------------------------------------------------------------
   Catálogo. Todos los textos, precios, ratings e imágenes provienen
   de los frames de Figma: 01 · Home (1:88), 02 · Pdp (41:122) y
   04 · Carrito (118:628).
   ------------------------------------------------------------------ */

import equilibrioFrontal from "../assets/img/equilibrio-frontal.png";
import equilibrioTrasera from "../assets/img/pdp-equilibrio-trasera.png";
import ritualBotanica from "../assets/img/ritual-botanica.png";
import saviaBottleScene from "../assets/img/savia-bottle-scene.png";
import anticaspa from "../assets/img/prod-anticaspa-card.png";
import gala from "../assets/img/prod-gala-card.png";
import sport from "../assets/img/prod-sport-card.png";
import cremaRocio from "../assets/img/crema-rocio.png";

export const FREE_SHIPPING_THRESHOLD = 20000;

/** Formato de precio del diseño: "$3.990" (separador de miles con punto). */
export function formatPrice(value) {
  return `$${Math.round(value).toLocaleString("es-CL")}`;
}

export const products = {
  "shampoo-equilibrio": {
    id: "shampoo-equilibrio",
    /* Home · Card/Product/Carrusel */
    cardName: "Shampoo Equilibrio · 300 ml",
    cardRating: "★ 4.8 (312)",
    cardImage: equilibrioFrontal,
    /* PDP · Identidad (41:145) */
    overline: "PELO MIXTO A GRASO",
    name: "Shampoo Equilibrio",
    subtitle: "Romero + Salvia",
    variantLabel: "Romero + Salvia · 300 ml",
    rating: 4.8,
    reviewCount: 128,
    gallery: [
      { src: equilibrioFrontal, alt: "Shampoo Equilibrio · vista frontal" },
      { src: equilibrioTrasera, alt: "Shampoo Equilibrio · etiqueta trasera" },
      { src: ritualBotanica, alt: "Shampoo Equilibrio con romero y salvia" },
      { src: saviaBottleScene, alt: "Shampoo Equilibrio en uso" },
    ],
    /* PDP · Selector · formato (41:162) */
    formats: [
      { id: "300", size: "300 ml", price: 3990 },
      { id: "500", size: "500 ml", price: 7590 },
      { id: "1000", size: "1 L", price: 11500, badge: "Te conviene +" },
    ],
    price: 3990,
  },

  "shampoo-anticaspa": {
    id: "shampoo-anticaspa",
    cardName: "Shampoo Anticaspa · 300 ml",
    cardRating: "★ 4.6 (89)",
    cardImage: anticaspa,
    overline: "CUERO CABELLUDO SENSIBLE",
    name: "Shampoo Anticaspa",
    subtitle: "Romero + Salvia",
    variantLabel: "Romero + Salvia · 300 ml",
    rating: 4.6,
    reviewCount: 89,
    gallery: [{ src: anticaspa, alt: "Shampoo Anticaspa · vista frontal" }],
    formats: [{ id: "300", size: "300 ml", price: 6990 }],
    price: 6990,
  },

  "shampoo-gala": {
    id: "shampoo-gala",
    cardName: "Shampoo Gala . 300 ml",
    cardRating: "★ 4.9 (198)",
    cardImage: gala,
    overline: "BRILLO Y CUERPO",
    name: "Shampoo Gala",
    subtitle: "Romero + Salvia",
    variantLabel: "Romero + Salvia · 300 ml",
    rating: 4.9,
    reviewCount: 198,
    gallery: [{ src: gala, alt: "Shampoo Gala · vista frontal" }],
    formats: [{ id: "300", size: "300 ml", price: 4490 }],
    price: 4490,
  },

  "shampoo-sport": {
    id: "shampoo-sport",
    cardName: "Shampoo Sport . 300 ml",
    cardRating: "★ 4.8 (142)",
    cardImage: sport,
    overline: "USO FRECUENTE",
    name: "Shampoo Sport",
    subtitle: "Romero + Salvia",
    variantLabel: "Romero + Salvia · 300 ml",
    rating: 4.8,
    reviewCount: 142,
    gallery: [{ src: sport, alt: "Shampoo Sport · vista frontal" }],
    formats: [{ id: "300", size: "300 ml", price: 7490 }],
    price: 7490,
  },

  "crema-facial-rocio": {
    id: "crema-facial-rocio",
    cardName: "Crema Facial Rocío · 50 ml",
    cardRating: "★ 4.7 (76)",
    cardImage: cremaRocio,
    overline: "PIEL NORMAL A SECA",
    name: "Crema Facial Rocío",
    subtitle: "Caléndula + Ác. hialurónico",
    variantLabel: "Caléndula + Ác. hialurónico · 50 ml",
    rating: 4.7,
    reviewCount: 76,
    gallery: [{ src: cremaRocio, alt: "Crema Facial Rocío" }],
    formats: [{ id: "50", size: "50 ml", price: 9990 }],
    price: 9990,
  },

  "ritual-savia": {
    id: "ritual-savia",
    cardName: "Ritual Savia · kit",
    cardRating: "★ 4.9 (54)",
    cardImage: ritualBotanica,
    overline: "RUTINA COMPLETA",
    name: "Ritual Savia",
    subtitle: "Los tres pasos",
    variantLabel: "Los tres pasos · kit",
    rating: 4.9,
    reviewCount: 54,
    gallery: [{ src: ritualBotanica, alt: "Ritual Savia · kit de tres pasos" }],
    formats: [{ id: "kit", size: "Kit", price: 15700 }],
    price: 15700,
  },
};

export const productList = Object.values(products);

/* Home · Carrusel · productos (1:142) */
export const homeCarousel = [
  "shampoo-equilibrio",
  "shampoo-anticaspa",
  "shampoo-gala",
  "shampoo-sport",
].map((id) => products[id]);

/* Home · Categorías (1:133) */
export const categories = [
  { id: "cabello", label: "Cabello", active: true },
  { id: "rostro", label: "Rostro" },
  { id: "rutinas", label: "Rutinas" },
  { id: "favoritos", label: "Favoritos" },
];

/* Home · Hero · carrusel (1:92) */
export const heroSlides = [
  {
    id: "producto-estrella",
    eyebrow: "RITUAL DE OTOÑO",
    title: ["Cabello vivo,", "desde la raíz"],
    cta: "Descubrir la línea",
    to: "/producto/shampoo-equilibrio",
    objectPosition: "50% 19%",
  },
  {
    id: "oferta-activa",
    eyebrow: "OFERTA ACTIVA",
    title: ["20% en tu primera rutina"],
    cta: "Ver la oferta",
    to: "/producto/ritual-savia",
    objectPosition: "50% 43%",
  },
  {
    id: "quiz",
    eyebrow: "QUIZ EN 1 MINUTO",
    title: ["¿Cuál es tu ritual ideal?"],
    cta: "Empezar el quiz",
    to: "/producto/crema-facial-rocio",
    objectPosition: "50% 49%",
  },
];

/* PDP · Cross-sell (41:270) */
export const pdpCrossSell = ["crema-facial-rocio", "ritual-savia"];

/* Carrito · Rail · sugeridos (118:703) */
export const cartSuggestions = [
  { id: "crema-facial-rocio", name: "Crema Facial Rocío", variant: "50 ml", price: 9990, image: cremaRocio },
  { id: "ritual-savia", name: "Ritual Savia", variant: "Kit 3 pasos", price: 15700, image: ritualBotanica },
  {
    id: "shampoo-equilibrio",
    name: "Shampoo Equilibrio",
    variant: "1 L · mejor por ml",
    price: 11500,
    image: saviaBottleScene,
    formatId: "1000",
  },
];

/* PDP · Detalle · acordeón (103:57).
   El copy proviene de los frames "Descripcion" (41:185), "Modo de uso"
   (41:196) e "Ingredientes" (41:207), que en Figma están ocultos porque
   corresponden al estado expandido de cada fila del acordeón. */
export const pdpAccordion = [
  {
    id: "descripcion",
    title: "Descripción",
    body: "Limpia sin dejar residuo. El romero regula la producción de sebo y la salvia calma el cuero cabelludo, así el pelo se mantiene liviano más días entre lavados.",
    claims: [
      "Sin sulfatos, siliconas ni parabenos",
      "pH 5.5, respeta el cuero cabelludo",
      "Vidrio y aluminio reciclables",
    ],
  },
  {
    id: "modo-de-uso",
    title: "Modo de uso",
    heading: "Cómo usarlo",
    steps: [
      "Aplica sobre el pelo mojado.",
      "Masajea el cuero cabelludo 30 segundos.",
      "Enjuaga y sigue con el acondicionador.",
    ],
  },
  {
    id: "ingredientes",
    title: "Ingredientes clave",
    heading: "Ingredientes clave",
    ingredients: [
      { icon: "romero", name: "Romero", pct: "4%", role: "Regula el sebo del cuero cabelludo." },
      { icon: "salvia", name: "Salvia", pct: "3%", role: "Calma y desinflama entre lavados." },
      { icon: "glicerina", name: "Glicerina vegetal", pct: "2%", role: "Retiene la humedad en la fibra." },
    ],
    link: "Ver la lista INCI completa",
  },
];

export const pdpReview = {
  score: "4.8",
  total: "128 reseñas verificadas",
  quote: "«Es el primer shampoo que no me deja el pelo con esa sensación de plástico.»",
  author: "Camila R. · Compra verificada",
  link: "Ver las 128 reseñas",
};

/* PDP · Dirección de envío (41:298) y Carrito · Card · dirección (118:640) */
export const shippingAddress = {
  short: "Av. Providencia 1234, Providencia",
  street: "Av. Providencia 1234, depto 802",
  district: "Providencia, Región Metropolitana",
  eta: "Llega el jueves 3 de septiembre",
};
