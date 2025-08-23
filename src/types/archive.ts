export interface Quote {
  text: string;
  source: string;
}

export interface QuoteData {
  quotes: Quote[];
}

export interface ArchivePageProps {
  onContinueReading?: () => void;
  lastVisitedPage?: string;
}