import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { ContractInfo } from "@/components/contract-info"
import { CallToActionSection } from "@/components/call-to-action-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <section className="py-20 lg:py-32">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Smart Contract</h2>
              <p className="text-lg text-muted-foreground">Powered by Core DAO blockchain technology</p>
            </div>
            <ContractInfo />
          </div>
        </section>
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  )
}
