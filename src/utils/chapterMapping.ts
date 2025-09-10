interface ChapterInfo {
  chapter: number;
  part: number;
  progress: number; // Percentuale 0-100
}

// Mappa che associa ogni pagina al suo capitolo e parte
export const PAGE_CHAPTERS: Record<string, ChapterInfo> = {
  // Capitolo 1: Fondamenta dell'Impero
  races: { chapter: 1, part: 2, progress: 5 }
};

/**
 * Ottiene le informazioni del capitolo per una pagina
 */
export const getChapterInfo = (pageId: string): ChapterInfo => {
  return PAGE_CHAPTERS[pageId] || { chapter: 1, part: 1, progress: 0 };
};

/**
 * Formatta il capitolo nel formato "Capitolo X - Parte Y"
 */
export const formatChapterInfo = (chapterInfo: ChapterInfo): string => {
  return `Capitolo ${chapterInfo.chapter} - Parte ${chapterInfo.part}`;
};