import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import ServicePillars from '../components/ServicePillars'
import WhyChoose from '../components/WhyChoose'
import HowWeWork from '../components/HowWeWork'
import LatestInsights from '../components/LatestInsights'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <About />
      <ServicePillars />
      <WhyChoose />
      <HowWeWork />
      <LatestInsights />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default Home