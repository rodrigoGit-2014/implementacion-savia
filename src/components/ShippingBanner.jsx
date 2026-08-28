import icEnvio from "../assets/icons/ic-envio.svg";
import icCheck from "../assets/icons/ic-check-banner.svg";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "../data/products";

/* Banner de progreso hacia el envío gratis.
   PDP  → "Banner · envío gratis" (41:126), icono ic/envio, detalle en 2 líneas.
   Carrito → "Banner · envío en progreso" (118:632), icono ic/check.
   La barra y los montos se calculan con el subtotal real de la bolsa. */
export default function ShippingBanner({ subtotal, variant = "pdp" }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const reached = remaining === 0;

  return (
    <div className={`shipbanner shipbanner--${variant}`}>
      <img
        className="shipbanner__icon"
        src={variant === "cart" ? icCheck : icEnvio}
        alt=""
        width={20}
        height={20}
      />
      <p className="shipbanner__title">
        {reached
          ? "Tienes el envío gratis."
          : `Te faltan ${formatPrice(remaining)} para el envío gratis${variant === "cart" ? "." : ""}`}
      </p>
      <div className="shipbanner__track">
        <div
          className="shipbanner__progress"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso hacia el envío gratis"
        />
      </div>
      <p className="shipbanner__detail">
        {`Llevas ${formatPrice(subtotal)} de ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`}
        {variant === "pdp" && !reached
          ? ` Agrega un producto de ${formatPrice(remaining)} o más.`
          : ""}
      </p>
    </div>
  );
}
