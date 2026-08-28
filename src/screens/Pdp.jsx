import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Button from "../components/Button";
import QuantityStepper from "../components/QuantityStepper";
import ShippingBanner from "../components/ShippingBanner";
import ProductTile from "../components/ProductTile";
import Rating from "../components/Rating";
import SectionTitle from "../components/SectionTitle";
import { useCart } from "../context/CartContext";
import {
  formatPrice,
  pdpAccordion,
  pdpCrossSell,
  pdpReview,
  products,
  shippingAddress,
} from "../data/products";
import icPin from "../assets/icons/ic-pin-pdp.svg";
import icChevronRight from "../assets/icons/ic-chevron-right.svg";
import icChevronDown from "../assets/icons/ic-chevron-down.svg";
import icCheckClaim from "../assets/icons/ic-check-claim.svg";
import icRomero from "../assets/icons/ic-botanica-romero.svg";
import icSalvia from "../assets/icons/ic-botanica-salvia.svg";
import icGlicerina from "../assets/icons/ic-botanica-glicerina.svg";
import "./Pdp.css";

const botanica = { romero: icRomero, salvia: icSalvia, glicerina: icGlicerina };

export default function Pdp() {
  const { productId } = useParams();
  const product = products[productId];

  const { add, subtotal } = useCart();
  const [formatId, setFormatId] = useState(product?.formats[0].id);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openRow, setOpenRow] = useState(null);

  const format = useMemo(
    () => product?.formats.find((f) => f.id === formatId) ?? product?.formats[0],
    [product, formatId],
  );

  if (!product) return <Navigate to="/" replace />;

  const gallery = product.gallery;

  return (
    <div className="pdp">
      <AppHeader variant="inner" title={product.name}>
        {/* Dirección de envío (41:298) */}
        <button className="pdp__address">
          <span className="pdp__address-inner shell gutter">
            <img src={icPin} alt="" width={17} height={17} />
            <span className="pdp__address-label">Enviar a</span>
            <span className="pdp__address-value">{shippingAddress.short}</span>
            <img
              className="pdp__address-chevron"
              src={icChevronRight}
              alt=""
              width={15}
              height={15}
            />
          </span>
        </button>
      </AppHeader>

      <main className="pdp__main">
        {/* Envío · banner (41:125) */}
        <div className="pdp__banner shell gutter">
          <ShippingBanner subtotal={subtotal} variant="pdp" />
        </div>

        <div className="pdp__layout shell">
          {/* --------------------- Galería (41:136) --------------------- */}
          <section className="gallery" aria-label="Imágenes del producto">
            <div className="gallery__stage">
              <img
                className="gallery__image"
                src={gallery[activeImage].src}
                alt={gallery[activeImage].alt}
              />
              <p className="gallery__counter">
                {activeImage + 1}/{gallery.length}
              </p>
            </div>

            <div className="gallery__thumbs" role="tablist" aria-label="Miniaturas">
              {gallery.map((shot, i) => (
                <button
                  key={shot.src}
                  role="tab"
                  aria-selected={i === activeImage}
                  className={`gallery__thumb${i === activeImage ? " is-active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={shot.src} alt={shot.alt} />
                </button>
              ))}
            </div>
          </section>

          <div className="pdp__info">
            {/* -------------------- Identidad (41:145) ------------------- */}
            <section className="identity gutter">
              <p className="identity__overline">{product.overline}</p>
              <h1 className="identity__name t-display">{product.name}</h1>
              <p className="identity__subtitle">{product.subtitle}</p>
              <p className="identity__rating">
                <Rating size={13} label={`${product.rating} de 5`} />
                <span className="identity__score">{product.rating}</span>
                <span className="identity__reviews">({product.reviewCount} reseñas)</span>
              </p>
            </section>

            {/* -------- Sticky · Agregar a la bolsa (41:307) ------------- */}
            <section className="buybar">
              <div className="buybar__inner shell gutter">
                <div className="buybar__price">
                  <p className="buybar__total">{formatPrice(format.price * qty)}</p>
                  <p className="buybar__detail">
                    {format.size} · {qty} {qty === 1 ? "unidad" : "unidades"}
                  </p>
                </div>
                <QuantityStepper value={qty} onChange={setQty} variant="outline" />
                <Button
                  variant="primary"
                  className="buybar__cta"
                  onClick={() => add(product.id, format.id, qty)}
                >
                  Agregar
                </Button>
              </div>
            </section>

            {/* --------------------- Formato (41:160) -------------------- */}
            <section className="format gutter">
              <p className="format__label">Formato</p>
              <div className="format__options" role="radiogroup" aria-label="Formato">
                {product.formats.map((option) => (
                  <button
                    key={option.id}
                    role="radio"
                    aria-checked={option.id === formatId}
                    className={`chip${option.id === formatId ? " is-active" : ""}`}
                    onClick={() => setFormatId(option.id)}
                  >
                    <span className="chip__size">{option.size}</span>
                    <span className="chip__price">{formatPrice(option.price)}</span>
                    {option.badge && <span className="chip__badge">{option.badge}</span>}
                  </button>
                ))}
              </div>
            </section>

            {/* --------------- Detalle · acordeón (103:57) --------------- */}
            <section className="accordion">
              {pdpAccordion.map((row) => {
                const isOpen = openRow === row.id;
                return (
                  <div className="accordion__row gutter" key={row.id}>
                    <button
                      className="accordion__head"
                      aria-expanded={isOpen}
                      onClick={() => setOpenRow(isOpen ? null : row.id)}
                    >
                      <span className="accordion__title">{row.title}</span>
                      <span
                        className={
                          row.id === "ingredientes"
                            ? "accordion__trigger accordion__trigger--disc"
                            : "accordion__trigger"
                        }
                      >
                        <img
                          className={`accordion__chevron${isOpen ? " is-open" : ""}`}
                          src={icChevronDown}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="accordion__panel">
                        {row.body && <p className="accordion__body">{row.body}</p>}

                        {row.claims && (
                          <ul className="claims">
                            {row.claims.map((claim) => (
                              <li className="claims__item" key={claim}>
                                <img src={icCheckClaim} alt="" width={16} height={16} />
                                <span>{claim}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {row.steps && (
                          <>
                            <h3 className="accordion__heading t-display">{row.heading}</h3>
                            <ol className="steps">
                              {row.steps.map((step, i) => (
                                <li className="steps__item" key={step}>
                                  <span className="steps__num">{i + 1}</span>
                                  <span className="steps__text">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </>
                        )}

                        {row.ingredients && (
                          <div className="ingredients">
                            {row.ingredients.map((ing) => (
                              <div className="ingredient" key={ing.name}>
                                <span className="ingredient__disc">
                                  <img src={botanica[ing.icon]} alt="" width={26} height={26} />
                                </span>
                                <span className="ingredient__head">
                                  <span className="ingredient__name">{ing.name}</span>
                                  <span className="ingredient__pct">{ing.pct}</span>
                                </span>
                                <span className="ingredient__role">{ing.role}</span>
                              </div>
                            ))}
                            <p className="ingredients__link">{row.link}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          </div>
        </div>

        {/* ---------------------- Reseñas (41:255) --------------------- */}
        <section className="reviews shell gutter">
          <SectionTitle display>Reseñas</SectionTitle>
          <div className="reviews__summary">
            <p className="reviews__score t-display">{pdpReview.score}</p>
            <div className="reviews__meta">
              <Rating size={14} label={`${pdpReview.score} de 5`} />
              <p className="reviews__total">{pdpReview.total}</p>
            </div>
          </div>
          <blockquote className="reviews__card">
            <p className="reviews__quote">{pdpReview.quote}</p>
            <footer className="reviews__author">{pdpReview.author}</footer>
          </blockquote>
          <p className="reviews__link">{pdpReview.link}</p>
        </section>

        {/* -------------------- Cross-sell (41:268) -------------------- */}
        <section className="crosssell">
          <div className="crosssell__head shell gutter">
            <SectionTitle display>Completa tu ritual</SectionTitle>
          </div>
          <div className="rail rail--grid crosssell__rail shell">
            {pdpCrossSell.map((id) => {
              const item = products[id];
              return (
                <ProductTile
                  key={id}
                  to={`/producto/${id}`}
                  image={item.cardImage}
                  name={item.name}
                  variant={item.variantLabel}
                  price={item.price}
                  size="md"
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
