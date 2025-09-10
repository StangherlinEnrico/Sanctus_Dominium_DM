import { PageMapping, NameToPageMapping } from "../types/navigation.types";

// Mappa centrale delle pagine: ID -> Nome
export const PAGE_NAMES: PageMapping = {
  archive: "Archivio Segreto",
  races: "Razze sotto il giogo",
  settings: "Impostazioni",
  // Espandibile per nuove pagine...
};

// Mappa inversa: Nome -> ID (generata automaticamente)
export const NAME_TO_PAGE_ID: NameToPageMapping = Object.fromEntries(
  Object.entries(PAGE_NAMES).map(([id, name]) => [name, id])
);

// Lista di tutte le pagine disponibili
export const AVAILABLE_PAGES = Object.keys(PAGE_NAMES);

// Pagine speciali che non vengono salvate nello storage
export const SPECIAL_PAGES = ["archive", "settings"];

// Pagina di default e fallback
export const DEFAULT_PAGE = "archive";
export const FALLBACK_PAGE = "races";

/**
 * Ottiene il nome di una pagina dal suo ID
 * @param pageId - ID della pagina
 * @returns Nome della pagina o nome della pagina di default
 */
export const getPageName = (pageId: string): string => {
  return PAGE_NAMES[pageId] || PAGE_NAMES[DEFAULT_PAGE];
};

/**
 * Ottiene l'ID di una pagina dal suo nome
 * @param pageName - Nome della pagina
 * @returns ID della pagina o ID della pagina di fallback
 */
export const getPageId = (pageName: string): string => {
  return NAME_TO_PAGE_ID[pageName] || FALLBACK_PAGE;
};

/**
 * Verifica se un ID pagina è valido
 * @param pageId - ID della pagina da verificare
 * @returns true se l'ID è valido, false altrimenti
 */
export const isValidPageId = (pageId: string): boolean => {
  return AVAILABLE_PAGES.includes(pageId);
};

/**
 * Verifica se un nome pagina è valido
 * @param pageName - Nome della pagina da verificare
 * @returns true se il nome è valido, false altrimenti
 */
export const isValidPageName = (pageName: string): boolean => {
  return Object.values(PAGE_NAMES).includes(pageName);
};

/**
 * Verifica se una pagina è speciale (non viene salvata)
 * @param pageId - ID della pagina
 * @returns true se la pagina è speciale, false altrimenti
 */
export const isSpecialPage = (pageId: string): boolean => {
  return SPECIAL_PAGES.includes(pageId);
};

/**
 * Ottiene tutte le pagine normali (escludendo quelle speciali)
 * @returns Array degli ID delle pagine normali
 */
export const getNormalPages = (): string[] => {
  return AVAILABLE_PAGES.filter(pageId => !isSpecialPage(pageId));
};

/**
 * Ottiene informazioni complete su una pagina
 * @param pageId - ID della pagina
 * @returns Oggetto con informazioni sulla pagina
 */
export const getPageInfo = (pageId: string) => {
  return {
    id: pageId,
    name: getPageName(pageId),
    isValid: isValidPageId(pageId),
    isSpecial: isSpecialPage(pageId),
    exists: AVAILABLE_PAGES.includes(pageId)
  };
};

/**
 * Ottiene la prossima pagina in sequenza
 * @param currentPageId - ID della pagina corrente
 * @returns ID della prossima pagina o null se non esiste
 */
export const getNextPage = (currentPageId: string): string | null => {
  const normalPages = getNormalPages();
  const currentIndex = normalPages.indexOf(currentPageId);
  
  if (currentIndex === -1 || currentIndex === normalPages.length - 1) {
    return null;
  }
  
  return normalPages[currentIndex + 1];
};

/**
 * Ottiene la pagina precedente in sequenza
 * @param currentPageId - ID della pagina corrente
 * @returns ID della pagina precedente o null se non esiste
 */
export const getPreviousPage = (currentPageId: string): string | null => {
  const normalPages = getNormalPages();
  const currentIndex = normalPages.indexOf(currentPageId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return normalPages[currentIndex - 1];
};