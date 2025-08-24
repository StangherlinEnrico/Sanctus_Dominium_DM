// Union type per tutte le sezioni disponibili
export type Section = TextSection | InfoBox;

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
