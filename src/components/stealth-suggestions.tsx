'use client';

import { useState } from 'react';
import { WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { getStealthSuggestions } from '@/app/actions';
import type { StealthAdjustmentSuggestionOutput, StealthAdjustmentSuggestionInput } from '@/ai/flows/suggest-stealth-adjustments';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from './ui/skeleton';

export function StealthSuggestions({ homeScreenData, transactionDetailsData }: StealthAdjustmentSuggestionInput) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<StealthAdjustmentSuggestionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    setIsOpen(true);

    const result = await getStealthSuggestions({ homeScreenData, transactionDetailsData });

    if (result.success && result.data) {
      setSuggestions(result.data);
    } else {
      setError(result.error ?? 'An unknown error occurred.');
    }
    setIsLoading(false);
  };
  
  return (
    <>
      <Button
        variant="ghost"
        className="w-full text-accent hover:text-accent hover:bg-accent/10"
        onClick={handleFetchSuggestions}
        disabled={isLoading}
      >
        <WandSparkles className="mr-2 h-4 w-4" />
        Get AI Stealth Suggestions
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-background border-primary/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <WandSparkles className="text-accent" />
              AI Stealth Suggestions
            </DialogTitle>
            <DialogDescription>
              Recommendations to enhance your wallet's privacy.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="space-y-2 px-4 pt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                 <Skeleton className="h-10 w-full" />
                <div className="space-y-2 px-4 pt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            )}
            {error && <p className="text-destructive text-center p-4">{error}</p>}
            {suggestions && (
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Home Screen</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      {suggestions.homeScreenSuggestions.map((suggestion, index) => (
                        <li key={`home-${index}`}>{suggestion}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Transaction Details</AccordionTrigger>
                  <AccordionContent>
                     <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      {suggestions.transactionDetailsSuggestions.map((suggestion, index) => (
                        <li key={`tx-${index}`}>{suggestion}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
