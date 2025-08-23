import React from "react";
import ArchivePage from "./ArchivePage";
import WorldOverviewPage from "./WorldOverviewPage";

interface PageRouterProps {
  currentPage: string;
  lastVisitedPage: string;
  onContinueReading: () => void;
}

const PageRouter: React.FC<PageRouterProps> = ({
  currentPage,
  lastVisitedPage,
  onContinueReading,
}) => {
  const renderPage = () => {
    switch (currentPage) {
      case "archive":
        return (
          <ArchivePage
            lastVisitedPage={lastVisitedPage}
            onContinueReading={onContinueReading}
          />
        );

      case "world-overview":
        return <WorldOverviewPage />;
      case "races":
        return <PlaceholderPage title="Razze" />;
      case "classes":
        return <PlaceholderPage title="Classi" />;
      case "backgrounds":
        return (
          <PlaceholderPage title="Background di sottomissione e ribellione" />
        );
      case "feats":
        return <PlaceholderPage title="Talenti della fede manipolata" />;
      case "surveillance":
        return <PlaceholderPage title="Sistema di sorveglianza e sospetto" />;
      case "devotion":
        return <PlaceholderPage title="Devozione e condizionamento" />;
      case "double-life":
        return <PlaceholderPage title="Doppia vita e identità" />;
      case "silence-zones":
        return <PlaceholderPage title="Zone di silenzio" />;
      case "resistance":
        return <PlaceholderPage title="Resistenza e sabotaggio" />;
      case "corruption-economy":
        return <PlaceholderPage title="Economia della corruzione" />;
      case "money-equipment":
        return <PlaceholderPage title="Denaro ed equipaggiamento" />;
      case "world-sanctus":
        return <PlaceholderPage title="Il mondo del Sanctus Dominium" />;
      case "sanctus-centrale":
        return <PlaceholderPage title="Sanctus Centrale" />;
      case "confinium-borealis":
        return <PlaceholderPage title="Confinium Borealis" />;
      case "prosperitas-australis":
        return <PlaceholderPage title="Prosperitas Australis" />;
      case "umbra-occidentalis":
        return <PlaceholderPage title="Umbra Occidentalis" />;
      case "orientalis-extrema":
        return <PlaceholderPage title="Orientalis Extrema" />;
      case "insularum-mare":
        return <PlaceholderPage title="Insularum Mare" />;
      case "cordillera-centralis":
        return <PlaceholderPage title="Cordillera Centralis" />;

      default:
        return (
          <ArchivePage
            lastVisitedPage={lastVisitedPage}
            onContinueReading={onContinueReading}
          />
        );
    }
  };

  return <>{renderPage()}</>;
};

// Componente placeholder per pagine non ancora implementate
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div
    style={{
      padding: "40px",
      color: "#e0e0e0",
      fontFamily: "'Crimson Text', serif",
      fontSize: "1.2rem",
    }}
  >
    <h1
      style={{
        fontFamily: "'Cinzel', serif",
        color: "#b87333",
        marginBottom: "20px",
      }}
    >
      {title}
    </h1>
    <p>Questa sezione è in fase di sviluppo...</p>
  </div>
);

export default PageRouter;
