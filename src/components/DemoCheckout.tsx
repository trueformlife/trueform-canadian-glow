import { useState } from "react";
import { ArrowLeft, CheckCircle2, Lock, Mail, Minus, Package, Plus, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Item = { id: number; name: string; detail: string; price: number; image: string };

const FREE_SHIP = 200;
const SHIP_FEE = 15; // example only
const TAX: Record<string, [string, number]> = {
  AB: ["Alberta", 0.05], BC: ["British Columbia", 0.12], MB: ["Manitoba", 0.12], NB: ["New Brunswick", 0.15],
  NL: ["Newfoundland and Labrador", 0.15], NS: ["Nova Scotia", 0.14], NT: ["Northwest Territories", 0.05],
  NU: ["Nunavut", 0.05], ON: ["Ontario", 0.13], PE: ["Prince Edward Island", 0.15], QC: ["Quebec", 0.14975],
  SK: ["Saskatchewan", 0.11], YT: ["Yukon", 0.05],
};
const money = (n: number) => `$${n.toFixed(2)}`;

function Field({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <input {...p} className="h-14 w-full rounded-xl border-2 border-border bg-card px-4 text-lg text-card-foreground outline-none focus:border-primary" />
    </label>
  );
}

export function DemoCheckout({ items, qty, change, onBack }: {
  items: Item[]; qty: Record<number, number>; change: (id: number, d: number) => void; onBack: () => void;
}) {
  const [prov, setProv] = useState("AB");
  const [done, setDone] = useState<null | { name: string; email: string; total: number; tax: number; ship: number; number: string; address: string; lines: (Item & { q: number })[] }>(null);
  const subtotal = items.reduce((s, i) => s + i.price * (qty[i.id] ?? 0), 0);
  const ship = subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const tax = (subtotal + ship) * (TAX[prov]?.[1] ?? 0.05);
  const total = subtotal + ship + tax;

  if (done)
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-primary" />
          <h1 className="mt-4 font-display text-4xl font-bold">Thank you{done.name ? `, ${done.name.split(" ")[0]}` : ""}!</h1>
          <p className="mt-2 text-lg">Your order is in. Order number <b>{done.number}</b>.</p>
          <p className="mt-1 text-lg">A receipt is on its way to <b>{done.email || "your email"}</b>.</p>
        </div>

        <section className="mt-8 rounded-2xl bg-card p-5 text-card-foreground">
          <h2 className="font-display text-xl font-bold">What happens next</h2>
          <ol className="mt-4 grid gap-4">
            {[
              [Mail, "Receipt sent", "Check your inbox now. It has everything you ordered."],
              [Package, "Packed by hand", "We pack your order within 1 to 2 business days."],
              [Truck, "Tracking link", "You get a Canada Post tracking email the day it ships."],
            ].map(([Icon, t, d], n) => {
              const I = Icon as typeof Mail;
              return (
                <li key={n} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><I className="h-6 w-6" /></span>
                  <div><p className="text-lg font-bold">{n + 1}. {t as string}</p><p>{d as string}</p></div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-6 rounded-2xl bg-card p-5 text-card-foreground">
          <h2 className="font-display text-xl font-bold">Your order</h2>
          <ul className="mt-3 grid gap-3">
            {done.lines.map((l) => (
              <li key={l.id} className="flex items-center gap-3">
                <img src={l.image} alt="" loading="lazy" className="h-12 w-12 rounded-lg object-contain" />
                <div className="min-w-0 flex-1"><p className="font-semibold">{l.name}</p><p className="text-sm text-muted-foreground">{l.detail} · Qty {l.q}</p></div>
                <p className="font-semibold">{money(l.price * l.q)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 grid gap-1 border-t border-border pt-3">
            <div className="flex justify-between"><dt>Shipping</dt><dd>{done.ship ? money(done.ship) : "Free"}</dd></div>
            <div className="flex justify-between"><dt>Tax</dt><dd>{money(done.tax)}</dd></div>
            <div className="mt-2 flex justify-between text-xl font-bold"><dt>Paid</dt><dd>{money(done.total)} CAD</dd></div>
          </dl>
          <div className="mt-4 border-t border-border pt-3">
            <p className="font-bold">Shipping to</p>
            <p>{done.name}</p><p>{done.address}</p>
            <p className="text-sm text-muted-foreground">Canada Post, tracked</p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border-2 border-primary p-5">
          <h2 className="font-display text-xl font-bold">Questions?</h2>
          <p className="mt-1 text-lg">Just reply to your receipt email. It goes straight to Drew.</p>
        </section>

        <section className="mt-6 rounded-2xl bg-secondary p-5 text-secondary-foreground">
          <h2 className="font-display text-xl font-bold">While you wait</h2>
          <p className="mt-1">Join other women 40+ sharing tips and wins.</p>
          <Button asChild className="mt-4 h-14 w-full text-lg font-bold"><a href="https://www.facebook.com/groups/tfagelessenergy" target="_blank" rel="noreferrer">Join the Ageless Energy group</a></Button>
          <a href="https://smoothie-recipe-book.trueformlife.com/" target="_blank" rel="noreferrer" className="mt-3 flex h-12 items-center justify-center font-semibold underline">Free Smoothie Recipe Book</a>
        </section>

        <p className="mt-6 text-center text-sm text-foreground/70">This is an example. No order was placed.</p>
        <Button variant="outline" className="mt-3 h-14 w-full text-lg font-bold" onClick={onBack}>Back to shopping</Button>
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <button onClick={onBack} className="flex h-12 items-center gap-2 font-semibold"><ArrowLeft /> Keep shopping</button>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Checkout</h1>
      <p className="text-foreground/80">One page. Three quick steps.</p>

      <form
        className="mt-6 grid gap-8 md:grid-cols-[1fr_380px]"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const g = (k: string) => String(f.get(k) || "");
          setDone({
            name: g("name"), email: g("email"), total, tax, ship,
            number: `#TFL-${Math.floor(10000 + Math.random() * 90000)}`,
            address: `${g("street")}, ${g("city")}, ${prov} ${g("postal").toUpperCase()}`,
            lines: items.filter((i) => (qty[i.id] ?? 0) > 0).map((i) => ({ ...i, q: qty[i.id] ?? 0 })),
          });
          window.scrollTo(0, 0);
        }}
      >
        <div className="grid gap-8">
          <section className="grid gap-4">
            <h2 className="font-display text-xl font-bold">1. Your details</h2>
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Full name" name="name" autoComplete="name" required />
            <Field label="Phone (for delivery only)" name="phone" type="tel" autoComplete="tel" />
          </section>
          <section className="grid gap-4">
            <h2 className="font-display text-xl font-bold">2. Where should we ship?</h2>
            <Field label="Street address" name="street" autoComplete="street-address" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" name="city" autoComplete="address-level2" required />
              <label className="block">
                <span className="mb-1 block font-semibold">Province</span>
                <select value={prov} onChange={(e) => setProv(e.target.value)} className="h-14 w-full rounded-xl border-2 border-border bg-card px-4 text-lg text-card-foreground">
                  {Object.entries(TAX).map(([k, [n]]) => <option key={k} value={k}>{n}</option>)}
                </select>
              </label>
            </div>
            <Field label="Postal code" name="postal" autoComplete="postal-code" placeholder="T5J 0N3" required />
          </section>
          <section className="grid gap-4">
            <h2 className="font-display text-xl font-bold">3. Payment</h2>
            <Field label="Card number" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" placeholder="MM / YY" autoComplete="cc-exp" />
              <Field label="CVC" inputMode="numeric" autoComplete="cc-csc" />
            </div>
            <p className="flex items-center gap-2 text-sm text-foreground/75"><Lock className="h-4 w-4" /> Secure payment. Apple Pay and Google Pay could go here too.</p>
          </section>
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl bg-card p-5 text-card-foreground">
            <h2 className="font-display text-xl font-bold">Your order</h2>
            <ul className="mt-3 grid gap-3">
              {items.map((i) => (
                <li key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt="" className="h-12 w-12 rounded-lg object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{i.name}</p>
                    <p className="text-sm text-muted-foreground">{i.detail} · {money(i.price)}</p>
                  </div>
                  <div className="flex h-12 items-center rounded-xl border-2 border-primary">
                    <button type="button" className="grid h-full w-10 place-items-center" onClick={() => change(i.id, -1)} aria-label={`One less ${i.name}`}><Minus className="h-4 w-4" /></button>
                    <span className="w-6 text-center font-bold">{qty[i.id]}</span>
                    <button type="button" className="grid h-full w-10 place-items-center" onClick={() => change(i.id, 1)} aria-label={`One more ${i.name}`}><Plus className="h-4 w-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-4 grid gap-1 border-t border-border pt-3">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>{ship ? money(ship) : "Free"}</dd></div>
              <div className="flex justify-between"><dt>Tax ({prov})</dt><dd>{money(tax)}</dd></div>
              <div className="mt-2 flex justify-between text-xl font-bold"><dt>Total</dt><dd>{money(total)} CAD</dd></div>
            </dl>
            <Button type="submit" className="mt-4 h-14 w-full text-lg font-bold" disabled={!items.length}>Place order · {money(total)}</Button>
            <p className="mt-2 text-center text-sm text-muted-foreground">Example only. No payment is taken.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}
