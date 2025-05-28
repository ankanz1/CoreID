"use client"

import { useState, useCallback } from "react"
import { CONTRACT_ADDRESS, CONTRACT_ABI, type Identity } from "@/lib/contract"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function useContract() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getContract = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask is not installed")
    }

    const { ethers } = await import("ethers")
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
  }, [])

  const registerIdentity = useCallback(
    async (name: string, email: string, ipfsHash: string, socialHandles: string[]) => {
      setIsLoading(true)
      setError(null)

      try {
        const contract = await getContract()
        const tx = await contract.registerIdentity(name, email, ipfsHash, socialHandles)
        await tx.wait()
        return tx.hash
      } catch (err: any) {
        const errorMessage = err.reason || err.message || "Transaction failed"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [getContract],
  )

  const getIdentity = useCallback(
    async (address: string): Promise<Identity | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const contract = await getContract()
        const result = await contract.getIdentity(address)

        // Check if identity exists (name should not be empty)
        if (!result[0]) {
          return null
        }

        return {
          name: result[0],
          email: result[1],
          ipfsHash: result[2],
          socialHandles: result[3],
          isVerified: result[4],
          timestamp: Number(result[5]),
        }
      } catch (err: any) {
        const errorMessage = err.reason || err.message || "Failed to fetch identity"
        setError(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [getContract],
  )

  const isVerified = useCallback(
    async (address: string): Promise<boolean> => {
      try {
        const contract = await getContract()
        return await contract.isVerified(address)
      } catch (err) {
        console.error("Error checking verification status:", err)
        return false
      }
    },
    [getContract],
  )

  const updateMetadata = useCallback(
    async (ipfsHash: string, socialHandles: string[]) => {
      setIsLoading(true)
      setError(null)

      try {
        const contract = await getContract()
        const tx = await contract.updateMetadata(ipfsHash, socialHandles)
        await tx.wait()
        return tx.hash
      } catch (err: any) {
        const errorMessage = err.reason || err.message || "Update failed"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [getContract],
  )

  return {
    registerIdentity,
    getIdentity,
    isVerified,
    updateMetadata,
    isLoading,
    error,
    contractAddress: CONTRACT_ADDRESS,
  }
}
