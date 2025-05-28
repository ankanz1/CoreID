"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import { CONTRACT_ADDRESS } from "@/lib/contract"

export function ContractInfo() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const openInExplorer = () => {
    // Assuming Core DAO explorer - adjust URL as needed
    window.open(`https://scan.coredao.org/address/${CONTRACT_ADDRESS}`, "_blank")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Smart Contract Information
          <Badge variant="secondary">Core DAO</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Contract Address</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">{CONTRACT_ADDRESS}</code>
            <Button size="sm" variant="outline" onClick={() => copyToClipboard(CONTRACT_ADDRESS)}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={openInExplorer}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">100%</div>
            <div className="text-sm text-muted-foreground">Decentralized</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">Secure</div>
            <div className="text-sm text-muted-foreground">On-Chain</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">Verified</div>
            <div className="text-sm text-muted-foreground">Immutable</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
