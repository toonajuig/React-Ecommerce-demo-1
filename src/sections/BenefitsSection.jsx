import SectionHeading from '../components/SectionHeading'

function BenefitsSection({ benefits }) {
  return (
    <section id="about" className="section-shell section-space">
      <div className="layout-benefits grid gap-7 rounded-panel bg-(--color-forest-deep) p-8 text-white lg:p-10">
        <SectionHeading
          eyebrow="Trust signals"
          title="Even a template should communicate confidence."
          description="The store feels more believable when reassurance lives close to the catalog instead of hidden in the footer."
          invert
          titleClassName="max-w-lg"
          descriptionClassName="max-w-md text-white/80"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="rounded-soft bg-white/10 p-5 backdrop-blur-sm lg:p-6">
              <p className="text-pretty text-sm leading-7 text-white/85">{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection

