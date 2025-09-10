import { StorageResult, StorageKey, StorageValue } from "../types/navigation.types";

// Configurazione per il file di storage
const STORE_CONFIG = {
  fileName: "sanctus-dominium.json",
  autoSave: true,
  defaults: {},
};

// Chiavi standard utilizzate nel storage
export const STORAGE_KEYS = {
  LAST_VISITED_PAGE: "lastVisitedPage",
  LAST_SAVED: "lastSaved", 
  USER_PREFERENCES: "userPreferences",
  CHAPTER_PROGRESS: "chapterProgress",
} as const;

/**
 * Carica l'ultima pagina visitata dal Tauri Store
 * @returns Promise con l'ID della pagina o null se non trovata
 */
export const loadLastVisitedPage = async (): Promise<string | null> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    const lastPage = await store.get<string>(STORAGE_KEYS.LAST_VISITED_PAGE);
    
    if (lastPage) {
      console.log(`Ultima pagina visitata caricata: ${lastPage}`);
      return lastPage;
    }
    
    return null;
  } catch (error) {
    console.log("Nessuna configurazione precedente trovata, usando pagina di default");
    return null;
  }
};

/**
 * Salva la pagina corrente nel Tauri Store
 * @param pageId - ID della pagina da salvare
 * @returns Promise con risultato dell'operazione
 */
export const saveLastVisitedPage = async (pageId: string): Promise<void> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    await store.set(STORAGE_KEYS.LAST_VISITED_PAGE, pageId);
    await store.set(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());

    console.log(`Ultima pagina visitata salvata: ${pageId}`);
  } catch (error) {
    console.error("Errore nel salvare la configurazione:", error);
    throw error;
  }
};

/**
 * Carica un valore generico dal storage
 * @param key - Chiave del valore da caricare
 * @returns Promise con il valore o null se non trovato
 */
export const loadValue = async <T = StorageValue>(key: StorageKey): Promise<T | null> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    const value = await store.get<T>(key);
    
    if (value !== null && value !== undefined) {
      console.log(`Valore caricato per chiave "${key}":`, value);
      return value;
    }
    
    return null;
  } catch (error) {
    console.error(`Errore nel caricamento del valore per chiave "${key}":`, error);
    return null;
  }
};

/**
 * Salva un valore generico nel storage
 * @param key - Chiave del valore
 * @param value - Valore da salvare
 * @returns Promise con risultato dell'operazione
 */
export const saveValue = async (key: StorageKey, value: StorageValue): Promise<StorageResult<void>> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    await store.set(key, value);
    await store.set(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());

    console.log(`Valore salvato per chiave "${key}":`, value);
    return { success: true };
  } catch (error) {
    const errorMessage = `Errore nel salvare il valore per chiave "${key}": ${error}`;
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

/**
 * Elimina un valore dal storage
 * @param key - Chiave del valore da eliminare
 * @returns Promise con risultato dell'operazione
 */
export const deleteValue = async (key: StorageKey): Promise<StorageResult<void>> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    await store.delete(key);
    await store.set(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());

    console.log(`Valore eliminato per chiave "${key}"`);
    return { success: true };
  } catch (error) {
    const errorMessage = `Errore nell'eliminazione del valore per chiave "${key}": ${error}`;
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

/**
 * Carica tutte le chiavi disponibili nel storage
 * @returns Promise con array delle chiavi o array vuoto in caso di errore
 */
export const getAllKeys = async (): Promise<string[]> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    const keys = await store.keys();
    console.log("Chiavi disponibili nel storage:", keys);
    return keys;
  } catch (error) {
    console.error("Errore nel recupero delle chiavi del storage:", error);
    return [];
  }
};

/**
 * Carica tutti i valori dal storage
 * @returns Promise con oggetto contenente tutti i valori
 */
export const getAllValues = async (): Promise<Record<string, StorageValue>> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    const keys = await store.keys();
    const values: Record<string, StorageValue> = {};

    for (const key of keys) {
      const value = await store.get(key);
      if (value !== null && value !== undefined) {
        values[key] = value;
      }
    }

    console.log("Tutti i valori dal storage:", values);
    return values;
  } catch (error) {
    console.error("Errore nel recupero di tutti i valori del storage:", error);
    return {};
  }
};

/**
 * Pulisce completamente il storage
 * @returns Promise con risultato dell'operazione
 */
export const clearStorage = async (): Promise<StorageResult<void>> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);

    await store.clear();
    console.log("Storage pulito completamente");
    return { success: true };
  } catch (error) {
    const errorMessage = `Errore nella pulizia del storage: ${error}`;
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

/**
 * Verifica se il storage è disponibile e funzionante
 * @returns Promise con true se il storage è disponibile
 */
export const isStorageAvailable = async (): Promise<boolean> => {
  try {
    const { load } = await import("@tauri-apps/plugin-store");
    const store = await load(STORE_CONFIG.fileName, STORE_CONFIG);
    
    // Test di scrittura e lettura
    const testKey = "__storage_test__";
    const testValue = Date.now().toString();
    
    await store.set(testKey, testValue);
    const retrievedValue = await store.get(testKey);
    await store.delete(testKey);
    
    return retrievedValue === testValue;
  } catch (error) {
    console.warn("Storage non disponibile:", error);
    return false;
  }
};

/**
 * Migra i dati da una versione precedente del storage
 * @param migrationRules - Regole di migrazione
 * @returns Promise con risultato della migrazione
 */
export const migrateStorage = async (
  migrationRules: Record<string, (oldValue: any) => StorageValue>
): Promise<StorageResult<void>> => {
  try {
    const allValues = await getAllValues();
    
    for (const [oldKey, migrationFn] of Object.entries(migrationRules)) {
      if (oldKey in allValues) {
        const oldValue = allValues[oldKey];
        const newValue = migrationFn(oldValue);
        await saveValue(oldKey, newValue);
        console.log(`Migrata chiave "${oldKey}"`);
      }
    }
    
    return { success: true };
  } catch (error) {
    const errorMessage = `Errore nella migrazione del storage: ${error}`;
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};