"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Hash, Github, Twitter, Linkedin, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useContract } from "@/hooks/use-contract"

interface RegisterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ipfsHash: "",
    githubHandle: "",
    twitterHandle: "",
    linkedinHandle: "",
    bio: "",
  })

  const [txHash, setTxHash] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { registerIdentity, isLoading, error } = useContract()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      alert("Please fill in required fields (Name and Email)")
      return
    }

    try {
      // Prepare social handles array
      const socialHandles = [
        formData.githubHandle ? `github:${formData.githubHandle}` : "",
        formData.twitterHandle ? `twitter:${formData.twitterHandle}` : "",
        formData.linkedinHandle ? `linkedin:${formData.linkedinHandle}` : "",
      ].filter(Boolean)

      const hash = await registerIdentity(formData.name, formData.email, formData.ipfsHash || "", socialHandles)

      setTxHash(hash)
      setSuccess(true)

      // Reset form after successful registration
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          ipfsHash: "",
          githubHandle: "",
          twitterHandle: "",
          linkedinHandle: "",
          bio: "",
        })
        setSuccess(false)
        setTxHash(null)
        onOpenChange(false)
      }, 3000)
    } catch (err) {
      console.error("Registration failed:", err)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Identity Registered Successfully!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your identity has been registered on the blockchain. Please wait for admin verification.
            </p>
            {txHash && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
                <p className="text-xs font-mono break-all">{txHash}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Register Your Digital Identity</DialogTitle>
          <DialogDescription>Create your CoreID profile with verified information and social links</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Hash className="h-5 w-5" />
                Metadata & Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ipfsHash">IPFS Hash</Label>
                <Input
                  id="ipfsHash"
                  value={formData.ipfsHash}
                  onChange={(e) => handleInputChange("ipfsHash", e.target.value)}
                  placeholder="QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">Upload your documents to IPFS and paste the hash here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Social Profiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub Username
                  </Label>
                  <Input
                    id="github"
                    value={formData.githubHandle}
                    onChange={(e) => handleInputChange("githubHandle", e.target.value)}
                    placeholder="username"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter Handle
                  </Label>
                  <Input
                    id="twitter"
                    value={formData.twitterHandle}
                    onChange={(e) => handleInputChange("twitterHandle", e.target.value)}
                    placeholder="@username"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedinHandle}
                    onChange={(e) => handleInputChange("linkedinHandle", e.target.value)}
                    placeholder="linkedin.com/in/username"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Identity"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
