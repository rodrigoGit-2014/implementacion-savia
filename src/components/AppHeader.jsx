import { Link, useNavigate } from "react-router-dom";
import { StatusBar } from "./DeviceChrome";
import BagButton from "./BagButton";
import icVolver from "../assets/icons/ic-volver.svg";

/* Header compartido por los tres frames.
   - variant="home"  → Figma 1:152  (saludo + wordmark SAVIA + bolsa)
   - variant="inner" → Figma 64:377 (volver + título + bolsa con badge)
   - variant="cart"  → Figma 118:734 (volver + "Tu bolsa (n)" + Vaciar) */
export default function AppHeader({
  variant = "home",
  title,
  greeting = "Hola Pauli",
  onTrailingAction,
  trailingLabel,
  children,
}) {
  const navigate = useNavigate();

  return (
    <header className={`appheader appheader--${variant}`}>
      <StatusBar />
      <div className="appheader__bar shell">
        {variant === "home" ? (
          <>
            <p className="appheader__greeting">{greeting}</p>
            <Link to="/" className="appheader__wordmark t-display">
              SAVIA
            </Link>
            <BagButton />
          </>
        ) : (
          <>
            <button
              className="appheader__back"
              onClick={() => navigate(-1)}
              aria-label="Volver"
            >
              <img src={icVolver} alt="" width={24} height={24} />
            </button>
            <p className="appheader__title">{title}</p>
            {variant === "cart" ? (
              <button className="appheader__trailing" onClick={onTrailingAction}>
                {trailingLabel}
              </button>
            ) : (
              <BagButton />
            )}
          </>
        )}
      </div>
      {children}
    </header>
  );
}
