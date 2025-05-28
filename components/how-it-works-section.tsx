import { Card, CardContent } from "@/components/ui/card"
import { Wallet, UserPlus, Link2, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Connect your Web3 wallet to get started with CoreID",
    step: "01",
  },
  {
    icon: UserPlus,
    title: "Register Identity",
    description: "Create your digital identity with basic information",
    step: "02",
  },
  {
    icon: Link2,
    title: "Link Metadata",
    description: "Connect IPFS, KYC documents, GitHub, and social profiles",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Get Verified",
    description: "Admin verification for trusted identity status",
    step: "04",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Get started with CoreID in four simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 text-2xl font-bold text-muted-foreground/20">{step.step}</div>

                <div className="mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
