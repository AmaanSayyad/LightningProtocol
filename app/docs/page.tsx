"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Code, 
  Zap, 
  Shield, 
  Globe,
  FileText,
  Terminal,
  ExternalLink,
  Copy,
  CheckCircle
} from "lucide-react"

const apiEndpoints = [
  {
    method: "POST",
    endpoint: "/api/consents/prepare",
    description: "Prepare EIP-712 consent payload for user signature",
    parameters: [
      { name: "datasetId", type: "string", required: true, description: "Unique identifier for the dataset" },
      { name: "purpose", type: "string", required: true, description: "Purpose of data processing" },
      { name: "expiry", type: "number", required: true, description: "Consent expiry timestamp" }
    ],
    response: {
      success: true,
      data: {
        typedData: { /* EIP-712 typed data */ },
        policyURI: "https://example.com/privacy-policy",
        consentId: "0x1234..."
      }
    }
  },
  {
    method: "POST",
    endpoint: "/api/consents/commit",
    description: "Submit signed consent to the blockchain",
    parameters: [
      { name: "consent", type: "object", required: true, description: "EIP-712 consent object" },
      { name: "signature", type: "string", required: true, description: "User's EIP-712 signature" },
      { name: "worldIdProof", type: "string", required: true, description: "World ID nullifier proof" }
    ],
    response: {
      success: true,
      data: {
        txHash: "0xabcd...",
        consentId: "0x1234...",
        status: "confirmed"
      }
    }
  },
  {
    method: "POST",
    endpoint: "/api/broker/sell",
    description: "Execute data sale with automatic revenue splitting",
    parameters: [
      { name: "consents", type: "array", required: true, description: "Array of active consents" },
      { name: "buyer", type: "string", required: true, description: "Buyer's wallet address" },
      { name: "datasetId", type: "string", required: true, description: "Dataset identifier" },
      { name: "price", type: "string", required: true, description: "Sale price in USDC" },
      { name: "payload", type: "object", required: true, description: "Redacted data payload" }
    ],
    response: {
      success: true,
      data: {
        saleId: "0x5678...",
        txHash: "0xefgh...",
        rewards: ["0x1111...", "0x2222..."],
        amounts: ["500", "500"],
        receiptCID: "QmXyz..."
      }
    }
  },
  {
    method: "GET",
    endpoint: "/api/receipts/:saleId",
    description: "Retrieve encrypted data access receipt from Lighthouse",
    parameters: [
      { name: "saleId", type: "string", required: true, description: "Sale transaction ID" }
    ],
    response: {
      success: true,
      data: {
        saleId: "0x5678...",
        controller: "0x1234...",
        buyer: "0xabcd...",
        datasetId: "orders:v1",
        fields: [/* redacted field data */],
        price: "1000000",
        currency: "USDC",
        split: { /* revenue split details */ },
        policyURI: "https://...",
        vcHash: "0x...",
        createdAt: 1640995200
      }
    }
  },
  {
    method: "GET",
    endpoint: "/api/graph/recommendations",
    description: "Get AI-powered product recommendations based on similarity graph",
    parameters: [
      { name: "user", type: "string", required: true, description: "User's wallet address" },
      { name: "limit", type: "number", required: false, description: "Number of recommendations (default: 10)" },
      { name: "category", type: "string", required: false, description: "Filter by product category" }
    ],
    response: {
      success: true,
      data: {
        recommendations: [
          {
            productId: "prod_123",
            title: "Wireless Earbuds Pro",
            confidence: 0.89,
            similarity: 0.72,
            reason: "Your friend Sarah bought these...",
            mutualConnections: 3
          }
        ],
        algorithm: "GraphSAGE",
        privacyScore: 9.2
      }
    }
  }
]

const sdkExamples = [
  {
    title: "Basic Integration",
    language: "javascript",
    code: `import { init, ensureConsent, sell } from "@desoc/data-dividend";

// Initialize the SDK
await init({
  rpcUrl: process.env.RPC_URL,
  contracts: {
    consent: "0x...",
    broker: "0x...",
    receipts: "0x..."
  },
  world: { appId: "app_123" }
});

// Request user consent
await ensureConsent(userWallet, {
  controller: merchantAddress,
  datasetId: "orders:v1",
  purpose: "ad_coop_lookalike",
  expiry: Date.now() + 365 * 24 * 60 * 60 * 1000
});

// Sell data when opportunity arises
const sale = await sell({
  buyer: "0xAmazon...",
  datasetId: "orders:v1",
  payload: redact(orderData),
  price: "1250000", // $1.25 in USDC
  paymentToken: "0xUSDC..."
});`
  },
  {
    title: "Advanced Configuration",
    language: "javascript",
    code: `import { DeSocSDK } from "@desoc/data-dividend";

const sdk = new DeSocSDK({
  rpcUrl: "https://mainnet.infura.io/v3/YOUR_KEY",
  contracts: {
    consent: "0xConsentRegistry...",
    broker: "0xDataBroker...",
    receipts: "0xLighthouseReceipts..."
  },
  world: { 
    appId: "app_123",
    action: "data-dividend"
  },
  lighthouse: {
    apiKey: "your-lighthouse-key",
    encryptionKey: "user-specific-key"
  }
});

// Custom consent with specific purposes
const consent = await sdk.requestConsent({
  datasetId: "analytics:v2",
  purposes: ["marketing", "analytics", "fraud_prevention"],
  retentionPeriod: 730, // days
  recipients: ["Amazon", "Google", "Meta"],
  dataCategories: ["behavioral", "demographic"]
});

// Batch data sales
const sales = await sdk.batchSell([
  {
    buyer: "0xAmazon...",
    datasetId: "orders:v1",
    payload: orderData,
    price: "1000000"
  },
  {
    buyer: "0xGoogle...",
    datasetId: "analytics:v2",
    payload: analyticsData,
    price: "750000"
  }
]);`
  },
  {
    title: "React Hook Integration",
    language: "javascript",
    code: `import { useDeSoc } from "@desoc/data-dividend/react";

function DataMonetizationComponent() {
  const {
    isConnected,
    connect,
    consents,
    earnings,
    sellData,
    requestConsent
  } = useDeSoc();

  const handleSellData = async (buyer, datasetId, payload, price) => {
    try {
      const sale = await sellData({
        buyer,
        datasetId,
        payload: redact(payload),
        price,
        paymentToken: "0xUSDC..."
      });
      
      console.log("Data sold:", sale.saleId);
      console.log("Earned:", sale.rewards);
    } catch (error) {
      console.error("Sale failed:", error);
    }
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <div>
          <h3>Your Data Dividends: {earnings.total} $DATA</h3>
          <button onClick={() => requestConsent("orders:v1")}>
            Grant Consent
          </button>
        </div>
      )}
    </div>
  );
}`
  }
]

const smartContracts = [
  {
    name: "ConsentRegistry",
    address: "0x1234...",
    description: "EIP-712 consent management with VC anchoring",
    functions: [
      "grant(Consent, bytes) - Grant new consent",
      "revoke(bytes32, bytes32) - Revoke existing consent",
      "isActive(address, address, bytes32, bytes32) - Check consent status"
    ]
  },
  {
    name: "DataBroker",
    address: "0x5678...",
    description: "Revenue splitting and $DATA token distribution",
    functions: [
      "sellData(Consent[], bytes[], bytes32, address, address, uint256, bytes) - Execute data sale",
      "getRewardRate(address) - Get user's reward multiplier",
      "updateMultipliers(address[], uint256[]) - Update reward multipliers"
    ]
  },
  {
    name: "LighthouseReceipts",
    address: "0x9abc...",
    description: "Immutable audit trail anchoring",
    functions: [
      "anchor(bytes32, string, bytes32) - Anchor receipt to IPFS",
      "getReceipt(bytes32) - Retrieve receipt metadata",
      "verifyReceipt(bytes32) - Verify receipt integrity"
    ]
  }
]

const BentoCard = ({ title, description, Component }: { title: string; description: string; Component: React.ComponentType<any> }) => (
  <Card className="group relative overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Component className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </CardContent>
  </Card>
)

export default function DocsPage() {
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
            Developer Documentation • API Reference • SDK Guide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Developer Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete technical documentation for integrating 
            <span className="font-semibold text-foreground"> Lightning Protocol</span> into your applications, 
            with comprehensive API references, SDK guides, and smart contract interfaces.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>
              Get up and running with Lightning Protocol in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">1. Install SDK</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Install the NPM package and initialize
                </p>
                <code className="bg-muted px-2 py-1 rounded text-xs">
                  npm install @desoc/data-dividend
                </code>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">2. Configure Consent</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up EIP-712 consent management
                </p>
                <code className="bg-muted px-2 py-1 rounded text-xs">
                  await ensureConsent(...)
                </code>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">3. Start Earning</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Monetize data with automatic rewards
                </p>
                <code className="bg-muted px-2 py-1 rounded text-xs">
                  await sell(&#123;...&#125;)
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SDK Examples */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              SDK Code Examples
            </CardTitle>
            <CardDescription>
              Real-world implementation examples for different use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {sdkExamples.map((example, index) => (
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

        {/* API Reference */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              REST API Reference
            </CardTitle>
            <CardDescription>
              Complete API documentation with request/response examples
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge 
                          variant={endpoint.method === 'GET' ? 'default' : 'secondary'}
                          className="font-mono"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-muted-foreground">{endpoint.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-3">Parameters</h5>
                      <div className="space-y-2">
                        {endpoint.parameters.map((param, paramIndex) => (
                          <div key={paramIndex} className="text-sm">
                            <div className="flex items-center gap-2">
                              <code className="font-mono">{param.name}</code>
                              <Badge variant="outline" className="text-xs">
                                {param.type}
                              </Badge>
                              {param.required && (
                                <Badge variant="destructive" className="text-xs">
                                  required
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground text-xs mt-1">
                              {param.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-3">Response</h5>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                        <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Contracts */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Smart Contract Interfaces
            </CardTitle>
            <CardDescription>
              On-chain contract addresses and function signatures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {smartContracts.map((contract, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{contract.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{contract.description}</p>
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {contract.address}
                      </code>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-3">Functions</h5>
                    <div className="space-y-2">
                      {contract.functions.map((func, funcIndex) => (
                        <div key={funcIndex} className="text-sm">
                          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">
                            {func}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Additional Resources
            </CardTitle>
            <CardDescription>
              Links to external documentation, tools, and community resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">EIP-712 Spec</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn about typed data signing
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read More
                </Button>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">World ID Docs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sybil-resistant identity verification
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read More
                </Button>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Lighthouse API</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Decentralized storage documentation
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read More
                </Button>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Code className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">GitHub Repo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Source code and examples
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
