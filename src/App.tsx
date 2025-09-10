import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import PageRouter from "./components/PageRouter";
import drawerSectionsData from "./data/drawer-sections.json";
import { getPageName, getPageId } from "./utils/pageMapping";
import { loadLastVisitedPage, saveLastVisitedPage } from "./utils/storage";
import type { DrawerConfig, DrawerSection } from "./types/drawerInterfaces";
import "./App.css";
import "../src/styles/global-scrollbar.css";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("archive");
  const [sections, setSections] = useState<DrawerSection[]>([]);
  const [lastVisitedPage, setLastVisitedPage] = useState<string>(
    "Razze sotto il giogo"
  );

  // Carica l'ultima pagina visitata all'avvio
  useEffect(() => {
    const loadStoredPage = async () => {
      const storedPageId = await loadLastVisitedPage();
      if (storedPageId) {
        const pageName = getPageName(storedPageId);
        setLastVisitedPage(pageName);
      }
    };

    loadStoredPage();
  }, []);

  // Salva la pagina corrente quando cambia
  useEffect(() => {
    const shouldSavePage =
      currentPage !== "archive" && currentPage !== "settings";

    if (shouldSavePage) {
      saveLastVisitedPage(currentPage);
      const pageName = getPageName(currentPage);
      setLastVisitedPage(pageName);
    }
  }, [currentPage]);

  // Carica le sezioni dal JSON e aggiunge gli handler
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

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  // Handlers
  const handleArchiveClick = () => {
    console.log("Cliccato: Archivio Segreto");
    setCurrentPage("archive");
  };

  const handleContinueReading = () => {
    const pageId = getPageId(lastVisitedPage);
    console.log(`Continua lettura: ${lastVisitedPage} (${pageId})`);
    setCurrentPage(pageId);
  };

  return (
    <div className="app-container">
      <Sidebar
        sections={sections}
        onArchiveClick={handleArchiveClick}
        activePageId={currentPage}
      />
      <div className="content-area">
        <PageRouter
          currentPage={currentPage}
          lastVisitedPage={lastVisitedPage}
          onContinueReading={handleContinueReading}
        />
      </div>
    </div>
  );
}

export default App;
