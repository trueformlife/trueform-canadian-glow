# Remove the "Search the full store" link from search results

- In the search dropdown under the top bar, delete the bottom link "Search the full store for “X” →".
- Keep the live product matches (photo, name, price) and the "No products found" message.
- Nothing else on the page changes.

## Technical details
- `src/routes/index.tsx`, `SearchDropdown`: remove the `<a href={storeSearch}>` block and the unused `storeSearch` variable.
