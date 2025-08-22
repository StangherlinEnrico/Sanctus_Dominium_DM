import React from "react";
import "./WorldOverviewPage.css";

// Import delle icone SVG
import TheaterComedyIcon from "../assets/icons/theater_comedy.svg";
import ChurchIcon from "../assets/icons/church.svg";
import MysteryIcon from "../assets/icons/mystery.svg";
import BrainIcon from "../assets/icons/brain.svg";
import GlobeIcon from "../assets/icons/globe.svg";
import DicesIcon from "../assets/icons/dices.svg";

const WorldOverviewPage: React.FC = () => {
  return (
    <div className="world-overview-page">
      <div className="page-container">
        {/* Header */}
        <header className="page-header">
          <div className="chapter-badge">Capitolo 1</div>
          <img src={GlobeIcon} className="chapter-icon" alt="Globe" />
          <h1 className="page-title">Un mondo di devozione forzata</h1>
          <p className="page-subtitle">
            Panoramica dell'ambientazione e temi centrali di Sanctus Dominium
          </p>
        </header>

        {/* Content */}
        <main className="page-content">
          {/* Introduction */}
          <section className="content-section">
            <h2 className="section-title">Il mondo che fu perduto</h2>
            <div className="section-content">
              <p>
                <strong>Sanctus Dominium</strong> è un mondo dove la libertà è
                solo un ricordo sussurrato nelle ombre. Quello che un tempo era
                un continente di regni diversi e culture fiorenti è ora un
                impero unificato sotto il controllo totale della{" "}
                <em>Ecclesia Sancta</em>, una teocrazia che ha perfezionato
                l'arte del dominio spirituale.
              </p>

              <p>
                Non si tratta di una tirannia brutale che governa con la paura,
                ma di qualcosa di molto più insidioso:{" "}
                <strong>
                  un sistema che rende la sottomissione desiderabile
                </strong>
                . I cittadini non sono oppressi - sono <em>benedetti</em>. Non
                sono schiavi - sono <em>protetti</em>. La ribellione non è
                punita - è <em>curata</em>.
              </p>
            </div>
          </section>

          {/* Core Themes */}
          <section className="content-section">
            <h2 className="section-title">I pilastri del controllo</h2>
            <div className="themes-grid">
              <div className="theme-card">
                <div className="theme-header">
                  <img src={BrainIcon} className="theme-icon" alt="Brain" />
                  <h3 className="theme-title">Controllo mentale</h3>
                </div>
                <div className="theme-content">
                  <p>
                    La vera arma dell'Impero non sono le spade, ma le{" "}
                    <strong>benedizioni</strong>. Attraverso rituali sacri e
                    "doni divini", la popolazione viene gradualmente
                    condizionata a desiderare ciò che l'Impero vuole che
                    desideri.
                  </p>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-header">
                  <img src={MysteryIcon} className="theme-icon" alt="Mystery" />
                  <h3 className="theme-title">Sorveglianza pervasiva</h3>
                </div>
                <div className="theme-content">
                  <p>
                    Ogni preghiera è ascoltata, ogni confessione registrata. Il
                    sistema di sorveglianza dell'Impero si estende attraverso
                    una rete di <strong>Pietre della Vigilanza</strong> e fedeli
                    che riferiscono ogni deviazione dalla norma.
                  </p>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-header">
                  <img src={ChurchIcon} className="theme-icon" alt="Church" />
                  <h3 className="theme-title">Fede corrotta</h3>
                </div>
                <div className="theme-content">
                  <p>
                    La religione è stata trasformata in uno strumento di potere.
                    Quello che una volta portava speranza e comunione ora porta{" "}
                    <strong>obbedienza cieca</strong> e isolamento spirituale.
                  </p>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-header">
                  <img
                    src={TheaterComedyIcon}
                    className="theme-icon"
                    alt="Theater"
                  />
                  <h3 className="theme-title">Doppia vita</h3>
                </div>
                <div className="theme-content">
                  <p>
                    Chi conserva ancora un barlume di libertà interiore deve
                    vivere una <strong>doppia esistenza</strong>: il fedele
                    devoto in pubblico, l'individuo pensante in segreto.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Trinity of Power */}
          <section className="content-section">
            <h2 className="section-title">La Trinità del Potere</h2>
            <div className="section-content">
              <p>
                L'Impero è governato da tre istituzioni che si bilanciano e si
                controllano a vicenda, creando un sistema di potere tanto
                efficace quanto terrificante:
              </p>

              <div className="trinity-structure">
                <div className="trinity-branch">
                  <h4 className="branch-title">L'Altare</h4>
                  <p className="branch-role">Gerarchia Ecclesiastica</p>
                  <p className="branch-description">
                    Controlla la dottrina, i rituali e la vita spirituale.
                    Decide cosa è sacro e cosa è peccaminoso, plasmando la
                    realtà attraverso l'interpretazione divina.
                  </p>
                </div>

                <div className="trinity-branch">
                  <h4 className="branch-title">La Spada</h4>
                  <p className="branch-role">Braccio Militare e Inquisizione</p>
                  <p className="branch-description">
                    Mantiene l'ordine e punisce l'eresia. Non attraverso la
                    violenza brutale, ma attraverso la "correzione
                    misericordiosa" e la rieducazione.
                  </p>
                </div>

                <div className="trinity-branch">
                  <h4 className="branch-title">La Bilancia</h4>
                  <p className="branch-role">Amministrazione e Controllo</p>
                  <p className="branch-description">
                    Gestisce la burocrazia, l'economia e la vita quotidiana.
                    Ogni aspetto dell'esistenza è regolamentato e ottimizzato
                    per il "bene comune".
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Campaign Themes */}
          <section className="content-section">
            <h2 className="section-title">Temi per la tua campagna</h2>
            <div className="campaign-themes">
              <div className="theme-block">
                <h4 className="theme-question">
                  Cosa significa essere liberi?
                </h4>
                <p>
                  In un mondo dove la felicità è garantita ma la scelta è
                  un'illusione, i personaggi devono confrontarsi con domande
                  fondamentali sulla natura della libertà e del libero arbitrio.
                </p>
              </div>

              <div className="theme-block">
                <h4 className="theme-question">Il prezzo della sicurezza</h4>
                <p>
                  L'Impero offre protezione totale da guerra, crimine e
                  sofferenza. Ma questo paradiso ha un prezzo: l'individualità.
                  Vale la pena pagarlo?
                </p>
              </div>

              <div className="theme-block">
                <h4 className="theme-question">Resistenza o accettazione?</h4>
                <p>
                  Combattere un sistema che rende felici tutti gli altri ti
                  rende un eroe o un criminale? E se la resistenza causasse più
                  sofferenza del sistema stesso?
                </p>
              </div>
            </div>
          </section>

          {/* DM Guidance */}
          <section className="content-section dm-guidance">
            <div className="dm-note">
              <div className="dm-note-header">
                <img src={DicesIcon} className="dm-icon" alt="Dices" />
                <h3>Guida per il Dungeon Master</h3>
              </div>
              <div className="dm-note-content">
                <p>
                  <strong>
                    Sanctus Dominium non è un mondo di eroi tradizionali.
                  </strong>{" "}
                  I tuoi giocatori non combatteranno draghi o salveranno
                  principesse. Dovranno invece navigare dilemmi morali complessi
                  dove ogni scelta ha conseguenze profonde.
                </p>

                <h5>Consigli chiave:</h5>
                <ul>
                  <li>
                    <strong>Mostra, non dire:</strong> Lascia che i giocatori
                    scoprano gradualmente l'orrore del sistema attraverso
                    piccoli dettagli e interazioni quotidiane.
                  </li>
                  <li>
                    <strong>Non ci sono soluzioni semplici:</strong> Ogni atto
                    di ribellione dovrebbe avere conseguenze impreviste. Ogni
                    vittoria dovrebbe costare qualcosa.
                  </li>
                  <li>
                    <strong>Il nemico è invisibile:</strong> Il vero antagonista
                    non è una persona ma un sistema. Anche i "cattivi" credono
                    sinceramente di fare del bene.
                  </li>
                  <li>
                    <strong>La normalità è terrificante:</strong> Il vero orrore
                    sta nella quotidianità del controllo, non in eventi
                    drammatici.
                  </li>
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
