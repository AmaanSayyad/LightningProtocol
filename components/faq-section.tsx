"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "What is Lightning Protocol and who is it for?",
    answer:
      "🚀 Lightning Protocol is a decentralized social layer for data incentivization that enables users to earn ERC-20 tokens ($DATA) when their first-party data is monetized by commerce apps. It's for anyone who wants to be fairly compensated for their valuable data contributions while maintaining privacy and control.",
  },
  {
    question: "What problems does Lightning Protocol solve?",
    answer:
      "Lightning Protocol addresses the fundamental issue of data exploitation: companies like Flipkart and Amazon monetize user data without sharing revenue. We solve this by creating a transparent, consent-based system where users earn $DATA tokens whenever their data is sold, backed by cryptographic proofs and privacy-preserving technologies.",
  },
  {
    question: "How does Lightning Protocol work?",
    answer:
      "Users connect their wallets and provide EIP-712 consent for data monetization. When commerce apps sell user data, our 10-line NPM SDK automatically triggers revenue splitting. Smart contracts distribute $DATA tokens to users, while Lighthouse stores encrypted receipts on IPFS. World ID ensures Sybil resistance, and Self Protocol manages verifiable credentials.",
  },
  {
    question: "What makes Lightning Protocol privacy-preserving?",
    answer:
      "Lightning Protocol uses HMAC-SHA256 with per-partner pepper and user salt for PII protection. Data is encrypted before storage on Lighthouse IPFS, and users maintain full control over access. Our AI recommendation system uses privacy-preserving similarity matching without exposing raw data, ensuring complete user privacy.",
  },
  {
    question: "What technology powers Lightning Protocol?",
    answer:
      "Lightning Protocol is built on cutting-edge Web3 primitives: EIP-712 for consent management, World ID for Sybil-resistant identity verification, Lighthouse for encrypted data storage, Self Protocol for verifiable credentials, GraphSAGE/Node2Vec for AI recommendations, and ERC-20 smart contracts for $DATA token distribution.",
  },
  {
    question: "What future features will Lightning Protocol offer?",
    answer:
      "We plan to expand with advanced features including cross-chain data monetization, enhanced AI recommendation algorithms, enterprise white-label solutions, custom tokenomics for different industries, integration with more commerce platforms, and advanced privacy-preserving analytics for better user insights.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words">
            Frequently Asked Questions
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            Everything you need to know about Lightning Protocol and how it enables fair data monetization
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}
