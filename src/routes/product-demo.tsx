import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronUp, Leaf, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoCheckout } from "@/components/DemoCheckout";
import logoImage from "@/assets/tfl-logo.png";
import liquidMagImage from "@/assets/product-images/liquid-mag.png.asset.json";
import magSprayImage from "@/assets/product-images/mag-spray.png.asset.json";
import magteinImage from "@/assets/product-images/magtein.jpg.asset.json";
import collagenImage from "@/assets/product-images/collagen.jpg.asset.json";
import creatineImage from "@/assets/product-images/creatine.png.asset.json";
import vanillaImage from "@/assets/product-images/vanilla-protein.png.asset.json";
import turmericImage from "@/assets/product-images/turmeric.png.asset.json";
import bathFlakesImage from "@/assets/product-images/bath-flakes.png.asset.json";

export const Route = createFileRoute("/product-demo")({
  head: () => ({
    meta: [
      { title: "Liquid Mag — One-Page Order Example | True Form Life" },
      { name: "description", content: "Pick, change and check out on one page. No cart page, no going back and forth." },
      { property: "og:title", content: "Liquid Mag — One-Page Order Example | True Form Life" },
      { property: "og:description", content: "Tap + to add, − to remove. Your order updates right on the page." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProductDemo,
});

const STORE = "https://trueformlife.com";
const FREE_SHIP = 200;
const money = (n: number) => `$${n.toFixed(2)}`;

type Item = { id: number; name: string; detail: string; price: number; regular?: number; image: string };

// Real WooCommerce IDs and CAD prices.
const liquidMag: Item[] = [
  { id: 14815, name: "Liquid Mag", detail: "Spearmint · 1 bottle", price: 35.19, image: liquidMagImage.url },
  { id: 14816, name: "Liquid Mag", detail: "Spearmint · 6-pack", price: 174.89, regular: 221.1, image: liquidMagImage.url },
  { id: 17817, name: "Liquid Mag", detail: "Pumpkin Spice · 1 bottle", price: 37.94, image: liquidMagImage.url },
  { id: 17818, name: "Liquid Mag", detail: "Pumpkin Spice · 6-pack", price: 189.7, regular: 227.64, image: liquidMagImage.url },
];
type Product = { key: string; name: string; short: string; why: string; image: string; options: Item[]; extras: number[] };

const products: Product[] = [
  { key: "mag", name: "Liquid Mag", short: "Liquid Mag", why: "Three kinds of magnesium. Deeper sleep, calmer days, fewer cramps.", image: liquidMagImage.url, options: liquidMag, extras: [14521, 14518, 14827] },
  {
    key: "protein", name: "Vanilla Protein", short: "Protein", why: "Clean protein. Keeps your strength up and keeps you full.", image: vanillaImage.url,
    options: [
      { id: 14817, name: "Vanilla Protein", detail: "500g", price: 40.69, image: vanillaImage.url },
      { id: 14818, name: "Vanilla Protein", detail: "1000g", price: 60.71, regular: 75.89, image: vanillaImage.url },
    ],
    extras: [22687, 22240],
  },
  {
    key: "turmeric", name: "Platinum Turmeric", short: "Turmeric", why: "Comfortable joints so you can keep moving.", image: turmericImage.url,
    options: [
      { id: 25869, name: "Platinum Turmeric", detail: "1 bottle", price: 49.95, image: turmericImage.url },
      { id: 25870, name: "Platinum Turmeric", detail: "3 bottles", price: 139.95, regular: 149.85, image: turmericImage.url },
    ],
    extras: [22240, 14815],
  },
  {
    key: "collagen", name: "Collagen", short: "Collagen", why: "Skin, hair, nails and joints. One scoop a day.", image: collagenImage.url,
    options: [{ id: 22240, name: "Collagen", detail: "1 bag", price: 69.99, image: collagenImage.url }],
    extras: [25869, 14817],
  },
];

const extraItems: Item[] = [
  { id: 14521, name: "Mag Spray", detail: "Rub on sore muscles", price: 32.99, image: magSprayImage.url },
  { id: 14518, name: "Magtein", detail: "Calm mind, better sleep", price: 65.99, image: magteinImage.url },
  { id: 14827, name: "Bath Flakes", detail: "1200g · relaxing soak", price: 38.49, image: bathFlakesImage.url },
  { id: 22687, name: "Creatine", detail: "Strength and muscle", price: 49.99, image: creatineImage.url },
];
const all: Item[] = [];
for (const i of [...products.flatMap((p) => p.options), ...extraItems]) if (!all.some((a) => a.id === i.id)) all.push(i);
const byId = (id: number) => all.find((i) => i.id === id)!;

function Stepper({ qty, onChange, label }: { qty: number; onChange: (d: number) => void; label: string }) {
  if (qty === 0)
    return (
      <Button onClick={() => onChange(1)} className="h-12 min-w-28 text-base font-bold" aria-label={`Add ${label}`}>
        <Plus /> Add
      </Button>
    );
  return (
    <div className="flex h-12 items-center rounded-xl border-2 border-primary bg-primary/15">
      <button className="grid h-full w-12 place-items-center" onClick={() => onChange(-1)} aria-label={`One less ${label}`}><Minus /></button>
      <span className="w-8 text-center text-lg font-bold" aria-live="polite">{qty}</span>
      <button className="grid h-full w-12 place-items-center" onClick={() => onChange(1)} aria-label={`One more ${label}`}><Plus /></button>
    </div>
  );
}

function Row({ item, qty, onChange }: { item: Item; qty: number; onChange: (d: number) => void }) {
  return (
    <li className={`flex items-center gap-3 rounded-2xl border-2 p-3 transition ${qty ? "border-primary bg-primary/10" : "border-line bg-surface"}`}>
      <img src={item.image} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl bg-card object-contain p-1" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-tight">{item.name}</p>
        <p className="text-sm text-foreground/70">{item.detail}</p>
        <p className="mt-0.5 font-bold">
          {money(item.price)}
          {item.regular && <span className="ml-2 text-sm font-normal text-foreground/60 line-through">{money(item.regular)}</span>}
        </p>
      </div>
      <Stepper qty={qty} onChange={onChange} label={`${item.name} ${item.detail}`} />
    </li>
  );
}

function ProductDemo() {
  const [qty, setQty] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("mag");
  const [step, setStep] = useState<"shop" | "checkout">("shop");
  const goCheckout = () => { setOpen(false); setStep("checkout"); window.scrollTo(0, 0); };
  const product = products.find((p) => p.key === active)!;
  const change = (id: number, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) }));

  const inOrder = all.filter((i) => qty[i.id]);
  const count = inOrder.reduce((s, i) => s + (qty[i.id] ?? 0), 0);
  const subtotal = inOrder.reduce((s, i) => s + i.price * (qty[i.id] ?? 0), 0);
  const toFree = Math.max(0, FREE_SHIP - subtotal);
  const checkoutHref = inOrder[0] ? `${STORE}/checkout/?add-to-cart=${inOrder[0].id}&quantity=${qty[inOrder[0].id]}` : `${STORE}/shop/`;

  const Summary = (
    <div>
      <p className="font-semibold">{toFree > 0 ? <>You're {money(toFree)} away from free shipping</> : "You've got free shipping across Canada!"}</p>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} />
      </div>
      {inOrder.length === 0 ? (
        <p className="py-6 text-center text-muted-foreground">Tap “Add” on anything to start your order.</p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {inOrder.map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-semibold">{i.name}</p>
                <p className="text-sm text-muted-foreground">{i.detail}</p>
              </div>
              <Stepper qty={qty[i.id] ?? 0} onChange={(d) => change(i.id, d)} label={`${i.name} ${i.detail}`} />
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex justify-between text-lg"><span>Total</span><span className="font-bold">{money(subtotal)} CAD</span></div>
      <p className="text-sm text-muted-foreground">Shipping and tax shown at checkout.</p>
      <Button asChild className="mt-3 h-14 w-full text-lg font-bold" disabled={!count}><a href={checkoutHref}>Checkout securely</a></Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-[17px] text-foreground">
      <div className="bg-royal px-4 py-2 text-center text-sm text-royal-foreground">
        Free shipping across Canada on orders over <span className="font-bold text-accent">$200</span>. Canadian owned.
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" aria-label="True Form Life home"><img src={logoImage} alt="True Form Life" className="h-11 w-11" /></Link>
          <span className="rounded-full bg-surface-strong px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">Example page</span>
        </div>
      </header>

      {step === "checkout" ? <DemoCheckout items={inOrder} qty={qty} change={change} onBack={() => setStep("shop")} /> : <>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 pb-40 pt-6 md:grid-cols-[1fr_360px] md:pb-16">
        <div>
          <p className="font-semibold">Tap a product. Everything you add stays in your order.</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist">
            {products.map((p) => {
              const n = p.options.reduce((s, o) => s + (qty[o.id] ?? 0), 0);
              return (
                <button key={p.key} role="tab" aria-selected={p.key === active} onClick={() => setActive(p.key)}
                  className={`relative flex h-14 items-center justify-center rounded-xl border-2 px-2 font-semibold transition ${p.key === active ? "border-primary bg-primary text-primary-foreground" : "border-line bg-surface"}`}>
                  {p.short}
                  {n > 0 && <span className="absolute -right-1 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">{n}</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <img src={product.image} alt={product.name} className="h-32 w-32 shrink-0 rounded-2xl bg-card object-contain p-2 md:h-44 md:w-44" />
            <div>
              <div className="flex text-accent" aria-label="Rated 5 out of 5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <h1 className="mt-1 font-display text-3xl font-bold leading-tight md:text-5xl">{product.name}</h1>
              <p className="mt-1 text-foreground/85">{product.why}</p>
            </div>
          </div>

          <h2 className="mt-6 font-display text-xl font-bold">{product.options.length > 1 ? "Pick your size" : "Add to your order"}</h2>
          <ul className="mt-3 grid gap-3">
            {product.options.map((i) => <Row key={i.id} item={i} qty={qty[i.id] ?? 0} onChange={(d) => change(i.id, d)} />)}
          </ul>

          <h2 className="mt-8 font-display text-xl font-bold">Goes well with</h2>
          <ul className="mt-3 grid gap-3">
            {product.extras.map(byId).map((i) => <Row key={i.id} item={i} qty={qty[i.id] ?? 0} onChange={(d) => change(i.id, d)} />)}
          </ul>

          <ul className="mt-8 grid gap-3 rounded-2xl bg-surface p-4 text-[16px]">
            <li className="flex gap-3"><Truck className="h-5 w-5 shrink-0 text-primary" />Ships coast to coast. Free over $200.</li>
            <li className="flex gap-3"><Leaf className="h-5 w-5 shrink-0 text-primary" />Clean ingredients. No fillers.</li>
            <li className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" />Canadian family business. Real people answer.</li>
          </ul>
        </div>

        {/* Order always visible on larger screens */}
        <aside className="hidden md:block">
          <div className="sticky top-24 rounded-2xl bg-card p-5 text-card-foreground">
            <h2 className="mb-3 font-display text-2xl font-bold">Your order</h2>
            {Summary}
          </div>
        </aside>
      </main>

      {/* Phone: order bar that opens in place */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card text-card-foreground shadow-2xl md:hidden">
        {open && <div className="max-h-[65vh] overflow-y-auto border-b border-border p-4">{Summary}</div>}
        <div className="flex items-center gap-3 p-3">
          <button onClick={() => setOpen(!open)} className="flex h-14 flex-1 items-center justify-between rounded-xl bg-muted px-4 text-left" aria-expanded={open}>
            <span>
              <span className="block text-sm text-muted-foreground">{count} {count === 1 ? "item" : "items"} · tap to change</span>
              <span className="block font-bold">{money(subtotal)} CAD</span>
            </span>
            <ChevronUp className={`transition ${open ? "rotate-180" : ""}`} />
          </button>
          <Button asChild className="h-14 px-5 text-lg font-bold" disabled={!count}><a href={checkoutHref}>Checkout</a></Button>
        </div>
      </div>
      </>}
    </div>
  );
}
