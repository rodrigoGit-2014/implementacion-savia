# SAVIA · Home → PDP → Carrito

Implementación en React de tres pantallas del archivo de Figma
[Untitled · `TuB4FHMvMz1jxhAes9NeCF`](https://www.figma.com/design/TuB4FHMvMz1jxhAes9NeCF/Untitled?node-id=1-88):

| Pantalla | Frame de Figma | Ruta |
| --- | --- | --- |
| 01 · Home | `1:88` | `/` |
| 02 · Pdp | `41:122` | `/producto/:productId` |
| 04 · Carrito | `118:628` | `/carrito` |

## Cómo correrlo

```bash
npm install
```

```bash
npm run dev
```

## Stack

React 19 + Vite + React Router. Estilos en CSS plano con custom properties;
sin librerías de UI ni utilidades de terceros.

## Estructura

```
src/
  assets/          imágenes e íconos exportados desde Figma (sin placeholders)
  styles/
    tokens.css     variables de color, tipografía, radios, sombras y layout
    global.css     reset, escalas tipográficas y utilidades de layout (.shell, .rail)
    components.css estilos de la librería compartida
  data/products.js catálogo, copy y textos tomados de los frames
  context/         estado del carrito (React Context + useReducer)
  components/      AppHeader, BagButton, TabBar, Button, QuantityStepper,
                   ProductCard, ProductTile, CategoryItem, ShippingBanner,
                   Rating, SectionTitle, DeviceChrome, ScrollToTop
  screens/         Home, Pdp, Cart (+ su CSS)
```

## Componentes reutilizados entre pantallas

| Componente | Origen en Figma | Se usa en |
| --- | --- | --- |
| `AppHeader` | `1:152`, `64:377`, `118:734` | las tres |
| `BagButton` + badge | `1:157` / `1:160`, `64:380` / `64:383` | Home, PDP |
| `Button` | `Button` `1:23` (primary · hero · secondary · ghost) | las tres |
| `QuantityStepper` | `67:57` (PDP) y `118:667` (Carrito) | PDP, Carrito |
| `ProductCard` | `Card/Product/Carrusel` `1:73` | Home |
| `ProductTile` | `41:271` (PDP) y `118:704` (Carrito) | PDP, Carrito |
| `ShippingBanner` | `41:126` (PDP) y `118:632` (Carrito) | PDP, Carrito |
| `CategoryItem` | `Category/Item` `1:243` | Home |
| `Rating` | estrellas `41:149`–`41:153`, `41:258`–`41:262` | PDP |
| `TabBar` | `1:162` | Home |
| `DeviceChrome` | `Status bar`, `Home indicator` | las tres |

## Flujo y estado

`Home → PDP → Carrito`, con vuelta atrás desde el header. El carrito vive en
`CartContext` y se mantiene mientras se navega: cantidad, formato seleccionado,
badge de la bolsa, subtotal, total y la barra de progreso de envío gratis se
recalculan con el estado real.

Estado inicial: 1 × Shampoo Equilibrio 300 ml, que es lo que muestran el frame
del Carrito y el badge de la PDP.

## Responsive

Mobile-first sobre el frame de 393 px, con adaptaciones en `768px` y `1024px`:

- Los carruseles horizontales (`.rail`) pasan a grilla desde 900 px.
- La PDP se abre a dos columnas en desktop (galería sticky + información).
- El Carrito se abre a dos columnas (bolsa + resumen sticky).
- El chrome de iOS (status bar y home indicator) sólo se muestra en teléfono.
- Bajo 380 px la barra de compra de la PDP pasa a dos filas.
- Ninguna vista genera scroll horizontal en 320 / 393 / 768 / 1024 / 1440 px.
