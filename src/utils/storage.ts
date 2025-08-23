/**
 * Carica l'ultima pagina visitata dal Tauri Store
 */
export const loadLastVisitedPage = async (): Promise<string | null> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load("sanctus-dominium.json", {
      autoSave: true,
      defaults: {},
    });

    const lastPage = await store.get<string>("lastVisitedPage");
    return lastPage ?? null;
  } catch (error) {
    console.log("Nessuna configurazione precedente trovata, usando pagina di default");
    return null;
  }
};

/**
 * Salva la pagina corrente nel Tauri Store
 */
export const saveLastVisitedPage = async (pageId: string): Promise<void> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load("sanctus-dominium.json", {
      autoSave: true,
      defaults: {},
    });

    await store.set("lastVisitedPage", pageId);
    await store.set("lastSaved", new Date().toISOString());

    console.log(`Ultima pagina visitata salvata: ${pageId}`);
  } catch (error) {
    console.error("Errore nel salvare la configurazione:", error);
  }
};