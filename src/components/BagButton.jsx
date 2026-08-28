import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import icBolsa from "../assets/icons/ic-bolsa.svg";

/* Figma: "ic/bolsa" (1:157 / 64:380) + "Badge · cantidad" (1:160 / 64:383).
   El badge está oculto en el Home cuando la bolsa está vacía y visible en
   la PDP con la cantidad real: aquí se resuelve por estado. */
export default function BagButton() {
  const { count } = useCart();
  return (
    <Link
      to="/carrito"
      className="bagbutton"
      aria-label={`Ir a la bolsa${count ? `, ${count} producto${count > 1 ? "s" : ""}` : ""}`}
    >
      <img src={icBolsa} alt="" width={24} height={24} />
      {count > 0 && <span className="bagbutton__badge">{count}</span>}
    </Link>
  );
}
