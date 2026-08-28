/* Dos apariencias del mismo control, ambas definidas en Figma:
   - variant="outline" → PDP "Quantity Stepper" (67:57): 120×44, borde
     #c8c0b2, divisores verticales de 1 px.
   - variant="pill"    → Carrito "Stepper/Cantidad" (118:667): 100×34,
     radio 17, borde border/strong. */
export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  variant = "outline",
  label = "Cantidad",
}) {
  return (
    <div className={`stepper stepper--${variant}`} role="group" aria-label={label}>
      <button
        className="stepper__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Quitar una unidad"
      >
        −
      </button>
      {variant === "outline" && <span className="stepper__divider" aria-hidden="true" />}
      <span className="stepper__value" aria-live="polite">
        {value}
      </span>
      {variant === "outline" && <span className="stepper__divider" aria-hidden="true" />}
      <button
        className="stepper__btn"
        onClick={() => onChange(value + 1)}
        aria-label="Agregar una unidad"
      >
        +
      </button>
    </div>
  );
}
