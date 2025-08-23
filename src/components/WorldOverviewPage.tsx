// src/components/WorldOverviewPage.tsx
import React from "react";
import { getWorldData, formatContent } from "../utils/worldContent";
import type {
  WorldTheme,
  TrinityBranch,
  CampaignTheme,
  DMPrinciple,
} from "../types/world";
import GlobeIcon from "../assets/icons/globe.svg";
import DicesIcon from "../assets/icons/dices.svg";
import DownloadIcon from "../assets/icons/download.svg";
import BrainIcon from "../assets/icons/brain.svg";
import ChurchIcon from "../assets/icons/church.svg";
import TheaterComedyIcon from "../assets/icons/theater_comedy.svg";
import MysteryIcon from "../assets/icons/mystery.svg";
import "./WorldOverviewPage.css";
import "../styles/global-scrollbar.css";

// Componenti inline per evitare problemi di import
const WorldThemeCard: React.FC<{ theme: WorldTheme }> = ({ theme }) => {
  // Mapping diretto delle icone invece di usare getIconPath
  const iconMap: Record<string, string> = {
    brain: BrainIcon,
    church: ChurchIcon,
    theater_comedy: TheaterComedyIcon,
    mystery: MysteryIcon,
    globe: GlobeIcon,
    dices: DicesIcon,
  };

  const iconSrc = iconMap[theme.icon] || GlobeIcon;

  return (
    <div className="world-overview-page__theme-card">
      <div className="world-overview-page__theme-header">
        <img
          src={iconSrc}
          className="world-overview-page__theme-icon"
          alt={theme.title}
        />
        <h3 className="world-overview-page__theme-title">{theme.title}</h3>
      </div>
      <div className="world-overview-page__theme-content">
        <p
          dangerouslySetInnerHTML={{ __html: formatContent(theme.description) }}
        />
      </div>
    </div>
  );
};

const TrinityCard: React.FC<{ branch: TrinityBranch; index: number }> = ({
  branch,
  index,
}) => (
  <div
    className={`world-overview-page__trinity-branch world-overview-page__trinity-branch--${
      index + 1
    }`}
  >
    <h4 className="world-overview-page__branch-title">{branch.title}</h4>
    <p className="world-overview-page__branch-role">{branch.role}</p>
    <p className="world-overview-page__branch-description">
      {branch.description}
    </p>
  </div>
);

const CampaignThemeCard: React.FC<{ theme: CampaignTheme }> = ({ theme }) => (
  <div className="world-overview-page__theme-block">
    <h4 className="world-overview-page__theme-question">{theme.question}</h4>
    <p>{theme.description}</p>
  </div>
);

const DMPrincipleItem: React.FC<{ principle: DMPrinciple }> = ({
  principle,
}) => (
  <li>
    <strong>{principle.title}:</strong> {principle.description}
  </li>
);

const WorldOverviewPage: React.FC = () => {
  const worldData = getWorldData();

  return (
    <div className="world-overview-page">
      <div className="world-overview-page__page-container">
        {/* Header */}
        <header className="world-overview-page__page-header">
          <div className="world-overview-page__chapter-badge">
            {worldData.header.chapterBadge}
          </div>
          <img
            src={GlobeIcon}
            className="world-overview-page__chapter-icon"
            alt="Globe"
          />
          <h1 className="world-overview-page__page-title">
            {worldData.header.title}
          </h1>
          <p className="world-overview-page__page-subtitle">
            {worldData.header.subtitle}
          </p>

          {/* Download Button */}
          <button
            className="world-overview-page__download-button"
            onClick={() => console.log("Download capitolo")}
          >
            <img
              src={DownloadIcon}
              className="world-overview-page__download-icon"
              alt="Download"
            />
            Scarica il capitolo
          </button>
        </header>

        {/* Content */}
        <main className="world-overview-page__page-content">
          {/* Introduction */}
          <section className="world-overview-page__content-section">
            <h2 className="world-overview-page__section-title">
              {worldData.introduction.title}
            </h2>
            <div className="world-overview-page__section-content">
              {worldData.introduction.content.map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: formatContent(paragraph) }}
                />
              ))}
            </div>
          </section>

          {/* Core Themes */}
          <section className="world-overview-page__content-section">
            <h2 className="world-overview-page__section-title">
              I pilastri del controllo
            </h2>
            <div className="world-overview-page__themes-grid">
              {worldData.themes.map((theme, index) => (
                <WorldThemeCard key={index} theme={theme} />
              ))}
            </div>
          </section>

          {/* The Trinity of Power */}
          <section className="world-overview-page__content-section">
            <h2 className="world-overview-page__section-title">
              {worldData.trinity.title}
            </h2>
            <div className="world-overview-page__section-content">
              <p>{worldData.trinity.description}</p>
              <div className="world-overview-page__trinity-structure">
                {worldData.trinity.branches.map((branch, index) => (
                  <TrinityCard key={index} branch={branch} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Campaign Themes */}
          <section className="world-overview-page__content-section">
            <h2 className="world-overview-page__section-title">
              Temi per la tua campagna
            </h2>
            <div className="world-overview-page__campaign-themes">
              {worldData.campaignThemes.map((theme, index) => (
                <CampaignThemeCard key={index} theme={theme} />
              ))}
            </div>
          </section>

          {/* DM Guidance */}
          <section className="world-overview-page__content-section world-overview-page__dm-guidance">
            <div className="world-overview-page__dm-note">
              <div className="world-overview-page__dm-note-header">
                <img
                  src={DicesIcon}
                  className="world-overview-page__dm-icon"
                  alt="DM"
                />
                <h3>{worldData.dmGuidance.title}</h3>
              </div>
              <div className="world-overview-page__dm-note-content">
                <p>{worldData.dmGuidance.intro}</p>
                <h5>Principi fondamentali:</h5>
                <ul>
                  {worldData.dmGuidance.principles.map((principle, index) => (
                    <DMPrincipleItem key={index} principle={principle} />
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WorldOverviewPage;
