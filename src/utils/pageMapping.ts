// Mappa centrale delle pagine: ID -> Nome
export const PAGE_NAMES: Record<string, string> = {
  archive: "Archivio Segreto",
  "world-overview": "Un mondo di devozione forzata",
  races: "Razze sotto il giogo",
  classes: "Classi della teocrazia",
  backgrounds: "Background di sottomissione e ribellione",
  feats: "Talenti della fede manipolata",
  surveillance: "Sistema di sorveglianza e sospetto",
  devotion: "Devozione e condizionamento",
  "double-life": "Doppia vita e identità",
  "silence-zones": "Zone di silenzio",
  resistance: "Resistenza e sabotaggio",
  "corruption-economy": "Economia della corruzione",
  "money-equipment": "Denaro ed equipaggiamento",
  "world-sanctus": "Il mondo del Sanctus Dominium",
  "sanctus-centrale": "Sanctus Centrale",
  "confinium-borealis": "Confinium Borealis",
  "prosperitas-australis": "Prosperitas Australis",
  "umbra-occidentalis": "Umbra Occidentalis",
  "orientalis-extrema": "Orientalis Extrema",
  "insularum-mare": "Insularum Mare",
  "cordillera-centralis": "Cordillera Centralis",
};

// Mappa inversa: Nome -> ID
export const NAME_TO_PAGE_ID: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_NAMES).map(([id, name]) => [name, id])
);

/**
 * Ottiene il nome di una pagina dal suo ID
 */
export const getPageName = (pageId: string): string => {
  return PAGE_NAMES[pageId] || "Archivio Segreto";
};

/**
 * Ottiene l'ID di una pagina dal suo nome
 */
export const getPageId = (pageName: string): string => {
  return NAME_TO_PAGE_ID[pageName] || "races";
};