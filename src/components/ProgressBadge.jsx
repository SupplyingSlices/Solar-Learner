import styles from './ProgressBadge.module.css'

export default function ProgressBadge({ status }) {
  if (status === 'complete') {
    return (
      <span className={`${styles.badge} ${styles.complete}`} title="Complete">
        ✓
      </span>
    )
  }
  if (status === 'in-progress') {
    return (
      <span className={`${styles.badge} ${styles.inProgress}`} title="In Progress">
        ●
      </span>
    )
  }
  return null
}
