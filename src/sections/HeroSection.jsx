function HeroSection() {
  return (
    <section className="section-shell layout-hero grid section-gap pb-18 pt-8 lg:pb-28 lg:pt-12">
      <div className="hero-copy space-y-8">
        <span className="eyebrow-pill tracking-pill bg-white/80 text-xs font-bold uppercase text-(--color-accent) shadow-sm ring-1 ring-(--color-border)">
          Ecommerce template
        </span>

        <div className="stack-copy">
          <p className="text-display text-balance font-heading text-5xl leading-none sm:text-6xl lg:text-[4.5rem]">
            Build the storefront first,
            <span className="block text-(--color-accent)">decide the products later.</span>
          </p>
          <p className="text-pretty max-w-2xl text-base leading-8 text-(--color-muted) sm:text-lg">
            This starter focuses on the structure every ecommerce app needs:
            navigation, hero, categories, featured products, trust signals, and a
            footer ready for expansion.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <a href="#collections" className="button-primary">
            Explore template
          </a>
          <a href="#shop" className="button-secondary">
            See product grid
          </a>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <article className="shadow-float rounded-panel bg-(--color-panel) p-7 ring-1 ring-white/70 sm:col-span-2 lg:p-8">
          <p className="tracking-eyebrow text-sm uppercase text-(--color-muted)">Launch focus</p>
          <p className="text-display text-balance mt-4 max-w-2xl font-heading text-3xl leading-tight">
            Start with a believable shopping experience before wiring real data.
          </p>
        </article>

        <article className="shadow-float-strong rounded-panel bg-(--color-forest) p-7 text-white lg:p-8">
          <p className="tracking-eyebrow text-sm uppercase text-white/70">Sections</p>
          <p className="metric-number mt-5 text-5xl font-semibold">6</p>
          <p className="mt-3 max-w-[12rem] text-sm leading-6 text-white/70">
            enough to feel like a real store
          </p>
        </article>

        <article className="shadow-float rounded-panel bg-(--color-sand) p-7 lg:p-8">
          <p className="tracking-eyebrow text-sm uppercase text-(--color-muted)">Next step</p>
          <p className="text-balance mt-4 text-lg font-semibold leading-7">
            Split each section into reusable components.
          </p>
        </article>
      </div>
    </section>
  )
}

export default HeroSection

