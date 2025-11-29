import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Shield, Eye, Lock, ArrowDownUp, Plus, Minus, Activity, TrendingUp, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { GridBackground } from '@/components/ui/grid-background';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { PrivacyBackground } from '@/components/ui/privacy-background';
import { useToast } from '@/hooks/use-toast';
import { useTokenBalance } from '@/hooks/useTokenBalance';

export const AppPage: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { userTokenBalances, loading, getTotalValue } = useTokenBalance();
  const { toast } = useToast();
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);

  // Mock staking data
  const stakingData = {
    totalStaked: '125.48',
    pendingRewards: '2.34',
    apy: '8.5',
    lastReward: '24h ago'
  };

  const handleStake = async () => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to stake",
        variant: "destructive"
      });
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid staking amount",
        variant: "destructive"
      });
      return;
    }

    setIsStaking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Private Stake Successful",
        description: `Successfully staked ${stakeAmount} SOL anonymously`,
      });
      
      setStakeAmount('');
    } catch (error) {
      toast({
        title: "Staking failed",
        description: "There was an error processing your stake",
        variant: "destructive"
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to unstake",
        variant: "destructive"
      });
      return;
    }

    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid unstaking amount",
        variant: "destructive"
      });
      return;
    }

    setIsUnstaking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Private Unstake Successful",
        description: `Successfully unstaked ${unstakeAmount} SOL anonymously`,
      });
      
      setUnstakeAmount('');
    } catch (error) {
      toast({
        title: "Unstaking failed",
        description: "There was an error processing your unstake",
        variant: "destructive"
      });
    } finally {
      setIsUnstaking(false);
    }
  };

  const solBalance = userTokenBalances.find(token => token.symbol === 'SOL')?.balance || 0;

  if (!connected) {
    return (
      <div className="min-h-screen pt-24 relative overflow-hidden">
        <GridBackground />
        <PrivacyBackground intensity="low" />
        
        <div className="flex items-center justify-center min-h-screen">
          <ScrollReveal>
            <ProfessionalCard variant="gradient" className="max-w-2xl mx-4 text-center">
              <div className="space-y-8">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/20 flex items-center justify-center animate-gentle-float">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Connect Your Wallet</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Connect your Solana wallet to start private staking with zero-knowledge privacy.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Lock, text: "Anonymous transactions" },
                    { icon: Eye, text: "Hidden wallet addresses" },
                    { icon: Shield, text: "Zero-knowledge proofs" }
                  ].map((item) => (
                    <div key={item.text} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ProfessionalCard>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      <GridBackground />
      <PrivacyBackground intensity="medium" />

      <div className="container mx-auto px-6">
        {/* Privacy Status */}
        <ScrollReveal delay={200} animation="professional-fade">
          <div className="mb-12">
            <ProfessionalCard variant="glass">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-subtle-glow">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Privacy Mode Active</h3>
                    <p className="text-sm text-muted-foreground">All transactions are anonymous via Elusiv</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Lock className="w-3 h-3 mr-1" />
                  Protected
                </Badge>
              </div>
            </ProfessionalCard>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Portfolio Overview */}
            <ScrollReveal delay={400} animation="timeline-left">
              <ProfessionalCard variant="gradient">
                <div className="space-y-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Private Portfolio</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: "Total Staked", value: `${stakingData.totalStaked} SOL`, icon: Activity },
                      { label: "Pending Rewards", value: `${stakingData.pendingRewards} SOL`, icon: TrendingUp, highlight: true },
                      { label: "Current APY", value: `${stakingData.apy}%`, icon: Zap },
                      { label: "Last Reward", value: stakingData.lastReward, icon: Activity }
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <ProfessionalCard className="professional-hover h-full">
                          <div className="space-y-3">
                            <div className="w-8 h-8 mx-auto rounded bg-primary/10 flex items-center justify-center">
                              <stat.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className={`text-lg font-semibold ${stat.highlight ? 'text-primary' : ''}`}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        </ProfessionalCard>
                      </div>
                    ))}
                  </div>
                </div>
              </ProfessionalCard>
            </ScrollReveal>

            {/* Staking Interface */}
            <ScrollReveal delay={600} animation="timeline-right">
              <ProfessionalCard variant="glass">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                      <ArrowDownUp className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Private Staking</h2>
                  </div>
                  
                  <Tabs defaultValue="stake" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                      <TabsTrigger value="stake">Stake SOL</TabsTrigger>
                      <TabsTrigger value="unstake">Unstake SOL</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stake" className="space-y-6 mt-8">
                      <div className="space-y-4">
                        <Label htmlFor="stake-amount" className="text-sm font-medium">Amount to Stake</Label>
                        <div className="relative">
                          <Input
                            id="stake-amount"
                            type="number"
                            placeholder="0.00"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            className="pr-16 text-lg py-6 glass-card"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                            SOL
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Available: {solBalance.toFixed(4)} SOL</span>
                          <button 
                            onClick={() => setStakeAmount((solBalance * 0.9).toString())}
                            className="text-primary hover:underline font-medium transition-colors"
                          >
                            Max
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {['25%', '50%', '75%'].map((percentage, index) => (
                          <Button
                            key={percentage}
                            variant="outline"
                            size="sm"
                            onClick={() => setStakeAmount((solBalance * (0.25 * (index + 1))).toString())}
                            className="glass-card border-border hover:bg-primary/5"
                          >
                            {percentage}
                          </Button>
                        ))}
                      </div>

                      <Button 
                        onClick={handleStake}
                        disabled={isStaking || !stakeAmount}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group"
                      >
                        {isStaking ? (
                          <>
                            <LoadingSpinner className="w-4 h-4 mr-2" />
                            Processing Private Stake...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2 transition-transform duration-200" />
                            Stake Privately
                          </>
                        )}
                      </Button>
                    </TabsContent>

                    <TabsContent value="unstake" className="space-y-6 mt-8">
                      <div className="space-y-4">
                        <Label htmlFor="unstake-amount" className="text-sm font-medium">Amount to Unstake</Label>
                        <div className="relative">
                          <Input
                            id="unstake-amount"
                            type="number"
                            placeholder="0.00"
                            value={unstakeAmount}
                            onChange={(e) => setUnstakeAmount(e.target.value)}
                            className="pr-16 text-lg py-6 glass-card"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                            SOL
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Staked: {stakingData.totalStaked} SOL</span>
                          <button 
                            onClick={() => setUnstakeAmount(stakingData.totalStaked)}
                            className="text-primary hover:underline font-medium transition-colors"
                          >
                            Max
                          </button>
                        </div>
                      </div>

                      <Button 
                        onClick={handleUnstake}
                        disabled={isUnstaking || !unstakeAmount}
                        variant="outline"
                        className="w-full glass-card border-border hover:bg-accent/10 group"
                      >
                        {isUnstaking ? (
                          <>
                            <LoadingSpinner className="w-4 h-4 mr-2" />
                            Processing Private Unstake...
                          </>
                        ) : (
                          <>
                            <Minus className="w-4 h-4 mr-2 transition-transform duration-200" />
                            Unstake Privately
                          </>
                        )}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </ProfessionalCard>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Wallet Info */}
            <ScrollReveal delay={800} animation="subtle-slide">
              <ProfessionalCard>
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Wallet Balance</h3>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <LoadingSpinner className="w-5 h-5" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-accent/30">
                        <span className="text-sm text-muted-foreground">SOL Balance</span>
                        <span className="font-semibold text-primary">{solBalance.toFixed(4)} SOL</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-accent/30">
                        <span className="text-sm text-muted-foreground">USD Value</span>
                        <span className="font-semibold">${getTotalValue()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </ProfessionalCard>
            </ScrollReveal>

            {/* Privacy Features */}
            <ScrollReveal delay={1000} animation="staggered">
              <ProfessionalCard variant="gradient">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Privacy Features</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Shield, title: "Zero-Knowledge Proofs", desc: "Transactions verified without revealing sensitive data" },
                      { icon: Eye, title: "Anonymous Staking", desc: "Your wallet address remains completely hidden" },
                      { icon: Lock, title: "Elusiv Protocol", desc: "Powered by industry-leading privacy infrastructure" }
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/20 transition-colors duration-200">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <feature.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm">{feature.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>All transactions are processed through Elusiv's privacy layer</span>
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};
