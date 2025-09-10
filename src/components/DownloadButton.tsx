import React from "react";
import DownloadIcon from "../assets/icons/download.svg";
import "./DownloadButton.css";

interface DownloadButtonProps {
  downloadUrl?: string; // Ora riceve direttamente la stringa URL
  buttonText?: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  downloadUrl,
  buttonText = "Scarica il capitolo",
  className = "",
}) => {
  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`Download avviato: ${downloadUrl}`);
    }
  };

  if (!downloadUrl) {
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
