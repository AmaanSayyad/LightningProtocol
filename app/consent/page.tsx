"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, CheckCircle, Clock, AlertTriangle, Globe, Lock, FileText } from "lucide-react"

const consentTypes = [
  {
    id: "ad_coop_lookalike",
    name: "Advertising Co-op & Lookalike Audiences",
    description: "Allow data sharing for collaborative advertising and lookalike audience creation",
    purpose: "Marketing and advertising optimization",
    retention: "365 days",
    recipients: ["Amazon", "Google", "Meta", "TikTok"]
  },
  {
    id: "analytics_insights",
    name: "Analytics & Business Insights",
    description: "Share anonymized data for market research and business intelligence",
    purpose: "Market research and analytics",
    retention: "730 days",
    recipients: ["Nielsen", "Kantar", "McKinsey", "Deloitte"]
  },
  {
    id: "fraud_prevention",
    name: "Fraud Prevention & Security",
    description: "Cross-platform fraud detection and security enhancement",
    purpose: "Security and fraud prevention",
    retention: "1095 days",
    recipients: ["Sift", "Forter", "Kount", "Signifyd"]
  },
  {
    id: "personalization",
    name: "Personalization & Recommendations",
    description: "Improve product recommendations and user experience",
    purpose: "Product personalization",
    retention: "180 days",
    recipients: ["Recommendation engines", "ML platforms"]
  }
]

const consentStatuses = [
  {
    id: "active",
    name: "Active Consents",
    count: 12,
    description: "Currently active data sharing agreements",
    color: "text-green-600"
  },
  {
    id: "expired",
    name: "Expired Consents",
    count: 3,
    description: "Consents that have reached their expiry date",
    color: "text-yellow-600"
  },
  {
    id: "revoked",
    name: "Revoked Consents",
    count: 1,
    description: "User-revoked data sharing permissions",
    color: "text-red-600"
  },
  {
    id: "pending",
    name: "Pending Approval",
    count: 2,
    description: "Awaiting user signature and World ID verification",
    color: "text-blue-600"
  }
]

export default function ConsentPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            EIP-712 + Self Protocol + World ID
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Consent Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cryptographically verifiable consent artifacts with 
            <span className="font-semibold text-foreground"> Self Protocol VC anchors</span> for 
            portable, standard-aligned permissions and 
            <span className="font-semibold text-foreground"> World ID</span> Sybil-resistance.
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {consentStatuses.map((status) => (
            <Card key={status.id} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{status.name}</h3>
                <span className={`text-2xl font-bold ${status.color}`}>
                  {status.count}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{status.description}</p>
            </Card>
          ))}
        </div>

        {/* Consent Types */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Available Consent Types
            </CardTitle>
            <CardDescription>
              Granular consent management with purpose limitation and data minimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {consentTypes.map((consent) => (
                <Card key={consent.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{consent.name}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{consent.description}</p>
                    </div>
                    <Badge variant="outline">{consent.retention}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Purpose</Label>
                      <p className="text-sm">{consent.purpose}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Recipients</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {consent.recipients.map((recipient, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {recipient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    Request Consent
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* EIP-712 Implementation */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              EIP-712 Consent Structure
            </CardTitle>
            <CardDescription>
              Standardized consent artifacts with cryptographic verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Typed Data Structure</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "EIP712Domain": [
    {"name":"name","type":"string"},
    {"name":"version","type":"string"},
    {"name":"chainId","type":"uint256"},
    {"name":"verifyingContract","type":"address"}
  ],
  "PrimaryType": "Consent",
  "Types": {
    "Consent": [
      {"name":"subject","type":"address"},
      {"name":"controller","type":"address"},
      {"name":"datasetId","type":"bytes32"},
      {"name":"purpose","type":"bytes32"},
      {"name":"issuedAt","type":"uint64"},
      {"name":"expiry","type":"uint64"},
      {"name":"nonce","type":"uint96"}
    ]
  }
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Security Features</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Replay Protection</h5>
                      <p className="text-sm text-muted-foreground">Nonce and expiry prevent replay attacks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Cryptographic Verification</h5>
                      <p className="text-sm text-muted-foreground">EIP-712 signatures ensure authenticity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium">World ID Integration</h5>
                      <p className="text-sm text-muted-foreground">Sybil-resistant identity verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Self Protocol VCs</h5>
                      <p className="text-sm text-muted-foreground">Portable verifiable credentials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent Request Form */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Request New Consent</CardTitle>
            <CardDescription>
              Create a new consent request with EIP-712 signature and World ID verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="datasetId">Dataset ID</Label>
                  <Input id="datasetId" placeholder="e.g., orders:v1" />
                </div>
                <div>
                  <Label htmlFor="purpose">Purpose</Label>
                  <Input id="purpose" placeholder="e.g., ad_coop_lookalike" />
                </div>
                <div>
                  <Label htmlFor="expiry">Expiry (days)</Label>
                  <Input id="expiry" type="number" placeholder="365" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the data sharing purpose and scope..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="recipients">Data Recipients</Label>
                  <Textarea 
                    id="recipients" 
                    placeholder="List of companies/platforms that will receive data..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button>Generate EIP-712 Signature</Button>
              <Button variant="outline">Preview Consent</Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              DPDP Act 2023 Compliance
            </CardTitle>
            <CardDescription>
              Built-in compliance with India's Digital Personal Data Protection Act
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Purpose Limitation</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Specific, legitimate purpose</li>
                  <li>• No secondary processing</li>
                  <li>• Clear scope definition</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Data Minimization</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Only necessary data</li>
                  <li>• Anonymized when possible</li>
                  <li>• Retention limits enforced</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">User Rights</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Right to withdraw</li>
                  <li>• Data portability</li>
                  <li>• Grievance redressal</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
