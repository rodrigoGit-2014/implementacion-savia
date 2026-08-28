/* Toast no intrusivo, anclado bajo la status bar. La visibilidad y el
   temporizador de 3 s los controla la pantalla que lo monta. */
export default function Toast({ message, open }) {
  return (
    <div
      className={`toast${open ? " is-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      {open ? message : null}
    </div>
  );
}
