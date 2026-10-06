# Add a Cart button to the top bar

Link to the WooCommerce cart page: https://trueformlife.com/cart/

## Changes

1. `src/config/shopLinks.ts`
   - Add `cart: storeUrl("/cart/")` to the `shopLinks` object so the cart URL lives with every other store link (single place to update if the domain ever changes).

2. `src/routes/index.tsx` — sticky top bar
   - Add a Cart button between the My Account button and the Shop button.
   - Sky-blue (#38B6FF) style matching the existing Shop button, with a cart icon.
   - On phones (375px): icon-only, 48px tall, so the logo, search, account, cart, and Shop still fit in one row.
   - On larger screens: "Cart" label shows next to the icon (same pattern as My Account).
   - Opens in the same tab, like all other store links.

## Verification

- Check the build log for errors.
- Screenshot the header at 375px and 1280px to confirm everything fits without wrapping or squeezing the search bar.
