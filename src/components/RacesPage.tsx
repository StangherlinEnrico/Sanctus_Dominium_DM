// src/components/RacesPage.tsx
import React, { useState } from "react";
import racesData from "../data/races.json";
import { formatContent } from "../utils/worldContent";
import {
  getRaceDetails,
  formatTraits,
  formatCulture,
  formatNames,
} from "../utils/raceDetails";
import type { RacesData, Race } from "../types/races";
import DnaIcon from "../assets/icons/dna.svg";
import DicesIcon from "../assets/icons/dices.svg";
import DownloadIcon from "../assets/icons/download.svg";
import CrownIcon from "../assets/icons/crown.svg";
import CandleIcon from "../assets/icons/candle.svg";
import SkullIcon from "../assets/icons/skull.svg";
import WhisperIcon from "../assets/icons/whisper.svg";
import BookIcon from "../assets/icons/book.svg";
import BrokenChainIcon from "../assets/icons/broken_chain.svg";
import CloseIcon from "../assets/icons/close.svg";
import "./RacesPage.css";
import "../styles/global-scrollbar.css";

// Mapping delle icone
const getIconForRace = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    crown: CrownIcon,
    candle: CandleIcon,
    skull: SkullIcon,
    whisper: WhisperIcon,
    book: BookIcon,
    broken_chain: BrokenChainIcon,
  };
  return iconMap[iconName] || DnaIcon;
};

// Componente per singola razza
const RaceCard: React.FC<{
  race: Race;
  index: number;
  onClick: () => void;
}> = ({ race, index, onClick }) => {
  const iconSrc = getIconForRace(race.icon);
  const isEvenRow = Math.floor(index / 2) % 2 === 0;
  const isLeftCard = index % 2 === 0;

  return (
    <div
      className={`races-page__race-card ${
        isEvenRow ? "races-page__race-card--even" : "races-page__race-card--odd"
      } ${
        isLeftCard
          ? "races-page__race-card--left"
          : "races-page__race-card--right"
      }`}
      onClick={onClick}
    >
      <div className="races-page__race-header">
        <img src={iconSrc} className="races-page__race-icon" alt={race.name} />
        <div className="races-page__race-title-group">
          <h3 className="races-page__race-name">{race.name}</h3>
          <p className="races-page__race-subtitle">{race.subtitle}</p>
        </div>
      </div>
      <div className="races-page__race-content">
        <p
          dangerouslySetInnerHTML={{ __html: formatContent(race.description) }}
        />
      </div>
      <div className="races-page__race-footer">
        <span className="races-page__click-hint">Clicca per dettagli</span>
      </div>
    </div>
  );
};

// Popup per dettagli razza
const RaceDetailPopup: React.FC<{ race: Race; onClose: () => void }> = ({
  race,
  onClose,
}) => {
  const iconSrc = getIconForRace(race.icon);
  const raceDetails = getRaceDetails(race.name);

  if (!raceDetails) {
    return null;
  }

  return (
    <div className="races-page__popup-overlay">
      <div className="races-page__popup-content">
        <div className="races-page__popup-header">
          <div className="races-page__popup-title-group">
            <img
              src={iconSrc}
              className="races-page__popup-header-icon"
              alt={race.name}
            />
            <div>
              <h2 className="races-page__popup-title">{race.name}</h2>
              <p className="races-page__popup-subtitle">{race.subtitle}</p>
            </div>
          </div>
          <button className="races-page__popup-close" onClick={onClose}>
            <img
              src={CloseIcon}
              className="races-page__close-icon"
              alt="Chiudi"
            />
          </button>
        </div>

        <div className="races-page__popup-body">
          {/* Immagine fissa a sinistra */}
          <div className="races-page__popup-image-section">
            <div className="races-page__popup-image-placeholder">
              <img
                src={iconSrc}
                className="races-page__popup-main-icon"
                alt={race.name}
              />
              <span className="races-page__image-text">
                Ritratto di {race.name}
              </span>
            </div>
          </div>

          {/* Contenuto scrollabile a destra */}
          <div className="races-page__popup-text-section">
            <div className="races-page__popup-description">
              <h3>Descrizione</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatContent(race.description),
                }}
              />
            </div>

            <div className="races-page__popup-section">
              <h3>Tratti Razziali</h3>
              <ul
                dangerouslySetInnerHTML={{
                  __html: formatTraits(raceDetails.traits),
                }}
              />
            </div>

            <div className="races-page__popup-section">
              <h3>Cultura e Società</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: formatCulture(raceDetails.culture),
                }}
              />
            </div>

            <div className="races-page__popup-section">
              <h3>Nomi Tipici</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: formatNames(raceDetails.names),
                }}
              />
            </div>

            <div className="races-page__popup-section">
              <h3>Relazioni nell'Impero</h3>
              <p>{raceDetails.relations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RacesPage: React.FC = () => {
  const data = racesData as RacesData;
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const handleRaceClick = (race: Race) => {
    setSelectedRace(race);
  };

  const handleClosePopup = () => {
    setSelectedRace(null);
  };

  return (
    <div className="races-page">
      <div className="races-page__page-container">
        {/* Header */}
        <header className="races-page__page-header">
          <div className="races-page__chapter-badge">
            {data.header.chapterBadge}
          </div>
          <img src={DnaIcon} className="races-page__chapter-icon" alt="DNA" />
          <h1 className="races-page__page-title">{data.header.title}</h1>
          <p className="races-page__page-subtitle">{data.header.subtitle}</p>

          <button
            className="races-page__download-button"
            onClick={() => console.log("Download capitolo")}
          >
            <img
              src={DownloadIcon}
              className="races-page__download-icon"
              alt="Download"
            />
            Scarica il capitolo
          </button>
        </header>

        {/* Content */}
        <main className="races-page__page-content">
          {/* Introduction */}
          <section className="races-page__content-section">
            <h2 className="races-page__section-title">
              {data.introduction.title}
            </h2>
            <div className="races-page__section-content">
              {data.introduction.content.map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: formatContent(paragraph) }}
                />
              ))}
            </div>
          </section>

          {/* Races Grid */}
          <section className="races-page__content-section">
            <h2 className="races-page__section-title">Le Sei Stirpi</h2>
            <div className="races-page__races-grid">
              {data.races.map((race, index) => (
                <RaceCard
                  key={index}
                  race={race}
                  index={index}
                  onClick={() => handleRaceClick(race)}
                />
              ))}
            </div>
          </section>

          {/* DM Note */}
          <section className="races-page__content-section races-page__dm-guidance">
            <div className="races-page__dm-note">
              <div className="races-page__dm-note-header">
                <img src={DicesIcon} className="races-page__dm-icon" alt="DM" />
                <h3>{data.dmNote.title}</h3>
              </div>
              <div className="races-page__dm-note-content">
                <p>{data.dmNote.content}</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Popup per dettagli razza */}
      {selectedRace && (
        <RaceDetailPopup race={selectedRace} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default RacesPage;
