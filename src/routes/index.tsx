import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Brain,
  Dumbbell,
  HeartPulse,
  Leaf,
  MapPin,
  MoonStar,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TestTube2,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { shopLinks } from "@/config/shopLinks";
import heroImage from "@/assets/tfl-hero.jpg";
import logoImage from "@/assets/tfl-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Supplements for Women 40+ | True Form Life Canada" },
      { name: "description", content: "Clean Canadian supplements for better energy, sleep and strength. No fillers. Shipped across Canada." },
      { property: "og:title", content: "True Form Life | Built for Women 40+" },
      { property: "og:description", content: "Clean supplements for energy, sleep and strength, from a Canadian family business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Product = { name: string; price: string; why: string; href: string; badge?: "New" | "Save" };

const p = shopLinks.products;
const products: Record<string, Product> = {
  liquidMag: { name: "Liquid Mag", price: "37.94", why: "Fast, easy magnesium support.", href: p.liquidMag },
  magtein: { name: "Magtein", price: "65.99", why: "Magnesium for focus and calm.", href: p.magtein, badge: "New" },
  bathFlakes: { name: "Bath Flakes", price: "21.99", why: "A simple soak for tired muscles.", href: p.bathFlakes },
  spirulina: { name: "Spirulina", price: "26.39", why: "Clean greens for everyday energy.", href: p.spirulina },
  chlorella: { name: "Chlorella", price: "26.39", why: "Whole-food greens and detox support.", href: p.chlorella },
  brainFuel: { name: "Brain Fuel MCT Oil", price: "31.99", why: "Clean fuel for steady focus.", href: p.brainFuel },
  creatine: { name: "Creatine Monohydrate", price: "49.99", why: "Daily support for strength and muscle.", href: p.creatine, badge: "New" },
  vanillaProtein: { name: "Vanilla Protein", price: "40.69", why: "Easy protein without the fillers.", href: p.vanillaProtein },
  completeTruth: { name: "Complete Truth Protein", price: "36.29", why: "Real-food protein in every scoop.", href: p.completeTruthProtein },
  turmeric: { name: "Joint Strength: Platinum Turmeric", price: "49.95", why: "Targeted support for active joints.", href: p.turmeric },
  collagen: { name: "Organic Collagen Peptides", price: "69.99", why: "Supports skin, joints and strong tissue.", href: p.collagen },
  maca: { name: "Maca", price: "19.99", why: "Plant-based hormone and energy support.", href: p.maca },
  charcoal: { name: "Activated Charcoal", price: "49.49", why: "Simple digestive support when needed.", href: p.charcoal },
};

const goals = [
  { id: "sleep", label: "Sleep & stress", icon: MoonStar, products: ["liquidMag", "bathFlakes", "magtein"] },
  { id: "energy", label: "Energy & focus", icon: Zap, products: ["magtein"] },
  { id: "strength", label: "Strength & muscle", icon: Dumbbell, products: ["creatine", "vanillaProtein", "completeTruth"] },
  { id: "joints", label: "Joints & skin", icon: Sparkles, products: ["turmeric", "collagen"] },
  { id: "gut", label: "Gut & detox", icon: Leaf, products: ["chlorella", "charcoal"] },
  { id: "hormones", label: "Hormone support", icon: HeartPulse, products: ["maca", "liquidMag"] },
] as const;

const bestSellers = ["liquidMag", "collagen", "turmeric", "creatine", "bathFlakes", "vanillaProtein"];
const bundles: Product[] = [
  { name: "Ultimate Wellness Bundle", price: "160.00", why: "Everyday essentials, bundled together.", href: p.ultimateBundle, badge: "Save" },
  { name: "Glow From Within Bundle", price: "105.99", why: "Support for skin, joints and daily glow.", href: p.glowBundle, badge: "Save" },
  { name: "Liquid Mag Promo Bundle", price: "35.19", why: "Our magnesium favourite at bundle value.", href: p.liquidMagBundle, badge: "Save" },
];

function ProductVisual({ name, compact = false }: { name: string; compact?: boolean }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-secondary ${compact ? "h-36" : "h-44"}`} aria-hidden="true">
      <div className="absolute inset-x-0 bottom-0 h-10 bg-primary/15" />
      <div className="relative h-28 w-16 rounded-md border-2 border-primary/35 bg-card shadow-lg">
        <div className="h-5 rounded-t bg-primary" />
        <div className="mx-auto mt-4 h-1.5 w-8 rounded bg-accent" />
        <div className="mx-auto mt-2 h-1 w-10 rounded bg-royal/30" />
        <div className="mx-auto mt-1 h-1 w-7 rounded bg-royal/20" />
      </div>
      <span className="absolute bottom-2 max-w-[90%] truncate text-xs font-bold text-secondary-foreground">{name}</span>
    </div>
  );
}

function ProductCard({ product, compact = false }: { product: Product | undefined; compact?: boolean }) {
  if (!product) return null;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-xl">
      {product.badge && <span className="absolute left-3 top-3 z-10 rounded bg-accent px-2.5 py-1 text-sm font-bold text-accent-foreground">{product.badge}</span>}
      <ProductVisual name={product.name} compact={compact} />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-xl font-bold leading-tight">{product.name}</h3>
        <p className="mt-1 text-base text-muted-foreground">{product.why}</p>
        <p className="mt-3 font-display text-lg font-bold text-royal">from ${product.price} CAD</p>
        <Button asChild className="mt-4 w-full">
          <a href={product.href}>Buy <ArrowRight /></a>
        </Button>
      </div>
    </article>
  );
}

function SectionTitle({ kicker, children }: { kicker?: string; children: React.ReactNode }) {
  return <div className="mb-6"><p className="font-bold uppercase text-primary">{kicker}</p><h2 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">{children}</h2></div>;
}

function Index() {
  const [selectedGoal, setSelectedGoal] = useState("sleep");
  const [query, setQuery] = useState("");
  const selected = goals.find((goal) => goal.id === selectedGoal) ?? goals[0];
  const normalizedQuery = query.trim().toLowerCase();
  const searching = normalizedQuery.length > 0;
  const searchResults = Object.entries(products)
    .filter(([, product]) => product.name.toLowerCase().includes(normalizedQuery) || product.why.toLowerCase().includes(normalizedQuery))
    .map(([id]) => id);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <div className="bg-surface-strong px-3 py-2 text-center text-sm font-semibold sm:text-base">
        Free shipping across Canada on orders over <strong className="text-accent">$200</strong>. Canadian owned.
      </div>
      <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6">
          <img src={logoImage} alt="True Form Life" width={1024} height={102} className="h-auto w-32 shrink-0 sm:w-56" />
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (!searching && event.target.value.trim().length > 0) {
                  document.getElementById("find-your-fit")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              placeholder="Search products…"
              aria-label="Search products"
              className="h-12 w-full rounded-lg border-2 border-line bg-card pl-10 pr-3 text-base text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <Button asChild className="shrink-0 px-5"><a href={shopLinks.shop}>Shop</a></Button>
        </div>
      </header>

      <section aria-label="Why True Form Life" className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {[[MapPin,"Canadian owned"],[PackageCheck,"Ships coast to coast"],[TestTube2,"Clean ingredients, no fillers"],[Star,"Real Google reviews"]].map(([Icon,label]) => {
            const TrustIcon = Icon as typeof MapPin;
            return <div key={label as string} className="flex min-h-28 flex-col items-center justify-center gap-2 bg-surface px-3 text-center"><TrustIcon className="text-primary" /><span className="text-sm font-bold sm:text-base">{label as string}</span></div>;
          })}
        </div>
      </section>


      <section className="relative min-h-[calc(100svh-104px)] sm:min-h-[680px]">
        <img src={heroImage} alt="Confident active woman enjoying the Canadian outdoors" width={1280} height={960} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[68%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_92%,transparent)_46%,color-mix(in_oklab,var(--background)_15%,transparent)_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-104px)] max-w-7xl items-center px-4 py-8 sm:min-h-[680px] sm:px-6">
          <div className="max-w-xl">
            <p className="mb-3 font-bold text-primary">CANADIAN OWNED · WOMEN 40+</p>
            <h1 className="text-4xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">Built for women 40+.<br /><span className="text-primary">Energy. Sleep. Strength.</span></h1>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-foreground/85 sm:text-xl">Clean supplements from a Canadian family business. No fillers. No junk. Just what works, shipped anywhere in Canada.</p>
            <div className="mt-6 grid gap-3 sm:flex">
              <Button asChild size="lg" className="w-full sm:w-auto"><a href={shopLinks.shop}>Shop all <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="w-full border-foreground/50 bg-background/70 text-foreground sm:w-auto"><a href="#find-your-fit">Find your fit</a></Button>
            </div>
          </div>
        </div>
      </section>


      <section id="find-your-fit" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Find your fit">Where do you want to start?</SectionTitle>
          {searching ? (
            <div className="mt-7 grid animate-in fade-in slide-in-from-bottom-3 gap-4 duration-300 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.length > 0 ? searchResults.map((id) => <ProductCard key={id} product={products[id]} compact />) : <p className="col-span-full py-6 text-center text-lg text-muted-foreground">No products found for “{query}”. Try another search.</p>}
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  const active = selectedGoal === goal.id;
                  return <button key={goal.id} type="button" onClick={() => setSelectedGoal(goal.id)} aria-pressed={active} className={`min-h-28 rounded-lg border-2 p-3 text-left transition-all active:scale-[0.98] ${active ? "border-accent bg-surface-strong shadow-accent" : "border-line bg-surface hover:border-primary"}`}><Icon className={active ? "text-accent" : "text-primary"} /><span className="mt-3 block font-display text-base font-bold leading-tight sm:text-lg">{goal.label}</span></button>;
                })}
              </div>
              <div key={selected.id} className="mt-7 grid animate-in fade-in slide-in-from-bottom-3 gap-4 duration-300 sm:grid-cols-2 lg:grid-cols-3">
                {selected.products.map((id) => <ProductCard key={id} product={products[id]} compact />)}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-secondary px-4 py-16 text-secondary-foreground sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Most loved">Best sellers</SectionTitle>
          <div className="no-scrollbar -mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 sm:mr-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pr-0 lg:grid-cols-3">
            {bestSellers.map((id) => <div key={id} className="w-[84%] shrink-0 snap-start sm:w-auto"><ProductCard product={products[id]} /></div>)}
          </div>
        </div>
      </section>

      <section className="bg-royal px-4 py-16 text-royal-foreground sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Better together">Stack it. Save.</SectionTitle>
          <div className="no-scrollbar -mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 sm:mr-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pr-0">
            {bundles.map((bundle) => <div key={bundle.name} className="w-[84%] shrink-0 snap-start sm:w-auto"><ProductCard product={bundle} /></div>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="grid aspect-[4/3] place-items-center rounded-lg border border-line bg-surface text-center"><div><Users className="mx-auto h-12 w-12 text-primary" /><p className="mt-3 font-bold">Drew & Dorothy photo coming soon</p></div></div>
          <div><SectionTitle kicker="Our story">Made for real life.</SectionTitle><div className="space-y-2 text-lg leading-relaxed text-foreground/80"><p>We're Drew and Dorothy.</p><p>A Canadian family business.</p><p>We work with women 40+ every day.</p><p>Sleep. Energy. Strength. Hormones.</p><p>We built this line because we couldn't find clean products we'd hand our own family.</p><p>No fillers. No shortcuts.</p><p className="font-bold text-foreground">Just the stuff we use ourselves.</p></div></div>
        </div>
      </section>

      <section className="bg-secondary px-4 py-16 text-secondary-foreground sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Real customers">Words from our community.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {["Sharon MacDonald","Shauna Olsen","Debbie Rogers"].map((name) => <article key={name} className="rounded-lg bg-card p-5 text-card-foreground shadow-lg"><div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">{Array.from({length:5}).map((_,i) => <Star key={i} className="fill-current" />)}</div><p className="mt-5 text-muted-foreground">Review text coming soon.</p><p className="mt-6 font-display text-lg font-bold">{name}</p></article>)}
          </div>
          <a href="https://www.google.com/search?q=True+Form+Life+reviews" className="mt-7 inline-flex min-h-12 items-center gap-2 font-bold text-royal underline underline-offset-4">Read our Google reviews <ArrowRight /></a>
        </div>
      </section>

      <section className="bg-royal px-4 py-16 text-center text-royal-foreground sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl"><Brain className="mx-auto h-10 w-10 text-primary" /><h2 className="mt-4 text-3xl font-bold sm:text-5xl">Join other women 40+ in True Form's Ageless Energy</h2><Button asChild variant="accent" size="lg" className="mt-7 w-full sm:w-auto"><a href="https://www.facebook.com/groups/tfagelessenergy">Join the Ageless Energy group <ArrowRight /></a></Button><a href="https://go.trueformlife.com/digestion-tips" className="mx-auto mt-5 flex min-h-12 items-center justify-center font-bold underline underline-offset-4">Free ebook: Drew's top 10 tips to improve digestion</a></div>
      </section>

      <footer className="border-t border-line bg-background px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end"><div><img src={logoImage} alt="True Form Life" width={1024} height={102} loading="lazy" className="h-auto w-56" /><p className="mt-4 flex items-center gap-2 font-bold"><ShieldCheck className="text-primary" /> Proudly Canadian</p></div><nav aria-label="Footer" className="grid gap-1 text-lg"><a className="flex min-h-12 items-center hover:text-primary" href={shopLinks.shop}>Shop</a><a className="flex min-h-12 items-center hover:text-primary" href={shopLinks.shippingReturns}>Shipping & returns</a><a className="flex min-h-12 items-center hover:text-primary" href={shopLinks.contact}>Contact</a></nav></div>
      </footer>
    </main>
  );
}