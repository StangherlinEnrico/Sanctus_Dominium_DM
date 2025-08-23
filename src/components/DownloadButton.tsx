import React from "react";
import type { PageMetadata } from "../types/pageMetadata";
import DownloadIcon from "../assets/icons/download.svg";
import "./DownloadButton.css";

interface DownloadButtonProps {
  metadata?: PageMetadata;
  buttonText?: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  metadata,
  buttonText = "Scarica il capitolo",
  className = "",
}) => {
  const handleDownload = () => {
    if (metadata?.downloadUrl) {
      const link = document.createElement("a");
      link.href = metadata.downloadUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`Download avviato: ${metadata.downloadUrl}`);
    }
  };

  if (!metadata?.downloadUrl) {
    return null;
  }

  return (
    <div className={`download-button-container ${className}`}>
      <button className="download-button" onClick={handleDownload}>
        <img
          src={DownloadIcon}
          className="download-button__icon"
          alt="Download"
        />
        {buttonText}
      </button>
    </div>
  );
};

export default DownloadButton;
