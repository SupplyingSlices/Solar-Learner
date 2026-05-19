import styles from './Diagram.module.css'

const F = 'Inter, system-ui, sans-serif'
const NAVY = '#1B2A4A'
const NAVY2 = '#2d4a7a'
const RED = '#CC3322'
const GRAY = '#374151'
const LGRAY = '#9ca3af'
const CHINA_RED = '#CC3322'

const STAGES = [
  { label: 'Polysilicon', sub: 'Raw material', china: '~92%', x: 20 },
  { label: 'Ingots &\nWafers',  sub: 'Slicing & doping', china: '~97%', x: 150 },
  { label: 'Solar Cells', sub: 'p-n junction', china: '~85%', x: 280 },
  { label: 'Modules',    sub: 'Encapsulated panels', china: '~80%', x: 410 },
  { label: 'Project\nInstall', sub: 'EPC / developer', china: 'Global', x: 540 },
]

const W = 104
const H = 56
const CY = 90  // centre y of boxes
const ARROW_Y = CY + H / 2 - H / 2  // = CY (midpoint of box height)

export default function SupplyChainDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Solar Supply Chain: China's Dominance at Every Stage</h2>
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          <defs>
            <marker id="sc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill={LGRAY} />
            </marker>
          </defs>

          {/* Stage boxes */}
          {STAGES.map((s, i) => {
            const isFinal = i === STAGES.length - 1
            const boxFill = isFinal ? '#f3f4f6' : NAVY
            const textColor = isFinal ? NAVY : '#fff'
            const lines = s.label.split('\n')
            return (
              <g key={i}>
                <rect x={s.x} y={CY - H / 2} width={W} height={H} fill={boxFill} stroke={isFinal ? '#e5e7eb' : 'none'} rx="0" />
                {lines.map((line, li) => (
                  <text key={li} x={s.x + W / 2} y={CY - (lines.length === 2 ? 6 : 0) + li * 14} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={textColor} fontFamily={F}>{line}</text>
                ))}
                <text x={s.x + W / 2} y={CY + 20} textAnchor="middle" fontSize="7.5" fill={isFinal ? LGRAY : 'rgba(255,255,255,0.65)'} fontFamily={F}>{s.sub}</text>

                {/* China share badge */}
                <rect x={s.x + 8} y={CY - H / 2 - 28} width={W - 16} height={22} fill={isFinal ? '#f3f4f6' : CHINA_RED} rx="0" />
                <text x={s.x + W / 2} y={CY - H / 2 - 20} textAnchor="middle" fontSize="8" fontWeight="700" fill={isFinal ? GRAY : '#fff'} fontFamily={F}>China share</text>
                <text x={s.x + W / 2} y={CY - H / 2 - 9} textAnchor="middle" fontSize="9" fontWeight="700" fill={isFinal ? GRAY : '#fff'} fontFamily={F}>{s.china}</text>

                {/* Connecting arrow (not after last) */}
                {i < STAGES.length - 1 && (
                  <line
                    x1={s.x + W + 1}
                    y1={CY}
                    x2={STAGES[i + 1].x - 1}
                    y2={CY}
                    stroke={LGRAY}
                    strokeWidth="1.5"
                    markerEnd="url(#sc-arrow)"
                  />
                )}
              </g>
            )
          })}

          {/* Flow label */}
          <text x={340} y={170} textAnchor="middle" fontSize="8" fill={LGRAY} fontFamily={F} fontStyle="italic">
            Raw material → processed silicon → cell manufacturing → module assembly → installed project
          </text>

          {/* China flag-style accent bar */}
          <rect x={20} y={155} width={524} height={3} fill={CHINA_RED} opacity="0.18" />
          <text x={20} y={150} fontSize="7.5" fill={CHINA_RED} fontFamily={F} fontWeight="600">China controls 80–97% of each upstream stage</text>
          <text x={544} y={150} fontSize="7.5" fill={LGRAY} fontFamily={F}>US / Global</text>
        </svg>
      </div>
    </div>
  )
}
