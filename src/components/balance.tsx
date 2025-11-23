'use client';

import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type BalanceProps = {
  isUnlocked: boolean;
  balance: number;
  onUnlock: () => void;
};

export function Balance({ isUnlocked, balance, onUnlock }: BalanceProps) {
  return (
    <div
      className="relative w-full aspect-square max-w-xs rounded-full flex flex-col items-center justify-center cursor-pointer group"
      onClick={!isUnlocked ? onUnlock : undefined}
      aria-live="polite"
    >
      <div
        className={cn(
          'absolute inset-0 rounded-full transition-all duration-1000',
          isUnlocked
            ? 'bg-accent/10 shadow-[0_0_80px_20px_hsl(var(--accent)/0.2)]'
            : 'animate-pulse-slow bg-primary/20 shadow-[0_0_100px_30px_hsl(var(--primary)/0.2)]'
        )}
      ></div>

      <div
        className={cn(
          'relative w-full h-full rounded-full bg-background/50 backdrop-blur-xl border border-primary/20 flex flex-col items-center justify-center text-center p-4 transition-all duration-700',
          isUnlocked ? 'bg-background/80' : 'hover:bg-background/60'
        )}
      >
        <div className={cn(
          "absolute transition-opacity duration-700 flex flex-col items-center justify-center",
          isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}>
          <Lock className="h-12 w-12 text-foreground/50 mb-4" />
          <p className="text-lg font-medium text-foreground">Tap to Reveal</p>
          <p className="text-sm text-muted-foreground">Balance is hidden</p>
        </div>

        <div className={cn(
          "absolute transition-opacity duration-700 flex flex-col items-center justify-center",
          isUnlocked ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}>
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-5xl font-bold tracking-tighter text-foreground my-2">
            {balance.toFixed(4)}
          </p>
          <p className="text-sm text-muted-foreground">ETH</p>
        </div>
      </div>
    </div>
  );
}
