import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import { StatsBar } from './components/sections/StatsBar'
import Services from './components/sections/Services'
import HowItWorks from './components/sections/HowItWorks'
import Brands from './components/sections/Brands'
import Testimonials from './components/sections/Testimonials'
import WhyUs from './components/sections/WhyUs'
import ServiceAreas from './components/sections/ServiceAreas'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import MobileCTA from './components/ui/MobileCTA'
import ScrollProgress from './components/ui/ScrollProgress'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <HowItWorks />
        <Brands />
        <Testimonials />
        <WhyUs />
        <ServiceAreas />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}
