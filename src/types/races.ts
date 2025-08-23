export interface RaceHeader {
  chapterBadge: string;
  title: string;
  subtitle: string;
}

export interface RaceIntroduction {
  title: string;
  content: string[];
}

export interface Race {
  name: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface DMNote {
  title: string;
  content: string;
}

export interface RacesData {
  header: RaceHeader;
  introduction: RaceIntroduction;
  races: Race[];
  dmNote: DMNote;
}