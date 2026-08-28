import { createContext, useContext, useMemo, useReducer } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);

/* Estado inicial: la bolsa arranca vacía en la primera visita. El contador
   sólo refleja lo que el usuario agrega, quita o actualiza. */
const initialState = [];

function lineFor(productId, formatId) {
  return `${productId}::${formatId}`;
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const key = lineFor(action.productId, action.formatId);
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: l.qty + action.qty } : l));
      }
      return [
        ...state,
        { key, productId: action.productId, formatId: action.formatId, qty: action.qty },
      ];
    }
    case "setQty": {
      if (action.qty <= 0) return state.filter((l) => l.key !== action.key);
      return state.map((l) => (l.key === action.key ? { ...l, qty: action.qty } : l));
    }
    case "remove":
      return state.filter((l) => l.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const items = lines.map((line) => {
      const product = products[line.productId];
      const format =
        product.formats.find((f) => f.id === line.formatId) ?? product.formats[0];
      return {
        ...line,
        product,
        format,
        unitPrice: format.price,
        lineTotal: format.price * line.qty,
      };
    });

    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.lineTotal, 0);

    return {
      items,
      count,
      subtotal,
      total: subtotal,
      add: (productId, formatId, qty = 1) =>
        dispatch({ type: "add", productId, formatId, qty }),
      setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
