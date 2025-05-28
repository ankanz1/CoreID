import Link from "next/link"
import { Github, FileText, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">CoreID</span>
            </div>
            <p className="text-sm text-muted-foreground">Decentralized identity verification on the blockchain.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Product</h3>
            <div className="space-y-2">
              <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
              <Link href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <div className="space-y-2">
              <Link href="#api" className="block text-sm text-muted-foreground hover:text-foreground">
                API Reference
              </Link>
              <Link href="#support" className="block text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <FileText className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} CoreID. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
