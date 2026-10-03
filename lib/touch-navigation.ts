import { gestureAxis, swipeStep } from "./portfolio-gestures.ts";

type TouchNavigation = {
  canStart: (target: EventTarget | null) => boolean;
  width: () => number;
  start: () => void;
  move: (offset: number) => void;
  finish: (step: number, offset: number) => void;
};

/** Touch has its own lifecycle: pointer cancellation/capture must not erase it. */
export function bindTouchNavigation(target: HTMLElement, callbacks: TouchNavigation) {
  let drag: { id: number; x: number; y: number; lastX: number; at: number; velocity: number; axis: "x" | "y" | null; width: number } | null = null;
  const cancel = () => { if (drag) callbacks.finish(0, 0); drag = null; };
  const start = (event: TouchEvent) => {
    cancel();
    if (event.touches.length !== 1 || !callbacks.canStart(event.target)) return;
    const touch = event.touches[0];
    drag = { id: touch.identifier, x: touch.clientX, y: touch.clientY, lastX: touch.clientX, at: event.timeStamp, velocity: 0, axis: null, width: callbacks.width() };
    callbacks.start();
  };
  const move = (event: TouchEvent) => {
    if (!drag) return;
    if (event.touches.length !== 1) { cancel(); return; }
    const touch = Array.from(event.touches).find(item => item.identifier === drag?.id);
    if (!touch) return;
    const dx = touch.clientX - drag.x;
    drag.axis ??= gestureAxis(dx, touch.clientY - drag.y);
    if (drag.axis !== "x") return; // Vertical reading and pinch zoom stay native.
    if (event.cancelable) event.preventDefault();
    drag.velocity = (touch.clientX - drag.lastX) / Math.max(1, event.timeStamp - drag.at);
    drag.lastX = touch.clientX;
    drag.at = event.timeStamp;
    callbacks.move(Math.max(-drag.width * .8, Math.min(drag.width * .8, dx)));
  };
  const end = (event: TouchEvent) => {
    if (!drag) return;
    const touch = Array.from(event.changedTouches).find(item => item.identifier === drag?.id);
    if (!touch) return;
    const dx = touch.clientX - drag.x;
    const axis = drag.axis ?? gestureAxis(dx, touch.clientY - drag.y);
    const velocity = event.timeStamp - drag.at < 100 ? drag.velocity : 0;
    const step = axis === "x" ? swipeStep(dx, drag.width, velocity) : 0;
    if (axis === "x" && event.cancelable) event.preventDefault();
    callbacks.finish(step, Math.max(-drag.width * .8, Math.min(drag.width * .8, dx)));
    drag = null;
  };
  target.addEventListener("touchstart", start, { passive: true });
  target.addEventListener("touchmove", move, { passive: false });
  target.addEventListener("touchend", end, { passive: false });
  target.addEventListener("touchcancel", cancel);
  return () => {
    target.removeEventListener("touchstart", start);
    target.removeEventListener("touchmove", move);
    target.removeEventListener("touchend", end);
    target.removeEventListener("touchcancel", cancel);
    cancel();
  };
}
