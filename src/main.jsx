import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* Las hojas base van primero para que el CSS de cada pantalla pueda
   ajustar a los componentes compartidos sin pelear con el orden. */
import "./styles/global.css";
import "./styles/components.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
