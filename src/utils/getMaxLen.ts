import { LS, MONO_FONT_SIZE, OFFSET } from "./alignment";

let cachedChSize: number | null = null;

export function getChWidth(fontSize: number): number {
  const fontFamily = "monospace";
  const fontWeight = "normal";

  if (cachedChSize !== null) return cachedChSize;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  cachedChSize = ctx.measureText("A").width;

  return cachedChSize;
}

const ch = getChWidth(MONO_FONT_SIZE);

export function getMaxLen(width: number, padding: number = 0) {
  return Math.floor((width - OFFSET * ch - padding * 2) / (ch + LS * ch));
}
