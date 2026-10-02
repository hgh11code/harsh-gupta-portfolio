export function gestureAxis(dx: number, dy: number): "x" | "y" | null {
  if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) * 1.15) return "y";
  if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.4) return "x";
  return null;
}

export function swipeStep(dx: number, width: number): number {
  const threshold = Math.max(36, Math.min(80, width * .13));
  return Math.abs(dx) >= threshold ? (dx < 0 ? 1 : -1) : 0;
}
