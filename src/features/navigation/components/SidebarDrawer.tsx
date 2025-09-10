import React from "react";
import "./style.css";
import { DrawerSection } from "../types/navigation.types";

interface SidebarDrawerProps {
  className?: string;
  sections?: DrawerSection[];
  onArchiveClick?: () => void;
  activePageId?: string;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  className = "",
  sections = [],
  onArchiveClick,
  activePageId,
}) => {
  return (
    <aside className={`sidebar ${className}`}>
      {/* Header del drawer */}
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          <span className="title-full">SANCTUS DOMINIUM</span>
          <span className="title-short">SD</span>
        </h1>
        <p className="sidebar-subtitle">
          <span className="subtitle-full">Manuale del Dungeon Master</span>
          <span className="subtitle-short">DM</span>
        </p>
      </div>

      {/* Area di navigazione */}
      <nav className="sidebar-nav">
        {/* Pagina Principale sempre in cima */}
        <div className="main-page-section">
          <button
            className={`main-page-button ${
              activePageId === "archive" ? "active" : ""
            }`}
            onClick={
              onArchiveClick ||
              (() => console.log("Cliccato: Archivio Segreto"))
            }
          >
            <span className="button-icon">📚</span>
            <span className="button-text">Archivio Segreto</span>
          </button>
        </div>

        {sections.length === 0 ? (
          <div className="nav-placeholder">
            <p>Navigazione capitoli</p>
          </div>
        ) : (
          sections.map((group, groupIndex) => (
            <div key={groupIndex} className="section-group">
              <h3 className="section-title">{group.title}</h3>
              <div className="section-buttons">
                {group.buttons.map((button) => (
                  <button
                    key={button.id}
                    className={`section-button ${
                      activePageId === button.id ? "active" : ""
                    }`}
                    onClick={button.onClick}
                  >
                    <span className="button-icon">{button.icon}</span>
                    <span className="button-text">{button.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </nav>

      {/* Footer con Impostazioni */}
      <div className="sidebar-footer">
        <button
          className="settings-button"
          onClick={() => console.log("Apri impostazioni")}
        >
          <span className="button-icon">⚙️</span>
          <span className="button-text">Impostazioni</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarDrawer;
