# Add an account link to the top bar

## Recommendation
Use **My Account**. It is short, familiar, and works for both shoppers signing in and returning customers managing their account.

Other good options:
- **Account** — shortest option, useful if space is tight on phones.
- **Sign In** — clearest for signed-out visitors, but less accurate once someone is already signed in.
- **Customer Login** — explicit, though more formal.
- **My TFL** — warmer and branded, but less immediately obvious.

Avoid **Log In/My Account** because the slash makes the label longer and harder to scan.

## Changes
- Add the WooCommerce account URL (`https://trueformlife.com/my-account/`) to the existing centralized store-links configuration.
- Add a **My Account** action in the sticky top bar beside the Shop button.
- Use an account icon with accessible text and keep the link in the same tab.
- Preserve the product search and make all top-bar controls fit cleanly on small phones without overlap.

## Verification
- Check the top bar at 375px and desktop widths.
- Confirm the account link opens the supplied WooCommerce page and the Shop and search controls still work.
