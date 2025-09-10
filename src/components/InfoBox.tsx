import React, { useState, useEffect } from "react";
import "./InfoBox.css";

// Interfacce definite direttamente nel file
interface InfoBoxType {
  type: "infoBox";
  svgIcon: string;
  title: string;
  content: string;
  severity: "danger" | "warning" | "info" | "success";
}

interface InfoBoxProps {
  data: InfoBoxType;
}

const formatContent = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>");
};

const InfoBox: React.FC<InfoBoxProps> = ({ data }) => {
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
    <div className={`info-box info-box--${data.severity}`}>
      <div className="info-box__header">
        {svgContent && (
          <div className="info-box__icon">
            <img
              src={svgContent}
              className="info-box__svg-icon"
              alt={data.title}
            />
          </div>
        )}
        <h3 className="info-box__title">{data.title}</h3>
      </div>
      <div className="info-box__content">
        <p dangerouslySetInnerHTML={{ __html: formatContent(data.content) }} />
      </div>
    </div>
  );
};

export default InfoBox;
