import React from "react";
import ContentBox from "./ContentBox";
import InfoBox from "./InfoBox";
import TextSection from "./TextSection";
import "./GridSection.css";

// Interfacce per gli item della griglia
interface ContentBoxAction {
  type: "popupOpener";
  label?: string;
}

interface ContentBoxItem {
  svgIcon?: string;
  title: string;
  subtitle?: string;
  content: string;
  tag?: string;
  additionalInfo?: string[];
  action?: ContentBoxAction;
}

interface InfoBoxItem {
  svgIcon: string;
  title: string;
  content: string;
  severity: "danger" | "warning" | "info" | "success";
}

interface TextSectionItem {
  title: string;
  content: string;
}

// Interfaccia principale per GridSection
interface GridSectionType {
  type: "gridSection";
  title: string;
  subtitle?: string;
  columns: number;
  gap?: "small" | "medium" | "large";
  itemType: "contentBox" | "infoBox" | "textSection";
  items: Array<ContentBoxItem | InfoBoxItem | TextSectionItem>;
}

interface GridSectionProps {
  data: GridSectionType;
}

const GridSection: React.FC<GridSectionProps> = ({ data }) => {
  // Calcola il numero di righe necessarie in base agli elementi e alle colonne
  const calculatedRows = Math.ceil(data.items.length / data.columns);

  // Usa tutti gli elementi disponibili, senza riempire slot vuoti
  const items = data.items;

  // Renderizza un singolo item basato sul tipo
  const renderGridItem = (item: any, index: number) => {
    const itemWithType = { ...item, type: data.itemType };

    switch (data.itemType) {
      case "contentBox":
        return <ContentBox key={index} data={itemWithType} />;
      case "infoBox":
        return <InfoBox key={index} data={itemWithType} />;
      case "textSection":
        return <TextSection key={index} data={itemWithType} />;
      default:
        return (
          <div key={index} className="grid-item-error">
            Tipo non supportato
          </div>
        );
    }
  };

  return (
    <section className="grid-section">
      {/* Header della sezione */}
      <div className="grid-section__header">
        <h2 className="grid-section__title">{data.title}</h2>
        {data.subtitle && (
          <h3 className="grid-section__subtitle">{data.subtitle}</h3>
        )}
      </div>

      {/* Griglia degli elementi */}
      <div
        className={`grid-section__grid grid-section__grid--${
          data.gap || "medium"
        }`}
        style={{
          gridTemplateColumns: `repeat(${data.columns}, 1fr)`,
          gridTemplateRows: `repeat(${calculatedRows}, 1fr)`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="grid-section__item">
            {renderGridItem(item, index)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridSection;
