"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Currency = "USD" | "RUB";

export type CartProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: Currency;
  note?: string;
};

type CartItem = CartProduct & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "pulse-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function formatPrice(price: number, currency: Currency) {
  if (currency === "USD") return `$${price.toFixed(2)}`;

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}

function CartDrawer({
  items,
  isOpen,
  closeCart,
  removeItem,
  changeQuantity,
}: Pick<CartContextValue, "items" | "isOpen" | "closeCart" | "removeItem" | "changeQuantity">) {
  const reduceMotion = useReducedMotion();
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const dollarTotal = items
    .filter((item) => item.currency === "USD")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const rubleTotal = items
    .filter((item) => item.currency === "RUB")
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeCart, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Закрыть корзину"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[31rem] flex-col bg-soft-white text-ink"
          >
            <div className="flex items-center justify-between border-b border-ink/15 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/45">
                  Твой набор
                </p>
                <h2 id="cart-title" className="mt-1 text-3xl font-extrabold tracking-[-0.05em]">
                  Корзина · {count}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex size-11 items-center justify-center rounded-full border border-ink/20 text-2xl transition-colors hover:bg-ink hover:text-soft-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                aria-label="Закрыть корзину"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              {items.length === 0 ? (
                <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
                  <p className="text-4xl font-extrabold tracking-[-0.055em]">Пока пусто.</p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-ink/55">
                    Выбери вкус — банка сразу появится здесь и сохранится после перезагрузки.
                  </p>
                  <button type="button" onClick={closeCart} className="cta-pill mt-8">
                    Выбрать вкус
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="grid grid-cols-[5.5rem_1fr] gap-4 rounded-md border border-ink/15 p-3"
                    >
                      <div className="relative min-h-28 overflow-hidden rounded-sm bg-chrome/25">
                        <Image src={item.image} alt={`${item.name} in the PULSE shopping cart`} fill draggable={false} onContextMenu={(event) => event.preventDefault()} sizes="88px" className="object-contain p-2" />
                      </div>
                      <div className="flex min-w-0 flex-col justify-between py-1">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-extrabold tracking-[-0.025em]">{item.name}</h3>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-xs font-bold text-ink/40 underline underline-offset-4 transition-colors hover:text-ink"
                            >
                              Удалить
                            </button>
                          </div>
                          {item.note && <p className="mt-1 text-xs leading-5 text-ink/50">{item.note}</p>}
                          <p className="mt-1 text-sm font-bold">{formatPrice(item.price, item.currency)}</p>
                        </div>
                        <div className="mt-3 flex w-fit items-center rounded-full border border-ink/20">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, item.quantity - 1)}
                            className="size-9 text-lg"
                            aria-label={`Уменьшить количество ${item.name}`}
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-bold" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, item.quantity + 1)}
                            className="size-9 text-lg"
                            aria-label={`Увеличить количество ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/15 px-5 py-6 sm:px-7">
                <div className="space-y-2 text-sm">
                  {dollarTotal > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className="text-ink/55">Напитки</span>
                      <strong>{formatPrice(dollarTotal, "USD")}</strong>
                    </div>
                  )}
                  {rubleTotal > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className="text-ink/55">Подписка</span>
                      <strong>{formatPrice(rubleTotal, "RUB")}</strong>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutNotice(true)}
                  className="cta-pill mt-5 w-full py-4"
                >
                  Перейти к оформлению
                </button>
                <p aria-live="polite" className="mt-3 text-center text-[0.68rem] leading-5 text-ink/40">
                  {checkoutNotice
                    ? "Заказ сохранён. Реальную оплату подключим на этапе бэкенда."
                    : "Демо-корзина: товары сохраняются локально, оплата пока не подключена."}
                </p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored) as CartItem[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHasLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hasLoaded, items]);

  const addItem = useCallback((product: CartProduct) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const changeQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      isOpen,
      addItem,
      removeItem,
      changeQuantity,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [addItem, changeQuantity, isOpen, items, removeItem],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer
        items={items}
        isOpen={isOpen}
        closeCart={value.closeCart}
        removeItem={removeItem}
        changeQuantity={changeQuantity}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart должен использоваться внутри CartProvider");
  return context;
}
