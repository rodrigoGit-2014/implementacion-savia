import estrella13 from "../assets/icons/ic-estrella-13.svg";
import estrella14 from "../assets/icons/ic-estrella-14.svg";

/* Estrellas de Figma (41:149–41:153 en la PDP, 41:258–41:262 en Reseñas).
   Se usa el asset exportado, nunca un glifo redibujado. */
export default function Rating({ size = 13, count = 5, label }) {
  const src = size >= 14 ? estrella14 : estrella13;
  return (
    <span className="rating" role="img" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          className="rating__star"
          src={src}
          alt=""
          width={size}
          height={size}
          style={{ width: size, height: size }}
        />
      ))}
    </span>
  );
}
