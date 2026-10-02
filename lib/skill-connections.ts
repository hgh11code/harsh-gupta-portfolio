export type Point = { x: number; y: number };

// The displayed polyline and collision checks use exactly the same geometry.
export function connectionPoints(a: Point, b: Point): Point[] {
  const control = { x: (a.x + b.x) / 2 + 5, y: (a.y + b.y) / 2 - 4 };
  return Array.from({ length: 25 }, (_, index) => {
    const t = index / 24;
    return {
      x: (1-t)**2*a.x + 2*(1-t)*t*control.x + t*t*b.x,
      y: (1-t)**2*a.y + 2*(1-t)*t*control.y + t*t*b.y,
    };
  });
}

function intersects(a: Point, b: Point, c: Point, d: Point): boolean {
  const cross = (p: Point, q: Point, r: Point) => (q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x);
  const on = (p:Point,q:Point,r:Point) => Math.abs(cross(p,q,r)) < 1e-8 && r.x >= Math.min(p.x,q.x)-1e-8 && r.x <= Math.max(p.x,q.x)+1e-8 && r.y >= Math.min(p.y,q.y)-1e-8 && r.y <= Math.max(p.y,q.y)+1e-8;
  const abC=cross(a,b,c), abD=cross(a,b,d), cdA=cross(c,d,a), cdB=cross(c,d,b);
  return (abC*abD < 0 && cdA*cdB < 0) || on(a,b,c) || on(a,b,d) || on(c,d,a) || on(c,d,b);
}

export function connectionsIntersect(first: Point[], second: Point[]): boolean {
  for (let i=1;i<first.length;i++) {
    for (let j=1;j<second.length;j++) {
      if (intersects(first[i-1],first[i],second[j-1],second[j])) return true;
    }
  }
  return false;
}
