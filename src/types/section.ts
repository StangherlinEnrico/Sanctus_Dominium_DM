// Union type per tutte le sezioni disponibili
export type Section = TextSection | InfoBox | ContentBox | GridSection;

// Array di sezioni
export interface Sections {
  sections: Section[];
}

export interface TextSection {
  type: "textSection";
  title: string;
  content: string;
}

export interface InfoBox {
  type: "infoBox";
  svgIcon: string;
  title: string;
  content: string;
  severity: "danger" | "warning" | "info" | "success";
}

export interface ContentBox {
  type: "contentBox";
  svgIcon?: string;
  title: string;
  subtitle?: string;
  content: string;
  tag?: string;
  additionalInfo?: string[];
}

export interface GridSection {
  type: "gridSection";
  title: string;
  subtitle?: string;
  columns: number;
  gap?: "small" | "medium" | "large";
  itemType: "contentBox" | "infoBox" | "textSection";
  items: Array<Omit<ContentBox, "type"> | Omit<InfoBox, "type"> | Omit<TextSection, "type">>;
}