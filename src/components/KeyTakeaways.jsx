import styles from './KeyTakeaways.module.css'

export default function KeyTakeaways({ items }) {
  return (
    <div className={styles.box}>
      <h2 className={styles.heading}>Key Takeaways</h2>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.check}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
