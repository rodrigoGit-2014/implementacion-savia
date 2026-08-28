import icHome from "../assets/icons/ic-home-active.svg";
import icProductos from "../assets/icons/ic-productos.svg";
import icOfertas from "../assets/icons/ic-ofertas.svg";
import icCompras from "../assets/icons/ic-compras.svg";
import { HomeIndicator } from "./DeviceChrome";

/* Figma "Tab bar" (1:162). El item activo lleva el pill pill/active. */
const tabs = [
  { id: "inicio", label: "Inicio", icon: icHome, active: true },
  { id: "productos", label: "Productos", icon: icProductos },
  { id: "ofertas", label: "Ofertas", icon: icOfertas },
  { id: "compras", label: "Mis compras", icon: icCompras },
];

export default function TabBar() {
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      <ul className="tabbar__list shell">
        {tabs.map((tab) => (
          <li key={tab.id} className="tabbar__item">
            <button
              className={`tabbar__link${tab.active ? " is-active" : ""}`}
              aria-current={tab.active ? "page" : undefined}
            >
              <span className="tabbar__pill">
                <img src={tab.icon} alt="" width={24} height={24} />
              </span>
              <span className="tabbar__label">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <HomeIndicator />
    </nav>
  );
}
