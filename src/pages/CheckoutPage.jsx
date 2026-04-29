import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const shippingOptions = [
  { id: 'standard', label: 'Standard delivery', description: '3-5 business days', cost: 0 },
  { id: 'express', label: 'Express delivery', description: '1-2 business days', cost: 14 },
]

function CheckoutPage() {
  const { cartItems, clearCart, itemCount, subtotal } = useCart()
  const [shippingMethod, setShippingMethod] = useState(shippingOptions[0].id)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: '',
  })

  const selectedShipping =
    shippingOptions.find((option) => option.id === shippingMethod) ?? shippingOptions[0]
  const tax = subtotal * 0.07
  const total = subtotal + tax + selectedShipping.cost

  function handleInputChange(event) {
    const { name, value } = event.target
    setCustomer((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-10">
        <div className="rounded-panel bg-(--color-forest) p-8 text-white lg:p-10">
          <p className="tracking-eyebrow text-sm font-semibold uppercase text-white/70">
            Order confirmed
          </p>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl">Mock checkout complete.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            This template now has a full journey from product listing to checkout.
            Later we can replace this with API calls, validation, and a real payment flow.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/shop" className="button-inverse">
              Keep shopping
            </Link>
            <Link
              to="/"
              className="button-secondary border-white/20 text-white hover:border-white/40 hover:text-white"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-10">
        <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-accent)">
          Checkout
        </p>
        <h1 className="mt-4 font-heading text-4xl">Your cart is empty.</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-(--color-muted)">
          Add products before testing the checkout flow. This page is ready, but it
          needs cart data to show shipping and order summary behavior.
        </p>
        <Link to="/shop" className="button-primary mt-8">
          Go to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mb-10 max-w-2xl space-y-4">
        <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-accent)">
          Checkout
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">Customer and delivery details</h1>
        <p className="text-base leading-7 text-(--color-muted)">
          This mock checkout teaches the structure of a real order flow: contact,
          shipping, order notes, and summary before payment integration.
        </p>
      </div>

      <div className="layout-sidebar grid gap-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <section className="rounded-panel border border-(--color-border) bg-white/80 p-6">
            <h2 className="font-heading text-2xl">Contact information</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-(--color-muted)">First name</span>
                <input
                  required
                  name="firstName"
                  value={customer.firstName}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-(--color-muted)">Last name</span>
                <input
                  required
                  name="lastName"
                  value={customer.lastName}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
                />
              </label>
              <label className="grid gap-2 text-sm sm:col-span-2">
                <span className="font-semibold text-(--color-muted)">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
                />
              </label>
              <label className="grid gap-2 text-sm sm:col-span-2">
                <span className="font-semibold text-(--color-muted)">Phone</span>
                <input
                  name="phone"
                  value={customer.phone}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
                />
              </label>
            </div>
          </section>

          <section className="rounded-panel border border-(--color-border) bg-white/80 p-6">
            <h2 className="font-heading text-2xl">Shipping address</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm sm:col-span-2">
                <span className="font-semibold text-(--color-muted)">Street address</span>
                <input
                  required
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-(--color-muted)">City</span>
                <input
                  required
                  name="city"
                  value={customer.city}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-(--color-muted)">ZIP code</span>
                <input
                  required
                  name="zipCode"
                  value={customer.zipCode}
                  onChange={handleInputChange}
                  className="rounded-2xl border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
                />
              </label>
            </div>
          </section>

          <section className="rounded-panel border border-(--color-border) bg-white/80 p-6">
            <h2 className="font-heading text-2xl">Delivery method</h2>
            <div className="mt-6 grid gap-4">
              {shippingOptions.map((option) => {
                const isActive = option.id === shippingMethod

                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-start justify-between gap-4 rounded-soft border p-4 transition ${
                      isActive
                        ? 'border-(--color-accent) bg-(--color-panel)'
                        : 'border-(--color-border) bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={isActive}
                        onChange={() => setShippingMethod(option.id)}
                        className="mt-1"
                      />
                      <div>
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p className="mt-1 text-sm text-(--color-muted)">{option.description}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">
                      {option.cost === 0 ? 'Free' : formatCurrency(option.cost)}
                    </p>
                  </label>
                )
              })}
            </div>
          </section>

          <section className="rounded-panel border border-(--color-border) bg-white/80 p-6">
            <h2 className="font-heading text-2xl">Order notes</h2>
            <label className="mt-6 grid gap-2 text-sm">
              <span className="font-semibold text-(--color-muted)">Optional delivery note</span>
              <textarea
                name="notes"
                value={customer.notes}
                onChange={handleInputChange}
                rows="4"
                className="rounded-soft border border-(--color-border) bg-white px-4 py-3 outline-none transition focus:border-(--color-accent)"
              />
            </label>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button type="submit" className="button-primary">
              Place mock order
            </button>
            <Link to="/cart" className="button-secondary">
              Back to cart
            </Link>
          </div>
        </form>

        <aside className="rounded-panel bg-(--color-forest) p-6 text-white">
          <h2 className="font-heading text-2xl">Order summary</h2>
          <div className="mt-6 grid gap-4">
            {cartItems.map((item) => (
              <article key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="tracking-brand mt-1 text-xs uppercase text-white/60">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                    <p className="mt-1 text-sm text-white/70">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatCurrency(item.priceValue * item.quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-white/15 pt-6 text-sm text-white/75">
            <p>Items: {itemCount}</p>
            <p>Subtotal: {formatCurrency(subtotal)}</p>
            <p>Shipping: {selectedShipping.cost === 0 ? 'Free' : formatCurrency(selectedShipping.cost)}</p>
            <p>Tax: {formatCurrency(tax)}</p>
          </div>

          <p className="mt-6 border-t border-white/15 pt-6 text-lg font-semibold">
            Total: {formatCurrency(total)}
          </p>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage

