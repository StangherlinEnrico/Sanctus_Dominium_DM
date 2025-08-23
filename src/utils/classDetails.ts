import classDetailsData from "../data/class-details.json";
import { formatContent } from "./worldContent";

export interface ClassDetails {
  features: string[];
  culture: string[];
  equipment: {
    weapons: string;
    armor: string;
    tools: string;
  };
  roleplay: string;
}

/**
 * Ottiene i dettagli di una classe
 */
export const getClassDetails = (className: string): ClassDetails | null => {
  const data = classDetailsData as Record<string, ClassDetails>;
  return data[className] || null;
};

/**
 * Formatta le caratteristiche speciali come lista HTML
 */
export const formatFeatures = (features: string[]): string => {
  return features.map(feature => `<li>${formatContent(feature)}</li>`).join('');
};

/**
 * Formatta i paragrafi di cultura
 */
export const formatCulture = (culture: string[]): string => {
  return culture.map(paragraph => `<p>${paragraph}</p>`).join('');
};

/**
 * Formatta l'equipaggiamento in sezioni strutturate
 */
export const formatEquipment = (equipment: { weapons: string; armor: string; tools: string }): string => {
  return `
    <div class="equipment-section">
      <h4>Armi</h4>
      <p>${equipment.weapons}</p>
      
      <h4>Armature</h4>
      <p>${equipment.armor}</p>
      
      <h4>Strumenti</h4>
      <p>${equipment.tools}</p>
    </div>
  `;
};