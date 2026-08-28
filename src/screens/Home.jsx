import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import TabBar from "../components/TabBar";
import Toast from "../components/Toast";
import SkeletonSection from "../components/SkeletonSection";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import CategoryItem from "../components/CategoryItem";
import SectionTitle from "../components/SectionTitle";
import { useCart } from "../context/CartContext";
import { categories, heroSlides, homeCarousel } from "../data/products";
import wash from "../assets/icons/wash-decorativo.svg";
import heroA from "../assets/img/hero-slide-1.png";
import heroB from "../assets/img/savia-bottle-scene.png";
import heroC from "../assets/img/hero-slide-3.png";
import "./Home.css";

const heroImages = [heroA, heroB, heroC];

export default function Home() {
  const { add } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("cabello");
  const slidesRef = useRef(null);

  /* Secciones aún no construidas: al tocarlas mostramos un toast efímero
     y dejamos el área principal en estado de carga (skeletons). La tab
     bar permanece fija e interactiva para volver a "Inicio". */
  const [section, setSection] = useState("inicio");
  const [toastOpen, setToastOpen] = useState(false);
  const toastTimer = useRef(null);

  const handleTab = useCallback((id) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (id === "inicio") {
      setSection("inicio");
      setToastOpen(false);
      return;
    }
    setSection(id);
    setToastOpen(true);
    toastTimer.current = setTimeout(() => setToastOpen(false), 3000);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  /* La paginación del hero refleja el slide visible del carrusel
     (Figma: "Paginación", dot activo de 14 × 6). */
  const handleScroll = useCallback(() => {
    const el = slidesRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSlide(Math.min(heroSlides.length - 1, Math.max(0, index)));
  }, []);

  useEffect(() => {
    const el = slidesRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="home">
      <img className="home__wash" src={wash} alt="" aria-hidden="true" />

      <AppHeader variant="home" />

      <Toast message="Próximamente disponible" open={toastOpen} />

      <main className="home__main">
        {section !== "inicio" ? (
          <SkeletonSection />
        ) : (
          <>
        {/* --------------------------- Hero (1:90) --------------------------- */}
        <section className="hero" aria-label="Destacados">
          <div className="hero__carousel">
            <div className="hero__slides" ref={slidesRef}>
              {heroSlides.map((slide, i) => (
                <article className="hero__slide" key={slide.id}>
                  <img
                    className="hero__image"
                    src={heroImages[i]}
                    alt=""
                    style={{ objectPosition: slide.objectPosition }}
                  />
                  <span className="hero__veil" aria-hidden="true" />
                  <div className="hero__content">
                    <div className="hero__text">
                      <p className="hero__eyebrow t-overline">{slide.eyebrow}</p>
                      <h2 className="hero__title t-display">
                        {slide.title.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </h2>
                    </div>
                    <Button as={Link} to={slide.to} variant="hero">
                      {slide.cta}
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Indicador decorativo: el control real del carrusel es el
               swipe / scroll horizontal. */}
            <div className="hero__dots" aria-hidden="true">
              {heroSlides.map((slide, i) => (
                <span
                  key={slide.id}
                  className={`hero__dot${i === activeSlide ? " is-active" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------- Categorías (1:130) ------------------------ */}
        <section className="categories">
          <div className="categories__head gutter shell">
            <SectionTitle>Explora por categoría</SectionTitle>
          </div>
          <div className="rail categories__rail shell">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onSelect={setActiveCategory}
              />
            ))}
          </div>
        </section>

        {/* ------------ Los favoritos de la comunidad (1:138) ---------------- */}
        <section className="favorites" aria-label="Los favoritos de la comunidad">
          <div className="rail rail--grid favorites__rail shell">
            {homeCarousel.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(p) => add(p.id, p.formats[0].id, 1)}
              />
            ))}
          </div>
        </section>
          </>
        )}
      </main>

      {/* "Inicio" permanece como item activo: las otras secciones aún no
         están disponibles, solo muestran el aviso + estado de carga. */}
      <TabBar activeId="inicio" onSelect={handleTab} />
    </div>
  );
}
