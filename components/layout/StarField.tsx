const STAR_COUNT = 50;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Deterministic, so the output is stable between builds and renders.
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  left: (seededRandom(i * 12.9898) * 100).toFixed(2),
  top: (seededRandom(i * 78.233) * 100).toFixed(2),
  size: (1 + seededRandom(i * 37.719) * 1.5).toFixed(2),
  duration: (3 + seededRandom(i * 93.989) * 4).toFixed(2),
  delay: (seededRandom(i * 4.567) * 6).toFixed(2),
  peakOpacity: (0.3 + seededRandom(i * 15.123) * 0.35).toFixed(2),
}));

/**
 * Faint twinkling stars behind the page. Server component: no client JS.
 * Twinkle is pure CSS and switches off under prefers-reduced-motion
 * (see globals.css), leaving the stars static.
 */
export default function StarField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {STARS.map((star) => (
        <span
          key={star.id}
          className="animate-twinkle absolute rounded-pill bg-foreground"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            ["--star-opacity" as string]: star.peakOpacity,
          }}
        />
      ))}
    </div>
  );
}
