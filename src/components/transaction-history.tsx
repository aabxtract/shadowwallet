'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type Transaction = {
  id: number;
  type: 'sent' | 'received';
  amount: number;
  currency: string;
  address: string;
  date: string;
};

type TransactionHistoryProps = {
  transactions: Transaction[];
};

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  return (
    <Card className="w-full bg-transparent border-primary/20 shadow-xl shadow-black/20">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {transactions.map((tx, index) => (
            <Collapsible key={tx.id} open={openItemId === tx.id} onOpenChange={(isOpen) => setOpenItemId(isOpen ? tx.id : null)}>
              <div className={cn("px-4 md:px-6 py-3", index !== transactions.length - 1 && "border-b border-primary/10")}>
                <CollapsibleTrigger asChild>
                  <button className="flex justify-between items-center w-full text-left group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/20">
                        {tx.type === 'sent' ? <ArrowUpRight className="h-5 w-5 text-accent" /> : <ArrowDownLeft className="h-5 w-5 text-chart-2" />}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{tx.type}</p>
                        <p className="text-sm text-muted-foreground transition-all duration-300 blur-sm group-hover:blur-0">
                          {tx.type === 'sent' ? 'To' : 'From'} {tx.address}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                       <div className="font-mono font-medium transition-all duration-300 blur-sm group-hover:blur-0">
                        {tx.type === 'sent' ? '-' : '+'} {tx.amount.toFixed(4)} {tx.currency}
                      </div>
                      <div className="flex justify-end">
                         <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 mt-1" />
                      </div>
                    </div>
                  </button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="px-6 pb-4 pt-2 bg-primary/10 text-sm">
                  <p className="font-medium text-foreground mb-2">Transaction Details</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p><span className="font-medium text-foreground/80 w-20 inline-block">Date:</span> {tx.date}</p>
                    <p><span className="font-medium text-foreground/80 w-20 inline-block">Address:</span> <span className="font-mono">{tx.address}</span></p>
                    <p><span className="font-medium text-foreground/80 w-20 inline-block">Amount:</span> <span className="font-mono">{tx.amount.toFixed(4)} {tx.currency}</span></p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
