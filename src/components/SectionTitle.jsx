/* "Título · sección" del Home usa heading/sm (Poppins SemiBold 17).
   Los H2 de PDP y Carrito usan Fraunces SemiBold 20–22. */
export default function SectionTitle({ as: Tag = "h2", display = false, children }) {
  return (
    <Tag className={display ? "section-title section-title--display t-display" : "section-title t-heading-sm"}>
      {children}
    </Tag>
  );
}
