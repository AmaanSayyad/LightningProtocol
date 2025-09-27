"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Copy, CheckCircle, Shield, Zap, Globe, Lock } from "lucide-react"

const codeExample = `import { init, ensureConsent, sell } from "@desoc/data-dividend";

await init({
  rpcUrl: process.env.RPC,
  contracts: { 
    consent: CONSENT_ADDR, 
    broker: BROKER_ADDR, 
    receipts: RECEIPTS_ADDR 
  },
  world: { appId: WORLD_APP_ID }
});

await ensureConsent(userWallet, {
  controller: merchantAddress, 
  datasetId: id("orders:v1"), 
  purpose: id("ad_coop_lookalike"), 
  expiry: days(365)
});

const sale = await sell({ 
  buyer: AMAZON_ADDR, 
  datasetId: id("orders:v1"),
  payload: redact(order), // HMAC+salt in SDK
  price: toUSDC(1.25), 
  paymentToken: USDC, 
  upload: "lighthouse-encrypted" 
});`

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "10-Line Integration",
    description: "Minimal NPM wrapper that transforms any commerce app into a data dividend platform with just 10 lines of code."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "EIP-712 Consent Management",
    description: "Cryptographically verifiable consent artifacts with Self Protocol VC anchors for portable, standard-aligned permissions."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "World ID Integration",
    description: "Sybil-resistant identity verification ensuring one human, one reward through semaphore-style nullifier proofs."
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Lighthouse Receipts",
    description: "Tamper-evident audit trail with encrypted data access receipts stored on IPFS/Filecoin for complete transparency."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "ERC-20 Rewards",
    description: "Programmable $DATA token payouts with deterministic revenue sharing and anti-gaming multipliers."
  }
]

export default function SDKPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            ETHGlobal New Delhi — Lighthouse × World ID Chain × Self Protocol
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            NPM SDK Integration
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform any commerce application into a data dividend platform with our 
            <span className="font-semibold text-foreground"> drop-in NPM wrapper</span>. 
            Just 10 lines of code to enable verifiable consent, encrypted receipts, and on-chain rewards.
          </p>
        </div>

        {/* Code Example */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  10-Line Integration Example
                </CardTitle>
                <CardDescription>
                  Complete implementation for Flipkart-like e-commerce platforms
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-sm">
              <code>{codeExample}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Technical Architecture */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Technical Architecture</CardTitle>
            <CardDescription>
              Built on cutting-edge Web3 primitives for maximum security and interoperability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Smart Contract Layer</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>ConsentRegistry:</strong> EIP-712 consent management with VC anchoring</li>
                  <li>• <strong>DataBroker:</strong> Revenue splitting and $DATA token distribution</li>
                  <li>• <strong>LighthouseReceipts:</strong> Immutable audit trail anchoring</li>
                  <li>• <strong>WorldIDVerifier:</strong> Sybil-resistant identity verification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Privacy & Security</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>PII Protection:</strong> HMAC-SHA256 with per-partner pepper + user salt</li>
                  <li>• <strong>Encrypted Storage:</strong> Lighthouse IPFS with user-controlled access</li>
                  <li>• <strong>Consent Revocation:</strong> Real-time tombstone enforcement</li>
                  <li>• <strong>Audit Trail:</strong> Complete data access receipt history</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Steps */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Integration Steps</CardTitle>
            <CardDescription>
              Get your commerce platform earning data dividends in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Install NPM Package",
                  description: "npm install @desoc/data-dividend",
                  code: "npm install @desoc/data-dividend"
                },
                {
                  step: "2",
                  title: "Initialize SDK",
                  description: "Configure contracts, RPC endpoints, and World ID app",
                  code: "await init({ rpcUrl, contracts, world })"
                },
                {
                  step: "3",
                  title: "Request Consent",
                  description: "EIP-712 signature flow with purpose and scope definition",
                  code: "await ensureConsent(userWallet, consentParams)"
                },
                {
                  step: "4",
                  title: "Monetize Data",
                  description: "Sell data with automatic revenue splitting and receipt generation",
                  code: "await sell({ buyer, datasetId, payload, price })"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{item.code}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Data Strategy?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the decentralized data economy and start paying your users for their valuable data contributions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Get Started with SDK
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
