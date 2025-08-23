// src/utils/worldContent.ts
import worldData from "../data/world-overview.json";
import type { WorldOverviewData } from "../types/world";

/**
 * Carica i dati del mondo
 */
export const getWorldData = (): WorldOverviewData => {
  return worldData as WorldOverviewData;
};

/**
 * Mappa degli icon names ai path SVG
 */
export const ICON_MAP: Record<string, string> = {
  brain: "../assets/icons/brain.svg",
  church: "../assets/icons/church.svg", 
  theater_comedy: "../assets/icons/theater_comedy.svg",
  mystery: "../assets/icons/mystery.svg",
  globe: "../assets/icons/globe.svg",
  dices: "../assets/icons/dices.svg",
};

/**
 * Ottiene il path di un'icona dal nome
 */
export const getIconPath = (iconName: string): string => {
  return ICON_MAP[iconName] || ICON_MAP.globe;
};

/**
 * Formatta il contenuto con markdown semplice
 */
export const formatContent = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>');
};