'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting stealth adjustments to the Shadow Wallet UI.
 *
 * It uses generative AI to analyze the home screen and transaction details,
 * recommending masking strategies to enhance privacy.
 *
 * @interface StealthAdjustmentSuggestionInput - The input type for the suggestStealthAdjustments function.
 * @interface StealthAdjustmentSuggestionOutput - The output type for the suggestStealthAdjustments function.
 * @function suggestStealthAdjustments - The main function to generate stealth adjustment suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StealthAdjustmentSuggestionInputSchema = z.object({
  homeScreenData: z.string().describe('JSON representation of the home screen data including balance, recent transactions, etc.'),
  transactionDetailsData: z.string().describe('JSON representation of transaction details data including sender, receiver, amount, etc.'),
});

export type StealthAdjustmentSuggestionInput = z.infer<typeof StealthAdjustmentSuggestionInputSchema>;

const StealthAdjustmentSuggestionOutputSchema = z.object({
  homeScreenSuggestions: z.array(z.string()).describe('Array of suggestions to enhance stealth on the home screen.'),
  transactionDetailsSuggestions: z.array(z.string()).describe('Array of suggestions to enhance stealth in transaction details.'),
});

export type StealthAdjustmentSuggestionOutput = z.infer<typeof StealthAdjustmentSuggestionOutputSchema>;

export async function suggestStealthAdjustments(
  input: StealthAdjustmentSuggestionInput
): Promise<StealthAdjustmentSuggestionOutput> {
  return suggestStealthAdjustmentsFlow(input);
}

const suggestStealthAdjustmentsPrompt = ai.definePrompt({
  name: 'suggestStealthAdjustmentsPrompt',
  input: {schema: StealthAdjustmentSuggestionInputSchema},
  output: {schema: StealthAdjustmentSuggestionOutputSchema},
  prompt: `You are a privacy expert specializing in enhancing the stealth of crypto wallet user interfaces.
  Given the current home screen data and transaction details data, suggest adjustments to enhance stealth and privacy.
  Provide specific suggestions for both the home screen and transaction details.

  Home Screen Data: {{{homeScreenData}}}
  Transaction Details Data: {{{transactionDetailsData}}}

  Format your response as follows:
  {
    "homeScreenSuggestions": ["suggestion 1", "suggestion 2", ...],
    "transactionDetailsSuggestions": ["suggestion 1", "suggestion 2", ...]
  }
  `,
});

const suggestStealthAdjustmentsFlow = ai.defineFlow(
  {
    name: 'suggestStealthAdjustmentsFlow',
    inputSchema: StealthAdjustmentSuggestionInputSchema,
    outputSchema: StealthAdjustmentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await suggestStealthAdjustmentsPrompt(input);
    return output!;
  }
);
