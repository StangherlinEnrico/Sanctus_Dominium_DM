export interface ClassHeader {
  chapterBadge: string;
  title: string;
  subtitle: string;
}

export interface ClassIntroduction {
  title: string;
  content: string[];
}

export interface GameClass {
  name: string;
  subtitle: string;
  baseClass: string;
  description: string;
  emoji: string;
  role: string;
}

export interface DMNote {
  title: string;
  content: string;
}

export interface ClassesData {
  header: ClassHeader;
  introduction: ClassIntroduction;
  classes: GameClass[];
  dmNote: DMNote;
}

export interface ClassDetails {
  features: string[];
  culture: string[];
  equipment: {
    weapons: string;
    armor: string;
    tools: string;
  };
  roleplay: string;
}