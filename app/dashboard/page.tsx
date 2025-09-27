"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  FileText, 
  Shield, 
  Eye, 
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Settings,
  Bell,
  Wallet,
  Lock,
  Globe,
  Sparkles
} from "lucide-react"

const stats = [
  {
    title: "Total $DATA Earned",
    value: "12,847.32",
    currency: "$DATA",
    change: "+12.5%",
    changeValue: "+1,423.45",
    icon: <DollarSign className="h-5 w-5" />,
    color: "text-green-600",
    trend: "up"
  },
  {
    title: "Active Data Streams",
    value: "47",
    change: "+8.2%",
    changeValue: "+3 new",
    icon: <Activity className="h-5 w-5" />,
    color: "text-blue-600",
    trend: "up"
  },
  {
    title: "Partner Platforms",
    value: "23",
    change: "+3 new",
    changeValue: "This week",
    icon: <Globe className="h-5 w-5" />,
    color: "text-purple-600",
    trend: "up"
  },
  {
    title: "Lighthouse Receipts",
    value: "1,247",
    change: "+156",
    changeValue: "This week",
    icon: <FileText className="h-5 w-5" />,
    color: "text-orange-600",
    trend: "up"
  }
]

const recentSales = [
  {
    id: "0x1a2b3c...",
    buyer: "Amazon Advertising",
    dataset: "purchase_history",
    amount: "$45.67",
    tokens: "1,234 $DATA",
    status: "completed",
    timestamp: "2 hours ago",
    receipt: "0x4d5e6f...",
    platform: "E-commerce",
    privacyScore: 95
  },
  {
    id: "0x7g8h9i...",
    buyer: "Google Ads",
    dataset: "behavioral_analytics",
    amount: "$23.45",
    tokens: "634 $DATA",
    status: "pending",
    timestamp: "4 hours ago",
    receipt: "0x1j2k3l...",
    platform: "Search",
    privacyScore: 88
  },
  {
    id: "0x0m1n2o...",
    buyer: "Meta Platforms",
    dataset: "social_preferences",
    amount: "$67.89",
    tokens: "1,856 $DATA",
    status: "completed",
    timestamp: "1 day ago",
    receipt: "0x5p6q7r...",
    platform: "Social",
    privacyScore: 92
  },
  {
    id: "0x8s9t0u...",
    buyer: "TikTok Ads",
    dataset: "content_preferences",
    amount: "$34.12",
    tokens: "923 $DATA",
    status: "processing",
    timestamp: "2 days ago",
    receipt: "0x2v3w4x...",
    platform: "Entertainment",
    privacyScore: 89
  },
  {
    id: "0x9x0y1z...",
    buyer: "Shopify Analytics",
    dataset: "shopping_patterns",
    amount: "$28.90",
    tokens: "782 $DATA",
    status: "completed",
    timestamp: "3 days ago",
    receipt: "0x3a4b5c...",
    platform: "E-commerce",
    privacyScore: 94
  }
]

const dataTypes = [
  {
    name: "Purchase History",
    value: "$1,234.56",
    tokens: "3,456 $DATA",
    percentage: 43.4,
    recipients: 12,
    lastSale: "2 hours ago",
    trend: "+15.2%",
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    name: "Behavioral Analytics",
    value: "$987.65",
    tokens: "2,789 $DATA",
    percentage: 34.7,
    recipients: 8,
    lastSale: "5 hours ago",
    trend: "+8.7%",
    icon: <Activity className="h-4 w-4" />
  },
  {
    name: "Social Preferences",
    value: "$456.78",
    tokens: "1,234 $DATA",
    percentage: 16.1,
    recipients: 15,
    lastSale: "1 day ago",
    trend: "+3.2%",
    icon: <Users className="h-4 w-4" />
  },
  {
    name: "Content Preferences",
    value: "$170.33",
    tokens: "456 $DATA",
    percentage: 6.0,
    recipients: 6,
    lastSale: "3 days ago",
    trend: "-2.1%",
    icon: <PieChart className="h-4 w-4" />
  }
]

const quickActions = [
  {
    title: "Grant New Consent",
    description: "Authorize data sharing with new platforms",
    icon: <Shield className="h-6 w-6" />,
    color: "bg-blue-500 hover:bg-blue-600",
    action: "consent"
  },
  {
    title: "View Receipts",
    description: "Browse encrypted Lighthouse receipts",
    icon: <FileText className="h-6 w-6" />,
    color: "bg-green-500 hover:bg-green-600",
    action: "receipts"
  },
  {
    title: "Manage Privacy",
    description: "Configure data sharing preferences",
    icon: <Settings className="h-6 w-6" />,
    color: "bg-purple-500 hover:bg-purple-600",
    action: "privacy"
  },
  {
    title: "Download Data",
    description: "Export your data monetization history",
    icon: <Download className="h-6 w-6" />,
    color: "bg-orange-500 hover:bg-orange-600",
    action: "download"
  }
]

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Lightning Protocol Dashboard
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Monitor your <span className="font-semibold text-primary">$DATA token earnings</span>, track Lighthouse receipts, and manage your decentralized data economy participation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Wallet Status */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Wallet Connected</h3>
              <p className="text-sm text-muted-foreground">0x1a2b3c...9x0y1z • World ID Verified</p>
            </div>
            <div className="ml-auto">
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-card border border-border">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <Badge variant="outline" className={stat.color}>
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                  {stat.currency && (
                    <p className="text-sm text-muted-foreground">{stat.currency}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.changeValue}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Sales */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Recent Data Sales
                </CardTitle>
                <CardDescription>
                  Latest data monetization transactions with Lighthouse receipt tracking
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {sale.status === 'completed' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                       sale.status === 'pending' ? <Clock className="h-5 w-5 text-yellow-600" /> :
                       sale.status === 'processing' ? <RefreshCw className="h-5 w-5 text-blue-600" /> :
                       <AlertCircle className="h-5 w-5 text-red-600" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{sale.buyer}</h4>
                        <Badge variant="outline" className="text-xs">{sale.platform}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{sale.dataset}</p>
                      <p className="text-xs text-muted-foreground font-mono">{sale.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold text-lg">{sale.amount}</p>
                      <p className="text-sm text-muted-foreground">{sale.tokens}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          sale.status === 'completed' ? 'default' : 
                          sale.status === 'pending' ? 'secondary' : 
                          sale.status === 'processing' ? 'outline' : 'destructive'
                        }
                        className="mb-1"
                      >
                        {sale.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{sale.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Privacy Score</p>
                        <p className="text-sm font-semibold text-green-600">{sale.privacyScore}%</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Type Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Data Type Revenue
              </CardTitle>
              <CardDescription>
                Breakdown of earnings by data category with privacy scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dataTypes.map((type, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-primary/10 rounded">
                          {type.icon}
                        </div>
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-lg">{type.value}</span>
                        <p className="text-xs text-muted-foreground">{type.tokens}</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${type.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{type.percentage}% of total</span>
                        <span className="text-muted-foreground">{type.recipients} recipients</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {type.trend.startsWith('+') ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-600" />
                        )}
                        <span className={type.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {type.trend}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last sale: {type.lastSale}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Lighthouse Receipts
              </CardTitle>
              <CardDescription>
                Encrypted data access receipts stored on IPFS/Filecoin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                  <div>
                    <h4 className="font-semibold text-lg">Total Receipts</h4>
                    <p className="text-sm text-muted-foreground">1,247 encrypted receipts</p>
                  </div>
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">This Week</p>
                    <p className="text-2xl font-bold text-green-600">+156</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">This Month</p>
                    <p className="text-2xl font-bold text-blue-600">+892</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Storage Used</p>
                    <p className="text-2xl font-bold text-purple-600">2.3 GB</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Avg. Size</p>
                    <p className="text-2xl font-bold text-orange-600">1.8 MB</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Receipts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Quick Actions</h2>
          <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Manage your data sharing preferences and monitor your decentralized data economy participation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="text-center space-y-4">
                  <div className={`p-4 rounded-xl ${action.color} text-white mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    {action.title}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  )
}
