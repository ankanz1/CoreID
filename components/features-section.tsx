import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, Users, Link2, Lock, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "On-chain Identity Verification",
    description: "Secure identity verification stored immutably on the Core DAO blockchain",
  },
  {
    icon: Database,
    title: "IPFS-based Metadata Linking",
    description: "Decentralized storage for documents, credentials, and personal data",
  },
  {
    icon: Users,
    title: "Admin Verification System",
    description: "Trusted verification process by authorized administrators",
  },
  {
    icon: Link2,
    title: "Social Handle Linking",
    description: "Connect GitHub, Twitter, LinkedIn and other social profiles",
  },
  {
    icon: Lock,
    title: "Secure and Immutable",
    description: "Cryptographically secured with blockchain immutability",
  },
  {
    icon: Globe,
    title: "Core DAO Integration",
    description: "Built on Core DAO for fast, secure, and cost-effective transactions",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/50">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need for decentralized identity management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mb-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
