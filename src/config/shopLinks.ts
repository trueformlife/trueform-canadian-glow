export const STORE_BASE_URL = "https://trueformlife.com";

const storeUrl = (path: string) => `${STORE_BASE_URL}${path}`;

export const shopLinks = {
  shop: storeUrl("/shop/"),
  account: storeUrl("/my-account/"),
  shippingReturns: storeUrl("/return-refund-policy"),
  contact: storeUrl("/contact/"),
  products: {
    liquidMag: storeUrl("/product/liquid-mag/"),
    magSpray: storeUrl("/product/mag-spray-x2/"),
    magtein: storeUrl("/product/magtein/"),
    bathFlakes: storeUrl("/product/bath-flakes/"),
    spirulina: storeUrl("/product/spirulina/"),
    chlorella: storeUrl("/product/chlorella/"),
    brainFuel: storeUrl("/product/brain-fuel-pure-c8-mct-oil/"),
    creatine: storeUrl("/product/creatine/"),
    vanillaProtein: storeUrl("/product/protein-powder/"),
    completeTruthProtein: storeUrl("/product/ctp/"),
    turmeric: storeUrl("/product/joint-strength-platinum-turmeric/"),
    collagen: storeUrl("/product/collagen/"),
    maca: storeUrl("/product/maca/"),
    charcoal: storeUrl("/product/activated-charcoal/"),
    ultimateBundle: storeUrl("/product/ultimate-wellness-bundle/"),
    glowBundle: storeUrl("/product/glow-from-within-bundle/"),
    liquidMagBundle: storeUrl("/product/liquid-mag-promo/"),
  },
} as const;