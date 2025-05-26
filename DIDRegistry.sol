// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DIDRegistry {
    address public owner;

    struct Identity {
        string name;
        string email;
        string metadata; // IPFS CID (can contain KYC, education, etc.)
        string socialHandle; // Twitter, GitHub, etc.
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

