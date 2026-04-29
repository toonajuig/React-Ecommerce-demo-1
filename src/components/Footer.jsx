import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-4 border-t border-(--color-border) px-6 py-8 text-sm text-(--color-muted) lg:flex-row lg:items-center lg:justify-between lg:px-10">
      <p>Northstar template built with React + Tailwind.</p>

      <nav className="flex gap-5" aria-label="Footer">
        <Link to="/" className="transition hover:text-(--color-accent)">
          Home
        </Link>
        <Link to="/shop" className="transition hover:text-(--color-accent)">
          Shop
        </Link>
        <Link to="/cart" className="transition hover:text-(--color-accent)">
          Cart
        </Link>
      </nav>
    </footer>
  )
}

export default Footer

