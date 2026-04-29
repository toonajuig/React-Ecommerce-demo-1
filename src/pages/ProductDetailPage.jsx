import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { featuredProducts } from '../data/storefrontData'
import ProductGrid from '../sections/ProductGrid'

function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const product = featuredProducts.find((item) => item.id === productId)

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? '')
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? '')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-10">
        <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-accent)">
          Product not found
        </p>
        <h1 className="mt-4 font-heading text-4xl">This mock product does not exist.</h1>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full border border-(--color-border) px-6 py-3 text-sm font-semibold transition hover:border-(--color-accent) hover:text-(--color-accent)"
        >
          Back to shop
        </Link>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    })
  }

  const relatedProducts = featuredProducts
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="layout-product-detail grid gap-10">
        <div className="surface-product aspect-product flex items-end rounded-panel p-8">
          <span className="tracking-brand rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase text-(--color-accent)">
            {product.tag}
          </span>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-accent)">
              {product.category}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl">{product.name}</h1>
            <p className="text-xl font-semibold">{product.price}</p>
          </div>

          <p className="max-w-xl text-base leading-7 text-(--color-muted)">
            {product.description} This version now includes the basic interactions most
            product pages need before checkout: variant selection and quantity control.
          </p>

          <div className="grid gap-6 rounded-panel border border-(--color-border) bg-white/80 p-6">
            <div>
              <p className="tracking-brand mb-3 text-xs font-semibold uppercase text-(--color-muted)">
                Size
              </p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`button-chip ${
                        isActive
                          ? 'bg-(--color-accent) text-white'
                          : 'border border-(--color-border) bg-white hover:border-(--color-accent) hover:text-(--color-accent)'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="tracking-brand mb-3 text-xs font-semibold uppercase text-(--color-muted)">
                Color
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`button-chip ${
                        isActive
                          ? 'bg-(--color-forest) text-white'
                          : 'border border-(--color-border) bg-white hover:border-(--color-accent) hover:text-(--color-accent)'
                      }`}
                    >
                      {color}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="tracking-brand mb-3 text-xs font-semibold uppercase text-(--color-muted)">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="h-11 w-11 rounded-full border border-(--color-border) text-lg"
                >
                  -
                </button>
                <span className="min-w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="h-11 w-11 rounded-full border border-(--color-border) text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-panel border border-(--color-border) bg-white/70 p-6 sm:grid-cols-3">
            <div>
              <p className="tracking-brand text-xs font-semibold uppercase text-(--color-muted)">
                Material
              </p>
              <p className="mt-2 text-sm">Template placeholder</p>
            </div>
            <div>
              <p className="tracking-brand text-xs font-semibold uppercase text-(--color-muted)">
                Delivery
              </p>
              <p className="mt-2 text-sm">2-4 business days</p>
            </div>
            <div>
              <p className="tracking-brand text-xs font-semibold uppercase text-(--color-muted)">
                Returns
              </p>
              <p className="mt-2 text-sm">30-day returns</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button type="button" onClick={handleAddToCart} className="button-primary">
              Add {quantity} to cart
            </button>
            <Link to="/cart" className="button-secondary">
              Go to cart
            </Link>
            <Link to="/shop" className="button-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <ProductGrid
            featuredProducts={relatedProducts}
            eyebrow="Related products"
            title={`More in ${product.category}`}
            emptyMessage="No related products available yet."
          />
        </section>
      )}
    </div>
  )
}

export default ProductDetailPage

