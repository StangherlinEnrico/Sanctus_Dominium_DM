import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ArchivePage from "./components/ArchivePage";
import WorldOverviewPage from "./components/WorldOverviewPage";
import drawerSectionsData from "./data/drawer-sections.json";
import "./App.css";

interface DrawerButton {
  id: string;
  title: string;
  icon: string;
  onClick?: () => void;
}

interface DrawerSection {
  title: string;
  buttons: DrawerButton[];
}

interface DrawerConfig {
  sections: DrawerSection[];
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>("archive");
  const [sections, setSections] = useState<DrawerSection[]>([]);
  const [lastVisitedPage, setLastVisitedPage] = useState<string>(
    "Razze sotto il giogo"
  );

  // Carica l'ultima pagina visitata all'avvio (ma resta sull'archivio)
  useEffect(() => {
    const loadLastVisitedPage = async () => {
      try {
        const { load } = await import("@tauri-apps/plugin-store");
        const store = await load("sanctus-dominium.json", {
          autoSave: true,
          defaults: {},
        });

        const lastPage = await store.get<string>("lastVisitedPage");
        if (lastPage) {
          // Non cambiare la pagina corrente, solo aggiorna il nome per l'archivio
          const pageName = getCurrentPageName(lastPage);
          setLastVisitedPage(pageName);
        }
      } catch (error) {
        console.log(
          "Nessuna configurazione precedente trovata, usando pagina di default"
        );
      }
    };

    loadLastVisitedPage();
  }, []);

  // Salva la pagina corrente quando cambia (escludendo archive e settings)
  useEffect(() => {
    const saveLastVisitedPage = async () => {
      try {
        const { load } = await import("@tauri-apps/plugin-store");
        const store = await load("sanctus-dominium.json", {
          autoSave: true,
          defaults: {},
        });

        await store.set("lastVisitedPage", currentPage);
        await store.set("lastSaved", new Date().toISOString());

        // Aggiorna anche il nome per l'archivio
        const pageName = getCurrentPageName(currentPage);
        setLastVisitedPage(pageName);

        console.log(`Ultima pagina visitata salvata: ${currentPage}`);
      } catch (error) {
        console.error("Errore nel salvare la configurazione:", error);
      }
    };

    // Salva solo se non è la pagina principale (archive) o impostazioni (settings)
    if (currentPage !== "archive" && currentPage !== "settings") {
      saveLastVisitedPage();
    }
  }, [currentPage]);

  // Carica le sezioni dal JSON e aggiunge le funzioni onClick
  useEffect(() => {
    const config = drawerSectionsData as DrawerConfig;

    const sectionsWithHandlers = config.sections.map((section) => ({
      ...section,
      buttons: section.buttons.map((button) => ({
        ...button,
        onClick: () => {
          console.log(`Cliccato: ${button.title}`);
          setCurrentPage(button.id);
        },
      })),
    }));

    setSections(sectionsWithHandlers);
  }, []);

  // Disabilita tasti funzione (tranne F12)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Disabilita F1-F11 (ma non F12)
      if (
        event.key.startsWith("F") &&
        event.key.length <= 3 &&
        event.key !== "F12"
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    // Aggiungi listener globale
    document.addEventListener("keydown", handleKeyDown, true);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  // Funzione per ottenere il nome della pagina corrente
  const getCurrentPageName = (pageId?: string) => {
    const targetPage = pageId || currentPage;
    const pageMap: { [key: string]: string } = {
      archive: "Archivio Segreto",
      "world-overview": "Un mondo di devozione forzata",
      races: "Razze sotto il giogo",
      classes: "Classi della teocrazia",
      backgrounds: "Background di sottomissione e ribellione",
      feats: "Talenti della fede manipolata",
      surveillance: "Sistema di sorveglianza e sospetto",
      devotion: "Devozione e condizionamento",
      "double-life": "Doppia vita e identità",
      "silence-zones": "Zone di silenzio",
      resistance: "Resistenza e sabotaggio",
      "corruption-economy": "Economia della corruzione",
      "money-equipment": "Denaro ed equipaggiamento",
      "world-sanctus": "Il mondo del Sanctus Dominium",
      "sanctus-centrale": "Sanctus Centrale",
      "confinium-borealis": "Confinium Borealis",
      "prosperitas-australis": "Prosperitas Australis",
      "umbra-occidentalis": "Umbra Occidentalis",
      "orientalis-extrema": "Orientalis Extrema",
      "insularum-mare": "Insularum Mare",
      "cordillera-centralis": "Cordillera Centralis",
    };

    return pageMap[targetPage] || "Archivio Segreto";
  };

  const handleArchiveClick = () => {
    console.log("Cliccato: Archivio Segreto");
    setCurrentPage("archive");
  };

  const handleContinueReading = () => {
    // Trova l'ID della pagina dall'ultima pagina visitata
    const pageMap: { [key: string]: string } = {
      "Un mondo di devozione forzata": "world-overview",
      "Razze sotto il giogo": "races",
      "Classi della teocrazia": "classes",
      "Background di sottomissione e ribellione": "backgrounds",
      "Talenti della fede manipolata": "feats",
      "Sistema di sorveglianza e sospetto": "surveillance",
      "Devozione e condizionamento": "devotion",
      "Doppia vita e identità": "double-life",
      "Zone di silenzio": "silence-zones",
      "Resistenza e sabotaggio": "resistance",
      "Economia della corruzione": "corruption-economy",
      "Denaro ed equipaggiamento": "money-equipment",
      "Il mondo del Sanctus Dominium": "world-sanctus",
      "Sanctus Centrale": "sanctus-centrale",
      "Confinium Borealis": "confinium-borealis",
      "Prosperitas Australis": "prosperitas-australis",
      "Umbra Occidentalis": "umbra-occidentalis",
      "Orientalis Extrema": "orientalis-extrema",
      "Insularum Mare": "insularum-mare",
      "Cordillera Centralis": "cordillera-centralis",
    };

    const pageId = pageMap[lastVisitedPage] || "races";
    console.log(`Continua lettura: ${lastVisitedPage} (${pageId})`);
    setCurrentPage(pageId);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "archive":
        return (
          <ArchivePage
            lastVisitedPage={lastVisitedPage}
            onContinueReading={handleContinueReading}
          />
        );

      // Fondamenta dell'Impero
      case "world-overview":
        return <WorldOverviewPage />;
      case "races":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Razze sotto il giogo
          </div>
        );
      case "classes":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Classi della teocrazia
          </div>
        );
      case "backgrounds":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Background di sottomissione e ribellione
          </div>
        );
      case "feats":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Talenti della fede manipolata
          </div>
        );

      // Vita nell'ombra
      case "surveillance":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Sistema di sorveglianza e sospetto
          </div>
        );
      case "devotion":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Devozione e condizionamento
          </div>
        );
      case "double-life":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Doppia vita e identità
          </div>
        );
      case "silence-zones":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Zone di silenzio
          </div>
        );
      case "resistance":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Resistenza e sabotaggio
          </div>
        );
      case "corruption-economy":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Economia della corruzione
          </div>
        );

      // Strumenti del potere
      case "money-equipment":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Denaro ed equipaggiamento
          </div>
        );

      // Domini dell'Impero
      case "world-sanctus":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Il mondo del Sanctus Dominium
          </div>
        );
      case "sanctus-centrale":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Sanctus Centrale
          </div>
        );
      case "confinium-borealis":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Confinium Borealis
          </div>
        );
      case "prosperitas-australis":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Prosperitas Australis
          </div>
        );
      case "umbra-occidentalis":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Umbra Occidentalis
          </div>
        );
      case "orientalis-extrema":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Orientalis Extrema
          </div>
        );
      case "insularum-mare":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Insularum Mare
          </div>
        );
      case "cordillera-centralis":
        return (
          <div style={{ padding: "40px", color: "#e0e0e0" }}>
            Pagina: Cordillera Centralis
          </div>
        );

      default:
        return <ArchivePage lastVisitedPage={lastVisitedPage} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        sections={sections}
        onArchiveClick={handleArchiveClick}
        activePageId={currentPage}
      />
      <div className="content-area">{renderCurrentPage()}</div>
    </div>
  );
}

export default App;
