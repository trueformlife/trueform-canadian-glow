import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getRecommendations } from "@/lib/recommend.functions";
import { getLiveStore } from "@/lib/store.functions";
import {
  ArrowRight,
  Brain,
  ChevronDown,
  Dumbbell,
  HeartPulse,
  Leaf,
  Loader2,
  MapPin,
  Menu,
  Moon,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  TestTube2,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { moreLinks, shopLinks } from "@/config/shopLinks";
import heroImage from "@/assets/tfl-hero.jpg";
import drewDorothyImage from "@/assets/drew-dorothy.jpg.asset.json";
import logoImage from "@/assets/tfl-logo.png";
import charcoalImage from "@/assets/product-images/activated-charcoal.png.asset.json";
import bathFlakesImage from "@/assets/product-images/bath-flakes.png.asset.json";
import brainFuelImage from "@/assets/product-images/brain-fuel.png.asset.json";
import chlorellaImage from "@/assets/product-images/chlorella.png.asset.json";
import collagenImage from "@/assets/product-images/collagen.jpg.asset.json";
import completeTruthImage from "@/assets/product-images/complete-truth-protein.png.asset.json";
import creatineImage from "@/assets/product-images/creatine.png.asset.json";
import liquidMagImage from "@/assets/product-images/liquid-mag.png.asset.json";
import macaImage from "@/assets/product-images/maca.png.asset.json";
import magSprayImage from "@/assets/product-images/mag-spray.png.asset.json";
import magteinImage from "@/assets/product-images/magtein.jpg.asset.json";
import spirulinaImage from "@/assets/product-images/spirulina.jpg.asset.json";
import turmericImage from "@/assets/product-images/turmeric.png.asset.json";
import vanillaProteinImage from "@/assets/product-images/vanilla-protein.png.asset.json";
import pumpkinBookImage from "@/assets/pumpkin-recipes-3d-book-cropped.png";

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
  loader: () => getLiveStore(),
  component: Index,
});

type Product = { name: string; price: string; why: string; href: string; badge?: "New" | "Save"; image?: { url: string } | undefined };
type Goal = { id: string; title: string; productIds: string[]; icon: typeof Moon };

const p = shopLinks.products;
const products: Record<string, Product> = {
  liquidMag: { name: "Liquid Mag", price: "37.94", why: "Fast, easy magnesium support.", href: p.liquidMag, image: liquidMagImage },
  magSpray: { name: "Mag Spray", price: "32.99", why: "Magnesium spray for sleep and tired legs.", href: p.magSpray, image: magSprayImage },
  magtein: { name: "Magtein", price: "65.99", why: "Magnesium for focus and calm.", href: p.magtein, image: magteinImage },
  bathFlakes: { name: "Bath Flakes", price: "21.99", why: "A simple soak for tired muscles.", href: p.bathFlakes, image: bathFlakesImage },
  spirulina: { name: "Spirulina", price: "26.39", why: "Clean greens for everyday energy.", href: p.spirulina, image: spirulinaImage },
  chlorella: { name: "Chlorella", price: "26.39", why: "Whole-food greens and detox support.", href: p.chlorella, image: chlorellaImage },
  brainFuel: { name: "Brain Fuel MCT Oil", price: "31.99", why: "Clean fuel for steady focus.", href: p.brainFuel, image: brainFuelImage },
  creatine: { name: "Creatine Monohydrate", price: "49.99", why: "Daily support for strength and muscle.", href: p.creatine, image: creatineImage },
  vanillaProtein: { name: "Vanilla Protein", price: "40.69", why: "Easy protein without the fillers.", href: p.vanillaProtein, image: vanillaProteinImage },
  completeTruth: { name: "Complete Truth Protein", price: "36.29", why: "Real-food protein in every scoop.", href: p.completeTruthProtein, image: completeTruthImage },
  turmeric: { name: "Joint Strength: Platinum Turmeric", price: "49.95", why: "Targeted support for active joints.", href: p.turmeric, badge: "New", image: turmericImage },
  collagen: { name: "Organic Collagen Peptides", price: "69.99", why: "Supports skin, joints and strong tissue.", href: p.collagen, image: collagenImage },
  maca: { name: "Maca", price: "19.99", why: "Plant-based hormone and energy support.", href: p.maca, image: macaImage },
  charcoal: { name: "Activated Charcoal", price: "49.49", why: "Simple digestive support when needed.", href: p.charcoal, image: charcoalImage },
};

const bestSellers = ["liquidMag", "turmeric", "vanillaProtein"];
const goals: [Goal, ...Goal[]] = [
  { id: "sleep", title: "Sleep & stress", productIds: ["liquidMag", "magSpray", "bathFlakes", "magtein"], icon: Moon },
  { id: "energy", title: "Energy & focus", productIds: ["spirulina", "brainFuel", "magtein"], icon: Brain },
  { id: "strength", title: "Strength & muscle", productIds: ["creatine", "vanillaProtein", "completeTruth"], icon: Dumbbell },
  { id: "joints", title: "Joints & skin", productIds: ["turmeric", "collagen"], icon: Sparkles },
  { id: "gut", title: "Gut & detox", productIds: ["chlorella", "charcoal"], icon: Leaf },
  { id: "hormone", title: "Hormone support", productIds: ["maca", "liquidMag"], icon: HeartPulse },
];

function ProductVisual({ name, image, compact = false }: { name: string; image: { url: string } | undefined; compact?: boolean }) {
  return (
    <div className="relative grid aspect-square place-items-center overflow-hidden bg-card" aria-hidden="true">
      {image ? (
        <img src={image.url} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-contain ${compact ? "p-4" : "p-5"}`} />
      ) : (
        <div className="relative h-32 w-20 rounded-md border-2 border-primary/35 bg-secondary shadow-lg">
          <div className="h-5 rounded-t bg-primary" />
          <div className="mx-auto mt-4 h-1.5 w-8 rounded bg-accent" />
          <div className="mx-auto mt-2 h-1 w-10 rounded bg-royal/30" />
          <div className="mx-auto mt-1 h-1 w-7 rounded bg-royal/20" />
        </div>
      )}
    </div>
  );
}

const LivePrices = createContext<Record<string, string>>({});
const slugOf = (href: string) => href.match(/\/product\/([^/?#]+)/)?.[1] ?? "";

function ProductCard({ product: base, compact = false }: { product: Product | undefined; compact?: boolean }) {
  const livePrices = useContext(LivePrices);
  if (!base) return null;
  const product = { ...base, price: livePrices[slugOf(base.href)] ?? base.price };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-xl">
      <ProductVisual name={product.name} image={product.image} compact={compact} />
      <div className="flex flex-1 flex-col p-4">
        {product.badge && <span className="mb-2 w-fit rounded bg-accent px-2.5 py-1 text-sm font-bold text-accent-foreground">{product.badge}</span>}
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

function AiPicks({ goalTitle }: { goalTitle: string }) {
  const fetchPicks = useServerFn(getRecommendations);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picks, setPicks] = useState<{ id: string; reason: string }[] | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPicks({ data: { goal: goalTitle, note } });
      if (res.error) setError(res.error);
      else setPicks(res.picks);
    } catch {
      setError("We couldn't get personal picks right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-lg border-2 border-line bg-surface p-5 sm:p-6">
      <p className="flex items-center gap-2 font-bold uppercase text-primary"><Sparkles className="h-5 w-5 text-accent" /> Personal picks</p>
      <h3 className="mt-1 text-2xl font-bold">Tell us a bit more about {goalTitle.toLowerCase()}.</h3>
      <p className="mt-2 text-foreground/80">Our AI helper picks the best fit from our line. Optional.</p>
      <form className="mt-4 grid gap-3 sm:flex" onSubmit={(e) => { e.preventDefault(); void ask(); }}>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 300))}
          placeholder="e.g. I wake up at 3am and feel wired"
          aria-label="Tell us more about your goal"
          className="h-12 w-full flex-1 rounded-lg border-2 border-line bg-card px-4 text-base text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? <><Loader2 className="animate-spin" /> Finding picks…</> : <>Get my picks <ArrowRight /></>}
        </Button>
      </form>
      {error && <p role="alert" className="mt-4 text-accent">{error}</p>}
      {picks && picks.length === 0 && !error && <p className="mt-4 text-foreground/80">No personal picks this time. The picks above are a great place to start.</p>}
      {picks && picks.length > 0 && (
        <div className="mt-6 grid animate-in fade-in slide-in-from-bottom-3 gap-4 duration-300 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick) => {
            const product = products[pick.id];
            return product ? <ProductCard key={pick.id} product={{ ...product, why: pick.reason }} compact /> : null;
          })}
        </div>
      )}
    </div>
  );
}

function Index() {
  const live = Route.useLoaderData();
  const featuredMatch = live.featured ? Object.values(products).find((x) => slugOf(x.href) === live.featured!.slug) : undefined;
  const featuredProduct: Product | null = live.featured
    ? { name: featuredMatch?.name ?? live.featured.name, why: featuredMatch?.why ?? "This month's pick, 20% off.", price: live.featured.price, href: featuredMatch?.href ?? live.featured.href, image: featuredMatch?.image ?? (live.featured.image ? { url: live.featured.image } : undefined) }
    : null;
  const [query, setQuery] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState(goals[0].id);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const searching = normalizedQuery.length > 0;
  const selectedGoal = goals.find((goal) => goal.id === selectedGoalId) ?? goals[0];
  const searchResults = Object.entries(products)
    .filter(([, product]) => product.name.toLowerCase().includes(normalizedQuery) || product.why.toLowerCase().includes(normalizedQuery))
    .map(([id]) => id);

  const hasScrolledToResults = useRef(false);
  useEffect(() => {
    if (!searching) {
      hasScrolledToResults.current = false;
      return;
    }
    if (hasScrolledToResults.current) return;
    hasScrolledToResults.current = true;

    requestAnimationFrame(() => {
      document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [searching]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) setMoreOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <LivePrices.Provider value={live.prices}>
    <main className="overflow-hidden bg-background text-foreground">
      <div className="bg-surface-strong px-3 py-2 text-center text-sm font-semibold sm:text-base">
        Free shipping across Canada on orders over <strong className="text-accent">$200</strong>. Canadian owned.
      </div>
      <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6">
          <img src={logoImage} alt="True Form Life" width={512} height={438} className="h-9 w-auto shrink-0 sm:h-14" />
          <div className="relative hidden min-w-0 flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="h-12 w-full rounded-lg border-2 border-line bg-card pl-10 pr-3 text-base text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <Button
            variant="outline"
            aria-expanded={mobileSearchOpen}
            aria-label="Search products"
            onClick={() =>
              setMobileSearchOpen((open) => {
                if (open) setQuery("");
                return !open;
              })
            }
            className={`h-10 w-10 shrink-0 px-0 sm:hidden ${searching ? "border-primary text-primary" : ""}`}
          >
            <Search />
          </Button>
          <Button asChild variant="outline" className="h-10 w-10 shrink-0 px-0 sm:h-12 sm:w-auto sm:px-4">
            <a href={shopLinks.account} aria-label="My Account">
              <UserRound />
              <span className="hidden sm:inline">My Account</span>
            </a>
          </Button>
          <Button asChild className="h-10 shrink-0 px-3 sm:h-12 sm:px-5"><a href={shopLinks.cart} aria-label="Cart"><ShoppingCart /><span className="hidden sm:inline">Cart</span></a></Button>
          <Button asChild className="h-10 shrink-0 px-3 sm:h-12 sm:px-5"><a href={shopLinks.shop}>Shop</a></Button>
          <div className="relative shrink-0" ref={moreRef}>
            <Button
              variant="outline"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              aria-label="More links"
              onClick={() => setMoreOpen((open) => !open)}
              className="h-10 w-10 px-0 sm:h-12 sm:w-auto sm:px-4"
            >
              <Menu />
              <span className="hidden sm:inline">More</span>
              <ChevronDown className={`hidden transition-transform sm:inline ${moreOpen ? "rotate-180" : ""}`} />
            </Button>
            {moreOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 max-h-[75vh] w-[min(86vw,44rem)] overflow-y-auto rounded-lg border border-line bg-card p-5 text-card-foreground shadow-xl">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                  {moreLinks.map((group) => (
                    <div key={group.title}>
                      <p className="text-sm font-bold uppercase tracking-wide text-primary">{group.title}</p>
                      <ul className="mt-2 grid gap-0.5">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <a href={link.href} onClick={() => setMoreOpen(false)} className="flex min-h-10 items-center text-[15px] text-card-foreground/85 hover:text-primary">{link.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
          {mobileSearchOpen && (
            <div className="border-t border-line bg-background px-4 py-3 sm:hidden">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products…"
                  aria-label="Search products"
                  className="h-12 w-full rounded-lg border-2 border-line bg-card pl-10 pr-3 text-base text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          )}
        </header>

      <section aria-label="Why True Form Life" className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {[[MapPin,"Canadian owned"],[PackageCheck,"Ships coast to coast"],[TestTube2,"Clean ingredients, no fillers"],[Star,"Real Google reviews"]].map(([Icon,label]) => {
            const TrustIcon = Icon as typeof MapPin;
            return <div key={label as string} className="flex min-h-28 flex-col items-center justify-center gap-2 bg-surface px-3 text-center"><TrustIcon className={label === "Real Google reviews" ? "fill-current text-accent" : "text-primary"} /><span className="text-sm font-bold sm:text-base">{label as string}</span></div>;
          })}
        </div>
      </section>


      <section className="relative min-h-[calc(100svh-104px)] sm:min-h-[680px]">
        <img src={heroImage} alt="Confident active woman enjoying the Canadian outdoors" width={1280} height={960} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[68%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_92%,transparent)_46%,color-mix(in_oklab,var(--background)_15%,transparent)_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-104px)] max-w-7xl items-center px-4 py-8 sm:min-h-[680px] sm:px-6">
          <div className="max-w-xl">
            <p className="mb-3 font-bold text-primary">CANADIAN OWNED · WOMEN 40+</p>
            <h1 className="text-4xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">Built for women <span className="text-accent">40+</span>.<br /><span className="text-primary">Energy. Sleep. Strength.</span></h1>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-foreground/85 sm:text-xl">Clean supplements from a Canadian family business. No fillers. No junk. Just what works, shipped anywhere in Canada.</p>
            <div className="mt-6 grid gap-3 sm:flex">
              <Button asChild size="lg" className="w-full sm:w-auto"><a href={shopLinks.shop}>Shop all <ArrowRight /></a></Button>
              <Button size="lg" variant="outline" className="w-full border-foreground/50 bg-background/70 text-foreground sm:w-auto" onClick={() => document.getElementById("find-your-fit")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Find your fit</Button>
            </div>
          </div>
        </div>
      </section>


      <section id="find-your-fit" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Find your fit">Where do you want to start?</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {goals.map((goal) => {
              const GoalIcon = goal.icon;
              const selected = goal.id === selectedGoal.id;
              return (
                <Button
                  key={goal.id}
                  type="button"
                  variant="outline"
                  aria-pressed={selected}
                  onClick={() => setSelectedGoalId(goal.id)}
                  className={`h-28 w-full flex-col gap-2 border-2 px-2 text-center text-base font-bold ${selected ? "border-accent bg-card text-card-foreground shadow-accent" : "border-line bg-surface text-foreground"}`}
                >
                  <GoalIcon className={selected ? "text-accent" : "text-primary"} />
                  <span>{goal.title}</span>
                </Button>
              );
            })}
          </div>
          <div key={selectedGoal.id} className="mt-7 grid animate-in fade-in slide-in-from-bottom-3 gap-4 duration-300 sm:grid-cols-2 lg:grid-cols-3">
            {selectedGoal.productIds.map((id) => <ProductCard key={id} product={products[id]} compact />)}
          </div>
          <AiPicks key={`ai-${selectedGoal.id}`} goalTitle={selectedGoal.title} />
        </div>
      </section>


      {searching && (
        <section id="search-results" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker="Find your fit">Search results</SectionTitle>
            <div className="mt-7 grid animate-in fade-in slide-in-from-bottom-3 gap-4 duration-300 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.length > 0 ? searchResults.map((id) => <ProductCard key={id} product={products[id]} compact />) : <p className="col-span-full py-6 text-center text-lg text-muted-foreground">No products found for “{query}”. Try another search.</p>}
            </div>
          </div>
        </section>
      )}

      {featuredProduct && (
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker="Featured this month">20% off {featuredProduct.name}</SectionTitle>
            <div className="mx-auto max-w-md sm:max-w-sm">
              <ProductCard product={{ ...featuredProduct, badge: "Save" }} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-secondary px-4 py-16 text-secondary-foreground sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Most loved">Best sellers</SectionTitle>
          <div className="no-scrollbar -mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 sm:mr-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pr-0">
            {bestSellers.map((id) => <div key={id} className="w-[84%] shrink-0 snap-start sm:w-auto"><ProductCard product={products[id]} /></div>)}
          </div>
        </div>
      </section>


      <section className="bg-secondary px-4 py-16 text-secondary-foreground sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Real customers">Words from our community.</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Sharon MacDonald","Drew and team are amazing! Best customer service ever! I never go a day without my liquid mag! And always have protein, collagen, charcoal, mag butter, magtein on hand, and pretty much use daily… especially love the bath flakes. It’s so refreshing to know that everything I get from TrueForm Life is clean and good, no additives or fillers, nothing that’s untrustworthy. The homework is done for me! Love it."],
              ["Yvonne Cheng","The magnesium flakes are my favourite! Quality is exceptional, all the other drug store \"Epsom salts\" don't even compare. I appreciate that they're a local brand and that the formulations are of the highest quality that I can trust."],
              ["Moira Schrader","Once again, the product arrived within days, and it was all wrapped individually with bubble wrap and included a beautiful card that said how happy they were for my support. I love that they’re local, and the product is such great quality. I’m very much enjoying the Liquid magnesium and I know I’m going to love this mango, which is new to me!!"],
            ].map(([name, text]) => <article key={name} className="flex flex-col rounded-lg bg-card p-5 text-card-foreground shadow-lg"><div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">{Array.from({length:5}).map((_,i) => <Star key={i} className="fill-current" />)}</div><p className="mt-5 text-muted-foreground">“{text}”</p><p className="mt-auto pt-6 font-display text-lg font-bold">{name}</p><p className="text-sm text-muted-foreground">Google review</p></article>)}
          </div>
          <a href="https://www.google.com/maps/place/True+Form+Life/@42.8121133,-91.93059,4z/data=!4m8!3m7!1s0x4ca72317f225571f:0x34588989bc04f8be!8m2!3d42.8121133!4d-91.93059!9m1!1b1!16s%2Fg%2F11j1hwc5dn" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 font-bold text-royal underline underline-offset-4">Read our Google reviews <ArrowRight /></a>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <img src={drewDorothyImage.url} alt="Drew and Dorothy with their kids outdoors" loading="lazy" className="aspect-[4/3] w-full rounded-lg border border-line object-cover" />
          <div><SectionTitle kicker="Our story">Made for real life.</SectionTitle><div className="space-y-2 text-lg leading-relaxed text-foreground/80"><p>We're Drew and Dorothy.</p><p>A Canadian family business.</p><p>We work with women 40+ every day.</p><p>Sleep. Energy. Strength. Hormones.</p><p>We built this line because we couldn't find clean products we'd hand our own family.</p><p>No fillers. No shortcuts.</p><p className="font-bold text-foreground">Just the stuff we use ourselves.</p></div></div>
        </div>
      </section>

      <section className="bg-royal px-4 py-16 text-center text-royal-foreground sm:px-6 sm:py-20">

        <div className="mx-auto max-w-3xl"><Brain className="mx-auto h-10 w-10 text-primary" /><h2 className="mt-4 text-3xl font-bold sm:text-5xl">Join other women 40+ in True Form's Ageless Energy</h2><Button asChild variant="accent" size="lg" className="mt-7 w-full sm:w-auto"><a href="https://www.facebook.com/groups/tfagelessenergy">Join the Ageless Energy group <ArrowRight /></a></Button><a href="https://go.trueformlife.com/pumpkin-recipes-ebook" className="mx-auto mt-5 flex min-h-12 items-center justify-center font-bold underline underline-offset-4">Free ebook: 10 Quick Healthy Pumpkin Recipes</a><a href="https://go.trueformlife.com/pumpkin-recipes-ebook" aria-label="Free ebook: 10 Quick Healthy Pumpkin Recipes" className="mx-auto mt-3 block w-fit max-w-full"><img src={pumpkinBookImage} alt="10 Quick Healthy Pumpkin Recipes ebook" loading="lazy" className="w-[19rem] max-w-full sm:w-96" /></a></div>
      </section>

      <footer className="border-t border-line bg-background px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end"><div><img src={logoImage} alt="True Form Life" width={1024} height={102} loading="lazy" className="h-auto w-56" /><p className="mt-4 flex items-center gap-2 font-bold"><ShieldCheck className="text-primary" /> Proudly Canadian</p></div><nav aria-label="Footer" className="grid gap-1 text-lg"><a className="flex min-h-12 items-center hover:text-primary" href={shopLinks.shop}>Shop</a><a className="flex min-h-12 items-center hover:text-primary" href={shopLinks.shippingReturns}>Shipping & returns</a><a className="flex min-h-12 items-center hover:text-primary" href={shopLinks.contact}>Contact</a><a className="flex min-h-12 items-center hover:text-primary" href="https://us.trueformlife.com/">Visit our US website</a></nav></div>
          <div className="mt-10 border-t border-line pt-8">
            <p className="text-sm font-bold uppercase tracking-wide text-primary">More from True Form</p>
            <div className="mt-2 sm:hidden">
              {moreLinks.map((group) => (
                <details key={group.title} className="group border-b border-line">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-bold [&::-webkit-details-marker]:hidden">
                    {group.title}
                    <ChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="grid gap-0.5 pb-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="flex min-h-11 items-center text-foreground/85">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
            <div className="mt-4 hidden gap-8 sm:grid sm:grid-cols-3 lg:grid-cols-5">
              {moreLinks.map((group) => (
                <div key={group.title}>
                  <p className="font-bold">{group.title}</p>
                  <ul className="mt-2 grid gap-0.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="flex min-h-9 items-center text-foreground/85 hover:text-primary">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
    </LivePrices.Provider>
  );
}