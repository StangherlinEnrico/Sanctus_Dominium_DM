import { useState, useEffect, useCallback } from "react";
import { DrawerSection, NavigationState, NavigationActions } from "../types/navigation.types";
import { getPageName, getPageId } from "../utils/pageMapping";
import { loadLastVisitedPage, saveLastVisitedPage } from "../utils/storage";
import drawerSectionsData from "../data/drawer-sections.json";

interface UseNavigationReturn extends NavigationState, NavigationActions {}

export const useNavigation = (): UseNavigationReturn => {
  const [currentPage, setCurrentPage] = useState<string>("archive");
  const [sections, setSections] = useState<DrawerSection[]>([]);
  const [lastVisitedPage, setLastVisitedPage] = useState<string>("Razze sotto il giogo");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Inizializzazione: carica ultima pagina visitata
  useEffect(() => {
    const initializeNavigation = async () => {
      try {
        setIsLoading(true);
        
        // Carica l'ultima pagina visitata dal storage
        const storedPageId = await loadLastVisitedPage();
        if (storedPageId) {
          const pageName = getPageName(storedPageId);
          setLastVisitedPage(pageName);
        }
        
        // Carica le sezioni del drawer
        loadDrawerSections();
      } catch (error) {
        console.error("Errore nell'inizializzazione della navigazione:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeNavigation();
  }, []);

  // Carica le sezioni del drawer con handlers dinamici
  const loadDrawerSections = useCallback(() => {
    try {
      const config = drawerSectionsData as { sections: DrawerSection[] };
      
      const sectionsWithHandlers = config.sections.map((section) => ({
        ...section,
        buttons: section.buttons.map((button) => ({
          ...button,
          onClick: () => navigateTo(button.id),
        })),
      }));

      setSections(sectionsWithHandlers);
    } catch (error) {
      console.error("Errore nel caricamento delle sezioni del drawer:", error);
      setSections([]);
    }
  }, []);

  // Salva automaticamente la pagina quando cambia
  useEffect(() => {
    const shouldSavePage = currentPage !== "archive" && currentPage !== "settings";

    if (shouldSavePage && !isLoading) {
      saveLastVisitedPage(currentPage)
        .then(() => {
          const pageName = getPageName(currentPage);
          setLastVisitedPage(pageName);
        })
        .catch(error => {
          console.error("Errore nel salvare la pagina:", error);
        });
    }
  }, [currentPage, isLoading]);

  // Gestisce i tasti funzione (disabilita tutti tranne F12)
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

  // Naviga a una pagina specifica
  const navigateTo = useCallback((pageId: string) => {
    console.log(`Navigazione a: ${pageId}`);
    setCurrentPage(pageId);
  }, []);

  // Naviga all'archivio principale
  const navigateToArchive = useCallback(() => {
    console.log("Navigazione all'Archivio Segreto");
    navigateTo("archive");
  }, [navigateTo]);

  // Continua l'ultima lettura
  const continueReading = useCallback(() => {
    const pageId = getPageId(lastVisitedPage);
    console.log(`Continua lettura: ${lastVisitedPage} (${pageId})`);
    navigateTo(pageId);
  }, [lastVisitedPage, navigateTo]);

  // Ricarica le sezioni del drawer
  const refreshSections = useCallback(() => {
    loadDrawerSections();
  }, [loadDrawerSections]);

  // Resetta la navigazione allo stato iniziale
  const resetNavigation = useCallback(() => {
    setCurrentPage("archive");
    setLastVisitedPage("Razze sotto il giogo");
  }, []);

  return {
    // State
    currentPage,
    sections,
    lastVisitedPage,
    isLoading,
    
    // Actions
    navigateTo,
    navigateToArchive,
    continueReading,
    refreshSections,
    resetNavigation,
  };
};