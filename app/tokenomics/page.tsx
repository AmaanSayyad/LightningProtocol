"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Coins, 
  TrendingUp, 
  Users, 
  DollarSign, 
  PieChart,
  Zap,
  Shield,
  Clock,
  Target,
  BarChart3
} from "lucide-react"

const tokenStats = [
  {
    title: "Total Supply",
    value: "1,000,000,000",
    subtitle: "$DATA",
    icon: <Coins className="h-5 w-5" />,
    color: "text-blue-600"
  },
  {
    title: "Circulating Supply",
    value: "247,500,000",
    subtitle: "$DATA (24.75%)",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-green-600"
  },
  {
    title: "Market Cap",
    value: "$12,375,000",
    subtitle: "USD",
    icon: <DollarSign className="h-5 w-5" />,
    color: "text-purple-600"
  },
  {
    title: "Active Holders",
    value: "15,247",
    subtitle: "Addresses",
    icon: <Users className="h-5 w-5" />,
    color: "text-orange-600"
  }
]

const distributionData = [
  {
    category: "Data Contributors",
    percentage: 60,
    amount: "600,000,000",
    description: "Users who contribute data and earn rewards",
    color: "bg-blue-500"
  },
  {
    category: "Platform Treasury",
    percentage: 20,
    amount: "200,000,000",
    description: "Protocol development and operations",
    color: "bg-green-500"
  },
  {
    category: "Liquidity Mining",
    percentage: 10,
    amount: "100,000,000",
    description: "DEX liquidity incentives",
    color: "bg-purple-500"
  },
  {
    category: "Team & Advisors",
    percentage: 7,
    amount: "70,000,000",
    description: "Core team and strategic advisors",
    color: "bg-orange-500"
  },
  {
    category: "Community Reserve",
    percentage: 3,
    amount: "30,000,000",
    description: "Community grants and partnerships",
    color: "bg-pink-500"
  }
]

const rewardMultipliers = [
  {
    factor: "Uniqueness Score",
    range: "0.8x - 1.0x",
    description: "World ID uniqueness verification prevents Sybil attacks",
    current: "0.95x"
  },
  {
    factor: "Privacy Score",
    range: "0.5x - 1.2x",
    description: "Higher rewards for privacy-preserving data sharing",
    current: "1.1x"
  },
  {
    factor: "Data Quality",
    range: "0.7x - 1.3x",
    description: "Reward based on data completeness and accuracy",
    current: "1.2x"
  },
  {
    factor: "Recency Weight",
    range: "0.8x - 1.1x",
    description: "Fresh data receives higher rewards",
    current: "1.0x"
  },
  {
    factor: "Network Effect",
    range: "0.9x - 1.5x",
    description: "Rewards increase with network participation",
    current: "1.3x"
  }
]

const vestingSchedule = [
  {
    phase: "Data Contributors",
    total: "600M",
    immediate: "10%",
    vesting: "90% over 2 years",
    cliff: "6 months"
  },
  {
    phase: "Platform Treasury",
    total: "200M",
    immediate: "5%",
    vesting: "95% over 4 years",
    cliff: "12 months"
  },
  {
    phase: "Team & Advisors",
    total: "70M",
    immediate: "0%",
    vesting: "100% over 3 years",
    cliff: "12 months"
  },
  {
    phase: "Liquidity Mining",
    total: "100M",
    immediate: "100%",
    vesting: "0%",
    cliff: "0 months"
  }
]

const recentRewards = [
  {
    user: "0x1a2b3c...",
    amount: "1,234 $DATA",
    multiplier: "1.15x",
    reason: "High privacy score + network effect",
    timestamp: "2 hours ago"
  },
  {
    user: "0x4d5e6f...",
    amount: "856 $DATA",
    multiplier: "0.95x",
    reason: "Standard uniqueness + data quality",
    timestamp: "4 hours ago"
  },
  {
    user: "0x7g8h9i...",
    amount: "2,147 $DATA",
    multiplier: "1.35x",
    reason: "Maximum network effect + privacy",
    timestamp: "6 hours ago"
  },
  {
    user: "0x0j1k2l...",
    amount: "743 $DATA",
    multiplier: "0.85x",
    reason: "Lower uniqueness score",
    timestamp: "8 hours ago"
  }
]

export default function TokenomicsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            ERC-20 • Deflationary • Utility Token
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            $DATA Tokenomics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Programmable revenue sharing through 
            <span className="font-semibold text-foreground"> ERC-20 $DATA tokens</span> with 
            deterministic distribution, anti-gaming multipliers, and 
            <span className="font-semibold text-foreground"> Sablier streaming</span> for sustainable rewards.
          </p>
        </div>

        {/* Token Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tokenStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          ))}
        </div>

        {/* Token Distribution */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Token Distribution
            </CardTitle>
            <CardDescription>
              Fair and sustainable token allocation across all stakeholders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {distributionData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.amount} $DATA
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{item.percentage}% of total supply</span>
                      <span>{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Distribution Principles</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>User-Centric:</strong> 60% allocated to data contributors</li>
                    <li>• <strong>Sustainable:</strong> 20% for long-term protocol development</li>
                    <li>• <strong>Liquid:</strong> 10% for DEX liquidity and trading</li>
                    <li>• <strong>Aligned:</strong> 7% for team with long vesting periods</li>
                    <li>• <strong>Community:</strong> 3% for grants and partnerships</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Key Features</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Deflationary mechanism through burning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>Instant rewards for data sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>Streaming rewards via Sablier</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span>Anti-gaming multipliers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reward Multipliers */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Dynamic Reward Multipliers
            </CardTitle>
            <CardDescription>
              Anti-gaming system with multiple factors determining reward amounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardMultipliers.map((multiplier, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{multiplier.factor}</h4>
                    <Badge variant="outline">{multiplier.current}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {multiplier.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Range: {multiplier.range}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vesting Schedule */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Vesting Schedule
            </CardTitle>
            <CardDescription>
              Long-term alignment through structured token release schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Phase</th>
                    <th className="text-left py-3 px-4">Total Allocation</th>
                    <th className="text-left py-3 px-4">Immediate Release</th>
                    <th className="text-left py-3 px-4">Vesting Period</th>
                    <th className="text-left py-3 px-4">Cliff Period</th>
                  </tr>
                </thead>
                <tbody>
                  {vestingSchedule.map((phase, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-medium">{phase.phase}</td>
                      <td className="py-3 px-4">{phase.total} $DATA</td>
                      <td className="py-3 px-4">{phase.immediate}</td>
                      <td className="py-3 px-4">{phase.vesting}</td>
                      <td className="py-3 px-4">{phase.cliff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Rewards */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Reward Distribution
            </CardTitle>
            <CardDescription>
              Live feed of $DATA token rewards being distributed to data contributors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Coins className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{reward.user}</p>
                      <p className="text-sm text-muted-foreground">{reward.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{reward.amount}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{reward.multiplier}</Badge>
                      <span className="text-sm text-muted-foreground">{reward.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Token Utility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              $DATA Token Utility
            </CardTitle>
            <CardDescription>
              Multiple use cases and value accrual mechanisms for $DATA token holders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Data Dividends</h3>
                <p className="text-sm text-muted-foreground">
                  Earn rewards when your data is monetized by merchants
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Governance Rights</h3>
                <p className="text-sm text-muted-foreground">
                  Vote on protocol parameters and future development
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Premium Features</h3>
                <p className="text-sm text-muted-foreground">
                  Access advanced analytics and recommendation features
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Staking Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Stake tokens to earn additional rewards and boost multipliers
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <BarChart3 className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Fee Discounts</h3>
                <p className="text-sm text-muted-foreground">
                  Reduced platform fees for $DATA token holders
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Early Access</h3>
                <p className="text-sm text-muted-foreground">
                  Priority access to new features and data monetization opportunities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
