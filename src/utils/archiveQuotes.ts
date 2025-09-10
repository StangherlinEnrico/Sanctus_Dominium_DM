import archiveQuotesData from "../data/archive-quotes.json";
import type { Quote, QuoteData, QuoteConfig } from "../types/archiveQuoteInterfaces";

// Configurazione di default per le citazioni
const DEFAULT_CONFIG: QuoteConfig = {
  displayDuration: 2000,
  fadeOutDuration: 300,
  minQuotes: 1,
};

/**
 * Carica tutte le citazioni disponibili dal JSON
 * @returns Array di citazioni disponibili
 */
export const getQuotes = (): Quote[] => {
  try {
    const data = archiveQuotesData as QuoteData;
    
    if (!data.quotes || !Array.isArray(data.quotes)) {
      console.warn("Nessuna citazione valida trovata nel file JSON");
      return getDefaultQuotes();
    }
    
    return data.quotes.filter(quote => 
      quote.text && quote.source && 
      quote.text.trim().length > 0 && 
      quote.source.trim().length > 0
    );
  } catch (error) {
    console.error("Errore nel caricamento delle citazioni:", error);
    return getDefaultQuotes();
  }
};

/**
 * Citazioni di fallback in caso di errore
 * @returns Array di citazioni di default
 */
const getDefaultQuotes = (): Quote[] => {
  return [
    {
      text: "In Sanctus Dominium, il potere non corrompe: rivela.",
      source: "Secretum Imperialis"
    },
    {
      text: "La verità è un lusso che l'Impero non può permettersi.",
      source: "Codice delle Verità Proibite"
    }
  ];
};

/**
 * Seleziona una citazione casuale dall'archivio
 * @returns Citazione casuale
 */
export const getRandomQuote = (): Quote => {
  const quotes = getQuotes();
  
  if (quotes.length === 0) {
    return getDefaultQuotes()[0];
  }
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

/**
 * Ottiene una citazione specifica per indice
 * @param index - Indice della citazione desiderata
 * @returns Citazione all'indice specificato o citazione casuale
 */
export const getQuoteByIndex = (index: number): Quote => {
  const quotes = getQuotes();
  
  if (index >= 0 && index < quotes.length) {
    return quotes[index];
  }
  
  return getRandomQuote();
};

/**
 * Copia una citazione negli appunti del sistema
 * @param quote - Citazione da copiare
 * @returns Promise che risolve true se la copia è riuscita
 */
export const copyQuoteToClipboard = async (quote: Quote): Promise<boolean> => {
  try {
    // Formatta la citazione per la copia
    const fullQuote = formatQuoteForClipboard(quote);
    
    // Usa l'API Clipboard se disponibile
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(fullQuote);
      console.log("Citazione copiata negli appunti:", fullQuote);
      return true;
    }
    
    // Fallback per browser più vecchi
    return await fallbackCopyToClipboard(fullQuote);
  } catch (error) {
    console.error("Errore nella copia della citazione:", error);
    return false;
  }
};

/**
 * Formatta una citazione per la copia negli appunti
 * @param quote - Citazione da formattare
 * @returns Stringa formattata per la copia
 */
const formatQuoteForClipboard = (quote: Quote): string => {
  return `"${quote.text.trim()}"\n\n— ${quote.source.trim()}`;
};

/**
 * Metodo di fallback per copiare negli appunti (browser più vecchi)
 * @param text - Testo da copiare
 * @returns Promise che risolve true se la copia è riuscita
 */
const fallbackCopyToClipboard = async (text: string): Promise<boolean> => {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.error("Errore nel fallback della copia:", error);
    return false;
  }
};

/**
 * Verifica se il sistema supporta la copia negli appunti
 * @returns true se la copia è supportata
 */
export const isClipboardSupported = (): boolean => {
  return !!(navigator.clipboard && window.isSecureContext) || 
         document.queryCommandSupported?.('copy') === true;
};

/**
 * Ottiene statistiche sulle citazioni disponibili
 * @returns Oggetto con statistiche sulle citazioni
 */
export const getQuoteStats = () => {
  const quotes = getQuotes();
  
  return {
    total: quotes.length,
    averageLength: quotes.reduce((sum, quote) => sum + quote.text.length, 0) / quotes.length,
    sources: [...new Set(quotes.map(quote => quote.source))],
    longestQuote: quotes.reduce((longest, quote) => 
      quote.text.length > longest.text.length ? quote : longest
    ),
    shortestQuote: quotes.reduce((shortest, quote) => 
      quote.text.length < shortest.text.length ? quote : shortest
    )
  };
};

/**
 * Cerca citazioni che contengono una parola chiave
 * @param keyword - Parola chiave da cercare
 * @param searchInSource - Se true, cerca anche nella fonte
 * @returns Array di citazioni che contengono la parola chiave
 */
export const searchQuotes = (keyword: string, searchInSource: boolean = false): Quote[] => {
  const quotes = getQuotes();
  const lowerKeyword = keyword.toLowerCase().trim();
  
  if (!lowerKeyword) {
    return quotes;
  }
  
  return quotes.filter(quote => {
    const textMatch = quote.text.toLowerCase().includes(lowerKeyword);
    const sourceMatch = searchInSource && quote.source.toLowerCase().includes(lowerKeyword);
    
    return textMatch || sourceMatch;
  });
};

// Esporta la configurazione per uso esterno
export { DEFAULT_CONFIG as QUOTE_CONFIG };