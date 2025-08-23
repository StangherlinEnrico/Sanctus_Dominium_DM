interface ChapterInfo {
  chapter: number;
  part: number;
  progress: number; // Percentuale 0-100
}

// Mappa che associa ogni pagina al suo capitolo e parte
export const PAGE_CHAPTERS: Record<string, ChapterInfo> = {
  // Capitolo 1: Fondamenta dell'Impero
  "world-overview": { chapter: 1, part: 1, progress: 10 },
  races: { chapter: 1, part: 2, progress: 25 },
  classes: { chapter: 1, part: 3, progress: 40 },
  backgrounds: { chapter: 1, part: 4, progress: 55 },
  feats: { chapter: 1, part: 5, progress: 70 },

  // Capitolo 2: Meccaniche del Controllo
  surveillance: { chapter: 2, part: 1, progress: 15 },
  devotion: { chapter: 2, part: 2, progress: 35 },
  "double-life": { chapter: 2, part: 3, progress: 55 },
  "silence-zones": { chapter: 2, part: 4, progress: 75 },
  resistance: { chapter: 2, part: 5, progress: 90 },

  // Capitolo 3: Economia e Risorse
  "corruption-economy": { chapter: 3, part: 1, progress: 30 },
  "money-equipment": { chapter: 3, part: 2, progress: 65 },

  // Capitolo 4: Geografia dell'Impero
  "world-sanctus": { chapter: 4, part: 1, progress: 20 },
  "sanctus-centrale": { chapter: 4, part: 2, progress: 30 },
  "confinium-borealis": { chapter: 4, part: 3, progress: 45 },
  "prosperitas-australis": { chapter: 4, part: 4, progress: 60 },
  "umbra-occidentalis": { chapter: 4, part: 5, progress: 75 },
  "orientalis-extrema": { chapter: 4, part: 6, progress: 85 },
  "insularum-mare": { chapter: 4, part: 7, progress: 95 },
  "cordillera-centralis": { chapter: 4, part: 8, progress: 100 },
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