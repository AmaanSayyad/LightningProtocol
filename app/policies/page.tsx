"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Users,
  Lock,
  Eye,
  Download,
  Edit,
  Trash2
} from "lucide-react"

const complianceStatus = [
  {
    principle: "Purpose Limitation",
    status: "compliant",
    description: "Data collected for specific, legitimate purposes only",
    lastAudit: "2024-01-15",
    score: 95
  },
  {
    principle: "Data Minimization",
    status: "compliant",
    description: "Only necessary data collected and processed",
    lastAudit: "2024-01-15",
    score: 92
  },
  {
    principle: "Consent Management",
    status: "compliant",
    description: "EIP-712 based consent with clear purpose and scope",
    lastAudit: "2024-01-14",
    score: 98
  },
  {
    principle: "Data Subject Rights",
    status: "compliant",
    description: "Users can access, rectify, and delete their data",
    lastAudit: "2024-01-13",
    score: 89
  },
  {
    principle: "Data Residency",
    status: "warning",
    description: "Some data stored outside India - migration in progress",
    lastAudit: "2024-01-10",
    score: 75
  },
  {
    principle: "Breach Notification",
    status: "compliant",
    description: "Automated breach detection and notification system",
    lastAudit: "2024-01-12",
    score: 96
  }
]

const dataCategories = [
  {
    name: "Personal Identifiers",
    description: "Email, phone, address, name",
    sensitivity: "High",
    retention: "365 days",
    purpose: "User authentication and communication",
    recipients: ["Internal systems", "Email providers"]
  },
  {
    name: "Behavioral Data",
    description: "Browsing patterns, click behavior, session data",
    sensitivity: "Medium",
    retention: "180 days",
    purpose: "Personalization and analytics",
    recipients: ["Analytics platforms", "ML models"]
  },
  {
    name: "Transaction Data",
    description: "Purchase history, payment methods, order details",
    sensitivity: "High",
    retention: "730 days",
    purpose: "Order processing and fraud prevention",
    recipients: ["Payment processors", "Fraud detection"]
  },
  {
    name: "Preference Data",
    description: "Product preferences, interests, demographics",
    sensitivity: "Medium",
    retention: "365 days",
    purpose: "Recommendation engine and marketing",
    recipients: ["Recommendation systems", "Ad platforms"]
  },
  {
    name: "Device Data",
    description: "IP address, device type, browser information",
    sensitivity: "Low",
    retention: "90 days",
    purpose: "Security and analytics",
    recipients: ["Security systems", "Analytics platforms"]
  }
]

const consentTemplates = [
  {
    id: "basic_marketing",
    name: "Basic Marketing Consent",
    description: "Standard consent for marketing communications and data sharing",
    version: "v2.1",
    lastUpdated: "2024-01-10",
    status: "active",
    usage: 1247
  },
  {
    id: "analytics_consent",
    name: "Analytics & Insights Consent",
    description: "Consent for behavioral analytics and business intelligence",
    version: "v1.8",
    lastUpdated: "2024-01-08",
    status: "active",
    usage: 892
  },
  {
    id: "third_party_sharing",
    name: "Third-Party Data Sharing",
    description: "Consent for sharing data with advertising partners",
    version: "v3.0",
    lastUpdated: "2024-01-12",
    status: "draft",
    usage: 0
  },
  {
    id: "fraud_prevention",
    name: "Fraud Prevention Consent",
    description: "Consent for cross-platform fraud detection",
    version: "v1.5",
    lastUpdated: "2024-01-05",
    status: "active",
    usage: 634
  }
]

const auditLog = [
  {
    id: "AUD-001",
    action: "Consent Granted",
    user: "0x1a2b3c...",
    template: "Basic Marketing Consent",
    timestamp: "2024-01-15 14:30:25",
    ip: "192.168.1.100",
    status: "success"
  },
  {
    id: "AUD-002",
    action: "Data Access Request",
    user: "0x4d5e6f...",
    template: "Data Subject Rights",
    timestamp: "2024-01-15 13:45:12",
    ip: "192.168.1.101",
    status: "success"
  },
  {
    id: "AUD-003",
    action: "Consent Revoked",
    user: "0x7g8h9i...",
    template: "Analytics & Insights Consent",
    timestamp: "2024-01-15 12:20:45",
    ip: "192.168.1.102",
    status: "success"
  },
  {
    id: "AUD-004",
    action: "Policy Update",
    user: "admin@desoc.com",
    template: "Third-Party Data Sharing",
    timestamp: "2024-01-15 11:15:30",
    ip: "192.168.1.103",
    status: "success"
  },
  {
    id: "AUD-005",
    action: "Data Deletion Request",
    user: "0x0j1k2l...",
    template: "Data Subject Rights",
    timestamp: "2024-01-15 10:30:15",
    ip: "192.168.1.104",
    status: "pending"
  }
]

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            DPDP Act 2023 • GDPR • CCPA Compliant
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Privacy Policy Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive compliance framework with 
            <span className="font-semibold text-foreground"> India's Digital Personal Data Protection Act 2023</span>, 
            built-in consent management, and automated audit trails for complete regulatory compliance.
          </p>
        </div>

        {/* Compliance Overview */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              DPDP Act 2023 Compliance Status
            </CardTitle>
            <CardDescription>
              Real-time compliance monitoring across all data protection principles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceStatus.map((item, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">{item.principle}</h4>
                    <Badge 
                      variant={item.status === 'compliant' ? 'default' : 'destructive'}
                      className="flex items-center gap-1"
                    >
                      {item.status === 'compliant' ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span className="font-semibold">{item.score}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.score >= 90 ? 'bg-green-500' : 
                          item.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last audit: {item.lastAudit}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Categories */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Data Categories & Classification
            </CardTitle>
            <CardDescription>
              Granular data classification with purpose limitation and retention policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataCategories.map((category, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
                      <p className="text-muted-foreground mb-3">{category.description}</p>
                    </div>
                    <Badge 
                      variant={
                        category.sensitivity === 'High' ? 'destructive' :
                        category.sensitivity === 'Medium' ? 'secondary' : 'outline'
                      }
                    >
                      {category.sensitivity} Sensitivity
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Retention Period:</span>
                      <p className="text-muted-foreground">{category.retention}</p>
                    </div>
                    <div>
                      <span className="font-medium">Purpose:</span>
                      <p className="text-muted-foreground">{category.purpose}</p>
                    </div>
                    <div>
                      <span className="font-medium">Recipients:</span>
                      <p className="text-muted-foreground">{category.recipients.join(", ")}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consent Templates */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Consent Templates
                </CardTitle>
                <CardDescription>
                  Pre-built consent templates for different data processing scenarios
                </CardDescription>
              </div>
              <Button>Create New Template</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consentTemplates.map((template, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{template.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={template.status === 'active' ? 'default' : 'secondary'}
                      >
                        {template.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{template.usage.toLocaleString()}</TableCell>
                    <TableCell>{template.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Audit Log */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Audit Log
            </CardTitle>
            <CardDescription>
              Complete audit trail of all privacy-related actions and consent changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLog.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {log.user} • {log.template}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={log.status === 'success' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {log.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{log.id}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {log.timestamp} • {log.ip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
  )
}