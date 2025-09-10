import React from "react";
import MainPage from "../../../pages/MainPage";

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
          <MainPage
            lastVisitedPage={lastVisitedPage}
            onContinueReading={onContinueReading}
          />
        );
      case "races":
        return <PlaceholderPage title="Razze sotto il giogo" />;
      case "settings":
        return <PlaceholderPage title="Impostazioni" />;
      default:
        // Fallback alla pagina principale
        return (
          <MainPage
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
