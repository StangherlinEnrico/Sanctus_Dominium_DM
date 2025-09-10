import { ChapterInfo, ChapterMapping } from "../types/navigation.types";

// Mappa che associa ogni pagina al suo capitolo, parte e progresso
export const PAGE_CHAPTERS: ChapterMapping = {
  // Capitolo 1: Fondamenta dell'Impero
  races: { chapter: 1, part: 2, progress: 5 },
  
  // Esempio per espansioni future:
  // politics: { chapter: 1, part: 3, progress: 15 },
  // religion: { chapter: 1, part: 4, progress: 25 },
  
  // Capitolo 2: Geografia e Territori (esempio futuro)
  // geography: { chapter: 2, part: 1, progress: 35 },
  // cities: { chapter: 2, part: 2, progress: 45 },
  
  // Le pagine speciali non hanno capitoli
  // archive e settings non sono incluse
};

// Configurazione dei capitoli
export const CHAPTER_CONFIG = {
  totalChapters: 5, // Numero totale di capitoli pianificati
  defaultChapter: { chapter: 1, part: 1, progress: 0 },
  maxProgress: 100,
};

// Nomi dei capitoli per display
export const CHAPTER_NAMES: { [key: number]: string } = {
  1: "Fondamenta dell'Impero",
  2: "Geografia e Territori", 
  3: "Storia e Cronologia",
  4: "Meccaniche di Gioco",
  5: "Appendici e Riferimenti",
};

/**
 * Ottiene le informazioni del capitolo per una pagina
 * @param pageId - ID della pagina
 * @returns Informazioni del capitolo o configurazione default
 */
export const getChapterInfo = (pageId: string): ChapterInfo => {
  return PAGE_CHAPTERS[pageId] || CHAPTER_CONFIG.defaultChapter;
};

/**
 * Formatta le informazioni del capitolo nel formato standard
 * @param chapterInfo - Informazioni del capitolo
 * @returns Stringa formattata "Capitolo X - Parte Y"
 */
export const formatChapterInfo = (chapterInfo: ChapterInfo): string => {
  return `Capitolo ${chapterInfo.chapter} - Parte ${chapterInfo.part}`;
};

/**
 * Ottiene il nome completo di un capitolo
 * @param chapterNumber - Numero del capitolo
 * @returns Nome del capitolo o stringa generica
 */
export const getChapterName = (chapterNumber: number): string => {
  return CHAPTER_NAMES[chapterNumber] || `Capitolo ${chapterNumber}`;
};

/**
 * Formatta le informazioni complete del capitolo con nome
 * @param chapterInfo - Informazioni del capitolo
 * @returns Stringa formattata con nome del capitolo
 */
export const formatChapterInfoWithName = (chapterInfo: ChapterInfo): string => {
  const chapterName = getChapterName(chapterInfo.chapter);
  return `${chapterName} - Parte ${chapterInfo.part}`;
};

/**
 * Calcola il progresso totale attraverso tutti i capitoli
 * @param pageId - ID della pagina corrente
 * @returns Progresso totale come percentuale 0-100
 */
export const calculateTotalProgress = (pageId: string): number => {
  const chapterInfo = getChapterInfo(pageId);
  const progressPerChapter = CHAPTER_CONFIG.maxProgress / CHAPTER_CONFIG.totalChapters;
  const baseProgress = (chapterInfo.chapter - 1) * progressPerChapter;
  const chapterProgress = (chapterInfo.progress / 100) * progressPerChapter;
  
  return Math.min(baseProgress + chapterProgress, CHAPTER_CONFIG.maxProgress);
};

/**
 * Ottiene tutte le pagine di un capitolo specifico
 * @param chapterNumber - Numero del capitolo
 * @returns Array degli ID delle pagine del capitolo
 */
export const getChapterPages = (chapterNumber: number): string[] => {
  return Object.entries(PAGE_CHAPTERS)
    .filter(([_, info]) => info.chapter === chapterNumber)
    .map(([pageId, _]) => pageId)
    .sort((a, b) => {
      const infoA = PAGE_CHAPTERS[a];
      const infoB = PAGE_CHAPTERS[b];
      return infoA.part - infoB.part;
    });
};

/**
 * Ottiene la prossima pagina in sequenza di capitoli
 * @param currentPageId - ID della pagina corrente
 * @returns ID della prossima pagina o null
 */
export const getNextChapterPage = (currentPageId: string): string | null => {
  const currentChapter = getChapterInfo(currentPageId);
  const currentChapterPages = getChapterPages(currentChapter.chapter);
  const currentIndex = currentChapterPages.indexOf(currentPageId);
  
  // Prossima pagina nello stesso capitolo
  if (currentIndex !== -1 && currentIndex < currentChapterPages.length - 1) {
    return currentChapterPages[currentIndex + 1];
  }
  
  // Prima pagina del prossimo capitolo
  const nextChapterPages = getChapterPages(currentChapter.chapter + 1);
  return nextChapterPages.length > 0 ? nextChapterPages[0] : null;
};

/**
 * Ottiene la pagina precedente in sequenza di capitoli
 * @param currentPageId - ID della pagina corrente
 * @returns ID della pagina precedente o null
 */
export const getPreviousChapterPage = (currentPageId: string): string | null => {
  const currentChapter = getChapterInfo(currentPageId);
  const currentChapterPages = getChapterPages(currentChapter.chapter);
  const currentIndex = currentChapterPages.indexOf(currentPageId);
  
  // Pagina precedente nello stesso capitolo
  if (currentIndex > 0) {
    return currentChapterPages[currentIndex - 1];
  }
  
  // Ultima pagina del capitolo precedente
  const prevChapterPages = getChapterPages(currentChapter.chapter - 1);
  return prevChapterPages.length > 0 ? prevChapterPages[prevChapterPages.length - 1] : null;
};

/**
 * Verifica se una pagina è l'ultima del suo capitolo
 * @param pageId - ID della pagina
 * @returns true se è l'ultima pagina del capitolo
 */
export const isLastPageOfChapter = (pageId: string): boolean => {
  const chapterInfo = getChapterInfo(pageId);
  const chapterPages = getChapterPages(chapterInfo.chapter);
  return chapterPages[chapterPages.length - 1] === pageId;
};

/**
 * Verifica se una pagina è la prima del suo capitolo
 * @param pageId - ID della pagina
 * @returns true se è la prima pagina del capitolo
 */
export const isFirstPageOfChapter = (pageId: string): boolean => {
  const chapterInfo = getChapterInfo(pageId);
  const chapterPages = getChapterPages(chapterInfo.chapter);
  return chapterPages[0] === pageId;
};