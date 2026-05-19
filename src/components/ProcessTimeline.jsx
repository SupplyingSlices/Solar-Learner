import styles from './ProcessTimeline.module.css'

export default function ProcessTimeline({ timeline }) {
  if (!timeline) return null
  const { title, phases, totalMonths, note } = timeline
  const barW = 100 / totalMonths

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.chart}>
        {/* Month axis */}
        <div className={styles.axisRow}>
          <div className={styles.labelCol} />
          <div className={styles.track}>
            {Array.from({ length: Math.ceil(totalMonths / 6) + 1 }, (_, i) => i * 6).map((m) => (
              <div
                key={m}
                className={styles.axisTick}
                style={{ left: `${(m / totalMonths) * 100}%` }}
              >
                <span className={styles.axisLabel}>M{m}</span>
              </div>
            ))}
          </div>
        </div>

        {phases.map((phase, i) => {
          const left = (phase.start / totalMonths) * 100
          const width = (phase.duration / totalMonths) * 100
          return (
            <div key={i} className={styles.phaseRow}>
              <div className={styles.labelCol}>
                <span className={styles.phaseLabel}>{phase.label}</span>
              </div>
              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    background: phase.color,
                  }}
                >
                  <span className={styles.barDuration}>{phase.duration}mo</span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Duration label row */}
        <div className={styles.axisRow}>
          <div className={styles.labelCol} />
          <div className={styles.track}>
            <div className={styles.totalLabel}>Total: ~{totalMonths} months</div>
          </div>
        </div>
      </div>

      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
