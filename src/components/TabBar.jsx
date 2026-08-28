import { HomeIndicator } from "./DeviceChrome";

/* Figma "Tab bar" (1:162). Iconos unificados a estilo outline (stroke
   currentColor, grosor medio) para que hereden el color del item: gris
   oliva por defecto y blanco dentro del pill activo. */
const iconPaths = {
  inicio: [
    "M2.8 10.8L10.5 4.1C11.4 3.35 12.6 3.35 13.5 4.1L21.2 10.8",
    "M5.3 9.2V20.2H9.9V16C9.9 14.85 10.84 13.9 12 13.9C13.16 13.9 14.1 14.85 14.1 16V20.2H18.7V9.2",
  ],
  productos: [
    "M5.8 19.5V13.6L10.2 10.2V7.8H13.8V10.2L18.2 13.6V19.5C18.2 20.5 17.4 21.3 16.4 21.3H7.6C6.6 21.3 5.8 20.5 5.8 19.5Z",
    "M9.4 7.8V5.2C9.4 4.6 9.9 4.1 10.5 4.1H13.5C14.1 4.1 14.6 4.6 14.6 5.2V7.8H9.4Z",
    "M5.8 16H18.2",
  ],
  ofertas: [
    "M5.9 3.3H12.9C13.45 3.3 13.98 3.52 14.37 3.91L20.7 10.24C21.63 11.17 21.63 12.68 20.7 13.61L13.61 20.7C12.68 21.63 11.17 21.63 10.24 20.7L3.91 14.37C3.52 13.98 3.3 13.45 3.3 12.9V5.9C3.3 4.46 4.46 3.3 5.9 3.3Z",
    "M9.4 7.7C9.4 8.638 8.638 9.4 7.7 9.4C6.762 9.4 6 8.638 6 7.7C6 6.762 6.762 6 7.7 6C8.638 6 9.4 6.762 9.4 7.7Z",
  ],
  compras: [
    "M5.6 8.2H18.4C19.15 8.2 19.74 8.84 19.68 9.59L18.83 19.69C18.74 20.72 17.88 21.5 16.85 21.5H7.15C6.12 21.5 5.26 20.72 5.17 19.69L4.32 9.59C4.26 8.84 4.85 8.2 5.6 8.2Z",
    "M8.7 11.2V6.9C8.7 5.08 10.18 3.6 12 3.6C13.82 3.6 15.3 5.08 15.3 6.9V11.2",
  ],
};

function TabIcon({ name }) {
  return (
    <svg
      className="tabbar__glyph"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const tabs = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "ofertas", label: "Ofertas" },
  { id: "compras", label: "Mis compras" },
];

export default function TabBar({ activeId = "inicio", onSelect }) {
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      <ul className="tabbar__list shell">
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <li key={tab.id} className="tabbar__item">
              <button
                className={`tabbar__link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onSelect?.(tab.id)}
              >
                <span className="tabbar__inner">
                  <TabIcon name={tab.id} />
                  <span className="tabbar__label t-label-sm">{tab.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <HomeIndicator />
    </nav>
  );
}
