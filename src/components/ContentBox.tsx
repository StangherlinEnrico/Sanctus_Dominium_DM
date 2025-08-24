import React, { useState, useEffect } from "react";
import type { ContentBox as ContentBoxType } from "../types/section";
import "./ContentBox.css";

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

  return (
    <div className="content-box">
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
    </div>
  );
};

export default ContentBox;
