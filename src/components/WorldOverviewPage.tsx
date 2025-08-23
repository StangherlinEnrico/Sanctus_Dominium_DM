import pageData from "../data/world-overview.json";
import type { PageHeader as PageHeaderType } from "../types/pageHeader";
import { PageMetadata } from "../types/pageMetadata";
import PageHeader from "./PageHeader";
import DownloadButton from "./DownloadButton";
import "../styles/global-scrollbar.css";

interface PageData {
  header: PageHeaderType;
  metadata?: PageMetadata;
}

const TestPage: React.FC = () => {
  const data = pageData as PageData;

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
      </div>
    </div>
  );
};

export default TestPage;
