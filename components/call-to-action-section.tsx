"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { RegisterModal } from "@/components/register-modal"
import { useState } from "react"

export function CallToActionSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Get Started with Your Digital Identity</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust CoreID for their decentralized identity needs. Start building your
            verified digital presence today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              Register Identity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <RegisterModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  )
}
