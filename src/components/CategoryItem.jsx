import catCabello from "../assets/img/cat-cabello.png";
import catRostro from "../assets/img/cat-rostro.png";
import catRutinas from "../assets/img/cat-rutinas.png";
import catFavoritos from "../assets/img/cat-favoritos.png";

/* Figma "Category/Item" (1:243): ilustración circular + nombre centrado
   en label/sm. El estado activo usa anillo y tinta en action/primary. */
const illustrations = {
  cabello: catCabello,
  rostro: catRostro,
  rutinas: catRutinas,
  favoritos: catFavoritos,
};

export default function CategoryItem({ category, onSelect, isActive }) {
  return (
    <button
      className={`category${isActive ? " is-active" : ""}`}
      onClick={() => onSelect?.(category.id)}
      aria-pressed={isActive}
    >
      <span className="category__disc">
        <img src={illustrations[category.id]} alt="" width={46} height={46} />
      </span>
      <span className="category__label t-label-sm">{category.label}</span>
    </button>
  );
}
