"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Code, 
  Shield, 
  Zap,
  ExternalLink,
  Copy,
  CheckCircle
} from "lucide-react"
import { useState } from "react"

const contracts = [
  {
    name: "ConsentRegistry",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    description: "EIP-712 consent management with Self Protocol VC anchoring",
    functions: [
      "grant(Consent, bytes) external",
      "revoke(bytes32, bytes32) external", 
      "isActive(address, address, bytes32, bytes32) external view returns (bool)",
      "digest(Consent) external view returns (bytes32)"
    ],
    events: [
      "ConsentGranted(address indexed subject, address indexed controller, bytes32 datasetId, bytes32 purpose, uint64 expiry, uint96 nonce)",
      "ConsentRevoked(address indexed subject, address indexed controller, bytes32 datasetId, bytes32 purpose, uint96 nonce)"
    ]
  },
  {
    name: "DataBroker",
    address: "0x2345678901bcdef1234567890abcdef1234567890",
    description: "Revenue splitting and $DATA token distribution with anti-gaming multipliers",
    functions: [
      "sellData(Consent[], bytes[], bytes32, address, address, uint256, bytes) external returns (bytes32)",
      "getRewardRate(address) external view returns (uint256)",
      "updateMultipliers(address[], uint256[]) external",
      "withdrawRewards(address) external"
    ],
    events: [
      "DataSold(bytes32 indexed saleId, bytes32 datasetId, address indexed controller, address indexed buyer, address paymentToken, uint256 grossAmount, address[] recipients, uint256[] amounts)",
      "RewardsDistributed(address indexed recipient, uint256 amount, uint256 multiplier)"
    ]
  },
  {
    name: "LighthouseReceipts",
    address: "0x3456789012cdef1234567890abcdef1234567890",
    description: "Immutable audit trail anchoring with IPFS/Filecoin integration",
    functions: [
      "anchor(bytes32, string, bytes32) external",
      "getReceipt(bytes32) external view returns (string, bytes32)",
      "verifyReceipt(bytes32) external view returns (bool)",
      "getReceiptHistory(address) external view returns (bytes32[])"
    ],
    events: [
      "DataReceiptAnchored(bytes32 indexed saleId, string cid, bytes32 checksum)",
      "ReceiptVerified(bytes32 indexed saleId, bool isValid)"
    ]
  },
  {
    name: "WorldIDVerifier",
    address: "0x4567890123def1234567890abcdef1234567890",
    description: "Sybil-resistant identity verification using semaphore nullifiers",
    functions: [
      "verifyProof(bytes32, uint256, uint256, uint256, uint256, uint256[8]) external view",
      "isVerified(address) external view returns (bool)",
      "getNullifierHash(address, uint256) external view returns (uint256)"
    ],
    events: [
      "IdentityVerified(address indexed user, uint256 nullifierHash)",
      "ProofVerified(address indexed user, bool isValid)"
    ]
  },
  {
    name: "DataToken",
    address: "0x5678901234ef1234567890abcdef1234567890",
    description: "ERC-20 $DATA token with deflationary mechanics and streaming rewards",
    functions: [
      "mint(address, uint256) external",
      "burn(uint256) external",
      "streamRewards(address, uint256, uint256) external",
      "getStreamingRewards(address) external view returns (uint256)"
    ],
    events: [
      "Transfer(address indexed from, address indexed to, uint256 value)",
      "RewardsStreamed(address indexed recipient, uint256 amount, uint256 duration)"
    ]
  }
]

const integrationExamples = [
  {
    title: "Basic Consent Grant",
    language: "solidity",
    code: `// Grant consent for data sharing
IConsentRegistry.Consent memory consent = IConsentRegistry.Consent({
    subject: userAddress,
    controller: merchantAddress,
    datasetId: keccak256("orders:v1"),
    purpose: keccak256("ad_coop_lookalike"),
    issuedAt: uint64(block.timestamp),
    expiry: uint64(block.timestamp + 365 days),
    nonce: 0
});

bytes32 digest = consentRegistry.digest(consent);
bytes memory signature = userSignature;
consentRegistry.grant(consent, signature);`
  },
  {
    title: "Data Sale Execution",
    language: "solidity",
    code: `// Execute data sale with automatic revenue splitting
IConsentRegistry.Consent[] memory consents = new IConsentRegistry.Consent[](1);
consents[0] = activeConsent;

bytes[] memory signatures = new bytes[](1);
signatures[0] = userSignature;

bytes32 saleId = dataBroker.sellData(
    consents,
    signatures,
    keccak256("orders:v1"),
    buyerAddress,
    USDC_ADDRESS,
    1250000, // $1.25 in USDC
    worldIdProof
);`
  },
  {
    title: "Receipt Anchoring",
    language: "solidity",
    code: `// Anchor encrypted receipt to Lighthouse
string memory cid = "QmXyz..."; // IPFS CID from Lighthouse
bytes32 checksum = keccak256(abi.encodePacked(cid, saleId));

lighthouseReceipts.anchor(saleId, cid, checksum);

// Verify receipt integrity
bool isValid = lighthouseReceipts.verifyReceipt(saleId);
require(isValid, "Invalid receipt");`
  }
]

export default function ContractsPage() {
  const [copiedCode, setCopiedCode] = useState<number | null>(null)

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(index)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Smart Contracts • Solidity • EVM Compatible
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Smart Contract Integration
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive smart contract interfaces for 
            <span className="font-semibold text-foreground"> Lightning Protocol</span> protocol, 
            with complete Solidity implementations, event schemas, and integration examples.
          </p>
        </div>

        {/* Contract Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contracts.map((contract, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{contract.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{contract.description}</p>
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {contract.address}
                  </code>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Functions</h4>
                  <div className="space-y-1">
                    {contract.functions.slice(0, 2).map((func, funcIndex) => (
                      <code key={funcIndex} className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                        {func}
                      </code>
                    ))}
                    {contract.functions.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{contract.functions.length - 2} more functions
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Events</h4>
                  <div className="space-y-1">
                    {contract.events.slice(0, 1).map((event, eventIndex) => (
                      <code key={eventIndex} className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                        {event}
                      </code>
                    ))}
                    {contract.events.length > 1 && (
                      <p className="text-xs text-muted-foreground">
                        +{contract.events.length - 1} more events
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Integration Examples */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Solidity Integration Examples
            </CardTitle>
            <CardDescription>
              Real-world Solidity code examples for integrating with Lightning Protocol contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {integrationExamples.map((example, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">{example.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">{example.language}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(example.code, index)}
                        className="flex items-center gap-2"
                      >
                        {copiedCode === index ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copiedCode === index ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>
                  <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Architecture */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Contract Architecture
            </CardTitle>
            <CardDescription>
              High-level overview of contract interactions and data flow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Core Components</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">ConsentRegistry</p>
                      <p className="text-sm text-muted-foreground">Manages EIP-712 consent lifecycle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">DataBroker</p>
                      <p className="text-sm text-muted-foreground">Executes sales and distributes rewards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">LighthouseReceipts</p>
                      <p className="text-sm text-muted-foreground">Anchors encrypted receipts to IPFS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">WorldIDVerifier</p>
                      <p className="text-sm text-muted-foreground">Prevents Sybil attacks</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Security Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Replay Protection:</strong> Nonce-based consent management</li>
                  <li>• <strong>Access Control:</strong> Role-based permissions</li>
                  <li>• <strong>Pausable:</strong> Emergency stop functionality</li>
                  <li>• <strong>Upgradeable:</strong> Proxy pattern for future improvements</li>
                  <li>• <strong>Audit Trail:</strong> Complete event logging</li>
                  <li>• <strong>Gas Optimization:</strong> Efficient storage patterns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Deployment Information
            </CardTitle>
            <CardDescription>
              Contract addresses and deployment details across different networks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Contract</th>
                    <th className="text-left py-3 px-4">Ethereum Mainnet</th>
                    <th className="text-left py-3 px-4">Polygon</th>
                    <th className="text-left py-3 px-4">Arbitrum</th>
                    <th className="text-left py-3 px-4">Base</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-medium">{contract.name}</td>
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {contract.address}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {contract.address}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {contract.address}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {contract.address}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
