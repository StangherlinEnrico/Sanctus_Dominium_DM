import raceDetailsData from "../data/race-details.json";
import { formatContent } from "./worldContent";

export interface RaceDetails {
  traits: string[];
  culture: string[];
  names: {
    male: string;
    female: string;
    surnames: string;
  };
  relations: string;
}

/**
 * Ottiene i dettagli di una razza
 */
export const getRaceDetails = (raceName: string): RaceDetails | null => {
  return (raceDetailsData as Record<string, RaceDetails>)[raceName] || null;
};

/**
 * Formatta i tratti razziali come lista HTML
 */
export const formatTraits = (traits: string[]): string => {
  return traits.map(trait => `<li>${formatContent(trait)}</li>`).join('');
};

/**
 * Formatta i paragrafi di cultura
 */
export const formatCulture = (culture: string[]): string => {
  return culture.map(paragraph => `<p>${paragraph}</p>`).join('');
};

/**
 * Formatta i nomi in paragrafo strutturato
 */
export const formatNames = (names: { male: string; female: string; surnames: string }): string => {
  return `
    <p>
      <strong>Maschili:</strong> ${names.male}<br/>
      <strong>Femminili:</strong> ${names.female}<br/>
      <strong>Cognomi/Titoli:</strong> ${names.surnames}
    </p>
  `;
};