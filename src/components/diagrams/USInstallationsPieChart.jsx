import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './Diagram.module.css'

const DATA = [
  { name: 'Utility-Scale',           value: 34.7, color: '#1B2A4A' },
  { name: 'Residential',             value: 4.6,  color: '#6b7280' },
  { name: 'Commercial & Industrial', value: 2.3,  color: '#CC3322' },
  { name: 'Community Solar',         value: 1.6,  color: '#9ca3af' },
]

const RADIAN = Math.PI / 180
function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null
  const r = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '8px 12px', fontSize: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p style={{ margin: 0, fontWeight: 600, color: '#1B2A4A' }}>{payload[0].name}</p>
      <p style={{ margin: 0, color: '#6b7280' }}>{payload[0].value} GW</p>
    </div>
  )
}

export default function USInstallationsPieChart() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>US Solar Installations by Segment (2025 — 43.2 GW Total)</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={DATA}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            labelLine={false}
            label={CustomLabel}
          >
            {DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', paddingTop: 8 }}
            formatter={(value, entry) => `${value} (${entry.payload.value} GW)`}
          />
        </PieChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '0.8125rem', color: '#6b7280', fontFamily: 'Inter, system-ui, sans-serif', margin: '0.25rem 0 0', fontStyle: 'italic' }}>
        Source: SEIA / Wood Mackenzie, 2025. Utility-scale accounted for ~80% of all US solar capacity additions.
      </p>
    </div>
  )
}
