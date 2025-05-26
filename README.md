# 🆔 Decentralized Identity (DID) System on Core DAO

A decentralized identity verification system deployed on **Core DAO** that allows users to create, store, and verify identity-related information such as KYC, education records, and social handles on-chain.

## 🔍 Project Description

The DID system enables individuals to register their identity and associated metadata securely on the blockchain. This system utilizes the Core DAO blockchain, leveraging its Bitcoin-level security and EVM compatibility to ensure decentralized and tamper-proof identity management.

### 🎯 Use Case

- Users register their identity (name, email, etc.).
- Link social handles (Twitter, GitHub), IPFS-hosted KYC documents or academic records.
- Admin (owner) verifies registered identities.
- dApps can fetch verification status to enable role-based access.

---

## 🚀 Features

- ✅ On-chain identity registration
- 🔐 Admin-controlled verification system
- 🌐 Linked social and external metadata (via IPFS)
- 🧾 Event logging for dApp integrations
- 📡 Designed for Core DAO EVM deployment

---

## 🔧 Tech Stack

- **Solidity (v0.8.19+)**
- **Core DAO Blockchain** (EVM-compatible)
- **Hardhat** or **Remix** for development
- **IPFS** for off-chain storage (metadata like KYC)

---

## 🏗️ Smart Contract

**File:** `contracts/DIDRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DIDRegistry {
    address public owner;

    struct Identity {
        string name;
        string email;
        string metadata; // IPFS CID (KYC, education, etc.)
        string socialHandle;
        bool isVerified;
    }

    mapping(address => Identity) public identities;

    event IdentityRegistered(address indexed user, string name, string email);
    event IdentityUpdated(address indexed user);
    event IdentityVerified(address indexed user);
    event IdentityRevoked(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only admin can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerIdentity(
        string memory _name,
        string memory _email,
        string memory _metadata,
        string memory _socialHandle
    ) public {
        identities[msg.sender] = Identity({
            name: _name,
            email: _email,
            metadata: _metadata,
            socialHandle: _socialHandle,
            isVerified: false
        });

        emit IdentityRegistered(msg.sender, _name, _email);
    }

    function updateIdentity(
        string memory _name,
        string memory _email,
        string memory _metadata,
        string memory _socialHandle
    ) public {
        require(bytes(identities[msg.sender].name).length > 0, "Identity not registered");

        identities[msg.sender].name = _name;
        identities[msg.sender].email = _email;
        identities[msg.sender].metadata = _metadata;
        identities[msg.sender].socialHandle = _socialHandle;

        emit IdentityUpdated(msg.sender);
    }

    function verifyIdentity(address _user) public onlyOwner {
        require(bytes(identities[_user].name).length > 0, "Identity not registered");
        identities[_user].isVerified = true;

        emit IdentityVerified(_user);
    }

    function revokeVerification(address _user) public onlyOwner {
        require(identities[_user].isVerified, "User is not verified");
        identities[_user].isVerified = false;

        emit IdentityRevoked(_user);
    }

    function getIdentity(address _user) public view returns (Identity memory) {
        return identities[_user];
    }
}
