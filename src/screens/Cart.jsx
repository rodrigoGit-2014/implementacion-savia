import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Button from "../components/Button";
import QuantityStepper from "../components/QuantityStepper";
import ShippingBanner from "../components/ShippingBanner";
import ProductTile from "../components/ProductTile";
import SectionTitle from "../components/SectionTitle";
import { HomeIndicator } from "../components/DeviceChrome";
import { useCart } from "../context/CartContext";
import { cartSuggestions, formatPrice, shippingAddress } from "../data/products";
import icPin from "../assets/icons/ic-pin-cart.svg";
import icQuitar from "../assets/icons/ic-quitar.svg";
import icCupon from "../assets/icons/ic-cupon.svg";
import icChevron from "../assets/icons/ic-chevron-cupon.svg";
import icHoja from "../assets/icons/ic-hoja.svg";
import icCheckPaso from "../assets/icons/ic-check-paso.svg";
import icHaloPaso from "../assets/icons/ic-halo-paso.svg";
import "./Cart.css";

/* Pasos · Inicio · Carro · Pago (118:739) */
const steps = [
  { id: "inicio", label: "Inicio", state: "done" },
  { id: "carro", label: "Carro", state: "current", n: "2" },
  { id: "pago", label: "Pago", state: "pending", n: "3" },
];

export default function Cart() {
  const { items, count, subtotal, total, setQty, remove, clear, add } = useCart();

  return (
    <div className="cart">
      <AppHeader
        variant="cart"
        title={`Tu bolsa (${count})`}
        trailingLabel="Vaciar"
        onTrailingAction={clear}
      >
        <nav className="steps-bar" aria-label="Progreso de compra">
          <ol className="steps-bar__inner shell gutter">
            {steps.map((step, i) => (
              <li className={`stepdot stepdot--${step.state}`} key={step.id}>
                {i > 0 && (
                  <span
                    className={`stepdot__line${
                      steps[i - 1].state === "done" ? " is-done" : ""
                    }`}
                    aria-hidden="true"
                  />
                )}
                {step.state === "current" && (
                  <img
                    className="stepdot__halo"
                    src={icHaloPaso}
                    alt=""
                    width={38}
                    height={38}
                  />
                )}
                <span className="stepdot__mark">
                  {step.state === "done" ? (
                    <img src={icCheckPaso} alt="" width={16} height={16} />
                  ) : (
                    step.n
                  )}
                </span>
                <span className="stepdot__label">{step.label}</span>
              </li>
            ))}
          </ol>
        </nav>
      </AppHeader>

      <main className="cart__main">
        <div className="cart__layout shell">
          <div className="cart__col-main">
            {/* Envío · banner (118:631) */}
            <div className="cart__block gutter">
              <ShippingBanner subtotal={subtotal} variant="cart" />
            </div>

            {/* Card · dirección de envío (118:640) */}
            <div className="cart__block gutter">
              <div className="address-card">
                <img className="address-card__pin" src={icPin} alt="" width={18} height={18} />
                <p className="address-card__label">ENVIAR A</p>
                <p className="address-card__street">{shippingAddress.street}</p>
                <p className="address-card__district">{shippingAddress.district}</p>
                <p className="address-card__eta">{shippingAddress.eta}</p>
                <Button variant="ghost" className="address-card__change">
                  Cambiar
                </Button>
              </div>
            </div>

            {/* Items (118:650) */}
            <ul className="cart__items gutter">
              {items.map((item) => (
                <li className="lineitem" key={item.key}>
                  <Link to={`/producto/${item.product.id}`} className="lineitem__photo">
                    <img src={item.product.cardImage} alt={item.product.name} />
                  </Link>
                  <p className="lineitem__name">{item.product.name}</p>
                  <p className="lineitem__variant">
                    {item.product.subtitle} · {item.format.size}
                  </p>
                  <div className="lineitem__stepper">
                    <QuantityStepper
                      value={item.qty}
                      min={0}
                      variant="pill"
                      onChange={(q) => setQty(item.key, q)}
                      label={`Cantidad de ${item.product.name}`}
                    />
                  </div>
                  <p className="lineitem__price">{formatPrice(item.lineTotal)}</p>
                  <button
                    className="lineitem__remove"
                    onClick={() => remove(item.key)}
                    aria-label={`Quitar ${item.product.name} de la bolsa`}
                  >
                    <img src={icQuitar} alt="" width={18} height={18} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Cupón (118:677) */}
            <div className="cart__block gutter">
              <button className="coupon">
                <img src={icCupon} alt="" width={18} height={18} />
                <span className="coupon__text">¿Tienes un código de descuento?</span>
                <img className="coupon__chevron" src={icChevron} alt="" width={18} height={18} />
              </button>
            </div>
          </div>

          <div className="cart__col-side">
            {/* Card · totalizador (118:685) */}
            <div className="cart__block gutter">
              <div className="summary">
                <div className="summary__row">
                  <span className="summary__label">Subtotal</span>
                  <span className="summary__value">{formatPrice(subtotal)}</span>
                </div>
                <div className="summary__row">
                  <span className="summary__label">Envío</span>
                  <span className="summary__value summary__value--free">Gratis</span>
                </div>
                <div className="summary__row">
                  <span className="summary__label">Descuento</span>
                  <span className="summary__value summary__value--muted">—</span>
                </div>
                <hr className="summary__divider" />
                <div className="summary__row summary__row--total">
                  <span className="summary__total-label">Total</span>
                  <span className="summary__total-value">{formatPrice(total)}</span>
                </div>
                <p className="summary__note">Impuestos incluidos.</p>
              </div>
            </div>

            {/* Nota packaging (118:696) */}
            <div className="packaging gutter">
              <img src={icHoja} alt="" width={20} height={20} />
              <p className="packaging__text">
                Enviamos en caja de cartón, con relleno de papel. Cero plástico.
              </p>
            </div>
          </div>
        </div>

        {/* Carrusel · Suele comprarse junto (118:701) */}
        <section className="suggested">
          <div className="suggested__head shell gutter">
            <SectionTitle display>Suele comprarse junto</SectionTitle>
          </div>
          <div className="rail rail--grid suggested__rail shell">
            {cartSuggestions.map((item) => (
              <ProductTile
                key={`${item.id}-${item.formatId ?? "default"}`}
                image={item.image}
                name={item.name}
                variant={item.variant}
                price={item.price}
                size="sm"
                onAdd={() => add(item.id, item.formatId ?? "300", 1)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Sticky · Pagar (118:754) */}
      <div className="paybar">
        <div className="paybar__inner shell gutter">
          <div className="paybar__total">
            <p className="paybar__label">Total</p>
            <p className="paybar__amount">{formatPrice(total)}</p>
          </div>
          <Button variant="primary" className="paybar__cta">
            Pagar
          </Button>
        </div>
        <p className="paybar__trust">Pago seguro · Devolución en 30 días</p>
        <HomeIndicator />
      </div>
    </div>
  );
}
