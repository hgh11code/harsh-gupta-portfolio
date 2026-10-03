export function gestureAxis(dx: number, dy: number): "x" | "y" | null {
  if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) * 1.15) return "y";
  if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.4) return "x";
  return null;
}

export function swipeStep(dx: number, width: number, velocity = 0): number {
  const threshold = Math.max(36, Math.min(80, width * .13));
  const flick = Math.abs(dx) >= 24 && Math.abs(velocity) >= .45 && Math.sign(dx) === Math.sign(velocity);
  return Math.abs(dx) >= threshold || flick ? (dx < 0 ? 1 : -1) : 0;
}
