// Interfacce per i pulsanti del drawer
export interface DrawerButton {
  id: string;
  title: string;
  icon: string;
  onClick?: () => void;
}

// Interfacce per le sezioni del drawer
export interface DrawerSection {
  title: string;
  buttons: DrawerButton[];
}

// Configurazione completa del drawer
export interface DrawerConfig {
  sections: DrawerSection[];
}

// Informazioni sui capitoli
export interface ChapterInfo {
  chapter: number;
  part: number;
  progress: number; // Percentuale 0-100
}

// Mappa dei capitoli per pagina
export interface ChapterMapping {
  [pageId: string]: ChapterInfo;
}

// Mappa delle pagine ID -> Nome
export interface PageMapping {
  [pageId: string]: string;
}

// Mappa inversa Nome -> ID
export interface NameToPageMapping {
  [pageName: string]: string;
}

// State della navigazione
export interface NavigationState {
  currentPage: string;
  sections: DrawerSection[];
  lastVisitedPage: string;
  isLoading: boolean;
}

// Azioni di navigazione disponibili
export interface NavigationActions {
  navigateTo: (pageId: string) => void;
  navigateToArchive: () => void;
  continueReading: () => void;
  refreshSections: () => void;
  resetNavigation: () => void;
}

// Configurazione dell'applicazione
export interface AppConfig {
  app: {
    defaultPage: string;
    fallbackPage: string;
    excludeFromSaving: string[];
    storeFileName: string;
  };
  keyBindings: {
    disabledKeys: string[];
    enabledKeys: string[];
  };
}

// Props per il SidebarDrawer
export interface SidebarDrawerProps {
  className?: string;
  sections?: DrawerSection[];
  onArchiveClick?: () => void;
  activePageId?: string;
}

// Props per il PageRouter
export interface PageRouterProps {
  currentPage: string;
  lastVisitedPage: string;
  onContinueReading: () => void;
}

// Risultati delle operazioni di storage
export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Tipi per le operazioni di storage
export type StorageKey = "lastVisitedPage" | "lastSaved" | string;
export type StorageValue = string | number | boolean | object;

// Eventi di navigazione
export interface NavigationEvent {
  type: "navigate" | "archive" | "continue" | "reset";
  payload?: {
    pageId?: string;
    pageName?: string;
    timestamp?: string;
  };
}

// Hook return type esteso
export interface UseNavigationReturn extends NavigationState, NavigationActions {
  // Metodi di utilità aggiuntivi potrebbero essere aggiunti qui
}