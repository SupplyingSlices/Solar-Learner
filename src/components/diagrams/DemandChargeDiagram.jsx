import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Label } from 'recharts'
import styles from './Diagram.module.css'

const TICK = { fontSize: 11, fill: '#6b7280', fontFamily: 'Inter, system-ui, sans-serif' }
const AXIS_LINE = { stroke: '#e5e7eb' }

const data = [
  { hour: '12a', kw: 42 },
  { hour: '1a',  kw: 36 },
  { hour: '2a',  kw: 31 },
  { hour: '3a',  kw: 28 },
  { hour: '4a',  kw: 27 },
  { hour: '5a',  kw: 32 },
  { hour: '6a',  kw: 48 },
  { hour: '7a',  kw: 74 },
  { hour: '8a',  kw: 112 },
  { hour: '9a',  kw: 148 },
  { hour: '10a', kw: 162 },
  { hour: '11a', kw: 170 },
  { hour: '12p', kw: 168 },
  { hour: '1p',  kw: 172 },
  { hour: '2p',  kw: 178 },
  { hour: '3p',  kw: 186 },
  { hour: '4p',  kw: 198 },
  { hour: '5p',  kw: 212 },
  { hour: '6p',  kw: 204 },
  { hour: '7p',  kw: 182 },
  { hour: '8p',  kw: 156 },
  { hour: '9p',  kw: 128 },
  { hour: '10p', kw: 94 },
  { hour: '11p', kw: 62 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '8px 12px', fontSize: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p style={{ margin: 0, fontWeight: 600, color: '#1B2A4A' }}>{label}</p>
      <p style={{ margin: 0, color: '#CC3322' }}>{payload[0].value} kW</p>
    </div>
  )
}

export default function DemandChargeDiagram() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Demand Charges: Why Peak kW Matters</h2>
      <div style={{ marginBottom: '0.5rem' }}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1B2A4A" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#1B2A4A" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="hour" tick={TICK} axisLine={AXIS_LINE} tickLine={false} interval={1} />
            <YAxis tick={TICK} axisLine={AXIS_LINE} tickLine={false} tickFormatter={v => `${v} kW`} domain={[0, 240]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x="5p" stroke="#CC3322" strokeWidth={2} strokeDasharray="5 3">
              <Label value="Peak demand → demand charge billed here" position="insideTopRight" fontSize={10} fill="#CC3322" fontFamily="Inter, system-ui, sans-serif" offset={6} />
            </ReferenceLine>
            <ReferenceLine y={212} stroke="#CC3322" strokeWidth={1.5} strokeDasharray="4 3" />
            <Area type="monotone" dataKey="kw" name="Building Load" stroke="#1B2A4A" strokeWidth={2} fill="url(#loadGrad)" dot={false} activeDot={{ r: 4, fill: '#1B2A4A' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p style={{ fontSize: '0.8125rem', color: '#6b7280', fontFamily: 'Inter, system-ui, sans-serif', margin: '0.25rem 0 0', fontStyle: 'italic', lineHeight: 1.5 }}>
        Illustrative commercial load profile. Demand charges are billed on the single highest 15- or 30-minute peak interval in the billing period — solar alone cannot eliminate an evening peak. Battery storage can discharge at peak to reduce the billed demand.
      </p>
    </div>
  )
}
