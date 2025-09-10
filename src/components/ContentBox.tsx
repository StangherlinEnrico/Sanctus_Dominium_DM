import React, { useState, useEffect } from "react";
import "./ContentBox.css";

interface ContentBoxAction {
  type: "popupOpener";
  label?: string;
}

interface ContentBoxType {
  type: "contentBox";
  svgIcon?: string;
  title: string;
  subtitle?: string;
  content: string;
  tag?: string;
  additionalInfo?: string[];
  action?: ContentBoxAction;
}

interface ContentBoxProps {
  data: ContentBoxType;
}

const formatContent = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>");
};

const ContentBox: React.FC<ContentBoxProps> = ({ data }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const loadSvgIcon = async () => {
      if (data.svgIcon) {
        try {
          // Import dinamico dell'SVG
          const svgModule = await import(data.svgIcon);
          setSvgContent(svgModule.default);
        } catch (error) {
          console.warn(
            `Impossibile caricare l'icona SVG: ${data.svgIcon}`,
            error
          );
          setSvgContent(null);
        }
      } else {
        setSvgContent(null);
      }
    };

    loadSvgIcon();
  }, [data.svgIcon]);

  // Gestione del click in base al tipo di azione
  const handleClick = () => {
    if (!data.action) return;

    switch (data.action.type) {
      case "popupOpener":
        alert(data.title);
        break;
      default:
        console.warn(`Tipo di azione non supportato: ${data.action.type}`);
    }
  };

  // Determina se il componente è clickabile
  const isClickable = !!data.action;

  return (
    <div
      className={`content-box ${isClickable ? "content-box--clickable" : ""}`}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      {/* Tag in alto a destra */}
      {data.tag && <div className="content-box__tag">{data.tag}</div>}

      <div className="content-box__header">
        {svgContent && (
          <div className="content-box__icon">
            <img
              src={svgContent}
              className="content-box__svg-icon"
              alt={data.title}
            />
          </div>
        )}
        <div className="content-box__header-text">
          <h2 className="content-box__title">{data.title}</h2>
          {data.subtitle && (
            <h3 className="content-box__subtitle">{data.subtitle}</h3>
          )}
        </div>
      </div>

      <div className="content-box__content">
        <p dangerouslySetInnerHTML={{ __html: formatContent(data.content) }} />
      </div>

      {/* Info aggiuntive come elenco puntato */}
      {data.additionalInfo && data.additionalInfo.length > 0 && (
        <div className="content-box__additional-info">
          <ul>
            {data.additionalInfo.map((info, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: formatContent(info) }}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Indicatore azione sempre visibile */}
      {isClickable && data.action && (
        <div className="content-box__action-indicator">
          <span className="content-box__action-text">
            {data.action.label || "Clicca per ulteriori dettagli"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ContentBox;
