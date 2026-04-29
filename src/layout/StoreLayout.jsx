import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function StoreLayout() {
  return (
    <div className="min-h-screen bg-(--color-cream) text-(--color-ink)">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default StoreLayout

