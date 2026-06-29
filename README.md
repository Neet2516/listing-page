# StoreFront - Listing Page

Alightweight, clean, and highly professional vanilla HTML/CSS/JavaScript e-commerce store application. It features a modern, slate-themed, minimalist UI that lists products from a dummy catalog, displays individual product details, and handles full cart operations.

## Features

- **Product Listing Page (`index.html`)**: Fetches and displays a grid of items from the DummyJSON API with titles, prices, and clean detail/cart buttons.
- **Product Details Page (`details.html`)**: Shows descriptive information, images, pricing, ratings, and stock count for a single item.
- **Cart System (`cart.html`)**: Allows adding, removing, and reviewing items in the shopping cart. Automatically calculates the subtotal, taxes (10%), and the final purchase amount.
- **Persistent Cart State**: Cart state is automatically saved to and loaded from the browser's `localStorage` so items persist between page refreshes and navigation.
- **Slate UI Theme (`theme.css`)**: Styled with a professional, minimalist slate/charcoal theme (`#1e293b`). Responsive layout adapts perfectly to mobile, tablet, and desktop viewports.

## Directory Structure

```text
├── index.html       # Landing page containing the product grid
├── details.html     # Dedicated page displaying comprehensive product details
├── cart.html        # Interactive shopping cart and checkout overview
├── store.js         # JavaScript application logic (fetching, cart actions, state)
├── theme.css        # Slate-themed CSS styling rules
└── README.md        # Project documentation
```

## Setup & Running Locally

1. Clone or download the repository files.
2. Open [index.html](./index.html) in any modern web browser.
3. No build step or local server is required—the project relies entirely on client-side vanilla JavaScript and standard CSS.
