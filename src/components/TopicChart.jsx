import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
} from 'recharts'
import styles from './TopicChart.module.css'

const TICK_STYLE = { fontSize: 11, fill: '#6b7280', fontFamily: 'Inter, system-ui, sans-serif' }
const AXIS_LINE = { stroke: '#e5e7eb' }

function ChartBar({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chart.data} margin={{ top: 8, right: 16, left: 0, bottom: 56 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey={chart.xKey}
          tick={{ ...TICK_STYLE, angle: -30, textAnchor: 'end' }}
          axisLine={AXIS_LINE}
          tickLine={false}
          interval={0}
        />
        <YAxis tick={TICK_STYLE} axisLine={AXIS_LINE} tickLine={false} />
        <Tooltip
          contentStyle={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
          cursor={{ fill: 'rgba(27,42,74,0.05)' }}
        />

        {chart.bars.map((b) => (
          <Bar key={b.key} dataKey={b.key} name={b.label} fill={b.color} radius={0} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

function ChartStackedBar({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chart.data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey={chart.xKey} tick={TICK_STYLE} axisLine={AXIS_LINE} tickLine={false} />
        <YAxis
          tick={TICK_STYLE}
          axisLine={AXIS_LINE}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          formatter={(value) => [`${value}%`]}
          contentStyle={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
          cursor={{ fill: 'rgba(27,42,74,0.05)' }}
        />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', paddingTop: 8 }} />
        {chart.bars.map((b) => (
          <Bar key={b.key} dataKey={b.key} name={b.label} fill={b.color} stackId="a" radius={0} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

function ChartLine({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chart.data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey={chart.xKey} tick={TICK_STYLE} axisLine={AXIS_LINE} tickLine={false} />
        <YAxis tick={TICK_STYLE} axisLine={AXIS_LINE} tickLine={false} />
        <Tooltip
          contentStyle={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
        />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', paddingTop: 8 }} />
        {chart.lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.label}
            stroke={l.color}
            strokeWidth={2}
            dot={{ r: 3, fill: l.color }}
            connectNulls={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

const RADIAN = Math.PI / 180
function CustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) {
  if (percent < 0.08) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function ChartPie({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chart.data}
          cx="50%"
          cy="50%"
          outerRadius={110}
          dataKey="value"
          labelLine={false}
          label={CustomPieLabel}
        >
          {chart.data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} GW`, '']}
          contentStyle={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
        />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

function ChartWaterfall({ chart }) {
  const enriched = chart.data.map((d) => ({
    ...d,
    base: parseFloat((d.cumulative - d.value).toFixed(3)),
  }))
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={enriched} margin={{ top: 8, right: 16, left: 0, bottom: 48 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="name"
          tick={{ ...TICK_STYLE, angle: -30, textAnchor: 'end' }}
          axisLine={AXIS_LINE}
          tickLine={false}
          interval={0}
        />
        <YAxis
          tick={TICK_STYLE}
          axisLine={AXIS_LINE}
          tickLine={false}
          tickFormatter={(v) => `$${v.toFixed(2)}`}
          domain={[0, 'auto']}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === 'Cost component') return [`$${value.toFixed(2)}/W`]
            return [null, null]
          }}
          contentStyle={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
        />
        <Bar dataKey="base" stackId="a" fill="transparent" radius={0} legendType="none" />
        <Bar dataKey="value" stackId="a" name="Cost component" fill="#1B2A4A" radius={0}>
          {enriched.map((_, i) => (
            <Cell
              key={i}
              fill={i === enriched.length - 1 ? '#CC3322' : i % 2 === 0 ? '#1B2A4A' : '#2d4a7a'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function TopicChart({ chart }) {
  if (!chart) return null
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{chart.title}</h2>
      <div className={styles.chartArea}>
        {chart.imageUrl ? (
          <img
            src={chart.imageUrl}
            alt={chart.title}
            className={styles.chartImage}
          />
        ) : (
          <>
            {chart.type === 'bar' && <ChartBar chart={chart} />}
            {chart.type === 'stacked-bar' && <ChartStackedBar chart={chart} />}
            {chart.type === 'line' && <ChartLine chart={chart} />}
            {chart.type === 'pie' && <ChartPie chart={chart} />}
            {chart.type === 'waterfall' && <ChartWaterfall chart={chart} />}
          </>
        )}
      </div>
      {chart.imageUrl && chart.imageCaption && (
        <p className={styles.caption}>{chart.imageCaption}</p>
      )}
    </div>
  )
}
