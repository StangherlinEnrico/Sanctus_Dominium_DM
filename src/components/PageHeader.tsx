import React, { useState, useEffect } from "react";
import type { PageHeader as PageHeaderType } from "../types/pageHeader";
import "./PageHeader.css";

interface PageHeaderProps {
  header: PageHeaderType;
}

const PageHeader: React.FC<PageHeaderProps> = ({ header }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const loadSvgIcon = async () => {
      if (header.svgIcon) {
        try {
          // Import dinamico dell'SVG
          const svgModule = await import(header.svgIcon);
          setSvgContent(svgModule.default);
        } catch (error) {
          console.warn(
            `Impossibile caricare l'icona SVG: ${header.svgIcon}`,
            error
          );
          setSvgContent(null);
        }
      } else {
        setSvgContent(null);
      }
    };

    loadSvgIcon();
  }, [header.svgIcon]);

  return (
    <header className="page-header">
      {header.chapterBadge && (
        <div className="page-header__chapter-badge">{header.chapterBadge}</div>
      )}
      {svgContent && (
        <div className="page-header__chapter-svg">
          <img
            src={svgContent}
            className="page-header__svg-icon"
            alt="Chapter Icon"
          />
        </div>
      )}
      {header.icon && (
        <div className="page-header__chapter-icon">{header.icon}</div>
      )}
      <h1 className="page-header__page-title">{header.title}</h1>
      {header.subtitle && (
        <p className="page-header__page-subtitle">{header.subtitle}</p>
      )}
    </header>
  );
};

export default PageHeader;
