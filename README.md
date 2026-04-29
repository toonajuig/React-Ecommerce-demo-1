# Northstar Ecommerce Template

React + Vite + Tailwind ecommerce starter that was built step by step from a blank template.

## What This Project Includes

- Home page with hero, collections, featured products, trust signals, and footer
- Shop page with search, category filters, and sorting
- Product detail page with size, color, quantity, and related products
- Cart page with shared state, quantity updates, and localStorage persistence
- Checkout page with mock customer, shipping, and order summary flow
- React Router based multi-page structure

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router DOM

## Project Structure

```text
src/
  components/   reusable UI building blocks
  context/      shared app state such as cart
  data/         mock storefront data
  layout/       route layout wrappers
  pages/        route-level screens
  sections/     large homepage / product page sections
```

## Getting Started

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Main Learning Milestones

1. Set up React + Tailwind and replace the Vite starter screen
2. Split the UI into components, sections, pages, and layout
3. Add routing for Home, Shop, Product Detail, Cart, and Checkout
4. Introduce shared cart state with React Context
5. Persist cart data with localStorage
6. Add shop interactions like search, filters, sorting, and related products

## Next Ideas

- Add form validation to checkout
- Replace mock product data with an API
- Add product images and gallery thumbnails
- Introduce authentication or saved wishlist
- Add tests for cart and checkout flows
# React-Ecommerce-demo-1
