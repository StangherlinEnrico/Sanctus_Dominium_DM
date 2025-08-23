export interface WorldHeader {
  chapterBadge: string;
  title: string;
  subtitle: string;
}

export interface WorldSection {
  title: string;
  content: string[];
}

export interface WorldTheme {
  icon: string;
  title: string;
  description: string;
}

export interface TrinityBranch {
  title: string;
  role: string;
  description: string;
}

export interface Trinity {
  title: string;
  description: string;
  branches: TrinityBranch[];
}

export interface CampaignTheme {
  question: string;
  description: string;
}

export interface DMPrinciple {
  title: string;
  description: string;
}

export interface DMGuidance {
  title: string;
  intro: string;
  principles: DMPrinciple[];
}

export interface WorldOverviewData {
  header: WorldHeader;
  introduction: WorldSection;
  themes: WorldTheme[];
  trinity: Trinity;
  campaignThemes: CampaignTheme[];
  dmGuidance: DMGuidance;
}