// src/components/ClassesPage.tsx
import React, { useState } from "react";
import classesData from "../data/classes.json";
import { formatContent } from "../utils/worldContent";
import {
  getClassDetails,
  formatFeatures,
  formatCulture,
  formatEquipment,
} from "../utils/classDetails";
import type { ClassesData, GameClass } from "../types/classes";
import DnaIcon from "../assets/icons/dna.svg";
import DicesIcon from "../assets/icons/dices.svg";
import DownloadIcon from "../assets/icons/download.svg";
import CloseIcon from "../assets/icons/close.svg";
import "./ClassesPage.css";
import "../styles/global-scrollbar.css";

// Componente per singola classe
const ClassCard: React.FC<{
  gameClass: GameClass;
  index: number;
  onClick: () => void;
}> = ({ gameClass, index, onClick }) => {
  const isEvenRow = Math.floor(index / 2) % 2 === 0;
  const isLeftCard = index % 2 === 0;

  return (
    <div
      className={`classes-page__class-card ${
        isEvenRow
          ? "classes-page__class-card--even"
          : "classes-page__class-card--odd"
      } ${
        isLeftCard
          ? "classes-page__class-card--left"
          : "classes-page__class-card--right"
      }`}
      onClick={onClick}
    >
      <div className="classes-page__class-header">
        <span
          className="classes-page__class-emoji"
          role="img"
          aria-label={gameClass.name}
        >
          {gameClass.emoji}
        </span>
        <div className="classes-page__class-title-group">
          <h3 className="classes-page__class-name">{gameClass.name}</h3>
          <p className="classes-page__class-subtitle">{gameClass.subtitle}</p>
          <span className="classes-page__base-class">
            Basato su: {gameClass.baseClass}
          </span>
        </div>
        <div className="classes-page__class-role">
          <span className="classes-page__role-tag">{gameClass.role}</span>
        </div>
      </div>
      <div className="classes-page__class-content">
        <p
          dangerouslySetInnerHTML={{
            __html: formatContent(gameClass.description),
          }}
        />
      </div>
      <div className="classes-page__class-footer">
        <span className="classes-page__click-hint">Clicca per dettagli</span>
      </div>
    </div>
  );
};

// Popup per dettagli classe
const ClassDetailPopup: React.FC<{
  gameClass: GameClass;
  onClose: () => void;
}> = ({ gameClass, onClose }) => {
  const classDetails = getClassDetails(gameClass.name);

  if (!classDetails) {
    return null;
  }

  return (
    <div className="classes-page__popup-overlay">
      <div className="classes-page__popup-content">
        <div className="classes-page__popup-header">
          <div className="classes-page__popup-title-group">
            <span
              className="classes-page__popup-emoji"
              role="img"
              aria-label={gameClass.name}
            >
              {gameClass.emoji}
            </span>
            <div>
              <h2 className="classes-page__popup-title">{gameClass.name}</h2>
              <p className="classes-page__popup-subtitle">
                {gameClass.subtitle}
              </p>
              <span className="classes-page__popup-base-class">
                Classe Base: {gameClass.baseClass}
              </span>
            </div>
          </div>
          <button className="classes-page__popup-close" onClick={onClose}>
            <img
              src={CloseIcon}
              className="classes-page__close-icon"
              alt="Chiudi"
            />
          </button>
        </div>

        <div className="classes-page__popup-body">
          {/* Immagine fissa a sinistra */}
          <div className="classes-page__popup-image-section">
            <div className="classes-page__popup-image-placeholder">
              <span
                className="classes-page__popup-main-emoji"
                role="img"
                aria-label={gameClass.name}
              >
                {gameClass.emoji}
              </span>
              <span className="classes-page__image-text">
                Ritratto di {gameClass.name}
              </span>
            </div>
          </div>

          {/* Contenuto scrollabile a destra */}
          <div className="classes-page__popup-text-section">
            <div className="classes-page__popup-description">
              <h3>Descrizione</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatContent(gameClass.description),
                }}
              />
            </div>

            <div className="classes-page__popup-section">
              <h3>Caratteristiche Speciali</h3>
              <ul
                dangerouslySetInnerHTML={{
                  __html: formatFeatures(classDetails.features),
                }}
              />
            </div>

            <div className="classes-page__popup-section">
              <h3>Cultura e Società</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: formatCulture(classDetails.culture),
                }}
              />
            </div>

            <div className="classes-page__popup-section">
              <h3>Equipaggiamento Tipico</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: formatEquipment(classDetails.equipment),
                }}
              />
            </div>

            <div className="classes-page__popup-section">
              <h3>Interpretazione e Roleplay</h3>
              <p>{classDetails.roleplay}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClassesPage: React.FC = () => {
  const data = classesData as ClassesData;
  const [selectedClass, setSelectedClass] = useState<GameClass | null>(null);

  const handleClassClick = (gameClass: GameClass) => {
    setSelectedClass(gameClass);
  };

  const handleClosePopup = () => {
    setSelectedClass(null);
  };

  return (
    <div className="classes-page">
      <div className="classes-page__page-container">
        {/* Header */}
        <header className="classes-page__page-header">
          <div className="classes-page__chapter-badge">
            {data.header.chapterBadge}
          </div>
          <img
            src={DnaIcon}
            className="classes-page__chapter-icon"
            alt="Classes"
          />
          <h1 className="classes-page__page-title">{data.header.title}</h1>
          <p className="classes-page__page-subtitle">{data.header.subtitle}</p>

          <button
            className="classes-page__download-button"
            onClick={() => console.log("Download capitolo")}
          >
            <img
              src={DownloadIcon}
              className="classes-page__download-icon"
              alt="Download"
            />
            Scarica il capitolo
          </button>
        </header>

        {/* Content */}
        <main className="classes-page__page-content">
          {/* Introduction */}
          <section className="classes-page__content-section">
            <h2 className="classes-page__section-title">
              {data.introduction.title}
            </h2>
            <div className="classes-page__section-content">
              {data.introduction.content.map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: formatContent(paragraph) }}
                />
              ))}
            </div>
          </section>

          {/* Classes Grid */}
          <section className="classes-page__content-section">
            <h2 className="classes-page__section-title">Le Dodici Classi</h2>
            <div className="classes-page__classes-grid">
              {data.classes.map((gameClass, index) => (
                <ClassCard
                  key={index}
                  gameClass={gameClass}
                  index={index}
                  onClick={() => handleClassClick(gameClass)}
                />
              ))}
            </div>
          </section>

          {/* DM Note */}
          <section className="classes-page__content-section classes-page__dm-guidance">
            <div className="classes-page__dm-note">
              <div className="classes-page__dm-note-header">
                <img
                  src={DicesIcon}
                  className="classes-page__dm-icon"
                  alt="DM"
                />
                <h3>{data.dmNote.title}</h3>
              </div>
              <div className="classes-page__dm-note-content">
                <p>{data.dmNote.content}</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Popup per dettagli classe */}
      {selectedClass && (
        <ClassDetailPopup
          gameClass={selectedClass}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ClassesPage;
