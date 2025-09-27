"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Shield, 
  Eye, 
  Zap,
  Network,
  Target,
  BarChart3,
  Sparkles
} from "lucide-react"

const recommendations = [
  {
    id: 1,
    title: "Wireless Earbuds Pro",
    category: "Electronics",
    confidence: 0.89,
    reason: "Your friend Sarah bought these and you both have similar music preferences",
    mutualConnections: 3,
    price: "$199.99",
    image: "/placeholder.jpg",
    similarity: 0.72
  },
  {
    id: 2,
    title: "Organic Coffee Beans",
    category: "Food & Beverage",
    confidence: 0.76,
    reason: "Based on your purchase history and mutual connections' preferences",
    mutualConnections: 5,
    price: "$24.99",
    image: "/placeholder.jpg",
    similarity: 0.68
  },
  {
    id: 3,
    title: "Yoga Mat Premium",
    category: "Fitness",
    confidence: 0.82,
    reason: "Your network shows high interest in fitness products",
    mutualConnections: 7,
    price: "$79.99",
    image: "/placeholder.jpg",
    similarity: 0.75
  },
  {
    id: 4,
    title: "Smart Home Hub",
    category: "Home Automation",
    confidence: 0.71,
    reason: "Similar demographic and tech adoption patterns",
    mutualConnections: 2,
    price: "$149.99",
    image: "/placeholder.jpg",
    similarity: 0.65
  }
]

const graphMetrics = [
  {
    title: "Network Size",
    value: "1,247",
    description: "Total connected users in your similarity graph",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Average Similarity",
    value: "0.73",
    description: "Mean similarity score across your network",
    icon: <Target className="h-5 w-5" />
  },
  {
    title: "Recommendation Accuracy",
    value: "87%",
    description: "Historical accuracy of AI recommendations",
    icon: <Brain className="h-5 w-5" />
  },
  {
    title: "Privacy Score",
    value: "9.2/10",
    description: "Your data privacy protection level",
    icon: <Shield className="h-5 w-5" />
  }
]

const algorithmTypes = [
  {
    name: "GraphSAGE",
    description: "Graph neural network for node embeddings",
    accuracy: "89%",
    privacy: "High",
    speed: "Fast"
  },
  {
    name: "Node2Vec",
    description: "Random walk-based graph embedding",
    accuracy: "85%",
    privacy: "High",
    speed: "Very Fast"
  },
  {
    name: "Collaborative Filtering",
    description: "User-item interaction matrix factorization",
    accuracy: "82%",
    privacy: "Medium",
    speed: "Medium"
  },
  {
    name: "Content-Based",
    description: "Item feature similarity matching",
    accuracy: "78%",
    privacy: "High",
    speed: "Fast"
  }
]

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            AI-Powered • Privacy-Preserving • Graph-Based
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Similarity Graph & Recommendations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI model powered by 
            <span className="font-semibold text-foreground"> GraphSAGE</span> and 
            <span className="font-semibold text-foreground"> Node2Vec</span> algorithms 
            that suggest products based on mutual connections and privacy-preserving similarity matching.
          </p>
        </div>

        {/* Graph Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {graphMetrics.map((metric, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {metric.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </Card>
          ))}
        </div>

        {/* AI Recommendations */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized product suggestions based on your similarity graph and mutual connections
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{rec.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{rec.category}</Badge>
                        <Badge variant="secondary">
                          {Math.round(rec.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{rec.price}</p>
                      <p className="text-sm text-muted-foreground">
                        {rec.mutualConnections} mutual connections
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Similarity Score</span>
                        <span>{Math.round(rec.similarity * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${rec.similarity * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        View Product
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Configuration */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Algorithm Configuration
            </CardTitle>
            <CardDescription>
              Configure your recommendation engine parameters and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Algorithm Types</h4>
                <div className="space-y-3">
                  {algorithmTypes.map((algo, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{algo.name}</h5>
                        <Badge variant="outline">{algo.accuracy}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{algo.description}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Privacy: {algo.privacy}</span>
                        <span>Speed: {algo.speed}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Privacy Settings</h4>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Similarity Threshold: 0.72
                    </label>
                    <Slider 
                      defaultValue={[72]} 
                      max={100} 
                      step={1} 
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Higher values = more similar connections required
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Mutual Connections Required: 2
                    </label>
                    <Slider 
                      defaultValue={[2]} 
                      max={10} 
                      step={1} 
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum mutual connections for recommendations
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Data Retention: 90 days
                    </label>
                    <Slider 
                      defaultValue={[90]} 
                      max={365} 
                      step={7} 
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      How long to keep similarity data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy-Preserving AI
            </CardTitle>
            <CardDescription>
              Advanced privacy techniques ensure your data remains protected while enabling powerful recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Sparkles className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Differential Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Noise injection protects individual privacy while maintaining recommendation quality
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Network className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Federated Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Train models locally without sharing raw data across the network
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">Zero-Knowledge Proofs</h3>
                <p className="text-sm text-muted-foreground">
                  Prove similarity without revealing specific user data or connections
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
  )
}
