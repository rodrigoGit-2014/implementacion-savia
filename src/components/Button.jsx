/* Figma · Button (1:23): alto 48 (target ≥44), radio radius/lg, texto
   label/md. Variantes usadas en los tres frames:
   - primary  → Button/Primary/Large (PDP y Carrito)
   - hero     → CTA del carrusel del Home (pill de 44 px)
   - secondary→ Button/Secondary/Small (rail del Carrito)
   - ghost    → Button/Ghost/Cambiar (dirección del Carrito) */
export default function Button({
  variant = "primary",
  as: Tag = "button",
  className = "",
  children,
  ...rest
}) {
  const type = Tag === "button" ? { type: "button", ...rest } : rest;
  return (
    <Tag className={`btn btn--${variant} ${className}`.trim()} {...type}>
      {children}
    </Tag>
  );
}
