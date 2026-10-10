# True Form Home

Replace this page with a new HOME PAGE for True Form Life, a Canadian supplement brand for women 40+. Keep the existing TFL logo, fonts (Outfit headings, Figtree body), rounded card style and overall feel of this project, but update the blues as follows. Blue must be prominent, matching our current site trueformlife.com: every button sky blue #38B6FF; the bundles section and community band as full-width royal blue #1D48A2 bands; the sticky top bar navy #0F172A; page background deep navy. Use the logo's pinkish red #FD277C as the accent colour (it's the "L" in our logo): highlight "$200" in the announcement bar, "Save" and "New" badges on product and bundle cards, the outline and glow on the selected goal card, the review stars, and the "Join the Ageless Energy group" button so it stands out on the royal blue band. Keep it to accents; blue stays dominant.

This site does NOT handle checkout. Every Shop/Buy button links out to our WooCommerce store. Put all store links in ONE config file (src/config/shopLinks.ts) with a single STORE_BASE_URL constant, currently "https://trueformlife.com", so we can change the domain later in one place. Open store links in the same tab.

Audience and tone: women 40+ who want more energy, better sleep and strength. Warm, direct, short sentences. No hype. Never use the words "journey", "transformation", "midlife" or "broken". Prices in CAD.

SECTIONS, in order:

1. Thin announcement bar: "Free shipping across Canada on orders over $200. Canadian owned." Under it, a sticky top bar that stays visible on scroll: TFL logo left, blue "Shop" button right.

2. Hero: headline "Built for women 40+. Energy. Sleep. Strength." Subline: "Clean supplements from a Canadian family business. No fillers. No junk. Just what works, shipped anywhere in Canada." Two buttons: "Shop all" (STORE_BASE_URL + /shop/) and "Find your fit" (smooth-scrolls to section 4). Lifestyle image of a confident woman in her 40s–50s.

3. Trust strip with 4 icons: Canadian owned · Ships coast to coast · Clean ingredients, no fillers · Real Google reviews.

4. Interactive "Where do you want to start?" section. Six goal cards: Sleep & stress, Energy & focus, Strength & muscle, Joints & skin, Gut & detox, Hormone support. Tapping a card animates in 2–3 matching product cards (image, name, CAD price, one-line why, Buy button). Mapping:

   - Sleep & stress: Liquid Mag, Bath Flakes, Magtein

   - Energy & focus: Spirulina, Brain Fuel MCT Oil, Magtein

   - Strength & muscle: Creatine, Vanilla Protein, Complete Truth Protein

   - Joints & skin: Platinum Turmeric, Organic Collagen Peptides

   - Gut & detox: Chlorella, Activated Charcoal

   - Hormone support: Maca, Liquid Mag

5. "Best sellers" grid of 6: Liquid Mag, Organic Collagen Peptides, Platinum Turmeric, Creatine, Bath Flakes, Vanilla Protein.

6. "Stack it. Save." bundles row: Ultimate Wellness Bundle, Glow From Within Bundle, Liquid Mag Promo Bundle.

7. "Our story" block with a photo placeholder for Drew and Dorothy, and this text as short separate lines: "We're Drew and Dorothy. A Canadian family business. We work with women 40+ every day. Sleep. Energy. Strength. Hormones. We built this line because we couldn't find clean products we'd hand our own family. No fillers. No shortcuts. Just the stuff we use ourselves."

8. Reviews: 3 review cards with 5 stars, names Sharon MacDonald, Shauna Olsen and Debbie Rogers (I'll paste their text), plus a "Read our Google reviews" link.

9. Community band: "Join other women 40+ in True Form's Ageless Energy" with a button to https://www.facebook.com/groups/tfagelessenergy, and a secondary link "Free ebook: Drew's top 10 tips to improve digestion" to https://go.trueformlife.com/digestion-tips

10. Footer: Shop, Shipping & returns (STORE_BASE_URL + /return-refund-policy), Contact (STORE_BASE_URL + /contact/), and "Proudly Canadian".

Products (name | CAD price | path on the store). Most products have flavour or size options, so show every price as "from $X":

Liquid Mag | 37.94 | /product/liquid-mag/

Magtein | 65.99 | /product/magtein/

Bath Flakes | 21.99 | /product/bath-flakes/

Spirulina | 26.39 | /product/spirulina/

Chlorella | 26.39 | /product/chlorella/

Brain Fuel MCT Oil | 31.99 | /product/brain-fuel-pure-c8-mct-oil/

Creatine Monohydrate | 49.99 | /product/creatine/

Vanilla Protein | 40.69 | /product/protein-powder/

Complete Truth Protein | 36.29 | /product/ctp/

Joint Strength: Platinum Turmeric | 49.95 | /product/joint-strength-platinum-turmeric/

Organic Collagen Peptides | 69.99 | /product/collagen/

Maca | 19.99 | /product/maca/

Activated Charcoal | 49.49 | /product/activated-charcoal/

Ultimate Wellness Bundle | 160.00 | /product/ultimate-wellness-bundle/

Glow From Within Bundle | 105.99 | /product/glow-from-within-bundle/

Liquid Mag Promo Bundle | 35.19 | /product/liquid-mag-promo/

Use placeholder product images for now; I'll upload real ones.

MOBILE FIRST. This is the most important rule: most of our customers order on their phones. Design for a 375px-wide phone first, then scale up to desktop. On a phone, the hero headline, subline and Shop button must all show on the first screen without scrolling. Body text at least 17px. Every button at least 48px tall and full-width on mobile. Goal cards in a 2x3 grid. Best sellers and bundles as horizontal swipe carousels with the next card peeking in. Compress and lazy-load all images. No hover-only effects. Add the Meta Pixel placeholder in index.html so I can paste our pixel ID.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://trueform-canadian-glow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c23c9c77-42d5-401a-8b33-ba4328ba79f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
