import { createServerFn } from "@tanstack/react-start";

export type LiveFeatured = { slug: string; name: string; price: string; regularPrice: string | null; image: string | null; href: string };
export type LiveStore = { prices: Record<string, string>; featured: LiveFeatured | null };

const BASE = "https://trueformlife.com";
let cache: { at: number; data: LiveStore } | null = null;

const money = (cents: string | undefined) => (cents ? (Number(cents) / 100).toFixed(2) : null);

type StoreProduct = {
  slug: string;
  name: string;
  permalink: string;
  prices: { price: string; regular_price: string; price_range: { min_amount: string } | null };
  images: { src: string }[];
};

// Reads live prices and the monthly featured product (first item on /shop/) from the public WooCommerce store.
export const getLiveStore = createServerFn({ method: "GET" }).handler(async (): Promise<LiveStore> => {
  if (cache && Date.now() - cache.at < 10 * 60 * 1000) return cache.data;
  try {
    const headers = { "User-Agent": "Mozilla/5.0 TrueFormHome" };
    const [apiRes, shopRes] = await Promise.all([
      fetch(`${BASE}/wp-json/wc/store/v1/products?per_page=100`, { headers }),
      fetch(`${BASE}/shop/`, { headers }),
    ]);
    const list = apiRes.ok ? ((await apiRes.json()) as StoreProduct[]) : [];
    const prices: Record<string, string> = {};
    for (const item of list) {
      const p = money(item.prices.price_range?.min_amount ?? item.prices.price);
      if (p) prices[item.slug] = p;
    }

    let featured: LiveFeatured | null = null;
    if (shopRes.ok) {
      const html = await shopRes.text();
      const m = html.match(/<ul class="products[^"]*">\s*<li[^>]*>\s*<a href="[^"]*\/product\/([^/"]+)\/?"/);
      const slug = m?.[1];
      const item = slug ? list.find((x) => x.slug === slug) : undefined;
      if (slug && item) {
        const sale = money(item.prices.price_range?.min_amount ?? item.prices.price)!;
        const regular = money(item.prices.regular_price);
        featured = {
          slug,
          name: item.name.replace(/&#8217;/g, "’").replace(/&amp;/g, "&"),
          price: sale,
          regularPrice: regular && Number(regular) > Number(sale) ? regular : (Number(sale) / 0.8).toFixed(2),
          image: item.images[0]?.src ?? null,
          href: item.permalink,
        };
      }
    }
    const data = { prices, featured };
    if (list.length) cache = { at: Date.now(), data };
    return data;
  } catch (e) {
    console.error("Live store fetch failed", e);
    return { prices: {}, featured: null };
  }
});
