import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConnectionProvider, WalletProvider, WalletModalProvider } from "@/lib/solana-mock";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PrivacyLoader } from "@/components/ui/privacy-loader";
import { HomePage } from "@/pages/home";
import { AppPage } from "@/pages/app";
import NotFound from "@/pages/not-found";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/app" component={AppPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ConnectionProvider endpoint="mock-endpoint">
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              {isLoading && (
                <PrivacyLoader onComplete={handleLoadingComplete} />
              )}
              <div className="min-h-screen bg-background font-sans antialiased">
                <Header />
                <main>
                  <Router />
                </main>
                <Footer />
                <Toaster />
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
