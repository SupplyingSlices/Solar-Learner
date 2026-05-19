import styles from './Diagram.module.css'

const F = 'Inter, system-ui, sans-serif'
const NAVY = '#1B2A4A'
const NAVY2 = '#2d4a7a'
const RED = '#CC3322'
const GRAY = '#374151'
const GREEN = '#16a34a'
const LGRAY = '#9ca3af'

function Panel({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width={36} height={24} fill={NAVY} rx="0" />
      <line x1={x} y1={y + 12} x2={x + 36} y2={y + 12} stroke={NAVY2} strokeWidth="0.8" />
      <line x1={x + 18} y1={y} x2={x + 18} y2={y + 24} stroke={NAVY2} strokeWidth="0.8" />
    </g>
  )
}

function Box({ x, y, w = 64, h = 36, fill, label, sub, textColor = '#fff' }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} rx="0" />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 5 : 0)} textAnchor="middle" fontSize="9" fontWeight="700" fill={textColor} fontFamily={F}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 7} textAnchor="middle" fontSize="7.5" fill={textColor} opacity="0.8" fontFamily={F}>{sub}</text>}
    </g>
  )
}

function Arr({ x1, y1, x2, y2, color = LGRAY, dash = false }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray={dash ? '4 3' : undefined} markerEnd={`url(#arr-${color.replace('#', '')})`} />
}

function Meter({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14} fill="#fff" stroke={NAVY} strokeWidth="1.5" />
      <text x={x} y={y - 3} textAnchor="middle" fontSize="7" fontWeight="700" fill={NAVY} fontFamily={F}>METER</text>
      <text x={x} y={y + 6} textAnchor="middle" fontSize="6" fill={GRAY} fontFamily={F}>kWh</text>
    </g>
  )
}

function GridSymbol({ x, y }) {
  return (
    <g>
      <line x1={x} y1={y - 22} x2={x} y2={y + 22} stroke={GREEN} strokeWidth="2.5" />
      <line x1={x - 14} y1={y - 12} x2={x + 14} y2={y - 12} stroke={GREEN} strokeWidth="2" />
      <line x1={x - 10} y1={y - 1} x2={x + 10} y2={y - 1} stroke={GREEN} strokeWidth="2" />
      <line x1={x - 6} y1={y + 10} x2={x + 6} y2={y + 10} stroke={GREEN} strokeWidth="2" />
      <text x={x} y={y + 34} textAnchor="middle" fontSize="9" fontWeight="700" fill={GREEN} fontFamily={F}>GRID</text>
    </g>
  )
}

export default function BTMFTMDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Behind-the-Meter (BTM) vs. Front-of-Meter (FTM)</h2>
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          <defs>
            {[LGRAY, RED, GREEN, NAVY].map(c => (
              <marker key={c} id={`arr-${c.replace('#', '')}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill={c} />
              </marker>
            ))}
          </defs>

          {/* ── LEFT: BTM ── */}
          <rect x={10} y={8} width={350} height={220} fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="0" />
          <text x={185} y={26} textAnchor="middle" fontSize="10" fontWeight="700" fill={NAVY} fontFamily={F}>BEHIND-THE-METER (BTM)</text>
          <text x={185} y={39} textAnchor="middle" fontSize="8" fill={GRAY} fontFamily={F}>Solar output directly offsets building consumption</text>

          {/* Sun */}
          <circle cx={38} cy={105} r={18} fill="#fbbf24" opacity="0.9" />
          <text x={38} y={109} textAnchor="middle" fontSize="8" fontWeight="700" fill="#78350f" fontFamily={F}>SUN</text>

          {/* Panels BTM */}
          <Panel x={68} y={88} />
          <Panel x={68} y={116} />
          <text x={86} y={152} textAnchor="middle" fontSize="7.5" fill={LGRAY} fontFamily={F}>PV Array</text>

          <Arr x1={104} y1={105} x2={122} y2={105} />
          <text x={113} y={100} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={RED} fontFamily={F}>DC</text>

          {/* Inverter BTM */}
          <Box x={124} y={87} fill={RED} label="Inverter" sub="DC→AC" />
          <Arr x1={188} y1={105} x2={206} y2={105} />
          <text x={197} y={100} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={RED} fontFamily={F}>AC</text>

          {/* Building load */}
          <Box x={208} y={87} w={70} fill={NAVY} label="Building" sub="Load" />
          <text x={243} y={140} textAnchor="middle" fontSize="7" fill={LGRAY} fontFamily={F}>(AC appliances)</text>

          {/* Down from building to meter */}
          <Arr x1={243} y1={123} x2={243} y2={158} color={LGRAY} />

          {/* Meter BTM */}
          <Meter x={243} y={175} />

          {/* Bidirectional to grid */}
          <line x1={257} y1={175} x2={310} y2={175} stroke={GREEN} strokeWidth="1.5" markerEnd={`url(#arr-${GREEN.replace('#', '')})`} />
          <line x1={310} y1={175} x2={257} y2={175} stroke={GREEN} strokeWidth="1.5" markerEnd={`url(#arr-${GREEN.replace('#', '')})`} />
          <text x={285} y={168} textAnchor="middle" fontSize="7" fill={GREEN} fontFamily={F}>export/import</text>

          {/* Grid BTM */}
          <GridSymbol x={324} y={175} />

          {/* BTM meter label */}
          <text x={185} y={228} textAnchor="middle" fontSize="7.5" fill={GRAY} fontFamily={F} fontStyle="italic">Meter sits between building and grid — credits excess export</text>

          {/* ── RIGHT: FTM ── */}
          <rect x={400} y={8} width={350} height={220} fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="0" />
          <text x={575} y={26} textAnchor="middle" fontSize="10" fontWeight="700" fill={NAVY} fontFamily={F}>FRONT-OF-METER (FTM)</text>
          <text x={575} y={39} textAnchor="middle" fontSize="8" fill={GRAY} fontFamily={F}>Solar output delivered directly to the grid</text>

          {/* Sun FTM */}
          <circle cx={428} cy={105} r={18} fill="#fbbf24" opacity="0.9" />
          <text x={428} y={109} textAnchor="middle" fontSize="8" fontWeight="700" fill="#78350f" fontFamily={F}>SUN</text>

          {/* Panels FTM */}
          <Panel x={458} y={88} />
          <Panel x={458} y={116} />
          <text x={476} y={152} textAnchor="middle" fontSize="7.5" fill={LGRAY} fontFamily={F}>PV Array</text>

          <Arr x1={494} y1={105} x2={512} y2={105} />
          <text x={503} y={100} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={RED} fontFamily={F}>DC</text>

          {/* Inverter FTM */}
          <Box x={514} y={87} fill={RED} label="Inverter" sub="DC→AC" />
          <Arr x1={578} y1={105} x2={596} y2={105} />
          <text x={587} y={100} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={RED} fontFamily={F}>AC</text>

          {/* Meter FTM — sits before grid */}
          <Meter x={610} y={105} />
          <Arr x1={624} y1={105} x2={648} y2={105} color={GREEN} />

          {/* Grid FTM */}
          <GridSymbol x={696} y={105} />

          {/* Utility / offtaker label */}
          <rect x={620} y={140} width={90} height={28} fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <text x={665} y={152} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={NAVY} fontFamily={F}>PPA / Utility</text>
          <text x={665} y={162} textAnchor="middle" fontSize="7" fill={LGRAY} fontFamily={F}>offtake contract</text>
          <line x1={665} y1={140} x2={665} y2={128} stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 2" />

          {/* FTM meter label */}
          <text x={575} y={228} textAnchor="middle" fontSize="7.5" fill={GRAY} fontFamily={F} fontStyle="italic">Meter sits between inverter and grid — revenue metered at interconnection point</text>
        </svg>
      </div>
    </div>
  )
}
