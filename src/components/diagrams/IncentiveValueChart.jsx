import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell, LabelList
} from 'recharts'
import styles from './Diagram.module.css'

const F = 'Inter, system-ui, sans-serif'
const TICK = { fontSize: 11, fill: '#6b7280', fontFamily: F }
const AXIS_LINE = { stroke: '#e5e7eb' }

// Illustrative 100 MW project @ $1.15/W all-in = $115M total installed cost
// Meets PWA requirements → full 30% base ITC
// Assumptions annotated below each figure

const partyData = [
  {
    party: 'Tax Equity\nInvestor',
    'ITC (30% base)':           34,   // 30% × $115M × ~99% TE share
    'MACRS Depr. Benefit':      24,   // NPV of 5-yr accelerated depreciation on 85% basis
    'Domestic Content (+10%)':  11,   // additional 10% ITC adder
    'Energy Community (+10%)':  11,   // additional 10% ITC adder
  },
  {
    party: 'Developer /\nSponsor',
    'ITC (30% base)':            0,   // TE investor captures ITC; developer retains residual equity
    'MACRS Depr. Benefit':       0,
    'Domestic Content (+10%)':   0,
    'Energy Community (+10%)':   0,
    'Equity Value (post-flip)':  22,  // NPV of sponsor equity after TE flip (~15% IRR target)
    'Development Fee':            6,  // typical 3–5% dev fee on EPC cost
  },
  {
    party: 'Lender\n(Project Debt)',
    'ITC (30% base)':            0,
    'MACRS Depr. Benefit':       0,
    'Domestic Content (+10%)':   0,
    'Energy Community (+10%)':   0,
    'Equity Value (post-flip)':  0,
    'Development Fee':            0,
    'Interest Income':           18,  // ~$75M debt × 6.5% × ~3.7yr avg life NPV
  },
]

const COLORS = {
  'ITC (30% base)':           '#CC3322',
  'MACRS Depr. Benefit':      '#e05a4a',
  'Domestic Content (+10%)':  '#1B2A4A',
  'Energy Community (+10%)':  '#2d4a7a',
  'Equity Value (post-flip)': '#16a34a',
  'Development Fee':          '#4ade80',
  'Interest Income':          '#6b7280',
}

const KEYS = Object.keys(COLORS)

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const total = payload.reduce((s, p) => s + (p.value || 0), 0)
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '10px 14px', fontSize: 12, fontFamily: F, minWidth: 200 }}>
      <p style={{ margin: '0 0 6px', fontWeight: 700, color: '#1B2A4A' }}>{label.replace('\n', ' ')}</p>
      {payload.filter(p => p.value > 0).map((p, i) => (
        <p key={i} style={{ margin: '2px 0', color: p.fill }}>
          {p.name}: <strong>${p.value}M</strong>
        </p>
      ))}
      <p style={{ margin: '6px 0 0', borderTop: '1px solid #e5e7eb', paddingTop: 4, fontWeight: 700, color: '#1B2A4A' }}>
        Total: ${total}M
      </p>
    </div>
  )
}

// Flatten party label for display
const displayData = partyData.map(d => ({ ...d, party: d.party.replace('\n', ' ') }))

export default function IncentiveValueChart() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        Who Captures the Value? Illustrative 100 MW Project ($115M All-In, All Adders)
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={displayData} margin={{ top: 16, right: 24, left: 8, bottom: 8 }} barSize={56}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="party" tick={TICK} axisLine={AXIS_LINE} tickLine={false} />
          <YAxis tick={TICK} axisLine={AXIS_LINE} tickLine={false} tickFormatter={v => `$${v}M`} domain={[0, 90]} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(27,42,74,0.04)' }} />
          <Legend
            wrapperStyle={{ fontSize: 10, fontFamily: F, paddingTop: 8 }}
            iconSize={10}
            formatter={v => <span style={{ color: '#374151' }}>{v}</span>}
          />
          {KEYS.map(k => (
            <Bar key={k} dataKey={k} stackId="a" fill={COLORS[k]} name={k} />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Summary callout row */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Tax Equity Investor', total: '$80M', note: 'ITC + MACRS + adders', color: '#CC3322' },
          { label: 'Developer / Sponsor',  total: '$28M', note: 'Equity value + dev fee', color: '#16a34a' },
          { label: 'Lender',               total: '$18M', note: 'Interest income', color: '#6b7280' },
        ].map(c => (
          <div key={c.label} style={{ flex: '1 1 160px', border: '1px solid #e5e7eb', padding: '0.75rem 1rem', borderTop: `3px solid ${c.color}` }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#1B2A4A', fontFamily: F }}>{c.label}</p>
            <p style={{ margin: '4px 0 2px', fontSize: 20, fontWeight: 700, color: c.color, fontFamily: F }}>{c.total}</p>
            <p style={{ margin: 0, fontSize: 10, color: '#6b7280', fontFamily: F }}>{c.note}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.8125rem', color: '#6b7280', fontFamily: F, margin: '0.75rem 0 0', fontStyle: 'italic', lineHeight: 1.5 }}>
        Illustrative only. Assumes 100 MW DC @ $1.15/W all-in ($115M), prevailing wage met (30% base ITC), domestic content adder (+10%), energy community adder (+10%), and 5-year MACRS on 85% of depreciable basis. MACRS benefit shown as NPV at 8% discount rate. Tax equity structured as a partnership flip (99/1 pre-flip split).
      </p>
    </div>
  )
}
