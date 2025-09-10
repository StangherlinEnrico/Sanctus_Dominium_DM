import SidebarDrawer from "./features/navigation/components/SidebarDrawer";
import PageRouter from "./features/navigation/components/PageRouter";
import { useNavigation } from "./features/navigation/hooks/useNavigation";
import "./App.css";
import "./styles/global-scrollbar.css";

function App() {
  const {
    currentPage,
    sections,
    lastVisitedPage,
    isLoading,
    navigateToArchive,
    continueReading,
  } = useNavigation();

  // Mostra un loading screen durante l'inizializzazione
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="loading-ornament">⚜</div>
          <h1 className="loading-title">SANCTUS DOMINIUM</h1>
          <p className="loading-text">Caricamento archivio imperiale...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <SidebarDrawer
        sections={sections}
        onArchiveClick={navigateToArchive}
        activePageId={currentPage}
      />
      <div className="content-area">
        <PageRouter
          currentPage={currentPage}
          lastVisitedPage={lastVisitedPage}
          onContinueReading={continueReading}
        />
      </div>
    </div>
  );
}

export default App;
