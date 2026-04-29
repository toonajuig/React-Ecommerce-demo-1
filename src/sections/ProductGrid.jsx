import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useCart } from "../context/useCart";

function ProductGrid({ featuredProducts, eyebrow, title, emptyMessage }) {
  const { addToCart } = useCart();
  const resolvedEmptyMessage =
    emptyMessage ??
    "This section is ready for products as soon as catalog data is available.";

  return (
    <section id="shop" className="section-shell section-space pt-0!">
      <div className="section-intro flex items-end justify-between gap-4">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description="Each product card carries enough hierarchy to feel shoppable before imagery and live inventory arrive."
          titleClassName="max-w-xl"
          descriptionClassName="max-w-lg"
        />
      </div>

      {featuredProducts.length === 0 ? (
        <div className="card-surface rounded-panel border border-dashed border-(--color-border) px-6 py-12 text-center">
          <p className="font-heading text-2xl">No products found</p>
          <p className="text-pretty mt-3 text-sm leading-7 text-(--color-muted)">
            {resolvedEmptyMessage}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <article
              key={product.id}
              className="card-surface overflow-hidden rounded-card border border-(--color-border)"
            >
              <div className="surface-product aspect-product flex items-end p-5 lg:p-6">
                <span className="tracking-brand rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase text-(--color-accent)">
                  0{index + 1}
                </span>
              </div>

              <div className="p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="tracking-eyebrow text-xs font-semibold uppercase text-(--color-muted)">
                    {product.tag}
                  </p>
                  <span className="tracking-brand rounded-full bg-(--color-panel) px-2.5 py-1 text-tiny font-semibold uppercase text-(--color-accent)">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-balance font-heading text-[1.35rem] leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-sm font-semibold">{product.price}</span>
                </div>

                <p className="text-pretty mt-3 text-sm leading-7 text-(--color-muted)">
                  {product.description}
                </p>

                <div className="product-actions flex gap-3">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="button-secondary flex-1 px-4"
                  >
                    Add to cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="button-secondary bg-(--color-panel) px-4"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
