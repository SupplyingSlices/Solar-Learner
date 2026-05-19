import styles from './ComparisonTable.module.css'

export default function ComparisonTable({ comparison }) {
  if (!comparison) return null
  const { title, headers, rows, highlightCol } = comparison

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`${styles.th} ${i === 0 ? styles.thLabel : ''} ${
                    i === highlightCol ? styles.thHighlight : ''
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`${styles.td} ${ci === 0 ? styles.tdLabel : ''} ${
                      ci === highlightCol ? styles.tdHighlight : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
