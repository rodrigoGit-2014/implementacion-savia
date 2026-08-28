/* Estado de carga genérico para secciones aún sin datos. Cajas grises
   animadas que evitan la sensación de callejón sin salida mientras la
   tab bar sigue fija e interactiva. */
const CHIPS = 5;
const CARDS = 6;

export default function SkeletonSection() {
  return (
    <div className="skeleton-section" role="status" aria-label="Cargando sección">
      <span className="sr-only">Cargando…</span>

      <div className="skeleton skeleton__title" aria-hidden="true" />

      <div className="skeleton-row" aria-hidden="true">
        {Array.from({ length: CHIPS }).map((_, i) => (
          <div key={i} className="skeleton skeleton__chip" />
        ))}
      </div>

      <div className="skeleton-grid" aria-hidden="true">
        {Array.from({ length: CARDS }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton__thumb" />
            <div className="skeleton skeleton__line" />
            <div className="skeleton skeleton__line skeleton__line--short" />
          </div>
        ))}
      </div>
    </div>
  );
}
