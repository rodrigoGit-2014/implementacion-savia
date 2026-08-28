import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/* Al entrar a una pantalla nueva se parte desde arriba; al volver con
   el botón "volver" se respeta la posición del navegador. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return null;
}
