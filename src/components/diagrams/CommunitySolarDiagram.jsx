import styles from './Diagram.module.css'

const F = 'Inter, system-ui, sans-serif'
const NAVY = '#1B2A4A'
const NAVY2 = '#2d4a7a'
const RED = '#CC3322'
const GRAY = '#374151'
const GREEN = '#16a34a'
const LGRAY = '#9ca3af'
const AMBER = '#f59e0b'

function Panel({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width={40} height={26} fill={NAVY} rx="0" />
      <line x1={x} y1={y + 13} x2={x + 40} y2={y + 13} stroke={NAVY2} strokeWidth="0.8" />
      <line x1={x + 20} y1={y} x2={x + 20} y2={y + 26} stroke={NAVY2} strokeWidth="0.8" />
    </g>
  )
}

function Box({ x, y, w = 72, h = 40, fill, label, sub, textColor = '#fff' }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} rx="0" />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 5 : 0)} textAnchor="middle" fontSize="9" fontWeight="700" fill={textColor} fontFamily={F}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 7} textAnchor="middle" fontSize="7.5" fill={textColor} opacity="0.85" fontFamily={F}>{sub}</text>}
    </g>
  )
}

function Subscriber({ x, y, icon, label, sublabel }) {
  return (
    <g>
      <rect x={x} y={y} width={90} height={46} fill="#fff" stroke="#e5e7eb" strokeWidth="1" rx="0" />
      <text x={x + 45} y={y + 16} textAnchor="middle" fontSize="13" fontFamily={F}>{icon}</text>
      <text x={x + 45} y={y + 30} textAnchor="middle" fontSize="8" fontWeight="600" fill={NAVY} fontFamily={F}>{label}</text>
      <text x={x + 45} y={y + 41} textAnchor="middle" fontSize="7" fill={LGRAY} fontFamily={F}>{sublabel}</text>
    </g>
  )
}

export default function CommunitySolarDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>How Community Solar Works</h2>
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          <defs>
            {[LGRAY, GREEN, NAVY, RED, AMBER].map(c => (
              <marker key={c} id={`cs-arr-${c.replace('#', '')}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill={c} />
              </marker>
            ))}
          </defs>

          {/* Sun */}
          <circle cx={42} cy={80} r={24} fill={AMBER} opacity="0.9" />
          <text x={42} y={84} textAnchor="middle" fontSize="9" fontWeight="700" fill="#78350f" fontFamily={F}>SUN</text>

          {/* Sunrays to panels */}
          {[-1, 0, 1].map((i) => (
            <line key={i} x1={64} y1={80 + i * 14} x2={82} y2={80 + i * 14} stroke={AMBER} strokeWidth="1.2" opacity="0.7" markerEnd={`url(#cs-arr-${AMBER.replace('#', '')})`} />
          ))}

          {/* Community Solar Array */}
          <rect x={82} y={20} width={110} height={120} fill="#f0f4ff" stroke="#c7d2fe" strokeWidth="1" rx="0" />
          <text x={137} y={36} textAnchor="middle" fontSize="8" fontWeight="700" fill={NAVY} fontFamily={F}>COMMUNITY SOLAR</text>
          <text x={137} y={46} textAnchor="middle" fontSize="7} " fill={LGRAY} fontFamily={F}>ARRAY (1–5 MW)</text>
          {[[0, 0],[1, 0],[2, 0],[0, 1],[1, 1],[2, 1]].map(([col, row]) => (
            <Panel key={`${col}-${row}`} x={90 + col * 44} y={56 + row * 34} />
          ))}

          {/* Arrow: Array → Inverter */}
          <line x1={192} y1={80} x2={224} y2={80} stroke={LGRAY} strokeWidth="1.5" markerEnd={`url(#cs-arr-${LGRAY.replace('#', '')})`} />
          <text x={208} y={73} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={RED} fontFamily={F}>DC</text>

          {/* Inverter */}
          <Box x={226} y={60} fill={RED} label="Inverter" sub="DC → AC" />

          {/* Arrow: Inverter → Utility */}
          <line x1={298} y1={80} x2={330} y2={80} stroke={LGRAY} strokeWidth="1.5" markerEnd={`url(#cs-arr-${LGRAY.replace('#', '')})`} />
          <text x={314} y={73} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={RED} fontFamily={F}>AC</text>

          {/* Utility / Grid box */}
          <Box x={332} y={54} w={88} h={52} fill={NAVY} label="Utility" sub="Grid & Billing" />

          {/* Virtual net metering label */}
          <rect x={296} y={104} width={120} height={22} fill="#fffbeb" stroke="#fde68a" strokeWidth="1" rx="0" />
          <text x={356} y={119} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#92400e" fontFamily={F}>Virtual Net Metering (VNM)</text>

          {/* Arrows from utility to subscribers */}
          {[0, 1, 2].map((i) => {
            const ty = 46 + i * 66
            return (
              <g key={i}>
                <line x1={420} y1={80} x2={460} y2={ty + 23} stroke={GREEN} strokeWidth="1.5" markerEnd={`url(#cs-arr-${GREEN.replace('#', '')})`} />
              </g>
            )
          })}

          {/* Subscribers */}
          <Subscriber x={462} y={24} icon="🏠" label="Homeowner" sublabel="No suitable roof" />
          <Subscriber x={462} y={90} icon="🏢" label="Apartment / Renter" sublabel="Cannot install solar" />
          <Subscriber x={462} y={156} icon="🏪" label="Small Business" sublabel="Offset electricity bill" />

          {/* Bill credit arrows */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={558} y={28 + i * 66} width={78} height={22} fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" rx="0" />
              <text x={597} y={43 + i * 66} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={GREEN} fontFamily={F}>Bill Credit</text>
              <text x={597} y={52 + i * 66} textAnchor="middle" fontSize="7" fill={LGRAY} fontFamily={F}>5–15% discount</text>
            </g>
          ))}

          {/* Subscription arrows */}
          {[0, 1, 2].map((i) => (
            <line key={i} x1={553} y1={47 + i * 66} x2={558} y2={39 + i * 66} stroke={GREEN} strokeWidth="1.2" markerEnd={`url(#cs-arr-${GREEN.replace('#', '')})`} />
          ))}

          {/* Caption */}
          <text x={380} y={228} textAnchor="middle" fontSize="8.5" fill={LGRAY} fontFamily={F}>
            Subscribers receive credits on their utility bill proportional to their share of the array's output
          </text>
        </svg>
      </div>
    </div>
  )
}
