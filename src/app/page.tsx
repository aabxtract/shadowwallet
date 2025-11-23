'use client';

import { useState, useEffect } from 'react';
import { Logo } from '@/components/icons/logo';
import { Settings, ArrowUpRight, ArrowDownLeft, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Balance } from '@/components/balance';
import { TransactionHistory } from '@/components/transaction-history';
import { StealthSuggestions } from '@/components/stealth-suggestions';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const balance = 1.2345; // Mock balance in ETH

  // Auto-lock after 10 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isUnlocked) {
      const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsUnlocked(false), 10000);
      };

      resetTimeout();
      window.addEventListener('mousemove', resetTimeout);
      window.addEventListener('keydown', resetTimeout);
      window.addEventListener('click', resetTimeout);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener('mousemove', resetTimeout);
        window.removeEventListener('keydown', resetTimeout);
        window.removeEventListener('click', resetTimeout);
      };
    }
  }, [isUnlocked]);
  
  const mockTransactions = [
    { id: 1, type: 'sent' as const, amount: 0.1, currency: 'ETH', address: '0x...aBcD', date: '2024-07-29' },
    { id: 2, type: 'received' as const, amount: 0.5, currency: 'ETH', address: '0x...eFgH', date: '2024-07-28' },
    { id: 3, type: 'sent' as const, amount: 0.05, currency: 'ETH', address: '0x...iJkL', date: '2024-07-27' },
    { id: 4, type: 'received' as const, amount: 1.0, currency: 'ETH', address: '0x...mNoP', date: '2024-07-26' },
  ];

  const homeScreenData = {
    balance: isUnlocked ? balance : 'hidden',
    recentTransactions: mockTransactions.slice(0, 2).map(tx => ({ ...tx, amount: 'hidden' })),
  };

  const transactionDetailsData = {
    sampleTransaction: { ...mockTransactions[0], amount: 'hidden' },
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar collapsible="icon" className="group-data-[collapsible=icon]:border-r-0">
        <SidebarHeader>
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
             <Logo />
             <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent group-data-[collapsible=icon]:hidden">Shadow</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Send" size="lg">
                <ArrowUpRight />
                <span>Send</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Receive" size="lg">
                <ArrowDownLeft />
                <span>Receive</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" size="lg">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8">
         <header className="w-full max-w-2xl flex justify-between items-center md:hidden">
            <div className="flex items-center gap-2">
              <Logo />
              <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">Shadow Wallet</h1>
            </div>
            <SidebarTrigger>
              <PanelLeft />
            </SidebarTrigger>
        </header>

        <div className="flex flex-col items-center w-full max-w-md flex-1 py-12 space-y-8">
          <Balance
            isUnlocked={isUnlocked}
            balance={balance}
            onUnlock={() => setIsUnlocked(true)}
          />

          <TransactionHistory transactions={mockTransactions} />
        </div>
        
        <footer className="w-full max-w-md pb-4">
          <StealthSuggestions
              homeScreenData={JSON.stringify(homeScreenData)}
              transactionDetailsData={JSON.stringify(transactionDetailsData)}
          />
        </footer>
      </main>
    </div>
  );
}
