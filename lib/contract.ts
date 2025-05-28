export const CONTRACT_ADDRESS = "0x2A69f2dFc48f913b721c4266262bd056C86D8399"

export const CONTRACT_ABI = [
  {
    inputs: [
      { name: "_name", type: "string" },
      { name: "_email", type: "string" },
      { name: "_ipfsHash", type: "string" },
      { name: "_socialHandles", type: "string[]" },
    ],
    name: "registerIdentity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_user", type: "address" }],
    name: "verifyIdentity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_user", type: "address" }],
    name: "getIdentity",
    outputs: [
      { name: "name", type: "string" },
      { name: "email", type: "string" },
      { name: "ipfsHash", type: "string" },
      { name: "socialHandles", type: "string[]" },
      { name: "isVerified", type: "bool" },
      { name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_user", type: "address" }],
    name: "isVerified",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRegisteredUsers",
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_ipfsHash", type: "string" },
      { name: "_socialHandles", type: "string[]" },
    ],
    name: "updateMetadata",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "name", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "IdentityRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: true, name: "verifier", type: "address" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "IdentityVerified",
    type: "event",
  },
] as const

export interface Identity {
  name: string
  email: string
  ipfsHash: string
  socialHandles: string[]
  isVerified: boolean
  timestamp: number
}
