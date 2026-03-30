"use client";

import React, { useState } from "react";
import { 
  Instagram, 
  Youtube, 
  Link2, 
  Plus, 
  X, 
  ChevronLeft, 
  Copy, 
  Check,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Step = "select-platform" | "enter-username" | "verify-code";
type PlatformId = "instagram" | "youtube";

type Account = {
  id: string;
  platform: PlatformId;
  username: string;
  status: "verified" | "pending";
  verificationCode: string;
};

const PLATFORMS: { id: PlatformId; name: string; icon: React.ElementType }[] = [
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "youtube", name: "YouTube", icon: Youtube }
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<Step>("select-platform");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | null>(null);
  const [username, setUsername] = useState("");
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateCode = () => `CR${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const openModal = () => {
    setIsModalOpen(true);
    setStep("select-platform");
    setSelectedPlatform(null);
    setUsername("");
    setActiveAccountId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePlatformSelect = (platform: PlatformId) => {
    setSelectedPlatform(platform);
  };

  const handleContinue = () => {
    if (step === "select-platform" && selectedPlatform) {
      setStep("enter-username");
    } else if (step === "enter-username" && username) {
      const newId = Math.random().toString(36).substring(7);
      const code = generateCode();
      const newAccount: Account = {
        id: newId,
        platform: selectedPlatform!,
        username: username,
        status: "pending",
        verificationCode: code
      };
      setAccounts([...accounts, newAccount]);
      setActiveAccountId(newId);
      setStep("verify-code");
    } else if (step === "verify-code") {
      // Mark as verified
      setAccounts(prev => prev.map(acc => 
        acc.id === activeAccountId ? { ...acc, status: "verified" as const } : acc
      ));
      closeModal();
    }
  };

  const resumeVerification = (account: Account) => {
    setSelectedPlatform(account.platform);
    setUsername(account.username);
    setActiveAccountId(account.id);
    setStep("verify-code");
    setIsModalOpen(true);
  };

  const handleUnlink = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const handleBack = () => {
    if (step === "enter-username") {
      setStep("select-platform");
    } else if (step === "verify-code") {
      setStep("enter-username");
    }
  };

  const activeAccount = accounts.find(a => a.id === activeAccountId);
  const currentCode = activeAccount ? activeAccount.verificationCode : "CR0DPJCI";

  const groupedAccounts = PLATFORMS.map(p => ({
    platform: p,
    items: accounts.filter(a => a.platform === p.id)
  })).filter(g => g.items.length > 0);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Linked Accounts</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Connect and verify your social media accounts to submit videos to campaigns
          </p>
        </div>
        <button 
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 border border-[#d4af37]/50 text-[#d4af37] rounded-lg hover:bg-[#d4af37]/10 transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Add Account
        </button>
      </div>

      {/* Main Content */}
      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center space-y-6">
          <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center border border-[#d4af37]/20">
            <Link2 className="text-[#d4af37]" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">No Linked Accounts</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              Connect your social media accounts to start submitting videos to campaigns
            </p>
          </div>
          <button 
            onClick={openModal}
            className="flex items-center gap-2 px-6 py-3 bg-[#d4af37]/10 border border-[#d4af37]/50 text-[#d4af37] rounded-xl hover:bg-[#d4af37]/20 transition-all font-semibold"
          >
            <Plus size={20} />
            Add Your First Account
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedAccounts.map((group) => (
            <div key={group.platform.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Group Header */}
              <div className="px-6 py-4 flex items-center gap-3 border-b border-border bg-muted/30">
                <div className="p-2 bg-background rounded-lg border border-border">
                  <group.platform.icon size={18} />
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-lg">{group.platform.name}</h3>
                  <span className="text-xs text-muted-foreground">{group.items.length} {group.items.length === 1 ? 'account' : 'accounts'}</span>
                </div>
              </div>
              {/* Group Items */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((acc) => (
                  <div key={acc.id} className="p-5 bg-background border border-border rounded-xl space-y-4 hover:border-[#d4af37]/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">@{acc.username}</span>
                        <ExternalLink size={14} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {acc.status === "pending" ? (
                        <p className="text-[11px] font-medium text-orange-500">Pending verification</p>
                      ) : (
                        <p className="text-[11px] font-medium text-green-500">Verified</p>
                      )}
                      
                      <div className="flex gap-2">
                        {acc.status === "pending" && (
                          <button 
                            onClick={() => resumeVerification(acc)}
                            className="flex-1 py-1.5 bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold rounded-lg hover:bg-[#d4af37]/20 transition-colors"
                          >
                            Verify
                          </button>
                        )}
                        <button 
                          onClick={() => handleUnlink(acc.id)}
                          className="flex-1 py-1.5 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          Unlink
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] bg-card border border-border rounded-3xl shadow-2xl z-[101] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  {(step === 'enter-username' || step === 'verify-code') && (
                    <button onClick={handleBack} className="text-muted-foreground hover:text-foreground transition-colors">
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h3 className="text-xl font-bold">
                    {step === 'select-platform' ? 'Verify Platform' : 'Connect Account'}
                  </h3>
                </div>
                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 pt-8">
                {step === 'select-platform' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {PLATFORMS.map((p) => (
                        <button 
                          key={p.id}
                          onClick={() => handlePlatformSelect(p.id)}
                          className={cn(
                            "relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all",
                            selectedPlatform === p.id 
                              ? "bg-[#d4af37]/10 border-[#d4af37] shadow-lg" 
                              : "bg-muted/30 border-border hover:border-[#d4af37]/50"
                          )}
                        >
                          {selectedPlatform === p.id && (
                            <div className="absolute top-2 right-2">
                              <Check size={14} className="text-[#d4af37]" />
                            </div>
                          )}
                          <div className="w-10 h-10 flex items-center justify-center">
                            <p.icon size={28} />
                          </div>
                          <span className="font-semibold text-sm">{p.name}</span>
                        </button>
                      ))}
                    </div>
                    <Button 
                      disabled={!selectedPlatform}
                      onClick={handleContinue}
                      className="w-full h-12 bg-[#d4af37] hover:bg-[#c9a332] text-black font-bold rounded-xl text-base disabled:opacity-50"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {step === 'enter-username' && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-md font-semibold capitalize mb-3 block px-2">{selectedPlatform} username</label>
                      <div className="relative">
                        <Input 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="John doe"
                          className="h-14 bg-background border-border rounded-xl px-4 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] placeholder:text-muted-foreground"
                        />
                      </div>
                      <p className="text-muted-foreground text-xs px-2">
                        Enter your {selectedPlatform} username without the @ symbol
                      </p>
                    </div>
                    <Button 
                      disabled={!username}
                      onClick={handleContinue}
                      className="w-full h-12 bg-[#d4af37] hover:bg-[#c9a332] text-black font-bold rounded-xl text-base"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {step === 'verify-code' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-xl">
                      <span className="font-medium">{username}</span>
                      <button onClick={() => setStep('enter-username')} className="text-[#d4af37] text-sm font-bold hover:underline">
                        Change
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold block mb-3">Verification code</label>
                      <div className="relative">
                        <div className="h-14 flex items-center justify-between px-4 bg-muted/50 border border-border rounded-xl">
                          <span className="font-mono tracking-widest">{currentCode}</span>
                          <button onClick={() => copyToClipboard(currentCode)} className="text-muted-foreground hover:text-foreground transition-colors">
                            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold">Instructions</h4>
                      <ol className="text-sm text-muted-foreground space-y-3">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0">1.</span>
                          <span>Go to your {selectedPlatform} profile</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0">2.</span>
                          <span>Tap &quot;Edit profile&quot;</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0">3.</span>
                          <span>Paste the code in your {selectedPlatform === 'youtube' ? 'channel description' : 'bio'}</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0">4.</span>
                          <span>Save your changes</span>
                        </li>
                      </ol>
                    </div>

                    <Button 
                      onClick={handleContinue}
                      className="w-full h-14 bg-[#d4af37] hover:bg-[#c9a332] text-black font-bold rounded-xl text-lg"
                    >
                      Verify account
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
