interface GaugeProps {
  className?: string;
  needleDeg?: number; // rotation of the needle, -90 (low) to 90 (high)
}

// Signature mark: a pressure-gauge dial. Used as a recurring motif across
// the app (nav, section headers, cards) to tie the UI back to the
// refrigeration/HVAC instruments the app itself documents.
export default function Gauge({ className = "w-6 h-6", needleDeg = -35 }: GaugeProps) {
  const ticks = Array.from({ length: 9 }, (_, i) => -100 + i * 25);

  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      {ticks.map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="4.5"
          x2="20"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.4"
          transform={`rotate(${deg} 20 20)`}
          opacity="0.6"
        />
      ))}
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${needleDeg} 20 20)`}
      />
      <circle cx="20" cy="20" r="2.4" fill="currentColor" />
    </svg>
  );
}
