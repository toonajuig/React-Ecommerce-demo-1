import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/useCart'

const navLinkClass = ({ isActive }) =>
  `transition hover:text-(--color-accent) ${isActive ? 'text-(--color-accent)' : ''}`

const mobileNavLinkClass = ({ isActive }) =>
  `rounded-soft px-4 py-3 text-sm font-semibold transition hover:bg-(--color-panel) hover:text-(--color-accent) ${
    isActive ? 'bg-(--color-panel) text-(--color-accent)' : ''
  }`

function Navbar() {
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="px-6 py-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="tracking-brand font-heading text-2xl font-semibold">
          NORTHSTAR
        </Link>

        <nav className="hidden gap-8 text-sm font-medium md:flex" aria-label="Primary">
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className={navLinkClass}>
            Checkout
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="button-secondary px-4">
            Cart ({itemCount})
          </Link>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-nav"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="button-secondary px-4 md:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="mx-auto mt-4 w-full max-w-7xl rounded-panel border border-(--color-border) bg-white/90 p-3 shadow-float md:hidden">
          <nav id="mobile-site-nav" className="grid gap-2" aria-label="Mobile">
            <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMenu}>
              Shop
            </NavLink>
            <NavLink to="/cart" className={mobileNavLinkClass} onClick={closeMenu}>
              Cart
            </NavLink>
            <NavLink to="/checkout" className={mobileNavLinkClass} onClick={closeMenu}>
              Checkout
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar

