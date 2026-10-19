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
        const regularFeed = money(item.prices.price_range?.min_amount ?? item.prices.regular_price)!;
        let sale: string | null = null;
        let regular: string | null = null;
        // Store API omits plugin-applied discounts; read the real prices from the product page.
        try {
          const pRes = await fetch(item.permalink, { headers });
          if (pRes.ok) {
            const ph = await pRes.text();
            const vm = ph.match(/data-product_variations="([^"]*)"/);
            if (vm) {
              const json = vm[1].replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&");
              const vars = JSON.parse(json) as { display_price: number; display_regular_price: number }[];
              const best = vars.sort((a, b) => a.display_price - b.display_price)[0];
              if (best) {
                sale = best.display_price.toFixed(2);
                regular = best.display_regular_price.toFixed(2);
              }
            } else {
              const del = ph.match(/<del[^>]*>[\s\S]*?([\d,]+\.\d{2})[\s\S]*?<\/del>\s*<ins[^>]*>[\s\S]*?([\d,]+\.\d{2})/);
              if (del) {
                regular = del[1].replace(/,/g, "");
                sale = del[2].replace(/,/g, "");
              }
            }
          }
        } catch (e) {
          console.error("Featured product page fetch failed", e);
        }
        if (!sale) {
          regular = regularFeed;
          sale = (Math.round(Number(regularFeed) * 80) / 100).toFixed(2);
        }
        featured = {
          slug,
          name: item.name.replace(/&#8217;/g, "’").replace(/&amp;/g, "&"),
          price: sale,
          regularPrice: regular && Number(regular) > Number(sale) ? regular : null,
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
