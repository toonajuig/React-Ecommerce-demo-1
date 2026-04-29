import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function CartPage() {
  const { cartItems, clearCart, itemCount, removeFromCart, subtotal, updateQuantity } =
    useCart()

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mb-10 space-y-4">
        <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-accent)">
          Cart
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">Cart template page</h1>
        <p className="max-w-2xl text-base leading-7 text-(--color-muted)">
          This page now reads from shared cart state. Later we can extend it with
          coupon logic, shipping methods, checkout forms, and payment integration.
        </p>
      </div>

      <div className="layout-sidebar grid gap-6">
        <section className="rounded-panel border border-(--color-border) bg-white/80 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-2xl">Cart items</h2>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-left text-sm font-semibold text-(--color-accent) sm:text-right"
              >
                Clear cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="mt-6 rounded-soft bg-(--color-panel) p-5 text-sm text-(--color-muted)">
              Your cart is empty. Add a few mock products from the shop page to test the
              flow.
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {cartItems.map((item) => (
                <article
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="rounded-soft border border-(--color-border) bg-white p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="tracking-brand text-xs font-semibold uppercase text-(--color-accent)">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-heading text-xl">{item.name}</h3>
                      <p className="tracking-brand mt-2 text-xs font-semibold uppercase text-(--color-muted)">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-(--color-muted)">
                        {item.description}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">{item.price}</p>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1,
                          )
                        }
                        className="h-10 w-10 rounded-full border border-(--color-border) text-lg"
                      >
                        -
                      </button>
                      <span className="min-w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1,
                          )
                        }
                        className="h-10 w-10 rounded-full border border-(--color-border) text-lg"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-sm font-semibold">
                        {formatCurrency(item.priceValue * item.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-sm font-semibold text-(--color-accent)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="rounded-panel bg-(--color-forest) p-6 text-white">
          <h2 className="font-heading text-2xl">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm text-white/75">
            <p>Items: {itemCount}</p>
            <p>Subtotal: {formatCurrency(subtotal)}</p>
            <p>Shipping: {cartItems.length > 0 ? 'Free for template demo' : 'Calculated later'}</p>
            <p>Tax: {cartItems.length > 0 ? formatCurrency(subtotal * 0.07) : 'Calculated later'}</p>
          </div>
          <p className="mt-6 border-t border-white/15 pt-6 text-lg font-semibold">
            Estimated total: {formatCurrency(subtotal * 1.07)}
          </p>
          <Link to={cartItems.length > 0 ? '/checkout' : '/shop'} className="button-inverse mt-8 px-5">
            {cartItems.length > 0 ? 'Continue to checkout' : 'Return to shop'}
          </Link>
        </aside>
      </div>
    </div>
  )
}

export default CartPage

