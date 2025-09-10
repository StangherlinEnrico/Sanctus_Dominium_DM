// Interfaccia per una singola citazione
export interface Quote {
  text: string;
  source: string;
}

// Interfaccia per i dati delle citazioni dal JSON
export interface QuoteData {
  quotes: Quote[];
}

// Props per il componente MainPage (ex ArchivePage)
export interface MainPageProps {
  onContinueReading?: () => void;
  lastVisitedPage?: string;
}

// Alias per compatibilità con il vecchio codice
export type ArchivePageProps = MainPageProps;

// Stato delle notifiche per le citazioni
export interface QuoteNotificationState {
  showNotification: boolean;
  isLeaving: boolean;
}

// Configurazione delle citazioni
export interface QuoteConfig {
  displayDuration: number; // Durata della notifica in ms
  fadeOutDuration: number; // Durata dell'animazione di uscita in ms
  minQuotes: number; // Numero minimo di citazioni richieste
}