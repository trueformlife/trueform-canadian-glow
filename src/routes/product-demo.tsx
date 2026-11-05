import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Leaf, Minus, Moon, Plus, ShieldCheck, ShoppingCart, Star, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/tfl-logo.png";
import liquidMagImage from "@/assets/product-images/liquid-mag.png.asset.json";
import magSprayImage from "@/assets/product-images/mag-spray.png.asset.json";
import bathFlakesImage from "@/assets/product-images/bath-flakes.png.asset.json";

export const Route = createFileRoute("/product-demo")({
  head: () => ({
    meta: [
      { title: "Liquid Mag — Product Page Example | True Form Life" },
      { name: "description", content: "A simpler Liquid Mag product page with a slide-out cart, built for Canadian women 40+." },
      { property: "og:title", content: "Liquid Mag — Product Page Example | True Form Life" },
      { property: "og:description", content: "Pick a flavour, pick a size, check out. Free shipping across Canada over $200." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProductDemo,
});

const STORE = "https://trueformlife.com";
const FREE_SHIP = 200;

// Real WooCommerce variation IDs and prices for Liquid Mag (CAD).
const variations = {
  "Pumpkin Spice": { single: { id: 17817, price: 37.94, regular: 37.94 }, six: { id: 17818, price: 189.7, regular: 227.64 } },
  Spearmint: { single: { id: 14815, price: 35.19, regular: 35.19 }, six: { id: 14816, price: 174.89, regular: 221.1 } },
} as const;
type Flavour = keyof typeof variations;
type Size = "single" | "six";

type CartItem = { id: number; name: string; detail: string; price: number; image: string; qty: number };

const addOns = [
  { id: 0, name: "Mag Spray", detail: "Rub on sore muscles", price: 32.99, image: magSprayImage.url, href: `${STORE}/product/mag-spray-x2/` },
  { id: 0, name: "Bath Flakes", detail: "A calm evening soak", price: 21.99, image: bathFlakesImage.url, href: `${STORE}/product/bath-flakes/` },
];

const money = (n: number) => `$${n.toFixed(2)}`;

function ProductDemo() {
  const [flavour, setFlavour] = useState<Flavour>("Spearmint");
  const [size, setSize] = useState<Size>("single");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const v = variations[flavour][size];
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const toFree = Math.max(0, FREE_SHIP - subtotal);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const addToCart = () => {
    setCart((c) => {
      const found = c.find((i) => i.id === v.id);
      if (found) return c.map((i) => (i.id === v.id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id: v.id, name: "Liquid Mag", detail: `${flavour} · ${size === "six" ? "6-pack" : "1 bottle"}`, price: v.price, image: liquidMagImage.url, qty }];
    });
    setOpen(true);
  };

  const changeQty = (id: number, d: number) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));

  // WooCommerce adds the first item via URL; the rest need a small store snippet (see note in drawer).
  const checkoutHref = cart[0] ? `${STORE}/checkout/?add-to-cart=${cart[0].id}&quantity=${cart[0].qty}` : `${STORE}/checkout/`;

  return (
    <div className="min-h-screen bg-background text-[17px] text-foreground">
      <div className="bg-royal px-4 py-2 text-center text-sm text-royal-foreground">
        Free shipping across Canada on orders over <span className="font-bold text-accent">$200</span>. Canadian owned.
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" aria-label="True Form Life home"><img src={logoImage} alt="True Form Life" className="h-11 w-11" /></Link>
          <span className="rounded-full bg-surface-strong px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">Example page</span>
          <Button className="relative h-11 px-4" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
            <ShoppingCart />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">{count}</span>}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-32 pt-6 md:pb-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="rounded-2xl bg-card p-6 md:sticky md:top-24">
            <img src={liquidMagImage.url} alt="Liquid Mag bottle" className="mx-auto aspect-square w-full max-w-md object-contain" />
          </div>

          <div>
            <div className="flex items-center gap-1 text-accent" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              <span className="ml-2 text-sm text-foreground/80">Loved by Canadian women</span>
            </div>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">Liquid Mag</h1>
            <p className="mt-3 text-lg text-foreground/85">Three kinds of magnesium in one easy drink. For deeper sleep, calmer days and fewer muscle cramps.</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">{money(v.price * qty)}</span>
              {v.regular > v.price && <span className="text-lg text-foreground/60 line-through">{money(v.regular * qty)}</span>}
              {v.regular > v.price && <span className="rounded-full bg-accent px-2 py-0.5 text-sm font-bold text-accent-foreground">Save {money((v.regular - v.price) * qty)}</span>}
              <span className="text-sm text-foreground/70">CAD</span>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-2 font-semibold">1. Pick your flavour</legend>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(variations) as Flavour[]).map((f) => (
                  <button key={f} onClick={() => setFlavour(f)} aria-pressed={flavour === f}
                    className={`min-h-14 rounded-xl border-2 px-3 font-semibold transition ${flavour === f ? "border-primary bg-primary/15" : "border-line bg-surface"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="mb-2 font-semibold">2. Pick your size</legend>
              <div className="grid gap-3">
                {(["single", "six"] as Size[]).map((s) => {
                  const o = variations[flavour][s];
                  const on = size === s;
                  return (
                    <button key={s} onClick={() => setSize(s)} aria-pressed={on}
                      className={`flex min-h-16 items-center justify-between rounded-xl border-2 px-4 text-left transition ${on ? "border-primary bg-primary/15" : "border-line bg-surface"}`}>
                      <span className="flex items-center gap-3">
                        <span className={`grid h-6 w-6 place-items-center rounded-full border-2 ${on ? "border-primary bg-primary text-primary-foreground" : "border-line"}`}>{on && <Check className="h-4 w-4" />}</span>
                        <span>
                          <span className="block font-semibold">{s === "single" ? "1 bottle" : "6-pack"}</span>
                          <span className="block text-sm text-foreground/70">{s === "single" ? "About a 1 month supply" : `Just ${money(o.price / 6)} a bottle`}</span>
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block font-bold">{money(o.price)}</span>
                        {s === "six" && <span className="block text-xs font-bold text-accent">Best value</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-14 items-center rounded-xl border-2 border-line bg-surface">
                <button className="grid h-full w-14 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer"><Minus /></button>
                <span className="w-8 text-center text-lg font-bold" aria-live="polite">{qty}</span>
                <button className="grid h-full w-14 place-items-center" onClick={() => setQty(qty + 1)} aria-label="More"><Plus /></button>
              </div>
              <Button onClick={addToCart} className="hidden h-14 flex-1 text-lg font-bold md:flex">Add to cart</Button>
            </div>

            <ul className="mt-6 grid gap-3 rounded-2xl bg-surface p-4 text-[16px]">
              <li className="flex gap-3"><Truck className="h-5 w-5 shrink-0 text-primary" />Ships coast to coast. Free over $200.</li>
              <li className="flex gap-3"><Leaf className="h-5 w-5 shrink-0 text-primary" />Clean ingredients. No fillers.</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" />Canadian family business. Real people answer.</li>
            </ul>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">How to take it</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {["Add 1 teaspoon to a small glass of water.", "Drink it in the evening, about 30 minutes before bed.", "Stay with it for 2–3 weeks to feel the full effect."].map((t, i) => (
              <li key={t} className="rounded-2xl bg-card p-5 text-card-foreground">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
                <p className="mt-3">{t}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">What's inside</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Glycinate", "Gentle on the stomach. Helps you relax and unwind."],
              ["Threonate", "Reaches the brain. Supports sleep and focus."],
              ["Chloride", "Absorbs easily. Supports energy and muscles."],
            ].map(([n, d]) => (
              <div key={n} className="rounded-2xl border border-line bg-surface p-5">
                <Moon className="h-6 w-6 text-primary" />
                <h3 className="mt-2 font-display text-xl font-semibold">Magnesium {n}</h3>
                <p className="mt-1 text-foreground/80">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">What women are saying</h2>
          <blockquote className="mt-5 rounded-2xl bg-card p-6 text-card-foreground">
            <div className="flex text-accent">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
            <p className="mt-3">Love these products! Fast delivery and the magnesium really helps me sleep.</p>
            <footer className="mt-2 font-semibold">— Sample review</footer>
          </blockquote>
        </section>
      </main>

      {/* Sticky buy bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-background/95 p-3 backdrop-blur md:hidden">
        <Button onClick={addToCart} className="h-14 w-full text-lg font-bold">Add to cart · {money(v.price * qty)}</Button>
      </div>

      {/* Slide-out cart */}
      <div className={`fixed inset-0 z-40 bg-background/70 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} />
      <aside role="dialog" aria-modal="true" aria-label="Your cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card text-card-foreground shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-display text-2xl font-bold">Your cart</h2>
          <button onClick={() => setOpen(false)} className="grid h-12 w-12 place-items-center rounded-full bg-muted" aria-label="Close cart"><X /></button>
        </div>

        <div className="border-b border-border p-4">
          <p className="font-semibold">{toFree > 0 ? <>You're {money(toFree)} away from <span className="text-royal">free shipping</span></> : "You've got free shipping across Canada! 🎉"}</p>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="grid gap-4">
              {cart.map((i) => (
                <li key={i.id} className="flex gap-3">
                  <img src={i.image} alt="" className="h-20 w-20 rounded-xl bg-muted object-contain p-1" />
                  <div className="flex-1">
                    <p className="font-semibold">{i.name}</p>
                    <p className="text-sm text-muted-foreground">{i.detail}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex h-11 items-center rounded-lg border border-border">
                        <button className="grid h-full w-11 place-items-center" onClick={() => changeQty(i.id, -1)} aria-label="Fewer"><Minus className="h-4 w-4" /></button>
                        <span className="w-6 text-center font-bold">{i.qty}</span>
                        <button className="grid h-full w-11 place-items-center" onClick={() => changeQty(i.id, 1)} aria-label="More"><Plus className="h-4 w-4" /></button>
                      </div>
                      <span className="font-bold">{money(i.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <h3 className="mt-8 font-semibold">Pairs well with</h3>
          <ul className="mt-3 grid gap-3">
            {addOns.map((a) => (
              <li key={a.name} className="flex items-center gap-3 rounded-xl bg-muted p-3">
                <img src={a.image} alt="" className="h-14 w-14 object-contain" />
                <div className="flex-1"><p className="font-semibold">{a.name}</p><p className="text-sm text-muted-foreground">{a.detail} · {money(a.price)}</p></div>
                <Button asChild variant="outline" className="h-11"><a href={a.href}>View</a></Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border p-4">
          <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-bold">{money(subtotal)} CAD</span></div>
          <p className="mt-1 text-sm text-muted-foreground">Shipping and tax shown at checkout.</p>
          <Button asChild className="mt-3 h-14 w-full text-lg font-bold" disabled={!cart.length}>
            <a href={checkoutHref}>Checkout securely</a>
          </Button>
          <button onClick={() => setOpen(false)} className="mt-2 h-12 w-full font-semibold text-royal">Keep shopping</button>
        </div>
      </aside>
    </div>
  );
}
