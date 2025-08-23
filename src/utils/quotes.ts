import archiveQuotesData from "../data/archive-quotes.json";
import type { Quote, QuoteData } from "../types/archive";

/**
 * Carica tutte le citazioni disponibili
 */
export const getQuotes = (): Quote[] => {
  const data = archiveQuotesData as QuoteData;
  return data.quotes;
};

/**
 * Seleziona una citazione casuale
 */
export const getRandomQuote = (): Quote => {
  const quotes = getQuotes();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

/**
 * Copia una citazione negli appunti
 */
export const copyQuoteToClipboard = async (quote: Quote): Promise<boolean> => {
  try {
    const fullQuote = `"${quote.text}"\n— ${quote.source}`;
    await navigator.clipboard.writeText(fullQuote);
    return true;
  } catch (error) {
    console.error("Errore nella copia:", error);
    return false;
  }
};