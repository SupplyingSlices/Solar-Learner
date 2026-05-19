import styles from './Diagram.module.css'

function PanelCrossSection({ x, y, label, layers }) {
  const layerH = 24
  return (
    <g>
      <text x={x + 80} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1B2A4A" fontFamily="Inter, system-ui, sans-serif">{label}</text>
      {layers.map((layer, i) => (
        <g key={i}>
          <rect x={x} y={y + i * layerH} width={160} height={layerH} fill={layer.fill} stroke="#e5e7eb" strokeWidth="0.5" />
          <text x={x + 80} y={y + i * layerH + 15} textAnchor="middle" fontSize="8.5" fill={layer.textColor || '#374151'} fontFamily="Inter, system-ui, sans-serif">{layer.name}</text>
        </g>
      ))}
    </g>
  )
}

export default function PanelTypesDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Panel Cross-Section: TOPCon vs. CdTe Thin-Film</h2>
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 680 310" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          {/* TOPCon N-type */}
          <PanelCrossSection
            x={40}
            y={60}
            label="TOPCon (N-type, Mono-Si)"
            layers={[
              { name: 'Glass (tempered, 3.2mm)', fill: '#e0f2fe', textColor: '#0c4a6e' },
              { name: 'Anti-Reflection Coating', fill: '#bfdbfe', textColor: '#1e40af' },
              { name: 'N-type Silicon Wafer (main absorber)', fill: '#1B2A4A', textColor: '#ffffff' },
              { name: 'Tunnel Oxide Passivation (TOPCon layer)', fill: '#2d4a7a', textColor: '#bfdbfe' },
              { name: 'Poly-Si Contact Layer', fill: '#374151', textColor: '#d1d5db' },
              { name: 'Rear Glass / Backsheet', fill: '#f3f4f6', textColor: '#374151' },
            ]}
          />
          {/* Efficiency badge */}
          <rect x={40} y={218} width={160} height={22} fill="#CC3322" rx="0" />
          <text x={120} y={233} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter, system-ui, sans-serif">Efficiency: 22–24% | Market: ~70%+</text>

          {/* CdTe Thin-Film */}
          <PanelCrossSection
            x={260}
            y={60}
            label="CdTe Thin-Film (First Solar)"
            layers={[
              { name: 'Glass substrate (front)', fill: '#e0f2fe', textColor: '#0c4a6e' },
              { name: 'Transparent Conductive Oxide (TCO)', fill: '#a5f3fc', textColor: '#164e63' },
              { name: 'CdS Buffer Layer (~100nm)', fill: '#fde68a', textColor: '#78350f' },
              { name: 'CdTe Absorber Layer (~3–8 µm)', fill: '#6b7280', textColor: '#ffffff' },
              { name: 'Back Contact Metal', fill: '#4b5563', textColor: '#d1d5db' },
              { name: 'Encapsulant + Back Glass', fill: '#f3f4f6', textColor: '#374151' },
            ]}
          />
          <rect x={260} y={218} width={160} height={22} fill="#374151" rx="0" />
          <text x={340} y={233} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter, system-ui, sans-serif">Efficiency: 18–20% | Market: Utility US</text>

          {/* Key difference callout */}
          <rect x={470} y={60} width={185} height={200} fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="0" />
          <text x={562} y={82} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1B2A4A" fontFamily="Inter, system-ui, sans-serif">Key Differences</text>
          {[
            ['Thickness', 'Si: ~180 µm wafer', 'CdTe: ~5 µm film'],
            ['Raw material', 'Silicon (abundant)', 'Cadmium/Tellurium'],
            ['Mfg process', 'Ingot → wafer → cell', 'Vapor deposition'],
            ['Temperature coeff.', '−0.3%/°C', '−0.2%/°C (better)'],
            ['Main market', 'All segments', 'US utility-scale'],
          ].map(([attr, v1, v2], i) => (
            <g key={i}>
              <text x={482} y={106 + i * 30} fontSize="8" fontWeight="700" fill="#374151" fontFamily="Inter, system-ui, sans-serif">{attr}</text>
              <text x={482} y={117 + i * 30} fontSize="7.5" fill="#1B2A4A" fontFamily="Inter, system-ui, sans-serif">Si: {v1.replace('Si: ', '')}</text>
              <text x={482} y={127 + i * 30} fontSize="7.5" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif">CdTe: {v2.replace('CdTe: ', '')}</text>
            </g>
          ))}

          <text x="340" y="292" textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="Inter, system-ui, sans-serif">
            Not to scale — Si wafer is ~35× thicker than CdTe absorber in reality
          </text>
        </svg>
      </div>
    </div>
  )
}
