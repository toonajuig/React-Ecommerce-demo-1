import { benefits, categories, featuredProducts } from '../data/storefrontData'
import BenefitsSection from '../sections/BenefitsSection'
import CollectionsSection from '../sections/CollectionsSection'
import HeroSection from '../sections/HeroSection'
import ProductGrid from '../sections/ProductGrid'

function HomePage() {
  return (
    <>
      <HeroSection />
      <CollectionsSection categories={categories} />
      <ProductGrid
        featuredProducts={featuredProducts}
        eyebrow="Featured"
        title="Mock products for layout testing"
      />
      <BenefitsSection benefits={benefits} />
    </>
  )
}

export default HomePage

