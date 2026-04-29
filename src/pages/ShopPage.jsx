import { startTransition, useDeferredValue, useState } from 'react'
import { categories, featuredProducts } from '../data/storefrontData'
import ProductGrid from '../sections/ProductGrid'

const ALL_CATEGORY = 'All'
const SORT_OPTIONS = {
  featured: 'Featured',
  priceAsc: 'Price: Low to high',
  priceDesc: 'Price: High to low',
  nameAsc: 'Name: A to Z',
}

function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY)
  const [sortBy, setSortBy] = useState('featured')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const normalizedSearch = deferredSearchTerm.trim().toLowerCase()
  const visibleProducts = [...featuredProducts]
    .filter((product) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORY || product.category === selectedCategory

      const searchableText = `${product.name} ${product.tag} ${product.description} ${product.category}`.toLowerCase()

      const matchesSearch =
        normalizedSearch.length === 0 || searchableText.includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
    .sort((firstProduct, secondProduct) => {
      if (sortBy === 'priceAsc') {
        return firstProduct.priceValue - secondProduct.priceValue
      }

      if (sortBy === 'priceDesc') {
        return secondProduct.priceValue - firstProduct.priceValue
      }

      if (sortBy === 'nameAsc') {
        return firstProduct.name.localeCompare(secondProduct.name)
      }

      return 0
    })

  const categoryOptions = [ALL_CATEGORY, ...categories.map((category) => category.name)]

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
      <div className="mb-10 max-w-2xl space-y-4">
        <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-accent)">
          Shop
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">Browse the starter catalog</h1>
        <p className="text-base leading-7 text-(--color-muted)">
          This page now has the first real store interactions: category filtering and
          keyword search, both living inside page-level state.
        </p>
      </div>

      <section className="mb-10 rounded-panel border border-(--color-border) bg-white/70 p-6">
        <div className="layout-hero grid gap-6">
          <label className="block">
            <span className="tracking-brand mb-3 block text-sm font-semibold uppercase text-(--color-muted)">
              Search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                const nextValue = event.target.value
                startTransition(() => {
                  setSearchTerm(nextValue)
                })
              }}
              placeholder="Search by name, tag, or category"
              className="w-full rounded-full border border-(--color-border) bg-white px-5 py-3 text-sm outline-none transition focus:border-(--color-accent)"
            />
          </label>

          <div className="grid gap-6">
            <div>
              <p className="tracking-brand mb-3 text-sm font-semibold uppercase text-(--color-muted)">
                Categories
              </p>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map((category) => {
                  const isActive = selectedCategory === category

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`button-chip ${
                        isActive
                          ? 'bg-(--color-accent) text-white'
                          : 'border border-(--color-border) bg-white hover:border-(--color-accent) hover:text-(--color-accent)'
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>

            <label className="block">
              <span className="tracking-brand mb-3 block text-sm font-semibold uppercase text-(--color-muted)">
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-full border border-(--color-border) bg-white px-5 py-3 text-sm outline-none transition focus:border-(--color-accent)"
              >
                {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-(--color-muted) sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing <span className="font-semibold text-(--color-ink)">{visibleProducts.length}</span>{' '}
            product{visibleProducts.length === 1 ? '' : 's'}
          </p>
          {(selectedCategory !== ALL_CATEGORY || searchTerm.trim() || sortBy !== 'featured') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(ALL_CATEGORY)
                setSearchTerm('')
                setSortBy('featured')
              }}
              className="text-left font-semibold text-(--color-accent) sm:text-right"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      <ProductGrid
        featuredProducts={visibleProducts}
        eyebrow="Catalog"
        title="All template products"
        emptyMessage="Try another keyword or switch back to All categories."
      />
    </div>
  )
}

export default ShopPage

