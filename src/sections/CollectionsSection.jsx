import SectionHeading from '../components/SectionHeading'

function CollectionsSection({ categories }) {
  return (
    <section id="collections" className="section-shell section-space">
      <div className="section-intro flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Collections"
          title="Choose clear entry points"
          description="Categories help users understand the store quickly, even before we have real products or filters."
          titleClassName="max-w-xl"
          descriptionClassName="max-w-lg"
        />

        <div className="hidden max-w-sm text-sm leading-7 text-(--color-muted) md:block">
          Organized entry points reduce hesitation and make even placeholder merchandise
          feel intentionally merchandised.
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {categories.map((category) => (
          <article key={category.id} className="card-surface rounded-card border border-(--color-border) p-6 lg:p-7">
            <p className="tracking-eyebrow text-sm font-semibold uppercase text-(--color-muted)">
              {category.name}
            </p>
            <p className="text-balance mt-6 font-heading text-[1.75rem] leading-tight">
              Template-ready category block
            </p>
            <p className="text-pretty mt-4 text-sm leading-7 text-(--color-muted)">
              {category.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CollectionsSection

