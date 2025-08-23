import React, { useState, useEffect } from "react";
import { getPageId } from "../utils/pageMapping";
import { getChapterInfo, formatChapterInfo } from "../utils/chapterMapping";
import { getRandomQuote, copyQuoteToClipboard } from "../utils/quotes";
import type { Quote, ArchivePageProps } from "../types/archive";
import "./ArchivePage.css";

// Import delle icone SVG come immagini
import BookRibbonIcon from "../assets/icons/book_ribbon.svg";
import ContentCopyIcon from "../assets/icons/content_copy.svg";
import RandomDiceIcon from "../assets/icons/random_dice.svg";

const ArchivePage: React.FC<ArchivePageProps> = ({
  onContinueReading,
  lastVisitedPage = "Razze sotto il giogo",
}) => {
  const [currentQuote, setCurrentQuote] = useState<Quote>({
    text: "",
    source: "",
  });
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [isNotificationLeaving, setIsNotificationLeaving] = useState(false);

  // Carica citazione casuale all'avvio
  useEffect(() => {
    const randomQuote = getRandomQuote();
    setCurrentQuote(randomQuote);
  }, []);

  // Gestisce il click su "Continua lettura"
  const handleContinueReading = () => {
    if (onContinueReading) {
      onContinueReading();
    } else {
      console.log(`Continua lettura: ${lastVisitedPage}`);
    }
  };

  // Genera una nuova citazione casuale
  const handleNewQuote = () => {
    const randomQuote = getRandomQuote();
    setCurrentQuote(randomQuote);
  };

  // Copia citazione negli appunti con notifica
  const handleCopyQuote = async () => {
    const success = await copyQuoteToClipboard(currentQuote);

    if (success) {
      setShowCopyNotification(true);
      setIsNotificationLeaving(false);

      setTimeout(() => {
        setIsNotificationLeaving(true);
        setTimeout(() => {
          setShowCopyNotification(false);
          setIsNotificationLeaving(false);
        }, 300);
      }, 2000);
    }
  };

  // Calcola informazioni capitolo per l'ultima pagina visitata
  const lastPageId = getPageId(lastVisitedPage);
  const chapterInfo = getChapterInfo(lastPageId);

  return (
    <div className="archive-page">
      {/* Background decorativo */}
      <div className="background-ornaments">
        <div className="ornament ornament-1">⚜</div>
        <div className="ornament ornament-2">✠</div>
        <div className="ornament ornament-3">⚜</div>
        <div className="ornament ornament-4">✠</div>
      </div>

      <div className="archive-container">
        {/* Header */}
        <header className="archive-header">
          <div className="classification-badge">RISERVATO</div>
          <div className="header-ornament">✠ ⚜ ✠</div>
          <h1 className="archive-title">ARCHIVIO SEGRETO</h1>
          <h2 className="archive-subtitle">DELL'IMPERO</h2>
          <p className="archive-description">
            Documenti classificati · Solo per Dungeon Master · Accesso limitato
          </p>
        </header>

        {/* Quote Section */}
        <section className="quote-section">
          <div className="quote-card">
            <div className="quote-header">
              <span className="quote-label">Citazione dal giorno</span>
              <div className="quote-actions">
                <button className="copy-quote-button" onClick={handleCopyQuote}>
                  <img
                    src={ContentCopyIcon}
                    className="button-icon"
                    alt="Copy"
                  />
                </button>
                <button className="new-quote-button" onClick={handleNewQuote}>
                  <img
                    src={RandomDiceIcon}
                    className="button-icon"
                    alt="Random"
                  />
                </button>
              </div>
            </div>

            <div className="quote-content">
              <blockquote className="daily-quote">
                {currentQuote.text}
              </blockquote>
              <cite className="quote-source">— {currentQuote.source}</cite>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="actions-section">
          <div className="continue-card">
            <div className="continue-header">
              <span className="continue-label">Ultima sessione</span>
            </div>
            <button className="continue-button" onClick={handleContinueReading}>
              <div className="continue-content">
                <div className="continue-main">
                  <span className="continue-title">Continua lettura</span>
                  <span className="continue-page">{lastVisitedPage}</span>
                </div>
                <div className="continue-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${chapterInfo.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {formatChapterInfo(chapterInfo)}
                  </span>
                </div>
              </div>
              <div className="continue-arrow">
                <img
                  src={BookRibbonIcon}
                  className="continue-book-icon"
                  alt="Book"
                />
                <span className="continue-arrow-text">→</span>
              </div>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="archive-footer">
          <div className="footer-info">
            <p>Sanctus Dominium - Archivio Riservato del Dungeon Master</p>
          </div>
        </footer>
      </div>

      {/* Copy Notification */}
      {showCopyNotification && (
        <div
          className={`copy-notification ${
            isNotificationLeaving ? "leaving" : ""
          }`}
        >
          <img
            src={ContentCopyIcon}
            className="notification-icon-svg"
            alt="Copied"
          />
          <span>Citazione copiata negli appunti!</span>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
