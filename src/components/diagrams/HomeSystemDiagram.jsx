import styles from './Diagram.module.css'

export default function HomeSystemDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Residential Solar System: How It Works</h2>
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          <defs>
            <marker id="arrowBlue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#2563eb" />
            </marker>
            <marker id="arrowOrange" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#d97706" />
            </marker>
            <marker id="arrowGreen" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#16a34a" />
            </marker>
          </defs>

          {/* Sun */}
          <circle cx="60" cy="55" r="30" fill="#fbbf24" opacity="0.9" />
          <text x="60" y="59" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f" fontFamily="Inter, system-ui, sans-serif">SUN</text>
          {[0,1,2,3].map((i) => (
            <line key={i} x1={90 + i * 3} y1={55 + i * 12} x2={138} y2={80 + i * 14} stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
          ))}

          {/* House outline */}
          <polygon points="130,170 130,100 200,55 270,100 270,170" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
          {/* Roof panels */}
          <rect x="142" y="82" width="30" height="20" fill="#1B2A4A" rx="0" transform="rotate(-28, 142, 82)" />
          <rect x="176" y="68" width="30" height="20" fill="#1B2A4A" rx="0" transform="rotate(-28, 176, 68)" />
          <text x="200" y="175" textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif">Your Home</text>

          {/* DC arrow panels → inverter */}
          <line x1={270} y1={110} x2={330} y2={110} stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
          <text x={300} y={103} textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">DC</text>

          {/* Inverter */}
          <rect x={333} y={88} width={72} height={44} fill="#CC3322" rx="0" />
          <text x={369} y={108} textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="Inter, system-ui, sans-serif">Inverter</text>
          <text x={369} y={120} textAnchor="middle" fontSize="8" fill="white" opacity="0.85" fontFamily="Inter, system-ui, sans-serif">DC → AC</text>

          {/* AC arrow inverter → home loads */}
          <line x1={369} y1={132} x2={369} y2={175} stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
          <rect x={333} y={178} width={72} height={36} fill="#374151" rx="0" />
          <text x={369} y={199} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter, system-ui, sans-serif">Home Loads</text>
          <text x={369} y={210} textAnchor="middle" fontSize="8" fill="white" opacity="0.75" fontFamily="Inter, system-ui, sans-serif">(AC appliances)</text>

          {/* AC arrow inverter → utility meter */}
          <line x1={405} y1={110} x2={460} y2={110} stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
          <text x={433} y={103} textAnchor="middle" fontSize="8" fill="#d97706" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">AC</text>

          {/* Utility Meter */}
          <rect x={463} y={88} width={66} height={44} fill="#1B2A4A" rx="0" />
          <text x={496} y={108} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter, system-ui, sans-serif">Utility</text>
          <text x={496} y={120} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter, system-ui, sans-serif">Meter</text>

          {/* Bidirectional to grid */}
          <line x1={529} y1={110} x2={576} y2={110} stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
          <line x1={576} y1={120} x2={529} y2={120} stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
          <text x={553} y={103} textAnchor="middle" fontSize="7.5" fill="#16a34a" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">export / import</text>

          {/* Grid symbol */}
          <line x1={580} y1={80} x2={580} y2={150} stroke="#16a34a" strokeWidth="3" />
          <line x1={566} y1={92} x2={594} y2={92} stroke="#16a34a" strokeWidth="2" />
          <line x1={570} y1={105} x2={590} y2={105} stroke="#16a34a" strokeWidth="2" />
          <line x1={574} y1={118} x2={586} y2={118} stroke="#16a34a" strokeWidth="2" />
          <text x={580} y={166} textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a" fontFamily="Inter, system-ui, sans-serif">GRID</text>

          {/* Battery */}
          <rect x={333} y={240} width={72} height={38} fill="#2d4a7a" rx="0" />
          <text x={369} y={261} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter, system-ui, sans-serif">Battery</text>
          <text x={369} y={272} textAnchor="middle" fontSize="8" fill="white" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">(optional)</text>
          <line x1={369} y1={240} x2={369} y2={214} stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Net Metering callout */}
          <rect x={595} y={86} width={114} height={50} fill="#dcfce7" stroke="#86efac" strokeWidth="1" rx="0" />
          <text x={652} y={106} textAnchor="middle" fontSize="8" fontWeight="700" fill="#14532d" fontFamily="Inter, system-ui, sans-serif">Net Metering</text>
          <text x={652} y={118} textAnchor="middle" fontSize="8" fill="#166534" fontFamily="Inter, system-ui, sans-serif">Credits for solar</text>
          <text x={652} y={129} textAnchor="middle" fontSize="8" fill="#166534" fontFamily="Inter, system-ui, sans-serif">exported to grid</text>

          {/* Caption */}
          <text x="360" y="292" textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="Inter, system-ui, sans-serif">
            A residential solar system can export excess generation and import when needed (net metering)
          </text>
        </svg>
      </div>
    </div>
  )
}
