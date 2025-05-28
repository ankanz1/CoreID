"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, CheckCircle, Clock } from "lucide-react"
import { useContract } from "@/hooks/use-contract"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [hasIdentity, setHasIdentity] = useState(false)
  const { getIdentity, isVerified: checkVerified } = useContract()

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
          setIsConnected(true)
          setAddress(accounts[0])
          await checkIdentityStatus(accounts[0])
        }
      } else {
        alert("Please install MetaMask to connect your wallet")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const checkIdentityStatus = async (userAddress: string) => {
    try {
      const identity = await getIdentity(userAddress)
      const verified = await checkVerified(userAddress)

      setHasIdentity(!!identity)
      setIsVerified(verified)
    } catch (error) {
      console.error("Error checking identity status:", error)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress("")
    setIsVerified(false)
    setHasIdentity(false)
  }

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          if (accounts.length > 0) {
            setIsConnected(true)
            setAddress(accounts[0])
            await checkIdentityStatus(accounts[0])
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()

    // Listen for account changes
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
          checkIdentityStatus(accounts[0])
        } else {
          disconnectWallet()
        }
      })
    }
  }, [])

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <Button variant="outline" onClick={disconnectWallet} className="text-xs">
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </Button>
          <div className="flex gap-1 mt-1">
            {hasIdentity && (
              <Badge variant="secondary" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Registered
              </Badge>
            )}
            {isVerified ? (
              <Badge variant="default" className="text-xs bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            ) : hasIdentity ? (
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  )
}
