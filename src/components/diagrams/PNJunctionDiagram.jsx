import styles from './Diagram.module.css'

export default function PNJunctionDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>How a Solar Cell Works: The p-n Junction</h2>
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          {/* Sun */}
          <circle cx="80" cy="60" r="36" fill="#f59e0b" opacity="0.9" />
          <text x="80" y="65" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">SUN</text>
          {/* Photon arrows */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <line
                x1={120 + i * 8}
                y1={80 + i * 18}
                x2={210}
                y2={105 + i * 28}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrowGold)"
              />
            </g>
          ))}
          <defs>
            <marker id="arrowGold" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
            </marker>
            <marker id="arrowRed" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#CC3322" />
            </marker>
            <marker id="arrowNavy" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#1B2A4A" />
            </marker>
          </defs>

          {/* Anti-reflection coating */}
          <rect x="220" y="80" width="320" height="12" fill="#93c5fd" opacity="0.7" rx="0" />
          <text x="380" y="91" textAnchor="middle" fontSize="9" fill="#1e3a5f" fontWeight="600">Anti-Reflection Coating</text>

          {/* N-type layer */}
          <rect x="220" y="92" width="320" height="72" fill="#dbeafe" rx="0" />
          <text x="256" y="116" fontSize="11" fontWeight="700" fill="#1e3a5f">N-type Silicon</text>
          <text x="256" y="132" fontSize="9" fill="#374151">(excess electrons — negative charge carriers)</text>
          {/* Electron dots */}
          {[0,1,2,3,4,5,6,7].map((i) => (
            <circle key={i} cx={300 + i * 30} cy={152} r={5} fill="#2563eb" />
          ))}
          {[0,1,2,3,4,5,6,7].map((i) => (
            <text key={i} x={300 + i * 30} y={156} textAnchor="middle" fontSize="7" fill="white" fontWeight="700">e⁻</text>
          ))}

          {/* Junction line */}
          <line x1="220" y1="164" x2="540" y2="164" stroke="#CC3322" strokeWidth="2" strokeDasharray="6 3" />
          <text x="555" y="168" fontSize="9" fill="#CC3322" fontWeight="700">p-n Junction</text>
          <text x="555" y="179" fontSize="8" fill="#CC3322">(electric field)</text>

          {/* P-type layer */}
          <rect x="220" y="164" width="320" height="72" fill="#fce7f3" rx="0" />
          <text x="256" y="186" fontSize="11" fontWeight="700" fill="#831843">P-type Silicon</text>
          <text x="256" y="202" fontSize="9" fill="#374151">(holes — positive charge carriers)</text>
          {/* Hole circles */}
          {[0,1,2,3,4,5,6,7].map((i) => (
            <circle key={i} cx={300 + i * 30} cy={222} r={5} fill="none" stroke="#be185d" strokeWidth="1.5" />
          ))}
          {[0,1,2,3,4,5,6,7].map((i) => (
            <text key={i} x={300 + i * 30} y={226} textAnchor="middle" fontSize="7" fill="#be185d" fontWeight="700">+</text>
          ))}

          {/* Back contact */}
          <rect x="220" y="236" width="320" height="14" fill="#6b7280" rx="0" />
          <text x="380" y="247" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">Metal Back Contact</text>

          {/* External circuit */}
          <line x1="220" y1="88" x2="180" y2="88" stroke="#1B2A4A" strokeWidth="2" />
          <line x1="180" y1="88" x2="180" y2="280" stroke="#1B2A4A" strokeWidth="2" />
          <line x1="180" y1="280" x2="220" y2="280" stroke="#1B2A4A" strokeWidth="2" />
          <line x1="540" y1="88" x2="620" y2="88" stroke="#CC3322" strokeWidth="2" markerEnd="url(#arrowRed)" />
          <line x1="620" y1="88" x2="620" y2="280" stroke="#CC3322" strokeWidth="2" />
          <line x1="540" y1="280" x2="620" y2="280" stroke="#CC3322" strokeWidth="2" />
          {/* Load box */}
          <rect x="580" y="160" width="56" height="32" fill="white" stroke="#1B2A4A" strokeWidth="1.5" rx="2" />
          <text x="608" y="178" textAnchor="middle" fontSize="9" fill="#1B2A4A" fontWeight="700">LOAD</text>
          <text x="608" y="189" textAnchor="middle" fontSize="8" fill="#6b7280">(DC out)</text>

          {/* Electron flow label */}
          <text x="155" y="188" textAnchor="middle" fontSize="9" fill="#1B2A4A" fontWeight="600" transform="rotate(-90 155 188)">electron flow</text>

          {/* Labels */}
          <text x="380" y="310" textAnchor="middle" fontSize="10" fill="#6b7280">
            Photons knock electrons loose → junction field forces them through external circuit → DC current
          </text>
        </svg>
      </div>
    </div>
  )
}
