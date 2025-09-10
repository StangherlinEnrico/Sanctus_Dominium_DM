import React from "react";
import "./TextSection.css";

// Interfacce definite direttamente nel file
interface TextSectionType {
  type: "textSection";
  title: string;
  content: string;
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
      <h2 className="text-section__title">{data.title}</h2>
      <div className="text-section__content">
        <p dangerouslySetInnerHTML={{ __html: formatContent(data.content) }} />
      </div>
    </section>
  );
};

export default TextSection;
