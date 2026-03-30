"use client";

import React, { useState, useEffect } from "react";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  MessageCircle, 
  Send, 
  Hash,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

type VerificationType = 'bio' | 'post' | 'message' | 'discord';

type Platform = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  connected: boolean;
  username?: string;
  loading?: boolean;
  verificationType: VerificationType;
  verificationCode?: string;
};

const INITIAL_PLATFORMS: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    description: "Connect your Instagram profile to track Reels performance.",
    connected: true,
    username: "@rayston_edits",
    verificationType: 'bio'
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Link your YouTube channel for Shorts and video rewards.",
    connected: false,
    verificationType: 'bio'
  },
  {
    id: "twitter",
    name: "Twitter (X)",
    icon: Twitter,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Verify your X account to share campaign updates.",
    connected: false,
    verificationType: 'bio'
  },
  {
    id: "discord",
    name: "Discord",
    icon: MessageCircle,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    description: "Join our discord to get exclusive creator roles.",
    connected: false,
    verificationType: 'discord'
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    description: "Connect Telegram for instant payout notifications.",
    connected: false,
    verificationType: 'message'
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: Hash,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    description: "Receive campaign alerts directly on WhatsApp.",
    connected: false,
    verificationType: 'message'
  },
];

export default function ConnectedAccounts() {
  const [platforms, setPlatforms] = useState<Platform[]>(INITIAL_PLATFORMS);
  const [activeVerification, setActiveVerification] = useState<{
    id: string;
    step: 'username' | 'instruction' | 'verifying';
    username: string;
    code: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // eslint-disable-next-line react-hooks/purity
  const generateCode = () => `BENNY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const handleConnectRequest = (id: string) => {
    setActiveVerification({
      id,
      step: 'username',
      username: '',
      code: generateCode()
    });
  };

  const nextStep = () => {
    if (!activeVerification) return;
    
    if (activeVerification.step === 'username') {
      const input = document.getElementById('verify-input') as HTMLInputElement;
      if (!input.value) return;
      setActiveVerification({ ...activeVerification, step: 'instruction', username: input.value });
    } else if (activeVerification.step === 'instruction') {
      setActiveVerification({ ...activeVerification, step: 'verifying' });
      
      // Simulate proper verification logic
      setTimeout(() => {
        completeVerification();
      }, 3000);
    }
  };

  const completeVerification = () => {
    if (!activeVerification) return;
    
    setPlatforms(prev => prev.map(p => 
      p.id === activeVerification.id 
        ? { ...p, connected: true, username: `@${activeVerification.username.replace('@', '')}` } 
        : p
    ));
    setActiveVerification(null);
  };

  const handleDisconnect = (id: string) => {
    if (confirm("Are you sure you want to disconnect this account?")) {
      setPlatforms(prev => prev.map(p => p.id === id ? { ...p, connected: false, username: undefined } : p));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activePlatform = activeVerification ? platforms.find(p => p.id === activeVerification.id) : null;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck size={20} />
          <span className="text-sm font-semibold uppercase tracking-wider">Account Safety</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Social Verification</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          To ensure rewards go to the right person, we require a verification step for every connected platform.
        </p>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div 
            key={platform.id}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 ${
              platform.connected 
                ? 'bg-muted/10 border-green-500/20 shadow-sm' 
                : 'bg-card border-border/60 hover:border-primary/40 hover:shadow-lg'
            }`}
          >
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`h-14 w-14 rounded-2xl ${platform.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                  <platform.icon className={platform.color} size={28} />
                </div>
                {platform.connected && (
                  <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold tracking-tighter uppercase border border-green-500/20">
                    Verified
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-xl">{platform.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {platform.description}
                </p>
              </div>

              {platform.connected && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-muted/30 border border-border/40">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">{platform.username}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-muted/5 border-t border-border/40">
              {platform.connected ? (
                <Button 
                  onClick={() => handleDisconnect(platform.id)}
                  variant="ghost" 
                  className="w-full text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                >
                  Unlink Account
                </Button>
              ) : (
                <Button 
                  onClick={() => handleConnectRequest(platform.id)}
                  className="w-full rounded-2xl group/btn overflow-hidden relative"
                >
                  <span className="relative z-10">Start Verification</span>
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Multi-step Verification Modal */}
      {activeVerification && activePlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-xl transition-all duration-500">
          <div className="w-full max-w-lg bg-card border border-border/60 rounded-[2.5rem] shadow-2xl p-8 md:p-10 space-y-8 animate-in fade-in zoom-in slide-in-from-bottom-5 duration-500">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className={`h-20 w-20 rounded-[2rem] ${activePlatform.bgColor} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                <activePlatform.icon className={activePlatform.color} size={40} />
              </div>
              <h2 className="text-3xl font-bold">Connect {activePlatform.name}</h2>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span className={activeVerification.step === 'username' ? 'text-primary' : ''}>1. Identifying</span>
                <ArrowRight size={14} />
                <span className={activeVerification.step === 'instruction' ? 'text-primary' : ''}>2. Validating</span>
                <ArrowRight size={14} />
                <span className={activeVerification.step === 'verifying' ? 'text-primary' : ''}>3. Finalize</span>
              </div>
            </div>

            {/* Step 1: Username */}
            {activeVerification.step === 'username' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Account Handle</label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors text-lg">@</span>
                    <input 
                      id="verify-input"
                      type="text" 
                      placeholder="Enter your username"
                      autoFocus
                      className="w-full bg-muted/30 border border-border/80 focus:border-primary rounded-3xl py-4 pl-10 pr-6 text-lg outline-none transition-all shadow-inner"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground px-2">
                    Make sure your profile is set to <span className="text-foreground font-semibold">Public</span> so we can find you.
                  </p>
                </div>
                <Button className="w-full py-7 rounded-3xl text-lg font-bold" onClick={nextStep}>
                  Next Step
                </Button>
              </div>
            )}

            {/* Step 2: Instruction */}
            {activeVerification.step === 'instruction' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-6 rounded-3xl bg-muted/40 border border-border/60 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">!</div>
                    Verification Required
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activePlatform.verificationType === 'bio' && (
                      <>Add the following unique verification code to your <span className="text-foreground font-bold">Profile Bio</span>. You can remove it once verified.</>
                    )}
                    {activePlatform.verificationType === 'message' && (
                      <>Send the following message to our <span className="text-foreground font-bold">Official Bot</span> on {activePlatform.name}.</>
                    )}
                    {activePlatform.verificationType === 'discord' && (
                      <>Join our Discord server and post this code in the <span className="text-foreground font-bold">#verify-here</span> channel.</>
                    )}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-background border border-border/60 rounded-2xl px-5 py-4 font-mono font-bold text-center text-xl tracking-wider select-all">
                      {activeVerification.code}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-14 w-14 rounded-2xl border-border/60 hover:bg-muted"
                      onClick={() => copyToClipboard(activeVerification.code)}
                    >
                      {copied ? <Check className="text-green-500" /> : <Copy size={20} />}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="ghost" className="flex-1 py-7 rounded-3xl" onClick={() => setActiveVerification(null)}>Cancel</Button>
                  <Button className="flex-1 py-7 rounded-3xl font-bold" onClick={nextStep}>Done, Check Now</Button>
                </div>
              </div>
            )}

            {/* Step 3: Verifying */}
            {activeVerification.step === 'verifying' && (
              <div className="py-10 space-y-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="relative h-24 w-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RefreshCw className="text-primary animate-pulse" size={32} />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold italic tracking-tight">Accessing Platform API...</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Searching for {activeVerification.username}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Validating unique ID: {activeVerification.code}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                  We are currently performing a deep-scan verification. This usually takes 5-10 seconds.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Security Footer */}
      <div className="bg-muted/20 border border-border/40 rounded-[2.5rem] p-8 md:p-12 text-center max-w-4xl mx-auto space-y-8">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck /> SSL SECURE</div>
          <div className="flex items-center gap-2 font-bold text-xl"><CheckCircle2 /> API VERIFIED</div>
          <div className="flex items-center gap-2 font-bold text-xl"><AlertCircle /> NO SPAM</div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Why do I need to verify my profile?</p>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Verification prevents account imitation and ensures rewards reach the actual content creators. Our platform uses cross-reference algorithms to validate ownership without requesting your login credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
