import React from "react";
import "./TextSection.css";

// Interfacce definite direttamente nel file
interface TextSectionType {
  type: "textSection";
  title?: string; // Ora facoltativo
  content: string;
  additionalInfo?: string[]; // Aggiunto supporto per liste puntate
}

interface TextSectionProps {
  data: TextSectionType;
}

const formatContent = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>");
};

const TextSection: React.FC<TextSectionProps> = ({ data }) => {
  return (
    <section className="text-section">
      {/* Titolo condizionale - mostrato solo se presente e non vuoto */}
      {data.title && data.title.trim() && (
        <h2 className="text-section__title">{data.title}</h2>
      )}
      <div className="text-section__content">
        <p dangerouslySetInnerHTML={{ __html: formatContent(data.content) }} />

        {/* Lista aggiuntiva come elenco puntato */}
        {data.additionalInfo && data.additionalInfo.length > 0 && (
          <div className="text-section__additional-info">
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
    </section>
  );
};

export default TextSection;
