"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { cartItemKey } from "@/lib/format";
import type { CartItem, Product, ProductVariant } from "@/lib/types";

const STORAGE_KEY = "kaptaan804-cart-v1";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

let cartItems: CartItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(next: CartItem[]) {
  cartItems = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

let hydrated = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined" && !hydrated) {
    hydrated = true;
    cartItems = readStorage();
  }
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cartItems;
}

function getServerSnapshot(): CartItem[] {
  return [];
}

function toCartItem(
  product: Product,
  quantity: number,
  variant?: ProductVariant,
): CartItem {
  const selected = variant ?? product.variants[0];
  const variantId = selected?.id ?? "default";
  return {
    key: cartItemKey(product.id, variantId),
    productId: product.id,
    slug: product.slug,
    name: product.name.en,
    variantId,
    variantTitle: selected?.title.en ?? "Standard",
    price: selected?.price ?? product.price,
    quantity,
    image: product.images[0]?.src,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (product: Product, quantity = 1, variant?: ProductVariant) => {
      const incoming = toCartItem(product, Math.max(1, Math.floor(quantity)), variant);
      const current = readStorage();
      const existing = current.find((item) => item.key === incoming.key);
      const next = existing
        ? current.map((item) =>
            item.key === incoming.key
              ? { ...item, quantity: item.quantity + incoming.quantity }
              : item,
          )
        : [...current, incoming];
      persist(next);
      setIsOpen(true);
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    const nextQty = Math.floor(quantity);
    const current = readStorage();
    persist(
      nextQty < 1
        ? current.filter((item) => item.key !== key)
        : current.map((item) =>
            item.key === key ? { ...item, quantity: nextQty } : item,
          ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    persist(readStorage().filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => persist([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    };
  }, [items, isOpen, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
