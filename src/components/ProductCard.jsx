import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";

/* Figma "Card/Product/Carrusel" (1:73): 160 pt de ancho, foto 160×160
   radio 16 sobre clay/50, botón circular "+" de 32 pt para agregar. */
export default function ProductCard({ product, onAdd }) {
  return (
    <article className="pcard">
      <Link to={`/producto/${product.id}`} className="pcard__media">
        <img className="pcard__photo" src={product.cardImage} alt={product.name} />
        <button
          className="pcard__add"
          onClick={(e) => {
            e.preventDefault();
            onAdd?.(product);
          }}
          aria-label={`Agregar ${product.name} a la bolsa`}
        >
          <span className="pcard__plus" aria-hidden="true" />
        </button>
      </Link>
      <div className="pcard__info">
        <Link to={`/producto/${product.id}`} className="pcard__name">
          {product.cardName}
        </Link>
        <p className="pcard__rating t-label-sm">{product.cardRating}</p>
        <p className="pcard__price">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
