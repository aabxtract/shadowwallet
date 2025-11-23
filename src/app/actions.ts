'use server';

import { suggestStealthAdjustments, type StealthAdjustmentSuggestionInput } from '@/ai/flows/suggest-stealth-adjustments';

export async function getStealthSuggestions(input: StealthAdjustmentSuggestionInput) {
  try {
    const suggestions = await suggestStealthAdjustments(input);
    return { success: true, data: suggestions };
  } catch (error) {
    console.error('Error getting stealth suggestions:', error);
    return { success: false, error: 'Failed to get suggestions. Please try again.' };
  }
}
