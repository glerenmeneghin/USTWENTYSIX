import { useEffect } from "react";
import type { Team } from "../utils/types";

const neutralTheme = {
  primary: "#121212",
  secondary: "#f5f5f5",
  text: "#ffffff",
  accent: "#ffffff"
};

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  const bigint = parseInt(value.length === 3 ? value.split("").map((c) => c + c).join("") : value, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

const luminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const value = c / 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const contrastRatio = (a: string, b: string) => {
  const lumA = luminance(a);
  const lumB = luminance(b);
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  return (brightest + 0.05) / (darkest + 0.05);
};

const getReadableText = (background: string, preferred: string) => {
  if (contrastRatio(background, preferred) >= 3) {
    return preferred;
  }
  const whiteContrast = contrastRatio(background, "#ffffff");
  const blackContrast = contrastRatio(background, "#111111");
  return whiteContrast >= blackContrast ? "#ffffff" : "#111111";
};

export const useTeamTheme = (team: Team | null) => {
  useEffect(() => {
    const root = document.documentElement;
    const colors = team?.colors ?? neutralTheme;
    const readableText = getReadableText(colors.primary, colors.text);

    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-text", readableText);
    root.style.setProperty("--color-accent", colors.accent ?? colors.secondary);
  }, [team]);
};

export const getNeutralTheme = () => neutralTheme;
