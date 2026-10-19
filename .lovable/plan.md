# Fix the featured product's 20%-off price

## What's wrong (confirmed)
This month's featured product is Spirulina. The store's product feed the homepage reads from reports the full price ($70.39), with no sale. The 20% discount is added later by a store plugin and only shows on the store's own product page ($56.31, regular $70.39). So the homepage shows the full price.

## Fix
- For the featured product only, read the real prices from its store product page (the size options listed there), the same prices a shopper sees at checkout.
- Show the lowest discounted price as "from $56.31" with the regular price "$70.39" crossed out next to it.
- If the product page can't be read, fall back to the regular price from the feed minus 20%, since the featured item is always 20% off.
- Keeps the 10-minute refresh, so when the featured product changes the price updates on its own.
- Other products stay as they are.

## Technical details
- In `src/lib/store.functions.ts`, after finding the featured slug, fetch `item.permalink`, parse the `data-product_variations` attribute (HTML-decode), and take the min `display_price` and its `display_regular_price`. Simple products: parse the `<ins>`/`<del>` price amounts.
- Fallback: `regular * 0.8`, rounded to cents.
- In `src/routes/index.tsx`, have the featured card show the struck-through `regularPrice` when present.
- Check in the browser that the featured card shows $56.31 and $70.39.
