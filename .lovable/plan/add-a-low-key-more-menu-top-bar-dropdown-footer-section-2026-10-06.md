# Add a low-key "More" menu (top bar dropdown + footer section)

All links were pulled from the live trueformlife.com menu, so they use the real addresses.

## 1. Link config — `src/config/shopLinks.ts`

Add a `more` export with all links grouped, built with `storeUrl()`:

```text
Help & partners
  Contact us                    /contact/
  Register as brand partner     /new-distributor/
  Find a brand partner          /distributors/

Community
  MAP                           https://trueformlife.com/map
  MRM                           https://www.skool.com/true-form-community

Podcast
  All shows                     http://podcast.trueformlife.com
  Ageless Energy                http://podcast.trueformlife.com
  Exploring Mind & Body         https://exploringmindandbody.com/
  Morning Show                  /category/morningshow/
  Transformations Through Running  /category/transformations-through-running-podcast/

Blog
  Search the blog               /blog-search/
  Drew's Blog                   /category/drews-blog/
  Stress/Detox                  /category/stress/
  Workouts                      /category/workouts/
  Business posts                /category/business-posts/
  Dorothy's posts               /category/dorothy-keiths-posts/

Recipes
  All recipes                   /category/recipes/
  Breakfast                     /category/breakfast-recipes/
  Lunch – Supper                /category/supper-recipes/
  Smoothies                     /tag/smoothie/
  Baking                        /category/recipes/baking/
  Snacks                        /category/snack-recipes/
```

All open in the same tab, matching the rest of the site.

## 2. Top bar — subtle "More" dropdown (`src/routes/index.tsx`)

- Ghost/outline "More ▾" button after Shop (icon-only `Menu`/`ChevronDown` on phones, "More" text on larger screens).
- Tapping opens a small dropdown panel grouped into the four headings above, styled to match the site (card background, navy text, no bright colors — this menu stays quiet).
- Closes on outside tap, Escape, or link click. Doesn't steal attention from search, Cart, or Shop.

## 3. Footer — "More from True Form" section

- New grouped links section in the footer, above or beside the current links.
- Mobile: collapsible groups (tap "Podcast", "Blog", "Recipes" to expand) so it stays compact.
- Desktop (sm+): neat columns — Help & partners · Community · Podcast · Blog · Recipes.
- Existing footer links (Shop, Shipping & returns, Contact, US website, Proudly Canadian) stay as they are; "Contact" can point at the same config entry.

## 4. Verify

- Check the dropdown open/close and footer accordions on a 375px viewport and desktop with Playwright.
- Confirm build log is clean.
