import { Link } from "react-router-dom";
import Button from "./Button";
import { formatPrice } from "../data/products";

/* Tarjeta con borde usada en el cross-sell de la PDP (41:271) y en el
   rail "Suele comprarse junto" del Carrito (118:704). La única diferencia
   es la altura de la foto y el botón "Agregar" del Carrito. */
export default function ProductTile({
  to,
  image,
  name,
  variant,
  price,
  size = "md",
  onAdd,
}) {
  const body = (
    <>
      <div className={`ptile__media ptile__media--${size}`}>
        <img src={image} alt={name} />
      </div>
      <div className="ptile__body">
        <p className="ptile__name">{name}</p>
        <p className="ptile__variant">{variant}</p>
        <p className="ptile__price">{formatPrice(price)}</p>
        {onAdd && (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              onAdd();
            }}
          >
            Agregar
          </Button>
        )}
      </div>
    </>
  );

  return to ? (
    <Link to={to} className={`ptile ptile--${size}`}>
      {body}
    </Link>
  ) : (
    <article className={`ptile ptile--${size}`}>{body}</article>
  );
}
