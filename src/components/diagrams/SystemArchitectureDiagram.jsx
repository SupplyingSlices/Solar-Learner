import styles from './Diagram.module.css'

function Block({ x, y, w, h, fill, label, sub, textColor = '#fff' }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} rx="0" />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 6 : 0)} textAnchor="middle" fontSize="10" fontWeight="700" fill={textColor} fontFamily="Inter, system-ui, sans-serif">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" fontSize="8" fill={textColor} opacity="0.8" fontFamily="Inter, system-ui, sans-serif">
          {sub}
        </text>
      )}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
  )
}

function FlowLabel({ x, y, label, sub }) {
  return (
    <g>
      <text x={x} y={y} textAnchor="middle" fontSize="9" fontWeight="600" fill="#CC3322" fontFamily="Inter, system-ui, sans-serif">{label}</text>
      {sub && <text x={x} y={y + 11} textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif">{sub}</text>}
    </g>
  )
}

export default function SystemArchitectureDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Utility-Scale Solar: System Architecture</h2>
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          <defs>
            <marker id="arrowGray" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#9ca3af" />
            </marker>
          </defs>

          {/* Sun */}
          <circle cx="50" cy="70" r="26" fill="#fbbf24" opacity="0.85" />
          <text x="50" y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f" fontFamily="Inter, system-ui, sans-serif">SUN</text>

          {/* Panels */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={100 + i * 5} y={30 + i * 40} width={56} height={36} fill="#1B2A4A" rx="0" />
              <line x1={100 + i * 5} y1={48 + i * 40} x2={156 + i * 5} y2={48 + i * 40} stroke="#2d4a7a" strokeWidth="1" />
              <line x1={128 + i * 5} y1={30 + i * 40} x2={128 + i * 5} y2={66 + i * 40} stroke="#2d4a7a" strokeWidth="1" />
            </g>
          ))}
          <text x="128" y="188" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1B2A4A" fontFamily="Inter, system-ui, sans-serif">PV Array</text>
          <text x="128" y="200" textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif">(DC output)</text>

          <Arrow x1={172} y1={100} x2={215} y2={100} />
          <FlowLabel x={195} y={88} label="DC" />

          {/* Combiner Box */}
          <Block x={218} y={76} w={72} h={48} fill="#374151" label="Combiner" sub="Box" />
          <Arrow x1={290} y1={100} x2={333} y2={100} />
          <FlowLabel x={313} y={88} label="DC" />

          {/* Inverter */}
          <Block x={336} y={70} w={84} h={60} fill="#CC3322" label="Inverter" sub="DC → AC" />
          <Arrow x1={420} y1={100} x2={463} y2={100} />
          <FlowLabel x={443} y={88} label="AC" />

          {/* Step-up Transformer */}
          <Block x={466} y={70} w={84} h={60} fill="#1B2A4A" label="Transformer" sub="Step-up" />
          <Arrow x1={550} y1={100} x2={593} y2={100} />
          <FlowLabel x={573} y={88} label="MV AC" />

          {/* Substation */}
          <Block x={596} y={70} w={76} h={60} fill="#374151" label="Substation" sub="& MET" />
          <Arrow x1={672} y1={100} x2={715} y2={100} />
          <FlowLabel x={695} y={88} label="HV AC" />

          {/* Grid */}
          <g>
            <line x1={720} y1={70} x2={720} y2={130} stroke="#16a34a" strokeWidth="3" />
            <line x1={706} y1={80} x2={734} y2={80} stroke="#16a34a" strokeWidth="2" />
            <line x1={710} y1={93} x2={730} y2={93} stroke="#16a34a" strokeWidth="2" />
            <line x1={714} y1={106} x2={726} y2={106} stroke="#16a34a" strokeWidth="2" />
            <text x="727" y="148" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a" fontFamily="Inter, system-ui, sans-serif">GRID</text>
          </g>

          {/* Battery (optional) branching off inverter */}
          <line x1={378} y1={130} x2={378} y2={185} stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowGray)" />
          <Block x={340} y={188} w={76} h={44} fill="#2d4a7a" label="BESS" sub="(optional)" />
          <text x="378" y="248" textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif">Battery storage</text>

          {/* SCADA label */}
          <rect x={200} y={240} width={80} height={30} fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1" rx="0" />
          <text x={240} y={257} textAnchor="middle" fontSize="9" fontWeight="600" fill="#374151" fontFamily="Inter, system-ui, sans-serif">SCADA</text>
          <text x={240} y={267} textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif">Monitoring</text>
          <line x1={240} y1={240} x2={240} y2={210} stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 2" />
          <line x1={240} y1={210} x2={378} y2={210} stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 2" />
          <line x1={378} y1={210} x2={378} y2={188} stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 2" />

          {/* Caption */}
          <text x="380" y="292" textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="Inter, system-ui, sans-serif">
            Single-line diagram — utility-scale solar plant (simplified)
          </text>
        </svg>
      </div>
    </div>
  )
}
