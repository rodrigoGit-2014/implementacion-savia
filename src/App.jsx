import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./screens/Home";
import Pdp from "./screens/Pdp";
import Cart from "./screens/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:productId" element={<Pdp />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
