import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine, ResponsiveContainer, LabelList } from 'recharts'
import styles from './Diagram.module.css'

const TICK = { fontSize: 11, fill: '#6b7280', fontFamily: 'Inter, system-ui, sans-serif' }
const AXIS_LINE = { stroke: '#e5e7eb' }

const data = [
  { stage: 'Polysilicon', share: 92 },
  { stage: 'Wafers',      share: 97 },
  { stage: 'Solar Cells', share: 85 },
  { stage: 'Modules',     share: 80 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '8px 12px', fontSize: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p style={{ margin: 0, fontWeight: 600, color: '#1B2A4A' }}>{label}</p>
      <p style={{ margin: 0, color: '#CC3322' }}>China share: {payload[0].value}%</p>
    </div>
  )
}

export default function ChinaShareChart() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>China's Share of Global Solar Manufacturing Capacity (2025)</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 20, right: 32, left: 0, bottom: 8 }} barSize={52}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="stage" tick={TICK} axisLine={AXIS_LINE} tickLine={false} />
          <YAxis tick={TICK} axisLine={AXIS_LINE} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(27,42,74,0.05)' }} />
          <ReferenceLine y={75} stroke="#9ca3af" strokeDasharray="4 3" label={{ value: '75%', position: 'right', fontSize: 10, fill: '#9ca3af', fontFamily: 'Inter, system-ui, sans-serif' }} />
          <Bar dataKey="share" radius={0}>
            {data.map((_, i) => (
              <Cell key={i} fill="#CC3322" opacity={0.75 + i * 0.06} />
            ))}
            <LabelList dataKey="share" position="top" formatter={v => `${v}%`} style={{ fontSize: 11, fontWeight: 700, fill: '#CC3322', fontFamily: 'Inter, system-ui, sans-serif' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '0.8125rem', color: '#6b7280', fontFamily: 'Inter, system-ui, sans-serif', margin: '0.25rem 0 0', fontStyle: 'italic' }}>
        Source: IEA PVPS 2025. China's dominance expanded further through 2024–2025 at every upstream stage of the supply chain.
      </p>
    </div>
  )
}
