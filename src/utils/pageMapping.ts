// Mappa centrale delle pagine: ID -> Nome
export const PAGE_NAMES: Record<string, string> = {
  archive: "Archivio Segreto",
  races: "Razze sotto il giogo",
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