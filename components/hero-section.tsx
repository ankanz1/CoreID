"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap } from "lucide-react"
import { RegisterModal } from "@/components/register-modal"
import { useState } from "react"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20" />

      <div className="container relative px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="rounded-full bg-background px-6 py-2">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Powered by Core DAO
                </span>
              </div>
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CoreID</span>
          </h1>

          <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
            Decentralized Identity. Verified on the Blockchain.
          </p>

          <p className="mb-12 text-lg text-muted-foreground max-w-2xl mx-auto">
            CoreID allows users to register, store, and verify their identities on the blockchain with on-chain
            verification and linked metadata such as KYC, education records, and social profiles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              Register Identity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-sm font-medium">Secure & Immutable</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Zap className="h-8 w-8 text-purple-500" />
              <span className="text-sm font-medium">Fast Verification</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <span className="text-sm font-medium">Decentralized</span>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  )
}
