import React from "react";
import pageData from "../data/world-overview.json";
import type { PageMetadata } from "../types/pageMetadata";
import type { PageHeader as PageHeaderType } from "../types/pageHeader";
import type { Section } from "../types/section";
import PageHeader from "./PageHeader";
import DownloadButton from "./DownloadButton";
import TextSection from "./TextSection";
import InfoBox from "./InfoBox";
import "./WorldOverviewPage.css";
import "../styles/global-scrollbar.css";

interface PageData {
  metadata?: PageMetadata;
  header: PageHeaderType;
  sections: Section[];
}

const WorldOverviewPage: React.FC = () => {
  const data = pageData as PageData;

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case "textSection":
        return <TextSection key={index} data={section} />;
      case "infoBox":
        return <InfoBox key={index} data={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <div className="page__page-container">
        {/* Header riusabile */}
        <PageHeader header={data.header} />

        {/* Download Button riusabile con logica standard */}
        <DownloadButton
          metadata={data.metadata}
          buttonText="Scarica il capitolo"
        />

        {/* Content Sections */}
        <main className="page__content">
          {data.sections.map((section, index) => renderSection(section, index))}
        </main>
      </div>
    </div>
  );
};

export default WorldOverviewPage;
