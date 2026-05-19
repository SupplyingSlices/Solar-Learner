import styles from './WhyItMatters.module.css'

export default function WhyItMatters({ text }) {
  return (
    <div className={styles.block}>
      <p className={styles.label}>Why This Matters in Diligence</p>
      <p className={styles.body}>{text}</p>
    </div>
  )
}
