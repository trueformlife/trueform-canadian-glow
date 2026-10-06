export const STORE_BASE_URL = "https://trueformlife.com";

const storeUrl = (path: string) => `${STORE_BASE_URL}${path}`;

export const shopLinks = {
  shop: storeUrl("/shop/"),
  cart: storeUrl("/cart/"),
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

export type MoreLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

export const moreLinks: MoreLinkGroup[] = [
  {
    title: "Help & partners",
    links: [
      { label: "Contact us", href: storeUrl("/contact/") },
      { label: "Register as brand partner", href: storeUrl("/new-distributor/") },
      { label: "Find a brand partner", href: storeUrl("/distributors/") },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "MAP", href: "https://trueformlife.com/map" },
      { label: "MRM", href: "https://www.skool.com/true-form-community" },
    ],
  },
  {
    title: "Podcast",
    links: [
      { label: "All shows", href: "http://podcast.trueformlife.com" },
      { label: "Ageless Energy", href: "http://podcast.trueformlife.com" },
      { label: "Exploring Mind & Body", href: "https://exploringmindandbody.com/" },
      { label: "Morning Show", href: storeUrl("/category/morningshow/") },
      { label: "Transformations Through Running", href: storeUrl("/category/transformations-through-running-podcast/") },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "Search the blog", href: storeUrl("/blog-search/") },
      { label: "Drew's Blog", href: storeUrl("/category/drews-blog/") },
      { label: "Stress/Detox", href: storeUrl("/category/stress/") },
      { label: "Workouts", href: storeUrl("/category/workouts/") },
      { label: "Business posts", href: storeUrl("/category/business-posts/") },
      { label: "Dorothy's posts", href: storeUrl("/category/dorothy-keiths-posts/") },
    ],
  },
  {
    title: "Recipes",
    links: [
      { label: "All recipes", href: storeUrl("/category/recipes/") },
      { label: "Breakfast", href: storeUrl("/category/breakfast-recipes/") },
      { label: "Lunch – Supper", href: storeUrl("/category/supper-recipes/") },
      { label: "Smoothies", href: storeUrl("/tag/smoothie/") },
      { label: "Baking", href: storeUrl("/category/recipes/baking/") },
      { label: "Snacks", href: storeUrl("/category/snack-recipes/") },
    ],
  },
];